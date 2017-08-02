	function logarComEnter(){
	  var el = document.keypress;
	  if(el.which == 13) document.getElementById('btnLogon').click();
	};
	
	function verificaestilo(endereco){
     for (var i = 0; i < document.styleSheets.length; i++)
	 {
		 //alert ("2 "+document.styleSheets[i].ownerNode.href)
		 if (document.styleSheets[i].ownerNode.href==endereco)
		 {
			return true;
		 }
	 };
	 alert("O CDN ESTÁ FORA DO AR: \n"+endereco+"\nSERÁ UTILIZADO ARQUIVO LOCAL");
	 return false;
	}
	



	function verificaversaonavegador(){
	//var txt = ""; 
	var vers=""; var aux="";
	//txt += "Browser CodeName: " + navigator.appCodeName ; txt += "||Browser Name: " + navigator.appName; txt += "||Browser Version: " + navigator.appVersion; txt += "||Cookies Enabled: " + navigator.cookieEnabled;
	//txt += "||Browser Language: " + navigator.language; txt += "||Browser Online: " + navigator.onLine; txt += "||Platform: " + navigator.platform; txt += "||User-agent header: " + navigator.userAgent;
	//alert(txt)
	 if (/edge/.test(navigator.userAgent.toLowerCase()))
	 {
		aux=navigator.appVersion.toLowerCase().split('edge/');
		aux=aux[1].split('.');
		vers=aux[0]; 
		alert ("VERSAO EDGE BASE: "+vers)
	 }
		 else
		 if (/opr/.test(navigator.appVersion.toLowerCase()))
		 {
		 aux=navigator.appVersion.toLowerCase().split('opr/');
		 aux=aux[1].split('.');
		 vers=aux[0];
		 alert ("VERSAO OPERA BASE: "+vers)
		 }
	 else 
	   if  (/chrome/.test(navigator.appVersion.toLowerCase()))
	   {
		 aux=navigator.appVersion.toLowerCase().split('chrome/');
		 aux=aux[1].split('.');
		 vers=aux[0];
		 alert ("VERSAO CHROME BASE: "+vers)
	   }
	   else 
		if (/firefox/.test(navigator.appVersion.toLowerCase()))
		{
		   aux=navigator.appVersion.toLowerCase().split('firefox/');
		   aux=aux[1].split('.');
		   vers=aux[0];	
		  alert ("VERSAO MOZILLA BASE: "+vers)
		}

		 else
		   if (/msie/.test(navigator.appVersion.toLowerCase()))
		   {
			 aux=navigator.appVersion.toLowerCase().split('msie ');
			 if(aux.length>0)
			 {
			  aux=aux[1].split('.');
			  vers=aux[0];
			 }
			 alert ("VERSAO IE BASE: "+vers)	     
		   }
			else
			if (/rv/.test((navigator.appVersion).toLowerCase()))
			 {
			 aux=navigator.appVersion.toLowerCase().split('rv:');
			 if(aux.length>0)
			 {
			  aux=aux[1].split('.');
			  vers=aux[0];
			 }
			 alert ("VERSAO IE BASE: "+vers)
		   }
			else
			if (/safari/.test((navigator.appVersion).toLowerCase()))
			 {
			 aux=navigator.appVersion.toLowerCase().split('safari/');
			 if(aux.length>0)
			 {
			  aux=aux[1].split('.');
			  vers=aux[0];
			 }
			 alert ("VERSAO SAFARI BASE: "+vers)
		   }
		}