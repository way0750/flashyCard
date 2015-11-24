flashy.factory('getFileList', function($http){
  //global data that shares across the app
  dataObj = {
    allStacks : null,
    fileList : null,
    curStackIndex : null,
    curFileName : null,
    shuffledStack : null,
    curCardIndex : -1,
    makingNewCard : false, // am i even using this at all?
    curStack : null, //this will be gone
    scrachPaper : ''
  };

  //get list of all file name
  var getFileList = function(){
    return $http({
      method: 'GET',
      url: "/listFiles"
    });
  };

  //get file content
  var getFile = function(fileName){
    console.log('geting this stack:', fileName);
    return  $http({
      method: 'POST',
      url: '/readFile',
      data : {fileName : fileName}
    });
  };//close getFile

  var writeFile = function(fileObj){
    return $http({
      method: "POST",
      url : "writeFile",
      data : fileObj
    });
  };

  var parseStacks = function(str) {
    return str.split(/(?=^#{1,2}[^#])/gm);
  };

  //to make q and a
  var makeQandA = function(str){
    var stack = str.match(/(^#.*[\n\r]*)+(^[^#].*[\n\r]*)+/gm);
    //seperate each card into an obj with q and a
    stack = stack.map(function(card, index){
      var question = card.match(/^#.+[\n\r]+/gm).join('');
      question = question.match(/^#.+/gm).join('\n');
      var answer = card.match(/^[^#\n].+/gm).join('\n');
      return {
        question : question,
          answer : answer,
          cardID : index
      };
    });
    return stack;
  };

  var makeStack = function (str) {
    var stacks = parseStacks(str);
    return stacks.map(function (stackStr, stackIndex) {
          //assuming that the title of the stack would be breaking long!, it's a title!
          var stackName = stackStr.match(/.+/)[0];
          var QandA = stackStr.slice(stackName.length);
          QandA = makeQandA(QandA);
          QandA.stackName = stackName;
          QandA.stackIndex = stackIndex;
          return QandA;
        });
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
    makeStack : makeStack,
    parseStacks : parseStacks,
    getFileList : getFileList,
    getFile : getFile,
    dataObj : dataObj,
    makeQandA : makeQandA,
    shuffle : shuffle,
    writeFile : writeFile
  };

});
