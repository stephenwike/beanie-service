using BeanieService.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BeanieService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BeanieController : ControllerBase
    {
        private readonly ILogger<BeanieController> _logger;

        public BeanieController(ILogger<BeanieController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetScoreBoard()
        {
            
            var scoreboard = Persistence.GetScoreBoard();
            return Ok(scoreboard);
        }

        [HttpPost("start")]
        public IActionResult CreateNewGame([FromBody]string[] players)
        {
            Persistence.AddGame(players);
            return Ok();
        }

        [HttpPut("score/{round}")]
        public IActionResult IActionResult(int round, [FromBody]PlayerScore[] playerScores)
        {
            Persistence.SetRoundScores(round, playerScores);
            return Ok();
        }
    }
}
