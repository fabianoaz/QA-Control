﻿using System;
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
            data = "<br/>Deletando risiduos:<br/>" + dataini + " - " + datafim;

            dataini = datafim; datafim = "";
            //copia o web.config
            erro = "Erro ao mover o WEB.CONFIG";
            //não achei necessário fazer função para o MOVE pq ele não tem muita validação.. por enquanto.
            System.IO.File.Move(@site + @"\web.config", temp + @"\web.config");
            erro = "Não foi possivel parar o pool, ou o mesmo não existe";
            //para o POOL
            parainiciapool(site, "stop");
            //renomeia o site
            System.IO.Directory.Move(site, site + "__old");
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
            erro = "Erro ao deletar residuos";
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
            erro += "<br/>erro interno:<br/>" + err;
        }
    }

    private void parainiciapool(string caminhosite, string com)
    {

        string pool = System.IO.Path.GetFileName(caminhosite);

        Process cmd = new Process();
        //em principio, é melhor usar a linha do format, mas vou deixar essa também para pensar depois
        // cmd.StartInfo.Arguments = "/ALL";
        //gera o comando
        string comando = @"C:\Windows\System32\inetsrv\appcmd.exe " + com + " /apppool.name:" + pool;
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
            zip = "\\\\172.16.137.225\\Suporte Seller\\BaseWEb\\TKTS\\" + System.IO.Path.GetFileNameWithoutExtension(tkt)+""+ r.Next()+System.IO.Path.GetExtension(tkt);
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
            li.Add(selecione);
            if (tipo)
            {
                foreach (System.IO.FileInfo tkt in dir.GetFiles())
                {
                    if (tkt.Extension.Equals(".zip"))
                    {
                        Generica g = new Generica();
                        g.nome = tkt.Name;
                        g.caminho = tkt.FullName;
                        li.Add(g);
                    }
                }
            }
            else
            {
                foreach (System.IO.DirectoryInfo site in dir.GetDirectories())
                {
                    Generica g = new Generica();
                    g.nome = site.Name;
                    g.caminho = site.FullName;
                    li.Add(g);
                }
            }
        }
        return li;
    }
}