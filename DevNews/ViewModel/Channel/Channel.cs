using ViewModel.File;

namespace ViewModel.Channel;

public record ChannelViewModel(string Token, string Link, string Name, string Avatar);

public record ChannelPreviewViewModel(string Token, string Name, IEnumerable<Entity.Article.File> Avatar, int NewPosts);

public record GetChannelsResponse(ChannelsStatus Status, IEnumerable<ChannelPreviewViewModel> Channels);

public record UpsertChannelViewModel(string Name, string Link, IEnumerable<Guid> Categories, UploadFileViewModel Avatar);

public record UpsertChannelResponse(ChannelsStatus Status, ChannelPreviewViewModel Channel);

public enum ChannelsStatus
{
    Success = 0,
    UserNotFound = 1,
    Exception = 2
}