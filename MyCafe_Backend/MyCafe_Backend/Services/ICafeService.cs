using System;
using MyCafe_Shared.Model;

namespace MyCafe_Backend.Services
{
    public interface ICafeService
    {
        Task<Cafe> GetCafeById(int id);
        Task<List<Cafe>> GetAllCafes();
        Task<bool> AddCafe(Cafe cafe);
        Task<bool> UpdateCafe(Cafe cafe);
        Task<bool> DeleteCafe(int id);
    }
}
