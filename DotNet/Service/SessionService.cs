using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Sessions;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class SessionService : ISessionService
    {
        private IDataProvider _data = null;
        private IUserMapper _user = null;

        public SessionService(IDataProvider data, IUserMapper user)
        {
            _data = data;
            _user = user;
        }

        public Paged<Session> GetAll(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Sessions_SelectAll]";
            List<Session> list = null;
            Paged<Session> page = null;
            int total = 0;

            _data.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                 {
                     col.AddWithValue("@pageIndex", pageIndex);
                     col.AddWithValue("@pageSize", pageSize);
                 }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                  {
                      int startInd = 0;
                      Session session = MapSession(reader, ref startInd);
                      total = reader.GetSafeInt32(startInd++);
                      if (list == null)
                      {
                          list = new List<Session>();
                      }
                      list.Add(session);
                  }
                );
            if(list != null)
            {
                page = new Paged<Session>(list, pageIndex, pageSize, total);
            }

            return page;
        }

        public Session GetById(int id)
        {
            Session session = null;
            string procName = "[dbo].[Sessions_Select_ById]";
            _data.ExecuteCmd(procName
                , inputParamMapper:delegate(SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                }
                ,singleRecordMapper:delegate(IDataReader reader, short set)
                {
                    int ind = 0;
                    session = MapSession(reader, ref ind);
                }
                );

            return session;
        }

        public Paged<Session> GetByCreatedBy(int pageIndex, int pageSize, int user)
        {
            Paged<Session> paged = null;
            List<Session> list = null;
            int total = 0;
            string procName = "[dbo].[Sessions_Select_ByCreatedBy]";

            _data.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@createdBy", user);
                    col.AddWithValue("@pageIndex", pageIndex);
                    col.AddWithValue("@pageSize", pageSize);
                }
                ,singleRecordMapper:delegate(IDataReader reader, short set)
                {
                    int ind =0;
                    Session sess = MapSession(reader, ref ind);
                    total = reader.GetSafeInt32(ind++);
                    if(list == null)
                    {
                        list = new List<Session>();
                    }
                    list.Add(sess);
                }
                );
            if(list != null)
            {
                paged = new Paged<Session>(list, pageIndex, pageSize, total);
            }

            return paged;
        }

        public List<Session> GetByWorkShopId(int workShop)
        {
            string procName = "[dbo].[Sessions_Select_ByWorkShopId]";
            List<Session> list = null;
            _data.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@workShopId", workShop);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startInd = 0;
                    Session session = MapSession(reader, ref startInd);
                    session.WorkShopName = reader.GetSafeString(startInd++);
                    session.Summary = reader.GetSafeString(startInd++);
                    session.ShortDescription = reader.GetSafeString(startInd++);
                    session.ImageUrl = reader.GetSafeString(startInd++);
                    session.NumberOfSessions = reader.GetSafeInt32(startInd++);
                    session.ExternalSiteUrl = reader.GetSafeString(startInd++);
                    session.DateStart = reader.GetSafeDateTime(startInd++);
                    session.DateEnd = reader.GetSafeDateTime(startInd++);
                    if (list == null)
                    {
                        list = new List<Session>();
                    }
                    list.Add(session);
                }
                );

            return list;
        }

        public int Create(SessionAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Sessions_Insert]";

            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                 {
                     AddCommonParams(model, col, userId);

                     SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                     idOut.Direction = ParameterDirection.Output;
                     col.Add(idOut);
                 }
                 , returnParameters: delegate (SqlParameterCollection col)
                 {
                     object oldId = col["@Id"].Value;
                     int.TryParse(oldId.ToString(), out id);
                 });

            return id;
        }

        public void Update(SessionUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Sessions_Update]";

            _data.ExecuteNonQuery(procName
                ,inputParamMapper:delegate(SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@Id", model.Id);
                    
                }
                );
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Sessions_Delete]";
            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                });
        }

        private static void AddCommonParams(SessionAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@TotalSlots", model.TotalSlots);
            col.AddWithValue("@OpenSlots", model.OpenSlots);
            col.AddWithValue("@WorkShopId", model.WorkShopId);
            col.AddWithValue("@User", userId);
            col.AddWithValue("@Date", model.Date);
            col.AddWithValue("@StartTime", model.StartTime);
            col.AddWithValue("@EndTime", model.EndTime);
        }

        private Session MapSession(IDataReader reader, ref int ind)
        {
            Session sess = new Session();
            sess.Id = reader.GetSafeInt32(ind++);
            sess.TotalSlots = reader.GetSafeInt32(ind++);
            sess.OpenSlots = reader.GetSafeInt32(ind++);
            sess.Date = reader.GetSafeDateTime(ind++);
            sess.StartTime = reader.GetSafeTimeSpan(ind++);
            sess.EndTime = reader.GetSafeTimeSpan(ind++);
            sess.DateCreated = reader.GetSafeDateTime(ind++);
            sess.DateModified = reader.GetSafeDateTime(ind++);
            sess.CreatedBy = _user.Map(reader, ref ind);
            sess.ModifiedBy = _user.Map(reader, ref ind);
            sess.WorkShopId = reader.GetSafeInt32(ind++);
            
            return sess;
        }
    }
}
