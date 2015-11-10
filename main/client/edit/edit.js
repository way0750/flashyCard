var editApp = angular.module('editApp', []);

editApp.controller('editAppCtrl', function ($scope) {
  
  $scope.classObj = {
    newCard : false,
    invisible : true
  };

  $scope.newCard = function(){
    $scope.classObj = {
      newCard : !$scope.classObj.newCard,
      invisible : !$scope.classObj.invisible
    };
    console.log('new card button clicked!');
  };
});
