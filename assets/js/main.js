document.addEventListener('DOMContentLoaded', function () {
  // DOM Ready, execute code
  checkCookie()
  createBurger()
  handleQueryString()
  secondaryMenu()
  modal()
  imageOutOfP()
})

var imageOutOfP = function(){
  var images = $(".c-blog-article__content img");
  images.unwrap().wrap('<figure/>');

  var li = $(".c-blog-article__content li p");
  li.each(function( index ) {
    this.replaceWith(this.html());
  });

}

var secondaryMenu = function(){
  var featuresButton = document.getElementById('js-featuresButton')
  var navigationBar = document.getElementById('js-fixedNav')
  var featuresNavigationBar = document.getElementById('js-featuresNavigationBar')

  featuresButton.onclick = function (e) {
    e.preventDefault()

    if (window.matchMedia("(min-width: 768px)").matches) {
      if (!navigationBar.classList.contains('is-sticky')) {
        navigationBar.classList.add('is-sticky')
      }
      if (featuresNavigationBar.classList.contains('c-sub-navigation--closed')) {
        featuresNavigationBar.classList.remove('c-sub-navigation--closed')
        featuresNavigationBar.classList.add('c-sub-navigation--open')
      } else {
        featuresNavigationBar.classList.remove('c-sub-navigation--open')
        featuresNavigationBar.classList.add('c-sub-navigation--closed')
      }
      featuresNavigationBar.classList.remove('c-features-navigation--hidden')

      navigationBar.classList.add('is-sticky')
    }

  };
}

var modal = function(){

  var signupButton = $("[data-js=signup-js]");
  var modal = $("[data-js=modal-js]");
  var modalCloseButton = $("[data-js=modal-close-button-js]");
  var submitButton = $("[data-js=submit-js]");

  modalCloseButton.click(function(e){
    e.preventDefault();
    console.log("click");
    modal.removeClass("c-modal-wrapper--open");
    modal.addClass("c-modal-wrapper--closed").delay(200).hide();
  });

  signupButton.click(function(e){
    e.preventDefault();
    modal.show();
    modal.addClass("c-modal-wrapper--open");
    modal.removeClass("c-modal-wrapper--closed");
  });

  submitButton.click(function(e){
    e.preventDefault();

    var email = $("[data-js=email-submit-js]").val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    var form = $("[data-js=modal-form-js]");
    var success = $("[data-js=modal-success-js]");

    var fail = $("[data-js=modal-fail-js]");

    var modalTitle = $("[data-js=modal-title-js]");
    var modalText = $("[data-js=modal-text-js]");

    if(regex.test(email)){
      $.ajax({
        url: "http://core-staging.vidra.io/intercom/contacts",
        async: true,
        crossDomain: true,
        method: "POST",
        data: JSON.stringify({ email: email }),
        headers: {
          "Authorization": "Bearer dG9rOmZhOWEwYzY2XzY2ZWFfNDU0MV84NmM4Xzc0OWQwYTk4YTRiYzoxOjA=",
          "Accept": "application/json",
          "Content-Type": "application/json",
          cacheControl: "no-cache"
        }
      }).done(function(e) {
        fail.hide();
        modalTitle.text(modalTitle.data("message"));
        modalText.text(modalText.data("message"));
        form.hide();
        success.show();
      });
    }else{
      fail.show();
    }

  });
}


// Burger menu
var createBurger = function () {
  var navigation = document.getElementById('js-mobileMenu')
  var burger = document.getElementById('js-mobileMenu__button')
  var featuresNavigationBar = document.getElementById('js-featuresNavigation')
  var closeText = 'CHIUDI'

  if (!navigation || !burger) return

  if (window.location.href.split('/').indexOf('en') >= 0) {
    closeText = 'CLOSE'
  }

  burger.onclick = function (e) {
    e.preventDefault()
    if (navigation.classList.contains('c-mobile-navigation--closed')) {
      navigation.classList.remove('c-mobile-navigation--closed')
      navigation.classList.add('c-mobile-navigation--open')
      featuresNavigationBar.classList.add('c-features-navigation--hidden')
      burger.innerHTML = closeText
    } else {
      navigation.classList.remove('c-mobile-navigation--open')
      navigation.classList.add('c-mobile-navigation--closed')
      featuresNavigationBar.classList.remove('c-features-navigation--hidden')
      burger.innerHTML = 'MENU'
    }
  }
}


// cookie
var checkCookie = function () {
  if (localStorage.getItem('cookie') !== 'viewed') {
    document.getElementById('js-cookie').classList.remove('c-cookie-block--closed')
    navigationBar.classList.add('cookie-on')
  }
}

var cookieCloseBtn = document.getElementById('js-cookie-button')
cookieCloseBtn.onclick = function (e) {
  document.getElementById('js-cookie').classList.add('c-cookie-block--closed')
  navigationBar.classList.remove('cookie-on')
  localStorage.setItem('cookie', 'viewed')
}


var navigationBar = document.getElementById('js-fixedNav')

window.onscroll = function () {
  var scroll = isNaN(window.scrollY) ? document.documentElement.scrollTop : window.scrollY

  if (scroll > 0) {
    if (window.matchMedia("(min-width: 768px)").matches) {
      navigationBar.classList.add('is-sticky')
    }
    document.getElementById('js-cookie').classList.add('c-cookie-block--closed')
    navigationBar.classList.remove('cookie-on')
  } else {
    navigationBar.classList.remove('is-sticky')
  }

  // if (scroll > 310){
  //   if (window.matchMedia("(min-width: 768px)").matches) {
  //     document.getElementById('js-card').classList.add('animate')
  //     document.getElementById('js-profile').classList.add('animate')
  //   }
  // }
}


// handle query string
var handleQueryString = function () {
  var query = window.location.search;

  var links = document.querySelectorAll('a[href="../signup"]');

  [].forEach.call(links, function (link) {
    link.href += query
  })
}
