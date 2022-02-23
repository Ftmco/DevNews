using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Static;

public class Query
{
    public static string ConnectionString { get; set; } = null!;

    public static async Task<SqlConnection> OpenConnectionAsync()
        => await Task.Run(async () =>
        {
            try
            {

                SqlConnection cnn = new(ConnectionString);
                await cnn.OpenAsync();
                return cnn;
            }
            catch
            {
                return null;
            }
        });

    public static async Task<DataTable> RunQueryAsync(string query)
        => await Task.Run(async () =>
        {
            DataTable dataTable = await RunQueryAsync(query, null);
            return dataTable;
        });

    public static async Task<DataTable> RunQueryAsync(string query, IDictionary<string, object> parameters)
        => await Task.Run(async () =>
        {
            var cnn = await OpenConnectionAsync();
            if (cnn != null)
            {
                SqlCommand cmd = new(query, cnn);
                if (parameters != null)
                    foreach (var param in parameters)
                        cmd.Parameters.AddWithValue(param.Key, param.Value);
                SqlDataAdapter dataAdapter = new(cmd);
                DataTable dataTable = new();
                dataAdapter.Fill(dataTable);
                await cnn.CloseAsync();
                return dataTable;
            }
            return null;
        });

    public static async Task<IEnumerable<T>> RunQueryAsync<T>(string query)
        => await Task.Run(async () =>
        {
            IEnumerable<T> list = await RunQueryAsync<T>(query, null);
            return list;
        });

    public static async Task<IEnumerable<T>> RunQueryAsync<T>(string query, IDictionary<string, object> parameters)
        => await Task.Run(async () =>
        {
            DataTable dataTable = await RunQueryAsync(query, parameters);
            List<T> list = dataTable.ToModel<T>();
            return list;
        });

}
