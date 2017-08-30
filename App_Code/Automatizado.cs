using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using Linx_Seller_QA.App_Code;
using System.Text;

[Serializable]	
public class Automatizado
{
	public string str="";
	public string erro="";

    public List<Generica> listalogs(string diretoriologs)
    {
		//diretoriologs="\\\\172.16.137.227\\LogExecucao";
        List<Generica> li = new List<Generica>();
        System.IO.DirectoryInfo dir = new System.IO.DirectoryInfo(@diretoriologs);
		
        Generica selecione = new Generica();
        selecione.nome = "Selecione";
        selecione.caminho = "";
		selecione.tipo=-1;
        li.Add(selecione);
        foreach (System.IO.FileInfo log in dir.GetFiles())
        {
            if (log.Extension.Equals(".txt"))
            {
                Generica g = new Generica();
                g.nome = System.IO.Path.GetFileNameWithoutExtension(log.Name);
                g.caminho = log.FullName;
				g.tipo=1;
                li.Add(g);
            }
        }	
        return li;
    }
	

    public List<Generica> lelog(string diretoriologs)
    {
        List<Generica> li = new List<Generica>();
			
			string[] lines = System.IO.File.ReadAllLines(diretoriologs, Encoding.UTF8);
			int i=0;
            foreach (string linha in lines)
            {	i++;
				//byte[] bytes = Encoding.UTF8.GetBytes(linha);
				Generica g = new Generica();
				string[] splited = linha.Split('¥');
					//try
					//{
						if (splited.Length>=3)
						{
							g.oexec=i;
							g.nome=splited[1];
							g.caminho=splited[0];
							g.tipo= Convert.ToInt32(splited[2].Trim());
						}else 
						{
							g.oexec=i;
							g.nome="Linha com tamanho inválido!";
							g.caminho="Linha número: "+i;
							g.tipo=1;
						}
					//}
					//catch(Exception err)
					//{
						//g.nome="Linha inválida (exception) ";
						//g.caminho="Linha "+i;
						//g.tipo=1;
					//}
				li.Add(g);
            }
        return li;
    }	
	
	public string solicitaservico(int servico)
	{
		//LogApp log = new LogApp();
		//str="Ocorreu algum erro ao solicitar o serviço";
		int sts=-1;
		erro="erro ao procurar conexão no webconfig";
		String cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
		String dtasol="";
		String dtaexec="";
		String dtafim="";
		String msgret="";
		//List<Generica> li = new List<Generica>();
		//Generica g  = new Generica();
		using (SqlConnection con = new SqlConnection(cs))
        {
				str="Ocorreu algum erro ao solicitar o serviço";
				string comando="select * from testecomplete where integracao_id="+servico;
                SqlCommand cmd = new SqlCommand(comando, con);
				cmd.CommandTimeout = 0;

                con.Open();

                SqlDataReader sdr= cmd.ExecuteReader();  
				while (sdr.Read())
				{
					sts=Convert.ToInt32(sdr[1]);
					dtasol=sdr[2].ToString();
					dtaexec=sdr[3].ToString();
					dtafim=sdr[4].ToString();
					msgret=sdr[5].ToString();
				}
				con.Close();
				
				if (sts==1)
				{
					str="Já existe agendamento para esta operação na fila. <br>Data do Agendamento: "+dtasol;
				}
				else
					if(sts==2)
					{
						str="Já existe operação em andamento para esta solicitação.<br>Data do Agendamento: "+dtasol+"<br>Inicio da Execução: "+dtaexec;
					}
					else if(sts==3 || sts==0)
						{
							comando="update testecomplete set sts_id=1, dta_sol=getdate(),dta_exec=null,dta_fim=null,msg_ret=null where integracao_id="+servico;
							
							cmd = new SqlCommand(comando, con);						
							con.Open();
							cmd.ExecuteReader();
							str="Solicitação efetuada com sucesso!";
						}
						else if (sts==4)
							{
								str="OPA! A ùltima execução retornou erro! <br> verifique os logs do serviço e ajuste o parâmetro para 0 para continuar <br>Retorno da última execução: "+msgret;
							}
		}
		//g.nome=str;
		//g.caminho="";
		//g.tipo=-1;
		//li.Add(g);
		return str;
	}

}
