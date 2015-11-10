var fileList = angular.module('fileList', []);

fileList.controller('fileListCtrl', function ($scope, $http, getFileList) {

  $scope.getFiles = function(){
    getFileList.getFiles().then(function(res){
      $scope.fileList = res.data;
    });
  };

  //every time this view is loaded, file list should be updated as well;
  $scope.getFiles();

});
