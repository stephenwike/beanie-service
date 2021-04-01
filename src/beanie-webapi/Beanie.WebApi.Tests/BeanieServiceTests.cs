using Beanie.WebApi.Entities;
using Beanie.WebApi.Models;
using Beanie.WebApi.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Beanie.WebApi.Tests
{
    public class BeanieServiceTests : IClassFixture<PostgresFixture>
    {
        private readonly ILogger<BeanieService> _logger;
        private PostgresFixture _fixture;
        private BeanieService _service;
        private IConfiguration _config;

        public BeanieServiceTests(PostgresFixture fixture)
        {
            _fixture = fixture;
            _logger = LoggerFactory.Create(x => { }).CreateLogger<BeanieService>();
            _config = new ConfigurationBuilder().AddInMemoryCollection(new List<KeyValuePair<string, string>>()
            {
                new KeyValuePair<string, string>("PERSISTENCE_CONNECTION_STRING", "Server=localhost;Port=5432;Database=beanie;User id=user;Password=pass")
            }).Build();
            _service = new BeanieService(_logger, _config);
        }

        [Fact]
        public void GetExistingGame_ExistingId_ReturnsScoreBoard()
        {
            _fixture.ExecuteInsert(@"INSERT INTO public.game(
	            id, activeround, latestround)
	            VALUES ('TTTRRR', 1, 2);");

            _fixture.ExecuteInsert(@"INSERT INTO public.player(
	            username, gameid, scores, turnorder)
	            VALUES ('Pam', 'TTTRRR', '[]', 1),
                ('Tyler', 'TTTRRR', '[]', 2),
                ('Scott', 'TTTRRR', '[]', 3);");

            var scoreboard = _service.GetExistingGame("TTTRRR");
            Assert.Equal("TTTRRR", scoreboard.GameId);
            Assert.Equal(1, scoreboard.ActiveRound);
            Assert.Equal(2, scoreboard.LatestRound);

            var pam = scoreboard.Players.Where(x => x.Name == "Pam").FirstOrDefault();
            Assert.NotNull(pam);
            Assert.Equal(1, pam.TurnOrder);

            var tyler = scoreboard.Players.Where(x => x.Name == "Tyler").FirstOrDefault();
            Assert.NotNull(tyler);
            Assert.Equal(2, tyler.TurnOrder);

            var scott = scoreboard.Players.Where(x => x.Name == "Scott").FirstOrDefault();
            Assert.NotNull(scott);
            Assert.Equal(3, scott.TurnOrder);

        }

        [Fact]
        public void CreateNewGame_ValidArgs_Persists()
        {
            var scoreboard = new ScoreBoard()
            {
                ActiveRound = 3,
                LatestRound = 6,
                GameId = "ABCDEF",
                Players = new List<Player>()
                {
                    new Player()
                    {
                        Name = "Johnny",
                        Scores = new List<PlayerScore>(),
                        TurnOrder = 2,
                    },
                    new Player()
                    {
                        Name = "Kim",
                        Scores = new List<PlayerScore>(),
                        TurnOrder = 1,
                    }
                }
            };

            _service.CreateNewGame(scoreboard);

            var games = _fixture.ExecuteQuery<GameEntity>(@"SELECT * FROM game;");
            Assert.Single(games);
            var game = games.FirstOrDefault();
            Assert.True(game.ActiveRound == scoreboard.ActiveRound);
            Assert.True(game.LatestRound == scoreboard.LatestRound);
            Assert.True(game.Id == scoreboard.GameId);

            var players = _fixture.ExecuteQuery<PlayerEntity>(@"SELECT * FROM player;");
            Assert.Equal(2, players.Count());
            players.ForEach(player =>
            {
                Assert.True(player.GameId.Equals(game.Id));
                Assert.Contains(player.UserName, new List<string> { "Johnny", "Kim" });
                if (player.UserName == "Johnny")
                {
                    Assert.True(player.TurnOrder == scoreboard.Players[0].TurnOrder);
                }
                else
                {
                    Assert.True(player.TurnOrder == scoreboard.Players[1].TurnOrder);
                }
            });
        }
    }
}
