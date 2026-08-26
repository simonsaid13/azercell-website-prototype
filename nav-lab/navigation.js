(function () {
  'use strict';

  var C = window.Components;
  var mount = document.getElementById('navigation-probe');
  var footerMount = document.getElementById('footer-probe');
  var floatingBar = document.querySelector('.nav-probe__floating-bar');
  var floatingPopover = document.querySelector('[data-floating-popover]');
  var floatingDockRaf = 0;
  if (!C || !mount || !footerMount) return;

  var FLOATING_POPOVERS = {
    Internet: ['High volume', 'Weekly', 'Daily', 'Unlimited'],
    Tariffs: ['Prepaid', 'Postpaid', 'Compare tariffs', 'Tariffs archive'],
    Roaming: ['Roaming internet packs', 'Countries & prices', 'Travel packs']
  };

  var NAVIGATION = [
    {
      label: 'Company',
      mode: 'list',
      items: [
        'About us',
        'Media & press',
        'Corporate Social Responsibility',
        'Sustainability',
        'Careers',
        'Azercell Academy',
        'Azercell Life',
        'Contact us',
        'Awards'
      ]
    },
    {
      label: 'Mobile',
      mode: 'detail-links',
      items: [
        { label: 'Tariffs', detail: ['Prepaid', 'Postpaid', 'Compare tariffs', 'Tariffs archive'] },
        { label: 'Internet', detail: ['High volume', 'Weekly', 'Daily', 'Unlimited'] },
        { label: 'Roaming', detail: ['Roaming internet packs', 'Countries & prices', 'Travel packs'] },
        { label: 'Services', detail: ['Payment and balance', 'Call management', '0 balance options', 'Aicell'] },
        { label: 'e-Sim', detail: ['About e-Sim', 'Buy e-Sim', 'Move number to e-SIM'] },
        { label: 'Network', detail: ['5G', 'VoLTE', 'Network support'] }
      ]
    },
    {
      label: 'TV',
      mode: 'detail-card',
      items: [{ label: 'Kinon' }]
    },
    {
      label: 'Apps',
      mode: 'detail-card',
      items: [
        { label: 'Azercell App' },
        { label: 'Kinon' },
        { label: 'aKart' },
        { label: 'Yandex Plus' },
        { label: 'Busuu' },
        { label: 'Litres' },
        { label: 'Azercell Kids' },
        { label: 'Wingz' },
        { label: 'AzParking' },
        { label: 'NaviMax' },
        { label: 'SMSRadar' },
        { label: 'All apps' }
      ]
    },
    {
      label: 'Devices',
      mode: 'list',
      items: ['Catalog', 'Link to the shop', 'Other informational links']
    },
    {
      label: 'Campaigns',
      mode: 'list',
      items: ['All campaigns', 'Special offers', 'Voice', 'Internet', 'Bonus programs', 'Contests', 'Devices']
    },
    {
      label: 'Support',
      mode: 'list',
      items: ['Help', 'Talk to Support', 'Browse all FAQs', 'Locations']
    }
  ];

  var queryParams = new URLSearchParams(window.location.search);
  var variantParam = queryParams.get('variant');
  var languageParam = (queryParams.get('lang') || '').toLowerCase();
  var explicitLanguage = ['az', 'en', 'ru'].indexOf(languageParam) !== -1;
  var selectedLanguage = explicitLanguage
    ? languageParam.toUpperCase()
    : (variantParam === 'v2' ? 'AZ' : 'EN');
  var headerVariant = variantParam === 'v2' ? 'v2' : 'v1';
  if (!variantParam && selectedLanguage === 'AZ') headerVariant = 'v2';
  var APP_CATEGORIES = [
    'Self-service',
    'Yandex Plus',
    'aKart',
    'Self-development',
    'Online cinema & TV',
    'Micromobility',
    'Other',
    'All apps'
  ];
  var APP_CATEGORY_ITEMS = {
    'All apps': [
      'Azercell App',
      'Kinon',
      'aKart',
      'Yandex Plus',
      'Busuu',
      'Litres',
      'Azercell Kids',
      'Wingz',
      'AzParking',
      'NaviMax',
      'SMSRadar'
    ],
    'Self-service': ['Azercell App'],
    'Yandex Plus': ['Yandex Plus'],
    'aKart': ['aKart'],
    'Self-development': ['Busuu', 'Litres', 'Azercell Kids'],
    'Online cinema & TV': ['Kinon'],
    'Micromobility': ['Wingz'],
    'Other': ['AzParking', 'NaviMax', 'SMSRadar']
  };

  /* Only destinations already present in the prototype registry are linked. */
  var APP_DESTINATIONS = {
    'Azercell App': '/apps/',
    'Kinon': '/apps/cinema-and-tv/kinon/',
    'aKart': 'https://akart.az',
    'Yandex Plus': '/apps/yandex-plus/',
    'Busuu': '/apps/self-development/busuu/',
    'Litres': '/apps/self-development/litres/',
    'Azercell Kids': '/apps/self-development/kids/',
    'Wingz': '/apps/micromobility/',
    'AzParking': '/apps/other/azparking/',
    'NaviMax': '/apps/other/navimax/',
    'SMSRadar': '/apps/other/smsradar/',
    'All apps': '/apps/'
  };

  var FOOTER = {
    about: ['About us', 'Media & press', 'Corporate Social Responsibility', 'Sustainability', 'Careers', 'Azercell Academy', 'Azercell Life', 'Awards'],
    mobile: ['Tariffs', 'Internet', 'Roaming', 'Services', 'e-Sim', 'Network'],
    devices: ['Catalog', 'Link to the shop', 'Other informational links'],
    campaigns: ['All campaigns', 'Special offers', 'Voice', 'Internet', 'Bonus programs', 'Contests', 'Devices'],
    support: ['Help', 'Browse all FAQs', 'Contact us', 'Talk to Support', 'Locations', 'Call center *1111'],
    legal: ['Privacy Policy', 'Cookie Policy', 'Terms and Conditions', 'Accessibility', 'Sitemap'],
    social: ['Facebook', 'X', 'YouTube', 'Instagram'],
    v1Apps: ['Kinon', 'aKart', 'All apps'],
    v2Apps: ['Yandex Plus', 'aKart', 'Self-development', 'Online cinema & TV', 'Micromobility', 'Other', 'All apps']
  };

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function simpleButton(label, className) {
    return '<button type="button" class="' + className + '">' + esc(label) + '</button>';
  }

  function tariffComparisonHref() {
    return '/tariff-compare-lab/?billing=prepaid&lang=' + selectedLanguage.toLowerCase() + '&variant=' + headerVariant;
  }

  function navigationDetailItem(label, className) {
    if (label !== 'Compare tariffs') return simpleButton(label, className);
    return '<a class="' + className + '" data-tariff-compare-link href="' + esc(tariffComparisonHref()) + '">' + esc(label) + '</a>';
  }

  function updateTariffCompareLinks() {
    mount.querySelectorAll('[data-tariff-compare-link]').forEach(function (link) {
      link.setAttribute('href', tariffComparisonHref());
    });
  }

  function renderLanguageMenu(scope, id, triggerId) {
    return '<div class="nav-probe__language-menu" id="' + id + '" data-language-menu data-language-scope="' + scope + '" role="menu" aria-labelledby="' + triggerId + '" hidden>' +
      ['AZ', 'EN', 'RU'].map(function (language) {
        return '<button type="button" class="t-small nav-probe__language-option" data-language-option="' + language + '" role="menuitemradio" aria-checked="' + (selectedLanguage === language ? 'true' : 'false') + '">' + language + '</button>';
      }).join('') +
      '</div>';
  }

  function resolveAppDestination(label) {
    var path = APP_DESTINATIONS[label];
    if (!path) return null;
    if (/^https?:\/\//.test(path)) return path;
    if (!window.SiteRegistry || typeof window.SiteRegistry.href !== 'function') return null;
    return window.SiteRegistry.href(path);
  }

  function mobileAppItem(label) {
    var destination = resolveAppDestination(label);
    var external = destination && /^https?:\/\//.test(destination);
    var tag = destination ? 'a' : 'button';
    var attrs = destination
      ? ' href="' + esc(destination) + '"' + (external ? ' target="_blank" rel="noopener"' : '')
      : ' type="button"';
    return '<' + tag + ' class="nav-probe__mobile-app-item"' + attrs + '>' +
      '<span class="ph ph--square nav-probe__mobile-app-icon" aria-hidden="true"></span>' +
      '<span class="t-body">' + esc(label) + '</span>' +
      '</' + tag + '>';
  }

  function renderMobileApps() {
    if (headerVariant === 'v1') {
      return '<div class="nav-probe__mobile-apps" data-mobile-apps="v1" aria-label="Apps">' +
        NAVIGATION[3].items.map(function (entry) { return mobileAppItem(entry.label); }).join('') +
        '</div>';
    }
    return '<div class="nav-probe__mobile-apps" data-mobile-apps="v2" aria-label="Apps">' +
      APP_CATEGORIES.map(function (category, categoryIndex) {
        return '<section class="nav-probe__mobile-app-category">' +
          '<button type="button" class="t-h4 nav-probe__mobile-app-category-toggle" data-mobile-app-category-toggle="' + categoryIndex + '"' +
            ' aria-expanded="false" aria-controls="nav-probe-mobile-app-category-' + categoryIndex + '">' +
            '<span>' + esc(category) + '</span><span aria-hidden="true">+</span>' +
          '</button>' +
          '<div class="nav-probe__mobile-app-category-items" id="nav-probe-mobile-app-category-' + categoryIndex + '"' +
            ' data-mobile-app-category-body="' + categoryIndex + '" data-open="false">' +
            APP_CATEGORY_ITEMS[category].map(mobileAppItem).join('') +
          '</div>' +
        '</section>';
      }).join('') +
      '</div>';
  }

  function renderMobilePanel(item, index) {
    if (item.label === 'Mobile') {
      return '<div class="nav-probe__mobile-panel-body nav-probe__mobile-inner-groups">' +
        item.items.map(function (entry, entryIndex) {
          return '<section class="nav-probe__mobile-inner-group">' +
            '<button type="button" class="t-h4 nav-probe__mobile-inner-toggle" data-mobile-inner-toggle="' + index + '-' + entryIndex + '" aria-expanded="false">' +
              '<span>' + esc(entry.label) + '</span><span aria-hidden="true">+</span>' +
            '</button>' +
            '<div class="nav-probe__mobile-inner-body" data-mobile-inner-body="' + index + '-' + entryIndex + '" data-open="false">' +
              (entry.detail || []).map(function (label) { return navigationDetailItem(label, 't-body nav-probe__mobile-link'); }).join('') +
            '</div>' +
          '</section>';
        }).join('') +
      '</div>';
    }
    if (item.label === 'TV') {
      return '<div class="nav-probe__mobile-tv">' +
        '<div class="nav-probe__mobile-tv-copy"><p class="t-label">TV</p><h3 class="t-h3">Kinon</h3></div>' +
        '<div class="ph ph--wide" aria-hidden="true"></div>' +
      '</div>';
    }
    if (item.label === 'Apps') return renderMobileApps();
    return '<div class="nav-probe__mobile-simple-list">' +
      item.items.map(function (label) { return simpleButton(label, 't-body nav-probe__mobile-link'); }).join('') +
      '</div>';
  }

  function renderMobileDrawer() {
    return '<div class="nav-probe__mobile-drawer" id="nav-probe-mobile-drawer" data-mobile-drawer hidden aria-hidden="true">' +
      '<div class="wrap">' +
        '<div class="nav-probe__mobile-utility-row">' +
          '<div class="nav-probe__mobile-audience" aria-label="Audience">' +
            '<div class="nav-probe__mobile-audience-segment">' +
              '<button type="button" class="t-small nav-probe__mobile-audience-tab" aria-pressed="true" aria-current="page">Personal</button>' +
              '<button type="button" class="t-small nav-probe__mobile-audience-tab" aria-pressed="false" aria-disabled="true" disabled>Business</button>' +
            '</div>' +
          '</div>' +
          '<div class="nav-probe__mobile-language-control" data-language-control>' +
            '<button type="button" class="t-small nav-probe__mobile-variant-toggle" id="nav-probe-language-trigger-mobile" data-mobile-variant-toggle data-language-trigger data-variant="v1" aria-haspopup="menu" aria-expanded="false" aria-controls="nav-probe-language-menu-mobile" aria-label="Open language menu">EN</button>' +
            renderLanguageMenu('mobile', 'nav-probe-language-menu-mobile', 'nav-probe-language-trigger-mobile') +
          '</div>' +
        '</div>' +
        '<div class="nav-probe__mobile-groups">' +
          NAVIGATION.map(function (item, index) {
            return '<section class="nav-probe__mobile-group">' +
              '<button type="button" class="t-h4 nav-probe__mobile-group-toggle" data-mobile-group-toggle="' + index + '" aria-expanded="false" aria-controls="nav-probe-mobile-panel-' + index + '">' +
                '<span>' + esc(item.label) + '</span><span aria-hidden="true">+</span>' +
              '</button>' +
              '<div class="nav-probe__mobile-group-body" id="nav-probe-mobile-panel-' + index + '" data-mobile-group-body="' + index + '" data-open="false">' +
                renderMobilePanel(item, index) +
              '</div>' +
            '</section>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function renderFloatingPopover(label) {
    if (label === 'Kinon') {
      return '<div class="nav-probe__floating-kinon">' +
        '<div class="nav-probe__floating-copy"><p class="t-label">Kinon</p><h2 class="t-h3">Kinon</h2></div>' +
        '<div class="nav-probe__floating-media"><div class="ph ph--wide" aria-hidden="true"></div><button type="button" class="btn btn--small btn--primary nav-probe__floating-cta">Try it</button></div>' +
      '</div>';
    }
    return '<div class="nav-probe__floating-detail">' +
      '<div class="nav-probe__floating-copy"><p class="t-label">' + esc(label) + '</p>' +
        '<div class="nav-probe__floating-links" role="list">' +
          FLOATING_POPOVERS[label].map(function (item) {
            return '<div role="listitem">' + navigationDetailItem(item, 't-body nav-probe__text-link') + '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="nav-probe__floating-media"><div class="ph ph--wide" aria-hidden="true"></div><button type="button" class="btn btn--small btn--primary nav-probe__floating-cta">Try it</button></div>' +
    '</div>';
  }

  function closeFloatingPopover() {
    if (!floatingBar || !floatingPopover) return;
    floatingPopover.hidden = true;
    floatingBar.querySelectorAll('[data-floating-trigger]').forEach(function (button) {
      button.setAttribute('aria-expanded', 'false');
      button.removeAttribute('data-floating-active');
    });
  }

  function openFloatingPopover(trigger) {
    if (!floatingBar || !floatingPopover) return;
    var label = trigger.getAttribute('data-floating-trigger');
    var isOpen = !floatingPopover.hidden && trigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeFloatingPopover();
      return;
    }
    floatingPopover.querySelector('[data-floating-popover-content]').innerHTML = renderFloatingPopover(label);
    floatingPopover.hidden = false;
    floatingBar.querySelectorAll('[data-floating-trigger]').forEach(function (button) {
      var active = button === trigger;
      button.setAttribute('aria-expanded', active ? 'true' : 'false');
      if (active) button.setAttribute('data-floating-active', 'true');
      else button.removeAttribute('data-floating-active');
    });
  }

  function syncFloatingDocking() {
    if (!floatingBar) return;
    var footer = footerMount.querySelector('.nav-probe__footer');
    if (!footer) return;
    var footerRect = footer.getBoundingClientRect();
    var bottomGap = 16;
    if (footerRect.top <= window.innerHeight - bottomGap) {
      var dockTop = footerRect.top + window.scrollY - floatingBar.offsetHeight - bottomGap;
      floatingBar.setAttribute('data-floating-docked', 'true');
      floatingBar.style.setProperty('--floating-dock-top', dockTop + 'px');
    } else {
      floatingBar.removeAttribute('data-floating-docked');
      floatingBar.style.removeProperty('--floating-dock-top');
    }
  }

  function scheduleFloatingDocking() {
    if (floatingDockRaf) return;
    floatingDockRaf = window.requestAnimationFrame(function () {
      floatingDockRaf = 0;
      syncFloatingDocking();
    });
  }

  function renderListPanel(item, index) {
    return (
      '<div class="cmp-header__panel" data-menu-panel="' + index + '" id="nav-panel-' + index + '">' +
        '<div class="wrap">' +
          '<div class="nav-probe__panel-list">' +
            item.items.map(function (label) {
              return simpleButton(label, 't-body nav-probe__text-link');
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderDetailContent(item, activeIndex) {
    var active = item.items[activeIndex] || item.items[0];
    if (item.mode === 'detail-links') {
      return (
        '<div>' +
          '<p class="t-label">' + esc(active.label) + '</p>' +
          '<div class="nav-probe__detail-links">' +
            (active.detail || []).map(function (label) {
              return navigationDetailItem(label, 't-body nav-probe__text-link');
            }).join('') +
          '</div>' +
        '</div>'
      );
    }

    return (
      '<div class="nav-probe__detail-card">' +
        C.promoCard({
          title: active.label,
          media: active.label
        }) +
      '</div>'
    );
  }

  function renderDetailPanel(item, index) {
    return (
      '<div class="cmp-header__panel" data-menu-panel="' + index + '" id="nav-panel-' + index + '">' +
        '<div class="wrap">' +
          '<div class="nav-probe__detail" data-detail-menu="' + index + '" data-active-index="0">' +
            '<div class="nav-probe__rail" role="listbox" aria-label="' + esc(item.label) + '">' +
              item.items.map(function (entry, itemIndex) {
                return (
                  '<button type="button" class="nav-probe__rail-button"' +
                    ' data-detail-trigger="' + itemIndex + '"' +
                    ' aria-selected="' + (itemIndex === 0 ? 'true' : 'false') + '">' +
                    esc(entry.label) +
                  '</button>'
                );
              }).join('') +
            '</div>' +
            '<div class="nav-probe__detail-content" data-detail-content aria-live="polite">' +
              renderDetailContent(item, 0) +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderWidePromoPanel(item, index) {
    return (
      '<div class="cmp-header__panel" data-menu-panel="' + index + '" id="nav-panel-' + index + '">' +
        '<div class="wrap">' +
          '<div class="nav-probe__wide-promo">' +
            C.promoCard({
              title: 'Kinon',
              media: 'Kinon'
            }) +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderAppsPromo(label) {
    var isAllApps = label === 'All apps';
    if (isAllApps) return '<div class="nav-probe__apps-promo" data-app-promo aria-hidden="true"><div class="ph ph--wide" aria-hidden="true"></div></div>';
    return '<div class="nav-probe__apps-promo" data-app-promo>' +
      C.promoCard({
        title: label,
        media: label
      }) +
      '</div>';
  }

  function renderAppsV1Panel(item, index) {
    return (
      '<div class="cmp-header__panel" data-menu-panel="' + index + '" id="nav-panel-' + index + '">' +
        '<div class="wrap">' +
          '<div class="nav-probe__apps-variant nav-probe__apps-v1" data-apps-variant="v1">' +
            '<div class="nav-probe__apps-list" role="list" aria-label="Apps">' +
              item.items.map(function (entry) {
                return '<button type="button" class="t-body nav-probe__text-link" data-app-trigger="' + esc(entry.label) + '">' + esc(entry.label) + '</button>';
              }).join('') +
            '</div>' +
            renderAppsPromo('All apps') +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderAppsVariantPanel(item, index) {
    return (
      '<div class="cmp-header__panel" data-menu-panel="' + index + '" id="nav-panel-' + index + '">' +
        '<div class="wrap">' +
          '<div class="nav-probe__apps-variant nav-probe__apps-v2" data-apps-variant="v2">' +
            '<div class="nav-probe__rail nav-probe__apps-categories" role="tablist" aria-label="App categories">' +
              APP_CATEGORIES.map(function (category, categoryIndex) {
                return (
                  '<button type="button" class="nav-probe__rail-button" role="tab"' +
                    ' data-app-category-trigger="' + categoryIndex + '"' +
                    ' aria-selected="' + (categoryIndex === APP_CATEGORIES.length - 1 ? 'true' : 'false') + '">' +
                    esc(category) +
                  '</button>'
                );
              }).join('') +
            '</div>' +
            '<div class="nav-probe__apps-grid" role="tabpanel" data-app-category-content aria-live="polite">' +
              renderAppTiles(APP_CATEGORY_ITEMS['All apps']) +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderAppTiles(labels) {
    return labels.map(function (label) {
      return (
        '<button type="button" class="nav-probe__app-tile" data-app-label="' + esc(label) + '"' +
          ' aria-label="Open ' + esc(label) + '">' +
          '<span class="ph ph--square nav-probe__app-icon" aria-hidden="true"></span>' +
          '<span class="nav-probe__app-label">' + esc(label) + '</span>' +
        '</button>'
      );
    }).join('');
  }

  function renderFooterGroup(title, labels, modifier) {
    var key = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return '<section class="nav-probe__footer-group' + (modifier ? ' ' + modifier : '') + '">' +
      '<h3 class="t-h4 nav-probe__footer-group-heading">' + esc(title) + '</h3>' +
      '<button type="button" class="t-h4 nav-probe__footer-group-toggle" data-footer-group-toggle="' + key + '" aria-expanded="false">' +
        '<span>' + esc(title) + '</span><span aria-hidden="true">+</span>' +
      '</button>' +
      '<div class="nav-probe__footer-links nav-probe__footer-group-body" data-footer-group-body="' + key + '" data-open="false" role="list">' +
        labels.map(function (label) {
          return '<button type="button" class="nav-probe__footer-link t-body" role="listitem">' + esc(label) + '</button>';
        }).join('') +
      '</div>' +
    '</section>';
  }

  function renderFooter() {
    var apps = headerVariant === 'v2' ? FOOTER.v2Apps : FOOTER.v1Apps;
    return (
      '<footer class="nav-probe__footer" aria-label="Footer preview">' +
        '<div class="wrap">' +
          '<div class="nav-probe__footer-top">' +
            '<div class="nav-probe__footer-brand">' +
              '<p class="t-h2">Azercell</p>' +
              '<p class="t-body t-muted">Every connection opens a possibility</p>' +
            '</div>' +
            '<form class="nav-probe__footer-subscribe" data-footer-subscribe>' +
              '<label class="t-label" for="footer-email">Subscribe for updates</label>' +
              '<div class="nav-probe__footer-subscribe-row">' +
                '<input class="input" id="footer-email" type="email" placeholder="Your email" aria-label="Your email">' +
                '<button type="submit" class="btn btn--small btn--quiet" aria-label="Subscribe">→</button>' +
              '</div>' +
            '</form>' +
          '</div>' +
          '<div class="nav-probe__footer-main">' +
            '<div class="nav-probe__footer-groups">' +
              renderFooterGroup('ABOUT AZERCELL', FOOTER.about) +
              renderFooterGroup('MOBILE', FOOTER.mobile) +
              renderFooterGroup('APPS', apps) +
              renderFooterGroup('DEVICES', FOOTER.devices) +
              renderFooterGroup('CAMPAIGNS', FOOTER.campaigns) +
              renderFooterGroup('SUPPORT', FOOTER.support) +
            '</div>' +
            '<article class="cmp-card nav-probe__footer-app-card">' +
              '<div class="ph ph--wide" aria-hidden="true"></div>' +
              '<div class="cmp-card__body">' +
                '<h3 class="t-h3">Download Azercell App</h3>' +
                '<div class="nav-probe__footer-app-actions">' +
                  simpleButton('App Store', 'btn btn--small btn--quiet') +
                  simpleButton('Google Play', 'btn btn--small btn--quiet') +
                '</div>' +
              '</div>' +
            '</article>' +
          '</div>' +
          '<div class="nav-probe__footer-bottom">' +
            '<div class="nav-probe__footer-legal">' +
              FOOTER.legal.map(function (label) { return simpleButton(label, 't-small nav-probe__footer-link'); }).join('') +
            '</div>' +
            '<div class="nav-probe__footer-social">' +
              FOOTER.social.map(function (label) { return simpleButton(label, 'btn btn--small btn--quiet'); }).join('') +
            '</div>' +
            '<div class="nav-probe__footer-meta">' +
              '<button type="button" class="t-small nav-probe__footer-language">English</button>' +
              '<p class="t-small t-muted nav-probe__footer-copyright">© 2026 Azercell Telecom LLC</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  function renderPanel(item, index) {
    if (item.label === 'TV') return renderWidePromoPanel(item, index);
    if (item.label === 'Apps') {
      return headerVariant === 'v2'
        ? renderAppsVariantPanel(item, index)
        : renderAppsV1Panel(item, index);
    }
    return item.mode === 'list'
      ? renderListPanel(item, index)
      : renderDetailPanel(item, index);
  }

  function updateVariantControl() {
    var header = mount.querySelector('[data-header]');
    var button = mount.querySelector('[data-header-variant-toggle]');
    if (!header || !button) return;

    var languageLabel = selectedLanguage;
    header.setAttribute('data-header-variant', headerVariant);
    button.setAttribute('data-variant', headerVariant);
    button.setAttribute('aria-label', 'Selected language ' + languageLabel + '. Open language menu');
    button.textContent = languageLabel;

    var mobileButton = mount.querySelector('[data-mobile-variant-toggle]');
    if (mobileButton) {
      mobileButton.setAttribute('data-variant', headerVariant);
      mobileButton.setAttribute('aria-label', 'Selected language ' + languageLabel + '. Open language menu');
      mobileButton.textContent = languageLabel;
    }

    mount.querySelectorAll('[data-language-option]').forEach(function (option) {
      option.setAttribute('aria-checked', option.getAttribute('data-language-option') === selectedLanguage ? 'true' : 'false');
    });

    var mobileApps = mount.querySelector('[data-mobile-apps]');
    if (mobileApps) mobileApps.outerHTML = renderMobileApps();
  }

  function refreshVariantDependentUI() {
    var appsPanel = mount.querySelector('[data-menu-panel="3"]');
    var wasOpen = appsPanel && appsPanel.getAttribute('data-open') === 'true';
    updateVariantControl();
    updateTransferLink();
    updateTariffCompareLinks();

    if (appsPanel) {
      var replacement = document.createElement('div');
      replacement.innerHTML = renderPanel(NAVIGATION[3], 3);
      var nextPanel = replacement.firstElementChild;
      nextPanel.setAttribute('data-open', wasOpen ? 'true' : 'false');
      appsPanel.replaceWith(nextPanel);
    }
    footerMount.innerHTML = renderFooter();
    scheduleFloatingDocking();
  }

  function selectLanguage(language) {
    if (['AZ', 'EN', 'RU'].indexOf(language) === -1) return;
    selectedLanguage = language;
    if (language === 'AZ') headerVariant = 'v2';
    if (language === 'EN') headerVariant = 'v1';
    var languageUrl = new URL(window.location.href);
    languageUrl.searchParams.set('lang', language.toLowerCase());
    languageUrl.searchParams.set('variant', headerVariant);
    window.history.replaceState({}, '', languageUrl.href);
    refreshVariantDependentUI();
    closeLanguageMenus();
  }

  function updateTransferLink() {
    var link = document.querySelector('[data-transfer-link]');
    if (!link) return;
    link.setAttribute('href', 'transfer-number/?variant=' + headerVariant + '&lang=' + selectedLanguage.toLowerCase());
  }

  function closeLanguageMenus() {
    mount.querySelectorAll('[data-language-menu]').forEach(function (menu) {
      menu.hidden = true;
    });
    mount.querySelectorAll('[data-language-trigger]').forEach(function (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    });
  }

  function toggleLanguageMenu(trigger) {
    var menu = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!menu) return;
    var open = !menu.hidden;
    closeLanguageMenus();
    if (!open) {
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    }
  }

  function activateAppCategory(trigger) {
    var variant = trigger.closest('[data-apps-variant]');
    if (!variant) return;
    var categoryIndex = Number(trigger.getAttribute('data-app-category-trigger'));
    var category = APP_CATEGORIES[categoryIndex];
    var content = variant.querySelector('[data-app-category-content]');
    if (!category || !content) return;

    variant.querySelectorAll('[data-app-category-trigger]').forEach(function (button) {
      button.setAttribute(
        'aria-selected',
        button.getAttribute('data-app-category-trigger') === String(categoryIndex) ? 'true' : 'false'
      );
    });
    content.innerHTML = renderAppTiles(APP_CATEGORY_ITEMS[category]);
  }

  function activateAppPromo(trigger) {
    var panel = trigger.closest('[data-apps-variant]');
    var promo = panel && panel.querySelector('[data-app-promo]');
    if (!promo) return;
    var label = trigger.getAttribute('data-app-trigger');
    if (!label) return;
    promo.removeAttribute('aria-hidden');
    promo.innerHTML = label === 'All apps'
      ? '<div class="ph ph--wide" aria-hidden="true"></div>'
      : C.promoCard({ title: label, media: label });
  }

  function renderHeader() {
    return (
      '<div class="nav-probe__desktop-note">' +
        '<div class="wrap"><p class="t-body">Desktop navigation probe. Mobile behaviour is deferred.</p></div>' +
      '</div>' +
      '<header class="cmp-header nav-probe" data-header data-nav-probe data-header-variant="v1">' +
        '<div class="nav-probe__utility">' +
          '<div class="wrap nav-probe__utility-inner">' +
            '<div class="nav-probe__utility-group" aria-label="Personal or Business">' +
              '<button type="button" class="nav-probe__utility-button" aria-current="page">Personal</button>' +
              '<button type="button" class="nav-probe__utility-button">Business</button>' +
            '</div>' +
            '<div class="nav-probe__utility-group">' +
              '<button type="button" class="nav-probe__utility-button">Locations</button>' +
              '<div class="nav-probe__language-control" data-language-control>' +
                '<button type="button" class="nav-probe__utility-button" id="nav-probe-language-trigger-desktop" data-header-variant-toggle data-language-trigger data-variant="v1" aria-haspopup="menu" aria-expanded="false" aria-controls="nav-probe-language-menu-desktop" aria-label="Open language menu">EN</button>' +
                renderLanguageMenu('desktop', 'nav-probe-language-menu-desktop', 'nav-probe-language-trigger-desktop') +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="wrap">' +
          '<div class="nav-probe__main">' +
            '<a class="cmp-header__logo" href="../">Azercell</a>' +
            '<nav class="cmp-header__nav" aria-label="Main">' +
              '<ul class="cmp-header__nav-list">' +
                NAVIGATION.map(function (item, index) {
                  return (
                    '<li>' +
                      '<button type="button" class="cmp-header__nav-btn"' +
                        ' data-menu-toggle="' + index + '"' +
                        ' aria-expanded="false" aria-controls="nav-panel-' + index + '">' +
                        esc(item.label) + '<span aria-hidden="true">▾</span>' +
                      '</button>' +
                    '</li>'
                  );
                }).join('') +
              '</ul>' +
            '</nav>' +
            '<div class="nav-probe__actions">' +
              '<button type="button" class="btn btn--small btn--quiet">Log in</button>' +
              '<button type="button" class="btn btn--small btn--primary">Join Azercell</button>' +
              '<button type="button" class="btn btn--small nav-probe__mobile-menu-btn" data-mobile-menu-btn aria-expanded="false" aria-label="Open menu" aria-controls="nav-probe-mobile-drawer">' +
                '<span class="t-h4 nav-probe__mobile-menu-icon" data-mobile-menu-icon aria-hidden="true">☰</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        NAVIGATION.map(renderPanel).join('') +
        renderMobileDrawer() +
      '</header>'
    );
  }

  function activateDetail(trigger) {
    var menu = trigger.closest('[data-detail-menu]');
    if (!menu) return;
    var menuIndex = Number(menu.getAttribute('data-detail-menu'));
    var activeIndex = Number(trigger.getAttribute('data-detail-trigger'));
    var item = NAVIGATION[menuIndex];
    var content = menu.querySelector('[data-detail-content]');
    if (!item || !content || !Number.isFinite(activeIndex)) return;

    menu.setAttribute('data-active-index', String(activeIndex));
    menu.querySelectorAll('[data-detail-trigger]').forEach(function (button) {
      button.setAttribute(
        'aria-selected',
        button.getAttribute('data-detail-trigger') === String(activeIndex) ? 'true' : 'false'
      );
    });
    content.innerHTML = renderDetailContent(item, activeIndex);
  }

  function closeMobileInnerGroups(except) {
    mount.querySelectorAll('[data-mobile-inner-toggle]').forEach(function (button) {
      var key = button.getAttribute('data-mobile-inner-toggle');
      if (key !== except) {
        button.setAttribute('aria-expanded', 'false');
        var sign = button.querySelector('span[aria-hidden]');
        if (sign) sign.textContent = '+';
      }
    });
    mount.querySelectorAll('[data-mobile-inner-body]').forEach(function (body) {
      if (body.getAttribute('data-mobile-inner-body') !== except) body.setAttribute('data-open', 'false');
    });
  }

  function toggleMobileInnerGroup(button) {
    var key = button.getAttribute('data-mobile-inner-toggle');
    var body = mount.querySelector('[data-mobile-inner-body="' + key + '"]');
    if (!body) return;
    var open = button.getAttribute('aria-expanded') === 'true';
    closeMobileInnerGroups(key);
    button.setAttribute('aria-expanded', open ? 'false' : 'true');
    body.setAttribute('data-open', open ? 'false' : 'true');
    var sign = button.querySelector('span[aria-hidden]');
    if (sign) sign.textContent = open ? '+' : '\u2212';
  }

  function closeMobileAppCategories(except) {
    mount.querySelectorAll('[data-mobile-app-category-toggle]').forEach(function (button) {
      var key = button.getAttribute('data-mobile-app-category-toggle');
      if (key !== except) {
        button.setAttribute('aria-expanded', 'false');
        var sign = button.querySelector('span[aria-hidden]');
        if (sign) sign.textContent = '+';
      }
    });
    mount.querySelectorAll('[data-mobile-app-category-body]').forEach(function (body) {
      if (body.getAttribute('data-mobile-app-category-body') !== except) body.setAttribute('data-open', 'false');
    });
  }

  function toggleMobileAppCategory(button) {
    var key = button.getAttribute('data-mobile-app-category-toggle');
    var body = mount.querySelector('[data-mobile-app-category-body="' + key + '"]');
    if (!body) return;
    var open = button.getAttribute('aria-expanded') === 'true';
    closeMobileAppCategories(key);
    button.setAttribute('aria-expanded', open ? 'false' : 'true');
    body.setAttribute('data-open', open ? 'false' : 'true');
    var sign = button.querySelector('span[aria-hidden]');
    if (sign) sign.textContent = open ? '+' : '\u2212';
  }

  function closeMobileGroups(except) {
    mount.querySelectorAll('[data-mobile-group-toggle]').forEach(function (button) {
      var key = button.getAttribute('data-mobile-group-toggle');
      if (key !== except) {
        button.setAttribute('aria-expanded', 'false');
        var sign = button.querySelector('span[aria-hidden]');
        if (sign) sign.textContent = '+';
      }
    });
    mount.querySelectorAll('[data-mobile-group-body]').forEach(function (body) {
      if (body.getAttribute('data-mobile-group-body') !== except) body.setAttribute('data-open', 'false');
    });
  }

  function toggleMobileGroup(button) {
    var key = button.getAttribute('data-mobile-group-toggle');
    var body = mount.querySelector('[data-mobile-group-body="' + key + '"]');
    if (!body) return;
    var open = button.getAttribute('aria-expanded') === 'true';
    closeMobileGroups(key);
    button.setAttribute('aria-expanded', open ? 'false' : 'true');
    body.setAttribute('data-open', open ? 'false' : 'true');
    var sign = button.querySelector('span[aria-hidden]');
    if (sign) sign.textContent = open ? '+' : '\u2212';
    if (open || key !== '1') closeMobileInnerGroups(null);
    if (open || key !== '3') closeMobileAppCategories(null);
  }

  function closeMobileDrawer() {
    var button = mount.querySelector('[data-mobile-menu-btn]');
    var drawer = mount.querySelector('[data-mobile-drawer]');
    if (!button || !drawer) return;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open menu');
    var closedIcon = button.querySelector('[data-mobile-menu-icon]');
    if (closedIcon) closedIcon.textContent = '☰';
    drawer.hidden = true;
    drawer.setAttribute('aria-hidden', 'true');
    closeMobileGroups(null);
    closeMobileInnerGroups(null);
    closeMobileAppCategories(null);
  }

  function toggleMobileDrawer() {
    var button = mount.querySelector('[data-mobile-menu-btn]');
    var drawer = mount.querySelector('[data-mobile-drawer]');
    if (!button || !drawer) return;
    var open = button.getAttribute('aria-expanded') === 'true';
    if (open) {
      closeMobileDrawer();
      return;
    }
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close menu');
    var openIcon = button.querySelector('[data-mobile-menu-icon]');
    if (openIcon) openIcon.textContent = '×';
    drawer.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
  }

  mount.innerHTML = renderHeader();
  footerMount.innerHTML = renderFooter();
  updateVariantControl();
  updateTransferLink();
  updateTariffCompareLinks();

  mount.addEventListener('pointerover', function (event) {
    var trigger = event.target.closest('[data-detail-trigger]');
    if (trigger) activateDetail(trigger);
    var appTrigger = event.target.closest('[data-app-trigger]');
    if (appTrigger) activateAppPromo(appTrigger);
  });

  mount.addEventListener('focusin', function (event) {
    var trigger = event.target.closest('[data-detail-trigger]');
    if (trigger) activateDetail(trigger);
    var appTrigger = event.target.closest('[data-app-trigger]');
    if (appTrigger) activateAppPromo(appTrigger);

    var categoryTrigger = event.target.closest('[data-app-category-trigger]');
    if (categoryTrigger) activateAppCategory(categoryTrigger);
  });

  mount.addEventListener('click', function (event) {
    var languageOption = event.target.closest('[data-language-option]');
    if (languageOption) {
      event.preventDefault();
      event.stopPropagation();
      selectLanguage(languageOption.getAttribute('data-language-option'));
      return;
    }

    var languageTrigger = event.target.closest('[data-language-trigger]');
    if (languageTrigger) {
      event.preventDefault();
      event.stopPropagation();
      toggleLanguageMenu(languageTrigger);
      return;
    }

    var mobileMenuButton = event.target.closest('[data-mobile-menu-btn]');
    if (mobileMenuButton) {
      closeLanguageMenus();
      event.preventDefault();
      event.stopPropagation();
      toggleMobileDrawer();
      return;
    }

    var mobileGroup = event.target.closest('[data-mobile-group-toggle]');
    if (mobileGroup) {
      closeLanguageMenus();
      event.preventDefault();
      event.stopPropagation();
      toggleMobileGroup(mobileGroup);
      return;
    }

    var mobileInnerGroup = event.target.closest('[data-mobile-inner-toggle]');
    if (mobileInnerGroup) {
      closeLanguageMenus();
      event.preventDefault();
      event.stopPropagation();
      toggleMobileInnerGroup(mobileInnerGroup);
      return;
    }

    var mobileAppCategory = event.target.closest('[data-mobile-app-category-toggle]');
    if (mobileAppCategory) {
      closeLanguageMenus();
      event.preventDefault();
      event.stopPropagation();
      toggleMobileAppCategory(mobileAppCategory);
      return;
    }

    var trigger = event.target.closest('[data-detail-trigger]');
    if (trigger) activateDetail(trigger);
    var appTrigger = event.target.closest('[data-app-trigger]');
    if (appTrigger) activateAppPromo(appTrigger);

    var categoryTrigger = event.target.closest('[data-app-category-trigger]');
    if (categoryTrigger) activateAppCategory(categoryTrigger);
  });

  footerMount.addEventListener('submit', function (event) {
    if (event.target.closest('[data-footer-subscribe]')) event.preventDefault();
  });

  footerMount.addEventListener('click', function (event) {
    var footerToggle = event.target.closest('[data-footer-group-toggle]');
    if (!footerToggle) return;
    event.preventDefault();
    event.stopPropagation();
    var key = footerToggle.getAttribute('data-footer-group-toggle');
    var body = footerMount.querySelector('[data-footer-group-body="' + key + '"]');
    if (!body) return;
    var open = footerToggle.getAttribute('aria-expanded') === 'true';
    footerMount.querySelectorAll('[data-footer-group-toggle]').forEach(function (button) {
      var other = button.getAttribute('data-footer-group-toggle');
      if (other !== key) {
        button.setAttribute('aria-expanded', 'false');
        var otherSign = button.querySelector('span[aria-hidden]');
        if (otherSign) otherSign.textContent = '+';
      }
    });
    footerMount.querySelectorAll('[data-footer-group-body]').forEach(function (groupBody) {
      if (groupBody.getAttribute('data-footer-group-body') !== key) groupBody.setAttribute('data-open', 'false');
    });
    footerToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    body.setAttribute('data-open', open ? 'false' : 'true');
    var sign = footerToggle.querySelector('span[aria-hidden]');
    if (sign) sign.textContent = open ? '+' : '\u2212';
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('[data-language-control]')) closeLanguageMenus();
    var drawer = mount.querySelector('[data-mobile-drawer]');
    if (drawer && !drawer.hidden &&
        !event.target.closest('[data-mobile-drawer]') &&
        !event.target.closest('[data-mobile-menu-btn]')) {
      closeMobileDrawer();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    closeLanguageMenus();
    closeMobileDrawer();
    footerMount.querySelectorAll('[data-footer-group-toggle]').forEach(function (button) {
      button.setAttribute('aria-expanded', 'false');
      var sign = button.querySelector('span[aria-hidden]');
      if (sign) sign.textContent = '+';
    });
    footerMount.querySelectorAll('[data-footer-group-body]').forEach(function (body) {
      body.setAttribute('data-open', 'false');
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) closeMobileDrawer();
  });

  if (floatingBar) {
    if (floatingPopover) {
    floatingBar.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-floating-trigger]');
      if (trigger) openFloatingPopover(trigger);
    });
    document.addEventListener('click', function (event) {
      if (event.target.closest('[data-floating-search]')) return;
      if (!event.target.closest('[data-floating-main]')) closeFloatingPopover();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeFloatingPopover();
    });
    }
    window.addEventListener('scroll', scheduleFloatingDocking, { passive: true });
    window.addEventListener('resize', scheduleFloatingDocking);
    syncFloatingDocking();
  }
})();
