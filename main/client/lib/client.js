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


  dataObj = {

    fileList : null,
    curStack : null,
    curStackName : null,
    shuffledStack : null,
    curCardIndex : -1,
    makingNewCard : false,
    scrachPaper : ''

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
    var cards = str.match(/(^#.*[\n\r]*)+(^[^#].*[\n\r]*)+/gm);
    //seperate each card into an obj with q and a
    cards = cards.map(function(card){
      var question = card.match(/^#.+[\n\r]+/gm).join('');
      question = question.match(/^#.+/gm).join('\n');
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
  };

  $scope.name = (new Date()).getTime();

  Mousetrap.bind('command+e', $scope.goEdit);
  // Mousetrap.bind('enter', (function () {
  //     this.goStudy();
  //   }).bind($scope));
  Mousetrap.bind('command+s', $scope.goStudy);
  Mousetrap.bind('command+g', $scope.goList);

});//close controller
