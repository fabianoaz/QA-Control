using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using Linx_Seller_QA.App_Code;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Login : System.Web.Services.WebService
{
    [WebMethod]
    public void EfetuaLogin(string usuario, string senha)
    {
        List<string> retorno = new List<string>();
		if (usuario=="" && senha=="")
		{
			
		}
		else 
		{
			Loga l = new Loga();
			l.efetualogin(usuario,senha);
			if(l.str=="")
			{
				
			}
			else{
					retorno.Add(""+l.str);
				}
		}
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(retorno));
    }
	
    [WebMethod]
    public void AlteraSenha(string cache, string senhaantiga, string senhanova)
    {
		
        List<string> retorno = new List<string>();
		Loga l = new Loga();
		l.alterasenha(cache,senhaantiga,senhanova);
		if(l.erro=="")
		{
			retorno.Add(""+l.str);
		}
		else{
				retorno.Add(""+l.erro);
			}
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(retorno));
		
    }	
	
	
}