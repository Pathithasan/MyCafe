using System;
using MyCafe_Shared.Model;
using MyCafe_Shared.ViewModel;

namespace MyCafe_Backend.Services
{
    public interface ICafeService
    {
        Task<Cafe> GetCafeById(int id);
        Task<List<Cafe>> GetAllCafes();
        Task<List<CafeVM>> GetAllCafesWithEmployees();
        Task<List<CafeVM>> GetCafesByLocation(string location);
        Task<bool> AddCafe(Cafe cafe);
        Task<bool> UpdateCafe(Cafe cafe);
        Task<bool> DeleteCafe(int id);
    }
}
