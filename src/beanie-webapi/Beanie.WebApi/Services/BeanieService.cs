using Beanie.WebApi.Entities;
using Beanie.WebApi.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Beanie.WebApi.Services
{
    public class BeanieService : IBeanieService
    {
        private string _connectionString;
        private IConfiguration _config;
        private ILogger<BeanieService> _logger;

        public BeanieService(ILogger<BeanieService> logger, IConfiguration config) 
        {
            _logger = logger;
            _config = config;
            _connectionString = _config["PERSISTENCE_CONNECTION_STRING"];
        }

        public void CreateNewGame(ScoreBoard scoreboard)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // Insert Game
                var sql = @"INSERT INTO public.game(id, activeround, latestround)
	                VALUES (@Id, @ActiveRound, @LatestRound);";

                var affectedRows = connection.Execute(
                    sql: sql, 
                    param: new { Id = scoreboard.GameId, ActiveRound = scoreboard.ActiveRound, LatestRound = scoreboard.LatestRound}, 
                    transaction: transaction);

                sql = @"INSERT INTO public.player(username, gameid, scores, turnorder)
	                VALUES (@UserName, @GameId, @Scores, @TurnOrder);";

                // Insert Players for Game
                scoreboard.Players.ForEach(player =>
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@UserName", player.Name);
                    parameters.Add("@GameId", scoreboard.GameId);
                    parameters.Add("@Scores", "");
                    parameters.Add("@TurnOrder", player.TurnOrder);

                    var affectedRows = connection.Execute(sql: sql, param: parameters, transaction: transaction);
                });

                transaction.Commit();
                connection.Dispose();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                transaction.Rollback();
                connection.Dispose();
                throw ex;
            }
        }

        public ScoreBoard GetExistingGame(string id)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            connection.Open();

            try
            {
                var gameEntity = connection.Query<GameEntity>("SELECT * FROM public.game WHERE id = @Id", new { Id = id }).FirstOrDefault();
                if (gameEntity == null)
                {
                    return null;
                }
                
                var playerEntities = connection.Query<PlayerEntity>("SELECT * FROM public.player WHERE gameid = @Id", new { Id = id }).ToList();

                connection.Dispose();

                var players = playerEntities.Select(entity => new Player()
                {
                    Name = entity.UserName,
                    Scores = JsonConvert.DeserializeObject<List<PlayerScore>>(entity.Scores),
                    TurnOrder = entity.TurnOrder
                }).ToList();

                var scoreboard = new ScoreBoard()
                {
                    GameId = gameEntity.Id,
                    ActiveRound = gameEntity.ActiveRound,
                    LatestRound = gameEntity.LatestRound,
                    Players = players
                };

                return scoreboard;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                connection.Dispose();

                throw ex;
            }
        }

        public List<Player> GetPlayers() // TODO: Do I need this anymore?
        {
            using var connection = new NpgsqlConnection(_connectionString);
            connection.Open();

            try
            {
                var playerEntities = connection.Query<PlayerEntity>("SELECT * FROM player").ToList();
                connection.Dispose();

                var players = playerEntities.Select(player => new Player() { 
                    Name = player.UserName
                }).ToList();
                return players;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                connection.Dispose();
                throw ex;
            }
        }

        public void SetScores(ScoreBoard scoreboard)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // Insert Players for Game
                var sql = @"UPDATE public.player
	                SET scores=@Scores
                    WHERE username=@Username AND gameid=@GameId; ";

                scoreboard.Players.ForEach(player =>
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@UserName", player.Name);
                    parameters.Add("@GameId", scoreboard.GameId);
                    parameters.Add("@Scores", JsonConvert.SerializeObject(player.Scores));

                    connection.Execute(sql: sql, param: parameters, transaction: transaction);
                });

                // Update latest round
                sql = @"UPDATE public.game
                    SET latestround=@LatestRound,
                        activeround=@ActiveRound
                    WHERE id=@GameId;";

                connection.Execute(sql: sql, param: new { LatestRound = scoreboard.LatestRound, ActiveRound = scoreboard.ActiveRound, GameId = scoreboard.GameId }, transaction: transaction);

                transaction.Commit();
                connection.Dispose();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                transaction.Rollback();
                connection.Dispose();
                throw ex;
            }
        }
    }
}
