using System.Net;
using System.Net.Mail;

namespace Tools.Email;

public static class EmailExtensions
{
    public static async Task SendEmailAsync(this string email, string subject, string body)
        => await Task.Run(async () =>
        {
            MailMessage mailMessage = new()
            {
                From = new MailAddress("article.news.tm@gmail.com"),
                Subject = subject,
                IsBodyHtml = true,
                Body = body,
            };
            mailMessage.To.Add(email);
            SmtpClient smtpClient = new()
            {
                Port = 587,
                Host = "smtp.gmail.com",
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("article.news.tm@gmail.com", "1G14ijWA"),
                DeliveryMethod = SmtpDeliveryMethod.Network
            };
            await smtpClient.SendMailAsync(mailMessage);
        });
}