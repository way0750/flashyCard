var flashy = angular.module('flashyCard', ['study', 'fileList', 'editApp', 'ngRoute']);

flashy.config(function($routeProvider, $httpProvider){
  $routeProvider
    .when('/fileList',{
      templateUrl : '../fileList/fileList.html',
      controller : 'fileListCtrl'
    })
    .when('/study', {
      templateUrl : '../study/study.html',
      controller : 'studyCtrl'
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


  var dataObj = {

    fileList : null,
    curStack : null,
    curStackName : null

  };

  var globalData = function(){
    return dataObj;
  };

  var getFiles = function(){
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
    getStack : getStack,
    dataObj : dataObj
  };

});

flashy.controller('flashyCardCtrl', function ($scope, $http, getFileList, $location) {
  
  getFileList.getFiles().then(function(res){
    getFileList.dataObj.fileList = res.data;
  });
  $scope.globalData = getFileList.dataObj;
  console.log('in client.js the fileList and curStack are:', $scope.globalData);

  $scope.goEdit = function(event){
    $location.path('/edit').replace();
    $scope.$apply();
    console.log($location.path());
  };

  $scope.goStudy  = function(event){
    $location.path('/study').replace();
    $scope.$apply();
    console.log($location.path());
  };


  $scope.goList  = function(event){
    $location.path('/fileList').replace();
    $scope.$apply();
    console.log($location.path());
  };

  $scope.showCurrentPath = function(event){
    console.log($location.path(), $scope);
  };

  Mousetrap.bind('command+e', $scope.goEdit);
  Mousetrap.bind('command+k', $scope.goStudy);
  Mousetrap.bind('command+j', $scope.goList);
});//close controller

