using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Service.Static;

public static class MapperExtension
{
    public static List<T> ToModel<T>(this DataTable dt)
    {
        List<string> columns = (from DataColumn dc in dt.Columns select dc.ColumnName).ToList();

        FieldInfo[] fields = typeof(T).GetFields();
        PropertyInfo[] properties = typeof(T).GetProperties();

        List<T> lst = new List<T>();

        foreach (DataRow dr in dt.Rows)
        {
            T ob = Activator.CreateInstance<T>();

            foreach (FieldInfo fieldInfo in fields.Where(fieldInfo => columns.Contains(fieldInfo.Name)))
            {
                fieldInfo.SetValue(ob, !dr.IsNull(fieldInfo.Name) ? dr[fieldInfo.Name] : fieldInfo.FieldType.IsValueType ? Activator.CreateInstance(fieldInfo.FieldType) : null);
            }

            foreach (PropertyInfo propertyInfo in properties.Where(propertyInfo => columns.Contains(propertyInfo.Name)))
            {
                propertyInfo.SetValue(ob, !dr.IsNull(propertyInfo.Name) ? dr[propertyInfo.Name] : propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null);
            }

            lst.Add(ob);
        }

        return lst;
    }
}
