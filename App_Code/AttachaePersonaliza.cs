using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using Linx_Seller_QA.App_Code;

namespace Linx_Seller_QA.App_Code
{
    /// <summary>
    /// Summary description for WebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class AttachaePersonaliza : System.Web.Services.WebService
    {
        [WebMethod]
        public void attacha(string tkt, string site)
        {
            /*fazer a logica para chama a classe para attachar*/
        }
        [WebMethod]
        public void personaliza(string op)
        {
            /*fazer a logica para chama a classe para personaliza*/
        }
    }
}