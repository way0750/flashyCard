var studyApp = angular.module('study', []);
var ggg = {hey:90};
studyApp.controller('studyCtrl', function ($scope, getFileList, $location) {
  $scope.gData = getFileList.dataObj;
  //click a button then show, click again then next card
  //if state = 0 then you are seeing cards, if 1 then you are seeing answer
  $scope.state = 0;
  //go through each card one by one, they have already been randomized.
  $scope.lastCardIndex = ($scope.gData.shuffledStack || []).length;
  
  $scope.num = 0;
  $scope.showOneCard = function(){
    if ($scope.gData.curCardIndex < $scope.gData.shuffledStack.length-1){
      $scope.gData.curCardIndex++;
    }
    $scope.curCard = $scope.gData.shuffledStack[$scope.gData.curCardIndex];
    
    $scope.state = 0;
  };

  if ($scope.gData.shuffledStack){
    $scope.showOneCard();
  }

  $scope.restudy = function(){
    $scope.gData.curCardIndex = -1;
  };

  $scope.showAnswer = function(){
    $scope.state = !$scope.state;
  };

  $scope.concat = function () {
    $scope.gData.curStack+=($scope.curCard.question + '\n\n' + $scope.curCard.answer+'\n\n\n');
    console.log($scope.gData.curStack);
  };
  

});
