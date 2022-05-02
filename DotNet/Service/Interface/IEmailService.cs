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
        Task SendEmail(SendGridMessage msg);
        Task SendTest(EmailAddRequest emailModel);
        Task SendRegistrationConfirmation(string email, string token);
        Task<bool> ContactUs(ContactUsAddRequest model);        
        Task SendPasswordResetEmail(string email, string token);
        Task SendZoomLink(EmailsAddRequest emailsModel);
        Task SubscribeToNewsletter(string email);
        Task SendPdf(IFormFile pdf, IFormFile requestModel);

    }
}