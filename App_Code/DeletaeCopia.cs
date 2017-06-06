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
public class DeletaeCopia : System.Web.Services.WebService
{
    [WebMethod]
    public void Atualiza(string tkt, string site)
    {

        DeletaCopia DC = new DeletaCopia();
        List<string> retorno = new List<string>();
        //faz a copia do tkt no E e retorna o nome do zip novo
        string zip = DC.baixatkt(tkt);
        //se conseguiu baixar segue para atualizar
        if (DC.erro.Equals(""))
        {
            retorno.Add(DC.data);
            DC.atualizasite(zip, site);
            //se conseguiu atualizar, seja feliz
            if (DC.erro.Equals(""))
            {
                retorno.Add(DC.data);
            }
            else
            {
                retorno.Add(DC.erro);
            }
        }
        else
        {
            retorno.Add(DC.erro);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(retorno));
    }
    [WebMethod]
    public void listadir(string op)
    {
        //vai cravado até pensar direito
        string dir = "";
        Boolean b;

        if (op.Contains("tkt"))
        {
            //local, no trampo
             dir = "C:\\Suporte Seller\\BaseWEb\\TKTS";
            //em rede, no trampo
            //dir = "\\\\172.16.137.225\\Suporte Seller\\BaseWEb\\TKTS";
            //em casa
            //dir = "C:\\Users\\bruno\\Desktop\\Teste";
             b = true;
        }
        else
        {
			//no trampo
            dir = "C:\\inetpub\\wwwroot";
            //para testes em casa
            //dir ="C:\\Users\\bruno\\Desktop\\Teste";
             b = false;
        }
        //dir=op;
        DeletaCopia DC = new DeletaCopia();
        List<Generica> retorno = DC.listatkt(dir, b);
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(retorno));
    }
}