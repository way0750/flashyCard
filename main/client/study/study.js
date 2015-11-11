var studyApp = angular.module('study', []);

studyApp.controller('studyCtrl', function ($scope, getFileList, $location) {
  $scope.gData = getFileList.dataObj;

  // if ($scope.gData.curStack){
  //   $scope.stack = $scope.gData.shuffledStack;
  // }

  //click a button then show, click again then next card
  //if state = 0 then you are seeing cards, if 1 then you are seeing answer
  $scope.state = 0;
  //go through each card one by one, they have already been randomized.
  $scope.lastCardIndex = ($scope.gData.shuffledStack || []).length;
  
  $scope.showOneCard = function(){
    if ($location.path() != '/study'){console.log('you are not in /study!!');}
    if ($scope.gData.curCardIndex < $scope.gData.shuffledStack.length-1){
      $scope.gData.curCardIndex++;
    }
    $scope.curCard = $scope.gData.shuffledStack[$scope.gData.curCardIndex];
    
    $scope.state = 0;
    console.log('you should be in /study,' , $location.path(), $scope.gData.curCardIndex, $scope.gData.shuffledStack[$scope.gData.curCardIndex]);
  };

  $scope.showOneCard();

  $scope.restudy = function(){
    $scope.gData.curCardIndex = -1;
  };

  $scope.showAnswer = function(){
    $scope.state = !$scope.state;
  };

  Mousetrap.bind('enter', $scope.showOneCard);
  Mousetrap.bind("command+space", $scope.showAnswer);
  // Mousetrap.bind('command+g', $scope.goList);

});
