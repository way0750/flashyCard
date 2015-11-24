var studyApp = angular.module('study', []);
var ggg = {hey:90};
studyApp.controller('studyCtrl', function ($scope, getFileList, $location, viewsFactory) {

  //show that textarea:
  $('.scrachPaper').removeClass('noShow');

  $scope.gData = getFileList.dataObj;
  //click a button then show, click again then next card
  //if state = 0 then you are seeing cards, if 1 then you are seeing answer
  $scope.state = 0;

  //go through each card one by one, they have already been randomized.
  $scope.lastCardIndex = ($scope.gData.shuffledStack || []).length;
  
  $scope.showOneCard = function(){
    var stack = $scope.gData.shuffledStack;
    if (stack.length === 0){
      $scope.progress--;
      $scope.curCard = {
        question : 'You Are Done! This Is The End (╯°□°）╯︵ ┻━┻) ',
        answer : 'You Are Done! This Is The End (╯°□°）╯︵ ┻━┻) '
      };
    } else {
      $scope.curCard = stack.pop();
      $scope.state = 0;
      $scope.progress = stack.length;
    }
    viewsFactory.resetPSA(); 
  };

  //immediately show one card when this view is rendered
  if ($scope.gData.shuffledStack){
    $scope.showOneCard();
  }

  $scope.restudy = function(){
    var curStackIndex = $scope.gData.curStackIndex;
    $scope.gData.shuffledStack = getFileList.shuffle($scope.gData.allStacks[curStackIndex]);
    
  };

  $scope.showAnswer = function(){
    $scope.state = !$scope.state;
  };

  $scope.forgotCard = function () {
    if (!$scope.gData.shuffledStack || $scope.gData.shuffledStack.length===0){return;}
    var lastStackIndex = $scope.gData.allStacks.length-1;
    var lastStack = $scope.gData.allStacks[lastStackIndex];
    if (/update/.test(lastStack.stackName)){
      lastStack.push($scope.curCard);
    } else {
      var newStack = [];
      newStack.push($scope.curCard);
      newStack.stackName = '#update';
      $scope.gData.allStacks.push(newStack);
    }
    viewsFactory.showPSA('added card');
  };

  $scope.deleteCard = function () {
    //splice current card by index from the allStack
    if (!$scope.gData.shuffledStack || $scope.gData.shuffledStack.length===0){return;}
    var canPerform = viewsFactory.showPSA('deleted card');
    
    var targetIndex = $scope.curCard.cardID;
    var stackIndex = $scope.gData.curStackIndex;
    var curStack = $scope.gData.allStacks[stackIndex];

    curStack.forEach(function(QandAObj, QnAIndex) {
      if (QandAObj.cardID === targetIndex){
        curStack.splice(QnAIndex, 1);
      }
    });

    if (curStack.length === 0 ){
      $scope.gData.allStacks.forEach(function (stack, index) {
        if (stack.stackName === curStack.stackName){
          $scope.gData.allStacks.splice(index, 1);
        }
      });
    }
  };

});
