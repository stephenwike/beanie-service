using Beanie.WebApi.Models;
using Beanie.WebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace Beanie.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeanieController : ControllerBase
    {
        private readonly ILogger<BeanieController> _logger;
        private IBeanieService _service;

        public BeanieController(ILogger<BeanieController> logger, IBeanieService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        [Route("{id?}")]
        public IActionResult GetScoreBoard(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("API requires game id.");
            }

            try
            {
                var scoreboard = _service.GetExistingGame(id);
                return Ok(scoreboard);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("creategame")]
        public IActionResult CreateNewGame([FromBody]ScoreBoard scoreboard)
        {
            try
            {
                _service.CreateNewGame(scoreboard);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("players")]
        public IActionResult GetPlayers()
        {
            try
            {
                var players = _service.GetPlayers();
                return Ok(players);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        //[HttpPut("score/{round}")]
        //public IActionResult IActionResult(int round, [FromBody]PlayerScore[] playerScores)
        //{
        //    Persistence.SetRoundScores(round, playerScores);
        //    return Ok();
        //}
    }
}
