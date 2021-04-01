using Dapper;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;

namespace Beanie.WebApi.Tests
{
    public class PostgresFixture : IDisposable
    {
        private readonly string _connectionString = "Server=localhost;Port=5432;Database=beanie;User id=user;Password=pass";
        private NpgsqlConnection _connection;

        public PostgresFixture()
        {
            _connection = new NpgsqlConnection(_connectionString);
            _connection.Open();
            DeleteSql();
        }

        internal void ExecuteInsert(string query)
        {
            _connection.Execute(sql: query);
        }

        internal List<T> ExecuteQuery<T>(string query)
        {
            return _connection.Query<T>(sql: query).AsList();
        }

        public void DeleteSql()
        {
            var sql = @"DELETE from public.player;
                DELETE from public.game;";
            _connection.Execute(sql: sql);
        }

        public void Dispose()
        {
            DeleteSql();
            _connection.Close();
        }
    }
}