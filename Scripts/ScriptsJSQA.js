/// <reference path="angular.js" />

var myApp = angular
    .module("Module", [])
    .controller("ControllerQA", function ($scope, ListaSites, ListaTtks, AtualizaSite,$window) {
        $scope.botaobloqueado = false; $scope.label = "Atualizar"
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