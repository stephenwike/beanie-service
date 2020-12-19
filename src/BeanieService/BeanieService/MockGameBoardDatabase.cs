using BeanieService.Model;
using System.Linq;

namespace BeanieService
{
    internal class MockGameBoardDatabase
    {
        private string[] _players;
        private PlayerScoreModel[][] _scoreboard;

        internal void SetPlayers(string[] players)
        {
            _players = players;
            _scoreboard = new PlayerScoreModel[13].Select(x => {
                return _players.Select(player => new PlayerScoreModel() { Name = player }).ToArray();
            }).ToArray();
        }

        internal void SetRoundScores(int round, PlayerScoreModel[] playerScores)
        {
            _scoreboard[round] = playerScores;
        }

        internal PlayerScoreModel[][] GetScoreBoard()
        {
            return _scoreboard;
        }
    }
}