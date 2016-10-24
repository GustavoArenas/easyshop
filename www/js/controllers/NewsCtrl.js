app.controller('NewsCtrl', function ($rootScope, $scope, $ionicLoading, $http, $ionicPopup, $stateParams, SrvCall,$interval, ionicMaterialInk, ionicMaterialMotion) {
    
   
    //inicia el evento cargando y bloquea la pantalla
    $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    }); 
    SrvCall.async('dummy/productos.json', 'GET', '').success(function(resp) {
     //console.log(resp)
     //Apaga el evento cargando
     $ionicLoading.hide();
     $scope.novedades = resp.productos;
    }).error(function(resp){
            //Apaga el evento cargando
            $ionicLoading.hide();
                $ionicPopup.alert({
                        title: 'Ups!',
                        template: resp,
                        okText: 'OK!'
                });     
    });
    
    $interval(function(){
      SrvCall.async('dummy/productos.json', 'GET', '').then(function(resp) {
       //console.log(resp)
       $scope.novedades = resp.data.productos;
      });
    },120000);
      
    $scope.shopping = function(productId){
      $scope.data = {};
      // An elaborate, custom popup
      var shopPopup = $ionicPopup.show({
        template: '<input type="number" ng-model="data.ammount">',
        title: 'Ingrese cantidad',
        subTitle: 'En numeros por unidad',
        scope: $scope,
        buttons: [
          { text: 'Cancelar' },
          {
            text: '<b>Guardar</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.ammount) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                $scope.data.productId = productId;
                //TODO GUSTAVO ESTO HAY QUE CAMBIARLO POR EL VALOR QUE ESTA EN EL SHOPPCART
                $rootScope.shoppAmmount = $scope.data.ammount;
                console.log($scope.data); 
              }
            }
          }
        ]
      });
    }
   
});