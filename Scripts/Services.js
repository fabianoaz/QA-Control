/// <reference path="ScriptJSQA.js" />
//retorna o retorno de uma função javascript
myApp
.factory('LimpaCaracteres', function () {
    return {
        limpa: function (vstring,idcampo,atualizavalueid)
            {
			aceitos=[
			{letra:'a'},{letra:'b'},{letra:'c'},{letra:'d'},{letra:'e'},{letra:'f'},{letra:'g'},{letra:'h'},{letra:'i'},{letra:'j'},{letra:'k'},{letra:'l'},
			{letra:'m'},{letra:'n'},{letra:'o'},{letra:'p'},{letra:'q'},{letra:'r'},{letra:'s'},{letra:'t'},{letra:'u'},{letra:'v'},{letra:'w'},{letra:'y'},
			{letra:'z'},{letra:'0'},{letra:'1'},{letra:'2'},{letra:'3'},{letra:'4'},{letra:'5'},{letra:'6'},{letra:'7'},{letra:'8'},{letra:'9'},{letra:'_'}];				
			
			var ret="";
			campo = document.getElementById(idcampo);
			if(campo!=null)
			{
				if(atualizavalueid)
				{
					document.getElementById(campo.id).value = document.getElementById(campo.id).value.replace(/\s/gi, "")
				}

				for (var i=0;i<vstring.toString().length;i++)
				{
						for (var e=0;e<aceitos.length;e++)
						{
							if(vstring[i].toLocaleLowerCase()==aceitos[e].letra)
							{
								ret=ret+aceitos[e].letra;
								e=aceitos.length;
							}
						}
				}
			}
			return ret.toString().toLocaleLowerCase();			
            }
        }
    })
.factory('LimpaCaracteresDir', function () {
    return {
        limpa: function (vstring,idcampo)
            {
			//esse aceita quase todos caracteres
			//menos +-*#&
			aceitos=[
			{letra:'a'},{letra:'b'},{letra:'c'},{letra:'d'},{letra:'e'},{letra:'f'},{letra:'g'},{letra:'h'},{letra:'i'},{letra:'j'},{letra:'k'},{letra:'l'},
			{letra:'m'},{letra:'n'},{letra:'o'},{letra:'p'},{letra:'q'},{letra:'r'},{letra:'s'},{letra:'t'},{letra:'u'},{letra:'v'},{letra:'w'},{letra:'y'},
			{letra:'z'},{letra:'0'},{letra:'1'},{letra:'2'},{letra:'3'},{letra:'4'},{letra:'5'},{letra:'6'},{letra:'7'},{letra:'8'},{letra:'9'},{letra:'ç'},
			{letra:'_'},{letra:'\\'},{letra:' '},{letra:':'},{letra:'!'},{letra:'@'},{letra:'$'},{letra:'%'},{letra:'¨'},{letra:'('},{letra:')'},{letra:'.'},
			{letra:','},{letra:'='},{letra:'['},{letra:']'},{letra:'{'},{letra:'}'},
			{letra:'á'},{letra:'à'},{letra:'ã'},{letra:'â'},{letra:'ä'},{letra:'é'},{letra:'è'},{letra:'ê'},{letra:'ë'},
			{letra:'í'},{letra:'ì'},{letra:'î'},{letra:'ï'},{letra:'ó'},{letra:'ò'},{letra:'õ'},{letra:'ö'},{letra:'ú'},{letra:'ù'},{letra:'ü'},{letra:'ñ'}
			];
			//!@#$%¨&
			var ret="";
			campo = document.getElementById(idcampo);
			if(campo!=null)
			{
				for (var i=0;i<vstring.toString().length;i++)
				{
						for (var e=0;e<aceitos.length;e++)
						{
							if(vstring[i].toLocaleLowerCase()==aceitos[e].letra)
							{
								ret=ret+aceitos[e].letra;
								e=aceitos.length;
							}
						}
				}
			}
			return ret.toString().toLocaleLowerCase();			
            }
        }
    })	
.factory('LimpaNumeros', function ($log) {
    return {
        limpa: function (vstring,idcampo,min,max,atualizavalueid)
            {
				
			if((vstring+"")=="")
			{
				return null;
			}
			if(vstring==undefined)
			{
				return min;
			}
				
				
			aceitos=[
			{letra:'1'},{letra:'2'},{letra:'3'},{letra:'4'},{letra:'5'},{letra:'6'},{letra:'7'},{letra:'8'},{letra:'9'},{letra:'0'}];
				
			campo = document.getElementById(idcampo);
			if(campo!=null)
			{
				if(atualizavalueid)
				{
			//		document.getElementById(campo.id).value = document.getElementById(campo.id).value.replace(/\s/gi, "")
				}
				aux=""+vstring;
				ret="";
				for (var i=0;i<aux.toString().length;i++)
				{
						for (var e=0;e<aceitos.length;e++)
						{
							if(aux[i].toLocaleLowerCase()==aceitos[e].letra)
							{
								ret=ret+""+aceitos[e].letra;
								e=aceitos.length;
							}
						}
				}
				vstring=parseInt(ret);
				if(vstring!=null && (vstring+"")!="" && vstring!=undefined)
				{
					if(vstring<min)
					{
						vstring=min;
					}
					if(vstring>max)
					{
						vstring=max;
					}
				}
			}
			return vstring;
            }
        }
    })
