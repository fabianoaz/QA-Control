using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO.Compression;
using System.Diagnostics;
using Linx_Seller_QA.App_Code;
/// <summary>
/// Summary description for DeletaCopia
/// </summary>
[Serializable]
public class DeletaCopia
{
    public string data = "";
    public string erro = "";

    public void atualizasite(string zip, string site)
    {
        string dataini;
        string datafim;
		LogApp log = new LogApp();
        erro = "<br/>Erro na criação do temp ou ao deletar residuos antigos<br/>";
        try
        {
            //    debugs
            //    zip = @"C:\Users\bruno\Desktop\Teste\a.zip";
            //    site = @"C:\Users\bruno\Desktop\Teste\a";
            //se o site ou o TKT não existirem, retorna o erro já
            if (!System.IO.Directory.Exists(site) || !System.IO.File.Exists(zip) || site.StartsWith("\\"))
            {
                erro = "Não foi possível localizar o diretório do site ou o zip do TKT<br/>Site: " + site + "<br/>tkt.zip: " + zip;
                return;
            }
            //data = "";
            dataini = "" + DateTime.Now;
            //datafim = "";
            string root = System.IO.Path.GetPathRoot(site);
            //para pegar o nome do tkt (depois faço pegar o file.name que deve ter)
            //string[] nometkt = zip.Split('\\');
            string nometktfinal = System.IO.Path.GetFileNameWithoutExtension(zip);
            //= nometkt[nometkt.Length - 1]
            //temp2 + o nome do tkt é onde ficará o zip e o webconfig durante o processo
            string temp = root + @"temp2\" + nometktfinal;

            //cria o diretório temporirio caso não exita
            criadiretorio(root + "temp2", false, true);
            //se o tkt já foi copiado uma vez, deleta ele do temp e cria novamente
            criadiretorio(temp, true, true);
            //se o site já foi renomeado uma vez para old, tem que limpar a sujeira e não cria um novo pq o mov já faz isso
            criadiretorio(site + "__old", true, false);
            datafim = "" + DateTime.Now;
            data = "<br/>Deletando residuos:<br/>" + dataini + " - " + datafim;

            dataini = datafim; datafim = "";
            //copia o web.config
            erro = "Erro ao mover o WEB.CONFIG";
            //não achei necessário fazer função para o MOVE pq ele não tem muita validação.. por enquanto.
            System.IO.File.Copy(@site + @"\web.config", temp + @"\web.config",true);
            erro = "Não foi possível parar o pool, ou o mesmo não existe </br>Certifique-se de que o site não esteja em processamento ou em uso, e que o pool '"+site+"' existe. </br>Tente novamente.";
            //para o POOL
            parainiciapool(site, "stop");
            //renomeia o site
			erro ="Não foi possivel renomear o site, Possivelmente algum arquivo encontra-se em aberto ou em uso por outra aplicação!";
            try
			{
				System.IO.Directory.Move(site, site + "__old");//aqui que geralmente da erro
			}
			catch(Exception err)
			{
				log.logar("Erro ao renomear o site, vai tentar deletar. Erro" +erro+"\nErro interno:"+err);
				criadiretorio(site, true, false);
			}
			
            datafim = "" + DateTime.Now;
            data = data + "<br/>Criando temp2, copiando webconfig, parando pool e renomeando site:<br/>" + dataini + " - " + datafim;

            dataini = datafim; datafim = "";
            erro = "Erro ao extrair arquivos do ZIP no temp2";
            //coloca o zip na temp. necessário testar quando o zip não estiver na mesma root, pois na doc não diz nada disso
            //para funcionar o ZipFile, além da referência, tem que por na mão o assembly do FileSystem, não sei por que 
            ZipFile.ExtractToDirectory(zip, temp);
            datafim = "" + DateTime.Now;
            data = data + "<br/>Extraindo .zip:<br/>" + dataini + " - " + datafim;

            dataini = datafim; datafim = "";
            erro = "Erro ao mover arquivos descompactados para o site ou ao copiar o web.config";
            //move o tkt para o site e copia o webconfig
            System.IO.Directory.Move(temp + @"\Precompiledweb\DGRP", @site);
            System.IO.File.Move(temp + @"\web.config", @site + @"\web.config");
            datafim = "" + DateTime.Now;
            data = data + "<br/>Criando o novo Site e Copiando webconfig:<br/>" + dataini + " - " + datafim;

            //inicia o pool novamente
            parainiciapool(site, "start");
            //deleta os lixos deixados no final
            dataini = datafim; datafim = "";
            //aqui já da para retornar que acabou, e depois chamar a rotina de limpeza bem na moita
            erro = "</br>Erro ao deletar residuos";
            criadiretorio(site + "__old", true, false);
            criadiretorio(temp, true, false);
            datafim = "" + DateTime.Now;
            data = data + "<br/>Limpando residuos finais:<br/>" + dataini + " - " + datafim;
			if(System.IO.File.Exists(zip))
			{
				System.IO.File.Delete(zip);
			}
			
            erro = "";
        }
        catch (Exception err)
        {
			log.logar("Erro ao Atualizar ambiente, erro:" +erro+"\nErro interno:"+err);
            //erro += "<br/>erro interno:<br/>" + err;
        }
    }

