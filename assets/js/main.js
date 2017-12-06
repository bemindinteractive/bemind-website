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
    origin: 'top',
    distance: '30px',
    scale: 1,
    duration: 700,
    delay: 200,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
  });

  sr.reveal('.t-home-hero__content');
  sr.reveal('.t-home-hero__bg-img');
  sr.reveal('.c-illustrated-description-block');
  sr.reveal('.c-intro-block');
  sr.reveal('.c-carousel-wrapper');
  sr.reveal('.c-page-content__title');
  sr.reveal('.c-page-content--notitle');
  sr.reveal('.c-page-content__text__item');
  sr.reveal('.c-hero');
  sr.reveal('.c-team-item');
  sr.reveal('.t-link');
  sr.reveal('.c-careers__item', { delay: 200}, 200);
  sr.reveal('.c-page-content__image', { delay: 200}, 200);

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
  window.setTimeout(function() {
    $(".c-loader").hide();
  }, 800);

  $('.link').click(function(e) {
    e.preventDefault();
    newLocation = this.href;
    $(".c-loader").show();
    $(".c-loader").addClass("c-loader--show");
    $(".c-main-navigation").removeClass("c-main-navigation--open");

    window.setTimeout(function() {
      window.location = newLocation;
    }, 800);
  });

});




// function([string1, string2],target id,[color1,color2])
// <span class="console-container"><span id="well">well.</span><i class="console-underscore">|</i><span>
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


  		$(function() {

  			$('.c-team-item__position').each( function() {
          var item = $(this);
          var words = item.attr('title') + ';' + item.text();

          var thing = item.empty().attr( 'title','').teletype({
            text: words.split(';'),
            typeDelay: 5,
            backDelay: 10,
            cursor: '▋',
            delay: 1500,
            preserve: false,
            loop: 0,
            callbackNext: function( letter, current, teletype ) {

            }
          });
  			});

  		});
