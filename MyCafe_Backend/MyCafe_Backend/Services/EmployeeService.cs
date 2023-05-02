using System;
using MyCafe_Backend.DAL.Repositories;
using MyCafe_Shared.Model;
using System.Text.RegularExpressions;
using MyCafe_Shared.ViewModel;

namespace MyCafe_Backend.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ICafeRepository _cafeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository, ICafeRepository cafeRepository)
        {
            _employeeRepository = employeeRepository;
            _cafeRepository = cafeRepository;
        }

        public async Task<Employee> GetEmployeeById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentException("Id cannot be null or empty");
            }

            return await _employeeRepository.GetEmployeeById(id);
        }

        public async Task<List<EmployeeVM>> GetEmployeesByCafe(string cafeName = "")
        {
            return await _employeeRepository.GetEmployeesByCafe(cafeName);
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _employeeRepository.GetAllEmployees();
        }

        public async Task<bool> AddEmployee(Employee employee)
        {
            await IsExistingValidation(employee);

            return await _employeeRepository.AddEmployee(employee);
        }

        public async Task<bool> UpdateEmployee(Employee employee, string id)
        {
            await IsExistingValidation(employee, id);

            return await _employeeRepository.UpdateEmployee(employee, id);
        }

        public async Task<bool> DeleteEmployee(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentException("Id cannot be null or empty");
            }
            if (await _employeeRepository.GetEmployeeById(id) == null)
            {
                throw new ArgumentException("Sorry, but no employee for given ID. :/");
            }
            return await _employeeRepository.DeleteEmployee(id);
        }

        private async Task IsExistingValidation(Employee employee, string Id="")
        {
            var cafes = await _employeeRepository.GetAllEmployees();
            if (employee == null)
            {
                throw new ArgumentNullException(nameof(employee));
            }
            if (Id == "")
            {
                if (cafes.Any(c => c.Id == employee.Id))
                {
                    throw new ArgumentException($"A employee with ID '{employee.Id}' already exists.");
                }
            }
            else
            {
                if (!cafes.Any(c => c.Id == Id))
                {
                    throw new ArgumentException($"Sorry, but no employee for given ID '{Id}'. :/");
                }

                //Remove the current employee in order to validate the new employee's properties with the details of the existing employees.
                cafes.RemoveAll(c => c.Id == Id);
                if (cafes.Any(c => c.Id == employee.Id))
                {
                    throw new ArgumentException($"A employee with ID '{employee.Id}' already exists.");
                }
            }
            if (cafes.Any(c => c.Name == employee.Name))
            {
                throw new ArgumentException($"A employee with name '{employee.Name}' already exists.");
            }
            if (cafes.Any(c => c.PhoneNumber == employee.PhoneNumber))
            {
                throw new ArgumentException($"A employee with phone number '{employee.PhoneNumber}' already exists.");
            }
            if (cafes.Any(c => c.EmailAddress == employee.EmailAddress))
            {
                throw new ArgumentException($"A employee with email address '{employee.EmailAddress}' already exists.");
            }

            if(await _cafeRepository.GetCafeById(employee.CafeId)== null)
            {
                throw new ArgumentException($"A given cafe Id '{employee.CafeId}' is not found.");
            }
        }

        
    }

}

