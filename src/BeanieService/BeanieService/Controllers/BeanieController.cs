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
        private Persistence _persistence;

        public BeanieController(ILogger<BeanieController> logger)
        {
            _logger = logger;
            _persistence = new Persistence();
        }

        [HttpGet]
        public IActionResult GetScoreBoard()
        {
            var scores = _persistence.GetScoreBoard();
            return Ok(scores);
        }

        [HttpPost("start")]
        public IActionResult CreateNewGame([FromBody]string[] players)
        {
            _persistence.AddGame(players);
            return Ok();
        }

        [HttpPut("score/{round}")]
        public IActionResult IActionResult(int round, [FromBody]PlayerScoreModel[] playerScores)
        {
            _persistence.SetRoundScores(round, playerScores);
            return Ok();
        }
    }
}
