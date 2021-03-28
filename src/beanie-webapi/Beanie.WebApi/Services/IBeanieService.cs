using Beanie.WebApi.Models;
using System.Collections.Generic;

namespace Beanie.WebApi.Services
{
    public interface IBeanieService
    {
        List<Player> GetPlayers();
    }
}
