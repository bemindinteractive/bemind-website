$(document).ready(function(){
  consoleText(['superpowers.', 'opportunities.', 'happiness.'], 'superpowers');
  consoleText(['well.', 'with elegance.', 'seriously.', 'with love.'], 'well');
  consoleText(['ventures.', 'craft.', 'creations.'], 'ventures');

  $('#nav-icon4').click(function(){
		$(this).toggleClass('open');

    var menu = $(".c-main-navigation");
    menu.toggleClass('c-main-navigation--open');
	});

  window.sr = ScrollReveal({
    distance: '30px',
    scale: 1,
    duration: 700,
    delay: 200,
    autoWidth: false,
    scale:1,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
  });

  sr.reveal('.t-home-hero__content');
  sr.reveal('.t-home-hero__bg-img');
  sr.reveal('.c-illustrated-description-block');
  sr.reveal('.c-intro-block');
  sr.reveal('.c-carousel-wrapper');
  sr.reveal('.c-page-content__title');
  sr.reveal('.c-page-content__text__item');
  sr.reveal('.c-hero');

  $(".owl-carousel").owlCarousel({
    loop:false,
    dots: false,
    items:3,
    slideBy: 1,
    responsive:{
        0:{
            items:1,
            margin: 40,
            nav: false
        },
        600:{
            items:1,
            margin: 120,
            nav:true
        }
    }
  });

  $(".c-loader").removeClass("c-loader--show");

  $('.link').click(function(e) {
    e.preventDefault();
    newLocation = this.href;
    $(".c-loader").addClass("c-loader--show");
    $(".c-main-navigation").removeClass("c-main-navigation--open");

    window.setTimeout(function() {
      window.location = newLocation;
    }, 800)
  });

});




// function([string1, string2],target id,[color1,color2])
function consoleText(words, id) {

  var visible = true;
  var letterCount = 1;
  var x = 1;
  var waiting = false;

  var target = $('#'+id);
  var underscore = $('#'+id).parent().children('.console-underscore').first();

  window.setInterval(function() {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.html(words[0].substring(0, letterCount));
      window.setTimeout(function() {
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;

        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 3000)
    } else if (waiting === false) {
      target.html(words[0].substring(0, letterCount));
      letterCount += x;
    }
  }, 120)

  window.setInterval(function() {
    if (visible === true) {
      underscore.attr("class","console-underscore hidden");
      visible = false;
    } else {
      underscore.attr("class","console-underscore");
      visible = true;
    }
  }, 400)
}
