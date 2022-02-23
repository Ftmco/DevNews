using Entity.Application;
using Service.Rules;

namespace Service.Service;

public class ApplicationServices : IApplicationRules
{
    readonly IBaseRules<Language> _languageBase;

    readonly IBaseRules<AppItems> _appItemsBase;

    public ApplicationServices(IBaseRules<Language> languageBase,IBaseRules<AppItems> appItemsBase)
    {
        _languageBase = languageBase;
        _appItemsBase = appItemsBase;
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public async Task<IEnumerable<AppItems>> GetApplicationItemsAsync(int lagnId)
        => await Task.Run(async () =>
        {
            IEnumerable<AppItems> items = await _appItemsBase.GetAsync(a => a.LangId == lagnId);
            return items;
        });

    public async Task<IEnumerable<Language>> GetLanguagesAsync()
        => await Task.Run(async () =>
        {
            IEnumerable<Language> languages = await _languageBase.GetAsync(l => l.IsActive == true);
            return languages;
        });
}
