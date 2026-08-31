/* ==========================================================================
   Azercell HTML Prototype — B2B Campaigns page renderer
   ========================================================================== */

(function (global) {
  'use strict';

  var D = global.BusinessCampaignsData;

  function section(inner, modifier) {
    return '<section class="section' + (modifier ? ' ' + modifier : '') + '"><div class="wrap">' + inner + '</div></section>';
  }

  function render(id, props) {
    return global.Components.render(id, props || {});
  }

  function parentRoute(key) {
    if (key === 'hub') return '';
    if (key === 'mnp60' || key === 'mnp80') return D.routes.acquisition;
    if (key === 'iphone16' || key === 'iphone17' || key === 'leasing') return D.routes.devices;
    if (key === 'wallet') return D.routes.club;
    return D.routes.hub;
  }

  function parentLabel(key) {
    if (key === 'mnp60' || key === 'mnp80') return 'Acquisition campaigns';
    if (key === 'iphone16' || key === 'iphone17' || key === 'leasing') return 'Devices & financing';
    if (key === 'wallet') return 'My Business Club';
    return 'All campaigns';
  }

  function hero(key) {
    var props = Object.assign({}, D.pages[key].hero);
    props.backHref = parentRoute(key);
    props.backLabel = parentLabel(key);
    return render('campaignHero', props);
  }

  function legend() {
    return section(render('campaignSourceLegend', D.sourceLegend), 'section--flush');
  }

  function copy(props) {
    return render('campaignCopyBlock', props);
  }

  function cards(items, columns) {
    return render('campaignCardGrid', { items: items, columns: columns || 3 });
  }

  function table(title, rows, options) {
    return render('campaignInfoTable', Object.assign({ title: title, rows: rows }, options || {}));
  }

  function buildHub() {
    var page = D.pages.hub;
    return [
      hero('hub'),
      legend(),
      section(copy({ eyebrow: 'Current offers', title: 'Start with an active offer or benefit' }) + cards(page.primary, 3)),
      section(copy({ eyebrow: 'New campaigns', title: 'Latest corporate device campaign', source: 'site' }) + cards(page.newCampaigns, 2)),
      section(copy({ eyebrow: 'Ended campaigns', title: 'Recently ended offers', source: 'site' }) + cards(page.endedTeasers, 2) + copy({ actions: [{ label: 'See all', href: D.routes.archive, variant: 'primary' }] })),
      section(copy({ eyebrow: 'Campaign catalogue', title: 'Explore every campaign group' }) + cards(page.campaignGroups, 3))
    ];
  }

  function buildWhy() {
    var page = D.pages.why;
    return [
      hero('why'),
      legend(),
      section(copy({ eyebrow: 'General information', title: 'A digital solutions partner', paragraphs: page.intro, source: 'site' })),
      section(table('Contact details', [
        { label: 'Azercell subscribers', value: '6050', source: 'site' },
        { label: 'Other operators', value: '*6050', source: 'site' },
        { label: 'Email', value: 'business@azercell.com', source: 'site' }
      ], { source: 'site' }) + copy({ actions: [{ label: 'Contact us', href: 'mailto:business@azercell.com', variant: 'primary' }] })),
      section(copy({ eyebrow: 'How we work', title: 'Built around business customers', source: 'site' }) + cards(page.reasons, 3)),
      section(table('Presentation proof points', page.proofPoints, { source: 'deck' })),
      section(copy({ eyebrow: 'Our partners', title: 'More than 4000 companies trust us their businesses.', paragraphs: ['Web pages, sections and articles creation, control over all photo content and pages’ look when they are available on the social network and other features'], image: 'https://www.azercell.com/assets/images/b2b/why-azercell-business/logos1.png', imageAlt: 'Companies that work with Azercell Business', source: 'site', actions: [{ label: 'Contact us', href: 'mailto:business@azercell.com', variant: 'primary' }] }) + copy({ title: 'Partner logo wall from the presentation', items: page.partnerNames, source: 'deck' })),
      section(copy({ eyebrow: 'Need a digital solution?', title: 'Azercell Business can help!', paragraphs: ['Contact us for a personalised solution for your specific needs or pick a readymade offers. The possibilities are endless.'], source: 'site', actions: [{ label: 'Contact us', href: 'mailto:business@azercell.com', variant: 'primary' }] })),
      section(copy({ title: 'Fair use and security conditions', paragraphs: page.fairUse, source: 'site' }))
    ];
  }

  function buildWifi() {
    var page = D.pages.wifi;
    return [
      hero('wifi'),
      legend(),
      section(copy({ eyebrow: 'General information', title: 'Internet without fixed infrastructure', paragraphs: page.intro, source: 'site' }) + cards(page.benefits, 3)),
      section(copy({ eyebrow: 'Devices', title: 'Choose the connection format', source: 'site' }) + cards(page.deviceDescriptions, 2)),
      section(
        '<div class="grid grid--2">' +
          table('Mi-Fi', page.mifi, { labelHeading: 'Internet volume', valueHeading: 'Monthly fee, AZN', source: 'site' }) +
          table('WTTx', page.wttx, { labelHeading: 'Internet volume', valueHeading: 'Monthly fee, AZN', source: 'site' }) +
        '</div>' +
        copy({ paragraphs: [page.note], source: 'site', actions: [{ label: 'Contact us', href: 'mailto:business@azercell.com', variant: 'primary' }] })
      ),
      section(copy({ eyebrow: 'Presentation conditions', title: 'Commercial terms from the offer deck', items: page.deckConditions, source: 'deck' })),
      section(copy({ eyebrow: 'Need technical support?', title: 'We’re here to help!', paragraphs: ['Not sure about a ready-made solution or require a customised one? Our professional customer care consultants have all the answers.'], source: 'site', actions: [{ label: 'Contact us', href: 'mailto:business@azercell.com', variant: 'primary' }] })),
      section(copy({ title: 'To the attention of Azercell corporate subscribers!', paragraphs: [page.suspensionNotice], source: 'site' })),
      section(render('campaignFaq', { title: 'Additional information', items: page.faq }))
    ];
  }

  function buildAcquisition() {
    var page = D.pages.acquisition;
    return [
      hero('acquisition'),
      legend(),
      section(copy({ eyebrow: 'Available bundles', title: 'Choose an MNP campaign', source: 'deck' }) + cards(page.cards, 2)),
      section(table('Participation snapshot', page.snapshot, { source: 'dummy' }))
    ];
  }

  function buildMnp(key) {
    var page = D.pages[key];
    return [
      hero(key),
      legend(),
      section(table('Offer details', page.details)),
      section(render('campaignSteps', { title: 'How to join', items: page.steps, source: 'dummy' })),
      section(copy({ title: 'Check availability for your company', paragraphs: ['These MNP campaigns are not mass offers. A corporate account manager must confirm eligibility before activation.'], source: 'dummy', actions: [{ label: 'Email Azercell Business', href: 'mailto:business@azercell.com', variant: 'primary' }] }))
    ];
  }

  function buildDevices() {
    var page = D.pages.devices;
    return [
      hero('devices'),
      legend(),
      section(copy({ eyebrow: 'Available campaigns', title: 'Phones and financing options', source: 'deck' }) + cards(page.cards, 3))
    ];
  }

  function buildIphone(key) {
    var page = D.pages[key];
    return [
      hero(key),
      legend(),
      section(copy({ eyebrow: 'Campaign details', title: 'Special corporate conditions', paragraphs: page.paragraphs, items: page.bullets, source: 'site', actions: [{ label: 'Contact Azercell Business', href: 'mailto:business@azercell.com', variant: 'primary' }] })),
      section(cards([
        { title: key === 'iphone16' ? 'See the iPhone 17 campaign' : 'See the iPhone 16 campaign', body: 'Compare the other Apple device generation available to corporate customers.', href: key === 'iphone16' ? D.routes.iphone17 : D.routes.iphone16, source: 'site' },
        { title: 'Smartphone Leasing Campaign', body: 'Explore a broader device credit mechanism for selected business tariffs.', href: D.routes.leasing, source: 'deck' }
      ], 2))
    ];
  }

  function buildLeasing() {
    var page = D.pages.leasing;
    return [
      hero('leasing'),
      legend(),
      section(copy({ eyebrow: 'Campaign description', title: 'Structured device financing', paragraphs: ['Selected corporate tariff customers can purchase smartphones under a 12–24 month contractual agreement.'], source: 'deck' })),
      section('<div class="grid grid--2">' +
        table('Illustrative device list', page.devices, { labelHeading: 'Device', valueHeading: 'Illustrative payment', source: 'dummy' }) +
        table('Illustrative eligibility and terms', page.terms, { source: 'dummy' }) +
      '</div>'),
      section(render('campaignSteps', { title: 'Illustrative application process', items: page.steps, source: 'dummy' })),
      section(copy({ actions: page.actions, source: 'deck' }))
    ];
  }

  function buildDiscounts() {
    var page = D.pages.discounts;
    return [
      hero('discounts'),
      legend(),
      section(table('Campaign mechanics', page.summary)),
      section(render('campaignSteps', { title: 'Illustrative activation flow', items: page.steps, source: 'dummy' })),
      section(copy({ title: 'Check discount eligibility', paragraphs: ['Final discount terms depend on the company account and participating SN codes.'], source: 'dummy', actions: [{ label: 'Contact Azercell Business', href: 'mailto:business@azercell.com', variant: 'primary' }] }))
    ];
  }

  function buildClub() {
    var page = D.pages.club;
    return [
      hero('club'),
      legend(),
      section(copy({ eyebrow: 'General information', title: 'A business loyalty ecosystem', paragraphs: page.intro, source: 'site' })),
      section(copy({ eyebrow: 'Member benefits', title: 'More value from the relationship', source: 'site' }) + cards(page.cards, 2)),
      section(copy({ eyebrow: 'Need a digital solution?', title: 'Azercell Business can help!', paragraphs: ['Contact us for a personalised solution for your specific needs or pick a readymade offers. The possibilities are endless.'], source: 'site', actions: [{ label: 'Contact us', href: 'mailto:business@azercell.com', variant: 'primary' }] }))
    ];
  }

  function buildWallet() {
    var page = D.pages.wallet;
    return [
      hero('wallet'),
      legend(),
      section(copy({ eyebrow: 'Product description', title: 'Accrue, wait and redeem', paragraphs: page.intro, source: 'deck' })),
      section(table('Wallet rules', page.details)),
      section(render('campaignSteps', { title: 'Illustrative service flow', items: page.steps, source: 'dummy' })),
      section(copy({ title: 'Ask about Virtual Wallet', paragraphs: ['An account manager can confirm whether the service is available for your company.'], source: 'dummy', actions: [{ label: 'Contact Azercell Business', href: 'mailto:business@azercell.com', variant: 'primary' }] }))
    ];
  }

  function buildArchive() {
    var page = D.pages.archive;
    var params = new URLSearchParams(global.location.search);
    var perPage = parseInt(params.get('perPage'), 10);
    if ([6, 12, 24].indexOf(perPage) < 0) perPage = 6;
    var maxPage = Math.max(1, Math.ceil(page.items.length / perPage));
    var currentPage = Math.min(maxPage, Math.max(1, parseInt(params.get('page'), 10) || 1));
    return [
      hero('archive'),
      legend(),
      section(render('campaignArchive', { items: page.items, page: currentPage, perPage: perPage, baseHref: D.routes.archive }))
    ];
  }

  function build(key) {
    if (key === 'hub') return buildHub();
    if (key === 'why') return buildWhy();
    if (key === 'wifi') return buildWifi();
    if (key === 'acquisition') return buildAcquisition();
    if (key === 'mnp60' || key === 'mnp80') return buildMnp(key);
    if (key === 'devices') return buildDevices();
    if (key === 'iphone16' || key === 'iphone17') return buildIphone(key);
    if (key === 'leasing') return buildLeasing();
    if (key === 'discounts') return buildDiscounts();
    if (key === 'club') return buildClub();
    if (key === 'wallet') return buildWallet();
    if (key === 'archive') return buildArchive();
    return buildHub();
  }

  function mount(key) {
    var R = global.SiteRegistry;
    var chrome = R.SITE_CHROME;

    global.Components.mount('#page-top', [
      ['announcementBar', { messages: chrome.announcements }],
      ['siteHeader', R.headerProps({ branch: 'business' })]
    ]);
    global.Components.mount('#page-bottom', [['siteFooter', chrome.businessFooter]]);
    global.Components.mount('#page-chat', [['floatingBar', chrome.businessFloatingBar]]);
    global.Components.mount('#page-main', build(key));
  }

  global.BusinessCampaignsPage = { mount: mount };
})(window);
