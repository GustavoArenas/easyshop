app.controller('NewsCtrl', function ($scope, $ionicLoading, $http, $ionicPopup, SrvCall,$interval, ionicMaterialInk) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
   
    //inicia el evento cargando y bloquea la pantalla
    $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    }); 
    SrvCall.async('dummy/productos.json', 'GET', '').success(function(resp) {
     console.log(resp)
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
       console.log(resp)
       $scope.novedades = resp.data.productos;
      });
    },60000);
      
      
        //   //inicia el evento cargando y bloquea la pantalla
        //   $ionicLoading.show({
        //       template: '<ion-spinner icon="android"></ion-spinner>'
        //   }); 
        
        // $http({
        //     method: 'GET',
        //     url: 'dummy/productos.json',
        //     headers: {'Accept': 'application/json'}
        // }).success(function(response){
        //     $scope.novedades = response.productos;
        //     console.log(response);
        //     //Apaga el evento cargando
        //     $ionicLoading.hide();
        // }).error(function(data, status){
        //     //Apaga el evento cargando
        //     $ionicLoading.hide();
        //         $ionicPopup.alert({
        //                 title: 'Ups!',
        //                 template: data.error,
        //                 okText: 'OK!'
        //         });     
        // });
  
  
});