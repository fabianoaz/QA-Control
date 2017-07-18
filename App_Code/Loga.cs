using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;

[Serializable]	
public class Loga
{
	public string str="";
	public string erro="";
	public void efetualogin(string nome, string senha)
	{
		String cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
		using (SqlConnection con = new SqlConnection(cs))
			{
					erro="Erro ao verificar usuario e senha no banco";
					//diz o comando que será executado
					string comando="SELECT max(u_id) FROM usuarios WHERE u_login='"+nome+"' AND PWDCOMPARE('"+senha+"', u_pass) = 1 and u_stats=1";
					SqlCommand cmd = new SqlCommand(comando, con);
					cmd.CommandTimeout = 0;
					//abre a conexão com o banco
					con.Open();
					//executa o SQL e guarda no sdr
					SqlDataReader sdr= cmd.ExecuteReader();  
					string id="";
					string ultimologin="";
					//str=""; 
					erro="";
					//caso tenha mais de duas coluna, é a mensagem de sucesso, que são as estatísticas do procedimento de attachar, se for menos que duas colunas, é a mensagem de erro, aí tem guru
					while (sdr.Read())
					{
						//if(sdr.FieldCount<2)
						id=sdr[0].ToString();
						str=sdr[0].ToString();
					}
					con.Close();
					if (str=="")
					{
						
					}else 
					{
						//se logou, faz o update lá 
						comando="update usuarios set u_ultlog=getdate() WHERE u_id='"+id+"'";
						cmd = new SqlCommand(comando, con);
						con.Open();
						cmd.ExecuteReader();
						con.Close();
						
						//depois do update, pega essa data para retorno tbm
						
						comando="SELECT CAST (cast(u_ultlog as smalldatetime) as decimal(20,7)), u_nom FROM usuarios WHERE u_id='"+id+"'";
						cmd = new SqlCommand(comando, con);
						con.Open();
						sdr=cmd.ExecuteReader();
						while (sdr.Read())
						{
							ultimologin=sdr[0].ToString();
							str+="_"+sdr[0].ToString()+"_"+sdr[1].ToString();
						}
						
						con.Close();						
						
						
						
						
					}
			}
	}
}
