using Microsoft.AspNetCore.Http;
using Sabio.Models.Requests;
using Sabio.Models.Requests.ContactUs;
using Sabio.Models.Requests.Email;
using Sabio.Models.Requests.NewsletterSubscriptions;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IEmailService
    {
        Task SendPdf(IFormFile pdf, IFormFile requestModel);
    }
}
