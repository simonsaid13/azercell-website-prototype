(function () {
  'use strict';

  var heroCta = document.querySelector('[data-transfer-hero-cta]');
  var floatingCta = document.querySelector('[data-transfer-floating-cta]');
  var floatingBar = document.querySelector('.nav-probe__floating-bar--product');
  if (!heroCta || !floatingCta) return;

  function headerHeight() {
    var header = document.querySelector('[data-header]');
    if (!header) return window.innerWidth < 768 ? 64 : 98;
    var utility = header.querySelector('.nav-probe__utility');
    var main = header.querySelector('.nav-probe__main');
    var height = 1;
    if (utility && window.getComputedStyle(utility).display !== 'none') {
      height += utility.getBoundingClientRect().height;
    }
    if (main) height += main.getBoundingClientRect().height;
    return height;
  }

  function setFloatingVisible(visible) {
    floatingCta.hidden = !visible;
    floatingCta.setAttribute('aria-hidden', visible ? 'false' : 'true');
    floatingCta.tabIndex = visible ? 0 : -1;
    if (floatingBar) floatingBar.setAttribute('data-floating-cta-state', visible ? 'visible' : 'hidden');
  }

  var observer = null;

  function update() {
    setFloatingVisible(heroCta.getBoundingClientRect().bottom <= headerHeight());
  }

  function observe() {
    if (!('IntersectionObserver' in window)) return;
    if (observer) observer.disconnect();
    var threshold = headerHeight();
    observer = new IntersectionObserver(function (entries) {
      setFloatingVisible(!entries[0].isIntersecting);
    }, { rootMargin: '-' + threshold + 'px 0px 0px 0px', threshold: 0 });
    observer.observe(heroCta);
  }

  observe();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', function () {
    observe();
    update();
  });
  update();
})();
