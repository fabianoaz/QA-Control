
	function desabPDV(){
		document.getElementById('dados').style.display = 'none';
	}
	function marcaCheck(){
		if(document.getElementById('dados').style.display == 'none'){
			document.getElementById('criaPDV').checked = true;
			document.getElementById('dados').style.display = 'block';
			document.getElementById('aumentar').style.height = '140px';
		}else{
			//document.getElementById('criaPDV').checked = false;
			document.getElementById('dados').style.display = 'none';
			document.getElementById('aumentar').style.height = '10%';
		}
	}