using System;
using MyCafe_Shared.Model;

namespace MyCafe_Backend.Services
{
    public interface IEmployeeService
    {
        Task<Employee> GetEmployeeById(string id);
        Task<List<Employee>> GetAllEmployees();
        Task<bool> AddEmployee(Employee employee);
        Task<bool> UpdateEmployee(Employee employee, string Id);
        Task<bool> DeleteEmployee(string id);
    }
}

