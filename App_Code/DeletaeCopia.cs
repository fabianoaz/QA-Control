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
    public void Atualiza(string tkt, string site,string user)
    {
		LogApp log = new LogApp();
		log.logar("Solicitção de atualização de site, cookie: '"+ user +"' Site: '"+site+"' Tkt: '"+tkt+"'");
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
				log.logar("Site atualizado, cookie: '"+user+"' site: '"+site+" com o Tkt: '"+tkt+"'");
            }
            else
            {
                retorno.Add(DC.erro);
				log.logar("Erro ao atualizar o site, cookie: '"+user+"' site: '"+site+"' com o Tkt: '"+tkt+"' erro: '"+DC.erro+"'");
				
            }
        }
        else
        {
            retorno.Add(DC.erro);
			log.logar("Erro ao atualizar o site, cookie: '"+user+"' site: '"+site+"' com o Tkt: '"+tkt+"' erro: '"+DC.erro+"'");
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
		List<Generica> retorno;
        if (op.Contains("tkt"))
        {
            //local, no trampo
             dir = "\\\\192.168.56.87\\public\\sellerweb\\TKT";
            //em rede, no trampo
			//dir = "\\\\192.168.56.87\\public\\sellerweb\\VERSION";
            //dir = "\\\\172.16.137.225\\Suporte Seller\\BaseWEb\\TKTS";
            //em casa
            //dir = "C:\\Users\\bruno\\Desktop\\Teste";
             b = true;
        }
        else
        {
			//no trampo
            dir = "E:\\SitesSeller\\DefaultWebSite";
            //para testes em casa
            //dir ="C:\\Users\\bruno\\Desktop\\Teste";
             b = false;
        }
        //dir=op;
        DeletaCopia DC = new DeletaCopia();
        retorno = DC.listatkt(dir, b);
		//tkts e versões depois será verificado 
		//if (b)
		//{
			//dir="\\\\192.168.56.87\\public\\sellerweb\\VERSION";
			//retorno.AddRange(DC.listatkt(dir, b));
		//}
		
		
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(retorno));
    }
}