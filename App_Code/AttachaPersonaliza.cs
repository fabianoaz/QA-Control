using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using Linx_Seller_QA.App_Code;

[Serializable]	
public class AttachaPersonaliza
{
	public string str="";
	public string erro="";
	public void attachabanco(string tiposistema, string tipoambiente, string projeto, string cliente, string criador, string maquinabanco, string bak, string caminho,string ipsite)
	{

		LogApp log = new LogApp();
		//if(!System.IO.File.Exists(bak) || !System.IO.Directory.Exists(caminho))
		//{
			//str = "<br/>Não foi encontrado o arquivo .BAK ou o diretório de destino<br/> BAK: "+bak+"<br/>Caminho: "+caminho;
			//str="valores recebido:\n Tipo Sis "+tiposistema +", Tipo Amb "+ tipoambiente+"\nProj "+ projeto+", Cli "+ cliente+", Criador "+ criador+"\nMaquinaDB "+ maquinabanco+", BAK "+ bak+", Destino "+ caminho+" IPSite " +ipsite;			
			//return;
		//}
		if(!caminho.EndsWith("\\"))
		{
			caminho=caminho+"\\";
		}
		erro="erro ao procurar conexão no webconfig";
		String cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
	using (SqlConnection con = new SqlConnection(cs))
        {
				erro="Erro ao Executar comando de attachar";
                //diz o comando que será executado
				string comando="exec ATTACHA '"+tiposistema+"','"+tipoambiente+"','"+projeto+"','"+cliente+"','"+criador+"','"+bak+"','"+maquinabanco+"','"+caminho+"','"+ ipsite+"'";
				str="<br/>Iniciou o comando de attachar</br>Iniciou em " + DateTime.Now;//+" iniciou o comando de attachar<br/>";//+comando+"<br/>";
                SqlCommand cmd = new SqlCommand(comando, con);
				cmd.CommandTimeout = 0;
                //abre a conexão com o banco
                con.Open();
                //executa o SQL e guarda no sdr
                SqlDataReader sdr= cmd.ExecuteReader();  
				//str=""; 
				str=str+" e terminou em "+DateTime.Now;//+"<br/>";
				erro="";
				//caso tenha mais de duas coluna, é a mensagem de sucesso, que são as estatísticas do procedimento de attachar, se for menos que duas colunas, é a mensagem de erro, aí tem guru
				while (sdr.Read())
				{
					//if(sdr.FieldCount<2)
					erro=erro+sdr[0].ToString()+"";
				}
				log.logar("Terminou o procedimento de attachar.. "+erro);
				
				//str="sucesso2";
				con.Close();
				
		}
	}


	public void personaliza(string tiposistema, string tipoambiente, string projeto, string cliente, string criador, string nomemaquina, bool alterarsenhas, bool utilizarnfe,bool utilizarnfce,bool criarmaquina,bool ativapista, bool ecf,int portaserial,int marca,string serie, int num, string email)
	{
		LogApp log = new LogApp();
		str="";
		if(tiposistema!="sweb")
		{
			return;
		}
	erro="erro ao procurar conexão no webconfig";
	String cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
	using (SqlConnection con = new SqlConnection(cs))
        {
				erro="Erro ao Executar comando de personalizar";
                //diz o comando que será executado
				string comando="exec PERSONALIZA '"+tiposistema+"','"+tipoambiente+"','"+projeto+"','"+cliente+"','"+criador+"','"+nomemaquina+"',"+alterarsenhas+","+utilizarnfe+","+utilizarnfce+","+criarmaquina+","+ativapista+","+ecf+","+portaserial+","+marca+",'"+serie+"',"+num+",'"+email+"'";
				str="<br/>Iniciou o comando de personalizar<br/>Inicou em " + DateTime.Now;//+" iniciou o comando de personalizar <br/>";//+comando;
                SqlCommand cmd = new SqlCommand(comando, con);
				cmd.CommandTimeout = 0;
                //abre a conexão com o banco
                con.Open();
                //executa o SQL e guarda no sdr
                SqlDataReader sdr= cmd.ExecuteReader();  
				//str="";
				str=str+" e terminou em "+DateTime.Now;
				erro="";
				while (sdr.Read())
				{
					erro=erro+sdr[0].ToString();
				}
				log.logar("Terminou o procedimento de personalizar.. "+erro);
				//str="sucesso2";
				con.Close();

		}
		
	}	

	
	
}
