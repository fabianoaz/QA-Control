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
    public void attacha(string tiposistema, string tipoambiente, string projeto, string cliente, string criador, string bak, string caminho)
    {                                                            
        /*fazer a logica para chama a classe para attachar*/    

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
		retorno.Add(AP.str);
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(retorno));		
    }

    [WebMethod]
    public void personaliza(string tiposistema,string tipoambiente, string projeto, string cliente, string criador,
	bool alterarsenhas, bool utilizanfe, bool utilizanfce, bool criarmaquina, bool ativapista, bool criarecf,
	string nomemaquina, string portaserial, string serie, string marca, string numero, string email)
    {
        /*fazer a logica para chama a classe para personaliza*/
		//tiposistema; tipoambiente; projeto; cliente; criador; nomemaquina; alterarsenhas; utilizanfe; utilizanfce; criarmaquina; 
		//ativapista; criarecf; portaserial; marca; serie; numero, email
		//string a="";
    }	
}