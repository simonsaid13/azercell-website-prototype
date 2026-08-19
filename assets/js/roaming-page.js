/* ==========================================================================
   Azercell HTML Prototype — roaming page renderer
   ========================================================================== */

(function (global) {
  'use strict';

  var D = global.RoamingData;

  function section(inner, modifier) {
    return '<section class="section' + (modifier ? ' ' + modifier : '') + '"><div class="wrap">' + inner + '</div></section>';
  }

  function hrefFn() {
    return global.SiteRegistry ? global.SiteRegistry.href : function (p) { return p; };
  }

  function categoryNavItems() {
    return D.sections.map(function (sec) {
      return { id: sec.id, label: sec.label, href: sec.path };
    });
  }

  function categoryNavBlock(activeId) {
    return global.Components.render('internetCategoryNav', {
      items: categoryNavItems(),
      active: activeId,
      anchor: 'roaming-catalog',
      ariaLabel: 'Roaming section'
    });
  }

  function quickActionsBlock(href) {
    return global.Components.render('quickActions', {
      items: [
        { icon: '01', label: 'Activate in Kabinetim', href: D.KABINETIM },
        { icon: '02', label: 'Roaming internet packs', href: href('/tariffs/roaming/internet-packs/') },
        { icon: '03', label: 'Countries and prices', href: href('/tariffs/roaming/countries-and-prices/') }
      ]
    });
  }

  function resolveCrossSellActions(crossSell, href) {
    return (crossSell.actions || []).map(function (action) {
      return {
        label: action.label,
        href: /^https?:/.test(action.href) ? action.href : href(action.href),
        variant: action.variant
      };
    });
  }

  function packCardProps(pack, extras) {
    return Object.assign({
      id: pack.id,
      name: pack.name,
      data: pack.data,
      price: pack.price,
      priceNum: pack.priceNum,
      sort: pack.sort,
      validity: pack.validity,
      keyword: pack.keyword,
      shortCode: pack.shortCode,
      ussd: pack.ussd,
      usageHints: pack.usageHints,
      details: pack.details,
      kabinetimHref: D.KABINETIM
    }, extras || {});
  }

  function travelPackCard(pack, href) {
    return global.Components.render('internetPackCard', packCardProps(pack, {
      kabinetimHref: D.JOIN_AZERCELL,
      ctaLabel: 'Get on azercellim.com'
    }));
  }

  function topCountryChips() {
    return D.topCountries.map(function (id) {
      var country = D.getCountry(id);
      return country ? { id: country.id, name: country.name } : null;
    }).filter(Boolean);
  }

  function countrySearchBlock(href, options) {
    var opts = options || {};
    var section = D.getSection('countries');
    return global.Components.render('roamingCountrySearch', {
      label: opts.label || 'Search for a country',
      hint: opts.hint || 'See operators, networks, and pay-as-you-go rates for your destination.',
      placeholder: 'Enter country name…',
      inputId: opts.inputId || 'roam-country-search',
      syncUrl: opts.syncUrl !== false,
      urlBase: href(section.path),
      topCountries: topCountryChips(),
      showAllDefault: !!opts.showAllDefault
    });
  }

  function howToBlock() {
    return (
      '<div class="section__title-group">' +
        '<p class="t-label">How to use roaming</p>' +
        '<h2 class="t-h2">Three steps before you travel</h2>' +
      '</div>' +
      '<div class="cmp-roam-steps" style="margin-top: var(--sp-4)">' +
        D.howToRoaming.map(function (item) {
          return (
            '<article class="cmp-roam-step">' +
              '<p class="t-label">Step ' + item.step + '</p>' +
              '<h3 class="t-h3">' + item.title + '</h3>' +
              '<p class="t-body t-muted">' + item.body + '</p>' +
            '</article>'
          );
        }).join('') +
      '</div>'
    );
  }

  function relatedLinks(href, currentId) {
    var C = global.Components;
    var cards = D.sections
      .filter(function (sec) { return sec.id !== currentId; })
      .slice(0, 3)
      .map(function (sec) {
        return C.render('linkCard', {
          media: sec.label,
          title: sec.label,
          body: 'Browse ' + sec.label.toLowerCase() + ' for international travel.',
          href: href(sec.path),
          linkLabel: 'Open page'
        });
      })
      .join('');

    return (
      C.render('sectionHead', { eyebrow: 'Also explore', title: 'Related services' }) +
      '<div class="grid grid--3" style="margin-top: var(--sp-5)">' +
        cards +
        C.render('linkCard', {
          media: 'Local internet packs',
          title: 'Internet packs at home',
          body: 'Monthly, weekly, and daily data add-ons for use in Azerbaijan.',
          href: href('/tariffs/internet/'),
          linkLabel: 'All internet packs'
        }) +
        C.render('linkCard', {
          media: 'Mobile tariffs',
          title: 'Mobile tariffs',
          body: 'Compare prepaid and postpaid plans — some include roaming data.',
          href: href('/tariffs/mobile/'),
          linkLabel: 'All mobile tariffs'
        }) +
      '</div>'
    );
  }

  function crossSellBlock(crossSell, href) {
    return global.Components.render('internetUpgradeBanner', {
      eyebrow: 'Before you travel',
      title: crossSell.title,
      body: crossSell.body,
      actions: resolveCrossSellActions(crossSell, href),
      note: crossSell.note
    });
  }

  function faqBlock(faqKey) {
    return (
      global.Components.render('sectionHead', { eyebrow: 'Questions', title: 'Frequently asked questions' }) +
      '<div style="margin-top: var(--sp-5)">' +
        global.Components.render('accordion', { items: D.getFaq(faqKey) }) +
      '</div>'
    );
  }

  function legalNote(extra) {
    return (
      '<p class="t-body t-muted" style="max-width: 72ch">' +
        'All prices include VAT. Country list is a prototype sample — the live site lists around 190 destinations.' +
        (extra ? ' ' + extra : '') +
      '</p>'
    );
  }

  function mountCountries() {
    var C = global.Components;
    var href = hrefFn();
    var crossSell = D.getCrossSell('countries');
    var sectionData = D.getSection('countries');

    C.mount('#page-main', [
      section(C.render('sectionHead', {
        eyebrow: 'Roaming',
        title: 'Countries and prices',
        body: 'Search for your destination to see operators, networks, and pay-as-you-go rates.'
      })),
      section(quickActionsBlock(href), 'section--tight'),
      section(
        '<div class="cmp-roam-layout" id="roaming-catalog" data-roam-page>' +
          categoryNavBlock('countries') +
          '<div class="cmp-roam-layout__body">' +
            C.render('sectionHead', {
              eyebrow: 'Rate lookup',
              title: 'Find rates for your destination',
              body: 'Rates shown are pay-as-you-go when you do not have a roaming internet pack active.'
            }) +
            C.render('roamingPlanToggle', { current: 'prepaid' }) +
            countrySearchBlock(href, {
              inputId: 'roam-country-search-countries',
              hint: 'Search by country name. Share the link after selecting a destination.'
            }) +
          '</div>' +
        '</div>'
      ),
      section(faqBlock('countries')),
      section(crossSellBlock(crossSell, href)),
      section(relatedLinks(href, 'countries')),
      section(legalNote())
    ].filter(Boolean));
  }

  function mountInternetPacks() {
    var C = global.Components;
    var href = hrefFn();
    var crossSell = D.getCrossSell('internet-packs');
    var packs = D.internetPacks.slice().sort(function (a, b) { return a.sort - b.sort; });

    C.mount('#page-main', [
      section(C.render('sectionHead', {
        eyebrow: 'Roaming',
        title: 'Roaming internet packs',
        body: 'Fixed-price data bundles for use abroad. Activate in Kabinetim or via SMS to 2525 before you travel.'
      })),
      section(quickActionsBlock(href), 'section--tight'),
      section(
        '<div class="cmp-roam-layout" id="roaming-catalog">' +
          categoryNavBlock('internet-packs') +
          '<div class="cmp-roam-layout__body">' +
            C.render('sectionHead', {
              eyebrow: 'Pack list',
              title: 'Choose a roaming data pack',
              body: 'Activation happens in Kabinetim or via SMS — not on this website.'
            }) +
            '<div class="grid grid--2 cmp-ipack-grid">' +
              packs.map(function (pack) {
                return '<div>' + C.render('internetPackCard', packCardProps(pack)) + '</div>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>'
      ),
      section(
        C.render('sectionHead', {
          eyebrow: 'Supported destinations',
          title: 'Operators where roaming internet packs work',
          body: 'Sample list for prototype. Check your destination on the countries page before travel.'
        }) +
        '<div style="margin-top: var(--sp-5)">' +
          C.render('roamingCountriesTable', {
            rows: D.packSupportedOperators(),
            note: 'Full operator list on live site. Nigeria and some destinations do not support roaming internet packs.'
          }) +
        '</div>'
      ),
      section(faqBlock('internetPacks')),
      section(crossSellBlock(crossSell, href)),
      section(relatedLinks(href, 'internet-packs')),
      section(legalNote('Roaming packs work only in listed destinations.'))
    ].filter(Boolean));
  }

  function mountTravelPacks() {
    var C = global.Components;
    var href = hrefFn();
    var crossSell = D.getCrossSell('travel-packs');
    var packs = D.travelPacks.slice().sort(function (a, b) { return a.sort - b.sort; });

    C.mount('#page-main', [
      section(C.render('sectionHead', {
        eyebrow: 'Roaming',
        title: 'Travel packs for visitors to Azerbaijan',
        body: 'Prepaid tourist tariffs with data, minutes, and a free SIM or eSIM. For people arriving in Azerbaijan — not for Azercell subscribers travelling abroad.'
      })),
      section(quickActionsBlock(href), 'section--tight'),
      section(
        '<div class="cmp-roam-layout" id="roaming-catalog">' +
          categoryNavBlock('travel-packs') +
          '<div class="cmp-roam-layout__body">' +
            C.render('sectionHead', {
              eyebrow: 'Tourist packs',
              title: 'Pick a travel pack',
              body: 'Purchase and activation happen on azercellim.com — this page shows prices and what is included only.'
            }) +
            '<div class="grid grid--2 cmp-ipack-grid">' +
              packs.map(function (pack) {
                return '<div>' + travelPackCard(pack, href) + '</div>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>'
      ),
      section(faqBlock('travelPacks')),
      section(crossSellBlock(crossSell, href)),
      section(relatedLinks(href, 'travel-packs')),
      section(legalNote())
    ].filter(Boolean));
  }

  function mountHub() {
    var C = global.Components;
    var href = hrefFn();
    var crossSell = D.getCrossSell('hub');
    var featured = D.internetPacks[1];

    C.mount('#page-main', [
      section(C.render('sectionHead', {
        eyebrow: 'Roaming',
        title: 'Stay connected anywhere in the world',
        body: 'Check country rates, buy roaming internet packs before you leave, or explore travel packs for visitors to Azerbaijan.'
      })),
      section(quickActionsBlock(href), 'section--tight'),
      section(
        '<div class="cmp-roam-layout" id="roaming-catalog" data-roam-page>' +
          categoryNavBlock('hub') +
          '<div class="cmp-roam-layout__body">' +
            C.render('sectionHead', {
              eyebrow: 'Country lookup',
              title: 'Where are you travelling?',
              body: 'Search for operators, networks, and whether roaming internet packs work in your destination.'
            }) +
            C.render('roamingPlanToggle', { current: 'prepaid' }) +
            countrySearchBlock(href, {
              inputId: 'roam-country-search-hub',
              hint: 'Try Turkiye, Georgia, or Germany — or type any country name.'
            }) +
          '</div>' +
        '</div>'
      ),
      section(
        C.render('sectionHead', {
          eyebrow: 'Featured pack',
          title: 'Roaming internet packs',
          body: 'Fixed-price data abroad. See all four packs or activate in Kabinetim.'
        }) +
        '<div class="grid grid--2" style="margin-top: var(--sp-5)">' +
          '<div>' + C.render('internetPackCard', packCardProps(featured)) + '</div>' +
          '<div class="stack" style="justify-content: center">' +
            '<p class="t-body">Four sizes from 500MB to 10GB. Valid 3 to 30 days depending on pack.</p>' +
            '<a class="btn btn--primary" href="' + href('/tariffs/roaming/internet-packs/') + '#roaming-catalog">See all roaming internet packs</a>' +
          '</div>' +
        '</div>'
      ),
      section(howToBlock()),
      section(faqBlock('hub')),
      section(crossSellBlock(crossSell, href)),
      section(relatedLinks(href, 'hub')),
      section(legalNote())
    ].filter(Boolean));
  }

  function mount(mode) {
    if (mode === 'hub') mountHub();
    else if (mode === 'internet-packs') mountInternetPacks();
    else if (mode === 'travel-packs') mountTravelPacks();
    else if (mode === 'countries') mountCountries();
  }

  global.RoamingPage = { mount: mount };
})(window);
