{
    public interface ISessionService
    {
        Paged<Session> GetAll(int pageIndex, int pageSize);
        Session GetById(int id);
        int Create(SessionAddRequest model, int userId);
        void Update(SessionUpdateRequest model, int userId);
        void Delete(int id);
        Paged<Session> GetByCreatedBy(int pageIndex, int pageSize, int user);
        List<Session> GetByWorkShopId(int workShop);
    }
}
