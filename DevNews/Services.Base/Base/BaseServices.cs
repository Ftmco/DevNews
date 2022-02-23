﻿using DataLayer.Context;
using Microsoft.EntityFrameworkCore;
using Service.Static;
using System.Linq.Expressions;

namespace Services.Base;

public class BaseServices<TEntity> : IAsyncDisposable, IBaseRules<TEntity> where TEntity : class
{
    #region -- Dependency --

    /// <summary>
    /// Data Base Context
    /// </summary>
    private readonly DbContext _context;

    /// <summary>
    /// Db Set , Current Table
    /// </summary>
    private readonly DbSet<TEntity> _dbSet;

    public BaseServices(DbContext context)
    {
        _context = context;
        _dbSet = _context.Set<TEntity>();
    }

    public BaseServices(ArticleContext context)
    {
        _context = context;
        _dbSet = _context.Set<TEntity>();
    }

    public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> where)
        => await Task.FromResult(await _dbSet.AnyAsync(where));

    public async Task<int> CountAsync()
        => await Task.FromResult(await _dbSet.CountAsync());

    public async Task<int> CountAsync(Expression<Func<TEntity, bool>> count)
        => await Task.FromResult(await _dbSet.CountAsync(count));

    #endregion

    public async Task<bool> DeleteAsync(TEntity? entity)
    => await Task.Run(async () =>
    {
        if (entity == null)
            return true;
        try
        {
            _dbSet.Remove(entity);
            return await SaveAsync();
        }
        catch
        {
            return false;
        }
    });

    public async Task<bool> DeleteAsync(IEnumerable<TEntity> tentities)
    => await Task.Run(async () =>
    {
        try
        {
            _dbSet.RemoveRange(tentities);
            return await SaveAsync();
        }
        catch
        {
            return false;
        }
    });

    public async Task<bool> DeleteAsync(object id)
        => await Task.FromResult(await DeleteAsync(await GetAsync(id)));

    public async Task<bool> DeleteAsync(Expression<Func<TEntity, bool>> where)
    => await Task.FromResult(await DeleteAsync(await GetAsync(where)));


    public async ValueTask DisposeAsync()
    {
        GC.SuppressFinalize(this);
        await _context.DisposeAsync();
    }

    public async Task<TEntity?> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> where)
        => await Task.FromResult(await _dbSet.FirstOrDefaultAsync(where));

    public async Task<IEnumerable<TEntity>> GetAsync()
    => await Task.FromResult(await _dbSet.ToListAsync());

    public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> where)
        => await Task.FromResult(await _dbSet.Where(where).ToListAsync());

    public async Task<TEntity?> GetAsync(object id)
        => await Task.FromResult(await _dbSet.FindAsync(id));

    public async Task<IEnumerable<TEntity>> GetAsync<TKey>(Expression<Func<TEntity, TKey>> orderBy, OrderType orderType)
        => await Task.Run(async () => orderType switch
        {
            OrderType.ASE => await _dbSet.OrderBy(orderBy).ToListAsync(),
            OrderType.DES => await _dbSet.OrderByDescending(orderBy).ToListAsync(),
            _ => await _dbSet.OrderBy(orderBy).ToListAsync()
        });

    public async Task<IEnumerable<TEntity>> GetAsync(Range page)
        => await Task.FromResult(await _dbSet.Take(page).ToListAsync());

    public async Task<IEnumerable<TEntity>> GetAsync<TKey>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, TKey>> orderBy, OrderType orderType)
        => await Task.Run(async () => orderType switch
        {
            OrderType.ASE => await _dbSet.Where(where).OrderBy(orderBy).ToListAsync(),
            OrderType.DES => await _dbSet.Where(where).OrderByDescending(orderBy).ToListAsync(),
            _ => await _dbSet.Where(where).OrderBy(orderBy).ToListAsync()
        });

    public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> where, Range page)
        => await Task.FromResult(await _dbSet.Where(where).Skip(page.Start.Value).Take(page.End.Value).ToListAsync());

    public async Task<IEnumerable<TEntity>> GetAsync<TKey>(Expression<Func<TEntity, bool>> where, int page, int count, Expression<Func<TEntity, TKey>> orderBy, OrderType orderType)
        => await Task.Run(() => orderType switch
        {
            OrderType.ASE => _dbSet.Where(where).OrderBy(orderBy).ToList().Skip(page * count).Take(count).ToList(),
            OrderType.DES => _dbSet.Where(where).OrderByDescending(orderBy).ToList().Skip(page * count).Take(count).ToList(),
            _ => _dbSet.Where(where).OrderBy(orderBy).ToList().Skip(page * count).Take(count).ToList(),
        });

    public async Task<bool> InsertAsync(TEntity entity)
        => await Task.Run(async () =>
        {
            try
            {
                await _dbSet.AddAsync(entity);
                return await SaveAsync(); ;
            }
            catch
            {
                return false;
            }
        });

    public async Task<bool> InsertAsync(IEnumerable<TEntity> tentities)
    => await Task.Run(async () =>
     {
         try
         {
             await _dbSet.AddRangeAsync(tentities);
             return await SaveAsync(); ;
         }
         catch
         {
             return false;
         }
     });

    public async Task<IEnumerable<T>> RunSpListAsync<T>(string spName)
        => await Task.Run(async () =>
        {
            Query.ConnectionString = _context.Database.GetConnectionString();
            return await Query.RunQueryAsync<T>(spName);
        });

    public async Task<bool> SaveAsync()
        => await Task.Run(async () =>
        {
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        });

    public async Task<bool> UpdateAsync(TEntity entity)
        => await Task.Run(async () =>
        {
            try
            {
                _dbSet.Update(entity);
                return await SaveAsync(); ;
            }
            catch
            {
                return false;
            }
        });

    public async Task<bool> UpdateAsync(IEnumerable<TEntity> tentities)
     => await Task.Run(async () =>
     {
         try
         {
             _dbSet.UpdateRange(tentities);
             return await SaveAsync(); ;
         }
         catch
         {
             return false;
         }
     });
}

