/// <reference path="ScriptJSQA.js" />
//retorna o retorno de uma função javascript
myApp
.factory('ListaSites', function ($http,Mensagem) {
    return {
        sitesl: function ($scope)
            {
                //   $window.alert("vai ver a lista de sites");
                var respostadirsite = function (listasite) {
                    $scope.sites2 = listasite.data;
                    $scope.site = $scope.sites2[0];
                }
                var respostadirersite = function (listaerrosite) {
					Mensagem.msg("Erro no WebService",listaerrosite.data)
                    //$window.alert(listaerrosite.data);
                    $scope.site = $scope.sites2[0];
                }
                /*faz a solicitação dos sites*/
                $http({ method: 'GET', url: 'DeletaeCopia.asmx/listadir?op="site"' })
                .then(respostadirsite, respostadirersite);
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
                    //$window.alert(listaerrotkt.data);
                    $scope.tkt = $scope.tkts2[0];
                }
                /*faz a solicitação dos tkt*/
                $http({ method: 'GET', url: 'DeletaeCopia.asmx/listadir?op="tkt"' })
                .then(respostadirtkt, respostadirertkt);
            }
        }
    })
.factory('AtualizaSite', function ($http,$log,Mensagem) {
    return {
        atualiza: function ($scope) {
            var respostasucesso = function (respostadowebservice) {
                $scope.dados = respostadowebservice.data;
                $log.info(respostadowebservice);
				Mensagem.msg("Tempos da Atualização",$scope.dados)
                //$window.alert($scope.dados);
                $scope.botaobloqueado = false;
                $scope.label = "Atualizar"
            }
            var respostaerro = function (motivo) {
                $scope.erro = motivo.data;
                $log.info(motivo);
                //$window.alert($scope.erro);
				Mensagem.msg("Erro no WebService",$scope.erro)
                $scope.botaobloqueado = false;
                $scope.label = "Atualizar"
            }
            $http({ method: 'GET', url: 'DeletaeCopia.asmx/Atualiza?tkt=' + $scope.tkt.caminho + '&site=' + $scope.site.caminho })
            .then(respostasucesso, respostaerro);
        }
    }
})
.factory('AttachaBanco', function ($http,$log,Mensagem) {
    return {
        attacha: function ($scope) {
                var respostaattacha = function (resattacha) {
					//$window.alert("deu certo");
					$log.info(resattacha);
					
					Mensagem.msg("Attachou",""+resattacha.data)
					//$window.alert(""+resattacha.data);
					$scope.botaobloqueado=false;
                }
                var respostaerrattacha = function (reserrattacha) {
					$window.alert("deu m\n"+reserrattacha.data);
					$log.info(reserrattacha);
                    //$window.alert(reserrattacha.data);
                    //$scope.site = $scope.sites2[0];
					$scope.botaobloqueado=false;
                }
                /*faz a solicitação para attachar o DB*/
				//$window.alert('AttachaePersonaliza.asmx/attacha?tiposistema='+$scope.tiposistema+'&tipoambiente='+$scope.tipoambiente+'&projeto='+$scope.projeto+'&cliente='+$scope.cliente+'&criador='+$scope.criador+'&bak='+$scope.bak+'&caminho='+$scope.destino);
                $http({ method: 'GET', url: 'AttachaePersonaliza.asmx/attacha?tiposistema='+$scope.tiposistema+'&tipoambiente='+$scope.tipoambiente+'&projeto='+$scope.projeto+'&cliente='+$scope.cliente+'&criador='+$scope.criador+'&bak='+$scope.bak+'&caminho='+$scope.destino})
                .then(respostaattacha, respostaerrattacha);
				
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
					position: ['center', 'center'],
					width: 500,
					height: 250,
					dialogClass: 'ui-dialog-osx',
					buttons: {
						"OK, Obrigado(a)!": function() {
							$(this).dialog("close");
						}
					}
				});
        }
    }
})