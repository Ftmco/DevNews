using ViewModel.File;

namespace ViewModel.Channel;

public record ChannelViewModel(string Token, string Link, string Name, IEnumerable<Entity.Article.TFile> Avatar);

public record ChannelPreviewViewModel(string Token, string Name, IEnumerable<Entity.Article.TFile> Avatar, int NewPosts);

public record GetChannelsResponse(ChannelsStatus Status, IEnumerable<ChannelPreviewViewModel> Channels);

public record UpsertChannelViewModel(string Name, string Link, IEnumerable<Guid> Categories, UploadFileViewModel Avatar);

public record UpsertChannelResponse(ChannelsStatus Status, ChannelPreviewViewModel Channel);

public record ChannelInfoViewModel(ChannelsStatus Status, ChannelViewModel Channel, OwnerViewModel Owner, bool IsAdmin, bool IsIn);

public record OwnerViewModel(string Email, string Token, string UserName, IEnumerable<Entity.Article.TFile> Avatar);

public enum ChannelsStatus
{
    Success = 0,
    UserNotFound = 1,
    Exception = 2,
    ChannelNotFound = 3
}