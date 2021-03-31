using System.Collections.Generic;

namespace Beanie.WebApi.Models
{
    public class ScoreBoard
    {
        public List<Player> Players { get; set; }
        public int ActiveRound { get; set; }
        public int LatestRound { get; set; }
        public string GameId { get; set; }
    }
}
