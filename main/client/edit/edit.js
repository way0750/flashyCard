var editApp = angular.module('editApp', []);

editApp.controller('editAppCtrl', function ($scope, getFileList, $http) {
  
  $scope.gData = getFileList.dataObj;

  //$scope.gData.allStacks
  // $scope.curStack = $scope.gData.allStacks;
  


  $scope.newCard = function(){
    $scope.classObj = {
      invisible : !$scope.classObj.invisible
    };
    console.log('in edit');
  };

  $scope.globalData = getFileList.dataObj;

  //$scope.sendFile = function(){
  //  console.log('current stack name', $scope.gData.curStackName);
  //  console.log('got this as content:', $scope.curStack);
  //  getFileList.writeFile({
  //    fileName :  $scope.gData.curStackName,
  //    file : $scope.curStack
  //  });
  //};//close sendFile
  

  //keep all stacks in one file in a form of array
  //when editing, should join all back into one file???
  //if yes then need to re-parse the whole file back to allStacks.
  
  // $scope.gData.map(function (stack) {
  //   var stackName = stack.stackName;
  //   stack.map(function (QnAObj) {
  //     return [QnAObj.question, QnAObj.answer].join('');
  //   });
  //   return stackName + '\n';
  // });
  
  


});
