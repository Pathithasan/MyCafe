using System;
using MyCafe_Backend.DAL.Repositories;
using MyCafe_Shared.Model;
using System.Text.RegularExpressions;
using MyCafe_Shared.ViewModel;

namespace MyCafe_Backend.Services
{
    public class CafeService : ICafeService
    {
        private readonly ICafeRepository _cafeRepository;

        public CafeService(ICafeRepository cafeRepository)
        {
            _cafeRepository = cafeRepository;
        }

        public async Task<Cafe> GetCafeById(int id)
        {
            return await _cafeRepository.GetCafeById(id);
        }

        public async Task<List<Cafe>> GetAllCafes()
        {
            return await _cafeRepository.GetAllCafes();
        }

        public async Task<List<CafeVM>> GetAllCafesWithEmployees()
        {
            return await _cafeRepository.GetCafesByLocation("");
        }

        public async Task<List<CafeVM>> GetCafesByLocation(string location)
        {
            if(location !="")
            {
                return await _cafeRepository.GetCafesByLocation(location); 
            }
            else
            {
                return new List<CafeVM>();
            }
            
        }

        public async Task<bool> AddCafe(Cafe cafe)
        {
            if (cafe == null)
            {
                throw new ArgumentNullException(nameof(cafe));
            }

            var cafes = await _cafeRepository.GetAllCafes();
            if (cafes.Any(c => c.Name == cafe.Name))
            {
                throw new ArgumentException($"A cafe with name '{cafe.Name}' already exists.");
            }
            cafe.Id = 0;
            return await _cafeRepository.AddCafe(cafe);
        }

        public async Task<bool> UpdateCafe(Cafe cafe)
        {
            if (cafe == null)
            {
                throw new ArgumentNullException(nameof(cafe));
            }
            var dbCafe = await _cafeRepository.GetCafeById(cafe.Id);
            if (dbCafe != null)
            {
                dbCafe.Description = cafe.Description;
                dbCafe.Logo = cafe.Logo;

                if (dbCafe.Name == cafe.Name)
                {
                    return await _cafeRepository.UpdateCafe(cafe);
                }
                else
                {
                    var cafes = await _cafeRepository.GetAllCafes();
                    if (cafes.Any(c => c.Name == cafe.Name))
                    {
                        throw new ArgumentException($"A cafe with name '{cafe.Name}' already exists.");
                    }
                    dbCafe.Name = cafe.Name;
                    return await _cafeRepository.UpdateCafe(cafe);
                    
                }
            }
            else
            {
                throw new ArgumentException("Sorry, but no cafe for given ID. :/");
            }
        }

        public async Task<bool> DeleteCafe(int id)
        {
            var cafe = await _cafeRepository.GetCafeById(id);
            if(cafe == null)
            {
                throw new ArgumentException("Sorry, but no cafe for given ID. :/");
            }
            return await _cafeRepository.DeleteCafe(id);
        }

    }
}
