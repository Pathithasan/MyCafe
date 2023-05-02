using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyCafe_Backend.Services;
using MyCafe_Shared.Model;
using MyCafe_Shared.ViewModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyCafe_Backend.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CafeController : Controller
    {
        private readonly ICafeService _cafeService;

        public CafeController(ICafeService context)
        {
            _cafeService = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<CafeVM>>> GetAllCafes()
        {
            var cafes = await _cafeService.GetAllCafesWithEmployees();
            return Ok(cafes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cafe>> GetCafeById(int id)
        {
            var cafe = await _cafeService.GetCafeById(id);

            if (cafe == null)
            { 
                return NotFound("Sorry, no cafe here. :/");
            }
            return Ok(cafe);
        }

        [HttpGet]
        public async Task<ActionResult<CafeVM>> GetCafes(string? location)
        {
            return Ok(await _cafeService.GetCafesByLocation(location));
        }

        [HttpPost]
        public async Task<ActionResult<List<Cafe>>> CreateCafe(Cafe cafe)
        {
            if (await _cafeService.AddCafe(cafe))
            {
                return Ok(await _cafeService.GetAllCafes());
            }
            else
            {
                return BadRequest("Unable to create");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Cafe>>> UpdateCafe(Cafe cafe, int id)
        {
            if (await _cafeService.UpdateCafe(cafe))
            {
                return Ok(await _cafeService.GetAllCafes());
            }
            else
            {
                return BadRequest("Unable to update");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Cafe>>> DeleteCafe(int id)
        {
            if(await _cafeService.DeleteCafe(id))
            {
                return Ok(await _cafeService.GetAllCafes());
            }
            else
            {
                return BadRequest("Unable to delete");
            }
        }
    }
}

