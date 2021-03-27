namespace Beanie.WebApi.Models
{
    public class Player
    {
        public string Name { get; set; }
        public int[] Scores { get; set; } = new int[13];
    }
}
