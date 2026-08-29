/* ==========================================================================
   Azercell HTML Prototype — B2B roaming content
   Source: Azercell_Business_Roaming_Content.docx (three-country prototype scope)
   ========================================================================== */

(function (global) {
  'use strict';

  var KABINETIM = 'https://kabinetim.azercell.com/';
  var SUPPORT = 'https://support.azercell.com/';
  var ONLINE_PAYMENT = 'https://www.azercell.com/en/personal/payment-and-balance/online-payment.html';

  var routes = {
    hub: '/business/mobile/roaming/',
    countries: '/business/mobile/roaming/countries-and-prices/',
    packs: '/business/mobile/roaming/internet-packs/'
  };

  function countryPath(id) {
    return routes.countries + id + '/';
  }

  var countries = [
    {
      id: 'turkiye',
      name: 'Turkiye',
      route: countryPath('turkiye'),
      operators: [
        { name: 'Turk Telekom', networks: ['4G'] },
        { name: 'Turkcell', networks: ['4G'] },
        { name: 'Vodafone', networks: ['4G'] }
      ],
      rates: {
        outgoingWithin: '1.00 AZN/min',
        outgoingAzerbaijan: '1.00 AZN/min',
        outgoingOther: '1.00 AZN/min',
        incoming: '0.50 AZN/min',
        internet: '0.99 AZN/MB',
        sms: '0.15 AZN'
      }
    },
    {
      id: 'georgia',
      name: 'Georgia',
      route: countryPath('georgia'),
      operators: [
        { name: 'Magticom', networks: ['4G'] },
        { name: 'Silknet (Geocell)', networks: ['4G'] },
        { name: 'Cellfie Mobile', networks: ['4G'] }
      ],
      rates: {
        outgoingWithin: '0.80 AZN/min',
        outgoingAzerbaijan: '0.80 AZN/min',
        outgoingOther: '0.80 AZN/min',
        incoming: '0.50 AZN/min',
        internet: '0.99 AZN/MB',
        sms: '0.10 AZN'
      }
    },
    {
      id: 'germany',
      name: 'Germany',
      route: countryPath('germany'),
      operators: [
        { name: 'Telefonica (O2 / E-Plus)', networks: ['4G'] },
        { name: 'T-Mobile', networks: ['4G'] },
        { name: 'Vodafone (D2 GmbH)', networks: ['4G'] }
      ],
      rates: {
        outgoingWithin: '1.50 AZN/min',
        outgoingAzerbaijan: '1.50 AZN/min',
        outgoingOther: '1.50 AZN/min',
        incoming: '0.50 AZN/min',
        internet: '0.99 AZN/MB',
        sms: '0.20 AZN'
      }
    }
  ];

  var packs = [
    { id: '500mb', volume: '500MB', price: '10 AZN', validity: '3 days', keyword: '500', ussd: '*100*500#YES' },
    { id: '2gb', volume: '2GB', price: '20 AZN', validity: '10 days', keyword: '2', ussd: '*100*2#YES' },
    { id: '5gb', volume: '5GB', price: '50 AZN', validity: '30 days', keyword: '5', ussd: '*100*5#YES' },
    { id: '10gb', volume: '10GB', price: '75 AZN', validity: '30 days', keyword: '10', ussd: '*100*10#YES' }
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

  var beforeTravel = [
    { question: 'Check the corporate balance', answer: 'Send an empty SMS to 650 or BALANS to 2525 before departure.' },
    { question: 'Activate roaming on the number', answer: 'Ask your company contact to enable roaming for the corporate number, or send START to 8808. The SMS costs 0.01 AZN.' },
    { question: 'Prepare the device', answer: 'Enable data roaming. After arrival, read the welcome SMS and select a partner network manually if automatic registration does not work.' }
  ];

  var onArrival = [
    { question: 'The phone does not connect to a network', answer: 'Confirm that roaming is enabled for the line, then select one of the listed partner operators manually.' },
    { question: 'Mobile internet does not work', answer: 'Check that data roaming is on and the APN is INTERNET. If necessary, switch the preferred network from 4G to 3G.' },
    { question: 'How should calls be dialled?', answer: 'Use international format with the country code. Disable automatic downloads to avoid unexpected data use.' }
  ];

  var packRules = [
    { question: 'How can a pack be activated?', answer: 'Activate it in Kabinetim, send the pack keyword to 2525, or use the USSD code shown on the pack card.' },
    { question: 'Can another pack be purchased immediately?', answer: 'A new roaming internet pack cannot be purchased while active data remains in the current pack.' },
    { question: 'What happens when the data is exhausted?', answer: 'Further usage is charged according to the current roaming tariff. Pack usage is calculated in 1KB increments.' },
    { question: 'What happens if the line is closed?', answer: 'Closing the line stops the active roaming internet pack.' }
  ];

  function getCountry(id) {
    return countries.find(function (country) { return country.id === id; }) || null;
  }

  global.BusinessRoamingData = {
    KABINETIM: KABINETIM,
    SUPPORT: SUPPORT,
    ONLINE_PAYMENT: ONLINE_PAYMENT,
    routes: routes,
    countries: countries,
    packs: packs,
    supportedOperators: supportedOperators,
    beforeTravel: beforeTravel,
    onArrival: onArrival,
    packRules: packRules,
    getCountry: getCountry
  };
})(window);
