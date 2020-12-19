using BeanieService.Model;

namespace BeanieService
{
    internal class Persistence
    {
        // This is a fake persistence until I want to create a database.  This will likely get dependency injected.
        private MockGameBoardDatabase _database;

        internal Persistence()
        {
            _database = new MockGameBoardDatabase();
        }

        internal void AddGame(string[] players)
        {
            _database.SetPlayers(players);
        }

        internal PlayerScoreModel[][] GetScoreBoard()
        {
            return _database.GetScoreBoard();
        }

        internal void SetRoundScores(int round, PlayerScoreModel[] playerScores)
        {
            _database.SetRoundScores(round, playerScores);
        }
    }
}