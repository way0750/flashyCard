//add this after client.js
flashy.factory('viewsFactory', function(){
  var samePSA = {};
  var resetPSA = function () {
    samePSA = {};
    $('.announcement').text('');
    $('.announcement').css({'background-color' : 'green'});
  };


  var showPSA = function (message) {
    if (samePSA[message]){
      $('.announcement').text('ALREADY '+message);
      $('.announcement').css({'background-color' : 'red'});
      return false;
    } else {
      samePSA[message] = true;
      $('.announcement').text(message);
      $('.announcement').css({'background-color' : 'green'});
      return true;
    }
  };

  return{
    resetPSA : resetPSA,
    showPSA : showPSA
  };
});
