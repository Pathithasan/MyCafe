using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using MyCafe_Shared.Model;
using MyCafe_Shared.ViewModel;

namespace MyCafe_Backend.DAL.Repositories
{
    public class CafeRepository : ICafeRepository
    {
        private readonly MySqlConnection _connection;

        public CafeRepository(MySqlConnection connection)
        {
            _connection = connection;
        }

        public async Task<Cafe> GetCafeById(int id)
        {
            Cafe cafe = null;

            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.Connection = _connection;
            command.CommandText = "SELECT * FROM cafe WHERE id = @id";
            command.Parameters.AddWithValue("@id", id);

            using (var reader = await command.ExecuteReaderAsync())
            {
                if (await reader.ReadAsync())
                {
                    cafe = new Cafe
                    {
                        Id = reader.GetInt32("id"),
                        Name = reader.GetString("name"),
                        Location = reader.GetString("location"),
                        Description = reader.GetString("description"),
                        Logo = reader.GetString("logo"),
                    };
                }
            }

            await _connection.CloseAsync();

            return cafe;
        }

        public async Task<List<Cafe>> GetAllCafes()
        {
            List<Cafe> cafes = new List<Cafe>();

            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.CommandText = "SELECT * FROM cafe";
            command.Connection = _connection;

            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    cafes.Add(new Cafe
                    {
                        Id = reader.GetInt32("id"),
                        Name = reader.GetString("name"),
                        Location = reader.GetString("location"),
                        Description = reader.GetString("description"),
                        Logo = reader.GetString("logo"),
                    });
                }
            }

            await _connection.CloseAsync();

            return cafes;
        }

        public async Task<List<CafeVM>>GetCafesByLocation(string location)
        {
            List<CafeVM> cafes = new List<CafeVM>();

            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.Connection = _connection;
            command.CommandText = "get_cafes_by_location";
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@location", location);
            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    cafes.Add(new CafeVM
                    {
                        Id = reader.GetInt32("id"),
                        Name = reader.GetString("name"),
                        Location = reader.GetString("location"),
                        Description = reader.GetString("description"),
                        Logo = reader.GetString("logo"),
                        Employees = reader.GetInt32("employees")
                    });
                }
            }

            await _connection.CloseAsync();

            return cafes;
        }

        public async Task<bool> AddCafe(Cafe cafe)
        {
            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.Connection = _connection;
            command.CommandText = "INSERT INTO cafe (name, location, logo, description) " +
                                                "VALUES (@name, @location, @logo, @description)";

            //command.Parameters.AddWithValue("@id", cafe.Id);
            command.Parameters.AddWithValue("@name", cafe.Name);
            command.Parameters.AddWithValue("@location", cafe.Location);
            command.Parameters.AddWithValue("@logo", cafe.Logo);
            command.Parameters.AddWithValue("@description", cafe.Description);

            int rowsAffected = await command.ExecuteNonQueryAsync();

            await _connection.CloseAsync();

            return rowsAffected > 0;
        }

        public async Task<bool> UpdateCafe(Cafe cafe)
        {

            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.Connection = _connection;
            command.CommandText = "UPDATE cafe SET " +
                                        "name = @name, " +
                                        "location = @location, " +
                                        "logo = @logo, " +
                                        "description = @description " +
                                        "WHERE id = @id";

            command.Parameters.AddWithValue("@id", cafe.Id);
            command.Parameters.AddWithValue("@name", cafe.Name);
            command.Parameters.AddWithValue("@location", cafe.Location);
            command.Parameters.AddWithValue("@logo", cafe.Logo);
            command.Parameters.AddWithValue("@description", cafe.Description);

            int rowsAffected = await command.ExecuteNonQueryAsync();

            await _connection.CloseAsync();

            return rowsAffected > 0;
        }

        public async Task<bool> DeleteCafe(int id)
        {
            await _connection.OpenAsync();

            MySqlCommand command = new MySqlCommand();
            command.Connection = _connection;

            command.CommandText = "DELETE FROM cafe WHERE id = @id";

            command.Parameters.AddWithValue("@id", id);

            int rowsAffected = await command.ExecuteNonQueryAsync();

            await _connection.CloseAsync();

            return rowsAffected > 0;
        }
    }
}
