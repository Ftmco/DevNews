namespace Entity.Comment;

public record Comment
{
    /// <summary>
    /// Comment Primary Key
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Comment Text
    /// </summary>
    [Required]
    public string Text { get; set; }

    /// <summary>
    /// Comment Object Id
    /// </summary>
    [Required]
    public Guid ObjectId { get; set; }

    /// <summary>
    /// Comment Object Type
    /// </summary>
    [Required]
    public short ObjectType { get; set; }
}
