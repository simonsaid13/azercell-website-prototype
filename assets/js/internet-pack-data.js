/* ==========================================================================
   Azercell HTML Prototype — mobile internet pack catalogue (B2C)
   Prices and names from Azercell_Database_B2C.md. Activation SMS to 2525.
   ========================================================================== */

(function (global) {
  'use strict';

  var KABINETIM = 'https://kabinetim.azercell.com/my/login';

  var categories = [
    {
      id: 'monthly',
      label: 'High-volume / Monthly',
      path: '/tariffs/internet/monthly/',
      sort: 1,
      hero: {
        eyebrow: 'High-volume / Monthly',
        title: 'High-volume internet packages',
        body: 'Buy data once and use it for 28 or 30 days. Stack monthly add-ons on your current mobile tariff.'
      },
      featuredPackId: 'monthly-12gb',
      volumeFilters: [
        { value: 'all', label: 'All offers' },
        { value: '30-50', label: '30 – 50 GB' }
      ]
    },
    {
      id: 'weekly',
      label: 'Weekly',
      path: '/tariffs/internet/weekly/',
      sort: 2,
      hero: {
        eyebrow: 'Weekly',
        title: 'Weekly internet pack',
        body: 'Mid-commitment data for a busy week — one purchase, seven days of use.'
      },
      featuredPackId: 'weekly-2gb',
      volumeFilters: [{ value: 'all', label: 'All offers' }]
    },
    {
      id: 'daily',
      label: 'Daily',
      path: '/tariffs/internet/daily/',
      sort: 3,
      hero: {
        eyebrow: 'Daily',
        title: 'Daily internet packs',
        body: 'Low-commitment data with 24-hour validity. Daily packs auto-renew when your balance allows.'
      },
      featuredPackId: 'daily-1_5gb',
      volumeFilters: [
        { value: 'all', label: 'All offers' },
        { value: '60-500', label: '60 – 500 MB' }
      ]
    },
    {
      id: 'unlimited',
      label: 'Unlimited',
      path: '/tariffs/internet/unlimited/',
      sort: 4,
      hero: {
        eyebrow: 'Unlimited',
        title: 'Unlimited internet packs',
        body: 'Short unlimited-speed bursts when you need maximum throughput for streaming or downloads.'
      },
      featuredPackId: 'unlimited-1h',
      volumeFilters: [{ value: 'all', label: 'All offers' }]
    }
  ];

  var packs = [
    {
      id: 'monthly-3gb',
      category: 'monthly',
      sort: 1,
      name: 'Monthly 3GB',
      data: '3GB',
      dataMb: 3072,
      price: '9 AZN',
      priceNum: 9,
      validity: { prepaid: '28 days', postpaid: '30 days' },
      keyword: '3',
      shortCode: '2525',
      volumeBand: 'all',
      usageHints: [
        { activity: 'Video calls', duration: '~6 hours' },
        { activity: 'Social networking', duration: '~32 hours' },
        { activity: 'Music streaming', duration: '~300 hours' }
      ],
      details: 'High-volume monthly data add-on. Valid 28 days for prepaid subscribers and 30 days for postpaid subscribers. Stacks on your active mobile tariff.',
      autoRenew: false
    },
    {
      id: 'monthly-6gb',
      category: 'monthly',
      sort: 2,
      name: 'Monthly 6GB',
      data: '6GB',
      dataMb: 6144,
      price: '12 AZN',
      priceNum: 12,
      validity: { prepaid: '28 days', postpaid: '30 days' },
      keyword: '6',
      shortCode: '2525',
      volumeBand: 'all',
      usageHints: [
        { activity: 'Video streaming', duration: '~6 hours' },
        { activity: 'Video calls', duration: '~15 hours' },
        { activity: 'Social networking', duration: '~80 hours' }
      ],
      details: 'High-volume monthly data add-on. Valid 28 days for prepaid subscribers and 30 days for postpaid subscribers.',
      autoRenew: false
    },
    {
      id: 'monthly-12gb',
      category: 'monthly',
      sort: 3,
      name: 'Monthly 12GB',
      data: '12GB',
      dataMb: 12288,
      price: '19 AZN',
      priceNum: 19,
      validity: { prepaid: '28 days', postpaid: '30 days' },
      keyword: '12',
      shortCode: '2525',
      volumeBand: 'all',
      usageHints: [
        { activity: 'Video calls', duration: '~30 hours' },
        { activity: 'Social networking', duration: '~160 hours' },
        { activity: 'Online gaming', duration: '~300 hours' }
      ],
      details: 'High-volume monthly data add-on. Valid 28 days for prepaid subscribers and 30 days for postpaid subscribers.',
      autoRenew: false
    },
    {
      id: 'monthly-30gb',
      category: 'monthly',
      sort: 4,
      name: 'Monthly 30GB',
      data: '30GB',
      dataMb: 30720,
      price: '29 AZN',
      priceNum: 29,
      validity: { prepaid: '28 days', postpaid: '30 days' },
      keyword: '30',
      shortCode: '2525',
      volumeBand: '30-50',
      usageHints: [
        { activity: 'Video streaming', duration: '~36 hours' },
        { activity: 'Video calls', duration: '~90 hours' }
      ],
      details: 'High-volume monthly data add-on. Valid 28 days for prepaid subscribers and 30 days for postpaid subscribers.',
      autoRenew: false
    },
    {
      id: 'monthly-56gb',
      category: 'monthly',
      sort: 5,
      name: 'Monthly 56GB',
      data: '56GB',
      dataMb: 57344,
      price: '39 AZN',
      priceNum: 39,
      validity: { prepaid: '28 days', postpaid: '30 days' },
      keyword: '56',
      shortCode: '2525',
      volumeBand: '30-50',
      usageHints: [
        { activity: 'Video streaming', duration: '~92 hours' },
        { activity: 'Video calls', duration: '~153 hours' }
      ],
      details: 'High-volume monthly data add-on. Valid 28 days for prepaid subscribers and 30 days for postpaid subscribers.',
      autoRenew: false
    },
    {
      id: 'weekly-2gb',
      category: 'weekly',
      sort: 1,
      name: 'Weekly 2GB',
      data: '2GB',
      dataMb: 2048,
      price: '4 AZN',
      priceNum: 4,
      validity: { prepaid: '7 days', postpaid: '7 days' },
      keyword: '20',
      shortCode: '2525',
      volumeBand: 'all',
      usageHints: [
        { activity: 'Video calls', duration: '~4 hours' },
        { activity: 'Social networking', duration: '~21 hours' },
        { activity: 'Music streaming', duration: '~200 hours' }
      ],
      details: 'Mid-commitment weekly data add-on. Valid 7 days from activation. One-time purchase.',
      autoRenew: false
    },
    {
      id: 'daily-1_5gb',
      category: 'daily',
      sort: 1,
      name: 'Daily 1.5GB',
      data: '1.5GB',
      dataMb: 1536,
      price: '1.99 AZN',
      priceNum: 1.99,
      validity: { prepaid: '24 hours with auto-renewal', postpaid: '24 hours with auto-renewal' },
      keyword: 'gun',
      shortCode: '2525',
      volumeBand: 'all',
      usageHints: [
        { activity: 'Video calls', duration: '~2 hours' },
        { activity: 'Social networking', duration: '~9 hours' }
      ],
      details: 'Low-commitment daily data add-on. Valid 24 hours with auto-renewal when your balance allows.',
      autoRenew: true
    },
    {
      id: 'daily-350mb',
      category: 'daily',
      sort: 2,
      name: 'Daily 350MB',
      data: '350MB',
      dataMb: 350,
      price: '0.99 AZN',
      priceNum: 0.99,
      validity: { prepaid: '24 hours with auto-renewal', postpaid: '24 hours with auto-renewal' },
      keyword: '350',
      shortCode: '2525',
      volumeBand: '60-500',
      usageHints: [
        { activity: 'Social networking', duration: '~2 hours' },
        { activity: 'Web surfing', duration: '~7 hours' },
        { activity: 'Chat', duration: '~7 hours' }
      ],
      details: 'Entry-level daily data add-on. Valid 24 hours with auto-renewal when your balance allows.',
      autoRenew: true
    },
    {
      id: 'unlimited-1h',
      category: 'unlimited',
      sort: 1,
      name: 'Unlimited 1 hour',
      data: 'Unlimited',
      dataMb: 0,
      price: '0.99 AZN',
      priceNum: 0.99,
      validity: { prepaid: '1 hour', postpaid: '1 hour' },
      keyword: 'S',
      shortCode: '2525',
      volumeBand: 'all',
      usageHints: [
        { activity: 'Unlimited internet', duration: '1 hour at unlimited speed' }
      ],
      details: 'Unlimited-speed short burst. Speed: unlimited for one hour from activation.',
      autoRenew: false
    },
    {
      id: 'unlimited-3h',
      category: 'unlimited',
      sort: 2,
      name: 'Unlimited 3 hours',
      data: 'Unlimited',
      dataMb: 0,
      price: '1.99 AZN',
      priceNum: 1.99,
      validity: { prepaid: '3 hours', postpaid: '3 hours' },
      keyword: '3S',
      shortCode: '2525',
      volumeBand: 'all',
      usageHints: [
        { activity: 'Unlimited internet', duration: '3 hours at unlimited speed' }
      ],
      details: 'Unlimited-speed short burst. Speed: unlimited for three hours from activation.',
      autoRenew: false
    }
  ];

  var crossSellByCategory = {
    monthly: {
      title: 'Buying extra data every month?',
      body: 'If you keep topping up with monthly add-ons, a bigger mobile plan may give you more data plus calls and SMS for similar money.',
      actions: [
        { label: 'Compare mobile plans', href: '/tariffs/compare/', variant: 'primary' },
        { label: 'See DigiMax 25GB', href: '/tariffs/mobile/prepaid/digimax/' }
      ],
      note: 'Need data only? The Data+ tariff offers the same GB tiers as monthly packs without voice calls.'
    },
    weekly: {
      title: 'Need data every week?',
      body: 'DigiMax Weekly gives 1GB plus calls and SMS for 4 AZN over 7 days — similar spend, more included.',
      actions: [
        { label: 'See DigiMax Weekly', href: '/tariffs/mobile/prepaid/digimax/', variant: 'primary' },
        { label: 'Compare mobile plans', href: '/tariffs/compare/' }
      ]
    },
    daily: {
      title: 'Topping up daily?',
      body: 'DigiMax Daily or Weekly packs bundle data with calls and SMS. A fixed plan may cost less than repeated daily add-ons.',
      actions: [
        { label: 'See DigiMax packs', href: '/tariffs/mobile/prepaid/digimax/', variant: 'primary' },
        { label: 'Compare mobile plans', href: '/tariffs/compare/' }
      ]
    },
    unlimited: {
      title: 'Using unlimited bursts often?',
      body: 'For sustained heavy use, a weekly pack or a DigiMax plan usually works out better than repeated hourly bursts.',
      actions: [
        { label: 'See weekly packs', href: '/tariffs/internet/weekly/', variant: 'primary' },
        { label: 'See DigiMax Weekly', href: '/tariffs/mobile/prepaid/digimax/' }
      ]
    },
    hub: {
      title: 'Buying extra data every month?',
      body: 'If you keep topping up with add-on packs, a bigger mobile plan may give you more data — plus calls and SMS — for similar money.',
      actions: [
        { label: 'Compare mobile plans', href: '/tariffs/compare/', variant: 'primary' },
        { label: 'See data-heavy plans', href: '/tariffs/mobile/?type=prepaid' }
      ],
      note: 'Internet packs stack on your active tariff. Activation happens in Kabinetim or via SMS — not on this website.'
    }
  };

  var sharedFaq = [
    {
      question: 'How do I activate an internet pack?',
      answer: 'Send the SMS keyword shown on each pack to 2525, or activate in the Kabinetim app. The cost of one SMS to 2525 is 0.01 AZN. This website shows instructions only — activation always happens outside the site.'
    },
    {
      question: 'Do internet packs stack on my tariff?',
      answer: 'Yes. Internet packs add data on top of your active mobile tariff. Priority rules between tariff bonuses and add-on packs depend on your plan — see your tariff page for details.'
    },
    {
      question: 'Why is validity different for prepaid and postpaid?',
      answer: 'Monthly packs last 28 days on prepaid lines and 30 days on postpaid lines. Daily packs renew every 24 hours when auto-renewal is enabled and your balance allows.'
    }
  ];

  var categoryFaq = {
    monthly: [
      {
        question: 'Can I buy the same monthly pack again before it expires?',
        answer: 'You can activate another monthly pack when needed. Unused data from the previous pack follows the standard priority rules for your tariff.'
      }
    ],
    daily: [
      {
        question: 'What does auto-renewal mean on daily packs?',
        answer: 'Daily packs renew every 24 hours when your balance has enough funds. If funds are insufficient, renewal waits until you top up.'
      }
    ],
    unlimited: [
      {
        question: 'Is speed truly unlimited during the session?',
        answer: 'Yes — unlimited packs provide unlimited speed for the stated duration (1 or 3 hours). The session ends when the time limit is reached.'
      }
    ]
  };

  function getCategory(id) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id === id) return categories[i];
    }
    return null;
  }

  function getPacksByCategory(categoryId) {
    return packs
      .filter(function (p) { return p.category === categoryId; })
      .sort(function (a, b) { return a.sort - b.sort; });
  }

  function getPack(id) {
    for (var i = 0; i < packs.length; i++) {
      if (packs[i].id === id) return packs[i];
    }
    return null;
  }

  function getFeaturedPacks() {
    return categories.map(function (cat) {
      return getPack(cat.featuredPackId);
    }).filter(Boolean);
  }

  function getCrossSell(key) {
    return crossSellByCategory[key] || crossSellByCategory.hub;
  }

  function getFaq(categoryId) {
    var extra = categoryFaq[categoryId] || [];
    return extra.concat(sharedFaq);
  }

  global.InternetPackData = {
    KABINETIM: KABINETIM,
    categories: categories,
    packs: packs,
    getCategory: getCategory,
    getPacksByCategory: getPacksByCategory,
    getPack: getPack,
    getFeaturedPacks: getFeaturedPacks,
    getCrossSell: getCrossSell,
    getFaq: getFaq
  };
})(window);
