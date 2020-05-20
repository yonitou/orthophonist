$(document).ready(function() {
  var stop =  false;
  var duration = 720;
  var counter = null;
  const audio = new Audio('sound.mp3');

  function formatTime(seconds) {
    var h = Math.floor(seconds / 3600),
        m = Math.floor(seconds / 60) % 60,
        s = seconds % 60;
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    return m + ":" + s;
  };

  function timer() {
      duration--;
      if (duration < 0) return clearInterval(counter);
      $('#timer').html(formatTime(duration));
  }

  function imagePop(exerciseId) {
    let $image = $(`#image${exerciseId}`);
      const positionX = Math.random() * ($('#exercise').outerWidth() - $image.outerWidth());
      const positionY = Math.random() * ($('#exercise').outerHeight() - $image.outerHeight());
      $image.css("top",`${positionY}px`);
      $image.css("left",`${positionX}px`);
      $image.show();
      setTimeout(function () {
        $image.hide();
      }, 700);
  };

  function schedulePop(exerciseId) {
    const delay = 1000 + (Math.random() * 2500);
    setTimeout(function () {
      if (stop === true) {
        stop = false;
        return;
      }
      if (exerciseId === 3) {
        audio.play();
        schedulePop(exerciseId);
      } else {
        schedulePop(exerciseId);
        imagePop(exerciseId);
      }
    }, delay);
  }

  function launchExercise(exerciseId) {

    $('#countdown').show();
    $('h2, .button').hide();
    setTimeout(function () {$('#countdown').text('3')},0);
    setTimeout(function () {$('#countdown').text('2')}, 1000);
    setTimeout(function () {$('#countdown').text('1')}, 2000);
    setTimeout(function () {
      $('#countdown').hide();
      duration = 720;
      $('#timer').text('12:00');
      $('#timer').show();
      counter = setInterval(timer, 1000);
      if (exerciseId === 3) {
        schedulePop(exerciseId);
      } else {
        imagePop(exerciseId);
        schedulePop(exerciseId);
      }
      setTimeout(function() {
        stop = true;
        $('#exercise').hide();
        $('#menu').show();
      }, 20000);
    }, 3000);
  };

  $('#exercise').hide();
  $('.menu-button').on('click', function () {
    $('#menu, h2, img,.button, #timer').hide();
    const exerciseId = this.dataset.id;
    $(`#state${exerciseId}`).show();
    $(`#button${exerciseId}`).show();
    $('#exercise').show();
  });

  $('#button1').on('click', function () {
    launchExercise(1);
  });

  $('#button2').on('click', function () {
    launchExercise(2);
  });

  $('#button3').on('click', function () {
    audio.play();
    launchExercise(3);
  });
});


