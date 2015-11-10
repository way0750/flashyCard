var editApp = angular.module('editApp', []);

editApp.controller('editAppCtrl', function ($scope, getFileList) {
  
  $scope.classObj = {
    newCard : false,
    invisible : true
  };

  $scope.newCard = function(){
    $scope.classObj = {
      newCard : !$scope.classObj.newCard,
      invisible : !$scope.classObj.invisible
    };
  };

  $scope.globalData = getFileList.dataObj;
  // Mousetrap.unbind('command+e');

});