.factory('ListaSites', function ($http,Mensagem) {
    return {
        sitesl: function ($scope)
            {
                var respostadirsite = function (listasite) {
                    $scope.sites2 = listasite.data;
                    $scope.site = $scope.sites2[0];
                }
                var respostadirersite = function (listaerrosite) {
					Mensagem.msg("Erro no WebService",listaerrosite.data)
                    $scope.site = $scope.sites2[0];
                }
                $http({ method: 'GET', url: 'DeletaeCopia.asmx/listadir?op="site"' })
                .then(respostadirsite, respostadirersite);
				/*Retorna a lista de sites*/
            }
        }
    })
.factory('ListaTtks', function ($http) {
    return {
        tktsl: function ($scope)
            {
                var respostadirtkt = function (listatkt) {
                    $scope.tkts2 = listatkt.data;
                    $scope.tkt = $scope.tkts2[0];
                }
                var respostadirertkt = function (listaerrotkt) {
					Mensagem.msg("Erro no WebService",listaerrotkt.data)
                    $scope.tkt = $scope.tkts2[0];
                }
                $http({ method: 'GET', url: 'DeletaeCopia.asmx/listadir?op="tkt"' })
                .then(respostadirtkt, respostadirertkt);
				/*Retorna a lista de tkts*/
            }
        }
    })
.factory('AtualizaSite', function ($http,$log,Mensagem) {
    return {
        atualiza: function ($scope) {
            var respostasucesso = function (respostadowebservice) {
                $scope.dados = respostadowebservice.data;
                $log.info(respostadowebservice);
				Mensagem.msg("Resultados da atualização",$scope.dados)
                $scope.botaobloqueado = false;
				$scope.loading=false;
                $scope.label = "Atualizar"
            }
            var respostaerro = function (motivo) {
                $scope.erro = motivo.data;
                $log.info(motivo);
				Mensagem.msg("Algo deu errado ao atualizar..",$scope.erro)
                $scope.botaobloqueado = false;
				$scope.loading=false;
                $scope.label = "Atualizar"
            }
            $http({ method: 'GET', url: 'DeletaeCopia.asmx/Atualiza?tkt=' + $scope.tkt.caminho + '&site=' + $scope.site.caminho })
            .then(respostasucesso, respostaerro);
			/*Efetua a atualização do site*/
        }
    }
})
.factory('AttachaBanco', function ($http,$log,Mensagem) {
    return {
        attacha: function ($scope) {
                var respostaattacha = function (resattacha) {
					$log.info(resattacha);
					Mensagem.msg("Resultados da restauração",""+resattacha.data)
					$scope.botaobloqueado=false;
					$scope.loading=false;
					$scope.label="Criar Banco";
                }
                var respostaerrattacha = function (reserrattacha) {
					Mensagem.msg("Algo deu errado ao restaurar..",""+reserrattacha.data)
					$log.info(reserrattacha);
					$scope.botaobloqueado=false;
					$scope.loading=false;
					$scope.label="Criar Banco";
               }
                $http({ method: 'GET', url: 'AttachaePersonaliza.asmx/attacha?tiposistema='+$scope.tiposistema+'&tipoambiente='+$scope.tipoambiente+'&projeto='+$scope.projeto+'&cliente='+$scope.cliente+'&criador='+$scope.criador+'&bak='+$scope.bak+'&caminho='+$scope.destino
				+'&nomemaquina='+$scope.nomemaquina+'&alterarsenhas='+$scope.alterarsenhas+'&utilizarnfe='+$scope.usanfe
				+'&utilizarnfce='+$scope.usanfce
				+'&criarmaquina='+$scope.criamaquina
				+'&ativapista='+$scope.ativarpista
				+'&ecf='+$scope.criaecf
				+'&portaserial='+$scope.serial+'&marca='+$scope.marcaecf.id+'&serie='+$scope.serieecf+'&num='+$scope.numeroequipamento+'&email='+$scope.email})
                .then(respostaattacha, respostaerrattacha);
				/*Efetuar o procedimento de Attachar e Personalizar*/
        }
    }
})
.factory('Mensagem', function () {
    return {
        msg: function (titulo,texto) {
		$("<div id='dialog' title='"+titulo+"' visible=false> <p>"+texto+"</p></div>").dialog({
					modal: true,
					draggable: false,
					resizable: false,
					position: {my: 'center', at: 'center', of: window},
					width: 500,
					height: 250,
					dialogClass: 'ui-dialog-osx',
					buttons: {
						"OK, Obrigado(a)!": function() {
							$(this).dialog("close");
						}
					}
				});
				/*Exibe mensagens na tela*/
        }
    }
})
.factory('Opcao', function () {
    return {
        qst: function (titulo,texto,$scope) {
		$("<div id='dialogq' title='"+titulo+"' visible=false> <p>"+texto+"</p></div>").dialog({
					modal: true,
					draggable: false,
					resizable: false,
					position: {my: 'center', at: 'center', of: window},
					width: 500,
					height: 250,
					dialogClass: 'ui-dialog-osx',
					buttons: {
						"Sim, Quero Fazer Isto!": function() {
							$scope.op=1;
							$scope.faca();
							$(this).dialog("close");
						},
						"Não, Não Quero!": function() {
							$scope.op=0;							
							$scope.naofaca();
							$(this).dialog("close");
						}
					}

				})
				.on( "dialogclose",function(event, ui){ if($scope.op==0){$scope.naofaca();}});
				/*Efetuar uma Pergunta, e se escolher 1, é para fazer algo, se escolher 0 (ou fechar), nada deve ser feito*/
        }
    }
})
