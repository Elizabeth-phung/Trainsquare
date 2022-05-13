{
    public interface IWorkShopService
    {
        List<WorkshopVenues> GetByGeo(int radius, double latitude, double longitude);
    }
}
