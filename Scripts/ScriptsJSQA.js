/// <reference path="angular.js" />
/// <reference path="~/jQuery/jquery-3.2.1.min.js" />
var myApp = angular
    .module("Module", ['ngCookies'])
	.controller("paginas", function ($scope, $cookies, verificaseestalogado, verificasejalogou, Loga, Senhas, AlterarSenha){
	
		$scope.Alterarasenha= function()
		{
			/*Chama a tela de alterar a senha*/
			Senhas.sen('Alterar Senha',$scope);
		}
		//Senhas.sen('Alterar Senha',$scope);
		$scope.faca=function()
		{
			/*se clicou em sim na tela de alterar senha, faz uma validação básica dos dados e chama o serviço que manda para o webservice*/
			AlterarSenha.altera($scope);
		};
		//se respondeu que não quer fazer o processo
		$scope.naofaca=function()
		{
			$scope.senhaatual="";
			$scope.senhanova="";
			$scope.senhanova2="";
			if($scope.op==0)
			{				
			}
		};	
	
	//include
	$scope.pag=function(menu) 
	{
		$scope.nomedousuario="";
		var temp;
		//realiza o include somente se está logado, caso contrario, vai para o login
		if(verificaseestalogado.verlog()==true)
		{
			if (menu=="sitesebancos")
			{
				$scope.pagina="./sitesebancos.html";
				temp=$cookies.get("U-ID").split('_');
				if(temp.length>2)
				{
					$scope.nomedousuario=temp[2];
				}
				return $scope.pagina;
			}
		}
		else
		{
			window.location.assign("login.html");
		}
	}
	$scope.tentativas=0;
	$scope.pass="";
	$scope.name="";
	//faz o login
	$scope.efetualogin=function()
	{
		//se não esta logado, bota o cookie e vai para o index
		if (verificaseestalogado.verlog()==false)
			{
				Loga.loga($scope)
			}
		//window.location.assign("index.html");
	}
	//se está na tela de login, ve se já está logado, caso esteja, vai para o index (não precisa clicar no botão)
	$scope.versejalogou = function(){verificasejalogou.verlogou()}
	//faz o logout
	$scope.desloga = function ()
	{
		$cookies.remove("U-ID");
	}
	
	
	})	
    .controller("ControllerQASITES", function ($scope, ListaSites, ListaTtks, AtualizaSite,Mensagem, Opcao) {
        $scope.botaobloqueado = false; $scope.label = "Atualizar";
		$scope.loading=false;
		$scope.mostrando='TKTs';
		$scope.oposto='TRUNKs';
        $scope.tkts2 = [
		 {nome:'Selecione', caminho:'sa', tipo:-1}];
        $scope.sites2 = [
		{nome:'Selecione', caminho:'',tipo:-1}];
        $scope.site = $scope.sites2[0];
        $scope.tkt = $scope.tkts2[0];
		//$scope.bool=true;
		$scope.filtro=1;
        /*retorna a lista tkts e sites*/
        $scope.listatktesite = function () {
			//if ($scope.bool)
			//{
				//aqui seria interessante bloquear as combos e os botões.. 
				$scope.sites2 = ListaSites.sitesl($scope);
				$scope.tkts2 = ListaTtks.tktsl($scope);
				//$scope.tkt='Selecione'
				//$scope.bool=false;
			//}
        }
		/*bloqueia o botão*/
		$scope.bloqueia= function()
		{
			$scope.label = "Atualizando.."
            $scope.botaobloqueado = true;
			$scope.loading=true;			
		}
		/*altera o filtro de tkts/trunks*/
		$scope.alterafiltro=function()
		{
			if($scope.filtro==1)
			{
				$scope.filtro=2;
				$scope.mostrando='TRUNKs';
				$scope.oposto='TKTs';
			}
			else
			{				
				$scope.filtro=1;
				$scope.mostrando='TKTs';
				$scope.oposto='TRUNKs'
			}
			$scope.tkt = $scope.tkts2[0];
			$scope.site = $scope.sites2[0];
		}
		/*aplica o filtro nos itens*/
		$scope.filtra= function(item)
		{
			if(item.tipo==$scope.filtro || item.tipo==-1)
			{
				return true;
			}else return false;
		}		
		/*se quer atualizar*/
		$scope.faca=function()
		{
			$scope.label = "Atualizando.."
			$scope.botaobloqueado=true;
			$scope.loading=true;
			AtualizaSite.atualiza($scope);
		};
		//se respondeu que não quer fazer o processo
		$scope.naofaca=function()
		{
			if($scope.op==0)
			{
				$scope.loading=false;
				$scope.botaobloqueado=false;
				$scope.label="Atualizar";		
			}
		};
		
        /*faz a treta dos TKTs*/
        $scope.retorno = function () {
            //valida o basico das combos
            if ($scope.tkt == undefined || $scope.site == undefined
                || $scope.tkt.nome.toLocaleLowerCase() == "selecione" ||
                $scope.site.nome.toLocaleLowerCase() == "selecione")
            {
				Mensagem.msg("Inconsistências","<br/>Selecione Tkt e Site!<br/>");
                $scope.botaobloqueado = false;
				$scope.loading=false;
                return;
            }
            //altera o texto do botão para atualizando, bloqueia o botão e exibe o loading
			//$scope.bloqueia();

            /*chama o factory para atualizar*/
			Opcao.qst("Tem Certeza?","Você está prestes a atualizar o site abaixo:<br/>"+$scope.site.nome.toLocaleLowerCase()+"<br/>Deseja realmente fazer isto?",$scope);
            //AtualizaSite.atualiza($scope);
        }
    })
	.controller("ControllerQADB", function ($scope,AttachaBanco,Mensagem, Opcao, LimpaCaracteres,LimpaCaracteresDir,LimpaCaracteresMail,LimpaNumeros){
		$scope.inicializa = function ()
		{
			//document.getElementById('dados').style.display = 'none';
			$scope.botaobloqueado = false;	$scope.op=0;							$scope.nomedosite="";
			$scope.label="Criar Banco";		$scope.tiposistema="sweb"; 				$scope.tipoambiente="teste";
			$scope.projeto="";				$scope.cliente="";						$scope.criador="";		
			$scope.bak="";					$scope.destino="";						$scope.loading=false;

			/*Personalizações*/
			$scope.email="";				$scope.alterarsenhas=true;
			$scope.usanfe=false;			$scope.usanfce=false;
			$scope.nomemaquina="";			$scope.ativarpista=false;
			$scope.criaecf=false;			$scope.serial="";
			$scope.criamaquina=false;

			$scope.marcasecf=[
			{nome: 'Selecione', id:0},{nome: 'Bematech', id:2},
			{nome: 'Sweda', id:1},{nome: 'Daruma', id:5}];
			
			$scope.serieecf="";				$scope.numeroequipamento=""; 			$scope.marcaecf=$scope.marcasecf[0];
		}

		$scope.nomesite = function()
		{
			$scope.nomedosite=$scope.tiposistema+"_"+$scope.tipoambiente;
			/*Deixa somente os caracteres 'normais'*/
			$scope.projeto=LimpaCaracteres.limpa($scope.projeto,'projeto',true);
			$scope.cliente=LimpaCaracteres.limpa($scope.cliente,'cliente',true);
			$scope.criador=LimpaCaracteres.limpa($scope.criador,'criador',true);
			/*OK, da para fazer essa validações fora dessa função, e deixar no onchange dos campos, mas por enquanto, não*/
			$scope.serieecf=LimpaCaracteres.limpa($scope.serieecf,'serieecf',true);
			$scope.nomemaquina=LimpaCaracteres.limpa($scope.nomemaquina,'nomemaquina',true);
			$scope.serial=LimpaNumeros.limpa($scope.serial,'serial',1,9,true);
			$scope.numeroequipamento=LimpaNumeros.limpa($scope.numeroequipamento,'numeroequipamento',1,99,true);
			$scope.bak=LimpaCaracteresDir.limpa($scope.bak,'bak');
			$scope.destino=LimpaCaracteresDir.limpa($scope.destino,'destino');
			$scope.email=LimpaCaracteresMail.limpa($scope.email,'email');
			
			if($scope.projeto!="")
			{
				$scope.nomedosite=$scope.nomedosite+"_"+$scope.projeto;
			}
			if($scope.cliente!="")
			{
				$scope.nomedosite=$scope.nomedosite+"_"+$scope.cliente;
			}
			if($scope.criador!="")
			{
				$scope.nomedosite=$scope.nomedosite+"_"+$scope.criador;
			}			
			return $scope.nomedosite;
		}
		//se respondeu que quer fazer o processo
		$scope.faca=function()
		{
			$scope.label = "Restaurando/Personalizando.."
			$scope.botaobloqueado=true;
			$scope.loading=true;
			AttachaBanco.attacha($scope);
		};
		//se respondeu que não quer fazer o processo
		$scope.naofaca=function()
		{
			if($scope.op==0)
			{
				$scope.loading=false;
				$scope.botaobloqueado=false;
				$scope.label="Criar Banco";		
			}
		};
		$scope.ciarbanco = function () 
		{
			//$scope.nomesite();
			$scope.op==0;
			$scope.msg="";
			if($scope.bak.trim()=="" || $scope.destino.trim()=="")
			{
				$scope.msg+="Informe corretamente os dados para Restaurar Base de Dados<br/>";
			}
			/*validações para personalização*/
			if($scope.ativarpista==true && $scope.nomemaquina.trim()=="")
			{
				$scope.msg+="<br/>Você ativou a pista e não informou o Nome Máquina<br/>";
			}
			if($scope.criaecf && ($scope.marcaecf.id<=0 || $scope.serieecf.trim()==""))
			{
				$scope.msg+="<br/>Você selecionou para criar ECF e não preencheu corretamente os campos de 'Marca ECF' ou 'Nº Série' <br/>";	
			}
			
			/*se encontrou erro exibe na tela, caso contrário, faz a chamada da web*/
			if($scope.msg!="")
			{
				Mensagem.msg("Inconsistências",$scope.msg);
				$scope.loading=false;
				$scope.botaobloqueado=false;
				$scope.label="Criar Banco";
				return;
			}
			else
			{
				if ($scope.nomemaquina.trim()!="" && !$scope.nomemaquina==null)
				{
					$scope.criamaquina=true;
				}
				else 
				{
					$scope.criamaquina=false;
				}
				
				/*teóricamente nunca mais vai cair aqui, mas outra hora retiro*/
				if($scope.numeroequipamento=="" || $scope.numeroequipamento==0 ||  $scope.numeroequipamento==null)
				{
					$scope.numeroequipamento=1;
				}
				if($scope.serial=="" || $scope.serial==0 || $scope.serial==null)
				{
					$scope.serial=1;
				}
				
				
				
				
				//Opcao.qst("Tem Certeza?","Você está prestes a vincular um banco de dados com o nome abaixo:<br/>"+$scope.nomesite()+"<br/>Caso exista um banco de dados atachado com esse mesmo nome, o mesmo será excluído, confirma esta operação?",$scope);
				Opcao.qst("Tem Certeza?","Você está prestes a vincular um banco de dados com o nome abaixo:<br/>"+$scope.nomesite()+"<br/>Caso exista um banco de dados atachado com esse mesmo nome, o mesmo será excluído, deseja realmente fazer isto?",$scope);
			}
		}
		
	})
