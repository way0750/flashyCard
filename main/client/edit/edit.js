var editApp = angular.module('editApp', []);

editApp.controller('editAppCtrl', function ($scope, getFileList) {
  
  $scope.gData = getFileList.dataObj;

  $scope.classObj = {
    newCard : false,
    invisible : $scope.gData.makingNewCard
  };

  $scope.newCard = function(){
    $scope.classObj = {
      invisible : !$scope.classObj.invisible
    };
    console.log('in edit');
  };

  $scope.globalData = getFileList.dataObj;
  
  Mousetrap.bind('command+j', $scope.newCard);
});
