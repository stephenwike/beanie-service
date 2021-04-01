using System;

namespace Beanie.WebApi.Entities
{
    [Serializable]
    public class PlayerEntity
    {
        public string UserName { get; set; }
        public string GameId { get; set; }
        public string Scores { get; set; }
        public int TurnOrder { get; set; }
    }
}
