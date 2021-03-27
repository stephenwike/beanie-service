using Beanie.WebApi.Entities;
using Dapper;
using Microsoft.Extensions.Logging;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Beanie.WebApi.Services
{
    public class BeanieService
    {
        private string _connectionString = Environment.GetEnvironmentVariable("PERSISTENCE_CONNECTION_STRING");
        private ILogger _logger;

        public BeanieService()
        {
            _logger = LoggerFactory.Create(configure => configure.AddConsole()).CreateLogger(nameof(BeanieService));
        }

        public List<PlayerEntity> GetPlayers()
        {
            using var connection = new NpgsqlConnection(_connectionString);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                var players = connection.Query<PlayerEntity>("SELECT * FROM player", transaction).ToList();
                transaction.Commit();
                players.ForEach(plr => Console.WriteLine(plr));
                return players;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                transaction.Rollback();
                throw ex;
            }
        }
    }
}
