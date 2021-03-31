using Beanie.WebApi.Models;

namespace Beanie.WebApi.Core
{
    internal static class Persistence
    {
        // This is a fake persistence until I want to create a database.  This will likely get dependency injected.
        private static MockGameBoardDatabase _database = new MockGameBoardDatabase();

        internal static void AddGame(string[] players)
        {
            _database.SetPlayers(players);
        }

        //internal static ScoreBoard GetScoreBoard()
        //{
        //    return _database.GetScoreBoard();
        //}

        //internal static void SetRoundScores(int round, PlayerScore[] playerScores)
        //{
        //    _database.SetRoundScores(round, playerScores);
        //}
    }
}