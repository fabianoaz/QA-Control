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
public class AttachaePersonaliza : System.Web.Services.WebService
{		
    [WebMethod]
    public void attacha(string tiposistema, string tipoambiente, string projeto, string cliente, string criador, string bak, string caminho,
	string nomemaquina,bool alterarsenhas, bool utilizarnfe,bool utilizarnfce,bool criarmaquina,bool ativapista, bool ecf,int portaserial,int marca,string serie, int num, string email,string user)
    {                                                            
        /*fazer a logica para chama a classe para attachar*/    
		LogApp log = new LogApp();
		log.logar("Solicitção de vinculo de banco de dados, cache sol:'"+user+ "' ambiente: '"+tipoambiente+ "' projeto: '"+projeto+"' cliente: '"+cliente+"' criador: '"+criador+"' bak: '"+bak+"' caminho: '"+caminho+"'");
		
		
		string maquinabanco="POASRVVM0011\\SQL2012";
		string ipsite="172.16.148.110";
		AttachaPersonaliza AP = new AttachaPersonaliza();
		
		tiposistema=tiposistema.Replace(" ","");
		tipoambiente=tipoambiente.Replace(" ","");
		projeto=projeto.Replace(" ","");
		cliente=cliente.Replace(" ","");
		criador=criador.Replace(" ","");
		
		AP.attachabanco(tiposistema,tipoambiente, projeto, cliente, criador, maquinabanco, bak, caminho,ipsite);
		List<string> retorno = new List<string>();
		if(AP.erro!="")
		{
			retorno.Add(AP.erro);
			//retorno.Add(AP.str);
		}
		else
		{
			retorno.Add(AP.str);
			
			AP.personaliza(tiposistema,tipoambiente,projeto,cliente,criador,nomemaquina,alterarsenhas,utilizarnfe,utilizarnfce,criarmaquina,ativapista,ecf,portaserial,marca,serie,num,email);
			if(AP.erro!="")
			{
				retorno.Add(AP.erro);
			}
			else
			{
				retorno.Add(AP.str);
			}
		}
		
		/*
string tiposistema, string tipoambiente, string projeto, string cliente, string criador, string nomemaquina,
	bool alterarsenhas, bool utilizarnfe,bool utilizarnfce,bool criarmaquina,bool ativapista, bool ecf,int portaserial,int marca,string serie, int num, string email		
		*/
		
		
		
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(retorno));		
    }


}