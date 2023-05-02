using System;
using MyCafe_Shared.Model;
using MyCafe_Shared.ViewModel;

namespace MyCafe_Backend.DAL.Repositories
{
	public interface IEmployeeRepository
	{
        Task<List<Employee>> GetAllEmployees();
        Task<Employee> GetEmployeeById(string id);
        Task<List<EmployeeVM>> GetEmployeesByCafe(string cafeName);
        Task<bool> AddEmployee(Employee employee);
        Task<bool> UpdateEmployee(Employee employee, string id);
        Task<bool> DeleteEmployee(string id);
    }
}

