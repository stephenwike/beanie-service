using Beanie.WebApi.Core;
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
                var message = "ID parameter was expected but was null or empty";
                _logger.LogWarning(message);
                return BadRequest(message);
            }

            try
            {
                var scoreboard = _service.GetExistingGame(id);
                if (scoreboard == null)
                {
                    _logger.LogWarning("Could not find game board from provided ID.");
                }

                _logger.LogInformation("Scoreboard successfully retrieved from ID.");
                return Ok(scoreboard);
            }
            catch (Exception ex)
            {
                _logger.LogError("Exception thrown while trying to fetch and create scoreboard from ID. {exception}", ex);
                return StatusCode(500);
            }
        }

        [HttpPost("creategame")]
        public IActionResult CreateNewGame([FromBody]ScoreBoard scoreboard)
        {
            if (scoreboard == null)
            {
                var message = "Scoreboard parameter was expected but was null";
                _logger.LogWarning(message);
                return BadRequest(message);
            }

            if (scoreboard.Players == null)
            {
                var message = "Scoreboard.Players was expected but was null or empty";
                _logger.LogWarning(message);
                return BadRequest(message);
            }

            if (scoreboard.Players.Count < Constants.MIN_PLAYER_COUNT)
            {
                var message = $"Scoreboard.Players was expected to be greater than or equal to {Constants.MIN_PLAYER_COUNT}, but was {scoreboard.Players.Count}";
                _logger.LogWarning(message);
                return BadRequest(message);
            }

            try
            {
                _service.CreateNewGame(scoreboard);
                _logger.LogInformation("New game successfully created.");
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError("Exception thrown while trying to create a new game. {exception}", ex);
                return StatusCode(500);
            }
        }

        [HttpGet("players")] // TODO:  Do I need this?
        public IActionResult GetPlayers()
        {
            try
            {
                var players = _service.GetPlayers();
                return Ok(players);
            }
            catch(Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpPut("scores")]
        public IActionResult SetScores([FromBody]ScoreBoard scoreboard)
        {
            if (scoreboard == null)
            {
                var message = "Scoreboard parameter was expected but was null";
                _logger.LogWarning(message);
                return BadRequest(message);
            }

            try
            {
                _service.SetScores(scoreboard);
                _logger.LogInformation("Scores successfully set.");
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError("Exception thrown while trying to set player scores. {exception}", ex);
                return StatusCode(500);
            }
        }
    }
}
