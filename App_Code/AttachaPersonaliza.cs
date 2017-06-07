using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[Serializable]	
public class AttachaPersonaliza
{
	public string str="";
	public void attachabanco(string tiposistema, string tipoambiente, string projeto, string cliente, string criador, string maquinabanco, string bak, string caminho,string ipsite)
	{
		
		if(!System.IO.File.Exists(bak) || !System.IO.Directory.Exists(caminho))
		{
			str = "Não foi encontrado o arquivo .BAK ou o diretório de destino\nBAK "+bak+"\nCaminho "+caminho;
			//str="valores recebido:\n Tipo Sis "+tiposistema +", Tipo Amb "+ tipoambiente+"\nProj "+ projeto+", Cli "+ cliente+", Criador "+ criador+"\nMaquinaDB "+ maquinabanco+", BAK "+ bak+", Destino "+ caminho+" IPSite " +ipsite;			
			return;
		}
		str="sucesso";
		
	}
	


}
