using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Sabio.Data.Providers;
using Sabio.Models.AppSettings;
using Sabio.Models.Requests;
using Sabio.Models.Requests.ContactUs;
using Sabio.Models.Requests.Email;
using Sabio.Models.Requests.NewsletterSubscriptions;
using SendGrid;
using SendGrid.Helpers.Mail;
using SendGrid.Helpers.Mail.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;



namespace Sabio.Services
{
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;
        private AppKeys _appKeys;
        private IConfiguration _config;
        private IWebHostEnvironment _env;
        public EmailService(IOptions<AppKeys> appKeys,
            IConfiguration config,
            IWebHostEnvironment env,
            ILogger<EmailService> logger)
        {
            _logger = logger;
            _appKeys = appKeys.Value;
            _config = config;
            _env = env;

        }

        public async Task SendPdf(IFormFile pdf, IFormFile model)
        {
            StringBuilder requestBuild = new StringBuilder();
            Models.Domain.Email emailRequest = null;
            using (StreamReader sr2 = new StreamReader(model.OpenReadStream()))
            {
                while(sr2.Peek() != -1)
                {
                    requestBuild.Append(sr2.ReadLine());
                }
                string requestString = requestBuild.ToString();
                emailRequest = JsonConvert.DeserializeObject<Models.Domain.Email>(requestString);
            }

            var path = _env.WebRootPath + "/EmailTemplate/Pdf.html";
            StreamReader sr = new(path);
            string body;
            {
                body = sr.ReadToEnd();
            }
            body = body.Replace("{body}", emailRequest.Body);

            SendGridMessage msg = new()
            {
                //change this to official trainsquare email when available
                From = new EmailAddress("throwawaybctempemailnowork@gmail.com"),
                Subject = emailRequest.Subject,
                HtmlContent = body
            };

            using (var fileStream = pdf.OpenReadStream())
            {
                await msg.AddAttachmentAsync(pdf.FileName, fileStream);

            }

            msg.AddTo(new EmailAddress(emailRequest.To));
            await SendEmail(msg);
        }

    }
}
