using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.ContactUs;
using Sabio.Models.Requests.Email;
using Sabio.Services;
using Sabio.Web.Models.Responses;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{

    [Route("api/emails")]
    [ApiController]
    public class EmailApiController : ControllerBase
    {
        private IEmailService _emailService;
        private IAuthenticationService<int> _authService = null;

        public EmailApiController(IEmailService emailService
            , ILogger<EmailApiController> logger
            , IAuthenticationService<int> authService)
        {
            _emailService = emailService;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<SuccessResponse> Send(EmailAddRequest emailModel)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _emailService.SendTest(emailModel);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpPost("contactus")]
        public ActionResult<SuccessResponse> ContactUs(ContactUsAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {

                _emailService.ContactUs(model);
                response = new SuccessResponse();

            }
            catch (Exception ex)
            {

                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpGet]
        public ActionResult<SuccessResponse> Send(string email)
        {
            int code = 200;
            BaseResponse response = null;


            try
            {
                string token = Guid.NewGuid().ToString();
                _emailService.SendRegistrationConfirmation(email, token);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPost("zoomlink")]
        public ActionResult<SuccessResponse> SendLink(EmailsAddRequest emailsModel)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _emailService.SendZoomLink(emailsModel);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPost("sendpdf")]
        public ActionResult<SuccessResponse> SendPdf(IFormFile pdf, IFormFile requestModel)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _emailService.SendPdf(pdf, requestModel);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                iCode = 500;
                response= new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }


    }
}