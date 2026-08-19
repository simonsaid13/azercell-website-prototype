/* ==========================================================================
   Azercell HTML Prototype — internet pack page renderer
   ========================================================================== */

(function (global) {
  'use strict';

  var D = global.InternetPackData;

  function section(inner, modifier) {
    return '<section class="section' + (modifier ? ' ' + modifier : '') + '"><div class="wrap">' + inner + '</div></section>';
  }

  function categoryNavItems(activeId) {
    var R = global.SiteRegistry;
    var href = R ? R.href : function (p) { return p; };
    var items = [{ id: 'hub', label: 'All internet packs', href: '/tariffs/internet/' }];
    D.categories.forEach(function (cat) {
      items.push({ id: cat.id, label: cat.label, href: cat.path });
    });
    return items.map(function (item) {
      return { id: item.id, label: item.label, href: item.href };
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
      volumeBand: pack.volumeBand || 'all',
      validity: pack.validity,
      keyword: pack.keyword,
      shortCode: pack.shortCode,
      usageHints: pack.usageHints,
      details: pack.details,
      autoRenew: pack.autoRenew,
      kabinetimHref: D.KABINETIM
    }, extras || {});
  }

  function sortFilterGroups(urlBase) {
    return [
      {
        key: 'sort',
        label: 'Price',
        syncUrl: true,
        urlParam: 'sort',
        options: [
          { value: 'default', label: 'Recommended' },
          { value: 'price-asc', label: 'Low to higher' },
          { value: 'price-desc', label: 'Higher to low' }
        ]
      }
    ];
  }

  function volumeFilterGroup(category) {
    var filters = category.volumeFilters || [{ value: 'all', label: 'All offers' }];
    if (filters.length <= 1) return null;
    return {
      key: 'volume',
      label: 'Traffic',
      syncUrl: true,
      urlParam: 'volume',
      options: filters
    };
  }

  function filterBlock(category, urlBase, packCount) {
    if (packCount <= 1) return '';
    var groups = sortFilterGroups(urlBase);
    var volume = volumeFilterGroup(category);
    if (volume) groups.unshift(volume);
    if (!groups.length) return '';
    return global.Components.render('internetPackFilters', { groups: groups, urlBase: urlBase });
  }

  function categoryNavBlock(activeId) {
    return global.Components.render('internetCategoryNav', {
      items: categoryNavItems(activeId),
      active: activeId
    });
  }

  function quickActionsBlock(href) {
    return global.Components.render('quickActions', {
      items: [
        { icon: '01', label: 'Activate in Kabinetim', href: D.KABINETIM },
        { icon: '02', label: 'All mobile tariffs', href: href('/tariffs/mobile/') },
        { icon: '03', label: 'Network support', href: href('/support/internet/') }
      ]
    });
  }

  function relatedLinks(href, currentCategory) {
    var C = global.Components;
    var cards = D.categories
      .filter(function (cat) { return cat.id !== currentCategory; })
      .slice(0, 3)
      .map(function (cat) {
        return C.render('linkCard', {
          media: cat.label,
          title: cat.label + ' packs',
          body: cat.hero.body,
          href: href(cat.path),
          linkLabel: 'See ' + cat.label.toLowerCase()
        });
      })
      .join('');

    return (
      C.render('sectionHead', { eyebrow: 'Also explore', title: 'Related services' }) +
      '<div class="grid grid--3" style="margin-top: var(--sp-5)">' +
        cards +
        C.render('linkCard', {
          media: 'Mobile tariffs',
          title: 'Mobile tariffs',
          body: 'Compare prepaid and postpaid plans with bundled data, calls and SMS.',
          href: href('/tariffs/mobile/'),
          linkLabel: 'All mobile tariffs'
        }) +
        C.render('linkCard', {
          media: 'Roaming',
          title: 'International roaming',
          body: 'Country rates and roaming internet packs for travel abroad.',
          href: href('/tariffs/roaming/'),
          linkLabel: 'Roaming overview'
        }) +
      '</div>'
    );
  }

  function escAttr(v) {
    return String(v).replace(/"/g, '&quot;');
  }

  function mountCategory(categoryId) {
    var C = global.Components;
    var R = global.SiteRegistry;
    var href = R ? R.href : function (p) { return p; };
    var category = D.getCategory(categoryId);
    if (!category) return;

    var packs = D.getPacksByCategory(categoryId);
    var urlBase = href(category.path);
    var crossSell = D.getCrossSell(categoryId);
    var faq = D.getFaq(categoryId);

    var filters = filterBlock(category, urlBase, packs.length);
    var packGrid =
      (filters
        ? '<div data-filter-scope data-ipack-scope>' + filters
        : '<div>') +
        '<div class="grid grid--2 cmp-ipack-grid" data-filter-target data-ipack-grid>' +
          packs.map(function (pack) {
            return (
              '<div data-filter-tags="' + escAttr(pack.volumeBand || 'all') + '">' +
                C.render('internetPackCard', packCardProps(pack)) +
              '</div>'
            );
          }).join('') +
        '</div>' +
        (filters
          ? '<p class="t-body t-muted" data-filter-empty hidden style="margin-top: var(--sp-4)">' +
              'No packs match this filter. Choose another option.</p>'
          : '') +
      '</div>';

    var blocks = [
      section(C.render('sectionHead', category.hero)),
      section(quickActionsBlock(href), 'section--tight'),
      section(
        '<div class="cmp-ipack-layout" id="ipack-catalog">' +
          categoryNavBlock(categoryId) +
          '<div class="cmp-ipack-layout__body">' +
            C.render('sectionHead', {
              eyebrow: 'Pack list',
              title: 'Choose the right internet pack',
              body: 'Activation happens in Kabinetim or via SMS to 2525 — not on this website.'
            }) +
            packGrid +
          '</div>' +
        '</div>'
      ),
      section(
        C.render('sectionHead', { eyebrow: 'Questions', title: 'Frequently asked questions' }) +
        '<div style="margin-top: var(--sp-5)">' +
          C.render('accordion', { items: faq }) +
        '</div>'
      ),
      section(C.render('internetUpgradeBanner', {
        eyebrow: 'Smarter option',
        title: crossSell.title,
        body: crossSell.body,
        actions: crossSell.actions,
        note: crossSell.note
      })),
      section(relatedLinks(href, categoryId)),
      section(
        '<p class="t-body t-muted" style="max-width: 72ch">' +
          'All prices include VAT. Internet packs are for personal use only and stack on your active mobile tariff.' +
        '</p>'
      )
    ];

    C.mount('#page-main', blocks.filter(Boolean));
  }

  function mountHub() {
    var C = global.Components;
    var R = global.SiteRegistry;
    var href = R ? R.href : function (p) { return p; };
    var crossSell = D.getCrossSell('hub');
    var featured = D.getFeaturedPacks();

    var categoryCards = D.categories.map(function (cat) {
      var pack = D.getPack(cat.featuredPackId);
      if (!pack) return '';
      return (
        '<div>' +
          C.render('internetPackCard', packCardProps(pack)) +
        '</div>'
      );
    }).join('');

    var blocks = [
      section(C.render('sectionHead', {
        eyebrow: 'Internet packs',
        title: 'Match data to how you use your phone',
        body: 'Monthly, weekly, daily, or unlimited-speed bursts — add data on top of your current mobile tariff.'
      })),
      section(quickActionsBlock(href), 'section--tight'),
      section(
        '<div class="cmp-ipack-layout" id="ipack-catalog">' +
          categoryNavBlock('hub') +
          '<div class="cmp-ipack-layout__body">' +
            C.render('sectionHead', {
              eyebrow: 'Categories',
              title: 'Browse by commitment',
              body: 'Pick a pack type that fits how often you need extra data.'
            }) +
            '<div class="grid grid--2 cmp-ipack-grid">' + categoryCards + '</div>' +
          '</div>' +
        '</div>'
      ),
      section(
        '<div class="section__title-group">' +
          '<p class="t-label">How it works</p>' +
          '<h2 class="t-h2">Internet packs stack on your tariff</h2>' +
        '</div>' +
        '<ul class="stack" style="margin-top: var(--sp-4)">' +
          '<li class="t-body">Add-on packs give extra data without changing your mobile plan.</li>' +
          '<li class="t-body">Monthly packs last 28 days on prepaid and 30 days on postpaid lines.</li>' +
          '<li class="t-body">Daily packs renew every 24 hours when auto-renewal is on and your balance allows.</li>' +
          '<li class="t-body">Activate in Kabinetim or send the SMS keyword to 2525 — shown on each pack card.</li>' +
        '</ul>'
      ),
      section(
        C.render('sectionHead', { eyebrow: 'Questions', title: 'Frequently asked questions' }) +
        '<div style="margin-top: var(--sp-5)">' +
          C.render('accordion', { items: D.getFaq('monthly') }) +
        '</div>'
      ),
      section(C.render('internetUpgradeBanner', {
        eyebrow: 'Smarter option',
        title: crossSell.title,
        body: crossSell.body,
        actions: crossSell.actions,
        note: crossSell.note
      })),
      section(relatedLinks(href, 'hub')),
      section(
        '<p class="t-body t-muted" style="max-width: 72ch">' +
          'All prices include VAT. Internet packs are for personal use only.' +
        '</p>'
      )
    ];

    C.mount('#page-main', blocks.filter(Boolean));
  }

  function mount(mode) {
    if (mode === 'hub') mountHub();
    else mountCategory(mode);
  }

  global.InternetPackPage = { mount: mount };
})(window);
