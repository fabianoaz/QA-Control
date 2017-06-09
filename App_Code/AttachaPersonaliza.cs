using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;

[Serializable]	
public class AttachaPersonaliza
{
	public string str="";
	public void attachabanco(string tiposistema, string tipoambiente, string projeto, string cliente, string criador, string maquinabanco, string bak, string caminho,string ipsite)
	{

		if(!System.IO.File.Exists(bak) || !System.IO.Directory.Exists(caminho))
		{
			str = "<br/>Não foi encontrado o arquivo .BAK ou o diretório de destino<br/> BAK: "+bak+"<br/>Caminho: "+caminho;
			//str="valores recebido:\n Tipo Sis "+tiposistema +", Tipo Amb "+ tipoambiente+"\nProj "+ projeto+", Cli "+ cliente+", Criador "+ criador+"\nMaquinaDB "+ maquinabanco+", BAK "+ bak+", Destino "+ caminho+" IPSite " +ipsite;			
			return;
		}
		if(!caminho.EndsWith("\\"))
		{
			caminho=caminho+"\\";
		}
		String cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
	using (SqlConnection con = new SqlConnection(cs))
        {
                //diz o comando que será executado
				string comando="exec ATTACHA '"+tiposistema+"','"+tipoambiente+"','"+projeto+"','"+cliente+"','"+criador+"','"+bak+"','"+maquinabanco+"','"+caminho+"','"+ ipsite+"'";
				str="<br/> as " + DateTime.Now+" iniciou o comando<br/>"+comando;
                SqlCommand cmd = new SqlCommand(comando, con);
				cmd.CommandTimeout = 0;
                //abre a conexão com o banco
                con.Open();
                //executa o SQL e guarda no sdr
                SqlDataReader sdr= cmd.ExecuteReader();  
				//str="";
				str=str+"<br/>terminou as "+DateTime.Now;
				while (sdr.Read())
				{
					str=str+sdr[0].ToString();
				}
				
				//str="sucesso2";
				con.Close();
		}
	



	}
}
