/* ==========================================================================
   Azercell HTML Prototype — component library
   Every block of every page is defined here and rendered from data.
   Each component is a function returning an HTML string.
   ========================================================================== */

(function (global) {
  'use strict';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function attr(name, value) {
    return value == null || value === '' ? '' : ` ${name}="${esc(value)}"`;
  }

  function classes() {
    return Array.prototype.slice
      .call(arguments)
      .filter(Boolean)
      .join(' ');
  }

  /** Resolves registry paths at render time so links stay in sync with PAGE_REGISTRY. */
  function registryHref(path) {
    if (!path) return '';
    if (/^https?:/.test(path)) return path;
    if (path.indexOf('/planned/?path=') === 0) {
      try {
        path = decodeURIComponent((path.match(/[?&]path=([^&]+)/) || [])[1] || '');
      } catch (e) { /* keep original */ }
    }
    if (global.SiteRegistry && global.SiteRegistry.href) return global.SiteRegistry.href(path);
    return path;
  }

  function planCardAction(item, props) {
    var copy = Object.assign({}, item);
    var R = global.SiteRegistry;

    if (copy.label === 'Plan details') {
      if (props.detailHref) {
        copy.href = registryHref(props.detailHref);
      } else if (props.compareId && R && R.tariffDetailHref) {
        copy.href = R.tariffDetailHref(props.compareId);
      }
    } else if (copy.href && !/^https?:/.test(copy.href)) {
      copy.href = registryHref(copy.href);
    }

    return copy;
  }

  /** Renders a link or button depending on whether a destination exists. */
  function action(item, extraClass) {
    var cls = classes('btn', item.variant === 'primary' ? 'btn--primary' : null, item.block ? 'btn--block' : null, extraClass);
    var external = item.href && /^https?:/.test(item.href);
    if (item.href) {
      return (
        '<a class="' + cls + '"' + attr('href', item.href) +
        (external ? ' target="_blank" rel="noopener"' : '') + '>' +
        esc(item.label) + '</a>'
      );
    }
    return '<button type="button" class="' + cls + '"' + attr('data-note', item.note) + '>' + esc(item.label) + '</button>';
  }

  function actions(list, extraClass) {
    if (!list || !list.length) return '';
    return '<div class="row-actions">' + list.map(function (a) { return action(a, extraClass); }).join('') + '</div>';
  }

  function placeholder(label, modifier) {
    return '<div class="' + classes('ph', modifier) + '">' + esc(label) + '</div>';
  }

  var C = {};

  /* --------------------------------------------------------------------
     Announcement bar
     -------------------------------------------------------------------- */

  C.announcementBar = function (props) {
    var messages = props.messages || [];
    return (
      '<div class="cmp-announce" data-announce>' +
        '<div class="wrap">' +
          '<div class="cmp-announce__inner">' +
            '<button type="button" class="cmp-announce__nav" data-announce-prev aria-label="Previous announcement">&#8592;</button>' +
            '<p class="t-small cmp-announce__msg" data-announce-msg>' + esc(messages[0] || '') + '</p>' +
            '<button type="button" class="cmp-announce__nav" data-announce-next aria-label="Next announcement">&#8594;</button>' +
          '</div>' +
        '</div>' +
        '<script type="application/json" data-announce-data>' + JSON.stringify(messages) + '</script>' +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Site header — mega menu on desktop, drawer on mobile/tablet
     -------------------------------------------------------------------- */

  function panelColumn(col) {
    return (
      '<div>' +
        '<h3 class="t-label">' + esc(col.title) + '</h3>' +
        '<div class="cmp-header__panel-links">' +
          (col.links || []).map(function (l) {
            return '<a class="t-body"' + attr('href', l.href) + '>' + esc(l.label) + '</a>';
          }).join('') +
        '</div>' +
      '</div>'
    );
  }

  function drawerGroup(item, index) {
    return (
      '<div class="cmp-header__group">' +
        '<button type="button" class="cmp-header__group-toggle" data-drawer-toggle="' + index + '" aria-expanded="false">' +
          '<span>' + esc(item.label) + '</span><span aria-hidden="true">+</span>' +
        '</button>' +
        '<div class="cmp-header__group-body" data-drawer-body="' + index + '">' +
          (item.columns || []).map(function (col) {
            return (
              '<p class="t-label t-muted">' + esc(col.title) + '</p>' +
              (col.links || []).map(function (l) {
                return '<a class="t-body"' + attr('href', l.href) + '>' + esc(l.label) + '</a>';
              }).join('')
            );
          }).join('') +
        '</div>' +
      '</div>'
    );
  }

  C.siteHeader = function (props) {
    var nav = props.nav || [];
    var logo = props.logo || 'Azercell';
    var primary = props.primaryAction;
    var secondary = props.secondaryAction;
    var search = props.search;
    var searchId = search ? (search.id || 'header-search') : '';
    var branches = props.branches || [];
    var branch = props.branch || 'personal';

    function branchSwitcher(modifier) {
      if (!branches.length) return '';
      return (
        '<nav class="cmp-header__branch' + (modifier ? ' ' + modifier : '') + '" aria-label="Personal or Business">' +
          branches.map(function (item) {
            var active = item.id === branch;
            return (
              '<a class="cmp-header__branch-link"' +
                attr('href', item.href) +
                (active ? ' aria-current="page"' : '') +
              '>' + esc(item.label) + '</a>'
            );
          }).join('') +
        '</nav>'
      );
    }

    function headerSearch(modifier) {
      if (!search) return '';
      return (
        '<form class="cmp-search cmp-search--compact ' + modifier + '"' +
          attr('action', search.action || '/search/') + ' method="get" role="search">' +
          '<label class="visually-hidden" for="' + esc(searchId + '-' + modifier) + '">' +
            esc(search.label || 'Search') + '</label>' +
          '<input class="input" type="search" id="' + esc(searchId + '-' + modifier) + '" name="q"' +
            attr('placeholder', search.placeholder || 'Search anything...') + '>' +
          '<button type="submit" class="btn btn--icon btn--quiet" aria-label="Search">' +
            '<span aria-hidden="true">&#8981;</span></button>' +
        '</form>'
      );
    }

    return (
      '<header class="cmp-header" data-header>' +
        '<div class="wrap">' +
          '<div class="cmp-header__bar">' +
            '<a class="cmp-header__logo"' + attr('href', props.logoHref || '/') + '>' + esc(logo) + '</a>' +
            branchSwitcher() +
            '<nav class="cmp-header__nav" aria-label="Main">' +
              '<ul class="cmp-header__nav-list">' +
                nav.map(function (item, i) {
                  return (
                    '<li>' +
                      '<button type="button" class="cmp-header__nav-btn" data-menu-toggle="' + i + '" aria-expanded="false">' +
                        esc(item.label) + '<span aria-hidden="true">&#9662;</span>' +
                      '</button>' +
                    '</li>'
                  );
                }).join('') +
              '</ul>' +
            '</nav>' +
            headerSearch('cmp-header__search-inline') +
            '<div class="cmp-header__actions">' +
              (search
                ? '<button type="button" class="btn btn--icon btn--quiet cmp-header__search-toggle" data-search-toggle aria-expanded="false" aria-controls="header-search-row" aria-label="Open search">' +
                    '<span aria-hidden="true">&#8981;</span></button>'
                : '') +
              (secondary ? '<a class="btn btn--small btn--quiet cmp-header__secondary"' + attr('href', secondary.href) + '>' + esc(secondary.label) + '</a>' : '') +
              (primary ? '<a class="btn btn--small btn--primary"' + attr('href', primary.href) + '>' + esc(primary.label) + '</a>' : '') +
              '<button type="button" class="btn btn--small cmp-header__menu-btn" data-drawer-btn aria-expanded="false">Menu</button>' +
            '</div>' +
          '</div>' +
          (search
            ? '<div class="cmp-header__search-row" id="header-search-row" data-search-row>' +
                headerSearch('cmp-header__search-mobile') +
              '</div>'
            : '') +
        '</div>' +
        nav.map(function (item, i) {
          return (
            '<div class="cmp-header__panel" data-menu-panel="' + i + '">' +
              '<div class="wrap">' +
                '<div class="cmp-header__panel-grid">' +
                  (item.columns || []).map(panelColumn).join('') +
                '</div>' +
              '</div>' +
            '</div>'
          );
        }).join('') +
        '<div class="cmp-header__drawer" data-drawer>' +
          '<div class="wrap">' +
            (search ? '<div class="cmp-header__drawer-search">' + headerSearch('cmp-header__search-drawer') + '</div>' : '') +
            nav.map(drawerGroup).join('') +
            '<div class="cmp-header__drawer-actions">' +
              (secondary ? '<a class="btn btn--block"' + attr('href', secondary.href) + '>' + esc(secondary.label) + '</a>' : '') +
              (primary ? '<a class="btn btn--block btn--primary"' + attr('href', primary.href) + '>' + esc(primary.label) + '</a>' : '') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  };

  /* --------------------------------------------------------------------
     Hero banner — multiple slides, dot navigation
     -------------------------------------------------------------------- */

  function heroSlide(slide, index) {
    return (
      '<div class="cmp-hero__grid" data-hero-slide="' + index + '"' + (index === 0 ? '' : ' hidden') + '>' +
        '<div class="cmp-hero__body">' +
          (slide.eyebrow ? '<p class="t-label">' + esc(slide.eyebrow) + '</p>' : '') +
          '<div class="cmp-hero__copy">' +
            '<h1 class="t-display">' + esc(slide.title) + '</h1>' +
          '</div>' +
          (slide.body ? '<p class="t-lead t-muted cmp-hero__lead">' + esc(slide.body) + '</p>' : '') +
          actions(slide.actions) +
          (slide.stats && slide.stats.length
            ? '<div class="cmp-hero__stats">' +
                slide.stats.map(function (s) {
                  return (
                    '<div class="cmp-hero__stat">' +
                      '<span class="t-h2">' + esc(s.value) + '</span>' +
                      '<span class="t-small t-muted">' + esc(s.label) + '</span>' +
                    '</div>'
                  );
                }).join('') +
              '</div>'
            : '') +
        '</div>' +
        '<div class="cmp-hero__media">' + placeholder(slide.media || 'Hero visual', 'ph--tall') + '</div>' +
      '</div>'
    );
  }

  C.heroBanner = function (props) {
    var slides = props.slides || [];
    return (
      '<section class="cmp-hero" data-hero aria-label="Featured offers">' +
        '<div class="wrap">' +
          slides.map(heroSlide).join('') +
          (slides.length > 1
            ? '<div class="cmp-hero__dots" role="tablist" aria-label="Hero slides">' +
                slides.map(function (s, i) {
                  return (
                    '<button type="button" class="cmp-hero__dot" role="tab" data-hero-dot="' + i + '"' +
                      ' aria-current="' + (i === 0 ? 'true' : 'false') + '"' +
                      ' aria-label="Slide ' + (i + 1) + ': ' + esc(s.title) + '"></button>'
                  );
                }).join('') +
              '</div>'
            : '') +
        '</div>' +
      '</section>'
    );
  };

  /* --------------------------------------------------------------------
     Quick actions
     -------------------------------------------------------------------- */

  C.quickActions = function (props) {
    var items = props.items || [];
    return (
      '<nav class="cmp-quick" aria-label="Quick actions">' +
        items.map(function (item) {
          var external = item.href && /^https?:/.test(item.href);
          return (
            '<a class="cmp-quick__item"' + attr('href', item.href) +
              (external ? ' target="_blank" rel="noopener"' : '') + '>' +
              '<span class="cmp-quick__icon" aria-hidden="true">' + esc(item.icon || '#') + '</span>' +
              '<span class="t-body">' + esc(item.label) + '</span>' +
            '</a>'
          );
        }).join('') +
      '</nav>'
    );
  };

  /* --------------------------------------------------------------------
     Section heading
     -------------------------------------------------------------------- */

  C.sectionHead = function (props) {
    var head =
      '<div class="section__title-group">' +
        (props.eyebrow ? '<p class="t-label">' + esc(props.eyebrow) + '</p>' : '') +
        '<h2 class="t-h1">' + esc(props.title) + '</h2>' +
        (props.body ? '<p class="t-lead t-muted">' + esc(props.body) + '</p>' : '') +
      '</div>';

    if (!props.action) return '<div class="section__head">' + head + '</div>';

    return '<div class="section__head-row">' + head + actions([props.action]) + '</div>';
  };

  /* --------------------------------------------------------------------
     Plan card — price selector switches the specs shown
     -------------------------------------------------------------------- */

  function planPriceButtons(props, tiers) {
    return tiers.map(function (t, i) {
      return (
        '<button type="button" class="cmp-plan__price"' +
          (t.shortLabel ? ' data-plan-price-label' : '') +
          ' data-plan-price="' + i + '"' +
          ' aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' +
          esc(t.price) +
          (t.shortLabel ? '<span class="t-small">' + esc(t.shortLabel) + '</span>' : '') +
        '</button>'
      );
    }).join('');
  }

  function planPricesBlock(props, tiers) {
    if (tiers.length <= 1) return '';
    var useCarousel = props.scrollPrices || (props.detail && tiers.length > 3);
    if (!useCarousel) {
      return (
        '<div class="cmp-plan__prices" role="group" aria-label="' + esc(props.name) + ' price options">' +
          planPriceButtons(props, tiers) +
        '</div>'
      );
    }
    return (
      '<div class="cmp-plan__price-carousel cmp-carousel cmp-carousel--compact" data-carousel>' +
        '<div class="cmp-plan__price-carousel-head">' +
          '<p class="t-label">Pick a pack</p>' +
          '<div class="cmp-carousel__nav" data-carousel-nav>' +
            '<button type="button" class="btn btn--icon" data-carousel-prev aria-label="Scroll packs left">&#8592;</button>' +
            '<button type="button" class="btn btn--icon" data-carousel-next aria-label="Scroll packs right">&#8594;</button>' +
          '</div>' +
        '</div>' +
        '<p class="t-small t-muted cmp-carousel__hint">Swipe to see all packs</p>' +
        '<div class="scroller scroller--prices" data-carousel-track role="group" aria-label="' + esc(props.name) + ' price options">' +
          planPriceButtons(props, tiers) +
        '</div>' +
      '</div>'
    );
  }

  C.planCard = function (props) {
    var tiers = props.tiers || [];
    var R = global.SiteRegistry;
    var titleHref = props.detailHref
      ? registryHref(props.detailHref)
      : (props.compareId && R && R.tariffDetailHref ? R.tariffDetailHref(props.compareId) : '');
    return (
      '<article class="cmp-plan' + (props.detail ? ' cmp-plan--detail' : '') + '" data-plan' +
        (props.compareId ? ' data-compare-id="' + esc(props.compareId) + '"' : '') +
        (props.tierIds && props.tierIds.length
          ? ' data-tier-ids="' + esc(props.tierIds.join(',')) + '"'
          : '') + '>' +
        '<div class="cmp-card__head">' +
          '<div class="stack">' +
            '<h3 class="t-h2">' +
              (titleHref
                ? '<a class="cmp-plan__title-link" href="' + esc(titleHref) + '">' + esc(props.name) + '</a>'
                : esc(props.name)) +
            '</h3>' +
            (props.type ? '<span class="t-small t-muted">' + esc(props.type) + '</span>' : '') +
          '</div>' +
          (props.badge ? '<span class="badge">' + esc(props.badge) + '</span>' : '') +
        '</div>' +

        planPricesBlock(props, tiers) +

        tiers.map(function (t, i) {
          return (
            '<div class="stack" data-plan-tier="' + i + '"' + (i === 0 ? '' : ' hidden') + '>' +
              (t.tierName ? '<p class="t-h3">' + esc(t.tierName) + '</p>' : '') +
              '<div class="cmp-plan__specs">' +
                (t.specs || []).map(function (s) {
                  return (
                    '<div class="cmp-plan__spec">' +
                      '<span class="t-h3">' + esc(s.value) + '</span>' +
                      '<span class="t-small t-muted">' + esc(s.label) + '</span>' +
                    '</div>'
                  );
                }).join('') +
              '</div>' +
              (t.validity ? '<p class="t-small t-muted">' + esc(t.validity) + '</p>' : '') +
              (t.activationNote
                ? '<p class="t-small cmp-plan__activate-note">' + esc(t.activationNote) + '</p>'
                : '') +
            '</div>'
          );
        }).join('') +

        (props.note
          ? '<p class="t-small cmp-plan__note">' + esc(props.note) + '</p>'
          : '') +

        '<div class="cmp-plan__foot">' +
          (props.actions || []).map(function (a) { return action(planCardAction(a, props), 'btn--block'); }).join('') +
          (props.compareId && global.SiteRegistry
            ? '<a class="btn btn--block cmp-plan__compare" data-compare-link href="' +
                esc(global.SiteRegistry.tariffCompareHref(props.compareId, 0)) + '">Compare</a>'
            : '') +
        '</div>' +
      '</article>'
    );
  };

  /* --------------------------------------------------------------------
     Tariff pack card — one price tier as its own card (detail page carousel)
     -------------------------------------------------------------------- */

  C.tariffPackCard = function (props) {
    var specs = props.specs || [];
    var compareHref = props.compareHref;
    return (
      '<article class="cmp-plan cmp-plan--pack"' + attr('data-tier-id', props.tierId) + '>' +
        '<div class="cmp-card__head">' +
          '<div class="stack">' +
            '<h3 class="t-h3">' + esc(props.name) + '</h3>' +
            (props.type ? '<span class="t-small t-muted">' + esc(props.type) + '</span>' : '') +
          '</div>' +
          (props.badge ? '<span class="badge">' + esc(props.badge) + '</span>' : '') +
        '</div>' +
        (props.price
          ? '<div class="cmp-plan__prices">' +
              '<span class="cmp-plan__price cmp-plan__price--static" aria-pressed="true">' + esc(props.price) + '</span>' +
            '</div>'
          : '') +
        '<div class="cmp-plan__specs">' +
          specs.map(function (s) {
            if (!s.value || s.value === '—') return '';
            return (
              '<div class="cmp-plan__spec">' +
                '<span class="t-h3">' + esc(s.value) + '</span>' +
                '<span class="t-small t-muted">' + esc(s.label) + '</span>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
        (props.validity ? '<p class="t-small t-muted cmp-plan__validity">' + esc(props.validity) + '</p>' : '') +
        (props.note ? '<p class="t-small cmp-plan__note">' + esc(props.note) + '</p>' : '') +
        (props.ussd ? '<p class="t-small t-muted cmp-plan__ussd">' + esc(props.ussd) + '</p>' : '') +
        '<div class="cmp-plan__foot">' +
          (props.actions || []).map(function (a) { return action(a, 'btn--block'); }).join('') +
          (compareHref
            ? '<a class="btn btn--block cmp-plan__compare"' + attr('href', compareHref) + '>Compare</a>'
            : '') +
        '</div>' +
      '</article>'
    );
  };

  /* --------------------------------------------------------------------
     Promo card — used for "build your own plan" style cells
     -------------------------------------------------------------------- */

  C.promoCard = function (props) {
    return (
      '<article class="cmp-card">' +
        (props.media ? placeholder(props.media, 'ph--wide') : '') +
        '<div class="cmp-card__body">' +
          (props.eyebrow ? '<p class="t-label">' + esc(props.eyebrow) + '</p>' : '') +
          '<h3 class="t-h3">' + esc(props.title) + '</h3>' +
          (props.body ? '<p class="t-body t-muted">' + esc(props.body) + '</p>' : '') +
        '</div>' +
        (props.actions && props.actions.length
          ? '<div class="cmp-card__foot">' +
              props.actions.map(function (a) { return action(a, 'btn--block'); }).join('') +
            '</div>'
          : '') +
      '</article>'
    );
  };

  /* --------------------------------------------------------------------
     Callout banner — full-width prompt (archive, cross-sell, help)
     -------------------------------------------------------------------- */

  C.calloutBanner = function (props) {
    var inverse = props.inverse !== false;
    return (
      '<aside class="cmp-callout' + (inverse ? ' cmp-callout--inverse' : '') + '">' +
        '<div class="cmp-callout__copy">' +
          (props.eyebrow ? '<p class="t-label">' + esc(props.eyebrow) + '</p>' : '') +
          '<h3 class="t-h3">' + esc(props.title) + '</h3>' +
          (props.body ? '<p class="t-body' + (inverse ? '' : ' t-muted') + '">' + esc(props.body) + '</p>' : '') +
        '</div>' +
        (props.actions && props.actions.length
          ? '<div class="cmp-callout__actions">' + actions(props.actions) + '</div>'
          : '') +
      '</aside>'
    );
  };

  /* --------------------------------------------------------------------
     Local search field — filters items already on the page
     -------------------------------------------------------------------- */

  C.localSearchField = function (props) {
    var id = props.id || 'local-search';
    return (
      '<div class="cmp-local-search">' +
        '<label class="visually-hidden" for="' + esc(id) + '">' + esc(props.label || 'Search') + '</label>' +
        '<input class="input" type="search" id="' + esc(id) + '" data-archive-search' +
          attr('placeholder', props.placeholder || 'Search…') +
          attr('value', props.value || '') + '>' +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Archive plan card — legacy tariff tile for the archive list
     -------------------------------------------------------------------- */

  C.archivePlanCard = function (props) {
    var searchText = (props.name + ' ' + (props.tagline || '')).toLowerCase();
    return (
      '<article class="cmp-archive-plan" data-archive-item data-search-text="' + esc(searchText) + '">' +
        '<a class="cmp-archive-plan__link"' + attr('href', props.href || '#') + '>' +
          '<span class="badge">Archived</span>' +
          '<h3 class="t-h3">' + esc(props.name) + '</h3>' +
          (props.tagline ? '<p class="t-body t-muted">' + esc(props.tagline) + '</p>' : '') +
          '<span class="t-small link-inline">View tariff terms</span>' +
        '</a>' +
      '</article>'
    );
  };

  /* --------------------------------------------------------------------
     Pagination — page controls filled by archive list behaviour
     -------------------------------------------------------------------- */

  C.pagination = function (props) {
    return (
      '<nav class="cmp-pagination" data-archive-pagination aria-label="' + esc(props.label || 'Pagination') + '" hidden></nav>'
    );
  };

  /* --------------------------------------------------------------------
     Tariff compare tool — step 1 pick plans, step 2 side-by-side table
     -------------------------------------------------------------------- */

  C.tariffCompareTool = function (props) {
    var tariffs = props.tariffs || [];
    var hrefFn = global.SiteRegistry ? global.SiteRegistry.href : function (path) { return path; };

    var pickerCards = tariffs.map(function (tariff) {
      var tierCount = (tariff.tiers || []).length;
      var tierLabel = tierCount === 1 ? '1 price option' : tierCount + ' price options';
      return (
        '<article class="cmp-compare__pick">' +
          '<button type="button" class="cmp-compare__pick-btn" data-compare-toggle="' + esc(tariff.id) + '" aria-pressed="false">' +
            '<span class="cmp-compare__pick-check" aria-hidden="true"></span>' +
            '<span class="stack">' +
              '<strong class="t-h3">' + esc(tariff.name) + '</strong>' +
              (tariff.type ? '<span class="t-small t-muted">' + esc(tariff.type) + '</span>' : '') +
            '</span>' +
            (tariff.badge ? '<span class="badge">' + esc(tariff.badge) + '</span>' : '') +
          '</button>' +
          '<p class="t-small t-muted">' + esc(tierLabel) + '</p>' +
        '</article>'
      );
    }).join('');

    return (
      '<div class="cmp-compare" data-tariff-compare>' +
        '<div class="cmp-compare__step" data-compare-step="1">' +
          '<div class="cmp-compare__slots">' +
            '<p class="t-label">Selected plans</p>' +
            '<ol class="cmp-compare__slot-list" data-compare-slots></ol>' +
            '<p class="t-small t-muted" data-compare-hint>Pick at least 2 plans. You can compare up to 4.</p>' +
          '</div>' +
          '<div class="grid grid--2 cmp-compare__grid">' + pickerCards + '</div>' +
          '<div class="cmp-compare__actions">' +
            '<button type="button" class="btn btn--primary" data-compare-go disabled>Compare selected</button>' +
          '</div>' +
        '</div>' +
        '<div class="cmp-compare__step" data-compare-step="2" hidden>' +
          '<div class="cmp-compare__table-wrap">' +
            '<table class="cmp-compare__table" data-compare-table>' +
              '<caption class="visually-hidden">Tariff comparison</caption>' +
            '</table>' +
          '</div>' +
          '<div class="grid grid--2 cmp-compare__notes" data-compare-notes></div>' +
          '<div class="cmp-compare__actions">' +
            '<button type="button" class="btn" data-compare-back>Change selection</button>' +
            '<a class="btn" href="' + esc(hrefFn('/tariffs/mobile/')) + '">Browse all tariffs</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Filter tabs — filters items already on the page
     -------------------------------------------------------------------- */

  function filterTabHref(base, param, value) {
    if (!base || !value || value === 'all') return base || '';
    var join = base.indexOf('?') >= 0 ? '&' : '?';
    return base + join + (param || 'type') + '=' + encodeURIComponent(value);
  }

  C.filterTabs = function (props) {
    var groups = props.groups || [];
    var urlBase = props.urlBase || '';
    return (
      '<div class="cmp-filters">' +
        groups.map(function (group) {
          var param = group.urlParam || 'type';
          var useLinks = !!(group.syncUrl && urlBase);
          return (
            '<div class="cmp-tabs" role="tablist"' +
              attr('aria-label', group.label) +
              attr('data-filter-group', group.key) +
              attr('data-filter-sync-url', group.syncUrl ? 'true' : null) +
              attr('data-filter-param', group.urlParam || null) + '>' +
              (group.options || []).map(function (opt, i) {
                var selected = i === 0 ? 'true' : 'false';
                var attrs =
                  ' class="cmp-tab" role="tab"' +
                  ' data-filter-value="' + esc(opt.value) + '"' +
                  ' aria-selected="' + selected + '"';
                if (useLinks) {
                  return (
                    '<a href="' + esc(filterTabHref(urlBase, param, opt.value)) + '"' + attrs + '>' +
                      esc(opt.label) + '</a>'
                  );
                }
                return (
                  '<button type="button"' + attrs + '>' +
                    esc(opt.label) + '</button>'
                );
              }).join('') +
            '</div>'
          );
        }).join('') +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Device card
     -------------------------------------------------------------------- */

  C.deviceCard = function (props) {
    return (
      '<article class="cmp-device"' + attr('data-category', props.category) + attr('data-brand', props.brand) + '>' +
        placeholder(props.name, 'ph--portrait') +
        '<div class="cmp-device__meta">' +
          '<h3 class="t-h4">' + esc(props.name) + '</h3>' +
          '<p class="t-small t-muted">' + esc(props.priceLabel || 'Starting from') + '</p>' +
          '<p class="t-h3">' + esc(props.price) + '</p>' +
        '</div>' +
        (props.action ? action(props.action, 'btn--small btn--block') : '') +
      '</article>'
    );
  };

  /* --------------------------------------------------------------------
     Offer card — priced pack or solution, filterable by category
     -------------------------------------------------------------------- */

  C.offerCard = function (props) {
    var meta = props.meta || [];
    return (
      '<article class="cmp-offer"' + attr('data-category', props.category) + '>' +
        '<div class="cmp-offer__head">' +
          '<h3 class="t-h3">' + esc(props.name) + '</h3>' +
          (props.badge ? '<span class="badge">' + esc(props.badge) + '</span>' : '') +
        '</div>' +
        (props.price ? '<p class="t-h2">' + esc(props.price) + '</p>' : '') +
        (props.priceNote ? '<p class="t-small t-muted">' + esc(props.priceNote) + '</p>' : '') +
        (props.body ? '<p class="t-body t-muted">' + esc(props.body) + '</p>' : '') +
        (meta.length
          ? '<ul class="cmp-offer__meta">' +
              meta.map(function (m) { return '<li class="t-small t-muted">' + esc(m) + '</li>'; }).join('') +
            '</ul>'
          : '') +
        '<div class="cmp-offer__foot">' +
          (props.action ? action(props.action, 'btn--small btn--block') : '') +
        '</div>' +
      '</article>'
    );
  };

  /* --------------------------------------------------------------------
     Split banner — copy on one side, media on the other
     -------------------------------------------------------------------- */

  C.splitBanner = function (props) {
    var cls = classes('cmp-split', props.inverse ? 'cmp-split--inverse' : null, props.flip ? 'cmp-split--flip' : null);
    return (
      '<section class="' + cls + '">' +
        '<div class="cmp-split__body">' +
          '<div class="cmp-split__copy">' +
            (props.eyebrow ? '<p class="t-label">' + esc(props.eyebrow) + '</p>' : '') +
            '<h2 class="t-h1">' + esc(props.title) + '</h2>' +
            (props.body ? '<p class="t-lead' + (props.inverse ? '' : ' t-muted') + '">' + esc(props.body) + '</p>' : '') +
          '</div>' +
          (props.points && props.points.length
            ? '<ul class="stack">' + props.points.map(function (p) {
                return '<li class="t-body">' + esc(p) + '</li>';
              }).join('') + '</ul>'
            : '') +
          actions(props.actions) +
          (props.note ? '<p class="t-small' + (props.inverse ? '' : ' t-muted') + '">' + esc(props.note) + '</p>' : '') +
        '</div>' +
        '<div>' + placeholder(props.media || 'Visual', 'ph--tall') + '</div>' +
      '</section>'
    );
  };

  /* --------------------------------------------------------------------
     Link card — service / reason tiles
     -------------------------------------------------------------------- */

  C.linkCard = function (props) {
    var external = props.href && /^https?:/.test(props.href);
    var inner =
      (props.media ? placeholder(props.media, 'ph--wide') : '') +
      '<div class="cmp-card__body">' +
        '<h3 class="t-h3">' + esc(props.title) + '</h3>' +
        (props.body ? '<p class="t-body t-muted">' + esc(props.body) + '</p>' : '') +
      '</div>' +
      (props.linkLabel
        ? '<div class="cmp-card__foot"><span class="t-label">' + esc(props.linkLabel) + ' &#8594;</span></div>'
        : '');

    if (!props.href) return '<article class="cmp-card cmp-card--quiet">' + inner + '</article>';

    return (
      '<a class="cmp-card cmp-card--quiet"' + attr('href', props.href) +
        (external ? ' target="_blank" rel="noopener"' : '') + '>' + inner + '</a>'
    );
  };

  /* --------------------------------------------------------------------
     Stat band
     -------------------------------------------------------------------- */

  C.statBand = function (props) {
    return (
      '<div class="cmp-stats">' +
        (props.items || []).map(function (item) {
          return (
            '<div class="cmp-stat">' +
              '<span class="t-h1">' + esc(item.value) + '</span>' +
              '<span class="t-small t-muted">' + esc(item.label) + '</span>' +
            '</div>'
          );
        }).join('') +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     App promo
     -------------------------------------------------------------------- */

  C.appPromo = function (props) {
    return (
      '<section class="cmp-split">' +
        '<div class="cmp-split__body">' +
          '<div class="cmp-split__copy">' +
            (props.eyebrow ? '<p class="t-label">' + esc(props.eyebrow) + '</p>' : '') +
            '<h2 class="t-h1">' + esc(props.title) + '</h2>' +
            (props.body ? '<p class="t-lead t-muted">' + esc(props.body) + '</p>' : '') +
          '</div>' +
          '<div class="cmp-storelinks">' +
            (props.stores || []).map(function (s) {
              return (
                '<a class="cmp-storelink"' + attr('href', s.href) + ' target="_blank" rel="noopener">' +
                  '<span class="t-small t-muted">' + esc(s.pre) + '</span>' +
                  '<span class="t-h4">' + esc(s.name) + '</span>' +
                '</a>'
              );
            }).join('') +
          '</div>' +
        '</div>' +
        '<div>' + placeholder(props.media || 'App screens', 'ph--tall') + '</div>' +
      '</section>'
    );
  };

  /* --------------------------------------------------------------------
     Accordion
     -------------------------------------------------------------------- */

  C.accordion = function (props) {
    return (
      '<div class="cmp-accordion" data-accordion>' +
        (props.items || []).map(function (item, i) {
          return (
            '<div class="cmp-accordion__item">' +
              '<button type="button" class="cmp-accordion__toggle" data-accordion-toggle="' + i + '" aria-expanded="false">' +
                '<span>' + esc(item.question) + '</span><span aria-hidden="true">+</span>' +
              '</button>' +
              '<div class="cmp-accordion__panel" data-accordion-panel="' + i + '">' +
                '<p class="t-body t-muted">' + esc(item.answer) + '</p>' +
              '</div>' +
            '</div>'
          );
        }).join('') +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Lead form — validates its own fields. Sending is a real handoff,
     never a simulated confirmation.
     -------------------------------------------------------------------- */

  C.leadForm = function (props) {
    var formId = props.id || 'lead-form';
    var fields = props.fields || [];

    function control(f, fieldId) {
      var required = f.required ? ' required' : '';

      if (f.type === 'select') {
        return (
          '<select class="input" id="' + esc(fieldId) + '" name="' + esc(f.name) + '"' + required + '>' +
            '<option value="">' + esc(f.placeholder || 'Select') + '</option>' +
            (f.options || []).map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') +
          '</select>'
        );
      }

      if (f.type === 'radio') {
        return (
          '<div class="cmp-form__radios">' +
            (f.options || []).map(function (o, i) {
              return (
                '<label class="cmp-form__radio">' +
                  '<input type="radio" name="' + esc(f.name) + '" value="' + esc(o) + '"' +
                    (i === 0 ? ' checked' : '') + '>' +
                  '<span class="t-body">' + esc(o) + '</span>' +
                '</label>'
              );
            }).join('') +
          '</div>'
        );
      }

      return (
        '<input class="input" type="' + esc(f.type || 'text') + '" id="' + esc(fieldId) + '"' +
          ' name="' + esc(f.name) + '"' + attr('placeholder', f.placeholder) +
          attr('inputmode', f.inputmode) + attr('autocomplete', f.autocomplete) + required + '>'
      );
    }

    function fieldBlock(f) {
      var fieldId = formId + '-' + f.name;
      var label = esc(f.label) + (f.required ? ' *' : '');
      var head = f.type === 'radio'
        ? '<span class="t-label">' + label + '</span>'
        : '<label class="t-label" for="' + esc(fieldId) + '">' + label + '</label>';

      return (
        '<div class="cmp-form__field' + (f.wide ? ' cmp-form__field--wide' : '') + '" data-field="' + esc(f.name) + '">' +
          head +
          control(f, fieldId) +
          (f.hint ? '<p class="t-small t-muted">' + esc(f.hint) + '</p>' : '') +
          '<p class="cmp-form__error t-small" data-field-error hidden></p>' +
        '</div>'
      );
    }

    return (
      '<form class="cmp-form" id="' + esc(formId) + '" data-lead-form novalidate>' +
        (props.title
          ? '<div class="section__title-group">' +
              (props.eyebrow ? '<p class="t-label">' + esc(props.eyebrow) + '</p>' : '') +
              '<h2 class="t-h2">' + esc(props.title) + '</h2>' +
              (props.body ? '<p class="t-body t-muted">' + esc(props.body) + '</p>' : '') +
            '</div>'
          : '') +
        '<div class="cmp-form__grid">' + fields.map(fieldBlock).join('') + '</div>' +
        '<div class="cmp-form__foot">' +
          '<button type="submit" class="btn btn--primary">' + esc(props.submitLabel || 'Send request') + '</button>' +
          (props.note ? '<p class="t-small t-muted">' + esc(props.note) + '</p>' : '') +
        '</div>' +
        (props.handoff
          ? '<div class="cmp-form__handoff" data-lead-handoff hidden>' +
              '<p class="t-label">' + esc(props.handoff.label || 'Prototype') + '</p>' +
              '<p class="t-body">' + esc(props.handoff.body || '') + '</p>' +
              (props.handoff.links && props.handoff.links.length
                ? '<div class="row-actions">' +
                    props.handoff.links.map(function (l) { return action(l); }).join('') +
                  '</div>'
                : '') +
            '</div>'
          : '') +
      '</form>'
    );
  };

  /* --------------------------------------------------------------------
     Search bar — submits to the site search page
     -------------------------------------------------------------------- */

  C.searchBar = function (props) {
    return (
      '<form class="cmp-search"' + attr('action', props.action || '/search/') + ' method="get" role="search">' +
        '<label class="visually-hidden" for="' + esc(props.id || 'site-search') + '">' + esc(props.label || 'Search') + '</label>' +
        '<input class="input" type="search" id="' + esc(props.id || 'site-search') + '" name="q"' +
          attr('placeholder', props.placeholder || 'Search anything...') + '>' +
        '<button type="submit" class="btn btn--primary">Search</button>' +
      '</form>'
    );
  };

  /* --------------------------------------------------------------------
     Carousel shell — scroll buttons drive a horizontal scroller
     -------------------------------------------------------------------- */

  C.carousel = function (props) {
    var mod = props.compact ? ' cmp-carousel--compact' : '';
    var showHint = props.hint !== false;
    return (
      '<div class="cmp-carousel' + mod + '" data-carousel>' +
        '<div class="cmp-carousel__head">' +
          '<p class="t-label">' + esc(props.label || '') + '</p>' +
          '<div class="cmp-carousel__nav" data-carousel-nav>' +
            '<button type="button" class="btn btn--icon" data-carousel-prev aria-label="Scroll left">&#8592;</button>' +
            '<button type="button" class="btn btn--icon" data-carousel-next aria-label="Scroll right">&#8594;</button>' +
          '</div>' +
        '</div>' +
        (showHint ? '<p class="t-small t-muted cmp-carousel__hint">Swipe or use arrows to see more</p>' : '') +
        '<div class="' + (props.variant === 'packs' ? 'scroller scroller--packs' : 'scroller') + '" data-carousel-track' +
          (props.filterable ? ' data-filter-target' : '') + '>' +
          (props.content || '') +
        '</div>' +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Tariff detail page — hero, tier chips, panel, FAQ, activation
     -------------------------------------------------------------------- */

  C.tariffDetailHero = function (props) {
    return (
      '<section class="cmp-tdetail-hero">' +
        '<div class="cmp-tdetail-hero__grid">' +
          '<div class="cmp-tdetail-hero__copy">' +
            (props.eyebrow ? '<p class="t-label">' + esc(props.eyebrow) + '</p>' : '') +
            '<div class="cmp-tdetail-hero__title-row">' +
              '<h1 class="t-display">' + esc(props.title) + '</h1>' +
              (props.badge ? '<span class="badge">' + esc(props.badge) + '</span>' : '') +
            '</div>' +
            (props.body ? '<p class="t-lead t-muted">' + esc(props.body) + '</p>' : '') +
          '</div>' +
          '<div class="cmp-tdetail-hero__media">' + placeholder(props.media || 'Tariff visual', 'ph--tall') + '</div>' +
        '</div>' +
      '</section>'
    );
  };

  function tdetailTierGroups(tiers) {
    var groups = [];
    var map = {};
    (tiers || []).forEach(function (tier) {
      var key = tier.validityGroup || 'Other';
      if (!map[key]) {
        map[key] = { label: key, tiers: [] };
        groups.push(map[key]);
      }
      map[key].tiers.push(tier);
    });
    return groups;
  }

  C.tariffTierSelector = function (props) {
    var activeId = props.activeId || ((props.tiers || [])[0] && props.tiers[0].id);
    var groups = tdetailTierGroups(props.tiers);
    return (
      '<div class="cmp-tdetail-selector" data-tdetail-selector>' +
        (props.title ? '<h2 class="t-h2">' + esc(props.title) + '</h2>' : '') +
        (props.body ? '<p class="t-body t-muted">' + esc(props.body) + '</p>' : '') +
        groups.map(function (group) {
          return (
            '<div class="cmp-tdetail-selector__group">' +
              '<p class="t-label">' + esc(group.label) + '</p>' +
              '<div class="cmp-tdetail-selector__chips" role="group" aria-label="' + esc(group.label) + ' packs">' +
                group.tiers.map(function (tier) {
                  var pressed = tier.id === activeId;
                  return (
                    '<button type="button" class="cmp-tdetail-selector__chip"' +
                      ' data-tdetail-tier="' + esc(tier.id) + '"' +
                      ' aria-pressed="' + (pressed ? 'true' : 'false') + '">' +
                      '<span class="t-body">' + esc(tier.label) + '</span>' +
                      '<span class="t-small t-muted">' + esc(tier.price) + '</span>' +
                    '</button>'
                  );
                }).join('') +
              '</div>' +
            '</div>'
          );
        }).join('') +
      '</div>'
    );
  };

  C.tariffTierPanel = function (props) {
    var tier = props.tier || {};
    var actions = props.actions || [];
    return (
      '<article class="cmp-tdetail-panel" data-tdetail-panel>' +
        '<div class="cmp-tdetail-panel__head">' +
          '<div class="stack">' +
            '<h2 class="t-h1">' + esc(tier.label || '') + '</h2>' +
            '<p class="t-display">' + esc(tier.price || '') + '</p>' +
          '</div>' +
          (tier.validity ? '<p class="t-body t-muted">' + esc(tier.validity) + '</p>' : '') +
        '</div>' +
        '<div class="cmp-tdetail-panel__specs">' +
          [
            { label: 'Internet', value: tier.internet },
            { label: 'Calls', value: tier.calls },
            { label: 'SMS', value: tier.sms },
            { label: 'Social media', value: tier.social },
            { label: 'WhatsApp', value: tier.whatsapp },
            { label: 'Roaming data', value: tier.roaming },
            { label: 'Other extras', value: tier.extras }
          ].map(function (spec) {
            if (!spec.value || spec.value === '—') return '';
            return (
              '<div class="cmp-tdetail-panel__spec">' +
                '<span class="t-h3">' + esc(spec.value) + '</span>' +
                '<span class="t-small t-muted">' + esc(spec.label) + '</span>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
        '<div class="cmp-tdetail-panel__activate">' +
          '<p class="t-label">Activate this pack</p>' +
          '<ul class="cmp-tdetail-panel__codes">' +
            (tier.keyword ? '<li class="t-body">SMS <strong>' + esc(tier.keyword) + '</strong> to 7575</li>' : '') +
            (tier.ussd ? '<li class="t-body">Dial <strong>' + esc(tier.ussd) + '</strong></li>' : '') +
            (tier.activation ? '<li class="t-body t-muted">' + esc(tier.activation) + '</li>' : '') +
          '</ul>' +
        '</div>' +
        (actions.length
          ? '<div class="cmp-tdetail-panel__actions">' + actions.map(function (a) { return action(a, 'btn--block'); }).join('') + '</div>'
          : '') +
      '</article>'
    );
  };

  C.tariffFeatureList = function (props) {
    var features = props.features || [];
    if (!features.length) return '';
    return (
      '<div class="cmp-tdetail-features" data-tdetail-features>' +
        '<h2 class="t-h2">' + esc(props.title || 'What is included') + '</h2>' +
        '<ul class="cmp-tdetail-features__list">' +
          features.map(function (item) {
            return '<li class="t-body">' + esc(item) + '</li>';
          }).join('') +
        '</ul>' +
      '</div>'
    );
  };

  C.tariffActivationBlock = function (props) {
    var data = props.activation || {};
    var keywords = data.keywords || [];
    var ussdCodes = data.ussdCodes || [];
    var bonusCheck = data.bonusCheck || [];
    return (
      '<div class="cmp-tdetail-activation">' +
        '<h2 class="t-h2">' + esc(props.title || 'How to activate') + '</h2>' +
        (data.intro ? '<p class="t-body t-muted">' + esc(data.intro) + '</p>' : '') +
        (data.shortCode
          ? '<p class="t-small t-muted">Short number <strong>' + esc(data.shortCode) + '</strong>' +
              (data.smsCost ? ' — ' + esc(data.smsCost) : '') + '</p>'
          : '') +
        '<div class="cmp-tdetail-activation__grid">' +
          (keywords.length
            ? '<div class="cmp-tdetail-activation__col">' +
                '<h3 class="t-h4">SMS keywords</h3>' +
                '<ul class="cmp-tdetail-activation__list">' +
                  keywords.map(function (row) {
                    return '<li class="t-body"><strong>' + esc(row.keyword) + '</strong> — ' + esc(row.pack) + '</li>';
                  }).join('') +
                '</ul>' +
              '</div>'
            : '') +
          (ussdCodes.length
            ? '<div class="cmp-tdetail-activation__col">' +
                '<h3 class="t-h4">USSD codes</h3>' +
                '<ul class="cmp-tdetail-activation__list">' +
                  ussdCodes.map(function (row) {
                    return '<li class="t-body"><strong>' + esc(row.code) + '</strong> — ' + esc(row.pack) + '</li>';
                  }).join('') +
                '</ul>' +
              '</div>'
            : '') +
          (bonusCheck.length
            ? '<div class="cmp-tdetail-activation__col">' +
                '<h3 class="t-h4">Check your bonuses</h3>' +
                '<ul class="cmp-tdetail-activation__list">' +
                  bonusCheck.map(function (line) {
                    return '<li class="t-body t-muted">' + esc(line) + '</li>';
                  }).join('') +
                '</ul>' +
              '</div>'
            : '') +
        '</div>' +
      '</div>'
    );
  };

  C.tariffAddonGrid = function (props) {
    var items = props.items || [];
    if (!items.length) return '';
    var hrefFn = global.SiteRegistry ? global.SiteRegistry.href : function (path) { return path; };
    return (
      '<div class="cmp-tdetail-addons">' +
        '<h2 class="t-h2">' + esc(props.title || 'Internet add-ons') + '</h2>' +
        (props.body ? '<p class="t-body t-muted">' + esc(props.body) + '</p>' : '') +
        '<div class="grid grid--2 cmp-tdetail-addons__grid">' +
          items.map(function (item) {
            var link = item.action ? item.action.href : '';
            return (
              '<article class="cmp-card cmp-tdetail-addons__card">' +
                '<div class="cmp-card__body">' +
                  '<h3 class="t-h3">' + esc(item.name) + '</h3>' +
                  '<p class="t-h2">' + esc(item.price) + '</p>' +
                  (item.body ? '<p class="t-body t-muted">' + esc(item.body) + '</p>' : '') +
                '</div>' +
                (item.action
                  ? '<div class="cmp-card__foot">' +
                      '<a class="btn btn--small btn--block"' + attr('href', hrefFn(link)) + '>' +
                        esc(item.action.label) + '</a>' +
                    '</div>'
                  : '') +
              '</article>'
            );
          }).join('') +
        '</div>' +
      '</div>'
    );
  };

  C.tariffOverageNote = function (props) {
    var rates = props.overageRates || {};
    var items = rates.items || [];
    if (!items.length) return '';
    return (
      '<div class="cmp-tdetail-overage">' +
        '<h2 class="t-h2">' + esc(rates.title || 'After bonuses run out') + '</h2>' +
        (rates.intro ? '<p class="t-body t-muted">' + esc(rates.intro) + '</p>' : '') +
        '<ul class="cmp-tdetail-overage__list">' +
          items.map(function (row) {
            return (
              '<li class="cmp-tdetail-overage__row">' +
                '<span class="t-body">' + esc(row.label) + '</span>' +
                '<span class="t-body">' + esc(row.value) + '</span>' +
              '</li>'
            );
          }).join('') +
        '</ul>' +
      '</div>'
    );
  };

  function tariffFaqBody(item) {
    var html = '';
    if (item.answer) {
      html += '<p class="t-body t-muted">' + esc(item.answer) + '</p>';
    }
    if (item.paragraphs) {
      html += item.paragraphs.map(function (p) {
        return '<p class="t-body t-muted">' + esc(p) + '</p>';
      }).join('');
    }
    if (item.list && item.list.length) {
      html += '<ul class="cmp-tdetail-faq__list">' +
        item.list.map(function (line) {
          return '<li class="t-body t-muted">' + esc(line) + '</li>';
        }).join('') +
      '</ul>';
    }
    return html;
  }

  C.tariffFaq = function (props) {
    var items = props.items || [];
    return (
      '<div class="cmp-tdetail-faq">' +
        '<h2 class="t-h2">' + esc(props.title || 'Questions and answers') + '</h2>' +
        '<div class="cmp-accordion" data-accordion>' +
          items.map(function (item, i) {
            return (
              '<div class="cmp-accordion__item">' +
                '<button type="button" class="cmp-accordion__toggle" data-accordion-toggle="' + i + '" aria-expanded="false">' +
                  '<span>' + esc(item.question) + '</span><span aria-hidden="true">+</span>' +
                '</button>' +
                '<div class="cmp-accordion__panel" data-accordion-panel="' + i + '">' +
                  tariffFaqBody(item) +
                '</div>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
      '</div>'
    );
  };

  C.tariffDetailCrossLinks = function (props) {
    var links = props.links || [];
    var hrefFn = global.SiteRegistry ? global.SiteRegistry.href : function (path) { return path; };
    if (!links.length) return '';
    return (
      '<div class="cmp-tdetail-cross">' +
        '<div class="row-actions">' +
          links.map(function (link) {
            return action({
              label: link.label,
              href: hrefFn(link.href),
              variant: link.variant
            });
          }).join('') +
        '</div>' +
        (props.legal ? '<p class="t-small t-muted cmp-tdetail-cross__legal">' + esc(props.legal) + '</p>' : '') +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Support chat — floating button and panel (Aicell shell)
     -------------------------------------------------------------------- */

  C.supportChat = function (props) {
    var suggestions = props.suggestions || [];
    var handoff = props.handoff;

    return (
      '<div class="cmp-chat" data-chat' + attr('data-button-label', props.buttonLabel || 'Chat') +
        attr('data-support-href', handoff ? handoff.href : '') + '>' +
        '<section class="cmp-chat__panel" data-chat-panel id="support-chat-panel" hidden aria-label="' + esc(props.title || 'Support chat') + '">' +
          '<header class="cmp-chat__head">' +
            '<div class="cmp-chat__title">' +
              (props.eyebrow ? '<p class="t-label">' + esc(props.eyebrow) + '</p>' : '') +
              '<h2 class="t-h4">' + esc(props.title || 'Support') + '</h2>' +
            '</div>' +
            '<button type="button" class="btn btn--icon btn--quiet" data-chat-close aria-label="Close chat">' +
              '<span aria-hidden="true">&#215;</span></button>' +
          '</header>' +
          '<div class="cmp-chat__log" data-chat-log role="log" aria-live="polite">' +
            '<div class="cmp-chat__msg cmp-chat__msg--bot">' +
              '<p class="t-body">' + esc(props.intro || '') + '</p>' +
            '</div>' +
          '</div>' +
          (suggestions.length
            ? '<div class="cmp-chat__suggestions" data-chat-suggestions role="group" aria-label="Suggested questions">' +
                suggestions.map(function (item, i) {
                  return (
                    '<button type="button" class="cmp-chat__chip" data-chat-suggest="' + i + '">' +
                      esc(item.label) + '</button>'
                  );
                }).join('') +
              '</div>' +
              '<script type="application/json" data-chat-suggest-data>' + JSON.stringify(suggestions) + '</script>'
            : '') +
          '<form class="cmp-chat__form" data-chat-form>' +
            '<label class="visually-hidden" for="chat-input">' + esc(props.inputLabel || 'Your message') + '</label>' +
            '<input class="input" type="text" id="chat-input" data-chat-input autocomplete="off"' +
              attr('placeholder', props.inputPlaceholder || 'Type a question...') + '>' +
            '<button type="submit" class="btn btn--primary">Send</button>' +
          '</form>' +
          (handoff
            ? '<div class="cmp-chat__foot">' +
                '<a class="t-small link-inline"' + attr('href', handoff.href) + '>' + esc(handoff.label) + '</a>' +
              '</div>'
            : '') +
          (props.note ? '<p class="t-small t-muted cmp-chat__note">' + esc(props.note) + '</p>' : '') +
        '</section>' +
        '<button type="button" class="cmp-chat__toggle" data-chat-toggle aria-expanded="false" aria-controls="support-chat-panel">' +
          '<span class="cmp-chat__toggle-label">' + esc(props.buttonLabel || 'Chat') + '</span>' +
        '</button>' +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Internet pack components
     -------------------------------------------------------------------- */

  C.internetCategoryNav = function (props) {
    var items = props.items || [];
    var active = props.active || '';
    var anchor = props.anchor || 'ipack-catalog';
    var hrefFn = global.SiteRegistry ? global.SiteRegistry.href : registryHref;

    function tabHref(path) {
      var base = hrefFn(path);
      if (!base || base === '#') return base;
      if (base.indexOf('#') >= 0) return base;
      return base + '#' + anchor;
    }

    return (
      '<nav class="cmp-ipack-nav"' + attr('aria-label', props.ariaLabel || 'Internet pack categories') + '>' +
        items.map(function (item) {
          var isActive = item.id === active;
          var cls = classes('cmp-ipack-nav__link', isActive ? 'cmp-ipack-nav__link--active' : null);
          return (
            '<a class="' + cls + '"' + attr('href', tabHref(item.href)) +
              (isActive ? ' aria-current="page"' : '') + '>' +
              esc(item.label) +
            '</a>'
          );
        }).join('') +
      '</nav>'
    );
  };

  C.internetPackFilters = function (props) {
    var groups = props.groups || [];
    var urlBase = props.urlBase || '';
    return (
      '<div class="cmp-ipack-filters">' +
        groups.map(function (group) {
          var param = group.urlParam || 'sort';
          var useLinks = !!(group.syncUrl && urlBase);
          return (
            '<div class="cmp-ipack-filters__group">' +
              (group.label ? '<p class="t-label cmp-ipack-filters__label">' + esc(group.label) + '</p>' : '') +
              '<div class="cmp-tabs" role="tablist"' +
                attr('aria-label', group.label) +
                attr('data-filter-group', group.key) +
                attr('data-filter-sync-url', group.syncUrl ? 'true' : null) +
                attr('data-filter-param', group.urlParam || null) + '>' +
                (group.options || []).map(function (opt, i) {
                  var selected = i === 0 ? 'true' : 'false';
                  var attrs =
                    ' class="cmp-tab" role="tab"' +
                    ' data-filter-value="' + esc(opt.value) + '"' +
                    ' aria-selected="' + selected + '"';
                  if (useLinks) {
                    return (
                      '<a href="' + esc(filterTabHref(urlBase, param, opt.value)) + '"' + attrs + '>' +
                        esc(opt.label) + '</a>'
                    );
                  }
                  return (
                    '<button type="button"' + attrs + '>' +
                      esc(opt.label) + '</button>'
                  );
                }).join('') +
              '</div>' +
            '</div>'
          );
        }).join('') +
      '</div>'
    );
  };

  C.internetPackCard = function (props) {
    var hints = props.usageHints || [];
    var validity = props.validity || {};
    var validityText = validity.prepaid && validity.postpaid && validity.prepaid !== validity.postpaid
      ? 'Prepaid: ' + validity.prepaid + '. Postpaid: ' + validity.postpaid + '.'
      : (validity.prepaid || validity.postpaid || '');
    var activation = props.keyword && props.shortCode
      ? 'Send "' + props.keyword + '" to ' + props.shortCode + '.'
      : '';
    var kabinetim = props.kabinetimHref || 'https://kabinetim.azercell.com/my/login';
    var hasDetails = hints.length || props.details;

    return (
      '<article class="cmp-ipack-card"' +
        attr('data-filter-tags', props.volumeBand || 'all') +
        attr('data-ipack-price', props.priceNum != null ? String(props.priceNum) : null) +
        attr('data-ipack-sort', props.sort != null ? String(props.sort) : null) +
        attr('data-ipack-id', props.id) + '>' +
        '<div class="cmp-ipack-card__head">' +
          '<h3 class="t-h3">' + esc(props.name) + '</h3>' +
          (props.badge ? '<span class="badge">' + esc(props.badge) + '</span>' : '') +
        '</div>' +
        '<p class="t-display cmp-ipack-card__data">' + esc(props.data) + '</p>' +
        '<p class="t-h2">' + esc(props.price) + '</p>' +
        (validityText ? '<p class="t-small t-muted">' + esc(validityText) + '</p>' : '') +
        (props.autoRenew
          ? '<p class="t-small t-muted">Auto-renews when balance allows.</p>'
          : '') +
        (activation ? '<p class="t-body cmp-ipack-card__activate">' + esc(activation) + '</p>' : '') +
        (props.ussd ? '<p class="t-small t-muted">Or dial ' + esc(props.ussd) + '</p>' : '') +
        '<div class="cmp-ipack-card__actions">' +
          '<a class="btn btn--primary btn--block" href="' + esc(kabinetim) + '" target="_blank" rel="noopener">' +
            esc(props.ctaLabel || 'Activate in Kabinetim') +
          '</a>' +
        '</div>' +
        (hasDetails
          ? '<details class="cmp-ipack-card__details">' +
              '<summary class="cmp-ipack-card__summary">' +
                '<span class="t-label cmp-ipack-card__summary-label">Usage guide and details</span>' +
                '<span class="cmp-ipack-card__summary-icon" aria-hidden="true">&#8595;</span>' +
              '</summary>' +
              '<div class="cmp-ipack-card__details-body">' +
                (hints.length
                  ? '<ul class="cmp-ipack-card__hints">' +
                      hints.map(function (h) {
                        return (
                          '<li class="t-body">' +
                            '<span class="t-muted">' + esc(h.activity) + '</span> — ' + esc(h.duration) +
                          '</li>'
                        );
                      }).join('') +
                    '</ul>'
                  : '') +
                (props.details ? '<p class="t-body t-muted">' + esc(props.details) + '</p>' : '') +
                '<div class="ph cmp-ipack-card__qr">Scan in Kabinetim app</div>' +
              '</div>' +
            '</details>'
          : '') +
      '</article>'
    );
  };

  C.internetUpgradeBanner = function (props) {
    var hrefFn = global.SiteRegistry ? global.SiteRegistry.href : registryHref;
    var acts = (props.actions || []).map(function (a) {
      return {
        label: a.label,
        href: hrefFn(a.href),
        variant: a.variant
      };
    });
    return (
      '<section class="cmp-ipack-upgrade">' +
        '<div class="cmp-ipack-upgrade__copy">' +
          (props.eyebrow ? '<p class="t-label">' + esc(props.eyebrow) + '</p>' : '') +
          '<h2 class="t-h2">' + esc(props.title) + '</h2>' +
          (props.body ? '<p class="t-body t-muted">' + esc(props.body) + '</p>' : '') +
          actions(acts) +
          (props.note ? '<p class="t-small t-muted">' + esc(props.note) + '</p>' : '') +
        '</div>' +
        '<div class="ph ph--wide cmp-ipack-upgrade__visual">Plan comparison visual</div>' +
      '</section>'
    );
  };

  /* --------------------------------------------------------------------
     Roaming country components
     -------------------------------------------------------------------- */

  function networkBadges(networks) {
    return (networks || []).map(function (n) {
      return '<span class="cmp-roam-network badge">' + esc(n) + '</span>';
    }).join('');
  }

  C.roamingCountrySearch = function (props) {
    var chips = props.topCountries || [];
    return (
      '<div class="cmp-roam-search" data-roam-search-wrap' +
        attr('data-roam-sync-url', props.syncUrl !== false ? 'true' : 'false') +
        attr('data-roam-url-base', props.urlBase || '') +
        attr('data-roam-show-all-default', props.showAllDefault ? 'true' : 'false') +
        attr('data-roam-pack-supported-only', props.packSupportedOnly ? 'true' : 'false') + '>' +
        '<label class="t-label" for="' + esc(props.inputId || 'roam-country-search') + '">' +
          esc(props.label || 'Search for a country') +
        '</label>' +
        (props.hint ? '<p class="t-body t-muted">' + esc(props.hint) + '</p>' : '') +
        '<input class="input cmp-roam-search__input" type="search"' +
          attr('id', props.inputId || 'roam-country-search') +
          attr('data-roam-search-input', props.inputId || 'roam-country-search') +
          attr('placeholder', props.placeholder || 'Enter country name…') +
          ' autocomplete="off">' +
        (chips.length
          ? '<div class="cmp-roam-search__chips" role="group" aria-label="Popular destinations">' +
              chips.map(function (chip) {
                return (
                  '<button type="button" class="btn btn--small btn--quiet" data-roam-country-id="' + esc(chip.id) + '">' +
                    esc(chip.name) +
                  '</button>'
                );
              }).join('') +
            '</div>'
          : '') +
        '<div class="cmp-roam-search__results" data-roam-results aria-live="polite"></div>' +
      '</div>'
    );
  };

  function roamRateRows(rates) {
    if (!rates) return '';
    return (
      '<ul class="cmp-roam-results__rates">' +
        '<li class="t-small"><span class="t-muted">Outgoing calls</span> ' + esc(rates.outgoing) + '</li>' +
        '<li class="t-small"><span class="t-muted">Incoming calls</span> ' + esc(rates.incoming) + '</li>' +
        '<li class="t-small"><span class="t-muted">Internet</span> ' + esc(rates.internetMb) + '</li>' +
        '<li class="t-small"><span class="t-muted">SMS</span> ' + esc(rates.sms) + '</li>' +
      '</ul>'
    );
  }

  C.roamingCountryResults = function (props) {
    var countries = props.countries || [];
    var planType = props.planType || 'prepaid';
    if (!countries.length) {
      return (
        '<p class="t-body t-muted cmp-roam-results__empty">' +
          esc(props.emptyText || 'No country matches. Try another spelling.') +
        '</p>'
      );
    }
    return (
      '<div class="cmp-roam-results">' +
        countries.map(function (country) {
          var operators = country.operators || [];
          return (
            '<article class="cmp-roam-results__country"' + attr('data-roam-country-id', country.id) + '>' +
              '<h3 class="t-h3">' + esc(country.name) + '</h3>' +
              operators.map(function (operator) {
                var rates = planType === 'postpaid' ? operator.postpaid : operator.prepaid;
                return (
                  '<div class="cmp-roam-results__operator">' +
                    '<div class="cmp-roam-results__operator-head">' +
                      '<p class="t-body"><strong>' + esc(operator.name) + '</strong></p>' +
                      (operator.displayName && operator.displayName !== operator.name
                        ? '<p class="t-small t-muted">' + esc(operator.displayName) + '</p>'
                        : '') +
                    '</div>' +
                    '<div class="cmp-roam-results__networks">' + networkBadges(operator.networks) + '</div>' +
                    '<p class="t-small">' +
                      '<span class="t-muted">Roaming internet pack:</span> ' +
                      (operator.internetPackSupported ? 'Supported' : 'Not available') +
                    '</p>' +
                    roamRateRows(rates) +
                  '</div>'
                );
              }).join('') +
            '</article>'
          );
        }).join('') +
      '</div>'
    );
  };

  C.roamingCountriesTable = function (props) {
    var rows = props.rows || [];
    var planType = props.planType || 'prepaid';
    if (!rows.length) {
      return '<p class="t-body t-muted">No supported operators in this sample list.</p>';
    }
    return (
      '<div class="cmp-roam-table-wrap" data-roam-table-wrap>' +
        '<p class="t-small t-muted cmp-roam-table-wrap__hint">Swipe sideways to see all columns</p>' +
        '<div class="cmp-roam-table-scroll">' +
          '<table class="cmp-roam-table">' +
            '<thead><tr>' +
              '<th class="t-label">Country</th>' +
              '<th class="t-label">Operator</th>' +
              '<th class="t-label">Display name</th>' +
              '<th class="t-label">Networks</th>' +
            '</tr></thead>' +
            '<tbody>' +
              rows.map(function (row) {
                var op = row.operator;
                return (
                  '<tr>' +
                    '<td class="t-body">' + esc(row.country) + '</td>' +
                    '<td class="t-body">' + esc(op.name) + '</td>' +
                    '<td class="t-body t-muted">' + esc(op.displayName) + '</td>' +
                    '<td class="t-body"><span class="cmp-roam-table__networks">' + networkBadges(op.networks) + '</span></td>' +
                  '</tr>'
                );
              }).join('') +
            '</tbody>' +
          '</table>' +
        '</div>' +
        (props.note ? '<p class="t-small t-muted cmp-roam-table-wrap__note">' + esc(props.note) + '</p>' : '') +
      '</div>'
    );
  };

  C.roamingPlanToggle = function (props) {
    var current = props.current || 'prepaid';
    return (
      '<div class="cmp-tabs" role="tablist" aria-label="Plan type" data-roam-plan-toggle>' +
        ['prepaid', 'postpaid'].map(function (type) {
          var selected = type === current;
          return (
            '<button type="button" class="cmp-tab" role="tab"' +
              ' data-roam-plan-value="' + type + '"' +
              ' aria-selected="' + (selected ? 'true' : 'false') + '">' +
              esc(type.charAt(0).toUpperCase() + type.slice(1)) +
            '</button>'
          );
        }).join('') +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Footer
     -------------------------------------------------------------------- */

  C.siteFooter = function (props) {
    return (
      '<footer class="cmp-footer">' +
        '<div class="wrap">' +
          (props.search ? '<div style="margin-bottom:var(--sp-6)">' + C.searchBar(props.search) + '</div>' : '') +
          '<div class="cmp-footer__grid">' +
            (props.columns || []).map(function (col) {
              return (
                '<div>' +
                  '<h3 class="t-h4">' + esc(col.title) + '</h3>' +
                  '<div class="cmp-footer__col-links">' +
                    (col.links || []).map(function (l) {
                      var external = l.href && /^https?:/.test(l.href);
                      return '<a class="t-body t-muted"' + attr('href', l.href) +
                        (external ? ' target="_blank" rel="noopener"' : '') + '>' + esc(l.label) + '</a>';
                    }).join('') +
                  '</div>' +
                '</div>'
              );
            }).join('') +
          '</div>' +
          '<div class="cmp-footer__bar">' +
            '<div class="cmp-footer__social">' +
              (props.social || []).map(function (s) {
                return '<a class="btn btn--small btn--quiet"' + attr('href', s.href) + ' target="_blank" rel="noopener">' + esc(s.label) + '</a>';
              }).join('') +
            '</div>' +
            '<div class="cmp-footer__legal">' +
              (props.legal || []).map(function (l) {
                return '<a class="t-small t-muted"' + attr('href', l.href) + '>' + esc(l.label) + '</a>';
              }).join('') +
            '</div>' +
          '</div>' +
          (props.copyright ? '<p class="t-small t-muted" style="margin-top:var(--sp-4)">' + esc(props.copyright) + '</p>' : '') +
        '</div>' +
      '</footer>'
    );
  };

  /* --------------------------------------------------------------------
     Public API
     -------------------------------------------------------------------- */

  C.esc = esc;
  C.placeholder = placeholder;

  /** Renders a component by id into an HTML string. */
  C.render = function (id, props) {
    var fn = C[id];
    if (typeof fn !== 'function') {
      return '<p class="t-body">Unknown component: ' + esc(id) + '</p>';
    }
    return fn(props || {});
  };

  /** Mounts a list of [componentId, props] pairs into a container element. */
  C.mount = function (target, blocks) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    el.innerHTML = blocks.map(function (block) {
      if (typeof block === 'string') return block;
      return C.render(block[0], block[1]);
    }).join('');
  };

  global.Components = C;
})(window);
