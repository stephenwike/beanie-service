using Beanie.WebApi.Models;
using System.Linq;

namespace Beanie.WebApi.Core
{
    internal class MockGameBoardDatabase
    {
        private ScoreBoard _scoreboard;

        internal void SetPlayers(string[] players)
        {
            _scoreboard = new ScoreBoard()
            {
                Players = players.Select(x =>
                {
                    return new Player()
                    {
                        Name = x
                    };
                }).ToList()
            };
        }

        internal void SetRoundScores(int round, PlayerScore[] playerScores)
        {
            playerScores.ToList().ForEach(player =>
            {
                _scoreboard.Players.Where(x => x.Name == player.Name).First().Scores[round] = player.Score;
            });
        }

        internal ScoreBoard GetScoreBoard()
        {
            return _scoreboard;
        }
    }
}