using Entity.Article;

namespace Service.Rules;

public interface IPostRules : IDisposable
{
    Task<GetPosts> GetChannelPostsAsync(Guid channelId, int index);

    Task<PostViewModel> CreatePostViewModelAsync(Post post);

    Task<IEnumerable<PostViewModel>> CreatePostViewModelAsync(IEnumerable<Post> posts);

    Task<PostViewModel> CreatePostAsync(SendPostViewModel sendPost, Guid objectId, PostOwner owner);
}
