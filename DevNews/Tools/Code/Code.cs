namespace Tools.Code;

public static class CodeGenerator
{
    public static string GenerateNumberCode(this int count)
        => Guid.NewGuid().GetHashCode().ToString().Replace("-", "")[..count];
}