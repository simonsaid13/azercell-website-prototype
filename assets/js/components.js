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

  function classicSiteHeader(props) {
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

  function navHref(item) {
    if (!item) return '';
    if (item.tool === 'sitemap') return '/sitemap/';
    return item.href || '';
  }

  function navLink(item, className, extra) {
    if (!item) return '';
    var href = navHref(item);
    var external = /^https?:/.test(href) || /^tel:/.test(href);
    var cls = className || 't-body cmp-nav__text-link';
    if (!href) {
      return '<span class="' + cls + '">' + esc(item.label) + '</span>';
    }
    return '<' + 'a class="' + cls + '"' + attr('href', href) +
      (external ? ' target="_blank" rel="noopener"' : '') +
      (extra || '') + '>' + esc(item.label) + '</a>';
  }

  function appByLabel(nav, label) {
    var apps = (nav || []).filter(function (item) { return item.mode === 'apps'; })[0];
    var items = (apps && apps.items) || [];
    var i;
    for (i = 0; i < items.length; i++) {
      if (items[i].label === label) return items[i];
    }
    return { label: label };
  }

  function personalPromo(item) {
    return C.promoCard({
      title: item.label,
      media: item.label,
      actions: item.href ? [{ label: item.label, href: item.href, variant: 'primary' }] : []
    });
  }

  function renderListPanel(item, index) {
    return (
      '<div class="cmp-header__panel" data-menu-panel="' + index + '" id="nav-panel-' + index + '">' +
        '<div class="wrap">' +
          '<div class="cmp-nav__panel-list">' +
            (item.items || []).map(function (entry) {
              return navLink(entry, 't-body cmp-nav__text-link');
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderListPromoPanel(item, index) {
    return (
      '<div class="cmp-header__panel" data-menu-panel="' + index + '" id="nav-panel-' + index + '">' +
        '<div class="wrap">' +
          '<div class="cmp-nav__list-promo">' +
            '<div class="cmp-nav__panel-list">' +
            (item.items || []).map(function (entry) {
              return navLink(entry, 't-body cmp-nav__text-link');
            }).join('') +
            '</div>' +
            '<div class="cmp-nav__list-promo-card">' + personalPromo(item.promo || {}) + '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderDetailPane(item, entry, compactDetail) {
    if (entry.featured) {
      return '<div class="cmp-nav__detail-card cmp-nav__detail-card--featured">' + personalPromo(entry) + '</div>';
    }
    if (item.mode === 'detail-links') {
      return (
        '<div>' +
          (compactDetail ? '' : '<p class="t-label">' + esc(entry.label) + '</p>') +
          '<div class="cmp-nav__detail-links' + (compactDetail ? ' cmp-nav__detail-links--flush' : '') + '">' +
            (entry.detail || []).map(function (link) {
              return navLink(link, 't-body cmp-nav__text-link' + (link.nested ? ' cmp-nav__text-link--nested' : ''));
            }).join('') +
          '</div>' +
        '</div>'
      );
    }
    return '<div class="cmp-nav__detail-card">' + personalPromo(entry) + '</div>';
  }

  function renderDetailPanel(item, index, hoverLinks) {
    return (
      '<div class="cmp-header__panel" data-menu-panel="' + index + '" id="nav-panel-' + index + '">' +
        '<div class="wrap">' +
          '<div class="cmp-nav__detail" data-detail-menu="' + index + '"' + (hoverLinks ? ' data-detail-hover="true"' : '') + '>' +
            '<div class="cmp-nav__rail" role="listbox" aria-label="' + esc(item.label) + '">' +
              (item.items || []).map(function (entry, itemIndex) {
                var tag = hoverLinks ? 'a' : 'button';
                return (
                  '<' + tag + (hoverLinks ? '' : ' type="button"') +
                    ' class="cmp-nav__rail-button' + (entry.featured ? ' cmp-nav__rail-button--featured' : '') + '"' +
                    (hoverLinks ? attr('href', entry.href) : '') +
                    ' data-detail-trigger="' + itemIndex + '"' +
                    ' aria-selected="' + (itemIndex === 0 ? 'true' : 'false') + '">' +
                    esc(entry.label) +
                  '</' + tag + '>'
                );
              }).join('') +
            '</div>' +
            '<div class="cmp-nav__detail-content">' +
              (item.items || []).map(function (entry, itemIndex) {
                return '<div data-detail-pane="' + itemIndex + '"' + (itemIndex === 0 ? '' : ' hidden') + '>' +
                  renderDetailPane(item, entry, hoverLinks) +
                '</div>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderWidePromoPanel(item, index) {
    var entry = (item.items || [])[0] || { label: 'Kinon' };
    return (
      '<div class="cmp-header__panel" data-menu-panel="' + index + '" id="nav-panel-' + index + '">' +
        '<div class="wrap">' +
          '<div class="cmp-nav__wide-promo">' + personalPromo(entry) + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderAppTile(entry) {
    var href = navHref(entry);
    var external = /^https?:/.test(href);
    var tag = href ? 'a' : 'button';
    var attrs = href
      ? attr('href', href) + (external ? ' target="_blank" rel="noopener"' : '')
      : ' type="button"';
    return (
      '<' + tag + ' class="cmp-nav__app-tile"' + attrs + '>' +
        '<span class="ph ph--square cmp-nav__app-icon" aria-hidden="true"></span>' +
        '<span class="t-small cmp-nav__app-label">' + esc(entry.label) + '</span>' +
      '</' + tag + '>'
    );
  }

  function renderAppsPanel(item, index, apps) {
    var categories = (apps && apps.categories) || [];
    var defaultCat = categories.length ? categories.length - 1 : 0;
    return (
      '<div class="cmp-header__panel" data-menu-panel="' + index + '" id="nav-panel-' + index + '">' +
        '<div class="wrap">' +
          '<div class="cmp-nav__apps-variant cmp-nav__apps-v1" data-apps-v1>' +
            '<div class="cmp-nav__apps-list" role="list" aria-label="Apps">' +
              (item.items || []).map(function (entry) {
                return navLink(entry, 't-body cmp-nav__text-link', ' data-app-trigger="' + esc(entry.label) + '"');
              }).join('') +
            '</div>' +
            '<div class="cmp-nav__apps-promo">' +
              (item.items || []).map(function (entry, i) {
                var isAll = entry.label === 'All apps';
                return '<div data-app-promo="' + esc(entry.label) + '"' + (isAll ? '' : ' hidden') + '>' +
                  (isAll
                    ? '<div class="ph ph--wide" aria-hidden="true"></div>'
                    : personalPromo(entry)) +
                '</div>';
              }).join('') +
            '</div>' +
          '</div>' +
          '<div class="cmp-nav__apps-variant cmp-nav__apps-v2" data-apps-v2>' +
            '<div class="cmp-nav__rail cmp-nav__apps-categories" role="tablist" aria-label="App categories">' +
              categories.map(function (category, categoryIndex) {
                return (
                  '<button type="button" class="cmp-nav__rail-button" role="tab"' +
                    ' data-app-category-trigger="' + categoryIndex + '"' +
                    ' aria-selected="' + (categoryIndex === defaultCat ? 'true' : 'false') + '">' +
                    esc(category.label) +
                  '</button>'
                );
              }).join('') +
            '</div>' +
            '<div class="cmp-nav__apps-grid-wrap">' +
              categories.map(function (category, categoryIndex) {
                return '<div class="cmp-nav__apps-grid" role="tabpanel" data-app-category-pane="' + categoryIndex + '"' +
                  (categoryIndex === defaultCat ? '' : ' hidden') + '>' +
                  (category.items || []).map(function (label) {
                    return renderAppTile(appByLabel([item], label));
                  }).join('') +
                '</div>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderPersonalPanel(item, index, apps, isBusiness) {
    if (item.label === 'TV') return renderWidePromoPanel(item, index);
    if (item.mode === 'apps') return renderAppsPanel(item, index, apps);
    if (item.mode === 'list-promo') return renderListPromoPanel(item, index);
    if (item.mode === 'list') return renderListPanel(item, index);
    return renderDetailPanel(item, index, isBusiness && item.mode === 'detail-links');
  }

  function renderMobileAppItem(entry) {
    var href = navHref(entry);
    var external = /^https?:/.test(href);
    var tag = href ? 'a' : 'button';
    var attrs = href
      ? attr('href', href) + (external ? ' target="_blank" rel="noopener"' : '')
      : ' type="button"';
    return (
      '<' + tag + ' class="cmp-nav__mobile-app-item"' + attrs + '>' +
        '<span class="ph ph--square cmp-nav__mobile-app-icon" aria-hidden="true"></span>' +
        '<span class="t-body">' + esc(entry.label) + '</span>' +
      '</' + tag + '>'
    );
  }

  function renderMobilePanel(item, index, apps) {
    if (item.mode === 'detail-links') {
      return '<div class="cmp-nav__mobile-panel-body cmp-nav__mobile-inner-groups">' +
        (item.items || []).map(function (entry, entryIndex) {
          return '<section class="cmp-nav__mobile-inner-group' + (entry.featured ? ' cmp-nav__mobile-inner-group--featured' : '') + '">' +
            '<button type="button" class="t-h4 cmp-nav__mobile-inner-toggle" data-mobile-inner-toggle="' + index + '-' + entryIndex + '" aria-expanded="false">' +
              '<span>' + esc(entry.label) + '</span><span aria-hidden="true">+</span>' +
            '</button>' +
            '<div class="cmp-nav__mobile-inner-body" data-mobile-inner-body="' + index + '-' + entryIndex + '" data-open="false">' +
              (entry.href ? navLink(entry, 't-body cmp-nav__mobile-link') : '') +
              (entry.detail || []).map(function (link) {
                return navLink(link, 't-body cmp-nav__mobile-link');
              }).join('') +
            '</div>' +
          '</section>';
        }).join('') +
      '</div>';
    }
    if (item.label === 'TV') {
      var tv = (item.items || [])[0] || { label: 'Kinon' };
      return '<div class="cmp-nav__mobile-tv">' +
        '<div class="cmp-nav__mobile-tv-copy"><p class="t-label">TV</p>' + navLink(tv, 't-h3') + '</div>' +
        '<div class="ph ph--wide" aria-hidden="true"></div>' +
      '</div>';
    }
    if (item.mode === 'apps') {
      var categories = (apps && apps.categories) || [];
      return '<div class="cmp-nav__mobile-apps" data-apps-v1 aria-label="Apps">' +
          (item.items || []).map(renderMobileAppItem).join('') +
        '</div>' +
        '<div class="cmp-nav__mobile-apps" data-apps-v2 aria-label="Apps">' +
          categories.map(function (category, categoryIndex) {
            return '<section class="cmp-nav__mobile-app-category">' +
              '<button type="button" class="t-h4 cmp-nav__mobile-app-category-toggle" data-mobile-app-category-toggle="' + categoryIndex + '"' +
                ' aria-expanded="false">' +
                '<span>' + esc(category.label) + '</span><span aria-hidden="true">+</span>' +
              '</button>' +
              '<div class="cmp-nav__mobile-app-category-items" data-mobile-app-category-body="' + categoryIndex + '" data-open="false">' +
                (category.items || []).map(function (label) {
                  return renderMobileAppItem(appByLabel([item], label));
                }).join('') +
              '</div>' +
            '</section>';
          }).join('') +
        '</div>';
    }
    if (item.mode === 'list-promo') {
      return '<div class="cmp-nav__mobile-simple-list">' +
        (item.items || []).map(function (entry) {
          return navLink(entry, 't-body cmp-nav__mobile-link');
        }).join('') +
        '<div class="cmp-nav__mobile-promo-card">' + personalPromo(item.promo || {}) + '</div>' +
      '</div>';
    }
    return '<div class="cmp-nav__mobile-simple-list">' +
      (item.items || []).map(function (entry) {
        return navLink(entry, 't-body cmp-nav__mobile-link');
      }).join('') +
    '</div>';
  }

  function personalSiteHeader(props) {
    var nav = props.nav || [];
    var logo = props.logo || 'Azercell';
    var primary = props.primaryAction;
    var secondary = props.secondaryAction;
    var branches = props.branches || [];
    var branch = props.branch || 'personal';
    var locations = props.locations;
    var apps = props.apps;
    var isBusiness = branch === 'business';

    return (
      '<header class="cmp-header cmp-nav" data-header data-branch="' + esc(branch) + '" data-header-variant="v1">' +
        '<div class="cmp-nav__utility">' +
          '<div class="wrap cmp-nav__utility-inner">' +
            '<div class="cmp-nav__utility-group" aria-label="Personal or Business">' +
              branches.map(function (item) {
                var active = item.id === branch;
                return (
                  '<a class="cmp-nav__utility-button"' +
                    attr('href', item.href) +
                    (active ? ' aria-current="page"' : '') +
                  '>' + esc(item.label) + '</a>'
                );
              }).join('') +
            '</div>' +
            '<div class="cmp-nav__utility-group">' +
              (locations ? navLink(locations, 'cmp-nav__utility-button') : '') +
              '<button type="button" class="cmp-nav__utility-button" data-header-variant-toggle data-variant="v1" aria-pressed="false" aria-label="Switch Apps menu layout">EN</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="wrap">' +
          '<div class="cmp-nav__main">' +
            '<a class="cmp-header__logo"' + attr('href', props.logoHref || '/') + '>' + esc(logo) + '</a>' +
            '<nav class="cmp-header__nav" aria-label="Main">' +
              '<ul class="cmp-header__nav-list">' +
                nav.map(function (item, index) {
                  if (isBusiness) {
                    return (
                      '<li class="cmp-nav__category" data-menu-hover="' + index + '">' +
                        '<div class="cmp-nav__category-control">' +
                          '<a class="cmp-header__nav-btn cmp-nav__category-link"' + attr('href', item.href) +
                            ' data-menu-link="' + index + '" aria-expanded="false" aria-controls="nav-panel-' + index + '">' +
                            esc(item.label) +
                          '</a>' +
                          '<button type="button" class="cmp-nav__category-toggle" data-menu-toggle="' + index + '"' +
                            ' aria-expanded="false" aria-controls="nav-panel-' + index + '"' +
                            ' aria-label="Open ' + esc(item.label) + ' menu"><span aria-hidden="true">▾</span></button>' +
                        '</div>' +
                      '</li>'
                    );
                  }
                  return (
                    '<li>' +
                      '<button type="button" class="cmp-header__nav-btn"' +
                        ' data-menu-toggle="' + index + '"' +
                        ' aria-expanded="false" aria-controls="nav-panel-' + index + '">' +
                        esc(item.label) + '<span aria-hidden="true">▾</span>' +
                      '</button>' +
                    '</li>'
                  );
                }).join('') +
              '</ul>' +
            '</nav>' +
            '<div class="cmp-nav__actions">' +
              (secondary ? navLink(secondary, 'btn btn--small btn--quiet') : '') +
              (primary ? navLink(primary, 'btn btn--small btn--primary') : '') +
              '<button type="button" class="btn btn--small cmp-nav__mobile-menu-btn" data-mobile-menu-btn aria-expanded="false" aria-label="Open menu" aria-controls="nav-probe-mobile-drawer">' +
                '<span class="t-h4 cmp-nav__mobile-menu-icon" data-mobile-menu-icon aria-hidden="true">☰</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        nav.map(function (item, index) { return renderPersonalPanel(item, index, apps, isBusiness); }).join('') +
        '<div class="cmp-nav__mobile-drawer" id="nav-probe-mobile-drawer" data-mobile-drawer hidden aria-hidden="true">' +
          '<div class="wrap">' +
            '<div class="cmp-nav__mobile-utility-row">' +
              '<div class="cmp-nav__mobile-audience" aria-label="Audience">' +
                '<div class="cmp-nav__mobile-audience-segment">' +
                  branches.map(function (item) {
                    var active = item.id === branch;
                    return (
                      '<a class="t-small cmp-nav__mobile-audience-tab"' +
                        attr('href', item.href) +
                        (active ? ' aria-current="page"' : '') +
                      '>' + esc(item.label) + '</a>'
                    );
                  }).join('') +
                '</div>' +
              '</div>' +
              '<button type="button" class="t-small cmp-nav__mobile-variant-toggle" data-mobile-variant-toggle data-variant="v1" aria-label="Switch Apps menu layout">EN</button>' +
            '</div>' +
            '<div class="cmp-nav__mobile-groups">' +
              nav.map(function (item, index) {
                if (isBusiness) {
                  return '<section class="cmp-nav__mobile-group">' +
                    '<div class="cmp-nav__mobile-category-row">' +
                      navLink(item, 't-h4 cmp-nav__mobile-category-link') +
                      '<button type="button" class="t-h4 cmp-nav__mobile-category-toggle" data-mobile-group-toggle="' + index + '" aria-expanded="false"' +
                        ' aria-label="Open ' + esc(item.label) + ' menu"><span aria-hidden="true">+</span></button>' +
                    '</div>' +
                    '<div class="cmp-nav__mobile-group-body" data-mobile-group-body="' + index + '" data-open="false">' +
                      renderMobilePanel(item, index, apps) +
                    '</div>' +
                  '</section>';
                }
                return '<section class="cmp-nav__mobile-group">' +
                  '<button type="button" class="t-h4 cmp-nav__mobile-group-toggle" data-mobile-group-toggle="' + index + '" aria-expanded="false">' +
                    '<span>' + esc(item.label) + '</span><span aria-hidden="true">+</span>' +
                  '</button>' +
                  '<div class="cmp-nav__mobile-group-body" data-mobile-group-body="' + index + '" data-open="false">' +
                    renderMobilePanel(item, index, apps) +
                  '</div>' +
                '</section>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  }

  C.siteHeader = function (props) {
    if (props.layout === 'personal') return personalSiteHeader(props);
    return classicSiteHeader(props);
  };

  function personalFooterGroup(title, links, extraAttr, keyOverride) {
    var key = keyOverride || String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return '<section class="cmp-nav__footer-group"' + (extraAttr || '') + '>' +
      '<h3 class="t-h4 cmp-nav__footer-group-heading">' + esc(title) + '</h3>' +
      '<button type="button" class="t-h4 cmp-nav__footer-group-toggle" data-footer-group-toggle="' + key + '" aria-expanded="false">' +
        '<span>' + esc(title) + '</span><span aria-hidden="true">+</span>' +
      '</button>' +
      '<div class="cmp-nav__footer-links cmp-nav__footer-group-body" data-footer-group-body="' + key + '" data-open="false">' +
        (links || []).map(function (item) {
          var cls = 'cmp-nav__footer-link t-body';
          if (item.nested) cls += ' cmp-nav__footer-link--nested';
          if (item.featured) cls += ' cmp-nav__footer-link--featured';
          return navLink(item, cls);
        }).join('') +
      '</div>' +
    '</section>';
  }

  function personalFooterFeatureCard(card) {
    return '<article class="cmp-card cmp-nav__footer-app-card">' +
      placeholder(card.media || card.title || 'Azercell', 'ph--wide') +
      '<div class="cmp-card__body">' +
        '<h3 class="t-h3">' + esc(card.title || '') + '</h3>' +
        '<div class="cmp-nav__footer-app-actions">' +
          (card.actions || []).map(function (item) {
            return navLink(item, 'btn btn--small btn--quiet');
          }).join('') +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function personalSiteFooter(props) {
    var brand = props.brand || {};
    var subscribe = props.subscribe || {};
    var appCard = props.appCard || {};
    var featureCards = props.featureCards || [appCard];
    var includeAppsGroup = props.includeAppsGroup !== false;
    return (
      '<footer class="cmp-nav__footer" aria-label="Site footer">' +
        '<div class="wrap">' +
          '<div class="cmp-nav__footer-top">' +
            '<div class="cmp-nav__footer-brand">' +
              '<p class="t-h2">' + esc(brand.title || 'Azercell') + '</p>' +
              (brand.tagline ? '<p class="t-body t-muted">' + esc(brand.tagline) + '</p>' : '') +
            '</div>' +
            '<form class="cmp-nav__footer-subscribe" data-footer-subscribe>' +
              '<label class="t-label" for="footer-email">' + esc(subscribe.label || 'Subscribe for updates') + '</label>' +
              '<div class="cmp-nav__footer-subscribe-row">' +
                '<input class="input" id="footer-email" type="email" required placeholder="' + esc(subscribe.placeholder || 'Your email') + '" aria-label="Your email">' +
                '<button type="submit" class="btn btn--small btn--quiet" aria-label="Subscribe">→</button>' +
              '</div>' +
              (subscribe.note ? '<p class="t-small t-muted">' + esc(subscribe.note) + '</p>' : '') +
            '</form>' +
          '</div>' +
          '<div class="cmp-nav__footer-main">' +
            '<div class="cmp-nav__footer-groups">' +
              (props.groups || []).slice(0, 2).map(function (group) {
                return personalFooterGroup(group.title, group.links);
              }).join('') +
              (includeAppsGroup ? personalFooterGroup('Apps', props.appsV1, ' data-apps-v1', 'apps-v1') : '') +
              (includeAppsGroup ? personalFooterGroup('Apps', props.appsV2, ' data-apps-v2', 'apps-v2') : '') +
              (props.groups || []).slice(2).map(function (group) {
                return personalFooterGroup(group.title, group.links);
              }).join('') +
            '</div>' +
            '<div class="cmp-nav__footer-feature-cards">' + featureCards.map(personalFooterFeatureCard).join('') + '</div>' +
          '</div>' +
          '<div class="cmp-nav__footer-bottom">' +
            '<div class="cmp-nav__footer-legal">' +
              (props.legal || []).map(function (item) {
                return navLink(item, 't-small cmp-nav__footer-link');
              }).join('') +
            '</div>' +
            '<div class="cmp-nav__footer-social">' +
              (props.social || []).map(function (item) {
                return navLink(item, 'btn btn--small btn--quiet');
              }).join('') +
            '</div>' +
            '<div class="cmp-nav__footer-meta">' +
              '<button type="button" class="t-small cmp-nav__footer-language" data-header-variant-toggle>English</button>' +
              (props.copyright ? '<p class="t-small t-muted cmp-nav__footer-copyright">' + esc(props.copyright) + '</p>' : '') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  C.floatingBar = function (props) {
    var search = props.search || { label: 'Search' };
    var showPopoverTitles = props.showPopoverTitles !== false;
    if (props.mode === 'transfer') {
      var cta = props.cta || { label: 'Start transfer' };
      return (
        '<div class="cmp-nav__floating-bar cmp-nav__float--product" data-floating-bar aria-label="Transfer page actions">' +
          '<div class="cmp-nav__floating-main" data-floating-main>' +
            '<a class="btn btn--primary cmp-nav__floating-transfer" data-transfer-floating-cta hidden aria-hidden="true" tabindex="-1"' +
              attr('href', cta.href) + '>' + esc(cta.label) + '</a>' +
          '</div>' +
          navLink(search, 'cmp-nav__floating-search') +
        '</div>'
      );
    }

    function popoverHtml(item) {
      if (!item.detail) {
        return '<div class="cmp-nav__floating-kinon">' +
          '<div class="cmp-nav__floating-copy">' +
            (showPopoverTitles ? '<p class="t-label">' + esc(item.label) + '</p>' : '') +
            navLink(item, 't-h3') +
          '</div>' +
          '<div class="ph ph--wide" aria-hidden="true"></div>' +
        '</div>';
      }
      return '<div class="cmp-nav__floating-detail">' +
        '<div class="cmp-nav__floating-copy">' +
          (showPopoverTitles ? '<p class="t-label">' + esc(item.label) + '</p>' : '') +
          '<div class="cmp-nav__floating-links">' +
            (item.detail || []).map(function (link) {
              return navLink(link, link.featured ? 'btn btn--primary' : 't-body cmp-nav__text-link');
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="ph ph--wide" aria-hidden="true"></div>' +
      '</div>';
    }

    return (
      '<div class="cmp-nav__floating-bar' + (showPopoverTitles ? '' : ' cmp-nav__floating-bar--no-titles') + '" data-floating-bar aria-label="Shortcuts">' +
        '<div class="cmp-nav__floating-main" data-floating-main role="group" aria-label="Customer shortcuts">' +
          (props.items || []).map(function (item, index) {
            return '<button type="button" class="cmp-nav__floating-control" data-floating-trigger="' + index + '" aria-expanded="false">' +
              '<span class="ph ph--square cmp-nav__floating-icon" aria-hidden="true"></span>' +
              '<span class="t-small cmp-nav__floating-label">' + esc(item.label) + '</span>' +
            '</button>';
          }).join('') +
          '<div class="cmp-nav__floating-popover" data-floating-popover hidden>' +
            (props.items || []).map(function (item, index) {
              return '<div data-floating-pane="' + index + '" hidden>' + popoverHtml(item) + '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
        navLink(search, 'cmp-nav__floating-search') +
      '</div>'
    );
  };

  C.acquisitionBlock = function (props) {
    var items = props.items || [];
    var isSolutions = props.variant === 'solutions';
    return (
      '<section class="cmp-nav__acquisition' + (isSolutions ? ' cmp-nav__acquisition--solutions' : '') + '" aria-labelledby="acquisition-title">' +
        '<div class="wrap">' +
          '<h2 id="acquisition-title" class="t-h1">' + esc(props.title || 'Acquisition block') + '</h2>' +
          '<div class="cmp-nav__acquisition-grid" role="list" style="--acquisition-columns: ' + items.length + '">' +
            items.map(function (item) {
              var href = navHref(item);
              var external = /^https?:/.test(href);
              var tag = href ? 'a' : 'button';
              var attrs = href
                ? attr('href', href) + (external ? ' target="_blank" rel="noopener"' : '')
                : ' type="button"';
              return '<' + tag + ' class="cmp-nav__acquisition-card cmp-quick__item" role="listitem"' + attrs + '>' +
                '<span class="ph ph--square cmp-nav__acquisition-icon" aria-hidden="true"></span>' +
                (item.body
                  ? '<span class="cmp-nav__acquisition-copy"><span class="' + (isSolutions ? 't-h3' : 't-h4') + '">' + esc(item.label) + '</span>' +
                      '<span class="t-small t-muted">' + esc(item.body) + '</span></span>'
                  : '<span class="t-body">' + esc(item.label) + '</span>') +
              '</' + tag + '>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</section>'
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
      '<div class="' + classes('cmp-tdetail-features', props.className) + '" data-tdetail-features>' +
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
     Internet pack and roaming catalogue components
     -------------------------------------------------------------------- */

  C.internetCategoryNav = function (props) {
    var active = props.active || '';
    return (
      '<nav class="cmp-ipack-nav"' + attr('aria-label', props.ariaLabel || 'Product categories') + '>' +
        (props.items || []).map(function (item) {
          var isActive = item.id === active;
          return (
            '<a class="cmp-ipack-nav__link' + (isActive ? ' cmp-ipack-nav__link--active' : '') + '"' +
              attr('href', registryHref(item.href)) + (isActive ? ' aria-current="page"' : '') + '>' +
              '<span class="t-small">' + esc(item.label) + '</span>' +
            '</a>'
          );
        }).join('') +
      '</nav>'
    );
  };

  C.internetPackFilters = function (props) {
    return C.filterTabs({ groups: props.groups || [], urlBase: props.urlBase || '' });
  };

  function packValidity(value) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (value.prepaid === value.postpaid) return value.prepaid || '';
    return 'Prepaid: ' + (value.prepaid || '—') + ' · Postpaid: ' + (value.postpaid || '—');
  }

  C.internetPackCard = function (props) {
    var hints = props.usageHints || [];
    var validity = packValidity(props.validity);
    var hasDetails = !!(props.details || props.ussd || hints.length);
    var cardActions = [];
    if (props.kabinetimHref) {
      cardActions.push({ label: props.ctaLabel || 'Activate in Kabinetim', href: props.kabinetimHref, variant: 'primary' });
    }
    if (props.action) cardActions.push(props.action);
    return (
      '<article class="cmp-ipack-card"' +
        attr('data-ipack-price', props.priceNum == null ? 0 : props.priceNum) +
        attr('data-ipack-sort', props.sort == null ? 0 : props.sort) + '>' +
        '<div class="cmp-ipack-card__head">' +
          '<div><p class="t-label">Internet pack</p><h3 class="t-h3">' + esc(props.name || props.data) + '</h3></div>' +
          '<p class="t-h3">' + esc(props.price) + '</p>' +
        '</div>' +
        (props.data ? '<p class="t-h1 cmp-ipack-card__data">' + esc(props.data) + '</p>' : '') +
        (validity ? '<p class="t-body t-muted">Valid for ' + esc(validity) + '</p>' : '') +
        (props.keyword && props.shortCode
          ? '<p class="t-small cmp-ipack-card__activate">SMS <strong>' + esc(props.keyword) + '</strong> to <strong>' + esc(props.shortCode) + '</strong></p>'
          : '') +
        (cardActions.length ? '<div class="cmp-ipack-card__actions">' + actions(cardActions, 'btn--small btn--block') + '</div>' : '') +
        (hasDetails
          ? '<details class="cmp-ipack-card__details">' +
              '<summary class="cmp-ipack-card__summary"><span class="t-label">Pack details</span><span class="cmp-ipack-card__summary-icon" aria-hidden="true">↓</span></summary>' +
              '<div class="cmp-ipack-card__details-body">' +
                (props.details ? '<p class="t-body t-muted">' + esc(props.details) + '</p>' : '') +
                (props.ussd ? '<p class="t-body">USSD: <strong>' + esc(props.ussd) + '</strong></p>' : '') +
                (hints.length
                  ? '<ul class="cmp-ipack-card__hints">' + hints.map(function (hint) {
                      return '<li class="t-small"><strong>' + esc(hint.activity) + '</strong> — ' + esc(hint.duration) + '</li>';
                    }).join('') + '</ul>'
                  : '') +
              '</div>' +
            '</details>'
          : '') +
      '</article>'
    );
  };

  C.internetUpgradeBanner = function (props) {
    return (
      '<section class="cmp-ipack-upgrade">' +
        '<div class="cmp-ipack-upgrade__copy">' +
          (props.eyebrow ? '<p class="t-label">' + esc(props.eyebrow) + '</p>' : '') +
          '<h2 class="t-h2">' + esc(props.title) + '</h2>' +
          (props.body ? '<p class="t-body t-muted">' + esc(props.body) + '</p>' : '') +
          actions(props.actions || []) +
          (props.note ? '<p class="t-small t-muted">' + esc(props.note) + '</p>' : '') +
        '</div>' +
        '<div class="cmp-ipack-upgrade__visual">' + placeholder(props.media || 'Internet pack options', 'ph--wide') + '</div>' +
      '</section>'
    );
  };

  C.roamingCountrySearch = function (props) {
    return (
      '<div class="cmp-roam-search' + (props.className ? ' ' + esc(props.className) : '') + '" data-roam-search-wrap' +
        attr('data-roam-sync-url', props.syncUrl ? 'true' : 'false') +
        attr('data-roam-url-base', props.urlBase || '') +
        attr('data-roam-show-all-default', props.showAllDefault ? 'true' : 'false') +
        attr('data-roam-hide-default-results', props.hideDefaultResults ? 'true' : 'false') +
        attr('data-roam-pack-supported-only', props.packSupportedOnly ? 'true' : 'false') + '>' +
        '<label class="t-h4" for="' + esc(props.inputId || 'roaming-country-search') + '">' + esc(props.label || 'Search for a country') + '</label>' +
        (props.hint ? '<p class="t-body t-muted">' + esc(props.hint) + '</p>' : '') +
        '<input class="input cmp-roam-search__input" type="search" autocomplete="off" data-roam-search-input' +
          attr('id', props.inputId || 'roaming-country-search') + attr('placeholder', props.placeholder || 'Enter country name…') + '>' +
        ((props.topCountries || []).length
          ? '<div class="cmp-roam-search__chips" aria-label="Top countries">' +
              (props.topCountries || []).map(function (item) {
                return '<button type="button" class="btn btn--small" data-roam-country-id="' + esc(item.id) + '">' + esc(item.name) + '</button>';
              }).join('') +
            '</div>'
          : '') +
        '<div data-roam-results aria-live="polite"></div>' +
      '</div>'
    );
  };

  function roamingRates(rates) {
    if (!rates) return '';
    var rows = [
      ['Outgoing calls', rates.outgoing],
      ['Incoming calls', rates.incoming],
      ['Internet', rates.internetMb],
      ['SMS', rates.sms]
    ];
    return '<ul class="cmp-roam-results__rates">' + rows.map(function (row) {
      return '<li><span class="t-small t-muted">' + esc(row[0]) + '</span><br><strong class="t-body">' + esc(row[1]) + '</strong></li>';
    }).join('') + '</ul>';
  }

  function roamingOperator(operator, planType) {
    var rates = operator[planType] || operator.postpaid || operator.prepaid || {};
    return (
      '<div class="cmp-roam-results__operator">' +
        '<h4 class="t-h4">' + esc(operator.displayName || operator.name) + '</h4>' +
        '<p class="t-small t-muted">' + esc((operator.networks || []).join(' / ')) +
          (operator.internetPackSupported === false ? ' · Internet packs unavailable' : '') + '</p>' +
        roamingRates(rates) +
      '</div>'
    );
  }

  C.roamingCountryResults = function (props) {
    var countries = props.countries || [];
    if (!countries.length) return '<p class="t-body t-muted cmp-roam-results">' + esc(props.emptyText || 'No countries found.') + '</p>';
    return (
      '<div class="cmp-roam-results">' + countries.map(function (country) {
        return (
          '<article class="cmp-roam-results__country">' +
            '<div class="cmp-broam-search-result__head">' +
              '<div><p class="t-label">' + esc(country.planLabel || (props.planType === 'postpaid' ? 'Postpaid' : 'Prepaid')) + '</p><h3 class="t-h2">' + esc(country.name) + '</h3></div>' +
              (country.route ? '<a class="btn btn--small" href="' + esc(registryHref(country.route)) + '">Open country page</a>' : '') +
            '</div>' +
            (country.consolidatedRates
              ? '<p class="t-small t-muted">' + esc(country.operators.map(function (item) { return item.name; }).join(' · ')) + '</p>' + roamingRates(country.consolidatedRates)
              : (country.operators || []).map(function (operator) { return roamingOperator(operator, props.planType || 'prepaid'); }).join('')) +
          '</article>'
        );
      }).join('') + '</div>'
    );
  };

  C.roamingCountriesTable = function (props) {
    return (
      '<div class="cmp-roam-table-wrap">' +
        '<p class="t-small t-muted">Swipe horizontally to see the full table.</p>' +
        '<div class="cmp-roam-table-scroll" tabindex="0">' +
          '<table class="cmp-roam-table">' +
            '<thead><tr><th class="t-label" scope="col">Country</th><th class="t-label" scope="col">Operator</th><th class="t-label" scope="col">Networks</th></tr></thead>' +
            '<tbody>' + (props.rows || []).map(function (row) {
              var operatorData = typeof row.operator === 'string' ? { name: row.operator, networks: String(row.networks || '').split(' / ') } : (row.operator || {});
              return '<tr><td class="t-body">' + esc(row.country) + '</td><th class="t-body" scope="row">' + esc(operatorData.displayName || operatorData.name) + '</th><td class="t-body">' + esc((operatorData.networks || []).join(' / ')) + '</td></tr>';
            }).join('') + '</tbody>' +
          '</table>' +
        '</div>' +
        (props.note ? '<p class="t-small t-muted">' + esc(props.note) + '</p>' : '') +
      '</div>'
    );
  };

  C.roamingPlanToggle = function (props) {
    var current = props.current || 'prepaid';
    return (
      '<div class="cmp-tabs" role="tablist" aria-label="Subscriber type" data-roam-plan-toggle>' +
        ['prepaid', 'postpaid'].map(function (value) {
          return '<button type="button" class="cmp-tab" role="tab" data-roam-plan-value="' + value + '" aria-selected="' + (value === current ? 'true' : 'false') + '">' +
            (value === 'prepaid' ? 'Prepaid' : 'Postpaid') + '</button>';
        }).join('') +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Business roaming
     -------------------------------------------------------------------- */

  function businessRateValue(value, suffix) {
    if (value == null) return '';
    if (typeof value === 'object') return value.rate + (suffix || '');
    return value;
  }

  C.businessRoamingCountryCard = function (props) {
    var country = props.country || {};
    var rates = country.rates || {};
    var operators = country.operators || [];
    return (
      '<article class="cmp-broam-country">' +
        '<div class="cmp-broam-country__head">' +
          '<div>' +
            '<p class="t-label">Corporate roaming</p>' +
            '<h3 class="t-h2">' + esc(country.name) + '</h3>' +
          '</div>' +
          '<span class="badge">' + esc(operators.length) + ' operators</span>' +
        '</div>' +
        '<dl class="cmp-broam-summary">' +
          '<div><dt class="t-small t-muted">Outgoing calls</dt><dd class="t-h4">' + esc(businessRateValue(rates.outgoingWithin, ' AZN/min')) + '</dd></div>' +
          '<div><dt class="t-small t-muted">Incoming calls</dt><dd class="t-h4">' + esc(businessRateValue(rates.incoming, ' AZN/min')) + '</dd></div>' +
          '<div><dt class="t-small t-muted">Internet</dt><dd class="t-h4">' + esc(businessRateValue(rates.internet, ' AZN/MB')) + '</dd></div>' +
          '<div><dt class="t-small t-muted">SMS</dt><dd class="t-h4">' + esc(businessRateValue(rates.sms, ' AZN')) + '</dd></div>' +
        '</dl>' +
        '<p class="t-small t-muted">' + esc(operators.map(function (item) { return item.name; }).join(' · ')) + '</p>' +
        actions([{ label: 'View rates', href: props.href, variant: 'primary' }], 'btn--small') +
      '</article>'
    );
  };

  C.businessRoamingRateTable = function (props) {
    var country = props.country || {};
    var rates = country.rates || {};
    var rows = [
      ['Outgoing calls within the country', rates.outgoingWithin],
      ['Outgoing calls to Azerbaijan', rates.outgoingAzerbaijan],
      ['Outgoing calls to other destinations', rates.outgoingOther],
      ['Incoming calls', rates.incoming],
      ['Internet', rates.internet],
      ['SMS', rates.sms]
    ];
    return (
      '<div class="cmp-broam-rates">' +
        '<div class="cmp-broam-rates__scroll" tabindex="0" aria-label="Roaming rates for ' + esc(props.operatorName ? props.operatorName + ' in ' + country.name : country.name) + '">' +
          '<table class="cmp-broam-rates__table">' +
            '<thead><tr><th class="t-label" scope="col">Service</th><th class="t-label" scope="col">Rate, AZN</th><th class="t-label" scope="col">Charging interval</th></tr></thead>' +
            '<tbody>' + rows.map(function (row) {
              var value = row[1] || {};
              return '<tr><th class="t-body" scope="row">' + esc(row[0]) + '</th><td class="t-h4">' + esc(value.rate || value) + '</td><td class="t-body">' + esc(value.interval || '') + '</td></tr>';
            }).join('') + '</tbody>' +
          '</table>' +
        '</div>' +
        '<p class="t-small t-muted">All prices are in AZN. Depending on the carrier, 4G may be indicated as LTE on the smartphone.</p>' +
      '</div>'
    );
  };

  C.businessRoamingOperatorList = function (props) {
    var operators = props.operators || [];
    return (
      '<div class="cmp-broam-operators">' +
        operators.map(function (operator) {
          return (
            '<article class="cmp-broam-operator">' +
              '<h3 class="t-h3">' + esc(operator.name) + '</h3>' +
              '<p class="t-small t-muted">Available networks: ' + esc((operator.networks || []).join(' / ')) + '</p>' +
            '</article>'
          );
        }).join('') +
      '</div>'
    );
  };

  C.businessRoamingOperatorTabs = function (props) {
    var country = props.country || {};
    var operators = country.operators || [];
    return (
      '<div class="cmp-broam-operator-tabs" data-broam-operator-tabs>' +
        '<div class="cmp-tabs" role="tablist" aria-label="Available operators in ' + esc(country.name) + '">' +
          operators.map(function (operator, index) {
            var id = 'broam-' + esc(country.id) + '-operator-' + index;
            return '<button class="cmp-tab" type="button" role="tab" id="' + id + '-tab" aria-controls="' + id + '-panel" aria-selected="' + (index === 0 ? 'true' : 'false') + '" tabindex="' + (index === 0 ? '0' : '-1') + '" data-broam-operator-tab="' + index + '">' + esc(operator.name) + '</button>';
          }).join('') +
        '</div>' +
        '<div class="cmp-broam-operator-tabs__panels">' + operators.map(function (operator, index) {
          var id = 'broam-' + esc(country.id) + '-operator-' + index;
          return '<div role="tabpanel" id="' + id + '-panel" aria-labelledby="' + id + '-tab" data-broam-operator-panel="' + index + '"' + (index === 0 ? '' : ' hidden') + '>' +
            C.businessRoamingRateTable({ country: country, operatorName: operator.name }) +
          '</div>';
        }).join('') + '</div>' +
      '</div>'
    );
  };

  C.businessRoamingPackCard = function (props) {
    var pack = props.pack || {};
    return (
      '<article class="cmp-ipack-card"' + attr('data-ipack-price', pack.priceNum || 0) + attr('data-ipack-sort', pack.sort || 0) + '>' +
        '<div class="cmp-ipack-card__head">' +
          '<div><p class="t-label">Roaming internet pack</p><h3 class="t-h2">' + esc(pack.volume) + '</h3></div>' +
          '<p class="t-h3">' + esc(pack.price) + '</p>' +
        '</div>' +
        '<p class="t-body t-muted">Valid for ' + esc(pack.validity) + '</p>' +
        (props.subscribeHref ? '<div class="cmp-ipack-card__actions">' + actions([{ label: 'Subscribe', href: props.subscribeHref, variant: 'primary' }], 'btn--small btn--block') + '</div>' : '') +
      '</article>'
    );
  };

  C.businessRoamingSteps = function (props) {
    return (
      '<div class="cmp-roam-steps' + (props.firstStepContent ? ' cmp-roam-steps--with-search' : '') + '">' + (props.items || []).map(function (item, index) {
        return (
          '<article class="cmp-roam-step">' +
            '<p class="t-label">Step ' + esc(item.step) + '</p>' +
            '<h3 class="t-h3">' + esc(item.title) + '</h3>' +
            '<p class="t-body t-muted">' + esc(item.body) + '</p>' +
            (index === 0 && props.firstStepContent ? '<div class="cmp-roam-step__search">' + props.firstStepContent + '</div>' : '') +
          '</article>'
        );
      }).join('') + '</div>'
    );
  };

  C.businessRoamingCoverageTable = function (props) {
    var inputId = props.inputId || 'business-roaming-coverage-search';
    return (
      '<div class="cmp-broam-coverage" data-broam-coverage>' +
        '<label class="t-h4" for="' + esc(inputId) + '">' + esc(props.label || 'Enter country or operator name') + '</label>' +
        '<input class="input cmp-broam-coverage__input" id="' + esc(inputId) + '" type="search" autocomplete="off" placeholder="' + esc(props.placeholder || 'Enter country or operator name…') + '" data-broam-coverage-input>' +
        ((props.tags || []).length
          ? '<div class="cmp-broam-coverage__tags" aria-label="Country filters">' + (props.tags || []).map(function (tag) {
              return '<button class="btn btn--small" type="button" data-broam-coverage-tag="' + esc(tag.value || tag.label) + '">' + esc(tag.label) + '</button>';
            }).join('') + '</div>'
          : '') +
        '<p class="t-body t-muted" data-broam-coverage-empty hidden>No matching country or operator found.</p>' +
        '<div class="cmp-broam-coverage__scroll" tabindex="0" aria-label="Countries and operators where roaming internet packs are available">' +
          '<table class="cmp-broam-coverage__table">' +
            '<thead><tr><th class="t-label" scope="col">Country</th><th class="t-label" scope="col">Operator</th><th class="t-label" scope="col">Display name</th><th class="t-label" scope="col">Supported networks</th></tr></thead>' +
            '<tbody>' + (props.rows || []).map(function (row) {
              var searchText = [row.country, row.operator, row.displayName, row.networks].join(' ').toLowerCase();
              return '<tr data-broam-coverage-row data-search-text="' + esc(searchText) + '"><td class="t-body">' + esc(row.country) + '</td><th class="t-body" scope="row">' + esc(row.operator) + '</th><td class="t-body">' + esc(row.displayName || '—') + '</td><td class="t-body">' + esc(row.networks) + '</td></tr>';
            }).join('') + '</tbody>' +
          '</table>' +
        '</div>' +
        (props.note ? '<p class="t-small t-muted">' + esc(props.note) + '</p>' : '') +
      '</div>'
    );
  };

  C.businessRoamingOperatorsTable = function (props) {
    var rows = props.rows || [];
    return (
      '<div class="cmp-broam-rates">' +
        '<p class="t-small t-muted cmp-broam-rates__hint">Swipe horizontally to see the full table.</p>' +
        '<div class="cmp-broam-rates__scroll" tabindex="0" aria-label="Operators supporting roaming internet packs">' +
          '<table class="cmp-broam-rates__table cmp-broam-rates__table--operators">' +
            '<thead><tr><th class="t-label" scope="col">Country</th><th class="t-label" scope="col">Operator</th><th class="t-label" scope="col">Networks</th></tr></thead>' +
            '<tbody>' + rows.map(function (row) {
              return '<tr><td class="t-body">' + esc(row.country) + '</td><th class="t-body" scope="row">' + esc(row.operator) + '</th><td class="t-body">' + esc(row.networks) + '</td></tr>';
            }).join('') + '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>'
    );
  };

  /* --------------------------------------------------------------------
     Footer
     -------------------------------------------------------------------- */

  function classicSiteFooter(props) {
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


  C.siteFooter = function (props) {
    if (props.layout === 'personal') return personalSiteFooter(props);
    return classicSiteFooter(props);
  };

  C.transferHero = function (props) {
    var action = props.action || {};
    return (
      '<section class="cmp-nav__transfer-hero" aria-labelledby="transfer-page-title">' +
        '<div class="wrap">' +
          '<div class="cmp-nav__transfer-hero-grid">' +
            '<div class="cmp-nav__transfer-hero-copy">' +
              '<h1 id="transfer-page-title" class="t-display">' + esc(props.title || 'Transfer your number') + '</h1>' +
              (action.href
                ? '<a class="btn btn--primary" data-transfer-hero-cta' + attr('href', action.href) +
                    (/^https?:/.test(action.href) ? ' target="_blank" rel="noopener"' : '') + '>' +
                    esc(action.label || 'Start transfer') + '</a>'
                : '') +
            '</div>' +
            placeholder(props.media || 'Transfer visual', 'ph--tall') +
          '</div>' +
        '</div>' +
      '</section>'
    );
  };

  C.mediaPlaceholder = function (props) {
    return (
      '<section class="cmp-nav__transfer-placeholder"' +
        (props.label ? ' aria-label="' + esc(props.label) + '"' : '') + '>' +
        '<div class="wrap">' + placeholder(props.media || '', 'ph--wide') + '</div>' +
      '</section>'
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
