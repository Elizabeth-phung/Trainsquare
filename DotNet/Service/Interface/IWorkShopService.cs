using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Workshop;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IWorkShopService
    {
        int Add(WorkShopAddRequest model, int userId);
        void Delete(int id);
        WorkShop Get(int id);
        Paged<WorkShop> GetAll(int pageIndex, int pageSize);
        Paged<WorkShop> Search(int pageIndex, int pageSize, string query);
        List<WorkShop> GetFive();
        void Update(WorkShopUpdateRequest model, int userId, int id);
        List<WorkshopVenues> GetByGeo(int radius, double latitude, double longitude);
    }
}