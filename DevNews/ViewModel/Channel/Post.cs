using Entity.Article;

namespace ViewModel.Channel;

public record PostViewModel(string Message, string CreateDate, Guid OwnerId, short OwnerType, IEnumerable<Entity.Article.File> Files);

public record GetPostResponse(PostStaus Staus, IEnumerable<PostViewModel> Posts,int TotalCount);

public record GetPosts(int TotalCount,IEnumerable<Post> Posts);

public record SendPostViewModel(string Message, string Token, File.UploadFileViewModel? File);

public record SendPostResponse(PostStaus Staus, PostViewModel Post);

public enum PostStaus
{
    Success = 0,
    UserNotFound = 1,
    Exception = 2,
    ChannelNotFound = 3,
    AccessDenied = 4
}

public enum PostOwner
{
    Channel = 0,
    Page = 1
}