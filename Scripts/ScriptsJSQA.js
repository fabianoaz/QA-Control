/// <reference path="angular.js" />
/// <reference path="~/jQuery/jquery-3.2.1.min.js" />
var myApp = angular
    .module("Module", [])
    .controller("ControllerQASITES", function ($scope, ListaSites, ListaTtks, AtualizaSite,Mensagem) {
        $scope.botaobloqueado = false; $scope.label = "Atualizar";
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
        /*faz a treta dos TKTs*/
        $scope.retorno = function () {
            //valida o basico das combos
            if ($scope.tkt == undefined || $scope.site == undefined
                || $scope.tkt.nome.toLocaleLowerCase() == "selecione" ||
                $scope.site.nome.toLocaleLowerCase() == "selecione")
            {
				Mensagem.msg("Inconsistências","<br/>Selecione Tkt e Site!<br/>");
                $scope.botaobloqueado = false;
                return;
            }
            //altera o texto do botão para atualizando
            $scope.label = "Atualizando.."
            //e bloqueia o botão
            $scope.botaobloqueado = true;
            /*chama o factory para atualizar*/
            AtualizaSite.atualiza($scope);
        }
    })
	.controller("ControllerQADB", function ($scope,AttachaBanco,Mensagem, Opcao, $http){
		$scope.inicializa = function ()
		{
			$scope.botaobloqueado = false;	$scope.op=0;							$scope.nomedosite="";
			$scope.label="Criar Banco";		$scope.tiposistema="sweb"; 				$scope.tipoambiente="teste";
			$scope.projeto="";				$scope.cliente="";						$scope.criador="";		
			$scope.bak="";					$scope.destino="";

			/*Personalizações*/
			$scope.email="";				$scope.alterarsenhas=true;
			$scope.usanfe=false;			$scope.usanfce=false;
			$scope.nomemaquina="";			$scope.ativarpista=false;
			$scope.criaecf=false;			$scope.serial="";
			$scope.criamaquina=false;
			
			$scope.marcasecf=[
			{nome: 'Selecione', id:0},{nome: 'Bematech', id:1},
			{nome: 'Sweda', id:2},{nome: 'Daruma', id:3}];
			
			$scope.serieecf="";				$scope.numeroequipamento=""; 			$scope.marcaecf=$scope.marcasecf[0];
		}
		$scope.nomesite = function()
		{
			
			$scope.nomedosite=$scope.tiposistema+"_"+$scope.tipoambiente;
				
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
			return $scope.retiraespaco(); 
		}
		$scope.retiraespaco=function()
		{
			while ($scope.nomedosite.toString().match(" "))
			{
				$scope.nomedosite=$scope.nomedosite.toString().replace(" ","");
			}
			//$scope.cliente=$scope.cliente.replace("a","b");
			return $scope.nomedosite.toLocaleLowerCase();
		}
		
		
		
		$scope.faca=function()
		{
			$scope.label = "Restaurando/Personalizando.."
			$scope.botaobloqueado=true;
			AttachaBanco.attacha($scope);
		};
		$scope.naofaca=function()
		{
			if($scope.op==0)
			{
				$scope.botaobloqueado=false;
				$scope.label="Criar Banco";		
			}

		};

		
		$scope.ciarbanco = function () 
		{
			$scope.op==0;
			$scope.msg="";
			if($scope.bak.trim()=="" || $scope.destino.trim()=="")
			{
				$scope.msg+="<br/>Informe corretamente os dados para Restaurar Base de Dados<br/>";
			}
			/*validações para personalização*/
			if($scope.ativarpista==true && $scope.nomemaquina.trim()=="")
			{
				$scope.msg+="<br/>Você ativou a pista e não informou o Nome Maquina<br/>";
			}
			if($scope.criaecf && ($scope.serial<=0 || $scope.marcaecf.id<=0 || $scope.serieecf.trim()=="" || $scope.numeroequipamento<=0))
			{
				$scope.msg+="<br/>Você selecionou para criar ECF e não preencheu corretamente os campos:\n'Serial','Marca ECF', 'Nº Série' ou 'Número Equipamento'<br/>";	
			}
			
			/*se encontrou erro exibe na tela, caso contrário, faz a chamada da web*/
			if($scope.msg!="")
			{
				Mensagem.msg("Inconsistências",$scope.msg);
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