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