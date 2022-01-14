namespace Entity.User;

public class User
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string UserName { get; set; }

    public string Email { get; set; }

    public string MobileNo { get; set; }

    public DateTime RegisterDate { get; set; }

    public bool IsActiive { get; set; }

    public string ActiveCode { get; set; }

    public string Password { get; set; }
}
