/* ==========================================================================
   Azercell HTML Prototype — B2B roaming page renderer
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

  function hero(title, body, actions, stats) {
    return global.Components.render('heroBanner', {
      slides: [{
        eyebrow: 'Azercell Business · Roaming',
        title: title,
        body: body,
        media: 'Business travel connectivity',
        actions: actions,
        stats: stats || []
      }]
    });
  }

  function quickActions(href) {
    return global.Components.render('quickActions', {
      items: [
        { icon: '01', label: 'Roaming overview', href: href(D.routes.hub) },
        { icon: '02', label: 'Countries and prices', href: href(D.routes.countries) },
        { icon: '03', label: 'Internet packs', href: href(D.routes.packs) },
        { icon: '04', label: 'Activate in Kabinetim', href: D.KABINETIM }
      ]
    });
  }

  function countryCards(href, excludeId) {
    return '<div class="grid grid--3">' + D.countries.filter(function (country) {
      return country.id !== excludeId;
    }).map(function (country) {
      return global.Components.render('businessRoamingCountryCard', {
        country: country,
        href: href(country.route)
      });
    }).join('') + '</div>';
  }

  function packCards(limit) {
    var packs = typeof limit === 'number' ? D.packs.slice(0, limit) : D.packs;
    return '<div class="grid grid--2">' + packs.map(function (pack) {
      return global.Components.render('businessRoamingPackCard', {
        pack: pack,
        kabinetimHref: D.KABINETIM
      });
    }).join('') + '</div>';
  }

  function contentCards(items) {
    return '<div class="grid grid--3">' + items.map(function (item) {
      return global.Components.render('linkCard', item);
    }).join('') + '</div>';
  }

  function accordionBlock(eyebrow, title, items) {
    return global.Components.render('sectionHead', { eyebrow: eyebrow, title: title }) +
      '<div style="margin-top:var(--sp-5)">' +
        global.Components.render('accordion', { items: items }) +
      '</div>';
  }

  function supportBlock() {
    return global.Components.render('splitBanner', {
      inverse: true,
      eyebrow: 'Corporate roaming support',
      title: 'Need help before or during a trip?',
      body: 'Use online support or call (+99450) 605 00 00. The first 45 minutes are free; further calls cost 0.70 AZN per minute with one-second billing.',
      media: 'Business roaming support',
      actions: [
        { label: 'Open online support', href: D.SUPPORT, variant: 'primary' },
        { label: 'Call support', href: 'tel:+994506050000' }
      ]
    });
  }

  function mountHub() {
    var C = global.Components;
    var href = hrefFn();
    C.mount('#page-main', [
      hero(
        'Stay connected anywhere in the world',
        'Practical internet packs and transparent pay-as-you-go roaming for employees travelling abroad.',
        [
          { label: 'Check a destination', href: href(D.routes.countries), variant: 'primary' },
          { label: 'View internet packs', href: href(D.routes.packs) }
        ],
        [
          { value: '3', label: 'prototype destinations' },
          { value: '4', label: 'roaming internet packs' },
          { value: '10GB', label: 'largest available pack' }
        ]
      ),
      section(quickActions(href), 'section--tight'),
      section(
        C.render('sectionHead', {
          eyebrow: 'Countries and prices',
          title: 'Plan the trip before departure',
          body: 'Compare corporate postpaid rates and the partner operators available in each destination.',
          action: { label: 'All destinations', href: href(D.routes.countries) }
        }) + countryCards(href)
      ),
      section(
        C.render('sectionHead', {
          eyebrow: 'Roaming internet',
          title: 'Choose a predictable data allowance',
          body: 'Activate in Kabinetim, by SMS to 2525, or with the USSD code shown on each pack.',
          action: { label: 'Pack details', href: href(D.routes.packs) }
        }) + packCards()
      ),
      section(
        C.render('sectionHead', { eyebrow: 'Before travel', title: 'Three steps for every corporate line' }) +
        contentCards([
          { media: 'Check balance', title: '1. Check the balance', body: 'Send an empty SMS to 650 or BALANS to 2525.' },
          { media: 'Enable roaming', title: '2. Enable roaming', body: 'Ask the company contact to activate roaming for the employee number.' },
          { media: 'Prepare device', title: '3. Prepare the device', body: 'Enable data roaming and keep the partner operator list available.' }
        ])
      ),
      section(accordionBlock('Travel checklist', 'Before departure and after arrival', D.beforeTravel.concat(D.onArrival))),
      section(supportBlock())
    ]);
  }

  function mountCountries() {
    var C = global.Components;
    var href = hrefFn();
    C.mount('#page-main', [
      hero(
        'Countries and prices',
        'Corporate postpaid roaming rates and partner networks for the three destinations included in this prototype.',
        [{ label: 'View internet packs', href: href(D.routes.packs), variant: 'primary' }],
        [{ value: '60 sec', label: 'call billing interval' }, { value: '30KB', label: 'internet billing interval' }, { value: 'VAT', label: 'included in displayed prices' }]
      ),
      section(quickActions(href), 'section--tight'),
      section(
        C.render('sectionHead', {
          eyebrow: 'Destination directory',
          title: 'Choose a country',
          body: 'Open a country page for detailed call, internet and SMS rates, plus the available operators.'
        }) + countryCards(href)
      ),
      section(accordionBlock('How pricing works', 'Roaming billing essentials', [
        { question: 'Which type of line are these prices for?', answer: 'The prototype shows corporate postpaid roaming prices.' },
        { question: 'How are calls and data rounded?', answer: 'Calls are billed in 60-second increments. Mobile internet is billed in 30KB increments.' },
        { question: 'Are taxes included?', answer: 'Yes. All displayed roaming prices include VAT.' }
      ])),
      section(supportBlock())
    ]);
  }

  function mountCountry(countryId) {
    var C = global.Components;
    var href = hrefFn();
    var country = D.getCountry(countryId);
    if (!country) return mountCountries();

    C.mount('#page-main', [
      hero(
        'Roaming in ' + country.name,
        'Corporate postpaid rates, partner operators and a practical checklist for employees travelling to ' + country.name + '.',
        [
          { label: 'All countries', href: href(D.routes.countries), variant: 'primary' },
          { label: 'Roaming internet packs', href: href(D.routes.packs) }
        ],
        [
          { value: country.rates.outgoingWithin, label: 'outgoing calls' },
          { value: country.rates.incoming, label: 'incoming calls' },
          { value: country.rates.internet, label: 'mobile internet' }
        ]
      ),
      section(quickActions(href), 'section--tight'),
      section(
        C.render('sectionHead', {
          eyebrow: 'Corporate postpaid',
          title: 'Pay-as-you-go rates',
          body: 'These rates apply when no roaming internet pack covers the usage.'
        }) + C.render('businessRoamingRateTable', { country: country })
      ),
      section(
        C.render('sectionHead', {
          eyebrow: 'Partner networks',
          title: 'Available operators in ' + country.name,
          body: 'If automatic network selection does not work, choose one of these operators manually.'
        }) + C.render('businessRoamingOperatorList', { operators: country.operators })
      ),
      section(
        C.render('sectionHead', {
          eyebrow: 'Control data spend',
          title: 'Add a roaming internet pack',
          body: 'Choose a fixed data allowance before the employee begins using mobile internet abroad.',
          action: { label: 'All pack rules', href: href(D.routes.packs) }
        }) + packCards(2)
      ),
      section(accordionBlock('Travel checklist', 'If connection needs attention', D.onArrival)),
      section(
        C.render('sectionHead', { eyebrow: 'Other destinations', title: 'Compare another country' }) +
        countryCards(href, country.id)
      ),
      section(supportBlock())
    ]);
  }

  function mountPacks() {
    var C = global.Components;
    var href = hrefFn();
    C.mount('#page-main', [
      hero(
        'Roaming internet packs',
        'Fixed-price data bundles for corporate numbers abroad, with activation in Kabinetim, by SMS or via USSD.',
        [
          { label: 'Activate in Kabinetim', href: D.KABINETIM, variant: 'primary' },
          { label: 'Check a destination', href: href(D.routes.countries) }
        ],
        [{ value: '500MB', label: 'smallest pack' }, { value: '10GB', label: 'largest pack' }, { value: '30 days', label: 'maximum validity' }]
      ),
      section(quickActions(href), 'section--tight'),
      section(
        C.render('sectionHead', {
          eyebrow: 'Pack catalogue',
          title: 'Choose the right allowance',
          body: 'Activation is completed outside this prototype through Kabinetim, SMS or the real USSD code.'
        }) + packCards()
      ),
      section(
        C.render('sectionHead', { eyebrow: 'Activation', title: 'Three ways to activate' }) +
        contentCards([
          { media: 'Kabinetim', title: 'Kabinetim', body: 'Open the account and select the roaming internet pack.', href: D.KABINETIM, linkLabel: 'Open Kabinetim' },
          { media: 'SMS', title: 'SMS to 2525', body: 'Send the pack keyword shown on the corresponding card.' },
          { media: 'USSD', title: 'USSD code', body: 'Dial the code shown on the card and confirm the request.' }
        ])
      ),
      section(
        C.render('sectionHead', {
          eyebrow: 'Supported networks',
          title: 'Where the packs work',
          body: 'Partner operators for the three destinations included in this prototype.'
        }) + C.render('businessRoamingOperatorsTable', { rows: D.supportedOperators })
      ),
      section(accordionBlock('Pack rules', 'Important conditions', D.packRules)),
      section(
        C.render('splitBanner', {
          eyebrow: 'Balance and payment',
          title: 'Keep the corporate number ready to use',
          body: 'Check the balance with BALANS to 2525 or *100#YES. A scratch card can be added with *131*[13-digit]#YES.',
          media: 'Balance and top-up',
          actions: [
            { label: 'Online payment', href: D.ONLINE_PAYMENT, variant: 'primary' },
            { label: 'Online support', href: D.SUPPORT }
          ],
          note: 'The balance-check SMS costs 0.01 AZN including VAT.'
        })
      ),
      section(supportBlock())
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
