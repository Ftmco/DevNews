namespace ViewModel.File;

public record UploadFileViewModel(string Base64, string Type, string OgName);

public record SaveFileViewModel(string Base64, string Path);

public record SaveFileResponse(SaveFileStatus Status, string Name, string Type, int Size);

public enum SaveFileStatus
{
    Success,
    Exception
}

public enum FileTypes
{
    ChannelAvatar = 0,
    UserProfile = 1
}

public enum ChannelAvatarType
{
    Main = 0,
    Othrer = 1
}