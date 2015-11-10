var fileList = angular.module('fileList', []);

fileList.controller('fileListCtrl', function ($scope, $http, getFileList) {

  $scope.getFiles = function(){
    getFileList.getFiles().then(function(res){
      $scope.fileList = res.data;
    });
  };

  //every time this view is loaded, file list should be updated as well;
  $scope.getFiles();

  //this function should do two things get file by $http save it in the client.curStack
  //then 
  $scope.getFile = function(){
    console.log($scope.fileName);
    getFileList.getStack($scope.fileName).then(function(data){
      $scope.curStack = data;
    });
  };

});
