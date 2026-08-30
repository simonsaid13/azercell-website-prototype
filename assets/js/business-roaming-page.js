/* ==========================================================================
   Azercell HTML Prototype — B2B roaming page renderer
   Layout follows the existing B2C roaming and internet-pack page pattern.
   ========================================================================== */

(function (global) {
  'use strict';

  var D = global.BusinessRoamingData;

  function section(inner, modifier) {
    return '<section class="section' + (modifier ? ' ' + modifier : '') + '"><div class="wrap">' + inner + '</div></section>';
  }

  function hrefFn() {
    return global.SiteRegistry ? global.SiteRegistry.href : function (path) { return path; };
  }

  function topCountryChips() {
    return D.topCountries.map(function (id) {
      var country = D.getCountry(id);
      return country ? { id: country.id, name: country.name } : null;
    }).filter(Boolean);
  }

  function countrySearch(href, inputId, options) {
    var opts = options || {};
    return global.Components.render('roamingCountrySearch', {
      label: opts.label || 'Enter country name',
      hint: opts.hint || 'Search a destination to view the available partner networks and pay-as-you-go rates for calls, mobile internet and SMS.',
      placeholder: 'Enter country name…',
      inputId: inputId,
      syncUrl: true,
      urlBase: href(D.routes.countries),
      topCountries: topCountryChips(),
      showAllDefault: !!opts.showAllDefault,
      hideDefaultResults: !!opts.hideDefaultResults,
      className: 'cmp-broam-country-search'
    });
  }

  function coverageTable(inputId) {
    return global.Components.render('businessRoamingCoverageTable', {
      inputId: inputId,
      rows: D.supportedOperators,
      label: 'Enter country or operator name',
      note: 'This prototype contains Turkiye, Georgia and Germany from the wider international operator catalogue.'
    });
  }

  function packCards() {
    return '<div class="grid grid--2 cmp-ipack-grid">' + D.packs.map(function (pack) {
      return '<div>' + global.Components.render('businessRoamingPackCard', { pack: pack }) + '</div>';
    }).join('') + '</div>';
  }

  function actionRow(links, legal) {
    return global.Components.render('tariffDetailCrossLinks', {
      links: links,
      legal: legal || ''
    });
  }

  function featureList(title, items) {
    return global.Components.render('tariffFeatureList', { title: title, features: items, className: 'cmp-broam-feature-list' });
  }

  function mountHub() {
    var C = global.Components;
    var href = hrefFn();

    C.mount('#page-main', [
      section(C.render('sectionHead', {
        eyebrow: 'Roaming',
        title: 'Stay connected anywhere in the world',
        body: 'Azercell Business offers practical internet pack options and pay-as-you-go roaming information for employees travelling abroad.'
      })),
      section(
        C.render('sectionHead', {
          eyebrow: 'Roaming',
          title: 'Internet packages in roaming'
        }) +
        packCards() +
        actionRow([
          { label: 'Check in which countries internet packs can be used', href: D.routes.countries, variant: 'primary' },
          { label: 'More information about the internet packs', href: D.routes.packs }
        ])
      ),
      section(C.render('splitBanner', {
        eyebrow: 'Roaming tips',
        title: 'Planning a trip?',
        body: 'Download the roaming tips before departure so the essential setup and support information is available offline.',
        media: 'Roaming tips',
        actions: [{ label: 'Download roaming tips', href: D.SOURCE_ROAMING, variant: 'primary' }]
      })),
      section(
        C.render('sectionHead', { eyebrow: 'Before travel', title: 'How to use Azercell roaming?' }) +
        C.render('businessRoamingSteps', {
          items: D.howToRoaming,
          firstStepContent: countrySearch(href, 'business-roaming-country-search', {
            label: 'Find country',
            hint: 'Enter the destination to see available operators and current prices.',
            hideDefaultResults: true
          })
        })
      ),
      section(
        C.render('sectionHead', { eyebrow: 'Roaming', title: 'Useful tips' }) +
        '<div class="grid grid--2 cmp-broam-guide-grid">' +
          featureList('Before travel', D.beforeTravel) +
          featureList('Upon arrival', D.uponArrival) +
        '</div>'
      ),
      section(C.render('splitBanner', {
        eyebrow: 'Roaming essentials',
        title: 'Calling and balance abroad',
        body: 'Use the international format + [country code] [operator or city code] [number]. Balance can be topped up through Azercell Kabinetim, online payment or a scratch card. For a scratch card, dial *131*[13-digit code]#YES.',
        media: 'Calling and balance abroad',
        actions: [
          { label: 'Azercell Kabinetim', href: D.KABINETIM, variant: 'primary' },
          { label: 'Online payment', href: D.ONLINE_PAYMENT }
        ]
      })),
      section(C.render('splitBanner', {
        inverse: true,
        eyebrow: 'Online support',
        title: 'Need help? Chat with us!',
        body: 'Employees can contact online support while roaming if they need help with activation, network selection or mobile data.',
        media: 'Online roaming support',
        actions: [{ label: 'Chat with Online Support', href: D.SOURCE_ROAMING, variant: 'primary' }]
      })),
      section(
        C.render('sectionHead', {
          eyebrow: 'Roaming help',
          title: 'Additional information'
        }) +
        '<div style="margin-top:var(--sp-5)">' + C.render('accordion', { items: D.additionalInfo }) + '</div>' +
        actionRow([{ label: 'Open support.azercell.com', href: D.SUPPORT }])
      )
    ]);
  }

  function mountCountries() {
    var C = global.Components;
    var href = hrefFn();

    C.mount('#page-main', [
      section(C.render('sectionHead', {
        eyebrow: 'Roaming',
        title: 'Countries and prices',
        body: 'Search a destination to view the available partner networks and pay-as-you-go rates for calls, mobile internet and SMS.'
      })),
      section(
        '<div id="roaming-catalog" data-roam-page>' +
          C.render('sectionHead', {
            eyebrow: 'Country directory',
            title: 'Top countries'
          }) +
          countrySearch(href, 'business-roaming-directory-search', { showAllDefault: true }) +
          '<div class="cmp-broam-coverage-section" id="supported-operators">' +
            C.render('sectionHead', {
              eyebrow: 'Internet packages in roaming',
              title: 'Countries where internet packs are available'
            }) +
            coverageTable('business-roaming-country-coverage-search') +
          '</div>' +
        '</div>'
      )
    ]);
  }

  function mountCountry(countryId) {
    var C = global.Components;
    var country = D.getCountry(countryId);
    if (!country) return mountCountries();

    C.mount('#page-main', [
      section(C.render('sectionHead', {
        eyebrow: 'Roaming · Countries and prices',
        title: country.name,
        body: 'Postpaid | Available operators'
      })),
      section(
        '<div id="roaming-country-details">' +
          C.render('sectionHead', {
            eyebrow: 'Partner networks',
            title: 'Available operators'
          }) +
          C.render('businessRoamingOperatorList', { operators: country.operators }) +
          C.render('sectionHead', {
            eyebrow: 'Postpaid',
            title: 'Rates'
          }) +
          C.render('businessRoamingRateTable', { country: country }) +
        '</div>'
      ),
      section(
        C.render('sectionHead', {
          eyebrow: 'Internet packages in roaming',
          title: 'Available roaming internet packs',
          body: '500MB — 10 AZN / 3 days · 2GB — 20 AZN / 10 days · 5GB — 50 AZN / 30 days · 10GB — 75 AZN / 30 days'
        }) +
        packCards() +
        actionRow([{ label: 'More details', href: D.routes.packs, variant: 'primary' }])
      )
    ]);
  }

  function mountPacks() {
    var C = global.Components;

    C.mount('#page-main', [
      section(C.render('sectionHead', {
        eyebrow: 'Roaming',
        title: 'Roaming internet packs list',
        body: 'Choose the roaming internet pack that fits the trip duration and expected data use.'
      })),
      section(
        '<div id="roaming-catalog">' +
          C.render('sectionHead', {
            eyebrow: 'Internet packages in roaming',
            title: 'Choose a pack'
          }) +
          packCards() +
          actionRow([{ label: 'Subscribe', href: D.SOURCE_PACKS, variant: 'primary' }]) +
        '</div>'
      ),
      section(C.render('splitBanner', {
        eyebrow: 'Activation',
        title: 'Activate abroad',
        body: 'A roaming internet pack can be activated abroad by SMS, USSD code or through the Azercell Kabinetim application.',
        media: 'Pack activation',
        actions: [{ label: 'Azercell Kabinetim', href: D.KABINETIM, variant: 'primary' }]
      })),
      section(
        C.render('sectionHead', { eyebrow: 'Package rules', title: 'Important conditions' }) +
        featureList('Before subscribing', D.packRules)
      ),
      section(
        '<div id="supported-operators">' +
          C.render('sectionHead', {
            eyebrow: 'Internet packages in roaming',
            title: 'Countries where internet packs are available'
          }) +
          coverageTable('business-roaming-pack-coverage-search') +
        '</div>'
      ),
      section(
        C.render('sectionHead', { eyebrow: 'Roaming internet packs', title: 'Additional information' }) +
        '<div style="margin-top:var(--sp-5)">' + C.render('accordion', { items: D.packAdditionalInfo }) + '</div>'
      )
    ]);
  }

  global.BusinessRoamingPage = {
    mount: function (mode, countryId) {
      if (mode === 'countries') return mountCountries();
      if (mode === 'country') return mountCountry(countryId);
      if (mode === 'packs') return mountPacks();
      return mountHub();
    }
  };
})(window);
