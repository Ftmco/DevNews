using Entity.Article;
using Service.Rules;
using Tools.AppSetting;
using Tools.Crypto;
using Tools.FileTools;
using ViewModel.File;

namespace Service.Service;

public class PostServices : IPostRules
{
    private readonly IBaseRules<Post> _postCrud;

    private readonly IBaseRules<Entity.Article.File> _fileCrud;

    public PostServices(IBaseRules<Post> postCrud, IBaseRules<Entity.Article.File> fileCrud)
    {
        _postCrud = postCrud;
        _fileCrud = fileCrud;
    }

    public async Task<PostViewModel> CreatePostAsync(SendPostViewModel sendPost, Guid objectId, PostOwner owner)
        => await Task.Run(async () =>
        {
            Post post = new()
            {
                CreateDate = DateTime.Now,
                Message = sendPost.Message,
                OwnerId = objectId,
                OwnerType = (short)owner
            };
            if (await _postCrud.InsertAsync(post))
            {
                if (sendPost.File != null)
                {
                    var directory = await "Directories".GetDataAsync("Post");
                    var save = await new SaveFileViewModel(sendPost.File.Base64, directory).SaveFileAsync();
                    Entity.Article.File postFile = new()
                    {
                        CreateDate = DateTime.Now,
                        Directory = directory,
                        Name = save.Name,
                        ObjectId = post.Id,
                        Type = save.Type,
                        Size = save.Size,
                        OrginalName = sendPost.File.OgName,
                        ObjectType = 0
                    };
                    await _fileCrud.InsertAsync(postFile);
                }
                return await CreatePostViewModelAsync(post);
            }
            return null;
        });

    public async Task<PostViewModel> CreatePostViewModelAsync(Post post)
        => await Task.FromResult(new PostViewModel(
            Message: post.Message,
            CreateDate: post.CreateDate.ToString(),
            OwnerId: post.OwnerId,
            OwnerType: post.OwnerType,
            Files: await _fileCrud.GetAsync(pf => pf.ObjectId == post.Id)));

    public async Task<IEnumerable<PostViewModel>> CreatePostViewModelAsync(IEnumerable<Post> posts)
        => await Task.FromResult(posts.Select((post) => CreatePostViewModelAsync(post).Result));

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<IEnumerable<Post>> GetChannelPostsAsync(Guid channelId, int index)
        => await Task.Run(async () =>
        {
            int count = index * 15;
            IEnumerable<Post> posts = await _postCrud.GetAsync(cp => cp.OwnerId == channelId);
            return posts;
        });
}
