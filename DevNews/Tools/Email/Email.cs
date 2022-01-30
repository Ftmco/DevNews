using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Tools.Email;

public static class EmailExtensions
{
    public static async Task<bool> SendEmailAsync(this IEnumerable<string> emails, string subject, string body)
        => await Task.Run(() =>
        {
            try
            {
                MailMessage mailMessage = new()
                {
                    From = new MailAddress("article.news.tm@gmail.com", "Article News"),
                    Subject = subject,
                    IsBodyHtml = true,
                    Body = body,
                };

                foreach (var email in emails.Where(e => !string.IsNullOrEmpty(e)))
                    mailMessage.Bcc.Add(email);

                SmtpClient smtpClient = new("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("article.news.tm@gmail.com", "1G14ijWA"),
                    EnableSsl = true
                };

                smtpClient.Send(mailMessage);
                return true;
            }
            catch
            {
                return false;
            }
        });
}