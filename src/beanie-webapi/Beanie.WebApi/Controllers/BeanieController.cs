using Beanie.WebApi.Core;
using Beanie.WebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Beanie.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeanieController : ControllerBase
    {
        private readonly ILogger<BeanieController> _logger;
        private BeanieService _service;

        public BeanieController(ILogger<BeanieController> logger, BeanieService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IActionResult GetScoreBoard()
        {
            var scoreboard = Persistence.GetScoreBoard();
            return Ok(scoreboard);
        }

        [HttpPost("creategame")]
        public IActionResult CreateNewGame([FromBody]string[] players)
        {
            Persistence.AddGame(players);
            return Ok();
        }

        [HttpGet("players")]
        public IActionResult GetPlayers()
        {
            var players = _service.GetPlayers();
            return Ok(players);
        }

        //[HttpPut("score/{round}")]
        //public IActionResult IActionResult(int round, [FromBody]PlayerScore[] playerScores)
        //{
        //    Persistence.SetRoundScores(round, playerScores);
        //    return Ok();
        //}
    }
}
