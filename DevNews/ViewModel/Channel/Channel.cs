namespace ViewModel.Channel;

public record ChannelViewModel(string Token, string Link, string Name, string Avatar);

public record ChannelPreviewViewModel(string Token, string Name, string Avatar, int NewPosts);

public record GetChannelsResponse(GetChannelsStatus Status, IEnumerable<ChannelPreviewViewModel> Channels);

public enum GetChannelsStatus
{
    Success = 0,
    UserNotFound = 1,
    Exception = 2
}