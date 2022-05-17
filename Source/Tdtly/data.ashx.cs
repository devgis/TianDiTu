using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Tdtly.Common;
using System.Data;

namespace Tdtly
{
    /// <summary>
    /// data1 的摘要说明
    /// </summary>
    public class data : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string json = JsonConvert.SerializeObject(JQInfoDal.Query(string.Empty));
            context.Response.Write(json);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}