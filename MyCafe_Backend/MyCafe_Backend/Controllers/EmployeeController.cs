using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyCafe_Backend.Services;
using MyCafe_Shared.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyCafe_Backend.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService context)
        {
            _employeeService = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAllEmployeees()
        {
            var employees = await _employeeService.GetAllEmployees();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeById(string id)
        {
            var employee = await _employeeService.GetEmployeeById(id);

            if (employee == null)
            {
                return NotFound("Sorry, no employee here. :/");
            }
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<List<Employee>>> CreateEmployee(Employee employee)
        {
            if (await _employeeService.AddEmployee(employee))
            {
                return Ok(await _employeeService.GetAllEmployees());
            }
            else
            {
                return BadRequest("Unable to create");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Employee>>> UpdateEmployee(Employee employee, string id)
        {
            if (await _employeeService.UpdateEmployee(employee, id))
            {
                return Ok(await _employeeService.GetAllEmployees());
            }
            else
            {
                return BadRequest("Unable to update");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Employee>>> DeleteEmployee(string id)
        {
            if (await _employeeService.DeleteEmployee(id))
            {
                return Ok(await _employeeService.GetAllEmployees());
            }
            else
            {
                return BadRequest("Unable to delete");
            }
        }
    }
}

