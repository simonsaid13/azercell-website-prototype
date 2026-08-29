/* ==========================================================================
   Azercell HTML Prototype — B2B roaming content
   Source: Azercell_Business_Roaming_Content.docx (three-country scope)
   ========================================================================== */

(function (global) {
  'use strict';

  var KABINETIM = 'https://kabinetim.azercell.com/';
  var SUPPORT = 'https://support.azercell.com/';
  var ONLINE_PAYMENT = 'https://www.azercell.com/en/personal/payment-and-balance/online-payment.html';
  var SOURCE_ROAMING = 'https://www.azercell.com/en/corporate/mobile-communications/roaming.html';
  var SOURCE_PACKS = 'https://www.azercell.com/en/corporate/mobile-communications/roaming/roaming-data-packages.html';

  var routes = {
    hub: '/business/mobile/roaming/',
    countries: '/business/mobile/roaming/countries-and-prices/',
    packs: '/business/mobile/roaming/internet-packs/'
  };

  var sections = [
    { id: 'hub', label: 'Roaming overview', path: routes.hub },
    { id: 'countries', label: 'Countries and prices', path: routes.countries },
    { id: 'packs', label: 'Roaming internet packs', path: routes.packs }
  ];

  function countryPath(id) {
    return routes.countries + id + '/';
  }

  function rate(rateValue, interval) {
    return { rate: rateValue, interval: interval };
  }

  function searchRateSummary(rates) {
    return {
      outgoing: rates.outgoingWithin.rate + ' AZN/min',
      incoming: rates.incoming.rate + ' AZN/min',
      internetMb: rates.internet.rate + ' AZN/MB',
      sms: rates.sms.rate + ' AZN'
    };
  }

  function operator(name, networks, rates) {
    var summary = searchRateSummary(rates);
    return {
      name: name,
      displayName: name,
      networks: networks,
      internetPackSupported: true,
      prepaid: summary,
      postpaid: summary
    };
  }

  function country(id, name, operatorData, rates) {
    var item = {
      id: id,
      name: name,
      route: countryPath(id),
      planLabel: 'Corporate postpaid',
      rates: rates,
      consolidatedRates: searchRateSummary(rates),
      operators: []
    };
    item.operators = operatorData.map(function (row) {
      return operator(row[0], row[1], rates);
    });
    return item;
  }

  var turkiyeRates = {
    outgoingWithin: rate('1.00', '60 sec'),
    outgoingAzerbaijan: rate('1.00', '60 sec'),
    outgoingOther: rate('1.00', '60 sec'),
    incoming: rate('0.50', '60 sec'),
    internet: rate('0.99', '30KB'),
    sms: rate('0.15', 'Per message')
  };

  var georgiaRates = {
    outgoingWithin: rate('0.80', '60 sec'),
    outgoingAzerbaijan: rate('0.80', '60 sec'),
    outgoingOther: rate('0.80', '60 sec'),
    incoming: rate('0.50', '60 sec'),
    internet: rate('0.99', '30KB'),
    sms: rate('0.10', 'Per message')
  };

  var germanyRates = {
    outgoingWithin: rate('1.50', '60 sec'),
    outgoingAzerbaijan: rate('1.50', '60 sec'),
    outgoingOther: rate('1.50', '60 sec'),
    incoming: rate('0.50', '60 sec'),
    internet: rate('0.99', '30KB'),
    sms: rate('0.20', 'Per message')
  };

  var countries = [
    country('turkiye', 'Turkiye', [
      ['Turk Telekom', ['4G']],
      ['Turkcell', ['4G']],
      ['Vodafone', ['4G']]
    ], turkiyeRates),
    country('georgia', 'Georgia', [
      ['Magticom', ['4G']],
      ['Silknet (Geocell)', ['4G']],
      ['Cellfie Mobile', ['4G']]
    ], georgiaRates),
    country('germany', 'Germany', [
      ['Telefonica (O2 / E-Plus)', ['4G']],
      ['T-Mobile', ['4G']],
      ['Vodafone (D2 GmbH)', ['4G']]
    ], germanyRates)
  ];

  var packs = [
    { id: '500mb', sort: 1, volume: '500MB', price: '10 AZN', priceNum: 10, validity: '3 days' },
    { id: '2gb', sort: 2, volume: '2GB', price: '20 AZN', priceNum: 20, validity: '10 days' },
    { id: '5gb', sort: 3, volume: '5GB', price: '50 AZN', priceNum: 50, validity: '30 days' },
    { id: '10gb', sort: 4, volume: '10GB', price: '75 AZN', priceNum: 75, validity: '30 days' }
  ];

  var supportedOperators = [
    { country: 'Turkiye', operator: 'Turkcell', networks: '2G / 3G / LTE' },
    { country: 'Turkiye', operator: 'Turk Telekom', networks: '2G / 3G / LTE' },
    { country: 'Turkiye', operator: 'Vodafone', networks: '2G / 3G / LTE' },
    { country: 'Georgia', operator: 'Veon Georgia (Mobitel / Beeline)', networks: '2G / 3G / LTE' },
    { country: 'Georgia', operator: 'Magticom', networks: '2G / 3G / LTE' },
    { country: 'Georgia', operator: 'Cellfie Mobile', networks: '3G / LTE' },
    { country: 'Georgia', operator: 'Silknet (Geocell)', networks: '2G / 3G / LTE' },
    { country: 'Germany', operator: 'T-Mobile', networks: '2G / LTE' },
    { country: 'Germany', operator: 'Vodafone (D2 GmbH)', networks: '2G / LTE' },
    { country: 'Germany', operator: 'Telefonica (O2 / E-Plus)', networks: '2G / LTE' }
  ];

  var howToRoaming = [
    { step: '1', title: 'Get destination information', body: 'Search for the destination country and review the available operators and prices before travelling.' },
    { step: '2', title: 'Activate roaming', body: 'Make sure roaming is enabled for both the corporate number and the device.' },
    { step: '3', title: 'Activate an internet pack', body: 'Buy a roaming internet pack before or during the trip to keep the employee online abroad.' }
  ];

  var beforeTravel = [
    'Confirm that the corporate account has no outstanding balance. Balance can be checked with an empty SMS to 650 or BALANS to 2525.',
    'Ask the company contact person to activate roaming for the number.',
    'Enable data roaming in the device settings before connection is needed.'
  ];

  var uponArrival = [
    'Read the welcome SMS from Azercell and select an operator manually when pack compatibility or pricing makes this preferable.',
    'Verify that roaming is enabled on both the SIM line and the device.',
    'Disable automatic photo, video, operating-system and application downloads to control usage.',
    'If mobile data does not work, enable 3G and set the APN to INTERNET; where needed, switch from 4G to 3G to connect to a supported operator.'
  ];

  var additionalInfo = [
    {
      question: 'How can I activate roaming?',
      answer: 'Send START to 8808. Each SMS to 8808 costs 0.01 AZN. Corporate number owners and subscribers with Individual entrepreneur status can also request activation through the relevant written form or support.azercell.com.'
    },
    {
      question: 'How can I check the balance?',
      answer: 'Corporate subscribers can send BALANS to 2525 or dial *100#YES. Each SMS to 2525 costs 0.01 AZN, VAT included.'
    },
    {
      question: 'How can I call Customer Care while roaming?',
      answer: 'Postpaid subscribers can call (+99450) 605 00 00. The first 45 minutes are free; further time is charged at 0.70 AZN per minute, VAT included, with one-second billing.'
    },
    {
      question: 'Current price notice',
      answer: 'The 10GB roaming internet pack has cost 75 AZN since 22 December 2025.'
    }
  ];

  var rateReading = [
    'All prices are shown in AZN.',
    'Call rates are billed in 60-second intervals on the three selected country pages.',
    'Pay-as-you-go internet is billed in 30KB intervals on the three selected country pages.',
    'Depending on the partner network, 4G may appear as LTE on the device.'
  ];

  var packRules = [
    'A new roaming pack cannot be purchased while internet data remains in the active roaming pack.',
    'Usage inside a roaming internet pack is calculated in 1KB intervals.',
    'If the included volume expires during a data session, further use is charged according to the current tariff.',
    'If the subscriber line is closed unilaterally or bilaterally, use of the roaming internet pack stops automatically.',
    'The 10GB pack price has been 75 AZN since 22 December 2025.'
  ];

  function getSection(id) {
    return sections.find(function (item) { return item.id === id; }) || null;
  }

  function getCountry(id) {
    return countries.find(function (item) { return item.id === id; }) || null;
  }

  function searchCountries(query) {
    var value = String(query || '').trim().toLowerCase();
    if (!value) return countries.slice();
    return countries.filter(function (item) {
      return item.name.toLowerCase().indexOf(value) !== -1 || item.id.indexOf(value) !== -1;
    });
  }

  var data = {
    KABINETIM: KABINETIM,
    SUPPORT: SUPPORT,
    ONLINE_PAYMENT: ONLINE_PAYMENT,
    SOURCE_ROAMING: SOURCE_ROAMING,
    SOURCE_PACKS: SOURCE_PACKS,
    routes: routes,
    sections: sections,
    countries: countries,
    topCountries: ['turkiye', 'georgia', 'germany'],
    packs: packs,
    supportedOperators: supportedOperators,
    howToRoaming: howToRoaming,
    beforeTravel: beforeTravel,
    uponArrival: uponArrival,
    additionalInfo: additionalInfo,
    rateReading: rateReading,
    packRules: packRules,
    getSection: getSection,
    getCountry: getCountry,
    searchCountries: searchCountries
  };

  global.BusinessRoamingData = data;
  global.RoamingData = data;
})(window);
