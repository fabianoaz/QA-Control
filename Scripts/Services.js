/// <reference path="ScriptJSQA.js" />
//retorna o retorno de uma função javascript
myApp.factory('ListaSites', function ($http, $window) {
    return {
        sitesl: function ($scope)
            {
                //   $window.alert("vai ver a lista de sites");
                var respostadirsite = function (listasite) {
                    $scope.sites2 = listasite.data;
                    $scope.site = $scope.sites2[0];
                }
                var respostadirersite = function (listaerrosite) {
                    $window.alert(listaerrosite.data);
                    $scope.site = $scope.sites2[0];
                }
                /*faz a solicitação dos sites*/
                $http({ method: 'GET', url: 'DeletaeCopia.asmx/listadir?op="site"' })
                .then(respostadirsite, respostadirersite);
            }
        }
    }
)
.factory('ListaTtks', function ($http, $window) {
    return {
        tktsl: function ($scope)
            {
                var respostadirtkt = function (listatkt) {
                    $scope.tkts2 = listatkt.data;
                    $scope.tkt = $scope.tkts2[0];
                }
                var respostadirertkt = function (listaerrotkt) {
                    $window.alert(listaerrotkt.data);
                    $scope.tkt = $scope.tkts2[0];
                }
                /*faz a solicitação dos tkt*/
                $http({ method: 'GET', url: 'DeletaeCopia.asmx/listadir?op="tkt"' })
                .then(respostadirtkt, respostadirertkt);
            }
        }
    }
)
.factory('AtualizaSite', function ($http,$log, $window) {
    return {
        atualiza: function ($scope) {
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
        }
    }
}
)