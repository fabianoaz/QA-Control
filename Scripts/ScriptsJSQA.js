/// <reference path="angular.js" />
/// <reference path="~/jQuery/jquery-3.2.1.min.js" />
var myApp = angular
    .module("Module", [])
	.controller("paginas", function ($scope){
	$scope.pag=function(menu) 
	{
		if (menu=="sitesebancos")
		{
			$scope.pagina="./sitesebancos.html";
		}
		return $scope.pagina;
	}
	})	
    .controller("ControllerQASITES", function ($scope, ListaSites, ListaTtks, AtualizaSite,Mensagem) {
        $scope.botaobloqueado = false; $scope.label = "Atualizar";
		$scope.loading=false;
        $scope.tkts2 = [
		 {nome:'Selecione', caminho:'sa'}];
        $scope.sites2 = [
		{nome:'selecione', caminho:''}];
        $scope.site = $scope.sites2[0];	
        $scope.tkt = $scope.tkts2[0];

        /*retorna a lista tkts e sites*/
        $scope.listatktesite = function () {
            $scope.sites2 = ListaSites.sitesl($scope);
            $scope.tkts2 = ListaTtks.tktsl($scope);
        }
		$scope.bloqueia= function()
		{
			$scope.label = "Atualizando.."
            $scope.botaobloqueado = true;
			$scope.loading=true;			
		}
		
		
		
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
			$scope.bloqueia();

            /*chama o factory para atualizar*/
            AtualizaSite.atualiza($scope);
        }
    })
	.controller("ControllerQADB", function ($scope,AttachaBanco,Mensagem, Opcao, LimpaCaracteres,LimpaCaracteresDir,LimpaNumeros){
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
				if ($scope.nomemaquina.trim()!="" && !$scope.nomemaquina.Equals(null))
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
				
				
				
				
				Opcao.qst("Tem Certeza?","Você está prestes a vincular um banco de dados com o nome abaixo:<br/>"+$scope.nomesite()+"<br/>Caso exista um banco de dados attachado com esse mesmo nome, o mesmo será excluído, confirma está operação?",$scope);
			}
		}
		
	})
