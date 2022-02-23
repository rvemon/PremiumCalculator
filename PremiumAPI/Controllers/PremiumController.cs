using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PremiumAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class PremiumController : ControllerBase
    {
        PremiumCalculator premiumCalculator = new PremiumCalculator();

        [Route("table")]
        [HttpGet]
        public IActionResult GetPremiumTable()
        {

            return Ok(premiumCalculator.premiumPlans);
        }

        [Route("states")]
        [HttpGet]
        public IActionResult GetStates()
        {

            return Ok(premiumCalculator.states);
        }

        [Route("plans")]
        [HttpGet]
        public IActionResult GetPlans()
        {

            return Ok(premiumCalculator.plans);
        }

        [HttpPost]
        public IActionResult Post([FromForm]string date, [FromForm]string state, [FromForm]string age, [FromForm]string plan)
        {

            if (string.IsNullOrEmpty(date) || string.IsNullOrEmpty(state) || string.IsNullOrEmpty(age) || string.IsNullOrEmpty(plan))
                return BadRequest();
            //validates all four fields
            Response response = premiumCalculator.getResult(date, state, int.Parse(age), plan);

            return Ok(response);
        }
    }
}
