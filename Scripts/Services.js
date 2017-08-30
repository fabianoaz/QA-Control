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
			{letra:'z'},{letra:'0'},{letra:'1'},{letra:'2'},{letra:'3'},{letra:'4'},{letra:'5'},{letra:'6'},{letra:'7'},{letra:'8'},{letra:'9'},{letra:'_'},{letra:'x'}];				
			
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
			{letra:'_'},{letra:'\\'},{letra:' '},{letra:':'},{letra:'!'},{letra:'@'},{letra:'$'},{letra:'%'},{letra:'('},{letra:')'},{letra:'.'},
			{letra:','},{letra:'='},{letra:'['},{letra:']'},{letra:'{'},{letra:'}'},{letra:'x'},
			{letra:'á'},{letra:'à'},{letra:'ã'},{letra:'â'},{letra:'ä'},{letra:'é'},{letra:'è'},{letra:'ê'},{letra:'ë'},
			{letra:'í'},{letra:'ì'},{letra:'î'},{letra:'ï'},{letra:'ó'},{letra:'ò'},{letra:'õ'},{letra:'ö'},{letra:'ú'},{letra:'ù'},{letra:'ü'},{letra:'ñ'}
			];
			//# $ &
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
.factory('LimpaCaracteresMail', function () {
    return {
        limpa: function (vstring,idcampo)
            {
			//esse aceita quase todos caracteres
			//menos +-*#&
			aceitos=[
			{letra:'a'},{letra:'b'},{letra:'c'},{letra:'d'},{letra:'e'},{letra:'f'},{letra:'g'},{letra:'h'},{letra:'i'},{letra:'j'},{letra:'k'},{letra:'l'},
			{letra:'m'},{letra:'n'},{letra:'o'},{letra:'p'},{letra:'q'},{letra:'r'},{letra:'s'},{letra:'t'},{letra:'u'},{letra:'v'},{letra:'w'},{letra:'y'},
			{letra:'z'},{letra:'0'},{letra:'1'},{letra:'2'},{letra:'3'},{letra:'4'},{letra:'5'},{letra:'6'},{letra:'7'},{letra:'8'},{letra:'9'},{letra:'ç'},
			{letra:'_'},{letra:'-'},{letra:'@'},{letra:'.'},{letra:'x'} 
			];
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
                var respostadirsite = function (retornobom) {
                    $scope.sites2 = retornobom.data;
                    $scope.site = $scope.sites2[0];
                }
                var respostadirersite = function (retornoruim) {
					Mensagem.msg("Erro no WebService",retornoruim.data)
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
                var respostadirtkt = function (retornobom) {
                    $scope.tkts2 = retornobom.data;
                    $scope.tkt = $scope.tkts2[0];
					$scope.botaobloqueado=false;
					$scope.label="Atualizar";
                }
                var respostadirertkt = function (retornoruim) {
					Mensagem.msg("Erro no WebService",retornoruim.data)
                    $scope.tkt = $scope.tkts2[0];
					$scope.botaobloqueado=false;
					$scope.label="Atualizar";					
                }
				$scope.botaobloqueado=true;
				$scope.label="Carregando Tkts / Trunks / Sites..";
                $http({ method: 'GET', url: 'DeletaeCopia.asmx/listadir?op="tkt"' })
                .then(respostadirtkt, respostadirertkt);
				/*Retorna a lista de tkts*/
            }
        }
    })
.factory('AtualizaSite', function ($http,$log,Mensagem,$cookies) {
    return {
        atualiza: function ($scope) {
            var respostasucesso = function (retornobom) {
                $scope.dados = retornobom.data;
                $log.info(retornobom);
				Mensagem.msg("Resultados da atualização",$scope.dados)
                $scope.botaobloqueado = false;
				$scope.loading=false;
                $scope.label = "Atualizar"
            }
			var temp = $cookies.get("U-ID").split('_');
            var respostaerro = function (retornoruim) {
                $scope.erro = retornoruim.data;
                $log.info(retornoruim);
				Mensagem.msg("Algo deu errado ao atualizar..",$scope.erro)
                $scope.botaobloqueado = false;
				$scope.loading=false;
                $scope.label = "Atualizar"
            }
            $http({ method: 'GET', url: 'DeletaeCopia.asmx/Atualiza?tkt=' + $scope.tkt.caminho + '&site=' + $scope.site.caminho+'&user='+""+temp[0]+"_"+temp[1]})
            .then(respostasucesso, respostaerro);
			/*Efetua a atualização do site*/
        }
    }
})
.factory('AtualizaSiteAutomatizado', function ($http,$log,Mensagem,$cookies) {
    return {
        atualiza: function ($scope) {
            var respostasucesso = function (retornobom) {
                $scope.dados = retornobom.data;
                $log.info(retornobom);
				Mensagem.msg("Resultados da atualização",$scope.dados)
                $scope.botaobloqueado = false;
				$scope.botaobloqueado2=false;
				$scope.loading=false;
                $scope.label = "Atualizar"
            }
			var temp = $cookies.get("U-ID").split('_');
            var respostaerro = function (retornoruim) {
                $scope.erro = retornoruim.data;
                $log.info(retornoruim);
				Mensagem.msg("Algo deu errado ao atualizar..",$scope.erro)
                $scope.botaobloqueado = false;
				$scope.botaobloqueado2=false;
				$scope.loading=false;
                $scope.label = "Atualizar"
            }
            $http({ method: 'GET', url: 'DeletaeCopia.asmx/AtualizaAutomatizado?tkt=' + $scope.tkt.caminho + '&site=' + $scope.site.caminho+'&user='+""+temp[0]+"_"+temp[1]})
            .then(respostasucesso, respostaerro);
			/*Efetua a atualização do site*/
        }
    }
})
.factory('ListaLogsAutomatizados', function ($http, Mensagem) {
    return {
        logsl: function ($scope)
            {
                var respostadirlogs = function (retornobom) {
                    $scope.logs = retornobom.data;
                    $scope.log = $scope.logs[0];
					$scope.botaobloqueado2=false;
					$scope.label2="Visualizar";
                }
                var respostadirerlogs = function (retornoruim) {
					Mensagem.msg("Erro no WebService","Não foi possivel listar os logs do test complete <br>Erro interno: "+retornoruim.data)
                    $scope.log = $scope.logs[0];
					$scope.botaobloqueado2=false;
					$scope.label2="Visualizar";					
                }
				$scope.botaobloqueado2=true;
				$scope.label2="Carregando Logs..";
                $http({ method: 'GET', url: 'DeletaeCopia.asmx/listalogs' })
                .then(respostadirlogs, respostadirerlogs);
				/*Retorna a lista de tkts*/
            }
        }
    })
.factory('LeLogAutomatizado', function ($http,Mensagem,$log) {
    return {
        lelog: function ($scope)
            {
                var respostalelogs = function (retornobom) {
					$log.info(retornobom);
					$scope.botaobloqueado4=false;
					$scope.casos=retornobom.data;
					$scope.temresultado=true;
					
					
					$scope.label2="Visualizar";
                }
                var respostaleerlogs = function (retornoruim) {
					Mensagem.msg("Erro no WebService",retornoruim.data);
					$log.info(retornoruim);
					$scope.botaobloqueado4=false;
					$scope.label2="Visualizar";	
					$scope.temresultado=false;
                }
				$scope.botaobloqueado4=true;
				$scope.nomedoarquivo=$scope.log.nome;
				$scope.label2="Carregando Log..";
                $http({ method: 'GET', url: 'DeletaeCopia.asmx/lerlog?logtxt='+$scope.log.caminho})
                .then(respostalelogs, respostaleerlogs);
				/*Retorna a lista de tkts*/
            }
        }
    })	
.factory('ChamaServico', function ($http,$log,Mensagem,$cookies) {
    return {
        chamaservico: function (a,$scope) {
            var respostasucesso = function (respostadowebservice) {
                //$scope.dados = respostadowebservice.data;
                $log.info(respostadowebservice);
				Mensagem.msg("Resultados do agendamento",respostadowebservice.data);
                $scope.botaobloqueado3 = false;
				//$scope.loading=false;
                //$scope.label = "Atualizar"
            }
			var temp = $cookies.get("U-ID").split('_');
            var respostaerro = function (motivo) {
                //$scope.erro = motivo.data;
                $log.info(motivo);
				Mensagem.msg("Algo deu errado ao agendar..",motivo.data);
				$scope.botaobloqueado3 = false;
				//$scope.loading=false;
                //$scope.label = "Atualizar"
            }
			$scope.botaobloqueado3 = true;
            $http({ method: 'GET', url: 'DeletaeCopia.asmx/solicitarservico?serv=' + a})
            .then(respostasucesso, respostaerro);
			/*Efetua a atualização do site*/
        }
    }
})
.factory('AttachaBanco', function ($http,$log,Mensagem,$cookies) {
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
			   var temp = $cookies.get("U-ID").split('_');
                $http({ method: 'GET', url: 'AttachaePersonaliza.asmx/attacha?tiposistema='+$scope.tiposistema+'&tipoambiente='+$scope.tipoambiente+'&projeto='+$scope.projeto+'&cliente='+$scope.cliente+'&criador='+$scope.criador+'&bak='+$scope.bak+'&caminho='+$scope.destino
				+'&nomemaquina='+$scope.nomemaquina+'&alterarsenhas='+$scope.alterarsenhas+'&utilizarnfe='+$scope.usanfe
				+'&utilizarnfce='+$scope.usanfce
				+'&criarmaquina='+$scope.criamaquina
				+'&ativapista='+$scope.ativarpista
				+'&ecf='+$scope.criaecf
				+'&portaserial='+$scope.serial+'&marca='+$scope.marcaecf.id+'&serie='+$scope.serieecf+'&num='+$scope.numeroequipamento+'&email='+$scope.email
				+'&user='+""+temp[0]+"_"+temp[1]
				})
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
					width: 500,/*'40%',*/ /*500 sem aspas e sem o %*/
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
					width: 500,/*'40%',*/ /*500 sem aspas e sem o %*/
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
.factory('Senhas', function (Criptografa) {
    return {
        sen: function (titulo,$scope) {
		var node = document.getElementById("dialogs");
		if (node!=null) 
			{
				node.parentNode.removeChild(node);
			}	
		$("<div id='dialogs' title='"+titulo+"' visible=false> Senha Atual <input id='senhaatual' class='form-control' type='password' ng-model='senhaatual' /> </br> Senha nova <input id='senhanova' class='form-control' type='password' /> </br> Digite novamente a senha nova <input id='senhanova2'class='form-control' type='password' /> </div>").dialog({
					modal: true,
					draggable: false,
					resizable: false,
					position: {my: 'center', at: 'center', of: window},
					width: 500, /*'40%',*/ /*500 sem aspas e sem o %*/
					height: '350',
					dialogClass: 'ui-dialog-osx',
					buttons: {
						"Confirmo a Nova Senha!": function() {
							/*futuramente, verificar sem fazer a busca por ID*/
							$scope.senhaatual=Criptografa.cripto(document.getElementById('senhaatual').value)
							$scope.senhanova=Criptografa.cripto(document.getElementById('senhanova').value)
							$scope.senhanova2=Criptografa.cripto(document.getElementById('senhanova2').value)
							$scope.op=1;
							$scope.faca();
							$(this).dialog("close");
						},
						"Não Quero Alterar Mais!": function() {
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
.factory('AlterarSenha', function (Criptografa,Mensagem,$cookies,$http,$log) {
    return {
        altera: function ($scope) {
			//Mensagem.msg("DEBUG","s1"+$scope.senhanova+"S2"+$scope.senhanova2)
			if (($scope.senhanova!=$scope.senhanova2)||($scope.senhanova=="" || $scope.senhanova2=="" || $scope.senhaatual==""))
			{
				Mensagem.msg("Senha incorreta","A senha nova não confere com redigitada, ou alguma das informações está em branco");
			}
			else{
				var respostaattacha = function (resattacha) {
					$log.info(resattacha);
					Mensagem.msg("Alteração de Senha",""+resattacha.data)
				}
				var respostaerrattacha = function (reserrattacha) {
					Mensagem.msg("Algo deu Errado ao Alterar a Senha..",""+reserrattacha.data)
					$log.info(reserrattacha);
			   }
			   var temp = $cookies.get("U-ID").split('_');//Criptografa.cripto
				$http({ method: 'GET', url: 'login.asmx/AlteraSenha?cache='+temp[0]+'&senhaantiga='+$scope.senhaatual+'&senhanova='+$scope.senhanova})
				.then(respostaattacha, respostaerrattacha);
			}
		}
	}
})
.factory('Criptografa', function () {
    return {
        cripto: function (texto) {
            //ll representa a linha, rr representa a letra de substituição da coluna da linha
            //cifra de bifid
            var pass1=[
            {ll:[{rr:'p'},{rr:'0'},{rr:'j'},{rr:'z'},{rr:'*'},{rr:' '},{rr:'-'}]},
            {ll:[{rr:'o'},{rr:'k'},{rr:'@'},{rr:'v'},{rr:'d'},{rr:'e'},{rr:'4'}]},
            {ll:[{rr:'r'},{rr:'t'},{rr:'g'},{rr:'s'},{rr:'7'},{rr:'3'},{rr:':'}]},
            {ll:[{rr:';'},{rr:'m'},{rr:'5'},{rr:'ç'},{rr:'f'},{rr:'b'},{rr:'c'}]},
            {ll:[{rr:'w'},{rr:'8'},{rr:'q'},{rr:','},{rr:'!'},{rr:'1'},{rr:'h'}]},
            {ll:[{rr:'l'},{rr:'+'},{rr:'u'},{rr:'a'},{rr:'.'},{rr:'9'},{rr:'n'}]},
            {ll:[{rr:'6'},{rr:'$'},{rr:'x'},{rr:'_'},{rr:'y'},{rr:'2'},{rr:'i'}]}
            ];

            /*
                vai ficar assim 
	                0	1	2	3	4	5	6
                0	p	0	j	z	*	 	-
                1	o	k	@	v	d	e	4
                2	r	t	g	s	7	3	:
                3	;	m	5	ç	f	b	c
                4	w	8	q	,	!	1	h
                5	l	+	u	a	.	9	n
                6	6	$	x	_	y	2	i  
                lógica:
                'bruno' = 35, 20, 52, 56, 10
                aplica periodo 3:
                32,55,02,51,60
                resultado:
                m90+6
            */

            var resultado='';
            //pelo tamanho da senha
            for (var i=0;i<texto.length;i++)
            {	//varrer cadea linha
                for (var e=0;e<pass1.length;e++)
                {	//e em cada linha, todas as colunas
                    for(var ii=0;ii<pass1[e].ll.length;ii++)
                    {	//se o cara da linhaxcoluna, é o igual ao digito, anota a linhaecoluna
                        if(pass1[e].ll[ii].rr==texto[i].toLocaleLowerCase())
                        {
                            resultado+=""+e+""+ii;
							//ii=pass1[e].ll.length;
							//e=pass1.length;
                        }
                    }
                }
            }
            //aqui já temos uma senha numerica em resultado, de acordo com a matriz,
            //exemplo aqui devemos ter bruno = 35 20 52 56 10
            //agora tem que descarteriz a referencia da matriz, agrupando a cada 3
            var aux=resultado;
            resultado="";
            //essa parte é dificil, ao agrupar a cada 3, tem que incrementar o inicio, para não repetir
            //e a sobra, tem que dividir para (quebrando o agrupamento) para complicar mais
            //exemplo, a entrada bruno=3520525610, deve retornar  32 55 02 (2loopelse) 51 60
            for (var i=0;i<aux.length;i++)
            {
                //pega a cada 3 digitos o primeiro digito
                if(i+5<aux.length)
                {
                    resultado+=""+aux[i]+""+aux[i+2]+""+aux[i+4];	
                    //junta com os 3 proximos de cada digito
                    resultado+=""+aux[i+1]+""+aux[i+3]+""+aux[i+5];	
                }
                else
                { //se cair no else, é pq não tem mais como dividir pelo período (que vai ser sempre 4 digitos ou 2)
					if((aux.length-(i))>3)
					{
						resultado+=""+aux[i]+""+aux[i+2]
						resultado+=""+aux[i+1]+""+aux[i+3]
						i=aux.length;
					}
					else 
					{
						resultado+=""+aux[i]+""+aux[i+1]
						i=aux.length;
					}
                }
				
                //incrementa o i, pq 5 digitos já foram adicionados
                i+=5;
            }
            //agora, tem que pegar esse numero novo e converter na matriz novamente
            //exemplo, a entrada bruno=3520525610 = 3255025160, deverá retornar m90+6 
			//obs, fiz uma alteração, para inverter linha com coluna, pois senhas de um digito, retornam o proprio digito.
			//sendo assim, bruno, retornaria s9re-
			//debugar apenas com br depois
            aux=resultado;
            resultado="";
            for(var i=0;i<aux.length;i++)
                {
                    //resultado+=pass1[(aux[i])].ll[(aux[i+1])].rr;
					resultado+=pass1[(aux[i+1])].ll[(aux[i])].rr;
                    i++;
                }
            return resultado;
        }
    }
})
.factory('Loga', function ($http,$log,$cookies,Criptografa,Mensagem) {
    return {
        loga: function ($scope) {
            var respostasucesso = function (respostadowebservice) {
                $log.info(respostadowebservice);
                if (respostadowebservice.data.length > 0) {
						//alert(""+respostadowebservice.data[0]);
                        $cookies.put("U-ID", respostadowebservice.data[0]);
						window.location.assign("index.html");
                    }
                    else
                    {
						$scope.tentativas+=1;
						Mensagem.msg("Login","Alguma coisa foi digitada errada.. <br>Verifique o usuário e a senha. <br><br>Tentativas:"+$scope.tentativas);
//                        $scope.msg="Alguma coisa foi digitada errada.. Verifique o usuário e a senha. Tentativas: "+$scope.tentativas;
                    }
            }
            var respostaerro = function (motivo) {
                $scope.erro = motivo.data;
                $log.info(motivo);
            }
            $http({ method: 'GET', url: 'login.asmx/EfetuaLogin?usuario='+$scope.name+'&senha='+Criptografa.cripto($scope.pass) })
            .then(respostasucesso, respostaerro);
			/*Efetua a atualização do site*/
        }
    }
})
//apenas retorna true ou false 
.factory('verificaseestalogado', function ($cookies) {
    return {
        verlog: function () {
			var coo = $cookies.get("U-ID");
			if (angular.isUndefined(coo))
				{
					return false;
					//window.location.assign("login.html");
				}
			else
			{
				return true;
			}
		}
    }
})
//usado unicamente na tela de login
.factory('verificasejalogou', function (verificaseestalogado) {
    return {
        verlogou: function () {
			//se já esta logado, e está na pagina de login, vai para o index direto
			if (verificaseestalogado.verlog())
				{
					window.location.assign("index.html");
				}
		}
    }
})
//usado pelo restante da aplicação, se não está logado, manda para o index
.factory('validaseestalogado', function (verificaseestalogado) {
    return {
        verlogou: function () {
			//se já esta logado, e está na pagina de login, vai para o index direto
			if (!verificaseestalogado.verlog())
				{
					window.location.assign("login.html");
				}
		}
    }
})
.factory('Tema', function ($rootScope) {
    return {
        trocatema: function ($scope) {
		if($scope.tema=="azul")
		{
			$rootScope.btnprimaryblock="btn btn-primary btn-block";
			$rootScope.btninfoblock="btn btn-info btn-block";
			$rootScope.formcontrol="form-control";
			$rootScope.panelgroup="panel-group";
			$rootScope.paneldefault="panel panel-default";
			$rootScope.panelheading="panel-heading";
			$rootScope.margintopaccordion="4px";
		}
		else 
			if($scope.tema=="linx")
			{
				$rootScope.btnprimaryblock="linx-btn linx-btn-primary linx-btn-block";
				$rootScope.btninfoblock="linx-btn linx-btn-info linx-btn-block";
				$rootScope.formcontrol="linx-form-control";
				$rootScope.panelgroup="linx-panel-group";
				$rootScope.paneldefault="linx-panel linx-panel-default";
				$rootScope.panelheading="linx-panel-heading";
				$rootScope.margintopaccordion="-14px";
			}		
		}
		/* else if [....] ... vai que surgem outros temas */
    }
})