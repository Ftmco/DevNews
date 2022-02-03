// See https://aka.ms/new-console-template for more information

using DataLayer.Context;
using Entity.User;
using Services.Base;

Console.WriteLine("Article Social Data Trainer Is Runing Now...");

IBaseRules<User> _userBase = new BaseServices<User>(new ArticleContext());
IEnumerable<User> users = await _userBase.GetAsync();

