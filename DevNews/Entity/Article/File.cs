namespace Entity.Article;

public class File
{
  [Key]
  public Guid Id {
    get; set;
  }

  [Required]
  public string Name {
    get; set;
  }

  [Required]
  public string OrginalName {
    get; set;
  }

  [Required]
  public string Type {
    get; set;
  }

  [Required]
  public short ObjectType {
    get; set;
  }

  [Required]
  public string Directory {
    get; set;
  }

  [Required]
  public DateTime CreateDate {
    get; set;
  }

  public double Size {
    get; set;
  }
}