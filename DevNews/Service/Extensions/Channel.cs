using Entity.Channel;
using Tools.FileTools;
using ViewModel.Channel;

namespace Service.Extensions;

public static class ChannelExtensions
{
    public static async Task<ChannelPreviewViewModel> CreateChannelPreviewViewModelAsync(this Channel channel)
        => await Task.Run(async () => new ChannelPreviewViewModel(
            Token: channel.Token,
            Name: channel.Name,
            Avatar: await channel.Avatar.CreateFileAddressAsync("Files/Channels"),
            NewPosts: 3
            ));

    public static async Task<IEnumerable<ChannelPreviewViewModel>> CreateChannelPreviewViewModelAsync(this IEnumerable<Channel> channels)
        => await Task.Run(() =>
                channels.Select((channel) => channel.CreateChannelPreviewViewModelAsync().Result));
}