(function () {
  'use strict';

  var heroCta = document.querySelector('[data-transfer-hero-cta]');
  var floatingCta = document.querySelector('[data-transfer-floating-cta]');
  if (!heroCta || !floatingCta) return;

  function setFloatingVisible(visible) {
    floatingCta.hidden = !visible;
    floatingCta.setAttribute('aria-hidden', visible ? 'false' : 'true');
    floatingCta.tabIndex = visible ? 0 : -1;
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      setFloatingVisible(!entries[0].isIntersecting);
    }, { rootMargin: '-98px 0px 0px 0px', threshold: 0 });
    observer.observe(heroCta);
  } else {
    var update = function () {
      setFloatingVisible(heroCta.getBoundingClientRect().bottom <= 98);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();
