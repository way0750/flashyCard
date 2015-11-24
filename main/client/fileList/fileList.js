var fileList = angular.module('fileList', []);

fileList.controller('fileListCtrl', function ($scope, getFileList, $location, viewsFactory) {
  viewsFactory.resetPSA();
  //shouldn't show that note pad textarea:
  $('.scrachPaper').addClass('noShow');

  $scope.gData = getFileList.dataObj;

  $scope.getFileList = function(){
    getFileList.getFileList().then(function(res){
      $scope.fileList = res.data;
    });
  };

  //every time this view is loaded, file list should be updated as well;
  $scope.getFileList();

  //this function should do two things get file by $http save it in the client.curStack
  //to get file from server, and that is it.
  $scope.getFile = function(){
    //get the file name from the select element
    getFileList.dataObj.curFileName = $scope.fileName;
    //get the file from server
    getFileList.getFile($scope.fileName)
      .then(function(res){
        //once gets the text file from server
        //parse it into stacks and save them in the gData
      $scope.gData.allStacks = getFileList.makeStack(res.data);

      });
  };//close getFile

  $scope.chooseStack = function () {
    var stackIndex = $scope.gData.curStackIndex = $scope.stackName.match(/\d+/)[0]-1;
    var shuffledStack = getFileList.shuffle($scope.gData.allStacks[stackIndex]);
    $scope.gData.shuffledStack = shuffledStack;
    $scope.gData.curCardIndex = -1;
    $location.path( '/study' );
  };
});
