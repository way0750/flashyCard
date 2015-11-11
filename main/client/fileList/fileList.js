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
        var stack = getFileList.dataObj.curStack = res.data;
        stack = getFileList.makeQandA(stack);
        getFileList.dataObj.shuffledStack = stack;
        getFileList.dataObj.shuffledStack = getFileList.shuffle(stack);
      })
      .then(function(){
        $location.path( '/study' );
      });
  };//close getFile

  //testing key binding. make sure to unbind this in other view where it is not supposed to be used
  //for example: in edit.js
  
  $scope.changePath = function (){
    $location.path('/study');
  };


  // hotkeys.bindTo($scope)
  //   .add({
  //     combo: 'ctrl+w',
  //     callback: $scope
  // });

});
