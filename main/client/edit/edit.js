var editApp = angular.module('editApp', []);

editApp.controller('editAppCtrl', function ($scope, getFileList, $http) {
  
  $scope.gData = getFileList.dataObj;

  $scope.classObj = {
    newCard : false,
    invisible : $scope.gData.makingNewCard
  };

  $scope.curStack = $scope.gData.curStack;

  $scope.newCard = function(){
    $scope.classObj = {
      invisible : !$scope.classObj.invisible
    };
    console.log('in edit');
  };

  $scope.globalData = getFileList.dataObj;

  $scope.sendFile = function(){
    console.log('current stack name', $scope.gData.curStackName);
    console.log('got this as content:', $scope.curStack);

    getFileList.writeFile({
      fileName :  $scope.gData.curStackName,
      file : $scope.curStack
    });
  };//close sendFile
  
});
