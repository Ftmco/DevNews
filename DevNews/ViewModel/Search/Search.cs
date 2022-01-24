using ViewModel.Category;
using ViewModel.Channel;

namespace ViewModel.Search;

public record SearchResponse(IEnumerable<ChannelPreviewViewModel> Channels,IEnumerable<CategoryViewModel> Categories);