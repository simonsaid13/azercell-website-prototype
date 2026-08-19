/* ==========================================================================
   Azercell HTML Prototype — B2C roaming catalogue
   Prices from Azercell_Database_B2C.md. Country sample is truncated for prototype.
   ========================================================================== */

(function (global) {
  'use strict';

  var KABINETIM = 'https://kabinetim.azercell.com/my/login';
  var JOIN_AZERCELL = 'https://azercellim.com/en/home';

  var sections = [
    { id: 'hub', label: 'Roaming overview', path: '/tariffs/roaming/' },
    { id: 'internet-packs', label: 'Roaming internet packs', path: '/tariffs/roaming/internet-packs/' },
    { id: 'countries', label: 'Countries and prices', path: '/tariffs/roaming/countries-and-prices/' },
    { id: 'travel-packs', label: 'Travel packs', path: '/tariffs/roaming/travel-packs/' }
  ];

  function rates(out, inc, data, sms) {
    return {
      outgoing: out + ' AZN/min',
      incoming: inc + ' AZN/min',
      internetMb: data + ' AZN/MB',
      sms: sms + ' AZN'
    };
  }

  function op(name, displayName, networks, packSupported, prepaid, postpaid) {
    return {
      name: name,
      displayName: displayName || name,
      networks: networks,
      internetPackSupported: packSupported !== false,
      prepaid: prepaid,
      postpaid: postpaid || prepaid
    };
  }

  var standardRates = rates('1.00', '0.50', '0.99', '0.15');
  var euRates = rates('1.50', '0.50', '0.99', '0.20');
  var georgiaRates = rates('0.80', '0.50', '0.99', '0.10');
  var nigeriaRates = rates('7.00', '0.50', '25.00', '0.90');

  var countries = [
    { id: 'turkiye', name: 'Turkiye', operators: [
      op('Turkcell', 'Turkcell TR', ['2G', '3G', 'LTE'], true, standardRates, standardRates),
      op('Vodafone', 'Vodafone TR', ['2G', '3G', 'LTE'], true, standardRates, standardRates)
    ]},
    { id: 'georgia', name: 'Georgia', operators: [
      op('Magticom', 'Magticom GE', ['2G', '3G', 'LTE'], true, georgiaRates, georgiaRates),
      op('Silknet', 'Silknet / Geocell', ['2G', '3G', 'LTE'], true, georgiaRates, georgiaRates)
    ]},
    { id: 'germany', name: 'Germany', operators: [
      op('T-Mobile', 'Telekom DE', ['2G', 'LTE'], true, euRates, euRates),
      op('Vodafone', 'Vodafone DE', ['2G', 'LTE'], true, euRates, euRates),
      op('O2', 'O2 / Telefonica', ['2G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'france', name: 'France', operators: [
      op('Orange', 'Orange FR', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('SFR', 'SFR', ['2G', '3G'], true, euRates, euRates),
      op('Bouygues Telecom', 'Bouygues', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'united-kingdom', name: 'United Kingdom', operators: [
      op('Vodafone', 'Vodafone UK', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('EE', 'EE', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'italy', name: 'Italy', operators: [
      op('TIM', 'TIM IT', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('Vodafone', 'Vodafone IT', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'spain', name: 'Spain', operators: [
      op('Movistar', 'Telefonica ES', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('Vodafone', 'Vodafone ES', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'netherlands', name: 'Netherlands', operators: [
      op('KPN', 'KPN NL', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('Vodafone', 'Vodafone NL', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'austria', name: 'Austria', operators: [
      op('A1', 'A1 AT', ['2G', 'LTE'], true, euRates, euRates),
      op('Magenta', 'T-Mobile AT', ['2G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'poland', name: 'Poland', operators: [
      op('Orange', 'Orange PL', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('Plus', 'Plus PL', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'czech-republic', name: 'Czech Republic', operators: [
      op('O2', 'O2 CZ', ['2G', 'LTE'], true, euRates, euRates),
      op('Vodafone', 'Vodafone CZ', ['2G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'greece', name: 'Greece', operators: [
      op('Cosmote', 'Cosmote GR', ['2G', 'LTE'], true, euRates, euRates),
      op('Vodafone', 'Vodafone GR', ['2G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'bulgaria', name: 'Bulgaria', operators: [
      op('A1', 'A1 BG', ['2G', 'LTE'], true, euRates, euRates),
      op('Yettel', 'Yettel BG', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'romania', name: 'Romania', operators: [
      op('Orange', 'Orange RO', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('Vodafone', 'Vodafone RO', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'croatia', name: 'Croatia', operators: [
      op('T-Mobile', 'HT HR', ['2G', 'LTE'], true, euRates, euRates),
      op('A1', 'A1 HR', ['2G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'hungary', name: 'Hungary', operators: [
      op('Telenor', 'Yettel HU', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('Vodafone', 'Vodafone HU', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'serbia', name: 'Serbia', operators: [
      op('Telenor', 'Yettel RS', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('VIP', 'A1 RS', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'albania', name: 'Albania', operators: [
      op('Vodafone', 'Vodafone AL', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('One', 'One Albania', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'belarus', name: 'Belarus', operators: [
      op('A1', 'A1 BY', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('MTS', 'MTS BY', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'russia', name: 'Russia', operators: [
      op('MTS', 'MTS RU', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('Beeline', 'Beeline RU', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'kazakhstan', name: 'Kazakhstan', operators: [
      op('Kcell', 'Kcell KZ', ['2G', '3G', 'LTE'], true, standardRates, standardRates),
      op('Beeline', 'Beeline KZ', ['2G', '3G', 'LTE'], true, standardRates, standardRates)
    ]},
    { id: 'uzbekistan', name: 'Uzbekistan', operators: [
      op('Ucell', 'Ucell UZ', ['2G', '3G', 'LTE'], true, standardRates, standardRates),
      op('Beeline', 'Beeline UZ', ['2G', '3G', 'LTE'], true, standardRates, standardRates)
    ]},
    { id: 'uae', name: 'United Arab Emirates', operators: [
      op('Etisalat', 'Etisalat AE', ['2G', '3G', 'LTE'], true, standardRates, standardRates),
      op('du', 'du AE', ['2G', '3G', 'LTE'], true, standardRates, standardRates)
    ]},
    { id: 'saudi-arabia', name: 'Saudi Arabia', operators: [
      op('STC', 'STC SA', ['2G', '3G', 'LTE'], true, standardRates, standardRates),
      op('Mobily', 'Mobily SA', ['2G', '3G', 'LTE'], true, standardRates, standardRates)
    ]},
    { id: 'egypt', name: 'Egypt', operators: [
      op('Vodafone', 'Vodafone EG', ['2G', '3G', 'LTE'], true, standardRates, standardRates),
      op('Orange', 'Orange EG', ['2G', '3G', 'LTE'], true, standardRates, standardRates)
    ]},
    { id: 'qatar', name: 'Qatar', operators: [
      op('Ooredoo', 'Ooredoo QA', ['2G', '3G', 'LTE'], true, standardRates, standardRates)
    ]},
    { id: 'usa', name: 'United States', operators: [
      op('T-Mobile', 'T-Mobile US', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('AT&T', 'AT&T US', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'canada', name: 'Canada', operators: [
      op('Rogers', 'Rogers CA', ['2G', 'LTE'], true, euRates, euRates),
      op('Bell', 'Bell CA', ['LTE'], true, euRates, euRates)
    ]},
    { id: 'australia', name: 'Australia', operators: [
      op('Telstra', 'Telstra AU', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('Optus', 'Optus AU', ['LTE'], true, euRates, euRates)
    ]},
    { id: 'china', name: 'China', operators: [
      op('China Mobile', 'CMCC', ['2G', 'LTE'], true, euRates, euRates),
      op('China Unicom', 'Unicom CN', ['LTE'], true, euRates, euRates)
    ]},
    { id: 'japan', name: 'Japan', operators: [
      op('SoftBank', 'SoftBank JP', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('NTT Docomo', 'Docomo JP', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'south-korea', name: 'South Korea', operators: [
      op('SK Telecom', 'SKT KR', ['2G', '3G', 'LTE'], true, euRates, euRates),
      op('KT', 'KT KR', ['2G', '3G', 'LTE'], true, euRates, euRates)
    ]},
    { id: 'malaysia', name: 'Malaysia', operators: [
      op('Maxis', 'Maxis MY', ['2G', '3G', 'LTE'], true, standardRates, standardRates),
      op('Celcom', 'Celcom MY', ['2G', '3G', 'LTE'], true, standardRates, standardRates)
    ]},
    { id: 'thailand', name: 'Thailand', operators: [
      op('AIS', 'AIS TH', ['2G', '3G', 'LTE'], true, standardRates, standardRates),
      op('DTAC', 'True / DTAC', ['2G', '3G', 'LTE'], true, standardRates, standardRates)
    ]},
    { id: 'india', name: 'India', operators: [
      op('Airtel', 'Airtel IN', ['2G', '3G', 'LTE'], true, standardRates, standardRates),
      op('Jio', 'Reliance Jio', ['LTE'], true, standardRates, standardRates)
    ]},
    { id: 'pakistan', name: 'Pakistan', operators: [
      op('Jazz', 'Jazz PK', ['2G', '3G', 'LTE'], true, standardRates, standardRates),
      op('Telenor', 'Telenor PK', ['2G', '3G', 'LTE'], true, standardRates, standardRates)
    ]},
    { id: 'nigeria', name: 'Nigeria', operators: [
      op('MTN', 'MTN NG', ['2G', '3G', 'LTE'], false, nigeriaRates, nigeriaRates),
      op('Airtel', 'Airtel NG', ['2G', '3G', 'LTE'], false, nigeriaRates, nigeriaRates)
    ]}
  ];

  var internetPacks = [
    {
      id: 'roam-500mb',
      sort: 1,
      name: 'Roaming 500MB',
      data: '500MB',
      price: '10 AZN',
      priceNum: 10,
      validity: { prepaid: '3 days', postpaid: '3 days' },
      keyword: '500',
      shortCode: '2525',
      ussd: '*100*500#YES',
      usageHints: [
        { activity: 'Messaging and maps', duration: '~3 days light use' }
      ],
      details: 'Prepaid data bundle for use abroad. Valid from activation. Prepaid balance must be at least 0.10 AZN for roaming internet.'
    },
    {
      id: 'roam-2gb',
      sort: 2,
      name: 'Roaming 2GB',
      data: '2GB',
      price: '25 AZN',
      priceNum: 25,
      validity: { prepaid: '10 days', postpaid: '10 days' },
      keyword: '2',
      shortCode: '2525',
      ussd: '*100*2#YES',
      usageHints: [
        { activity: 'Video calls', duration: '~8 hours' },
        { activity: 'Social networking', duration: '~40 hours' }
      ],
      details: 'Prepaid data bundle for use abroad. Valid 10 days from activation.'
    },
    {
      id: 'roam-5gb',
      sort: 3,
      name: 'Roaming 5GB',
      data: '5GB',
      price: '50 AZN',
      priceNum: 50,
      validity: { prepaid: '30 days', postpaid: '30 days' },
      keyword: '5',
      shortCode: '2525',
      ussd: '*100*5#YES',
      usageHints: [
        { activity: 'Video streaming', duration: '~6 hours' },
        { activity: 'Navigation and maps', duration: '~2 weeks' }
      ],
      details: 'Prepaid data bundle for use abroad. Valid 30 days from activation.'
    },
    {
      id: 'roam-10gb',
      sort: 4,
      name: 'Roaming 10GB',
      data: '10GB',
      price: '75 AZN',
      priceNum: 75,
      validity: { prepaid: '30 days', postpaid: '30 days' },
      keyword: '10',
      shortCode: '2525',
      ussd: '*100*10#YES',
      usageHints: [
        { activity: 'Video streaming', duration: '~12 hours' },
        { activity: 'Remote work', duration: '~2 weeks moderate use' }
      ],
      details: 'Prepaid data bundle for use abroad. Valid 30 days from activation.'
    }
  ];

  var travelPacks = [
    {
      id: 'travel-30gb',
      sort: 1,
      name: 'Travel pack 30GB',
      data: '30GB',
      price: '39 AZN',
      priceNum: 39,
      validity: { prepaid: '30 days, fixed', postpaid: '30 days, fixed' },
      usageHints: [
        { activity: 'Countrywide calls', duration: '100 minutes included' },
        { activity: 'Free SIM or eSIM', duration: 'On arrival in Azerbaijan' }
      ],
      details: 'Inbound-tourist prepaid tariff for visitors to Azerbaijan. 100 minutes plus 30GB data. Purchase and activation via azercellim.com — not on this website.'
    },
    {
      id: 'travel-60gb',
      sort: 2,
      name: 'Travel pack 60GB',
      data: '60GB',
      price: '59 AZN',
      priceNum: 59,
      validity: { prepaid: '30 days, fixed', postpaid: '30 days, fixed' },
      usageHints: [
        { activity: 'Countrywide calls', duration: '200 minutes included' },
        { activity: 'Free SIM or eSIM', duration: 'On arrival in Azerbaijan' }
      ],
      details: 'Inbound-tourist prepaid tariff. 200 minutes plus 60GB data for 30 days.'
    },
    {
      id: 'travel-120gb',
      sort: 3,
      name: 'Travel pack 120GB',
      data: '120GB',
      price: '79 AZN',
      priceNum: 79,
      validity: { prepaid: '30 days, fixed', postpaid: '30 days, fixed' },
      usageHints: [
        { activity: 'Countrywide calls', duration: '300 minutes included' },
        { activity: 'Free SIM or eSIM', duration: 'On arrival in Azerbaijan' }
      ],
      details: 'Inbound-tourist prepaid tariff. 300 minutes plus 120GB data for 30 days.'
    }
  ];

  var topCountries = ['turkiye', 'georgia', 'germany'];

  var crossSell = {
    hub: {
      title: 'Skip pay-per-MB charges abroad',
      body: 'Roaming internet packs give you a fixed price before you travel. Compare packs or pick a plan that already includes roaming data.',
      actions: [
        { label: 'See roaming internet packs', href: '/tariffs/roaming/internet-packs/', variant: 'primary' },
        { label: 'Compare mobile plans', href: '/tariffs/compare/' }
      ]
    },
    'internet-packs': {
      title: 'Plans with roaming data included',
      body: 'Premium+ prepaid and Alfa postpaid include roaming data in the main pack. You may not need a separate add-on.',
      actions: [
        { label: 'See Premium+ packs', href: '/tariffs/mobile/prepaid/premium-plus/', variant: 'primary' },
        { label: 'Compare mobile plans', href: '/tariffs/compare/' }
      ],
      note: 'Check country support before travel. Roaming packs work only in listed destinations.'
    },
    'travel-packs': {
      title: 'Visiting Azerbaijan?',
      body: 'Travel packs are for tourists arriving in Azerbaijan. If you are an Azercell subscriber travelling abroad, see roaming internet packs instead.',
      actions: [
        { label: 'Get a travel pack', href: JOIN_AZERCELL, variant: 'primary' },
        { label: 'Roaming internet packs', href: '/tariffs/roaming/internet-packs/' }
      ]
    },
    countries: {
      title: 'Pre-buy data for your trip',
      body: 'If your destination supports roaming internet packs, buying before you leave avoids surprise pay-per-MB charges.',
      actions: [
        { label: 'Roaming internet packs', href: '/tariffs/roaming/internet-packs/', variant: 'primary' },
        { label: 'Roaming overview', href: '/tariffs/roaming/' }
      ]
    }
  };

  var faq = {
    hub: [
      { question: 'How do I activate roaming?', answer: 'Prepaid: dial *135*1#YES or activate in Kabinetim. Postpaid: send START to 8808 or activate in Kabinetim. Then turn on roaming in your phone settings.' },
      { question: 'Can I use roaming internet packs abroad?', answer: 'Yes. Activate packs via SMS to 2525, USSD *100*pack code#YES, or Kabinetim before or during travel.' },
      { question: 'How do I check roaming internet balance?', answer: 'Send BALANS to 2525 or dial *100#YES. Balance info may be delayed for postpaid subscribers abroad.' }
    ],
    internetPacks: [
      { question: 'When does the pack start?', answer: 'The pack is valid from the moment of activation. Prepaid numbers need at least 0.10 AZN balance for roaming internet.' },
      { question: 'Can I buy multiple packs at once?', answer: 'You cannot purchase a new roaming data pack while data remains on the current pack.' },
      { question: 'What if my pack data runs out?', answer: 'Further usage is charged at pay-as-you-go roaming internet rates for that country.' }
    ],
    travelPacks: [
      { question: 'Who are travel packs for?', answer: 'Visitors to Azerbaijan who need a local number with data and minutes. They are not for Azercell subscribers travelling abroad.' },
      { question: 'How do I get a SIM or eSIM?', answer: 'Order through azercellim.com. This website shows prices and what is included only.' }
    ],
    countries: [
      { question: 'Why do rates differ by country?', answer: 'Roaming prices depend on agreements with each foreign operator. Always check rates for your destination before travel.' },
      { question: 'Is this the full country list?', answer: 'No. This prototype shows a sample of destinations. The live Azercell site lists around 190 countries and operators.' }
    ]
  };

  var howToRoaming = [
    { step: '1', title: 'Check your destination', body: 'Search for the country above to see operators, networks, and whether roaming internet packs work there.' },
    { step: '2', title: 'Activate roaming', body: 'Prepaid: *135*1#YES or Kabinetim. Postpaid: send START to 8808. Turn on roaming in phone settings.' },
    { step: '3', title: 'Buy an internet pack', body: 'Activate a roaming internet pack in Kabinetim or via SMS to 2525 before you use mobile data abroad.' }
  ];

  function getSection(id) {
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].id === id) return sections[i];
    }
    return null;
  }

  function getCountry(id) {
    for (var i = 0; i < countries.length; i++) {
      if (countries[i].id === id) return countries[i];
    }
    return null;
  }

  function searchCountries(query) {
    var q = String(query || '').trim().toLowerCase();
    if (!q) return countries.slice();
    return countries.filter(function (c) {
      return c.name.toLowerCase().indexOf(q) !== -1 || c.id.indexOf(q) !== -1;
    });
  }

  function packSupportedOperators() {
    var rows = [];
    countries.forEach(function (country) {
      country.operators.forEach(function (operator) {
        if (operator.internetPackSupported) {
          rows.push({ country: country.name, countryId: country.id, operator: operator });
        }
      });
    });
    return rows;
  }

  function getCrossSell(key) {
    return crossSell[key] || crossSell.hub;
  }

  function getFaq(key) {
    return faq[key] || faq.hub;
  }

  global.RoamingData = {
    KABINETIM: KABINETIM,
    JOIN_AZERCELL: JOIN_AZERCELL,
    sections: sections,
    internetPacks: internetPacks,
    travelPacks: travelPacks,
    countries: countries,
    topCountries: topCountries,
    howToRoaming: howToRoaming,
    getSection: getSection,
    getCountry: getCountry,
    searchCountries: searchCountries,
    packSupportedOperators: packSupportedOperators,
    getCrossSell: getCrossSell,
    getFaq: getFaq
  };
})(window);
