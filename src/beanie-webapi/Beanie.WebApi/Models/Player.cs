using System.Collections.Generic;

namespace Beanie.WebApi.Models
{
    public class Player
    {
        public string Name { get; set; }
        public List<PlayerScore> Scores { get; set; }
        public int TurnOrder { get; set; }
    }
}
