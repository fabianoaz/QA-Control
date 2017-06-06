/// <reference path="angular.js" />

var myApp = angular
    .module("Module", [])
    .controller("ControllerQASITES", function ($scope, ListaSites, ListaTtks, AtualizaSite,$window) {
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
                $window.alert("Selecione Tkt e Site!");
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
	.controller("ControllerQADB", function ($scope,$window){
		$scope.botaobloqueado = false; $scope.label="Criar Banco"; botaobloqueado=false;
		/*
		$scope.tipossistema =[
		{nome:'Seller Web', check:true},
		{nome:'CPBR', check:false},
		{nome:'Serviço', check:false},
		{nome:'Auditoria', check:false}];
		$scope.tiposambiente =[
		{nome:'Teste', check:true},
		{nome:'Desenvolvimento',check:false},
		{nome:'Homologação',check:false},
		{nome:'Documentação',check:false}];
		*/
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
		{nome: 'Bematech', id:0},
		{nome: 'Sweda', id:1},
		{nome: 'Daruma', id:2}];
		$scope.serieecf="";
		$scope.numeroequipamento="";
	

		$scope.marcaecf=$scope.marcasecf[0];
		
		$scope.ciarbanco = function () 
		{
			botaobloqueado=true;
		}
		
		
	})