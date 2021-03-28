using Beanie.WebApi.Entities;
using Beanie.WebApi.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
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
            //_logger = LoggerFactory.Create(configure => configure.AddConsole()).CreateLogger(nameof(BeanieService));
            _logger = logger;
            _config = config;
        }

        public List<Player> GetPlayers()
        {
            _connectionString = _config["PERSISTENCE_CONNECTION_STRING"];
            using var connection = new NpgsqlConnection(_connectionString);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                var playerEntities = connection.Query<PlayerEntity>("SELECT * FROM player", transaction).ToList();
                transaction.Commit();
                var players = playerEntities.Select(player => new Player() { 
                    Name = player.UserName
                }).ToList();
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
