/* ==========================================================================
   Azercell HTML Prototype — tariff detail page content (source of truth)
   Phase 1: DigiMax — content from live azercell.com + Azercell_Database_B2C.md
   All 6 mobile tariffs for detail pages.
   ========================================================================== */

(function (global) {
  'use strict';

  var DIGIMAX = {
    id: 'digimax',
    hero: {
      eyebrow: 'Prepaid',
      title: 'DigiMax',
      body: 'With your rhythm! Prepaid packs with internet, countrywide calls and SMS. Pick a pack to see what is included and how to activate.',
      media: 'DigiMax',
      badge: 'Popular'
    },
    activateHref: 'https://kabinetim.azercell.com/my/login',
    activateLabel: 'Activate in Kabinetim',
    compareId: 'digimax',
    tiers: [
      {
        id: 'd1',
        label: 'DigiMax Daily',
        price: '1 AZN',
        validityGroup: '1 day',
        validity: 'Usage period 1 day.',
        internet: '300MB',
        calls: '30 min countrywide',
        sms: '15 countrywide',
        extras: '—',
        keyword: 'D1',
        ussd: '*750*4*200#YES',
        activation: 'Send "D1" to 7575',
        features: ['300MB internet', '30 min countrywide calls', '15 countrywide SMS']
      },
      {
        id: 'd7',
        label: 'DigiMax Weekly',
        price: '4 AZN',
        validityGroup: '7 days',
        validity: 'Usage period 7 days.',
        internet: '1GB',
        calls: '100 min countrywide',
        sms: '50 countrywide',
        extras: '—',
        keyword: 'D7',
        ussd: '*750*4*201#YES',
        activation: 'Send "D7" to 7575',
        features: ['1GB internet', '100 min countrywide calls', '50 countrywide SMS']
      },
      {
        id: 'd3',
        label: 'DigiMax 3GB',
        price: '8 AZN',
        validityGroup: '14 days',
        validity: 'Usage period 14 days.',
        internet: '3GB',
        calls: '200 min countrywide',
        sms: '100 countrywide',
        extras: '—',
        keyword: 'D3',
        ussd: '*750*4*203#YES',
        activation: 'Send "D3" to 7575',
        features: ['3GB internet', '200 min countrywide calls', '100 countrywide SMS']
      },
      {
        id: 'd5',
        label: 'DigiMax 5GB',
        price: '12 AZN',
        validityGroup: '28 days',
        validity: 'Usage period 28 days.',
        internet: '5GB',
        calls: '300 min countrywide',
        sms: '150 countrywide',
        social: '1GB',
        extras: '—',
        keyword: 'D5',
        ussd: '*750*4*205#YES',
        activation: 'Send "D5" to 7575',
        features: ['5GB internet', '300 min countrywide calls', '150 countrywide SMS', '1GB social media']
      },
      {
        id: 'd10',
        label: 'DigiMax 10GB',
        price: '18 AZN',
        validityGroup: '28 days',
        validity: 'Usage period 28 days.',
        internet: '10GB',
        calls: '600 min countrywide',
        sms: '300 countrywide',
        social: '1GB',
        whatsapp: '1GB',
        extras: '—',
        keyword: 'D10',
        ussd: '*750*4*210#YES',
        activation: 'Send "D10" to 7575',
        features: ['10GB internet', '600 min countrywide calls', '300 countrywide SMS', '1GB WhatsApp', '1GB social media (Instagram, Facebook, Messenger)']
      },
      {
        id: 'd25',
        label: 'DigiMax 25GB',
        price: '30 AZN',
        validityGroup: '28 days',
        validity: 'Usage period 28 days.',
        internet: '25GB',
        calls: '1500 min countrywide',
        sms: '500 countrywide',
        social: '3GB',
        whatsapp: '3GB',
        extras: '—',
        keyword: 'D25',
        ussd: '*750*4*225#YES',
        activation: 'Send "D25" to 7575',
        features: ['25GB internet', '1500 min countrywide calls', '500 countrywide SMS', '3GB WhatsApp', '3GB social media (Instagram, TikTok, YouTube, Facebook, Messenger)']
      }
    ],
    activation: {
      shortCode: '7575',
      smsCost: '0.01 AZN per request',
      intro: 'Send the keyword for your pack to 7575, dial the USSD code, or activate in Kabinetim. The subscription fee is deducted from your balance and bonuses are added immediately.',
      keywords: [
        { keyword: 'D1', pack: 'DigiMax Daily' },
        { keyword: 'D7', pack: 'DigiMax Weekly' },
        { keyword: 'D3', pack: 'DigiMax 3GB' },
        { keyword: 'D5', pack: 'DigiMax 5GB' },
        { keyword: 'D10', pack: 'DigiMax 10GB' },
        { keyword: 'D25', pack: 'DigiMax 25GB' }
      ],
      ussdCodes: [
        { code: '*750*4*200#YES', pack: 'DigiMax Daily' },
        { code: '*750*4*201#YES', pack: 'DigiMax Weekly' },
        { code: '*750*4*203#YES', pack: 'DigiMax 3GB' },
        { code: '*750*4*205#YES', pack: 'DigiMax 5GB' },
        { code: '*750*4*210#YES', pack: 'DigiMax 10GB' },
        { code: '*750*4*225#YES', pack: 'DigiMax 25GB' }
      ],
      bonusCheck: [
        'Send an empty SMS to 2112 (0.10 AZN per SMS)',
        'Dial *111*1*7#YES (0.10 AZN per USSD message)',
        'Check in the Azercell mobile app (download via *110#YES)'
      ]
    },
    overageRates: {
      title: 'Rates after bonuses are used up',
      intro: 'If bonuses within your pack are exhausted but the pack is still valid, or if there are not enough funds to renew:',
      items: [
        { label: 'Countrywide calls', value: '0.08 AZN per minute' },
        { label: 'Internet', value: '0.05 AZN per MB (512KB billing interval)' },
        { label: 'SMS countrywide', value: '0.10 AZN' },
        { label: 'SMS international', value: '0.25 AZN' }
      ]
    },
    internetPacks: [
      { name: 'Monthly 3GB', price: '9 AZN', body: 'High-volume monthly add-on. Stack on your current tariff.', action: { label: 'Monthly packs', href: '/tariffs/internet/monthly/' } },
      { name: 'Monthly 6GB', price: '12 AZN', body: 'High-volume monthly add-on.', action: { label: 'Monthly packs', href: '/tariffs/internet/monthly/' } },
      { name: 'Monthly 12GB', price: '19 AZN', body: 'High-volume monthly add-on.', action: { label: 'Monthly packs', href: '/tariffs/internet/monthly/' } }
    ],
    faq: [
      {
        question: 'Who can subscribe to the "DigiMax" tariff packages?',
        answer: 'Any prepaid line subscriber can join the DigiMax tariff packages.'
      },
      {
        question: 'How to activate the tariff package?',
        paragraphs: [
          'Send the relevant keyword to 7575. The cost of 1 SMS sent to 7575 is 0.01 AZN.',
          'You can also dial the USSD code for your pack, or activate in Kabinetim.',
          'When connecting, the subscription fee is deducted from the account and bonuses are added to the balance.'
        ],
        list: [
          'D1 — DigiMax Daily',
          'D7 — DigiMax Weekly',
          'D3 — DigiMax 3GB',
          'D5 — DigiMax 5GB',
          'D10 — DigiMax 10GB',
          'D25 — DigiMax 25GB',
          '*750*4*200#YES — DigiMax Daily',
          '*750*4*201#YES — DigiMax Weekly',
          '*750*4*203#YES — DigiMax 3GB',
          '*750*4*205#YES — DigiMax 5GB',
          '*750*4*210#YES — DigiMax 10GB',
          '*750*4*225#YES — DigiMax 25GB'
        ]
      },
      {
        question: 'How long is the tariff package valid for?',
        paragraphs: [
          'The validity period depends on the selected package. At the end of this period, if there are enough funds on the balance, the tariff pack will be automatically renewed. If there are not sufficient funds, the system will try to renew the tariff until there is enough money on the balance.',
          'DigiMax Daily: the tariff can be activated at any time and bonuses are provided immediately. The tariff is renewed within 48 hours after the first connection. In subsequent periods, the tariff is automatically renewed every night after 00:00 — regardless of update time, the next renewal is carried out after midnight.'
        ]
      },
      {
        question: 'How to get information about bonuses?',
        list: [
          'Send an empty SMS to 2112 (0.10 AZN per SMS)',
          'Dial *111*1*7#YES (0.10 AZN per USSD message)',
          'Via the Azercell mobile application (download by dialing *110#YES)'
        ]
      },
      {
        question: 'What volume of internet is provided for apps?',
        paragraphs: [
          'DigiMax 10GB: 1GB for WhatsApp and an additional 1GB for Instagram, Facebook and Facebook Messenger.',
          'DigiMax 25GB: 3GB for WhatsApp and an additional 3GB for Instagram, TikTok, YouTube, Facebook and Facebook Messenger.',
          'When social traffic is exhausted, the subscriber can use other internet resources available on the balance.'
        ]
      },
      {
        question: 'When connecting to DigiMax, is the current internet balance reset?',
        paragraphs: [
          'When switching to DigiMax, the subscription fee is debited and tariff bonuses are added to the balance. Bonuses are valid for the duration of tariff activation. After expiry, existing bonuses are not transferred and are reset.',
          'The package can be renewed no more than once a day (24 hours). To update the pack, send the keyword to 7575 or use the USSD code. Bonuses of the existing package are canceled after renewal.'
        ]
      },
      {
        question: 'How is the service fee calculated after bonuses are exhausted?',
        list: [
          '1 countrywide call minute — 0.08 AZN',
          '1 MB internet — 0.05 AZN',
          '1 SMS — 0.10 AZN (international: 0.25 AZN)'
        ]
      },
      {
        question: 'How to calculate the service fee if there are not enough funds to renew?',
        paragraphs: ['If there are insufficient funds for the next subscription and no other internet packages are available:'],
        list: [
          'Countrywide calls — 0.08 AZN per minute',
          'Internet — 0.05 AZN per MB',
          'SMS — 0.10 AZN (international SMS: 0.25 AZN)'
        ]
      },
      {
        question: 'When DigiMax subscribers use other internet packages, which pack gets priority?',
        paragraphs: [
          'DigiMax 5GB, 10GB, 25GB: internet packages are given priority in all cases, except the 56GB pack.',
          'DigiMax Weekly and 3GB: priority to weekly and hourly internet packages first; for 28-day packages, preference shifts to DigiMax Weekly and 3GB.',
          'DigiMax Daily: priority to daily and hourly internet packages first; for 28-day and weekly packages, preference goes to DigiMax Daily.'
        ]
      },
      {
        question: 'How to renew the DigiMax tariff package if the internet runs out?',
        paragraphs: [
          'It is possible to reactivate the internet pack after the bonus expires. Internet without a pack costs 0.05 AZN per MB. The calculation interval for internet is 512KB.'
        ]
      },
      {
        question: 'How many seconds is the billing interval for calls?',
        answer: 'The billing interval for calls is 60 seconds.'
      },
      {
        question: 'Are bonuses reset when replacing the DigiMax tariff package?',
        answer: 'When switching from one DigiMax tariff package to another, the bonuses of the current package are canceled.'
      },
      {
        question: 'For which calls cannot the minutes provided within the tariff be used?',
        answer: 'Bonus minutes cannot be used for roaming, international calls, special coded (dialed with *) and short numbers.'
      },
      {
        question: 'Is there a charge for sending a request to 7575?',
        answer: 'For each request sent to 7575, 0.01 AZN is deducted from the balance.'
      },
      {
        question: 'How is the cost of in-tariff SMS calculated?',
        answer: '1 countrywide SMS is 0.10 AZN. 1 international SMS is 0.25 AZN.'
      },
      {
        question: 'How to get detailed information about the DigiMax tariff?',
        answer: 'Send "D" to the short number 7575.'
      },
      {
        question: 'When are bonuses added to the balance?',
        answer: 'Bonuses are transferred to the balance immediately after successfully joining or renewing the tariff, and can be updated at different times.'
      },
      {
        question: 'From which balance is social network traffic deducted?',
        answer: 'Priority is given first to traffic intended for social networks, then to the main package. After the main package is exhausted and with no active internet package, the subscriber is redirected to a special page with links.'
      },
      {
        question: 'How to change the tariff package?',
        answer: 'Tariff changes are done via Kabinetim, by sending the tariff name to 650, or in an Azercell store — not on this website.'
      },
      {
        question: 'What should be done to keep the mobile number line active?',
        answer: 'Constantly renew the tariff package used. For example, paying for DigiMax 10GB keeps the number bilaterally active for the entire 28-day pack period.'
      },
      {
        question: 'What happens when switching to another tariff package?',
        answer: 'Switching to another tariff package will cancel the previous tariff and bonuses.'
      },
      {
        question: 'Which messages cannot be sent using the SMS provided within the tariff?',
        answer: 'Bonus SMS cannot be used for international numbers, special-coded numbers (starting with *), or short numbers.'
      }
    ],
    legal: 'All prices VAT inclusive. Tariff allowances are for personal use only.',
    crossLinks: [
      { label: 'Compare DigiMax with other plans', href: '/compare/?billing=prepaid', variant: 'primary' },
      { label: 'All mobile tariffs', href: '/tariffs/mobile/' }
    ]
  };

  var BY_ID = { digimax: DIGIMAX };

  function mergeOthers(others) {
    if (!others) return;
    Object.keys(others).forEach(function (key) {
      BY_ID[key] = others[key];
    });
  }

  if (global.TariffDetailDataOthers) {
    mergeOthers(global.TariffDetailDataOthers);
  }

  function byId(id) {
    return BY_ID[id] || null;
  }

  function tierIndex(tariff, tierId) {
    if (!tariff || !tariff.tiers) return 0;
    for (var i = 0; i < tariff.tiers.length; i += 1) {
      if (tariff.tiers[i].id === tierId) return i;
    }
    var n = parseInt(tierId, 10);
    return isNaN(n) ? 0 : Math.max(0, Math.min(n, tariff.tiers.length - 1));
  }

  global.TariffDetailData = {
    byId: byId,
    tierIndex: tierIndex,
    mergeOthers: mergeOthers
  };
})(window);
