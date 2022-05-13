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
