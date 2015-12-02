var editApp = angular.module('editApp', []);

editApp.controller('editAppCtrl', function ($scope, getFileList, $http, viewsFactory) {
  if (!getFileList.dataObj.crossViewMessage){
    viewsFactory.resetPSA();
  }
  //show that textarea:
  $('.scrachPaper').removeClass('noShow');

  $scope.gData = getFileList.dataObj;

  $scope.globalData = getFileList.dataObj;

  $scope.sendFile = function(){
    viewsFactory.resetPSA();
    getFileList.writeFile({
     fileName :  $scope.gData.curFileName,
     file : $('.entireStack').val()
   });
   
    $scope.gData.curStackIndex = null;
    $scope.gData.allStacks = getFileList.makeStack($scope.curStackStringified);
    viewsFactory.resetPSA();
    $scope.gData.crossViewMessage = false;
    viewsFactory.showPSA('saved the world!');
  };//close sendFile
  //keep all stacks in one file in a form of array
  //when editing, should join all back into one file???
  //if yes then need to re-parse the whole file back to allStacks.
  
  $scope.curStackStringified = $scope.gData.allStacks.map(function (stack) {
    var stackName = stack.stackName;
    var stackStringified = stack.map(function (QnAObj) {
      return [QnAObj.question, QnAObj.answer].join('\n\n');
    }).join('\n\n');
    return stackName + '\n\n\n\n' + stackStringified;
  }).join('\n\n\n\n');
});
