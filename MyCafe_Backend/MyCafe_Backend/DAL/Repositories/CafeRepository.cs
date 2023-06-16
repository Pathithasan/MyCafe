using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using MyCafe_Shared.Model;
using MyCafe_Shared.ViewModel;
using System.Text;
using System.Text.RegularExpressions;

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
                    cafe = new Cafe();
                    cafe.Id = reader.GetInt32("id");
                    cafe.Name = reader.GetString("name");
                    cafe.Location = reader.GetString("location");
                    cafe.Description = reader.GetString("description");

                    if (!reader.IsDBNull(reader.GetOrdinal("logo")))
                    {
                        long logoSize = reader.GetBytes(reader.GetOrdinal("logo"), 0, null, 0, 0);
                        byte[] logoData = new byte[logoSize];
                        reader.GetBytes(reader.GetOrdinal("logo"), 0, logoData, 0, (int)logoSize);
                        cafe.Logo = Encoding.UTF8.GetString(logoData);
                    }
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
                    Cafe cafe = new Cafe();

                    cafe.Id = reader.GetInt32("id");
                    cafe.Name = reader.GetString("name");
                    cafe.Location = reader.GetString("location");
                    cafe.Description = reader.GetString("description");
                       
                    if (!reader.IsDBNull(reader.GetOrdinal("logo")))
                    {
                        long logoSize = reader.GetBytes(reader.GetOrdinal("logo"), 0, null, 0, 0);
                        byte[] logoData = new byte[logoSize];
                        reader.GetBytes(reader.GetOrdinal("logo"), 0, logoData, 0, (int)logoSize);
                        //cafe.Logo= Convert.ToBase64String(logoData);
                        //cafe.Logo = Encoding.ASCII.GetString(logoData);
                        cafe.Logo = Encoding.UTF8.GetString(logoData);
                    }

                    cafes.Add(cafe);
                    
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
                    CafeVM cafe = new CafeVM();
                    cafe.Id = reader.GetInt32("id");
                    cafe.Name = reader.GetString("name");
                    cafe.Location = reader.GetString("location");
                    cafe.Description = reader.GetString("description");
                    cafe.Employees = reader.GetInt32("employees");
                    if (!reader.IsDBNull(reader.GetOrdinal("logo")))
                    {
                        long logoSize = reader.GetBytes(reader.GetOrdinal("logo"), 0, null, 0, 0);
                        byte[] logoData = new byte[logoSize];
                        reader.GetBytes(reader.GetOrdinal("logo"), 0, logoData, 0, (int)logoSize);
                        //cafe.Logo = Convert.ToBase64String(logoData);
                        cafe.Logo = Encoding.UTF8.GetString(logoData);
                    }
                    cafes.Add(cafe);
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
            command.Parameters.AddWithValue("@description", cafe.Description);

            if (!String.IsNullOrEmpty(cafe.Logo) && IsBase64String(cafe.Logo))
            {
                try
                {
                    string base64String = cafe.Logo.Trim();
                    // Remove line breaks and carriage returns
                    base64String = base64String.Replace("\n", string.Empty).Replace("\r", string.Empty);
                    byte[] logoBytes = Encoding.UTF8.GetBytes(base64String);
                    command.Parameters.AddWithValue("@logo", logoBytes);

                }
                catch (Exception ex)
                {
                    throw new ArgumentException("Exception message :" + ex.Message);
                }
            }
            else
            {
                command.Parameters.AddWithValue("@logo", null);
            }

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

            if(!String.IsNullOrEmpty(cafe.Logo) && IsBase64String(cafe.Logo))
            {
                try
                {
                    string base64String = cafe.Logo.Trim();
                    // Remove line breaks and carriage returns
                    base64String = base64String.Replace("\n", string.Empty).Replace("\r", string.Empty);
                    //string base64Pattern = @"[^a-zA-Z0-9+/=]";
                    //string sanitizedString = Regex.Replace(base64String, base64Pattern, string.Empty);

                    // Convert the base64 string back to a byte array
                    //byte[] logoBytes = Convert.FromBase64String(sanitizedString);

                    byte[] logoBytes = Encoding.UTF8.GetBytes(base64String);
                    command.Parameters.AddWithValue("@logo", logoBytes);

                    
                }
                catch (Exception ex)
                {
                    throw new ArgumentException("Exception message :" + ex.Message);
                }
            }
            else
            {
                command.Parameters.AddWithValue("@logo", null);
            }
           
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

        public static bool IsBase64String(string input)
        {
            // Regular expression pattern for base64 encoding with prefix check
            string base64Pattern = @"^(data:.*?;base64,)?[a-zA-Z0-9+/]*={0,2}$";

            // Check if the input matches the base64 pattern
            bool isBase64 = Regex.IsMatch(input, base64Pattern);

            return isBase64;
        }
    }
}
