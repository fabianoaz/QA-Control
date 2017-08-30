
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

[Serializable]
public class LogApp
    {
        public void logar(string log) {
            string arqlog = "E:\\SitesSeller\\DefaultWebSite\\qa\\Logs\\" + DateTime.Now.Day +"-" +DateTime.Now.Month +"-" +DateTime.Now.Year +".txt";
            //string arqlog = "C:\\" + DateTime.Now.Day+".txt";
            //adiciona data e hora do server no log
            log = DateTime.Now+ " * "+ log;
            try
            {
                if (!System.IO.File.Exists(arqlog))
                {
                    using (System.IO.StreamWriter sw = System.IO.File.CreateText(arqlog))
                    {
                        sw.WriteLine(log);
                        sw.Close();
                    }
                }
                else
                {
                    using (System.IO.StreamWriter sw = System.IO.File.AppendText(arqlog))
                    {
                        sw.WriteLine(log);
                        sw.Close();
                    }
                }
            }catch(Exception err)
            {
                //se der erro, tentar gravar no registry do windows
                //embora seja mais provavel que lá não tenha permissão
                //mas é uma contingência
                logawindows("Erro ao logar:\n"+log+"\nMotivo:\n"+err);
            }
    }
        private void logawindows(string log)
        {
            const string entrada = "QAGerencial";
            const string aplicacao = "WEBQAGerencial";
            //se não existe a entrada, a cria
            try
            {
                if (!System.Diagnostics.EventLog.SourceExists(entrada))
                {
                    System.Diagnostics.EventLog.CreateEventSource(aplicacao, entrada);
                }
                System.Diagnostics.EventLog.WriteEntry(aplicacao, log, System.Diagnostics.EventLogEntryType.FailureAudit);
            }
            catch (System.Security.SecurityException err)
            {
                Console.WriteLine("Também não foi possível logar nos eventos\n"+
                    "Possivelmente a aplicação não possua permissão suficiente:\n" + err);
            }
            catch (Exception err)
            {
                Console.WriteLine("Também não foi possível logar nos eventos: " + err);
            }
        }
    }
