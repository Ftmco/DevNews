namespace Entity.Article;

public class File
{
    [Key]
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string OrginalName { get; set; }

    public string Type { get; set; }

    public short ObjectType { get; set; }

    public string Directory { get; set; }

    public DateTime CreateDate { get; set; }
}
