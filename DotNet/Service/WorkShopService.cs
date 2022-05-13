{
    public class WorkShopService : IWorkShopService
    {
        IDataProvider _data = null;
        IUserMapper _userMapper = null;

        public WorkShopService(IDataProvider data, IUserMapper mapper, ILookUp lookMapper)
        {
            _data = data;
            _userMapper = mapper;

        }
        
        public List<WorkshopVenues> GetByGeo(int radius, double latitude, double longitude)
        {
            List<WorkshopVenues> list = null;

            _data.ExecuteCmd("[dbo].[Workshop_SelectAll_GeoSearch]", (param) =>
            {
                param.AddWithValue("@Distance", radius);
                param.AddWithValue("@Latitude", latitude);
                param.AddWithValue("@Longitude", longitude);
            },

            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int ind = 0;
                WorkshopVenues location = new WorkshopVenues();
                location.Workshop = new WorkShop();
                location.LocationId = reader.GetSafeInt32(ind++);
                location.LocationType = reader.GetSafeString(ind++);
                location.LineOne = reader.GetSafeString(ind++);
                location.LineTwo = reader.GetSafeString(ind++);
                location.City = reader.GetSafeString(ind++);
                location.Zip = reader.GetSafeString(ind++);
                location.State = reader.GetSafeString(ind++);
                location.Latitude = reader.GetSafeDouble(ind++);
                location.Longitude = reader.GetSafeDouble(ind++);
                location.Workshop = mapWorkShop(reader, ref ind);
                location.VenueId = reader.GetSafeInt32(ind++);
                location.VenueName = reader.GetSafeString(ind++);
                location.VenueImageUrl = reader.GetSafeString(ind++);
                location.Range = reader.GetSafeDouble(ind++);

                if (list == null)
                {
                    list = new List<WorkshopVenues>();
                }

                list.Add(location);
            });

            return list;
        }

        private WorkShop mapWorkShop(IDataReader reader, ref int startingIndex)
        {
            WorkShop workShop = new WorkShop();

            workShop.Id = reader.GetSafeInt32(startingIndex++);
            workShop.Name = reader.GetSafeString(startingIndex++);
            workShop.Summary = reader.GetSafeString(startingIndex++);
            workShop.ShortDescription = reader.GetSafeString(startingIndex++);
            workShop.VenueId = reader.GetSafeInt32(startingIndex++);
            workShop.Host = _userMapper.Map(reader, ref startingIndex);
            workShop.WorkShopType = reader.GetSafeString(startingIndex++);
            workShop.WorkShopStatus = reader.GetSafeString(startingIndex++);
            workShop.ImageUrl = reader.GetSafeString(startingIndex++);
            workShop.ExternalSiteUrl = reader.GetSafeString(startingIndex++);
            workShop.LanguageId = reader.GetSafeInt32(startingIndex++);
            workShop.IsFree = reader.GetSafeBool(startingIndex++);
            workShop.NumberOfSessions = reader.GetSafeInt32(startingIndex++);
            workShop.DateStart = reader.GetDateTime(startingIndex++);
            workShop.DateEnd = reader.GetDateTime(startingIndex++);
            workShop.DateCreated = reader.GetDateTime(startingIndex++);
            workShop.DateModified = reader.GetDateTime(startingIndex++);

            return workShop;
        }
    }
}
