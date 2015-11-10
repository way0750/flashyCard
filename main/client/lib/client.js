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
  };//close getStack

  //to make q and a
  var parseFile = function(str){
    var cards = str.split(/\b(?=#)/);
    console.log(cards);
    //seperate each card into an obj with q and a
    cards = cards.map(function(card){
      var question = card.match(/^#.+/gm).join('\n');
      var answer = card.match(/^[^#].+/gm).join('\n');
      return {
        question : question,
        answer : answer
      };
    });
    return cards;
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

  $scope.goEdit = function(event){
    event.preventDefault();
    $location.path('/edit');
    $scope.$apply();
  };

  $scope.goStudy  = function(event){
    event.preventDefault();
    $location.path('/study');
    $scope.$apply();
  };

  $scope.goList  = function(event){
    event.preventDefault();
    $location.path('/fileList');
    $scope.$apply();
  };

  Mousetrap.bind('command+e', $scope.goEdit);
  Mousetrap.bind('command+s', $scope.goStudy);
  Mousetrap.bind('command+g', $scope.goList);
});//close controller

