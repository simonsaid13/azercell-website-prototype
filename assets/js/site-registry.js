/* ==========================================================================
   Azercell HTML Prototype — registries
   PAGE_REGISTRY drives /sitemap. COMPONENT_REGISTRY drives /components.
   SITE_CHROME holds the shared header and footer content.

   Page tree mirrors Azercell_Sitemap.md. Pages are 'planned' until they are
   actually built; only built pages have an HTML file.
   ========================================================================== */

(function (global) {
  'use strict';

  var BRANCHES = [
    { id: 'b2c', title: 'B2C — Personal' },
    { id: 'b2b', title: 'B2B — Business' },
    { id: 'other', title: 'Other — Corporate / About Us' },
    { id: 'external', title: 'External ecosystem (separate domains)' },
    { id: 'internal', title: 'Internal prototype tools (not public)' }
  ];

  var MOBILE_TARIFF_DETAIL_PATHS = [
    '/tariffs/mobile/prepaid/digimax/',
    '/tariffs/mobile/prepaid/premium-plus/',
    '/tariffs/mobile/prepaid/data-plus/',
    '/tariffs/mobile/prepaid/data/',
    '/tariffs/mobile/prepaid/veteran/',
    '/tariffs/mobile/postpaid/alfa/'
  ];

  var B2B_ROAMING_PATHS = [
    '/business/mobile/roaming/',
    '/business/mobile/roaming/countries-and-prices/',
    '/business/mobile/roaming/countries-and-prices/turkiye/',
    '/business/mobile/roaming/countries-and-prices/georgia/',
    '/business/mobile/roaming/countries-and-prices/germany/',
    '/business/mobile/roaming/internet-packs/'
  ];

  var PERSONAL_CHROME_PATHS = [
    '/',
    '/join-azercell/transfer-number/',
    '/tariffs/mobile/',
    '/tariffs/compare/',
    '/tariffs/mobile/prepaid/archive/',
    '/tariffs/internet/',
    '/tariffs/internet/monthly/',
    '/tariffs/internet/weekly/',
    '/tariffs/internet/daily/',
    '/tariffs/internet/unlimited/',
    '/tariffs/roaming/',
    '/tariffs/roaming/internet-packs/',
    '/tariffs/roaming/travel-packs/',
    '/tariffs/roaming/countries-and-prices/',
    '/planned/'
  ].concat(MOBILE_TARIFF_DETAIL_PATHS);

  /* Fields: path, title, parent, branch, status ('built' | 'planned'),
     links (cross-links to other paths or external URLs), note */
  var PAGE_REGISTRY = [
    /* ---------------- Internal tools ---------------- */
    { path: '/sitemap/', title: 'Sitemap', parent: null, branch: 'internal', status: 'built',
      note: 'Internal tool. Linked from the Personal footer Sitemap item at the user’s request.' },
    { path: '/components/', title: 'Components', parent: null, branch: 'internal', status: 'built',
      note: 'Hidden route. Component library for the CMS block set.' },
    { path: '/planned/', title: 'Planned page placeholder', parent: null, branch: 'internal', status: 'built',
      note: 'Shown when a link points at a page that is not built yet.' },

    /* ---------------- B2C ---------------- */
    { path: '/', title: 'B2C Homepage', parent: null, branch: 'b2c', status: 'built',
      links: ['/tariffs/', '/tariffs/internet/', '/tariffs/roaming/', '/devices/', '/campaigns/',
              '/apps/', '/support/', '/about/', '/business/', 'https://kabinetim.azercell.com/my/login'] },
    { path: '/join-azercell/', title: 'Join Azercell', parent: '/', branch: 'b2c', status: 'planned' },
    { path: '/join-azercell/transfer-number/', title: 'Transfer your number', parent: '/join-azercell/', branch: 'b2c', status: 'built',
      links: ['https://azercellim.com/en/home'] },

    { path: '/tariffs/', title: 'Tariffs and services', parent: '/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/mobile/', title: 'Tariffs', parent: '/tariffs/', branch: 'b2c', status: 'built',
      links: MOBILE_TARIFF_DETAIL_PATHS.concat(['/tariffs/mobile/prepaid/archive/', '/tariffs/internet/', '/tariffs/compare/']) },
    { path: '/tariffs/compare/', title: 'Compare tariffs', parent: '/tariffs/', branch: 'b2c', status: 'built',
      links: MOBILE_TARIFF_DETAIL_PATHS.concat(['/tariffs/mobile/']) },
    { path: '/tariffs/mobile/prepaid/', title: 'Prepaid', parent: '/tariffs/mobile/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/mobile/prepaid/digimax/', title: 'DigiMax', parent: '/tariffs/mobile/prepaid/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/mobile/prepaid/premium-plus/', title: 'Premium+ Prepaid', parent: '/tariffs/mobile/prepaid/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/mobile/prepaid/data-plus/', title: '"Data+" tariff', parent: '/tariffs/mobile/prepaid/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/mobile/prepaid/data/', title: 'Data', parent: '/tariffs/mobile/prepaid/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/mobile/prepaid/veteran/', title: 'Veteran', parent: '/tariffs/mobile/prepaid/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/mobile/prepaid/archive/', title: 'Prepaid tariffs archive', parent: '/tariffs/mobile/prepaid/', branch: 'b2c', status: 'built',
      links: ['/tariffs/mobile/'] },
    { path: '/tariffs/mobile/postpaid/', title: 'Postpaid', parent: '/tariffs/mobile/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/mobile/postpaid/alfa/', title: 'Alfa Plan', parent: '/tariffs/mobile/postpaid/', branch: 'b2c', status: 'built' },

    { path: '/tariffs/services/', title: 'Services', parent: '/tariffs/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/services/payment-and-balance/', title: 'Payment and balance', parent: '/tariffs/services/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/services/call-management/', title: 'Call management', parent: '/tariffs/services/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/services/messages/', title: 'Messages', parent: '/tariffs/services/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/services/zero-balance/', title: '0 balance options', parent: '/tariffs/services/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/services/zero-balance/simcredit/', title: 'SimCredit', parent: '/tariffs/services/zero-balance/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/services/zero-balance/paycell/', title: 'Paycell', parent: '/tariffs/services/zero-balance/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/services/other/', title: 'Other Services', parent: '/tariffs/services/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/services/aicell/', title: 'Aicell', parent: '/tariffs/services/', branch: 'b2c', status: 'planned' },

    { path: '/tariffs/internet/', title: 'Internet', parent: '/tariffs/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/internet/monthly/', title: 'High-volume / Monthly', parent: '/tariffs/internet/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/internet/weekly/', title: 'Weekly', parent: '/tariffs/internet/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/internet/daily/', title: 'Daily', parent: '/tariffs/internet/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/internet/unlimited/', title: 'Unlimited', parent: '/tariffs/internet/', branch: 'b2c', status: 'built' },

    { path: '/tariffs/roaming/', title: 'Roaming', parent: '/tariffs/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/roaming/countries-and-prices/', title: 'Countries and prices', parent: '/tariffs/roaming/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/roaming/internet-packs/', title: 'Roaming internet packs', parent: '/tariffs/roaming/', branch: 'b2c', status: 'built' },
    { path: '/tariffs/roaming/travel-packs/', title: 'Travel packs (tourist tariffs)', parent: '/tariffs/roaming/', branch: 'b2c', status: 'built' },

    { path: '/tariffs/esim/', title: 'eSIM', parent: '/tariffs/', branch: 'b2c', status: 'planned',
      links: ['https://azercellim.com/en/home'] },
    { path: '/tariffs/5g/', title: 'Azercell 5G', parent: '/tariffs/', branch: 'b2c', status: 'planned' },
    { path: '/tariffs/volte/', title: 'VoLTE', parent: '/tariffs/', branch: 'b2c', status: 'planned' },

    { path: '/devices/', title: 'Devices', parent: '/', branch: 'b2c', status: 'planned',
      note: 'Device catalogue. Informational only until the e-commerce platform exists.' },

    { path: '/apps/', title: 'Azercell apps', parent: '/', branch: 'b2c', status: 'planned' },
    { path: '/apps/kabinetim/', title: 'Self-service / Kabinetim app', parent: '/apps/', branch: 'b2c', status: 'planned',
      links: ['https://kabinetim.azercell.com/my/login'] },
    { path: '/apps/yandex-plus/', title: 'Yandex Plus', parent: '/apps/', branch: 'b2c', status: 'planned' },
    { path: '/apps/self-development/', title: 'Self-development', parent: '/apps/', branch: 'b2c', status: 'planned' },
    { path: '/apps/self-development/busuu/', title: 'Busuu', parent: '/apps/self-development/', branch: 'b2c', status: 'planned' },
    { path: '/apps/self-development/litres/', title: 'Litres', parent: '/apps/self-development/', branch: 'b2c', status: 'planned' },
    { path: '/apps/self-development/kids/', title: 'Azercell Kids', parent: '/apps/self-development/', branch: 'b2c', status: 'planned' },
    { path: '/apps/cinema-and-tv/', title: 'Online cinema & TV', parent: '/apps/', branch: 'b2c', status: 'planned' },
    { path: '/apps/cinema-and-tv/kinon/', title: 'Kinon', parent: '/apps/cinema-and-tv/', branch: 'b2c', status: 'planned' },
    { path: '/apps/micromobility/', title: 'Micromobility', parent: '/apps/', branch: 'b2c', status: 'planned' },
    { path: '/apps/other/', title: 'Other', parent: '/apps/', branch: 'b2c', status: 'planned' },
    { path: '/apps/other/azparking/', title: 'AzParking', parent: '/apps/other/', branch: 'b2c', status: 'planned' },
    { path: '/apps/other/navimax/', title: 'NaviMax', parent: '/apps/other/', branch: 'b2c', status: 'planned' },
    { path: '/apps/other/smsradar/', title: 'SMSRadar', parent: '/apps/other/', branch: 'b2c', status: 'planned' },

    { path: '/campaigns/', title: 'Campaigns', parent: '/', branch: 'b2c', status: 'planned' },
    { path: '/campaigns/special-offers/', title: 'Special offers', parent: '/campaigns/', branch: 'b2c', status: 'planned' },
    { path: '/campaigns/special-offers/giqaaddim/', title: 'GiqaAddım', parent: '/campaigns/special-offers/', branch: 'b2c', status: 'planned' },
    { path: '/campaigns/voice/', title: 'Voice', parent: '/campaigns/', branch: 'b2c', status: 'planned' },
    { path: '/campaigns/internet/', title: 'Internet', parent: '/campaigns/', branch: 'b2c', status: 'planned' },
    { path: '/campaigns/bonus-programs/', title: 'Bonus programs', parent: '/campaigns/', branch: 'b2c', status: 'planned' },
    { path: '/campaigns/devices/', title: 'Devices', parent: '/campaigns/', branch: 'b2c', status: 'planned' },

    { path: '/esgercell/', title: 'Əsgərcell', parent: '/', branch: 'b2c', status: 'planned' },

    { path: '/support/', title: 'Support', parent: '/', branch: 'b2c', status: 'planned' },
    { path: '/support/internet/', title: 'FAQ — Internet', parent: '/support/', branch: 'b2c', status: 'planned' },
    { path: '/support/akart/', title: 'FAQ — akart', parent: '/support/', branch: 'b2c', status: 'planned', links: ['https://akart.az'] },
    { path: '/support/balance-and-tariffs/', title: 'FAQ — Balance & Tariffs', parent: '/support/', branch: 'b2c', status: 'planned' },
    { path: '/support/roaming/', title: 'FAQ — Roaming', parent: '/support/', branch: 'b2c', status: 'planned' },
    { path: '/support/number-purchase/', title: 'FAQ — Number purchase', parent: '/support/', branch: 'b2c', status: 'planned' },
    { path: '/support/apps/', title: 'FAQ — Azercell apps', parent: '/support/', branch: 'b2c', status: 'planned' },
    { path: '/support/services/', title: 'FAQ — Services', parent: '/support/', branch: 'b2c', status: 'planned' },

    { path: '/stores/', title: 'Azercell stores', parent: '/', branch: 'b2c', status: 'planned' },
    { path: '/help/', title: 'Help', parent: '/', branch: 'b2c', status: 'planned' },
    { path: '/search/', title: 'Search results', parent: '/', branch: 'b2c', status: 'planned' },

    /* ---------------- B2B ---------------- */
    { path: '/business/', title: 'Business homepage', parent: null, branch: 'b2b', status: 'built',
      links: ['/', '/about/', '/business/mobile/', '/business/connectivity/', '/business/digital-solutions/', '/business/iot/',
              '/business/fleet-field-operations/', '/business/automation-management/',
              '/business/customer-engagement/', '/business/campaigns/', '/business/support/',
              'https://biznes.azercell.com'] },
    { path: '/business/mobile/', title: 'Mobile', parent: '/business/', branch: 'b2b', status: 'planned' },
    { path: '/business/mobile/tariffs/', title: 'My Business tariff plans', parent: '/business/mobile/', branch: 'b2b', status: 'planned' },
    { path: '/business/mobile/tariffs/archive/', title: 'Tariffs archive', parent: '/business/mobile/tariffs/', branch: 'b2b', status: 'planned' },
    { path: '/business/mobile/internet/', title: 'My Business internet packs', parent: '/business/mobile/', branch: 'b2b', status: 'planned' },
    { path: '/business/mobile/internet/monthly/', title: 'Monthly internet packs', parent: '/business/mobile/internet/', branch: 'b2b', status: 'planned' },
    { path: '/business/mobile/internet/short-term/', title: 'Short-term packs', parent: '/business/mobile/internet/', branch: 'b2b', status: 'planned' },
    { path: '/business/mobile/internet/social/', title: 'Social network packs', parent: '/business/mobile/internet/', branch: 'b2b', status: 'planned' },
    { path: '/business/mobile/internet/archive/', title: 'Internet packs Archive', parent: '/business/mobile/internet/', branch: 'b2b', status: 'planned' },
    { path: '/business/mobile/roaming/', title: 'Roaming', parent: '/business/mobile/', branch: 'b2b', status: 'built',
      links: ['/business/mobile/roaming/countries-and-prices/', '/business/mobile/roaming/countries-and-prices/turkiye/',
              '/business/mobile/roaming/countries-and-prices/georgia/', '/business/mobile/roaming/countries-and-prices/germany/',
              '/business/mobile/roaming/internet-packs/', 'https://kabinetim.azercell.com/',
              'https://www.azercell.com/en/personal/payment-and-balance/online-payment.html',
              'https://www.azercell.com/en/corporate/mobile-communications/roaming.html',
              'https://support.azercell.com/'] },
    { path: '/business/mobile/roaming/countries-and-prices/', title: 'Countries and prices', parent: '/business/mobile/roaming/', branch: 'b2b', status: 'built',
      links: ['/business/mobile/roaming/countries-and-prices/turkiye/', '/business/mobile/roaming/countries-and-prices/georgia/',
              '/business/mobile/roaming/countries-and-prices/germany/'] },
    { path: '/business/mobile/roaming/countries-and-prices/turkiye/', title: 'Turkiye', parent: '/business/mobile/roaming/countries-and-prices/', branch: 'b2b', status: 'built',
      links: ['/business/mobile/roaming/internet-packs/'] },
    { path: '/business/mobile/roaming/countries-and-prices/georgia/', title: 'Georgia', parent: '/business/mobile/roaming/countries-and-prices/', branch: 'b2b', status: 'built',
      links: ['/business/mobile/roaming/internet-packs/'] },
    { path: '/business/mobile/roaming/countries-and-prices/germany/', title: 'Germany', parent: '/business/mobile/roaming/countries-and-prices/', branch: 'b2b', status: 'built',
      links: ['/business/mobile/roaming/internet-packs/'] },
    { path: '/business/mobile/roaming/internet-packs/', title: 'Roaming internet packs', parent: '/business/mobile/roaming/', branch: 'b2b', status: 'built',
      links: ['https://kabinetim.azercell.com/',
              'https://www.azercell.com/en/corporate/mobile-communications/roaming/roaming-data-packages.html'] },
    { path: '/business/mobile/azercell-biznes/', title: 'Azercell Biznes', parent: '/business/mobile/', branch: 'b2b', status: 'planned',
      links: ['https://biznes.azercell.com'] },
    { path: '/business/connectivity/', title: 'Connectivity', parent: '/business/', branch: 'b2b', status: 'planned',
      note: 'Category definition and relationship to the current Fixed service section are on hold for client review.' },
    { path: '/business/connectivity/leased-line/', title: 'My Business Internet Leased Line', parent: '/business/connectivity/', branch: 'b2b', status: 'planned' },
    { path: '/business/connectivity/wifi/', title: 'My Business Wi-Fi', parent: '/business/connectivity/', branch: 'b2b', status: 'planned' },
    { path: '/business/connectivity/unified-communications/', title: 'Unified Communications', parent: '/business/connectivity/', branch: 'b2b', status: 'planned' },
    { path: '/business/digital-solutions/', title: 'Digital solutions', parent: '/business/', branch: 'b2b', status: 'planned' },
    { path: '/business/iot/', title: 'IoT & M2M', parent: '/business/digital-solutions/', branch: 'b2b', status: 'planned' },
    { path: '/business/iot/overview/', title: 'IoT overview', parent: '/business/iot/', branch: 'b2b', status: 'planned' },
    { path: '/business/iot/m2m/', title: 'M2M', parent: '/business/iot/', branch: 'b2b', status: 'planned' },
    { path: '/business/fleet-field-operations/', title: 'Fleet & field operations', parent: '/business/digital-solutions/', branch: 'b2b', status: 'planned' },
    { path: '/business/fleet-field-operations/yoldash-360/', title: 'YolDASH360', parent: '/business/fleet-field-operations/', branch: 'b2b', status: 'planned' },
    { path: '/business/fleet-field-operations/fleet/', title: 'My Business Fleet', parent: '/business/fleet-field-operations/', branch: 'b2b', status: 'planned',
      note: 'The separate My Business Fleet package page is on hold for client review.' },
    { path: '/business/fleet-field-operations/team-management/', title: 'Mobile Team Management', parent: '/business/fleet-field-operations/', branch: 'b2b', status: 'planned' },
    { path: '/business/fleet-field-operations/irrigation/', title: 'Irrigation Control System', parent: '/business/fleet-field-operations/', branch: 'b2b', status: 'planned' },
    { path: '/business/automation-management/', title: 'Automation & management', parent: '/business/digital-solutions/', branch: 'b2b', status: 'planned' },
    { path: '/business/automation-management/rpa/', title: 'Robotic Automation Solution (RPA)', parent: '/business/automation-management/', branch: 'b2b', status: 'planned' },
    { path: '/business/automation-management/device-management/', title: 'Mobile Device Management', parent: '/business/automation-management/', branch: 'b2b', status: 'planned' },
    { path: '/business/customer-engagement/', title: 'Customer engagement', parent: '/business/digital-solutions/', branch: 'b2b', status: 'planned' },
    { path: '/business/customer-engagement/cpaas/', title: 'Customer Experience Management Platform', parent: '/business/customer-engagement/', branch: 'b2b', status: 'planned' },
    { path: '/business/customer-engagement/infohub/', title: 'InfoHUB', parent: '/business/customer-engagement/', branch: 'b2b', status: 'planned' },
    { path: '/business/customer-engagement/mobile-marketing/', title: 'Mobile Marketing', parent: '/business/customer-engagement/', branch: 'b2b', status: 'planned' },
    { path: '/business/customer-engagement/bulk-sms/', title: 'Bulk & Profile SMS', parent: '/business/customer-engagement/', branch: 'b2b', status: 'planned' },
    { path: '/business/customer-engagement/content-services/', title: 'Call Signature / Content Services', parent: '/business/customer-engagement/', branch: 'b2b', status: 'planned' },
    { path: '/business/campaigns/', title: 'Campaigns', parent: '/business/', branch: 'b2b', status: 'planned' },
    { path: '/business/campaigns/my-business-wifi/', title: 'My Business Wi-Fi', parent: '/business/campaigns/', branch: 'b2b', status: 'planned' },
    { path: '/business/campaigns/my-business-club/', title: 'My Business Club', parent: '/business/campaigns/', branch: 'b2b', status: 'planned' },
    { path: '/business/campaigns/archive/', title: 'Campaigns archive', parent: '/business/campaigns/', branch: 'b2b', status: 'planned' },
    { path: '/business/campaigns/why-azercell-business/', title: 'Why Azercell Business?', parent: '/business/campaigns/', branch: 'b2b', status: 'planned' },
    { path: '/business/support/', title: 'Support', parent: '/business/', branch: 'b2b', status: 'planned' },
    { path: '/business/support/help/', title: 'Help', parent: '/business/support/', branch: 'b2b', status: 'planned' },
    { path: '/business/support/talk-to-support/', title: 'Talk to Support', parent: '/business/support/', branch: 'b2b', status: 'planned' },
    { path: '/business/support/faqs/', title: 'Browse all FAQs', parent: '/business/support/', branch: 'b2b', status: 'planned' },
    { path: '/business/support/locations/', title: 'Locations', parent: '/business/support/', branch: 'b2b', status: 'planned' },
    { path: '/business/support/help-and-support/', title: 'Help & Support', parent: '/business/support/', branch: 'b2b', status: 'planned' },
    { path: '/business/support/itemized-bill/', title: 'Online Itemized Bill', parent: '/business/support/', branch: 'b2b', status: 'planned' },
    { path: '/business/mobile/azercell-biznes/top-up/', title: 'Top-up', parent: '/business/mobile/azercell-biznes/', branch: 'b2b', status: 'planned' },
    { path: '/business/login/', title: 'Log in', parent: '/business/', branch: 'b2b', status: 'planned',
      note: 'Destination is not confirmed yet.' },

    /* ---------------- Other ---------------- */
    { path: '/about/', title: 'About us', parent: null, branch: 'other', status: 'planned',
      links: ['/', '/business/', 'https://azercellliler.azercell.com/'] },
    { path: '/about/academy/', title: 'Azercell Academy', parent: '/about/', branch: 'other', status: 'planned' },
    { path: '/about/career/', title: 'Career', parent: '/about/', branch: 'other', status: 'planned',
      links: ['https://careers.azercell.com/search/'] },
    { path: '/about/sustainability/', title: 'Sustainability', parent: '/about/', branch: 'other', status: 'planned' },
    { path: '/about/sustainability/csr/', title: 'Corporate Social Responsibility', parent: '/about/sustainability/', branch: 'other', status: 'planned' },
    { path: '/about/press/', title: 'Press / News', parent: '/about/', branch: 'other', status: 'planned' },
    { path: '/about/awards/', title: 'Awards', parent: '/about/', branch: 'other', status: 'planned' },
    { path: '/about/values/', title: 'Our values', parent: '/about/', branch: 'other', status: 'planned' },
    { path: '/about/contact/', title: 'Contact us', parent: '/about/', branch: 'other', status: 'planned' },
    { path: '/about/privacy/', title: 'Privacy Policy', parent: '/about/', branch: 'other', status: 'planned' },
    { path: '/about/rfc-2350/', title: 'RFC-2350', parent: '/about/', branch: 'other', status: 'planned' },
    { path: '/terms/', title: 'Terms and Conditions', parent: '/about/', branch: 'other', status: 'planned' },

    /* ---------------- External ---------------- */
    { path: 'https://kabinetim.azercell.com/my/login', title: 'Kabinetim', parent: null, branch: 'external', status: 'external',
      note: 'Linked from every B2C page header.' },
    { path: 'https://biznes.azercell.com', title: 'Azercell Biznes portal', parent: null, branch: 'external', status: 'external',
      note: 'Linked from every B2B page header.' },
    { path: 'https://akart.az', title: 'akart', parent: null, branch: 'external', status: 'external',
      note: 'Linked from B2C header navigation.' },
    { path: 'https://azercellim.com/en/home', title: 'azercellim.com', parent: null, branch: 'external', status: 'external',
      note: 'Number and eSIM purchase. Linked from eSIM and Join Azercell.' },
    { path: 'https://careers.azercell.com/search/', title: 'Careers portal', parent: null, branch: 'external', status: 'external',
      note: 'Linked from the Career page.' },
    { path: 'https://azercellliler.azercell.com/', title: 'Azercell Life', parent: null, branch: 'external', status: 'external',
      note: 'Linked from the About Us page.' }
  ];

  var byPath = {};
  PAGE_REGISTRY.forEach(function (page) { byPath[page.path] = page; });

  function isExternal(path) {
    return /^https?:/.test(path || '');
  }

  /**
   * Resolves a registry path to a usable href.
   * Built pages link directly. Planned pages link to the placeholder route so
   * the prototype never produces a dead link.
   */
  function href(path) {
    if (!path) return '#';
    if (isExternal(path)) return path;
    var page = byPath[path];
    if (page && page.status === 'built') return path;
    return '/planned/?path=' + encodeURIComponent(path);
  }

  /** Deep link to a tab on /tariffs/mobile/ — same ?type= values as filterTabs on that page. */
  function tariffFilterHref(type) {
    var base = href('/tariffs/mobile/');
    if (!type || type === 'all') return base;
    if (base.indexOf('/planned/') === 0) return base;
    var join = base.indexOf('?') >= 0 ? '&' : '?';
    return base + join + 'type=' + encodeURIComponent(type);
  }

  /** Deep link to filter tabs on internet pack category pages (?sort=, ?volume=). */
  function internetFilterHref(path, params) {
    var base = href(path);
    if (base.indexOf('/planned/') === 0) return base;
    var search = new URLSearchParams();
    if (params) {
      Object.keys(params).forEach(function (key) {
        var val = params[key];
        if (val && val !== 'all' && val !== 'default') search.set(key, val);
      });
    }
    var qs = search.toString();
    return qs ? base + (base.indexOf('?') >= 0 ? '&' : '?') + qs : base;
  }

  /** Hand off one tariff to the compare tool (?add= is consumed on load, not a shareable full state). */
  function tariffCompareHref(id, tier) {
    var base = href('/tariffs/compare/');
    if (!id || base.indexOf('/planned/') === 0) return base;
    var join = base.indexOf('?') >= 0 ? '&' : '?';
    var url = base + join + 'add=' + encodeURIComponent(id);
    if (tier != null && tier !== '') url += '&tier=' + encodeURIComponent(String(tier));
    return url;
  }

  var TARIFF_DETAIL_BY_ID = {
    digimax: '/tariffs/mobile/prepaid/digimax/',
    'premium-plus': '/tariffs/mobile/prepaid/premium-plus/',
    'data-plus': '/tariffs/mobile/prepaid/data-plus/',
    data: '/tariffs/mobile/prepaid/data/',
    veteran: '/tariffs/mobile/prepaid/veteran/',
    alfa: '/tariffs/mobile/postpaid/alfa/'
  };

  /** Detail page for a mobile tariff card (by compareId / tariff id). */
  function tariffDetailHref(id) {
    return href(TARIFF_DETAIL_BY_ID[id] || '/tariffs/mobile/');
  }

  function get(path) {
    return byPath[path] || null;
  }

  function childrenOf(parentPath, branch) {
    return PAGE_REGISTRY.filter(function (page) {
      return page.parent === parentPath && (!branch || page.branch === branch);
    });
  }

  function counts() {
    var result = { total: 0, built: 0, planned: 0, external: 0 };
    PAGE_REGISTRY.forEach(function (page) {
      if (page.branch === 'internal') return;
      result.total += 1;
      if (page.status === 'built') result.built += 1;
      else if (page.status === 'external') result.external += 1;
      else result.planned += 1;
    });
    return result;
  }

  /* ======================================================================
     Shared header and footer content
     ====================================================================== */

  var SITE_CHROME = {
    announcements: [
      'Naxçıvan daily talk — call all Azercell subscribers for 0.30 AZN per day.',
      'DigiMax 25GB — 25GB, 1500 minutes and 500 SMS for 30 AZN per 28 days.',
      'Travel pack 30GB — 100 minutes and 30GB for visitors, 39 AZN for 30 days.'
    ],

    search: {
      id: 'header-search',
      action: href('/search/'),
      label: 'Search Azercell',
      placeholder: 'Search anything...'
    },

    branches: [
      { id: 'personal', label: 'Personal', href: '/' },
      { id: 'business', label: 'Business', href: href('/business/') }
    ],

    businessAnnouncements: [
      'My Business Wi-Fi — portable and fixed hotspots from 40 AZN per month.',
      'My Business tariff plans — corporate lines from 15 AZN per month.',
      'Manage every corporate number in one place with the Azercell Biznes portal.'
    ],



    nav: [
      {
        label: 'Company',
        mode: 'list',
        items: [
          { label: 'About us', href: href('/about/') },
          { label: 'Media & press', href: href('/about/press/') },
          { label: 'Corporate Social Responsibility', href: href('/about/sustainability/csr/') },
          { label: 'Sustainability', href: href('/about/sustainability/') },
          { label: 'Careers', href: href('/about/career/') },
          { label: 'Azercell Academy', href: href('/about/academy/') },
          { label: 'Azercell Life', href: 'https://azercellliler.azercell.com/' },
          { label: 'Contact us', href: href('/about/contact/') },
          { label: 'Awards', href: href('/about/awards/') }
        ]
      },
      {
        label: 'Mobile',
        mode: 'detail-links',
        items: [
          { label: 'Tariffs', href: href('/tariffs/mobile/'), detail: [
            { label: 'Prepaid', href: tariffFilterHref('prepaid') },
            { label: 'Postpaid', href: tariffFilterHref('postpaid') },
            { label: 'Tariffs archive', href: href('/tariffs/mobile/prepaid/archive/') }
          ] },
          { label: 'Internet', href: href('/tariffs/internet/'), detail: [
            { label: 'High volume', href: href('/tariffs/internet/monthly/') },
            { label: 'Weekly', href: href('/tariffs/internet/weekly/') },
            { label: 'Daily', href: href('/tariffs/internet/daily/') },
            { label: 'Unlimited', href: href('/tariffs/internet/unlimited/') }
          ] },
          { label: 'Roaming', href: href('/tariffs/roaming/'), detail: [
            { label: 'Roaming internet packs', href: href('/tariffs/roaming/internet-packs/') },
            { label: 'Countries & prices', href: href('/tariffs/roaming/countries-and-prices/') },
            { label: 'Travel packs', href: href('/tariffs/roaming/travel-packs/') }
          ] },
          { label: 'Services', href: href('/tariffs/services/'), detail: [
            { label: 'Payment and balance', href: href('/tariffs/services/payment-and-balance/') },
            { label: 'Call management', href: href('/tariffs/services/call-management/') },
            { label: '0 balance options', href: href('/tariffs/services/zero-balance/') },
            { label: 'Aicell', href: href('/tariffs/services/aicell/') }
          ] },
          { label: 'e-Sim', href: href('/tariffs/esim/'), detail: [
            { label: 'About e-Sim', href: href('/tariffs/esim/') },
            { label: 'Buy e-Sim', href: 'https://azercellim.com/en/home' },
            { label: 'Move number to e-SIM', href: href('/join-azercell/transfer-number/') }
          ] },
          { label: 'Network', href: href('/tariffs/5g/'), detail: [
            { label: '5G', href: href('/tariffs/5g/') },
            { label: 'VoLTE', href: href('/tariffs/volte/') },
            { label: 'Network support', href: href('/support/internet/') }
          ] }
        ]
      },
      {
        label: 'TV',
        mode: 'detail-card',
        items: [
          { label: 'Kinon', href: href('/apps/cinema-and-tv/kinon/') }
        ]
      },
      {
        label: 'Apps',
        mode: 'apps',
        items: [
          { label: 'Azercell App', href: href('/apps/') },
          { label: 'Kinon', href: href('/apps/cinema-and-tv/kinon/') },
          { label: 'aKart', href: 'https://akart.az' },
          { label: 'Yandex Plus', href: href('/apps/yandex-plus/') },
          { label: 'Busuu', href: href('/apps/self-development/busuu/') },
          { label: 'Litres', href: href('/apps/self-development/litres/') },
          { label: 'Azercell Kids', href: href('/apps/self-development/kids/') },
          { label: 'Wingz', href: href('/apps/micromobility/') },
          { label: 'AzParking', href: href('/apps/other/azparking/') },
          { label: 'NaviMax', href: href('/apps/other/navimax/') },
          { label: 'SMSRadar', href: href('/apps/other/smsradar/') },
          { label: 'All apps', href: href('/apps/') }
        ]
      },
      {
        label: 'Devices',
        mode: 'list',
        items: [
          { label: 'Catalog', href: href('/devices/') },
          { label: 'Link to the shop', href: href('/devices/') },
          { label: 'Other informational links', href: href('/devices/') }
        ]
      },
      {
        label: 'Campaigns',
        mode: 'list',
        items: [
          { label: 'All campaigns', href: href('/campaigns/') },
          { label: 'Special offers', href: href('/campaigns/special-offers/') },
          { label: 'Voice', href: href('/campaigns/voice/') },
          { label: 'Internet', href: href('/campaigns/internet/') },
          { label: 'Bonus programs', href: href('/campaigns/bonus-programs/') },
          { label: 'Contests', href: href('/campaigns/') },
          { label: 'Devices', href: href('/campaigns/devices/') }
        ]
      },
      {
        label: 'Support',
        mode: 'list',
        items: [
          { label: 'Help', href: href('/help/') },
          { label: 'Talk to Support', href: href('/support/') },
          { label: 'Browse all FAQs', href: href('/support/') },
          { label: 'Locations', href: href('/stores/') }
        ]
      }
    ],

    apps: {
      categories: [
        { label: 'Self-service', items: ['Azercell App'] },
        { label: 'Yandex Plus', items: ['Yandex Plus'] },
        { label: 'aKart', items: ['aKart'] },
        { label: 'Self-development', items: ['Busuu', 'Litres', 'Azercell Kids'] },
        { label: 'Online cinema & TV', items: ['Kinon'] },
        { label: 'Micromobility', items: ['Wingz'] },
        { label: 'Other', items: ['AzParking', 'NaviMax', 'SMSRadar'] },
        { label: 'All apps', items: ['Azercell App', 'Kinon', 'aKart', 'Yandex Plus', 'Busuu', 'Litres', 'Azercell Kids', 'Wingz', 'AzParking', 'NaviMax', 'SMSRadar'] }
      ]
    },

    locations: { label: 'Locations', href: href('/stores/') },

    floatingBar: {
      search: { label: 'Search', href: href('/search/') },
      items: [
        { label: 'Internet', href: href('/tariffs/internet/'), detail: [
          { label: 'High volume', href: href('/tariffs/internet/monthly/') },
          { label: 'Weekly', href: href('/tariffs/internet/weekly/') },
          { label: 'Daily', href: href('/tariffs/internet/daily/') },
          { label: 'Unlimited', href: href('/tariffs/internet/unlimited/') }
        ] },
        { label: 'Tariffs', href: href('/tariffs/mobile/'), detail: [
          { label: 'Prepaid', href: tariffFilterHref('prepaid') },
          { label: 'Postpaid', href: tariffFilterHref('postpaid') },
          { label: 'Tariffs archive', href: href('/tariffs/mobile/prepaid/archive/') }
        ] },
        { label: 'Roaming', href: href('/tariffs/roaming/'), detail: [
          { label: 'Roaming internet packs', href: href('/tariffs/roaming/internet-packs/') },
          { label: 'Countries & prices', href: href('/tariffs/roaming/countries-and-prices/') },
          { label: 'Travel packs', href: href('/tariffs/roaming/travel-packs/') }
        ] },
        { label: 'Kinon', href: href('/apps/cinema-and-tv/kinon/') }
      ]
    },

    businessFloatingBar: {
      search: { label: 'Search', href: href('/search/') },
      showPopoverTitles: false,
      items: [
        { label: 'Internet', href: href('/business/mobile/internet/'), detail: [
          { label: 'Monthly internet packs', href: href('/business/mobile/internet/monthly/') },
          { label: 'Short-term packs', href: href('/business/mobile/internet/short-term/') },
          { label: 'Social network packs', href: href('/business/mobile/internet/social/') },
          { label: 'Internet packs Archive', href: href('/business/mobile/internet/archive/') }
        ] },
        { label: 'Tariffs', href: href('/business/mobile/tariffs/'), detail: [
          { label: 'My Business tariff plans', href: href('/business/mobile/tariffs/') },
          { label: 'Tariffs archive', href: href('/business/mobile/tariffs/archive/') }
        ] },
        { label: 'Roaming', href: href('/business/mobile/roaming/'), detail: [
          { label: 'Countries and prices', href: href('/business/mobile/roaming/countries-and-prices/') },
          { label: 'Turkiye', href: href('/business/mobile/roaming/countries-and-prices/turkiye/') },
          { label: 'Georgia', href: href('/business/mobile/roaming/countries-and-prices/georgia/') },
          { label: 'Germany', href: href('/business/mobile/roaming/countries-and-prices/germany/') },
          { label: 'Roaming internet packs', href: href('/business/mobile/roaming/internet-packs/') }
        ] },
        { label: 'Azercell Biznes', href: 'https://biznes.azercell.com', detail: [
          { label: 'Log in to Azercell Biznes', href: 'https://biznes.azercell.com', featured: true },
          { label: 'Top-up', href: href('/business/mobile/azercell-biznes/top-up/') },
          { label: 'Online Itemized Bill', href: href('/business/support/itemized-bill/') }
        ] }
      ]
    },

    acquisition: {
      title: 'Acquisition block',
      items: [
        { label: 'Get a number', href: 'https://azercellim.com/en/home' },
        { label: 'Transfer your number', href: href('/join-azercell/transfer-number/') },
        { label: 'Choose a tariff', href: href('/tariffs/mobile/') },
        { label: 'Switch to e-SIM', href: href('/tariffs/esim/') },
        { label: 'Get an Internet', href: href('/tariffs/internet/') }
      ]
    },

    businessNav: [
      {
        label: 'Company', href: href('/about/'), mode: 'list',
        items: [
          { label: 'About us', href: href('/about/') },
          { label: 'Media & press', href: href('/about/press/') },
          { label: 'Corporate Social Responsibility', href: href('/about/sustainability/csr/') },
          { label: 'Sustainability', href: href('/about/sustainability/') },
          { label: 'Careers ↗', href: 'https://careers.azercell.com/search/' },
          { label: 'Azercell Academy', href: href('/about/academy/') },
          { label: 'Azercell Life ↗', href: 'https://azercellliler.azercell.com/' },
          { label: 'Contact us', href: href('/about/contact/') },
          { label: 'Awards', href: href('/about/awards/') }
        ]
      },
      {
        label: 'Mobile', href: href('/business/mobile/'), mode: 'detail-links',
        items: [
          { label: 'Azercell Biznes', href: href('/business/mobile/azercell-biznes/'), featured: true },
          { label: 'My Business tariff plans', href: href('/business/mobile/tariffs/'), detail: [
            { label: 'Tariffs archive', href: href('/business/mobile/tariffs/archive/') }
          ] },
          { label: 'My Business Internet packs', href: href('/business/mobile/internet/'), detail: [
            { label: 'Monthly internet packs', href: href('/business/mobile/internet/monthly/') },
            { label: 'Short-term packs', href: href('/business/mobile/internet/short-term/') },
            { label: 'Social network packs', href: href('/business/mobile/internet/social/') },
            { label: 'Internet packs Archive', href: href('/business/mobile/internet/archive/') }
          ] },
          { label: 'Roaming', href: href('/business/mobile/roaming/'), detail: [
            { label: 'Countries and prices', href: href('/business/mobile/roaming/countries-and-prices/') },
            { label: 'Turkiye', href: href('/business/mobile/roaming/countries-and-prices/turkiye/'), nested: true },
            { label: 'Georgia', href: href('/business/mobile/roaming/countries-and-prices/georgia/'), nested: true },
            { label: 'Germany', href: href('/business/mobile/roaming/countries-and-prices/germany/'), nested: true },
            { label: 'Roaming internet packs', href: href('/business/mobile/roaming/internet-packs/') }
          ] }
        ]
      },
      {
        label: 'Connectivity', href: href('/business/connectivity/'), mode: 'list',
        items: [
          { label: 'My Business Internet Leased Line', href: href('/business/connectivity/leased-line/') },
          { label: 'My Business Wi-Fi', href: href('/business/connectivity/wifi/') },
          { label: 'Unified Communications', href: href('/business/connectivity/unified-communications/') }
        ]
      },
      {
        label: 'Digital solutions', href: href('/business/digital-solutions/'), mode: 'detail-links',
        items: [
          { label: 'IoT & M2M', href: href('/business/iot/'), detail: [
            { label: 'IoT overview', href: href('/business/iot/overview/') },
            { label: 'M2M', href: href('/business/iot/m2m/') }
          ] },
          { label: 'Fleet & field operations', href: href('/business/fleet-field-operations/'), detail: [
            { label: 'YolDASH360', href: href('/business/fleet-field-operations/yoldash-360/') },
            { label: 'My Business Fleet', href: href('/business/fleet-field-operations/fleet/') },
            { label: 'Mobile Team Management', href: href('/business/fleet-field-operations/team-management/') },
            { label: 'Irrigation Control System', href: href('/business/fleet-field-operations/irrigation/') }
          ] },
          { label: 'Automation & management', href: href('/business/automation-management/'), detail: [
            { label: 'Robotic Automation Solution (RPA)', href: href('/business/automation-management/rpa/') },
            { label: 'Mobile Device Management', href: href('/business/automation-management/device-management/') }
          ] },
          { label: 'Customer engagement', href: href('/business/customer-engagement/'), detail: [
            { label: 'Customer Experience Management Platform', href: href('/business/customer-engagement/cpaas/') },
            { label: 'InfoHUB', href: href('/business/customer-engagement/infohub/') },
            { label: 'Mobile Marketing', href: href('/business/customer-engagement/mobile-marketing/') },
            { label: 'Bulk & Profile SMS', href: href('/business/customer-engagement/bulk-sms/') },
            { label: 'Call Signature / Content Services', href: href('/business/customer-engagement/content-services/') }
          ] }
        ]
      },
      {
        label: 'Campaigns', href: href('/business/campaigns/'), mode: 'list-promo',
        items: [
          { label: 'Why Azercell Business?', href: href('/business/campaigns/why-azercell-business/') },
          { label: 'My Business Wi-Fi', href: href('/business/campaigns/my-business-wifi/') },
          { label: 'My Business Club', href: href('/business/campaigns/my-business-club/') },
          { label: 'Campaigns archive', href: href('/business/campaigns/archive/') }
        ],
        promo: { label: 'My Business Wi-Fi', href: href('/business/campaigns/my-business-wifi/') }
      },
      {
        label: 'Support', href: href('/business/support/'), mode: 'list',
        items: [
          { label: 'Help', href: href('/business/support/help/') },
          { label: 'Talk to Support', href: href('/business/support/talk-to-support/') },
          { label: 'Browse all FAQs', href: href('/business/support/faqs/') },
          { label: 'Locations', href: href('/business/support/locations/') },
          { label: 'Help & Support', href: href('/business/support/help-and-support/') },
          { label: 'Online Itemized Bill', href: href('/business/support/itemized-bill/') }
        ]
      }
    ],

    footer: {
      layout: 'personal',
      brand: { title: 'Azercell', tagline: 'Every connection opens a possibility' },
      subscribe: {
        label: 'Subscribe for updates',
        placeholder: 'Your email',
        note: 'This prototype cannot send email.'
      },
      appCard: {
        title: 'Download Azercell App',
        media: 'Azercell App',
        actions: [
          { label: 'App Store', href: href('/apps/kabinetim/') },
          { label: 'Google Play', href: href('/apps/kabinetim/') }
        ]
      },
      groups: [
        { title: 'About Azercell', links: [
          { label: 'About us', href: href('/about/') },
          { label: 'Media & press', href: href('/about/press/') },
          { label: 'Corporate Social Responsibility', href: href('/about/sustainability/csr/') },
          { label: 'Sustainability', href: href('/about/sustainability/') },
          { label: 'Careers', href: href('/about/career/') },
          { label: 'Azercell Academy', href: href('/about/academy/') },
          { label: 'Azercell Life', href: 'https://azercellliler.azercell.com/' },
          { label: 'Awards', href: href('/about/awards/') }
        ] },
        { title: 'Mobile', links: [
          { label: 'Tariffs', href: href('/tariffs/mobile/') },
          { label: 'Internet', href: href('/tariffs/internet/') },
          { label: 'Roaming', href: href('/tariffs/roaming/') },
          { label: 'Services', href: href('/tariffs/services/') },
          { label: 'e-Sim', href: href('/tariffs/esim/') },
          { label: 'Network', href: href('/tariffs/5g/') }
        ] },
        { title: 'Devices', links: [
          { label: 'Catalog', href: href('/devices/') },
          { label: 'Link to the shop', href: href('/devices/') },
          { label: 'Other informational links', href: href('/devices/') }
        ] },
        { title: 'Campaigns', links: [
          { label: 'All campaigns', href: href('/campaigns/') },
          { label: 'Special offers', href: href('/campaigns/special-offers/') },
          { label: 'Voice', href: href('/campaigns/voice/') },
          { label: 'Internet', href: href('/campaigns/internet/') },
          { label: 'Bonus programs', href: href('/campaigns/bonus-programs/') },
          { label: 'Contests', href: href('/campaigns/') },
          { label: 'Devices', href: href('/campaigns/devices/') }
        ] },
        { title: 'Support', links: [
          { label: 'Help', href: href('/help/') },
          { label: 'Browse all FAQs', href: href('/support/') },
          { label: 'Contact us', href: href('/about/contact/') },
          { label: 'Talk to Support', href: href('/support/') },
          { label: 'Locations', href: href('/stores/') },
          { label: 'Call center *1111', href: 'tel:1111' }
        ] }
      ],
      appsV1: [
        { label: 'Kinon', href: href('/apps/cinema-and-tv/kinon/') },
        { label: 'aKart', href: 'https://akart.az' },
        { label: 'All apps', href: href('/apps/') }
      ],
      appsV2: [
        { label: 'Yandex Plus', href: href('/apps/yandex-plus/') },
        { label: 'aKart', href: 'https://akart.az' },
        { label: 'Self-development', href: href('/apps/self-development/') },
        { label: 'Online cinema & TV', href: href('/apps/cinema-and-tv/') },
        { label: 'Micromobility', href: href('/apps/micromobility/') },
        { label: 'Other', href: href('/apps/other/') },
        { label: 'All apps', href: href('/apps/') }
      ],
      social: [
        { label: 'Facebook', href: 'https://www.facebook.com/azercell' },
        { label: 'X', href: 'https://x.com/azercell' },
        { label: 'YouTube', href: 'https://www.youtube.com/@azercell' },
        { label: 'Instagram', href: 'https://www.instagram.com/azercell' }
      ],
      legal: [
        { label: 'Privacy Policy', href: href('/about/privacy/') },
        { label: 'Cookie Policy', href: href('/about/privacy/') },
        { label: 'Terms and Conditions', href: href('/terms/') },
        { label: 'Accessibility', href: href('/about/values/') },
        { label: 'Sitemap', tool: 'sitemap' }
      ],
      copyright: '© 2026 Azercell Telecom LLC'
    },

    /* B2B uses the Personal footer shell with its own confirmed information
       architecture. Unknown app-store destinations remain non-clickable. */
    businessFooter: {
      layout: 'personal',
      brand: { title: 'Azercell', tagline: 'Every connection opens a possibility' },
      subscribe: {
        label: 'Subscribe for updates',
        placeholder: 'Your email',
        note: 'This prototype cannot send email.'
      },
      includeAppsGroup: false,
      groups: [
        { title: 'About Azercell', links: [
          { label: 'About us', href: href('/about/') },
          { label: 'Media & press', href: href('/about/press/') },
          { label: 'Corporate Social Responsibility', href: href('/about/sustainability/csr/') },
          { label: 'Sustainability', href: href('/about/sustainability/') },
          { label: 'Careers', href: 'https://careers.azercell.com/search/' },
          { label: 'Azercell Academy', href: href('/about/academy/') },
          { label: 'Azercell Life', href: 'https://azercellliler.azercell.com/' },
          { label: 'Awards', href: href('/about/awards/') }
        ] },
        { title: 'Mobile', links: [
          { label: 'My Business tariff plans', href: href('/business/mobile/tariffs/') },
          { label: 'My Business Internet packs', href: href('/business/mobile/internet/') },
          { label: 'Roaming', href: href('/business/mobile/roaming/') }
        ] },
        { title: 'Connectivity', links: [
          { label: 'My Business Internet Leased Line', href: href('/business/connectivity/leased-line/') },
          { label: 'My Business Wi-Fi', href: href('/business/connectivity/wifi/') },
          { label: 'Unified Communications', href: href('/business/connectivity/unified-communications/') }
        ] },
        { title: 'IoT & M2M', links: [
          { label: 'IoT overview', href: href('/business/iot/overview/') },
          { label: 'M2M', href: href('/business/iot/m2m/') }
        ] },
        { title: 'Fleet & field operations', links: [
          { label: 'YolDASH360', href: href('/business/fleet-field-operations/yoldash-360/') },
          { label: 'My Business Fleet', href: href('/business/fleet-field-operations/fleet/') },
          { label: 'Mobile Team Management', href: href('/business/fleet-field-operations/team-management/') },
          { label: 'Irrigation Control System', href: href('/business/fleet-field-operations/irrigation/') }
        ] },
        { title: 'Automation & management', links: [
          { label: 'Robotic Automation Solution (RPA)', href: href('/business/automation-management/rpa/') },
          { label: 'Mobile Device Management', href: href('/business/automation-management/device-management/') }
        ] },
        { title: 'Customer engagement', links: [
          { label: 'Customer Experience Management Platform', href: href('/business/customer-engagement/cpaas/') },
          { label: 'InfoHUB', href: href('/business/customer-engagement/infohub/') },
          { label: 'Mobile Marketing', href: href('/business/customer-engagement/mobile-marketing/') },
          { label: 'Bulk & Profile SMS', href: href('/business/customer-engagement/bulk-sms/') },
          { label: 'Call Signature / Content Services', href: href('/business/customer-engagement/content-services/') }
        ] },
        { title: 'Campaigns', links: [
          { label: 'All campaigns', href: href('/business/campaigns/') },
          { label: 'My Business Club', href: href('/business/campaigns/my-business-club/') },
          { label: 'Campaigns archive', href: href('/business/campaigns/archive/') }
        ] },
        { title: 'Support', links: [
          { label: 'Help', href: href('/business/support/help/') },
          { label: 'Browse all FAQs', href: href('/business/support/faqs/') },
          { label: 'Contact us', href: href('/about/contact/') },
          { label: 'Talk to Support', href: href('/business/support/talk-to-support/') },
          { label: 'Locations', href: href('/business/support/locations/') },
          { label: 'Call center *6050', href: 'tel:*6050' },
          { label: 'Online Itemized Bill', href: href('/business/support/itemized-bill/') }
        ] }
      ],
      featureCards: [
        {
          title: 'My Business Club',
          media: 'My Business Club',
          actions: [
            { label: 'Explore My Business Club', href: href('/business/campaigns/my-business-club/') }
          ]
        },
        {
          title: 'Manage your Business with Azercell Biznes app',
          media: 'Azercell Biznes app',
          actions: [
            { label: 'App Store' },
            { label: 'Google Play' },
            { label: 'AppGallery' }
          ]
        }
      ],
      social: [
        { label: 'Facebook', href: 'https://www.facebook.com/azercell' },
        { label: 'X', href: 'https://x.com/azercell' },
        { label: 'YouTube', href: 'https://www.youtube.com/@azercell' },
        { label: 'Instagram', href: 'https://www.instagram.com/azercell' }
      ],
      legal: [
        { label: 'Privacy Policy', href: href('/about/privacy/') },
        { label: 'Cookie Policy', href: href('/about/privacy/') },
        { label: 'Terms and Conditions', href: href('/terms/') },
        { label: 'Accessibility', href: href('/about/values/') },
        { label: 'Sitemap', tool: 'sitemap' }
      ],
      copyright: '© 2026 Azercell Telecom LLC'
    }
  };

  /* ======================================================================
     Component registry — drives /components
     ====================================================================== */

  var COMPONENT_REGISTRY = [
    {
      id: 'announcementBar',
      name: 'Announcement bar',
      group: 'Global chrome',
      usedOn: PERSONAL_CHROME_PATHS.concat(['/business/']).concat(B2B_ROAMING_PATHS),
      description: 'Rotating one-line notice above the header. CMS-managed messages.',
      props: { messages: SITE_CHROME.announcements }
    },
    {
      id: 'siteHeader',
      name: 'Site header',
      group: 'Global chrome',
      usedOn: PERSONAL_CHROME_PATHS.concat(['/business/']).concat(B2B_ROAMING_PATHS),
      description: 'Shared responsive shell with audience-specific navigation. Business category labels navigate to landing pages; hover/focus or the adjacent chevron opens the mega menu. Mobile keeps separate link and expand controls.',
      props: {
        layout: 'personal',
        branch: 'personal',
        branches: SITE_CHROME.branches,
        logo: 'Azercell',
        logoHref: '/',
        nav: SITE_CHROME.nav,
        apps: SITE_CHROME.apps,
        locations: SITE_CHROME.locations,
        secondaryAction: { label: 'Log in', href: 'https://kabinetim.azercell.com/my/login' },
        primaryAction: { label: 'Join Azercell', href: href('/join-azercell/') }
      }
    },
    {
      id: 'floatingBar',
      name: 'Floating bar',
      group: 'Global chrome',
      usedOn: PERSONAL_CHROME_PATHS.concat(['/business/']).concat(B2B_ROAMING_PATHS),
      description: 'Shortcut bar for Internet, Tariffs, Roaming and Kinon, shared with the Business homepage. On the transfer page it changes to a Start transfer action after the hero button scrolls away.',
      props: SITE_CHROME.floatingBar
    },
    {
      id: 'acquisitionBlock',
      name: 'Acquisition block',
      group: 'Navigation blocks',
      usedOn: ['/'],
      description: 'Five cards for getting a number, transferring, choosing a tariff, e-SIM and internet.',
      props: SITE_CHROME.acquisition
    },
    {
      id: 'transferHero',
      name: 'Transfer hero',
      group: 'Page openers',
      usedOn: ['/join-azercell/transfer-number/'],
      description: 'Title and Start transfer action. The floating bar copies this action after the button scrolls away.',
      props: {
        title: 'Transfer your number',
        media: 'Transfer visual',
        action: { label: 'Start transfer', href: 'https://azercellim.com/en/home' }
      }
    },
    {
      id: 'mediaPlaceholder',
      name: 'Media placeholder',
      group: 'Page openers',
      usedOn: ['/join-azercell/transfer-number/'],
      description: 'Grey placeholder block for imagery that is not in this prototype yet.',
      props: { label: 'Transfer content', media: 'Placeholder' }
    },
    {
      id: 'siteFooter',
      name: 'Site footer',
      group: 'Global chrome',
      usedOn: PERSONAL_CHROME_PATHS.concat(['/business/']).concat(B2B_ROAMING_PATHS),
      description: 'Audience-specific footer in the shared responsive shell. Business adds its confirmed IA, Campaigns links, My Business Club banner and Azercell Biznes app banner.',
      props: SITE_CHROME.footer
    },
    {
      id: 'heroBanner',
      name: 'Hero banner',
      group: 'Page openers',
      usedOn: ['/', '/business/'].concat(B2B_ROAMING_PATHS),
      description: 'Any number of CMS slides — the layout does not depend on the count. Dot navigation, optional stat strip.',
      props: {
        slides: [
          {
            eyebrow: 'Meet DigiMax',
            title: 'One prepaid plan, everything included',
            body: 'Internet, calls and SMS in a single pack. No contract, no monthly commitment.',
            media: 'Hero visual',
            actions: [
              { label: 'See DigiMax packs', href: href('/tariffs/mobile/prepaid/digimax/'), variant: 'primary' },
              { label: 'Compare all tariffs', href: href('/tariffs/compare/') }
            ],
            stats: [
              { value: '25GB', label: 'Internet' },
              { value: '1500 min', label: 'Countrywide calls' },
              { value: '500', label: 'SMS' }
            ]
          },
          {
            eyebrow: 'Travel packs',
            title: 'Visiting Azerbaijan? Get connected on arrival',
            body: '30GB with 100 minutes for 39 AZN, valid 30 days. Free SIM or eSIM.',
            media: 'Travel pack visual',
            actions: [
              { label: 'See travel packs', href: href('/tariffs/roaming/travel-packs/'), variant: 'primary' }
            ]
          }
        ]
      }
    },
    {
      id: 'quickActions',
      name: 'Quick actions',
      group: 'Navigation blocks',
      usedOn: ['/'],
      description: 'Row of frequent jobs. Each links to a page or the external portal.',
      props: {
        items: [
          { icon: '01', label: 'Top up balance', href: 'https://kabinetim.azercell.com/my/login' },
          { icon: '02', label: 'Activate SIM', href: href('/join-azercell/') },
          { icon: '03', label: 'Change plan', href: href('/tariffs/mobile/') },
          { icon: '04', label: 'Switch to eSIM', href: href('/tariffs/esim/') }
        ]
      }
    },
    {
      id: 'sectionHead',
      name: 'Section heading',
      group: 'Layout',
      usedOn: ['/', '/business/', '/tariffs/mobile/', '/tariffs/compare/', '/tariffs/mobile/prepaid/archive/'].concat(MOBILE_TARIFF_DETAIL_PATHS).concat(B2B_ROAMING_PATHS),
      description: 'Eyebrow, title, intro and an optional action on the right.',
      props: {
        eyebrow: 'Tariffs',
        title: 'Pick your perfect plan',
        body: 'Flexible plans built around how you actually use your phone.',
        action: { label: 'Compare all plans', href: href('/tariffs/compare/') }
      }
    },
    {
      id: 'planCard',
      name: 'Plan card',
      group: 'Products',
      usedOn: ['/', '/tariffs/mobile/', '/tariffs/compare/', '/business/'],
      description: 'Tariff card with a price selector. Each price shows its own specs.',
      props: {
        compareId: 'digimax',
        name: 'DigiMax',
        type: 'Prepaid',
        badge: 'Popular',
        tiers: [
          { price: '8 AZN', validity: 'Valid 14 days', specs: [
            { value: '3GB', label: 'Internet' }, { value: '200 min', label: 'Calls' }, { value: '100', label: 'SMS' }] },
          { price: '12 AZN', validity: 'Valid 28 days', specs: [
            { value: '5GB', label: 'Internet' }, { value: '300 min', label: 'Calls' }, { value: '150', label: 'SMS' }, { value: '1GB', label: 'Social media' }] },
          { price: '18 AZN', validity: 'Valid 28 days', specs: [
            { value: '10GB', label: 'Internet' }, { value: '600 min', label: 'Calls' }, { value: '300', label: 'SMS' }, { value: '1GB', label: 'Social media' }, { value: '1GB', label: 'WhatsApp' }] }
        ],
        note: 'All prices include VAT.',
        actions: [
          { label: 'Plan details', href: href('/tariffs/mobile/prepaid/digimax/'), variant: 'primary' },
          { label: 'Activate in Kabinetim', href: 'https://kabinetim.azercell.com/my/login' }
        ]
      }
    },
    {
      id: 'tariffPackCard',
      name: 'Tariff pack card',
      group: 'Products',
      usedOn: MOBILE_TARIFF_DETAIL_PATHS.slice(),
      description: 'Single pack tier as its own plan card — used in detail page carousels.',
      props: {
        tierId: 'd3',
        name: 'DigiMax 3GB',
        type: 'Prepaid',
        price: '8 AZN',
        validity: 'Usage period 14 days.',
        specs: [
          { value: '3GB', label: 'Internet' },
          { value: '200 min', label: 'Calls' },
          { value: '100', label: 'SMS' }
        ],
        note: 'Send "D3" to 7575.',
        ussd: 'Dial *750*4*203#YES',
        compareHref: href('/tariffs/compare/?add=digimax'),
        actions: [
          { label: 'Activate in Kabinetim', href: 'https://kabinetim.azercell.com/my/login', variant: 'primary' }
        ]
      }
    },
    {
      id: 'promoCard',
      name: 'Promo card',
      group: 'Products',
      usedOn: ['/', '/business/', '/tariffs/mobile/prepaid/archive/'],
      description: 'Card with a visual, short copy and a call to action.',
      props: {
        media: 'Plan builder',
        eyebrow: 'Build your own',
        title: 'Create a plan that fits your needs',
        body: 'Choose your internet, minutes and SMS and get a plan built around them.',
        actions: [{ label: 'Build my plan', href: href('/tariffs/mobile/'), variant: 'primary' }]
      }
    },
    {
      id: 'calloutBanner',
      name: 'Callout banner',
      group: 'Content',
      usedOn: ['/tariffs/mobile/', '/tariffs/mobile/prepaid/archive/', '/tariffs/compare/'],
      description: 'Full-width prompt for archive lookup, cross-sell, or help — inverse by default.',
      props: {
        eyebrow: 'Existing customer?',
        title: 'Cannot find your tariff here?',
        body: 'Legacy plans are no longer sold to new subscribers. If you are already on an archived tariff, you can still view its terms.',
        actions: [{ label: 'Prepaid tariffs archive', href: href('/tariffs/mobile/prepaid/archive/'), variant: 'primary' }]
      }
    },
    {
      id: 'localSearchField',
      name: 'Local search field',
      group: 'Forms',
      usedOn: ['/tariffs/mobile/prepaid/archive/'],
      description: 'Filters items already on the page. Does not query a server.',
      props: { id: 'demo-local-search', label: 'Search archive plans', placeholder: 'Search by plan name…' }
    },
    {
      id: 'archivePlanCard',
      name: 'Archive plan card',
      group: 'Products',
      usedOn: ['/tariffs/mobile/prepaid/archive/'],
      description: 'Legacy tariff tile with archived badge and link to plan terms.',
      props: {
        name: 'SuperSən',
        tagline: 'SuperSən, choose your tariff!',
        href: href('/tariffs/mobile/prepaid/archive/supersen/')
      }
    },
    {
      id: 'pagination',
      name: 'Pagination',
      group: 'Navigation',
      usedOn: ['/tariffs/mobile/prepaid/archive/'],
      description: 'Page controls for long lists. Filled by archive list behaviour in app.js.',
      props: { label: 'Archive pages' }
    },
    {
      id: 'tariffCompareTool',
      name: 'Tariff compare tool',
      group: 'Products',
      usedOn: ['/tariffs/compare/'],
      description: 'Two-step compare: pick 2–4 mobile tariffs, then switch price tiers side by side.',
      props: {
        tariffs: [
          {
            id: 'digimax',
            name: 'DigiMax',
            type: 'Prepaid',
            badge: 'Popular',
            tiers: [
              { price: '8 AZN', validity: 'Valid 14 days', internet: '3GB', calls: '200 min', sms: '100', extras: '—', activation: 'Send "D3" to 7575' },
              { price: '12 AZN', validity: 'Valid 28 days', internet: '5GB', calls: '300 min', sms: '150', social: '1GB', extras: '—', activation: 'Send "D5" to 7575' }
            ]
          },
          {
            id: 'alfa',
            name: 'Alfa Plan',
            type: 'Postpaid',
            badge: 'Contract',
            discountNote: '10% off on a 12-month contract. 20% off on a 24-month contract.',
            note: 'Postpaid contract. Signing takes place in an Azercell store.',
            tiers: [
              { price: '20 AZN', validity: 'Monthly billing', internet: '12GB', calls: '1200 min', sms: '—', extras: '—', activation: 'Send "A12" to 650' },
              { price: '30 AZN', validity: 'Monthly billing', internet: '25GB', calls: '2500 min', sms: '—', extras: '—', activation: 'Send "A25" to 650' }
            ]
          }
        ]
      }
    },
    {
      id: 'tariffDetailHero',
      name: 'Tariff detail hero',
      group: 'Products',
      usedOn: [],
      description: 'Legacy sample only — live detail pages use sectionHead + pack carousel instead.',
      props: {
        eyebrow: 'Prepaid',
        title: 'DigiMax',
        body: 'With your rhythm! Prepaid packs with internet, countrywide calls and SMS.',
        media: 'DigiMax',
        badge: 'Popular'
      }
    },
    {
      id: 'tariffTierSelector',
      name: 'Tariff tier selector',
      group: 'Products',
      usedOn: [],
      description: 'Legacy sample only — live detail pages use pack carousel cards instead.',
      props: {
        title: 'Choose your pack',
        body: 'Tap a chip to see what is included.',
        activeId: 'd3',
        tiers: [
          { id: 'd1', label: 'DigiMax Daily', price: '1 AZN', validityGroup: '1 day' },
          { id: 'd3', label: 'DigiMax 3GB', price: '8 AZN', validityGroup: '14 days' },
          { id: 'd10', label: 'DigiMax 10GB', price: '18 AZN', validityGroup: '28 days' }
        ]
      }
    },
    {
      id: 'tariffTierPanel',
      name: 'Tariff tier panel',
      group: 'Products',
      usedOn: [],
      description: 'Legacy sample only — live detail pages use tariffPackCard instead.',
      props: {
        tier: {
          label: 'DigiMax 3GB',
          price: '8 AZN',
          validity: 'Usage period 14 days.',
          internet: '3GB',
          calls: '200 min countrywide',
          sms: '100 countrywide',
          keyword: 'D3',
          ussd: '*750*4*203#YES',
          activation: 'Send "D3" to 7575',
          features: ['3GB internet', '200 min countrywide calls', '100 countrywide SMS']
        },
        actions: [
          { label: 'Activate in Kabinetim', href: 'https://kabinetim.azercell.com/my/login', variant: 'primary' },
          { label: 'Compare with other plans', href: href('/tariffs/compare/?add=digimax') }
        ]
      }
    },
    {
      id: 'tariffActivationBlock',
      name: 'Tariff activation block',
      group: 'Products',
      usedOn: [],
      description: 'Legacy sample only — activation info lives on pack cards and FAQ now.',
      props: {
        title: 'How to activate',
        activation: {
          shortCode: '7575',
          smsCost: '0.01 AZN per request',
          intro: 'Send the keyword to 7575, dial USSD, or activate in Kabinetim.',
          keywords: [{ keyword: 'D3', pack: 'DigiMax 3GB' }],
          ussdCodes: [{ code: '*750*4*203#YES', pack: 'DigiMax 3GB' }],
          bonusCheck: ['Send an empty SMS to 2112 (0.10 AZN per SMS)']
        }
      }
    },
    {
      id: 'tariffFaq',
      name: 'Tariff FAQ',
      group: 'Content',
      usedOn: MOBILE_TARIFF_DETAIL_PATHS.slice(),
      description: 'Accordion FAQ with paragraphs and bullet lists.',
      props: {
        title: 'Questions and answers',
        items: [
          { question: 'Who can subscribe?', answer: 'Any prepaid line subscriber.' },
          { question: 'How to activate?', paragraphs: ['Send the keyword to 7575.'], list: ['D3 — DigiMax 3GB'] }
        ]
      }
    },
    {
      id: 'tariffFeatureList',
      name: 'Tariff feature list',
      group: 'Products',
      usedOn: [],
      description: 'Legacy sample only — specs live on tariffPackCard now.',
      props: {
        title: 'What is included in this pack',
        features: ['3GB internet', '200 min countrywide calls', '100 countrywide SMS']
      }
    },
    {
      id: 'tariffAddonGrid',
      name: 'Tariff internet add-ons',
      group: 'Products',
      usedOn: MOBILE_TARIFF_DETAIL_PATHS.concat([
        '/business/mobile/roaming/',
        '/business/mobile/roaming/countries-and-prices/',
        '/business/mobile/roaming/internet-packs/'
      ]),
      description: 'Grid of monthly internet pack upsells.',
      props: {
        title: 'Need more internet?',
        body: 'Monthly add-on packs stack on your current tariff.',
        items: [
          { name: 'Monthly 3GB', price: '9 AZN', body: 'High-volume monthly add-on.', action: { label: 'Monthly packs', href: href('/tariffs/internet/monthly/') } }
        ]
      }
    },
    {
      id: 'tariffOverageNote',
      name: 'Tariff overage rates',
      group: 'Content',
      usedOn: MOBILE_TARIFF_DETAIL_PATHS.slice(),
      description: 'Rates after bonuses are used up.',
      props: {
        overageRates: {
          title: 'Rates after bonuses are used up',
          intro: 'If bonuses within your pack are exhausted but the pack is still valid:',
          items: [
            { label: 'Countrywide calls', value: '0.08 AZN per minute' },
            { label: 'Internet', value: '0.05 AZN per MB' }
          ]
        }
      }
    },
    {
      id: 'tariffDetailCrossLinks',
      name: 'Tariff detail cross-links',
      group: 'Navigation blocks',
      usedOn: MOBILE_TARIFF_DETAIL_PATHS.concat(B2B_ROAMING_PATHS),
      description: 'Compare and hub links plus de-emphasized legal line.',
      props: {
        links: [
          { label: 'Compare DigiMax with other plans', href: href('/tariffs/compare/?add=digimax'), variant: 'primary' },
          { label: 'All mobile tariffs', href: href('/tariffs/mobile/') }
        ],
        legal: 'All prices VAT inclusive. Tariff allowances are for personal use only.'
      }
    },
    {
      id: 'internetPackCard',
      name: 'Internet pack card',
      group: 'Products',
      usedOn: ['/tariffs/internet/', '/tariffs/internet/monthly/', '/tariffs/internet/weekly/', '/tariffs/internet/daily/', '/tariffs/internet/unlimited/',
        '/tariffs/roaming/', '/tariffs/roaming/internet-packs/', '/tariffs/roaming/travel-packs/'],
      description: 'Priced data add-on with activation SMS, Kabinetim CTA, and expandable usage guide.',
      props: {
        id: 'monthly-3gb',
        name: 'Monthly 3GB',
        data: '3GB',
        price: '9 AZN',
        priceNum: 9,
        sort: 1,
        volumeBand: 'all',
        validity: { prepaid: '28 days', postpaid: '30 days' },
        keyword: '3',
        shortCode: '2525',
        usageHints: [{ activity: 'Video calls', duration: '~6 hours' }],
        details: 'High-volume monthly data add-on.',
        kabinetimHref: 'https://kabinetim.azercell.com/my/login'
      }
    },
    {
      id: 'internetCategoryNav',
      name: 'Internet category nav',
      group: 'Navigation blocks',
      usedOn: ['/tariffs/internet/', '/tariffs/internet/monthly/', '/tariffs/internet/weekly/', '/tariffs/internet/daily/', '/tariffs/internet/unlimited/',
        '/tariffs/roaming/', '/tariffs/roaming/internet-packs/', '/tariffs/roaming/travel-packs/', '/tariffs/roaming/countries-and-prices/'],
      description: 'Links between internet pack hub and category pages, or roaming section tabs.',
      props: {
        active: 'monthly',
        items: [
          { id: 'hub', label: 'All internet packs', href: href('/tariffs/internet/') },
          { id: 'monthly', label: 'High-volume / Monthly', href: href('/tariffs/internet/monthly/') }
        ]
      }
    },
    {
      id: 'internetPackFilters',
      name: 'Internet pack filters',
      group: 'Navigation blocks',
      usedOn: ['/tariffs/internet/monthly/', '/tariffs/internet/weekly/', '/tariffs/internet/daily/', '/tariffs/internet/unlimited/'],
      description: 'Traffic band and price sort filters with shareable URL params.',
      props: {
        urlBase: href('/tariffs/internet/monthly/'),
        groups: [
          { key: 'volume', label: 'Traffic', syncUrl: true, urlParam: 'volume', options: [
            { value: 'all', label: 'All offers' }, { value: '30-50', label: '30 – 50 GB' }] },
          { key: 'sort', label: 'Price', syncUrl: true, urlParam: 'sort', options: [
            { value: 'default', label: 'Recommended' }, { value: 'price-asc', label: 'Low to higher' }] }
        ]
      }
    },
    {
      id: 'internetUpgradeBanner',
      name: 'Internet upgrade banner',
      group: 'Promotion',
      usedOn: ['/tariffs/internet/', '/tariffs/internet/monthly/', '/tariffs/internet/weekly/', '/tariffs/internet/daily/', '/tariffs/internet/unlimited/',
        '/tariffs/roaming/', '/tariffs/roaming/internet-packs/', '/tariffs/roaming/travel-packs/', '/tariffs/roaming/countries-and-prices/'],
      description: 'Cross-sell banner suggesting a bigger mobile tariff instead of repeated add-ons.',
      props: {
        eyebrow: 'Smarter option',
        title: 'Buying extra data every month?',
        body: 'If you keep topping up with add-on packs, a bigger mobile plan may give you more data plus calls and SMS for similar money.',
        actions: [
          { label: 'Compare mobile plans', href: href('/tariffs/compare/'), variant: 'primary' },
          { label: 'See data-heavy plans', href: tariffFilterHref('prepaid') }
        ]
      }
    },
    {
      id: 'filterTabs',
      name: 'Filter tabs',
      group: 'Navigation blocks',
      usedOn: ['/', '/business/', '/tariffs/mobile/'],
      description: 'Filters items on the page. For shareable tab links set syncUrl: true + urlBase + urlParam; tabs render as href links and sync the address bar.',
      props: {
        urlBase: href('/tariffs/mobile/'),
        groups: [
          { key: 'category', label: 'Plan type', syncUrl: true, urlParam: 'type', options: [
            { value: 'all', label: 'All' }, { value: 'prepaid', label: 'Prepaid' }, { value: 'postpaid', label: 'Postpaid' }] }
        ]
      }
    },
    {
      id: 'deviceCard',
      name: 'Device card',
      group: 'Products',
      usedOn: ['/'],
      description: 'Device tile with price. Filterable by category and brand.',
      props: {
        name: 'iPhone 16 Pro',
        category: 'phones',
        brand: 'apple',
        priceLabel: 'Starting from',
        price: '2,949 AZN',
        action: { label: 'Device details', href: href('/devices/') }
      }
    },
    {
      id: 'splitBanner',
      name: 'Split banner',
      group: 'Promotion',
      usedOn: ['/', '/business/'].concat(B2B_ROAMING_PATHS),
      description: 'Copy beside a visual. Supports an inverted variant and flipped order.',
      props: {
        eyebrow: 'Kinon Plus',
        title: 'Dive into the world of cinema',
        body: '240+ channels plus on-demand, up to 5 profiles and 3 devices.',
        media: 'Kinon visual',
        points: ['15.99 AZN per month', '7-day free trial and 5GB bonus data', 'Billed to your mobile balance'],
        actions: [
          { label: 'Kinon details', href: href('/apps/cinema-and-tv/kinon/'), variant: 'primary' },
          { label: 'All Azercell apps', href: href('/apps/') }
        ],
        note: 'Subscription is activated in the Kabinetim app.'
      }
    },
    {
      id: 'linkCard',
      name: 'Link card',
      group: 'Navigation blocks',
      usedOn: ['/', '/business/'].concat(B2B_ROAMING_PATHS),
      description: 'Whole-card link used for service and reason tiles.',
      props: {
        media: 'Roaming',
        title: 'International roaming',
        body: 'Rates, packs and supported operators for around 190 countries.',
        linkLabel: 'Learn more',
        href: href('/tariffs/roaming/')
      }
    },
    {
      id: 'statBand',
      name: 'Stat band',
      group: 'Layout',
      usedOn: ['/', '/business/'],
      description: 'Row of figures. Four across on desktop, two on tablet, stacked on mobile.',
      props: {
        items: [
          { value: '5G', label: 'Live test zone in Baku' },
          { value: '190+', label: 'Roaming destinations' },
          { value: '0 AZN', label: 'First eSIM issue' },
          { value: '24/7', label: 'Aicell assistant' }
        ]
      }
    },
    {
      id: 'appPromo',
      name: 'App promo',
      group: 'Promotion',
      usedOn: ['/', '/business/'],
      description: 'Store links beside a device visual.',
      props: {
        eyebrow: 'Kabinetim',
        title: 'Manage your plan on the go',
        body: 'Track usage, switch tariffs and activate packs in the Kabinetim app.',
        media: 'App screens',
        stores: [
          { pre: 'Download on the', name: 'App Store', href: 'https://apps.apple.com/az/app/kabinetim/id1050654556' },
          { pre: 'Get it on', name: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.azercell.kabinetim' }
        ]
      }
    },
    {
      id: 'carousel',
      name: 'Carousel',
      group: 'Layout',
      usedOn: ['/', '/business/'].concat(MOBILE_TARIFF_DETAIL_PATHS),
      description: 'Horizontal scroller with arrow buttons and swipe hint. Arrows hide when everything fits.',
      props: { label: 'Example row', content: '' }
    },
    {
      id: 'accordion',
      name: 'Accordion',
      group: 'Layout',
      usedOn: ['/business/'].concat(B2B_ROAMING_PATHS),
      description: 'Expandable question and answer list for FAQ blocks.',
      props: {
        items: [
          { question: 'How do I activate an internet pack?', answer: 'Packs are activated in the Kabinetim app or with the USSD code shown on each pack page.' },
          { question: 'Are prices VAT inclusive?', answer: 'Yes. All prices shown on the site include VAT unless stated otherwise.' }
        ]
      }
    },
    {
      id: 'businessRoamingCountryCard',
      name: 'Business roaming country card',
      group: 'Products',
      usedOn: [],
      description: 'Corporate destination summary with operators, headline rates and a country-detail link.',
      props: {
        country: {
          name: 'Turkiye',
          operators: [{ name: 'Turkcell' }, { name: 'Turk Telekom' }, { name: 'Vodafone' }],
          rates: {
            outgoingWithin: { rate: '1.00', interval: '60 sec' },
            incoming: { rate: '0.50', interval: '60 sec' },
            internet: { rate: '0.99', interval: '30KB' },
            sms: { rate: '0.15', interval: 'Per message' }
          }
        },
        href: href('/business/mobile/roaming/countries-and-prices/turkiye/')
      }
    },
    {
      id: 'businessRoamingRateTable',
      name: 'Business roaming rate table',
      group: 'Products',
      usedOn: [
        '/business/mobile/roaming/countries-and-prices/turkiye/',
        '/business/mobile/roaming/countries-and-prices/georgia/',
        '/business/mobile/roaming/countries-and-prices/germany/'
      ],
      description: 'Detailed corporate postpaid call, data and SMS rate table for one country.',
      props: {
        country: {
          name: 'Turkiye',
          rates: {
            outgoingWithin: { rate: '1.00', interval: '60 sec' }, outgoingAzerbaijan: { rate: '1.00', interval: '60 sec' },
            outgoingOther: { rate: '1.00', interval: '60 sec' }, incoming: { rate: '0.50', interval: '60 sec' },
            internet: { rate: '0.99', interval: '30KB' }, sms: { rate: '0.15', interval: 'Per message' }
          }
        }
      }
    },
    {
      id: 'businessRoamingOperatorList',
      name: 'Business roaming operator list',
      group: 'Products',
      usedOn: [
        '/business/mobile/roaming/countries-and-prices/turkiye/',
        '/business/mobile/roaming/countries-and-prices/georgia/',
        '/business/mobile/roaming/countries-and-prices/germany/'
      ],
      description: 'Partner operator cards with the available mobile network generations.',
      props: { operators: [{ name: 'Turkcell', networks: ['4G'] }, { name: 'Turk Telekom', networks: ['4G'] }] }
    },
    {
      id: 'businessRoamingPackCard',
      name: 'Business roaming internet pack card',
      group: 'Products',
      usedOn: [
        '/business/mobile/roaming/',
        '/business/mobile/roaming/internet-packs/',
        '/business/mobile/roaming/countries-and-prices/turkiye/',
        '/business/mobile/roaming/countries-and-prices/georgia/',
        '/business/mobile/roaming/countries-and-prices/germany/'
      ],
      description: 'Corporate roaming pack with price, validity and real SMS/USSD activation methods.',
      props: {
        pack: { volume: '2GB', price: '20 AZN', priceNum: 20, sort: 2, validity: '10 days' }
      }
    },
    {
      id: 'businessRoamingSteps',
      name: 'Business roaming steps',
      group: 'Content',
      usedOn: ['/business/mobile/roaming/'],
      description: 'Three visible preparation steps from destination lookup through pack activation.',
      props: {
        items: [
          { step: '1', title: 'Get destination information', body: 'Review operators and prices before travelling.' },
          { step: '2', title: 'Activate roaming', body: 'Enable roaming for the corporate number and device.' },
          { step: '3', title: 'Activate an internet pack', body: 'Buy the right pack before or during the trip.' }
        ]
      }
    },
    {
      id: 'businessRoamingCoverageTable',
      name: 'Business roaming internet-pack coverage',
      group: 'Products',
      usedOn: ['/business/mobile/roaming/countries-and-prices/', '/business/mobile/roaming/internet-packs/'],
      description: 'Searchable, vertically and horizontally scrollable operator table matching the live Business roaming coverage block.',
      props: {
        rows: [
          { country: 'Turkiye', operator: 'Turkcell', displayName: 'TR TCELL; TURKCELL; TR TURKCELL', networks: '2G / 3G / LTE' },
          { country: 'Germany', operator: 'T-Mobile', displayName: 'T-D1; D1; T-Mobile D', networks: '2G / LTE' }
        ]
      }
    },
    {
      id: 'businessRoamingOperatorsTable',
      name: 'Business roaming supported operators table',
      group: 'Products',
      usedOn: [],
      description: 'Horizontally scrollable country, operator and network table for roaming internet packs.',
      props: { rows: [{ country: 'Germany', operator: 'T-Mobile', networks: '2G / LTE' }] }
    },
    {
      id: 'roamingCountrySearch',
      name: 'Roaming country search',
      group: 'Products',
      usedOn: ['/tariffs/roaming/', '/tariffs/roaming/countries-and-prices/', '/business/mobile/roaming/', '/business/mobile/roaming/countries-and-prices/'],
      description: 'Client-side country lookup with optional URL sync via ?country= and quick destination chips.',
      props: {
        label: 'Search for a country',
        syncUrl: true,
        urlBase: href('/tariffs/roaming/countries-and-prices/'),
        topCountries: [{ id: 'turkiye', name: 'Turkiye' }, { id: 'georgia', name: 'Georgia' }]
      }
    },
    {
      id: 'roamingCountryResults',
      name: 'Roaming country results',
      group: 'Products',
      usedOn: ['/tariffs/roaming/', '/tariffs/roaming/countries-and-prices/', '/business/mobile/roaming/', '/business/mobile/roaming/countries-and-prices/'],
      description: 'Operator cards with networks, pack support flag, and pay-as-you-go rates.',
      props: { planType: 'prepaid', countries: [] }
    },
    {
      id: 'roamingCountriesTable',
      name: 'Roaming supported countries table',
      group: 'Products',
      usedOn: ['/tariffs/roaming/internet-packs/'],
      description: 'Horizontally scrollable table of operators where roaming internet packs work.',
      props: { rows: [], note: 'Sample list for prototype.' }
    },
    {
      id: 'roamingPlanToggle',
      name: 'Roaming plan type toggle',
      group: 'Navigation blocks',
      usedOn: ['/tariffs/roaming/', '/tariffs/roaming/countries-and-prices/'],
      description: 'Prepaid / postpaid switch for rate display on country lookup.',
      props: { current: 'prepaid' }
    },
    {
      id: 'searchBar',
      name: 'Search bar',
      group: 'Global chrome',
      usedOn: ['/', '/business/'],
      description: 'Submits to the search results page. No results are faked here.',
      props: { id: 'demo-search', label: 'Search Azercell', placeholder: 'Search anything...', action: href('/search/') }
    },
    {
      id: 'offerCard',
      name: 'Offer card',
      group: 'Products',
      usedOn: ['/business/'],
      description: 'Priced pack or solution tile. Filterable by category. Handles "price on request" items.',
      props: {
        category: 'iot',
        name: 'Mobile device management',
        price: '11 AZN',
        priceNote: 'Per device, per month',
        body: 'Enterprise control and security over company devices, with dual-profile BYOD support.',
        meta: ['600 AZN one-time setup and training'],
        action: { label: 'Solution details', href: href('/business/automation-management/device-management/') }
      }
    },
    {
      id: 'leadForm',
      name: 'Lead form',
      group: 'Forms',
      usedOn: ['/business/'],
      description: 'Sales enquiry form with TAX ID. Validates its own fields, then shows the real contact handoff. Never confirms a submission.',
      props: {
        id: 'demo-lead-form',
        eyebrow: 'Contact us',
        title: 'Need a digital solution?',
        body: 'Tell us about the company and a sales agent will get in touch.',
        submitLabel: 'Send request',
        note: 'Fields marked with * are required.',
        fields: [
          { name: 'name', label: 'First name and last name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone number', type: 'tel', required: true, inputmode: 'tel' },
          { name: 'company', label: 'Company name', type: 'text', required: true },
          { name: 'taxId', label: 'TAX ID', type: 'text', required: true, hint: 'Used to confirm this is a business enquiry.' },
          { name: 'region', label: 'Region or city', type: 'select', required: true, placeholder: 'Select a region', options: ['Baku', 'Ganja', 'Sumgayit'] },
          { name: 'contactMethod', label: 'Preferred contact method', type: 'radio', options: ['Call', 'Email'], wide: true }
        ],
        handoff: {
          label: 'Prototype — this form is not connected',
          body: 'The fields validate, but the prototype cannot send the request. Use one of these channels instead.',
          links: [
            { label: 'Call *6050', href: 'tel:*6050', variant: 'primary' },
            { label: 'Contact page', href: href('/about/contact/') }
          ]
        }
      }
    }
  ];

  function headerProps(overrides) {
    var branch = (overrides && overrides.branch) || 'personal';
    var isBusiness = branch === 'business';
    var base = {
      layout: 'personal',
      branch: branch,
      branches: SITE_CHROME.branches,
      logo: 'Azercell',
      logoHref: isBusiness ? href('/business/') : '/',
      nav: isBusiness ? SITE_CHROME.businessNav : SITE_CHROME.nav,
      apps: SITE_CHROME.apps,
      locations: isBusiness
        ? { label: 'Locations', href: href('/business/support/locations/') }
        : SITE_CHROME.locations,
      search: SITE_CHROME.search,
      secondaryAction: isBusiness
        ? { label: 'Log in', href: href('/business/login/') }
        : { label: 'Log in', href: 'https://kabinetim.azercell.com/my/login' },
      primaryAction: isBusiness
        ? { label: 'Contact manager', href: 'https://biznes.azercell.com' }
        : { label: 'Join Azercell', href: href('/join-azercell/') }
    };
    if (!overrides) return base;
    var key;
    for (key in overrides) {
      if (Object.prototype.hasOwnProperty.call(overrides, key)) base[key] = overrides[key];
    }
    return base;
  }

  global.SiteRegistry = {
    BRANCHES: BRANCHES,
    PAGE_REGISTRY: PAGE_REGISTRY,
    COMPONENT_REGISTRY: COMPONENT_REGISTRY,
    SITE_CHROME: SITE_CHROME,
    href: href,
    tariffFilterHref: tariffFilterHref,
    internetFilterHref: internetFilterHref,
    tariffCompareHref: tariffCompareHref,
    tariffDetailHref: tariffDetailHref,
    get: get,
    childrenOf: childrenOf,
    counts: counts,
    isExternal: isExternal,
    headerProps: headerProps
  };
})(window);
