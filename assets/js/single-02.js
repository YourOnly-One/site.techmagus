import * as params from '@params';

var enableToc = JSON.parse( params.enableToc );
var toc = JSON.parse( params.toc );
var tocPosition = JSON.parse( params.tocPosition );

var singleMainElem = document.querySelector('.single__main');
var singleSideElem = document.querySelector('.single__side');

enquire.register("screen and (max-width: 769px)", {
  match: function () {
    if ((enableToc || toc) && tocPosition !== "outer") {
      if (singleMainElem && singleSideElem) {
        singleMainElem.classList.remove('main-main');
        singleMainElem.classList.add('main');
        singleSideElem.classList.remove('main-side');
        singleSideElem.classList.add('hide');
      }
    } else if (tocPosition === "outer") {
      if (singleMainElem && !singleMainElem.classList.contains('main-main')) {
        singleMainElem.classList.remove('main-main');
        singleMainElem.classList.add('main');
      }
      if (singleSideElem && !singleSideElem.classList.contains('hide')) {
        singleSideElem.classList.add('hide');
      }
    }
  },
  unmatch: function () {
    if ((enableToc || toc) && tocPosition !== "outer") {
      singleMainElem.classList.remove('main');
      singleMainElem.classList.add('main-main');
      singleSideElem.classList.remove('hide');
      singleSideElem.classList.add('main-side');
    } else if (tocPosition === "outer") {
      if (singleMainElem && !singleMainElem.classList.contains('main-main')) {
        singleMainElem.classList.remove('main-main');
        singleMainElem.classList.add('main');
      }
      if (singleSideElem && !singleSideElem.classList.contains('hide')) {
        singleSideElem.classList.add('hide');
      }
    }

    var navCollapseBtn = document.querySelector('.navbar__burger');
    var navCollapse = document.getElementsByClassName('navbarm__collapse')[0];
    if (navCollapse) {
      navCollapse.setAttribute('data-open', false);
      navCollapse.style.maxHeight = 0;
      navCollapseBtn.classList.remove('is-active');
    }
    document.getElementsByClassName('navbar__menu')[0].classList.remove('is-active');
    document.getElementsByClassName('mobile-search')[0].classList.add('hide');
  },
  setup: function () { },
  deferSetup: true,
  destroy: function () { },
});
