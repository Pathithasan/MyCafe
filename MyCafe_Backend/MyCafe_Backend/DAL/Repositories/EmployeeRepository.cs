using System;
using System.Data;
using System.Data.Common;
using MyCafe_Shared.Model;
using MyCafe_Shared.ViewModel;
using MySql.Data.MySqlClient;
using static Google.Protobuf.Reflection.SourceCodeInfo.Types;

namespace MyCafe_Backend.DAL.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly MySqlConnection _connection;
        public EmployeeRepository(MySqlConnection connection)
        { 
            _connection = connection;
        }

        public async Task<Employee> GetEmployeeById(string id)
        {
            Employee employee = null;

            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand("SELECT * FROM employee WHERE id = @id", _connection);
            command.Parameters.AddWithValue("@id", id);

            using (var reader = await command.ExecuteReaderAsync())
            {
                if (await reader.ReadAsync())
                {
                    employee = new Employee
                    {
                        Id = reader.GetString("id"),
                        Name = reader.GetString("name"),
                        EmailAddress = reader.GetString("email_address"),
                        PhoneNumber = reader.GetString("phone_number"),
                        Gender = reader.GetString("gender"),
                        CafeId = reader.GetInt32("cafe_id"),
                        StartDate = reader.GetDateTime("start_date")
                    };
                }
            }

            await _connection.CloseAsync();

            return employee;
        }

        public async Task<List<EmployeeVM>> GetEmployeesByCafe(string cafeName)
        {
            List<EmployeeVM> employees = new List<EmployeeVM>();

            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.Connection = _connection;
            command.CommandText = "get_employees_by_cafe";
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@cafe_name", cafeName);
            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    employees.Add(new EmployeeVM
                    {
                        Id = reader.GetString("id"),
                        Name = reader.GetString("name"),
                        EmailAddress = reader.GetString("email_address"),
                        DaysWorked = reader.GetInt32("days_worked"),
                        PhoneNumber = reader.GetString("phone_number"),
                        Cafe = reader.GetString("cafe")
                        
                    });
                }
            }

            await _connection.CloseAsync();

            return employees;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            List<Employee> employees = new List<Employee>();

            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.CommandText = "SELECT * FROM employee";
            command.Connection = _connection;

            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    employees.Add(new Employee
                    {
                        Id = reader.GetString("id"),
                        Name = reader.GetString("name"),
                        EmailAddress = reader.GetString("email_address"),
                        PhoneNumber = reader.GetString("phone_number"),
                        Gender = reader.GetString("gender"),
                        CafeId = reader.GetInt32("cafe_id"),
                        StartDate = reader.GetDateTime("start_date")
                    });
                }
            }

            await _connection.CloseAsync();

            return employees;
        }

        public async Task<bool> AddEmployee(Employee employee)
        {
            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.Connection = _connection;
            command.CommandText = "INSERT INTO employee (id, name, email_address, phone_number, gender, cafe_id, start_date) " +
                                                "VALUES (@id, @name, @email, @phone, @gender, @cafeId, @startDate)";

            command.Parameters.AddWithValue("@id", employee.Id);
            command.Parameters.AddWithValue("@name", employee.Name);
            command.Parameters.AddWithValue("@email", employee.EmailAddress);
            command.Parameters.AddWithValue("@phone", employee.PhoneNumber);
            command.Parameters.AddWithValue("@gender", employee.Gender.ToString());
            command.Parameters.AddWithValue("@cafeId", employee.CafeId);
            command.Parameters.AddWithValue("@startDate", employee.StartDate);

            int rowsAffected = await command.ExecuteNonQueryAsync();

            await _connection.CloseAsync();

            return rowsAffected > 0;
        }

        public async Task<bool> UpdateEmployee(Employee employee, string id)
        {
            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.Connection = _connection;
            command.CommandText = "UPDATE employee SET " +
                                    "id = @id, " +
                                    "name = @name, " +
                                    "email_address = @email, " +
                                    "phone_number = @phone, " +
                                    "gender = @gender, " +
                                    "cafe_id = @cafeId, " +
                                    "start_date = @startDate " +
                                    "WHERE id = @oldId";
 
            command.Parameters.AddWithValue("@Id", employee.Id);
            command.Parameters.AddWithValue("@name", employee.Name);
            command.Parameters.AddWithValue("@email", employee.EmailAddress);
            command.Parameters.AddWithValue("@phone", employee.PhoneNumber);
            command.Parameters.AddWithValue("@gender", employee.Gender);
            command.Parameters.AddWithValue("@cafeId", employee.CafeId);
            command.Parameters.AddWithValue("@startDate", employee.StartDate);
            command.Parameters.AddWithValue("@oldId", id);

            int rowsAffected = await command.ExecuteNonQueryAsync();

            await _connection.CloseAsync();

            return rowsAffected > 0;
        }

        public async Task<bool> DeleteEmployee(string id)
        {
            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.Connection = _connection;

            command.CommandText = "DELETE FROM employee WHERE id = @id";

            command.Parameters.AddWithValue("@id", id);

            int rowsAffected = await command.ExecuteNonQueryAsync();

            await _connection.CloseAsync();

            return rowsAffected > 0;
        }

       
    }

}

