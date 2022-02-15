using System.Linq.Expressions;

namespace Services.Base;

public interface IBaseRules<Tentity> where Tentity : class
{
    Task<IEnumerable<Tentity>> GetAsync();

    Task<IEnumerable<Tentity>> GetAsync<TKey>(Expression<Func<Tentity, TKey>> orderBy, OrderType orderType);

    Task<IEnumerable<Tentity>> GetAsync(Range page);

    Task<IEnumerable<Tentity>> GetAsync(Expression<Func<Tentity, bool>> where);

    Task<IEnumerable<Tentity>> GetAsync<TKey>(Expression<Func<Tentity, bool>> where, Expression<Func<Tentity, TKey>> orderBy, OrderType orderType);

    Task<IEnumerable<Tentity>> GetAsync(Expression<Func<Tentity, bool>> where, Range page);

    Task<IEnumerable<Tentity>> GetAsync<TKey>(Expression<Func<Tentity, bool>> where, Range page, Expression<Func<Tentity, TKey>> orderBy, OrderType orderType);

    Task<Tentity?> GetAsync(object id);

    Task<Tentity?> FirstOrDefaultAsync(Expression<Func<Tentity, bool>> where);

    Task<bool> InsertAsync(Tentity entity);

    Task<bool> InsertAsync(IEnumerable<Tentity> tentities);

    Task<bool> UpdateAsync(Tentity entity);

    Task<bool> UpdateAsync(IEnumerable<Tentity> tentities);

    Task<bool> DeleteAsync(Tentity entity);

    Task<bool> DeleteAsync(IEnumerable<Tentity> tentities);

    Task<bool> DeleteAsync(object id);

    Task<bool> DeleteAsync(Expression<Func<Tentity, bool>> where);

    Task<bool> AnyAsync(Expression<Func<Tentity, bool>> where);

    Task<bool> SaveAsync();

}

public enum OrderType
{
    ASE,
    DES
}