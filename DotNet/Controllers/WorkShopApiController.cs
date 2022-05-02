using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Workshop;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/workshops")]
    [ApiController]
    public class WorkShopApiController : BaseApiController
    {
        private IWorkShopService _service = null;
        private IAuthenticationService<int> _authService = null;

        public WorkShopApiController(IWorkShopService service
            , ILogger<WorkShopApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

       [HttpGet("geo")]
        public ActionResult<ItemsResponse<WorkshopVenues>> GetByGeo(int radius, double latitude, double longitude)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<WorkshopVenues> list = _service.GetByGeo(radius, latitude, longitude);
                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<WorkshopVenues> { Items = list };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }



    }
}
