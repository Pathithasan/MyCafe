using System;
using MyCafe_Shared.Model;

namespace MyCafe_Backend.DAL.Repositories
{
    public interface ICafeRepository
    {
        Task<List<Cafe>> GetAllCafes();
        Task<Cafe> GetCafeById(int id);
        Task<bool> AddCafe(Cafe cafe);
        Task<bool> UpdateCafe(Cafe cafe);
        Task<bool> DeleteCafe(int id);
    }
}

