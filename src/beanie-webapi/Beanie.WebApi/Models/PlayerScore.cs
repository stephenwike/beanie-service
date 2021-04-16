using System;

namespace Beanie.WebApi.Models
{
    [Serializable]
    public class PlayerScore
    {
        public int? Points { get; set; }
        public bool? Penalty { get; set; }
    }
}
