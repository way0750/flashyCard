var flashy = angular.module('flashyCard', ['fileList', 'editApp', 'ngRoute']);

flashy.config(function($routeProvider, $httpProvider){
  $routeProvider
    .when('/fileList',{
      templateUrl : '../fileList/fileList.html',
      controller : 'fileListCtrl'
    })
    .when('/study', {
      templateUrl : '../study/study.html'
    })
    .when('/edit', {
      templateUrl : '../edit/edit.html',
      controller : 'editAppCtrl'
    })
    .when('/',{
      templateUrl : '../fileList/fileList.html' 
    });//closes the $routeProvider
});

flashy.factory('getFileList', function($http){

  var getFiles = function(){
    console.log('got called');
    return $http({
      method: 'GET',
      url: "/listFiles"
    });
  };

  var getStack = function(fileName){
    console.log('geting this stack:', fileName);
    return  $http({
      method: 'POST',
      url: '/readFile',
      data : {fileName : fileName}
    });

  };

  return {
    getFiles : getFiles,
    getStack : getStack
  };

});

flashy.controller('flashyCardCtrl', function ($scope, $http, getFileList) {
  $scope.fileList;

  $scope.curStack = null;
  
  getFileList.getFiles().then(function(res){
    $scope.fileList = res.data;
  });

});//close controller

