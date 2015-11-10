var studyApp = angular.module('study', []);

studyApp.controller('studyCtrl', function ($scope, getFileList) {
  $scope.curStack = getFileList.dataObj.curStack;
    console.log('im in studyCtrl the $scope.curStack is :', $scope.curStack);
});
