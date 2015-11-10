var fileList = angular.module('fileList', []);

fileList.controller('fileListCtrl', function ($scope, $http, getFileList, $location) {

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
    getFileList.dataObj.curStackName = $scope.fileName;
    getFileList.getStack($scope.fileName)
      .then(function(res){
        getFileList.dataObj.curStack = res.data;
      })
      .then(function(){
        $location.path( '/study' );
      });
  };//close getFile

});
