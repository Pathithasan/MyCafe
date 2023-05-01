using System;
using MyCafe_Shared.Model;

namespace MyCafe_Backend.DAL.Repositories
{
	public interface IEmployeeRepository
	{
        Task<List<Employee>> GetAllEmployees();
        Task<Employee> GetEmployeeById(string id);
        Task<bool> AddEmployee(Employee employee);
        Task<bool> UpdateEmployee(Employee employee, string id);
        Task<bool> DeleteEmployee(string id);
    }
}

