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
	.controller("ControllerQADB", function ($scope,AttachaBanco,Mensagem, $http){

		$scope.botaobloqueado = false; $scope.label="Criar Banco"; botaobloqueado=false;
		$scope.tiposistema="seller web";
		$scope.tipoambiente="teste";
		
		$scope.projeto="";
		$scope.cliente="";
		$scope.criador="";
		$scope.bak="";
		$scope.destino="";
		$scope.email="";

		$scope.alterarsenhas=true;
		$scope.usanfe=false;
		$scope.usanfce=false;
		$scope.nomemaquina="";
		$scope.ativarpista=false;
		$scope.criaecf=false;
		$scope.serial="";
		
		$scope.marcasecf=[
		{nome: 'Selecione', id:0},
		{nome: 'Bematech', id:1},
		{nome: 'Sweda', id:2},
		{nome: 'Daruma', id:3}];
		$scope.serieecf="";
		$scope.numeroequipamento="";
	
		$scope.marcaecf=$scope.marcasecf[0];
		
		$scope.ciarbanco = function () 
		{

			$scope.msg=""
			$scope.botaobloqueado=true;
			
			/*Valida os dados básicos necessários*/
			if($scope.projeto.trim()=="" || $scope.cliente.trim()=="" || $scope.criador.trim() =="")
			{
				//esse cara não pode ter espaços (eu acho)
				$scope.msg+="<br/>Informe corretamente as Informações do Ambiente<br/>";
			}
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
				return;
			}
			else
			{
				$scope.label = "Restaurando/Personalizando.."
				AttachaBanco.attacha($scope)
				//faz os procedimentos para chamar o web service
				/*				Parâmetros   */
				
				/*
				$scope.tiposistema
				$scope.tipoambiente
				$scope.projeto
				$scope.cliente
				$scope.criador
				$scope.bak
				$scope.destino
				$scope.email
				$scope.alterarsenhas
				$scope.usanfe
				$scope.usanfce
				$scope.nomemaquina
				$ativarpista
				$scope.criaecf
				$scope.serial
				$scope.marcaecf.id
				$scope.serieecf
				$scope.numeroequipamento
				*/

				$scope.label="Criar Banco";
				
			}
				
			
		}
		
	})