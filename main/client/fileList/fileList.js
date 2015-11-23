var fileList = angular.module('fileList', []);

fileList.controller('fileListCtrl', function ($scope, $http, getFileList, $location) {
  $scope.gData = getFileList.dataObj;

  $scope.getFileList = function(){
    getFileList.getFileList().then(function(res){
      $scope.fileList = res.data;
    });
  };

  //every time this view is loaded, file list should be updated as well;
  $scope.getFileList();

  //this function should do two things get file by $http save it in the client.curStack
  //then 
  //to get file from server, and that is it.
  $scope.getFile = function(){
    getFileList.dataObj.curFileName = $scope.fileName;
    getFileList.getFile($scope.fileName)
      .then(function(res){
        //once gets the text file from server
        //parse it into stacks and save them in the gData
        $scope.gData.allStacks = getFileList.parseStacks(res.data);
        //parse each array element into a stackObj;
        $scope.gData.allStacks = $scope.gData.allStacks.map(function (stackStr, stackIndex) {
          //assuming that the title of the stack would be breaking long!, it's a title!
          var stackName = stackStr.match(/.+/)[0];
          var QandA = stackStr.slice(stackName.length);
          QandA = getFileList.makeQandA(QandA);
          QandA.stackName = stackName;
          QandA.stackIndex = stackIndex;
          
          return QandA;
        });
      });
  };//close getFile

  //this should set     
  //curStackIndex : 0,
  //curFileName : null,
  //shuffledStack : null,
  //curCardIndex : -1,

  $scope.chooseStack = function () {
    var stackIndex = $scope.gData.curStackIndex = $scope.stackName.match(/\d+/)[0]-1;
    var shuffledStack = getFileList.shuffle($scope.gData.allStacks[stackIndex]);
    $scope.gData.shuffledStack = shuffledStack;
    $scope.gData.curCardIndex = -1;
    $location.path( '/study' );
  };



});
