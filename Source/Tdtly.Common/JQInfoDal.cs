using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;

namespace Tdtly.Common
{
    public class JQInfoDal
    {
        public static DataTable Query(string where)
        {
            string sql = "select * from t_JQ";
            if (!string.IsNullOrEmpty(where))
            {
                sql += " where " + where;
            }
            return SQLHelper.Instance.GetDataTable(sql);
        }
    }
}
