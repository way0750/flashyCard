//add this after client.js
flashy.factory('viewsFactory', function(){
  var PSA = {};
  var resetPSA = function () {
    PSA = {};
    $('.announcement').text('');
    $('.announcement').css({'background-color' : 'green'});
  };


  var showPSA = function (message) {
    if (PSA[message]){
      $('.announcement').text('ALREADY '+message);
      $('.announcement').css({'background-color' : 'red'});
      return false;
    } else {
      PSA[message] = true;
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
