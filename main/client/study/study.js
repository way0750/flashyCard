var studyApp = angular.module('study', []);

studyApp.controller('studyCtrl', function ($scope, getFileList) {
  $scope.globalData = getFileList.dataObj;
    console.log('im in studyCtrl the $scope.curStack is :', $scope.globalData.curStack);
});
