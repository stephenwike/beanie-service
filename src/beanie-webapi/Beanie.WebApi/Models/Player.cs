namespace Beanie.WebApi.Models
{
    public class Player
    {
        public string Name { get; set; }
        public PlayerScore[] Scores { get; set; }
        public int TurnOrder { get; set; }
    }
}
