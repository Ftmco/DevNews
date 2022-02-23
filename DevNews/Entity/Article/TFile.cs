namespace Entity.Article;

public record TFile
{
    [Key]
    public Guid Id
    {
        get; set;
    }

    [Required]
    public string Name
    {
        get; set;
    }

    [Required]
    public string OrginalName
    {
        get; set;
    }

    [Required]
    public string Type
    {
        get; set;
    }

    [Required]
    public short ObjectType
    {
        get; set;
    }

    [Required]
    public string Directory
    {
        get; set;
    }

    [Required]
    public DateTime CreateDate
    {
        get; set;
    }

    public double Size
    {
        get; set;
    }

    [Required]
    public Guid ObjectId { get; set; }
}