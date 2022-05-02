using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Workshop;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IWorkShopService
    {
        List<WorkshopVenues> GetByGeo(int radius, double latitude, double longitude);
    }
}
