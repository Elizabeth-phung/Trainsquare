using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Sessions;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/sessions")]
    [ApiController]
    public class SessionApiController : BaseApiController
    {
        private ISessionService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SessionApiController(ISessionService service, ILogger<SessionApiController> logger,
            IAuthenticationService<int> authService):base(logger)
        {
            _service = service;
            _authService = authService; 
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<Session>>> GetAll(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Session> paged = _service.GetAll(pageIndex, pageSize);
                if(paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Session>> { Item = paged };
                }
            }
            catch(Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                iCode = 500;
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Session>>GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Session session = _service.GetById(id);
                if(session == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response= new ItemResponse<Session> { Item = session };
                }
            }
            catch (Exception ex)
            {
                iCode=500;
                base.Logger.LogError(ex.ToString());
                response= new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("createdBy")]
        public ActionResult<ItemResponse<Paged<Session>>> GetByCreatedBy(int pageIndex, int pageSize, int user)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Session> session = _service.GetByCreatedBy(pageIndex, pageSize, user);
                if( session == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resources not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Session>> { Item = session };
                }
            }
            catch(Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("workShop/{workShop:int}")]
        public ActionResult<ItemsResponse<Session>> GetByWorkShopId(int workShop)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                List<Session> sessions = _service.GetByWorkShopId(workShop);
                if(sessions == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application data not found.");
                }
                else
                {
                    response = new ItemsResponse<Session> { Items = sessions };
                }
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode,response);  
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(SessionAddRequest model)
        {
            ObjectResult result = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                int id = _service.Create(model, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id};
                result = Created201(response);
            }
            catch(Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(SessionUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;
            
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                iCode=500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                iCode = 500;
                response=new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }
    }
}
