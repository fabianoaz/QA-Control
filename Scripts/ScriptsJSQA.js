/// <reference path="angular.js" />

var myApp = angular
    .module("Module", [])
    .controller("ControllerQA", function ($scope, $http, $log, $window,$timeout) {
        /*Variaveis para frescuras de tela*/
        //$scope.sites = "selecione";        //$scope.tkts = "selecione";
        $scope.botaobloqueado = false; $scope.label = "Atualizar"
        //depois pegar do banco em um factory
		$scope.tkts2 = [
		 {nome:'Selecione', caminho:'sa'}];
		$scope.sites2 = [
		{nome:'selecione', caminho:''}];
		$scope.site = $scope.sites2[0];	
		$scope.tkt = $scope.tkts2[0];	
		/*lista tkt*/
        var respostadirtkt = function (listatkt)
        {
            $scope.tkts2 = listatkt.data;
			$scope.tkt = $scope.tkts2[0];	
        }
        var respostadirertkt = function (listaerrotkt) {
            $window.alert(listaerrotkt.data);
			$scope.tkt = $scope.tkts2[0];	
        }
        $http({ method: 'GET', url: 'DeletaeCopia.asmx/listadir?op="tkt"'})
        .then(respostadirtkt,respostadirertkt);
		
		/*lista sites*/
        var respostadirsite = function (listasite)
        {
            $scope.sites2 = listasite.data;
			$scope.site = $scope.sites2[0];	
        }
        var respostadirersite = function (listaerrosite) {
            $window.alert(listaerrosite.data);
			$scope.site = $scope.sites2[0];	
        }
        $http({ method: 'GET', url: 'DeletaeCopia.asmx/listadir?op="site"'})
        .then(respostadirsite,respostadirersite);
		
        $scope.retorno = function () {
            //valida o basico das combos
            if ($scope.tkt == undefined || $scope.site == undefined
                || $scope.tkt.nome == "Selecione" || $scope.site.nome == "selecione")
            {
                $window.alert("Selecione Tkt e Site!");
                $scope.botaobloqueado = false;
                return;
            }
            $scope.label = "Atualizando.."
            //bloqueia o botão e diz como vai receber a resposta do webservice
            $scope.botaobloqueado = true;
            var respostasucesso = function (respostadowebservice) {
                $scope.dados = respostadowebservice.data;
                $log.info(respostadowebservice);
                $window.alert($scope.dados);
                $scope.botaobloqueado = false;
                $scope.label = "Atualizar"
            }
            var respostaerro = function (motivo) {
                $scope.erro = motivo.data;
                $log.info(motivo);
                $window.alert($scope.erro);
                $scope.botaobloqueado = false;
                $scope.label = "Atualizar"
            }
            $http({ method: 'GET', url: 'DeletaeCopia.asmx/Atualiza?tkt=' + $scope.tkt.caminho + '&site=' + $scope.site.caminho })
            .then(respostasucesso, respostaerro);
			//$timeout(function(){
            //$http({ method: 'GET', url: 'DeletaeCopia.asmx/Atualiza?tkt=' + $scope.tkts + '&site=' + $scope.sites })
            //.then(respostasucesso, respostaerro);
			//},300000);
        }
    })