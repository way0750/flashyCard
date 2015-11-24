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

flashy.controller('flashyCardCtrl', function ($scope, $http, getFileList, $location) {
  
  getFileList.getFileList().then(function(res){
    getFileList.dataObj.fileList = res.data;
  });

  $scope.gData = getFileList.dataObj;

  $scope.goEdit = function(event){
    event.preventDefault();
    $location.path('/edit');
    $scope.$apply();
  };

  $scope.goStudy  = function(event){
    event.preventDefault();
    if ($scope.gData.curStackIndex === null){
      $location.path('/fileList');
    } else {
      $location.path('/study');
    }
    $scope.$apply();
  };

  $scope.goList  = function(event){
    event.preventDefault();
    $location.path('/fileList');
    $scope.$apply();
  };

  $scope.makeNewCard = function(event){
    event.preventDefault();
    getFileList.dataObj.makingNewCard = !getFileList.dataObj.makingNewCard;
    $scope.$apply();
  };

  $scope.name = (new Date()).getTime();

  Mousetrap.bind('command+e', $scope.goEdit);
  Mousetrap.bind('command+s', $scope.goStudy);
  Mousetrap.bind('command+g', $scope.goList);

  $scope.path = $location.path();

});//close controller
