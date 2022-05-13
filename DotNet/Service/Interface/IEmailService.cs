{
    public interface IEmailService
    {
        Task SendPdf(IFormFile pdf, IFormFile requestModel);
    }
}
