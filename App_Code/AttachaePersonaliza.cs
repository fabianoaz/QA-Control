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

		//tiposistema; tipoambiente; projetostring; cliente; criador;
		string maquinabanco="POASRVVM0011\\SQL2012";
		//bak; caminho
		string ipsite="172.16.148.110";
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