    private void parainiciapool(string caminhosite, string com)
    {
		LogApp log = new LogApp();
		string pool="";
		string comando="";
		try
		{
			pool = System.IO.Path.GetFileName(caminhosite);

			Process cmd = new Process();
			//em principio, é melhor usar a linha do format, mas vou deixar essa também para pensar depois
			// cmd.StartInfo.Arguments = "/ALL";
			//gera o comando
			comando = @"C:\Windows\System32\inetsrv\appcmd.exe " + com + " /apppool.name:" + pool;
			//pega das variaveis o cmd.exe
			cmd.StartInfo.FileName = Environment.GetEnvironmentVariable("comspec");
			cmd.StartInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
			//faz a mesma coisa que o /all, mas de forma mais legal
			cmd.StartInfo.Arguments = string.Format("/c {0}", comando);
			//executa o comando
			if (cmd.Start())
			{
				//    retorno = cmd.StandardOutput.ReadToEnd();
				//  retorno = "";
			}
			log.logar("Parou/Inciou o Pool, Pool: "+pool+" Comando: "+comando);
		}
		catch(Exception err)
		{
			log.logar("Erro ao parar ou iniciar o Pool, Pool: "+pool+" Comando: "+comando+" Erro interno: "+err);
		}

    }

    private void criadiretorio(string diretorio, Boolean deleta, Boolean cria)
    {
        if (deleta)
        {
            if (System.IO.Directory.Exists(diretorio))
            {
                System.IO.Directory.Delete(diretorio, true);
                System.Threading.Thread.Sleep(3500);
            }
        }

        if (!System.IO.Directory.Exists(diretorio) && cria)
        {
            System.IO.Directory.CreateDirectory(diretorio);
        }
    }

    public string baixatkt(string tkt)
    {
        string zip = "";
        string dataini = "";
        string datafim = "";
        dataini = "" + DateTime.Now;
        if (System.IO.File.Exists(tkt))
        {
            erro = "<br/>Ocorreu um erro ao baixar o tkt<br/>";
            //copiaria \\ip\tkt.zip, para E:\sites\tkt.zip, com sobreescrita
            Random r = new Random();
            //vai gerar com um numero aleatório no final ^^
            zip = "E:\\" + System.IO.Path.GetFileNameWithoutExtension(tkt)+""+ r.Next()+System.IO.Path.GetExtension(tkt);
            //para testes em casa
            //zip = "C:\\teste\\" + System.IO.Path.GetFileNameWithoutExtension(tkt) + "" + r.Next() + System.IO.Path.GetExtension(tkt);


            System.IO.File.Copy(tkt, zip, true);
            datafim = "" + DateTime.Now;
            erro = "";
            data = "Baixando o TKT:<br/>" + dataini + " - " + datafim;
        }
        else
        {
            erro = "O Tkt não foi encontrado para ser baixado:<br/>" + tkt;
        }


        return zip;
    }

    public List<Generica> listatkt(string diretoriotkts, Boolean tipo)
    {
        List<Generica> li = new List<Generica>();
        System.IO.DirectoryInfo dir = new System.IO.DirectoryInfo(@diretoriotkts);
        if (dir.Exists)
        {
            Generica selecione = new Generica();
            selecione.nome = "Selecione";
            selecione.caminho = "";
			selecione.tipo=-1;
            li.Add(selecione);
            if (tipo)
            {
                foreach (System.IO.FileInfo tkt in dir.GetFiles())
                {
                    if (tkt.Extension.Equals(".zip"))
                    {
                        Generica g = new Generica();
                        g.nome = tkt.Name.Replace("tkt-","");
                        g.caminho = tkt.FullName;
						g.tipo=1;
                        li.Add(g);
                    }
                }
				/*para as trunks*/
				dir=new System.IO.DirectoryInfo("\\\\192.168.56.87\\public\\sellerweb\\VERSION");
                foreach (System.IO.FileInfo tkt in dir.GetFiles())
                {
                    if (tkt.Extension.Equals(".zip"))
                    {
                        Generica g = new Generica();
                        g.nome = tkt.Name;
                        g.caminho = tkt.FullName;
						g.tipo=2;
                        li.Add(g);
                    }
                }				
				
				
            }
            else
            {
                foreach (System.IO.DirectoryInfo site in dir.GetDirectories())
                {
					if(!site.Name.Equals("qa") && !site.Name.Equals("testlink") && !site.Name.Equals("HelpSellerWeb") && !site.Name.StartsWith("pms"))
					{	
						Generica g = new Generica();
						g.nome = site.Name;
						g.caminho = site.FullName;
						g.tipo=0;
						li.Add(g);
					}
                }
            }
        }
        return li;
    }
}