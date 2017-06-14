
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
	
	function caracteres(){
	  var el = document.getElementById('projeto');
      var regex = new RegExp("^[àèìòùáéíóúâêîôûãõ\b]+$");
      var _this = this;
	  
	  console.log('EL Value Antes ' + el.value);
	  
	   el.value = el.value.replace(regex , '');
	  
	  console.log('Regex ' + regex);
	  console.log('_this ' + _this);
	  console.log('EL ' + el);
	  console.log('EL Value Depois ' + el.value);
	};