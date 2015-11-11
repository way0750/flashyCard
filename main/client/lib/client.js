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
    curStackName : null,
    shuffledStack : null,
    curCardIndex : -1,
    makingNewCard : false


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

  var writeFile = function(fileObj){
    return $http({
      method: "POST",
      url : "writeFile",
      data : fileObj
    });
  };

  //to make q and a
  var makeQandA = function(str){
    // var cards = str.split(/\n/);
    // var cards = str.match(/(^#.*\n)+(^[^#].*\n)+/gm);
    var cards = str.match(/(^#.*\n*)+(^[^#].*\n*)+/gm);
    //seperate each card into an obj with q and a
    cards = cards.map(function(card){
      var question = card.match(/^#.+\n+/gm).join('\n');
      var answer = card.match(/^[^#\n].+/gm).join('\n');
      return {
        question : question,
        answer : answer
      };
    });
    return cards;
  };

  var shuffle = function(arr){
    var copyArr = arr.slice();

    var shuffleArr = [];
    while(copyArr.length){
      var i = Math.floor( Math.random() * copyArr.length );
      shuffleArr = shuffleArr.concat(copyArr.splice(i, 1));
    }
    return shuffleArr;
  };

  return {
    getFiles : getFiles,
    getStack : getStack,
    dataObj : dataObj,
    makeQandA : makeQandA,
    shuffle : shuffle,
    writeFile : writeFile
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

  $scope.makeNewCard = function(event){
    event.preventDefault();
    getFileList.dataObj.makingNewCard = !getFileList.dataObj.makingNewCard;
    $scope.$apply();
    console.log('makeNewCard????', getFileList.dataObj.makingNewCard);
  };


  Mousetrap.bind('command+e', $scope.goEdit);
  Mousetrap.bind('command+s', $scope.goStudy);
  Mousetrap.bind('command+g', $scope.goList);
  Mousetrap.bind('command+j', $scope.makeNewCard);
  // Mousetrap.bind('enter', function(){
  //   if ($location.path()!='/study'){console.log('not in /study!!!');} else {
  //   console.log('show new question');}
  //   getFileList.globalData.curCardIndex
  // });
});//close controller

