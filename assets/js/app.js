/* ==========================================================================
   Azercell HTML Prototype — shared interactions
   Real interface behaviour only. Nothing here fakes a backend response.
   Delegated from the document so dynamically mounted components work too.
   ========================================================================== */

(function () {
  'use strict';

  function closest(el, selector) {
    return el && el.closest ? el.closest(selector) : null;
  }

  function all(root, selector) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  /* ----------------------------------------------------------------------
     Announcement bar
     ---------------------------------------------------------------------- */

  function stepAnnouncement(bar, direction) {
    var data = bar.querySelector('[data-announce-data]');
    var msg = bar.querySelector('[data-announce-msg]');
    if (!data || !msg) return;

    var messages;
    try {
      messages = JSON.parse(data.textContent);
    } catch (err) {
      return;
    }
    if (!messages.length) return;

    var index = Number(bar.getAttribute('data-index') || 0);
    index = (index + direction + messages.length) % messages.length;
    bar.setAttribute('data-index', String(index));
    msg.textContent = messages[index];
  }

  /* ----------------------------------------------------------------------
     Fixed site chrome — keep main content below announcement + header bar
     ---------------------------------------------------------------------- */

  function syncSiteChromeHeight() {
    var shell = document.getElementById('page-top') || document.getElementById('chrome-top');
    if (!shell) return;

    var height = 0;
    var announce = shell.querySelector('[data-announce]');
    var header = shell.querySelector('[data-header]');

    if (announce) height += announce.offsetHeight;
    if (header) {
      var utility = header.querySelector('.cmp-nav__utility');
      var main = header.querySelector('.cmp-nav__main');
      var bar = header.querySelector('.cmp-header__bar');
      if (utility && window.getComputedStyle(utility).display !== 'none') {
        height += utility.offsetHeight;
      }
      if (main) height += main.offsetHeight;
      else if (bar) height += bar.offsetHeight;

      var searchRow = header.querySelector('[data-search-row][data-open="true"]');
      if (searchRow) height += searchRow.offsetHeight;
    }

    document.documentElement.style.setProperty('--chrome-h', height + 'px');
  }

  function scheduleSiteChromeHeight() {
    window.requestAnimationFrame(syncSiteChromeHeight);
  }

  /* ----------------------------------------------------------------------
     Header — desktop mega menu
     ---------------------------------------------------------------------- */

  function closeMenus(header, except) {
    all(header, '[data-menu-toggle]').forEach(function (btn) {
      if (btn.getAttribute('data-menu-toggle') !== except) {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    all(header, '[data-menu-link]').forEach(function (link) {
      if (link.getAttribute('data-menu-link') !== except) {
        link.setAttribute('aria-expanded', 'false');
      }
    });
    all(header, '[data-menu-panel]').forEach(function (panel) {
      if (panel.getAttribute('data-menu-panel') !== except) {
        panel.setAttribute('data-open', 'false');
      }
    });
  }

  function toggleMenu(header, key) {
    var btn = header.querySelector('[data-menu-toggle="' + key + '"]');
    var panel = header.querySelector('[data-menu-panel="' + key + '"]');
    if (!btn || !panel) return;

    var open = btn.getAttribute('aria-expanded') === 'true';
    closeMenus(header, key);
    closeHeaderSearch(header);
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    panel.setAttribute('data-open', open ? 'false' : 'true');
  }

  function openMenu(header, key) {
    var btn = header && header.querySelector('[data-menu-toggle="' + key + '"]');
    var link = header && header.querySelector('[data-menu-link="' + key + '"]');
    var panel = header && header.querySelector('[data-menu-panel="' + key + '"]');
    if (!panel) return;
    closeMenus(header, key);
    closeHeaderSearch(header);
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (link) link.setAttribute('aria-expanded', 'true');
    panel.setAttribute('data-open', 'true');
  }

  /* ----------------------------------------------------------------------
     Header — search toggle on mobile/tablet
     ---------------------------------------------------------------------- */

  function closeHeaderSearch(header) {
    if (!header) return;
    var row = header.querySelector('[data-search-row]');
    var btn = header.querySelector('[data-search-toggle]');
    if (row) row.setAttribute('data-open', 'false');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    scheduleSiteChromeHeight();
  }

  function toggleHeaderSearch(header) {
    var row = header.querySelector('[data-search-row]');
    var btn = header.querySelector('[data-search-toggle]');
    if (!row || !btn) return;

    var open = row.getAttribute('data-open') === 'true';
    closeMenus(header, null);

    var drawerBtn = header.querySelector('[data-drawer-btn]');
    var drawer = header.querySelector('[data-drawer]');
    if (drawer) drawer.setAttribute('data-open', 'false');
    if (drawerBtn) {
      drawerBtn.setAttribute('aria-expanded', 'false');
      drawerBtn.textContent = 'Menu';
    }

    row.setAttribute('data-open', open ? 'false' : 'true');
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    if (!open) {
      var input = row.querySelector('input');
      if (input) input.focus();
    }
    scheduleSiteChromeHeight();
  }

  /* ----------------------------------------------------------------------
     Header — mobile drawer
     ---------------------------------------------------------------------- */

  function toggleDrawer(header) {
    var btn = header.querySelector('[data-drawer-btn]');
    var drawer = header.querySelector('[data-drawer]');
    if (!btn || !drawer) return;

    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    drawer.setAttribute('data-open', open ? 'false' : 'true');
    btn.textContent = open ? 'Menu' : 'Close';
    if (!open) {
      closeMenus(header, null);
      closeHeaderSearch(header);
    }
  }

  function toggleDrawerGroup(header, key) {
    var btn = header.querySelector('[data-drawer-toggle="' + key + '"]');
    var body = header.querySelector('[data-drawer-body="' + key + '"]');
    if (!btn || !body) return;

    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    body.setAttribute('data-open', open ? 'false' : 'true');
    var sign = btn.querySelector('span[aria-hidden]');
    if (sign) sign.textContent = open ? '+' : '\u2212';
  }

  /* ----------------------------------------------------------------------
     Hero slides
     ---------------------------------------------------------------------- */

  function showSlide(hero, index) {
    all(hero, '[data-hero-slide]').forEach(function (slide) {
      slide.hidden = slide.getAttribute('data-hero-slide') !== String(index);
    });
    all(hero, '[data-hero-dot]').forEach(function (dot) {
      dot.setAttribute('aria-current', dot.getAttribute('data-hero-dot') === String(index) ? 'true' : 'false');
    });
  }

  /* ----------------------------------------------------------------------
     Plan price selector
     ---------------------------------------------------------------------- */

  function selectPlanTier(plan, index, syncUrl) {
    index = String(index);
    all(plan, '[data-plan-price]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-plan-price') === index ? 'true' : 'false');
    });
    all(plan, '[data-plan-tier]').forEach(function (tier) {
      tier.hidden = tier.getAttribute('data-plan-tier') !== index;
    });

    var compareLink = plan.querySelector('[data-compare-link]');
    var compareId = plan.getAttribute('data-compare-id');
    if (compareLink && compareId && window.SiteRegistry && window.SiteRegistry.tariffCompareHref) {
      compareLink.setAttribute('href', window.SiteRegistry.tariffCompareHref(compareId, Number(index)));
    }

    var detailRoot = closest(plan, '[data-tariff-detail]');
    if (detailRoot && syncUrl !== false && window.history && window.history.replaceState) {
      var tierIds = (plan.getAttribute('data-tier-ids') || '').split(',');
      var tierId = tierIds[Number(index)];
      if (tierId) {
        var url = new URL(window.location.href);
        url.searchParams.set('tier', tierId);
        window.history.replaceState({}, '', url.pathname + url.search);
      }
    }
  }

  function initTariffDetail() {
    var root = document.querySelector('[data-tariff-detail]');
    if (!root || root.getAttribute('data-tdetail-ready') === 'true') return;
    root.setAttribute('data-tdetail-ready', 'true');

    all(root, '[data-carousel]').forEach(initCarousel);

    var params = new URLSearchParams(window.location.search);
    var tierParam = params.get('tier');
    if (!tierParam) return;

    var card = root.querySelector('[data-tier-id="' + tierParam + '"]');
    if (!card) return;

    card.setAttribute('data-selected', 'true');
    var track = closest(card, '[data-carousel]');
    track = track && track.querySelector('[data-carousel-track]');
    if (track) {
      var offset = card.offsetLeft - track.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      track.scrollTo({ left: Math.max(0, offset), behavior: 'auto' });
      syncCarouselNav(closest(card, '[data-carousel]'));
    }
  }

  /* ----------------------------------------------------------------------
     Tariff compare tool
     ---------------------------------------------------------------------- */

  function escHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function initTariffCompare() {
    var root = document.querySelector('[data-tariff-compare]');
    if (!root || !window.TariffData || !window.SiteRegistry) return;

    var tariffs = window.TariffData.MOBILE_TARIFFS;
    var byId = window.TariffData.byId;
    var href = window.SiteRegistry.href;
    var minCols = 2;
    var maxCols = 4;
    var selected = [];

    var params = new URLSearchParams(window.location.search);
    var addId = params.get('add');
    var addTier = parseInt(params.get('tier') || '0', 10);
    if (addId && byId(addId)) {
      selected.push({ id: addId, tier: isNaN(addTier) ? 0 : addTier });
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }

    function renderSlots() {
      var list = root.querySelector('[data-compare-slots]');
      var hint = root.querySelector('[data-compare-hint]');
      var goBtn = root.querySelector('[data-compare-go]');
      if (!list) return;

      list.innerHTML = selected.map(function (item, index) {
        var tariff = byId(item.id);
        return (
          '<li class="cmp-compare__slot">' +
            '<span class="t-label">Plan ' + (index + 1) + '</span> ' +
            '<span class="t-body">' + escHtml(tariff.name) + '</span>' +
          '</li>'
        );
      }).join('');

      all(root, '[data-compare-toggle]').forEach(function (btn) {
        var id = btn.getAttribute('data-compare-toggle');
        var isSelected = selected.some(function (item) { return item.id === id; });
        btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        btn.disabled = !isSelected && selected.length >= maxCols;
      });

      if (hint) {
        if (selected.length < minCols) {
          hint.textContent = 'Pick at least ' + minCols + ' plans. You can compare up to ' + maxCols + '. (' + selected.length + ' selected)';
        } else {
          hint.textContent = selected.length + ' of ' + maxCols + ' plans selected. Switch price options in the next step.';
        }
      }

      if (goBtn) goBtn.disabled = selected.length < minCols;
    }

    function tierButtons(col, tariff, tierIndex) {
      return (
        '<div class="cmp-compare__tiers" role="group" aria-label="' + escHtml(tariff.name) + ' price options">' +
          tariff.tiers.map(function (tier, index) {
            return (
              '<button type="button" class="cmp-plan__price cmp-compare__tier" data-compare-tier="' + col + '"' +
                ' data-tier-index="' + index + '" aria-pressed="' + (index === tierIndex ? 'true' : 'false') + '">' +
                escHtml(tier.price) +
              '</button>'
            );
          }).join('') +
        '</div>'
      );
    }

    function cellValue(tier, key) {
      return tier[key] == null || tier[key] === '' ? '—' : tier[key];
    }

    function renderTable() {
      var table = root.querySelector('[data-compare-table]');
      var notesWrap = root.querySelector('[data-compare-notes]');
      if (!table) return;

      var rowDefs = [
        { key: 'tiers', label: 'Price option' },
        { key: 'price', label: 'Price' },
        { key: 'validity', label: 'Validity' },
        { key: 'internet', label: 'Internet' },
        { key: 'calls', label: 'Calls' },
        { key: 'sms', label: 'SMS' },
        { key: 'social', label: 'Social media' },
        { key: 'whatsapp', label: 'WhatsApp' },
        { key: 'roaming', label: 'Roaming data' },
        { key: 'extras', label: 'Other extras' },
        { key: 'activation', label: 'Activation' }
      ];

      var head = '<thead><tr><th scope="col" class="t-label">Feature</th>';
      selected.forEach(function (item, col) {
        var tariff = byId(item.id);
        head += '<th scope="col" data-compare-col="' + col + '">';
        head += '<label class="visually-hidden" for="compare-plan-' + col + '">Plan ' + (col + 1) + '</label>';
        head += '<select class="cmp-compare__select t-h3" id="compare-plan-' + col + '" data-compare-plan="' + col + '">';
        tariffs.forEach(function (option) {
          head += '<option value="' + escHtml(option.id) + '"' + (option.id === item.id ? ' selected' : '') + '>' + escHtml(option.name) + '</option>';
        });
        head += '</select>';
        if (tariff.type) head += '<span class="t-small t-muted">' + escHtml(tariff.type) + '</span>';
        if (tariff.badge) head += '<span class="badge">' + escHtml(tariff.badge) + '</span>';
        head += '</th>';
      });
      head += '</tr></thead>';

      var body = '<tbody>';
      rowDefs.forEach(function (row) {
        body += '<tr><th scope="row" class="t-label">' + escHtml(row.label) + '</th>';
        selected.forEach(function (item, col) {
          var tariff = byId(item.id);
          var tier = tariff.tiers[item.tier] || tariff.tiers[0];
          if (row.key === 'tiers') {
            body += '<td data-compare-col="' + col + '">' + tierButtons(col, tariff, item.tier) + '</td>';
          } else {
            body += '<td class="t-body" data-compare-col="' + col + '" data-compare-field="' + row.key + '">' + escHtml(cellValue(tier, row.key)) + '</td>';
          }
        });
        body += '</tr>';
      });

      body += '<tr><th scope="row" class="t-label">Next step</th>';
      selected.forEach(function (item, col) {
        var tariff = byId(item.id);
        body += '<td data-compare-col="' + col + '"><div class="stack">';
        body += '<a class="btn btn--primary btn--block" href="' + escHtml(href(tariff.detailHref)) + '">Plan details</a>';
        body += '<a class="btn btn--block" href="' + escHtml(href(tariff.activateHref)) + '">' + escHtml(tariff.activateLabel) + '</a>';
        body += '</div></td>';
      });
      body += '</tr></tbody>';

      table.innerHTML = head + body;

      if (notesWrap) {
        notesWrap.innerHTML = selected.map(function (item) {
          var tariff = byId(item.id);
          var parts = [];
          if (tariff.discountNote) parts.push('<p class="t-small"><strong>Contract discount:</strong> ' + escHtml(tariff.discountNote) + '</p>');
          if (tariff.note) parts.push('<p class="t-small t-muted">' + escHtml(tariff.note) + '</p>');
          return '<div class="cmp-compare__note">' + parts.join('') + '</div>';
        }).join('');
      }
    }

    function showStep(step) {
      all(root, '[data-compare-step]').forEach(function (el) {
        el.hidden = el.getAttribute('data-compare-step') !== String(step);
      });
      if (String(step) === '2') renderTable();
    }

    function toggleSelection(id) {
      var existing = selected.findIndex(function (item) { return item.id === id; });
      if (existing !== -1) {
        selected.splice(existing, 1);
      } else if (selected.length < maxCols) {
        selected.push({ id: id, tier: 0 });
      }
      renderSlots();
    }

    function setColumnPlan(col, id) {
      if (!byId(id)) return;
      selected[col] = { id: id, tier: 0 };
      renderTable();
    }

    function setColumnTier(col, tierIndex) {
      if (!selected[col]) return;
      selected[col].tier = tierIndex;
      renderTable();
    }

    root.addEventListener('click', function (event) {
      var toggle = closest(event.target, '[data-compare-toggle]');
      if (toggle) {
        toggleSelection(toggle.getAttribute('data-compare-toggle'));
        return;
      }

      var go = closest(event.target, '[data-compare-go]');
      if (go && selected.length >= minCols) {
        showStep(2);
        return;
      }

      var back = closest(event.target, '[data-compare-back]');
      if (back) {
        showStep(1);
        return;
      }

      var tierBtn = closest(event.target, '[data-compare-tier]');
      if (tierBtn) {
        setColumnTier(
          Number(tierBtn.getAttribute('data-compare-tier')),
          Number(tierBtn.getAttribute('data-tier-index'))
        );
      }
    });

    root.addEventListener('change', function (event) {
      var select = event.target;
      if (!select || !select.matches('[data-compare-plan]')) return;
      setColumnPlan(Number(select.getAttribute('data-compare-plan')), select.value);
    });

    renderSlots();
  }

  /* ----------------------------------------------------------------------
     Archive list — local search + pagination over items on the page
     ---------------------------------------------------------------------- */

  function initArchiveList(root) {
    if (typeof root._archiveApply === 'function') {
      root._archiveApply();
      return;
    }

    var perPage = Number(root.getAttribute('data-per-page') || 8);
    var searchInput = root.querySelector('[data-archive-search]');
    var target = root.querySelector('[data-archive-target]');
    var pagination = root.querySelector('[data-archive-pagination]');
    var empty = root.querySelector('[data-archive-empty]');
    var countLabel = root.querySelector('[data-archive-count]');
    if (!target) return;

    var items = all(target, '[data-archive-item]');
    var currentPage = 1;
    var query = '';

    function readUrl() {
      var params = new URLSearchParams(window.location.search);
      query = (params.get('q') || '').trim();
      currentPage = Math.max(1, Number(params.get('page') || 1));
      if (searchInput) searchInput.value = query;
    }

    function syncUrl() {
      var url = new URL(window.location.href);
      if (query) url.searchParams.set('q', query);
      else url.searchParams.delete('q');
      if (currentPage > 1) url.searchParams.set('page', String(currentPage));
      else url.searchParams.delete('page');
      var search = url.searchParams.toString();
      var next = url.pathname + (search ? '?' + search : '') + url.hash;
      var current = window.location.pathname + window.location.search + window.location.hash;
      if (next !== current) history.pushState(null, '', next);
    }

    function normalize(text) {
      return (text || '').toLowerCase().trim();
    }

    function matchingItems() {
      var q = normalize(query);
      return items.filter(function (item) {
        if (!q) return true;
        var text = normalize(item.getAttribute('data-search-text') || item.textContent);
        return text.indexOf(q) !== -1;
      });
    }

    function renderPagination(totalPages) {
      if (!pagination) return;
      if (totalPages <= 1) {
        pagination.hidden = true;
        pagination.innerHTML = '';
        return;
      }

      pagination.hidden = false;
      var html = '';
      html += currentPage > 1
        ? '<a class="cmp-pagination__link" data-archive-page="' + (currentPage - 1) + '" href="#">Prev</a>'
        : '<span class="cmp-pagination__link cmp-pagination__link--disabled" aria-disabled="true">Prev</span>';

      for (var page = 1; page <= totalPages; page += 1) {
        if (page === currentPage) {
          html += '<span class="cmp-pagination__link cmp-pagination__link--current" aria-current="page">' + page + '</span>';
        } else {
          html += '<a class="cmp-pagination__link" data-archive-page="' + page + '" href="#">' + page + '</a>';
        }
      }

      html += currentPage < totalPages
        ? '<a class="cmp-pagination__link" data-archive-page="' + (currentPage + 1) + '" href="#">Next</a>'
        : '<span class="cmp-pagination__link cmp-pagination__link--disabled" aria-disabled="true">Next</span>';

      pagination.innerHTML = html;
    }

    function apply() {
      var visible = matchingItems();
      var totalPages = Math.max(1, Math.ceil(visible.length / perPage));
      if (currentPage > totalPages) currentPage = totalPages;

      items.forEach(function (item) { item.hidden = true; });

      var start = (currentPage - 1) * perPage;
      visible.slice(start, start + perPage).forEach(function (item) {
        item.hidden = false;
      });

      if (empty) empty.hidden = visible.length > 0;

      if (countLabel) {
        if (!visible.length) {
          countLabel.hidden = true;
          countLabel.textContent = '';
        } else {
          countLabel.hidden = false;
          countLabel.textContent =
            'Showing ' + (start + 1) + '–' + Math.min(start + perPage, visible.length) +
            ' of ' + visible.length + ' plans';
        }
      }

      renderPagination(totalPages);
      syncUrl();
    }

    root._archiveApply = function () {
      readUrl();
      apply();
    };

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        query = searchInput.value.trim();
        currentPage = 1;
        apply();
      });
    }

    root.addEventListener('click', function (event) {
      var link = closest(event.target, '[data-archive-page]');
      if (!link || !root.contains(link)) return;
      event.preventDefault();
      currentPage = Number(link.getAttribute('data-archive-page'));
      apply();
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    readUrl();
    apply();
  }

  function refreshArchiveLists() {
    all(document, '[data-archive-list]').forEach(function (root) {
      if (typeof root._archiveApply === 'function') root._archiveApply();
      else initArchiveList(root);
    });
  }

  /* ----------------------------------------------------------------------
     Filter tabs — filters items already present in the target container
     ---------------------------------------------------------------------- */

  function applyFilters(scope) {
    var target = scope.querySelector('[data-filter-target]');
    if (!target) return;

    var active = {};
    all(scope, '[data-filter-group]').forEach(function (group) {
      var key = group.getAttribute('data-filter-group');
      var selected = group.querySelector('[aria-selected="true"]');
      active[key] = selected ? selected.getAttribute('data-filter-value') : 'all';
    });

    var shown = 0;
    all(target, '[data-filter-tags], [data-category], [data-brand]').forEach(function (item) {
      var visible = Object.keys(active).every(function (key) {
        if (key === 'sort') return true;
        var wanted = active[key];
        if (!wanted || wanted === 'all' || wanted === 'default') return true;

        var tags = item.getAttribute('data-filter-tags');
        if (tags) {
          return tags.split(/\s+/).indexOf(wanted) !== -1;
        }

        var direct = item.getAttribute('data-' + key);
        return direct ? direct === wanted : true;
      });
      item.hidden = !visible;
      if (visible) shown += 1;
    });

    var empty = scope.querySelector('[data-filter-empty]');
    if (empty) empty.hidden = shown > 0;

    if (scope.hasAttribute('data-ipack-scope')) {
      applyInternetPackSort(scope);
    }

    if (target.matches('[data-carousel-track]')) {
      var carousel = closest(target, '[data-carousel]');
      if (carousel) syncCarouselNav(carousel);
    }
  }

  function applyInternetPackSort(scope) {
    var target = scope.querySelector('[data-ipack-grid]');
    if (!target) return;

    var sortGroup = scope.querySelector('[data-filter-group="sort"]');
    var sortVal = 'default';
    if (sortGroup) {
      var selected = sortGroup.querySelector('[aria-selected="true"]');
      sortVal = selected ? selected.getAttribute('data-filter-value') : 'default';
    }

    var items = Array.prototype.slice.call(target.children);
    items.sort(function (a, b) {
      var cardA = a.querySelector('.cmp-ipack-card');
      var cardB = b.querySelector('.cmp-ipack-card');
      if (!cardA || !cardB) return 0;
      if (sortVal === 'price-asc') {
        return parseFloat(cardA.getAttribute('data-ipack-price')) - parseFloat(cardB.getAttribute('data-ipack-price'));
      }
      if (sortVal === 'price-desc') {
        return parseFloat(cardB.getAttribute('data-ipack-price')) - parseFloat(cardA.getAttribute('data-ipack-price'));
      }
      return parseFloat(cardA.getAttribute('data-ipack-sort')) - parseFloat(cardB.getAttribute('data-ipack-sort'));
    });
    items.forEach(function (item) { target.appendChild(item); });
  }

  function selectFilter(tab, fromUrl) {
    var group = closest(tab, '[data-filter-group]');
    var scope = closest(tab, '[data-filter-scope]');
    if (!group || !scope) return;

    all(group, '[data-filter-value]').forEach(function (btn) {
      btn.setAttribute('aria-selected', btn === tab ? 'true' : 'false');
    });
    applyFilters(scope);
    if (!fromUrl) syncFilterToUrl(scope);
  }

  function syncFilterToUrl(scope) {
    var groups = scope.querySelectorAll('[data-filter-sync-url="true"]');
    if (!groups.length) return;

    var url = new URL(window.location.href);
    groups.forEach(function (group) {
      var param = group.getAttribute('data-filter-param') || 'type';
      var selected = group.querySelector('[aria-selected="true"]');
      var value = selected ? selected.getAttribute('data-filter-value') : 'all';
      if (!value || value === 'all' || (param === 'sort' && value === 'default')) {
        url.searchParams.delete(param);
      } else {
        url.searchParams.set(param, value);
      }
    });

    var search = url.searchParams.toString();
    var next = url.pathname + (search ? '?' + search : '') + url.hash;
    var current = window.location.pathname + window.location.search + window.location.hash;
    if (next !== current) history.pushState(null, '', next);
  }

  function applyFilterFromUrl(scope) {
    var groups = scope.querySelectorAll('[data-filter-sync-url="true"]');
    if (!groups.length) return;

    groups.forEach(function (group) {
      var param = group.getAttribute('data-filter-param') || 'type';
      var defaultVal = param === 'sort' ? 'default' : 'all';
      var value = new URLSearchParams(window.location.search).get(param) || defaultVal;
      var tab = group.querySelector('[data-filter-value="' + value + '"]')
        || group.querySelector('[data-filter-value="' + defaultVal + '"]');
      if (tab) {
        all(group, '[data-filter-value]').forEach(function (btn) {
          btn.setAttribute('aria-selected', btn === tab ? 'true' : 'false');
        });
      }
    });
    applyFilters(scope);
  }

  /* ----------------------------------------------------------------------
     Carousel scroll buttons
     ---------------------------------------------------------------------- */

  function scrollCarousel(carousel, direction) {
    var track = carousel.querySelector('[data-carousel-track]');
    var btn = carousel.querySelector(direction > 0 ? '[data-carousel-next]' : '[data-carousel-prev]');
    if (!track || (btn && btn.getAttribute('aria-disabled') === 'true')) return;
    track.scrollBy({ left: direction * Math.round(track.clientWidth * 0.8), behavior: 'smooth' });
  }

  function syncCarouselNav(carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    var nav = carousel.querySelector('[data-carousel-nav]');
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    if (!track || !prev || !next) return;

    var scrollable = track.scrollWidth - track.clientWidth > 4;
    var atStart = track.scrollLeft <= 2;
    var atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;

    prev.setAttribute('aria-disabled', !scrollable || atStart ? 'true' : 'false');
    next.setAttribute('aria-disabled', !scrollable || atEnd ? 'true' : 'false');
    if (nav) nav.hidden = !scrollable;
    carousel.setAttribute('data-carousel-scrollable', scrollable ? 'true' : 'false');
  }

  function initCarousel(carousel) {
    if (!carousel || carousel.getAttribute('data-carousel-ready') === 'true') return;
    var track = carousel.querySelector('[data-carousel-track]');
    if (!track) return;

    carousel.setAttribute('data-carousel-ready', 'true');
    syncCarouselNav(carousel);
    track.addEventListener('scroll', function () { syncCarouselNav(carousel); }, { passive: true });

    if (window.ResizeObserver) {
      var observer = new ResizeObserver(function () { syncCarouselNav(carousel); });
      observer.observe(track);
    }
  }

  /* ----------------------------------------------------------------------
     Accordion
     ---------------------------------------------------------------------- */

  function toggleAccordion(accordion, key) {
    var btn = accordion.querySelector('[data-accordion-toggle="' + key + '"]');
    var panel = accordion.querySelector('[data-accordion-panel="' + key + '"]');
    if (!btn || !panel) return;

    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    panel.setAttribute('data-open', open ? 'false' : 'true');
    var sign = btn.querySelector('span[aria-hidden]');
    if (sign) sign.textContent = open ? '+' : '\u2212';
  }

  /* ----------------------------------------------------------------------
     Personal header — Apps layout switch, mega-menu rails, mobile drawer
     ---------------------------------------------------------------------- */

  function navVariant() {
    return document.documentElement.getAttribute('data-nav-variant') === 'v2' ? 'v2' : 'v1';
  }

  function setNavVariant(next) {
    var variant = next === 'v2' ? 'v2' : 'v1';
    document.documentElement.setAttribute('data-nav-variant', variant);
    all(document, '[data-header]').forEach(function (header) {
      header.setAttribute('data-header-variant', variant);
    });
    all(document, '[data-header-variant-toggle], [data-mobile-variant-toggle]').forEach(function (btn) {
      btn.setAttribute('data-variant', variant);
      btn.setAttribute('aria-pressed', variant === 'v2' ? 'true' : 'false');
      if (btn.matches('[data-header-variant-toggle]') && btn.classList.contains('cmp-nav__utility-button')) {
        btn.textContent = variant === 'v1' ? 'EN' : 'AZ';
      }
      if (btn.matches('[data-mobile-variant-toggle]')) {
        btn.textContent = variant === 'v1' ? 'EN' : 'AZ';
      }
      if (btn.classList.contains('cmp-nav__footer-language')) {
        btn.textContent = variant === 'v1' ? 'English' : 'Azərbaycan';
      }
    });
    var url = new URL(window.location.href);
    if (variant === 'v1') url.searchParams.delete('variant');
    else url.searchParams.set('variant', variant);
    window.history.replaceState({}, '', url.href);
  }

  function activateDetail(trigger) {
    var menu = trigger.closest('[data-detail-menu]');
    if (!menu) return;
    var index = trigger.getAttribute('data-detail-trigger');
    menu.querySelectorAll('[data-detail-trigger]').forEach(function (btn) {
      btn.setAttribute('aria-selected', btn === trigger ? 'true' : 'false');
    });
    menu.querySelectorAll('[data-detail-pane]').forEach(function (pane) {
      pane.hidden = pane.getAttribute('data-detail-pane') !== index;
    });
  }

  function activateAppCategory(trigger) {
    var panel = trigger.closest('[data-menu-panel], [data-apps-v2]');
    if (!panel) panel = trigger.closest('[data-apps-v2]');
    var wrap = trigger.closest('[data-apps-v2]') || panel;
    if (!wrap) return;
    var index = trigger.getAttribute('data-app-category-trigger');
    wrap.querySelectorAll('[data-app-category-trigger]').forEach(function (btn) {
      btn.setAttribute('aria-selected', btn === trigger ? 'true' : 'false');
    });
    wrap.querySelectorAll('[data-app-category-pane]').forEach(function (pane) {
      pane.hidden = pane.getAttribute('data-app-category-pane') !== index;
    });
  }

  function activateAppPromo(trigger) {
    var panel = trigger.closest('[data-apps-v1]');
    if (!panel) return;
    var label = trigger.getAttribute('data-app-trigger');
    panel.querySelectorAll('[data-app-promo]').forEach(function (promo) {
      promo.hidden = promo.getAttribute('data-app-promo') !== label;
    });
  }

  function closeMobileGroups(header, except) {
    all(header, '[data-mobile-group-toggle]').forEach(function (btn) {
      if (btn.getAttribute('data-mobile-group-toggle') === except) return;
      btn.setAttribute('aria-expanded', 'false');
      var sign = btn.querySelector('span[aria-hidden]');
      if (sign) sign.textContent = '+';
    });
    all(header, '[data-mobile-group-body]').forEach(function (body) {
      if (body.getAttribute('data-mobile-group-body') !== except) body.setAttribute('data-open', 'false');
    });
  }

  function toggleMobileGroup(header, key) {
    var btn = header.querySelector('[data-mobile-group-toggle="' + key + '"]');
    var body = header.querySelector('[data-mobile-group-body="' + key + '"]');
    if (!btn || !body) return;
    var open = btn.getAttribute('aria-expanded') === 'true';
    closeMobileGroups(header, key);
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    body.setAttribute('data-open', open ? 'false' : 'true');
    var sign = btn.querySelector('span[aria-hidden]');
    if (sign) sign.textContent = open ? '+' : '\u2212';
  }

  function closeMobileDrawer(header) {
    var btn = header.querySelector('[data-mobile-menu-btn]');
    var drawer = header.querySelector('[data-mobile-drawer]');
    if (!btn || !drawer) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
    var icon = btn.querySelector('[data-mobile-menu-icon]');
    if (icon) icon.textContent = '☰';
    drawer.hidden = true;
    drawer.setAttribute('aria-hidden', 'true');
    closeMobileGroups(header, null);
  }

  function toggleMobileDrawer(header) {
    var btn = header.querySelector('[data-mobile-menu-btn]');
    var drawer = header.querySelector('[data-mobile-drawer]');
    if (!btn || !drawer) return;
    var open = btn.getAttribute('aria-expanded') === 'true';
    if (open) {
      closeMobileDrawer(header);
      return;
    }
    closeMenus(header, null);
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
    var icon = btn.querySelector('[data-mobile-menu-icon]');
    if (icon) icon.textContent = '✕';
    drawer.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    scheduleSiteChromeHeight();
  }

  function closeFloatingPopover() {
    all(document, '[data-floating-bar]').forEach(function (bar) {
      var pop = bar.querySelector('[data-floating-popover]');
      if (pop) pop.hidden = true;
      all(bar, '[data-floating-trigger]').forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
        btn.removeAttribute('data-floating-active');
      });
      all(bar, '[data-floating-pane]').forEach(function (pane) { pane.hidden = true; });
    });
  }

  function openFloatingPopover(trigger) {
    var bar = closest(trigger, '[data-floating-bar]');
    if (!bar) return;
    var pop = bar.querySelector('[data-floating-popover]');
    if (!pop) return;
    var index = trigger.getAttribute('data-floating-trigger');
    var already = trigger.getAttribute('aria-expanded') === 'true';
    closeFloatingPopover();
    if (already) return;
    pop.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('data-floating-active', 'true');
    all(bar, '[data-floating-pane]').forEach(function (pane) {
      pane.hidden = pane.getAttribute('data-floating-pane') !== index;
    });
    pop.style.setProperty('--floating-pointer-left', (trigger.offsetLeft + (trigger.offsetWidth / 2)) + 'px');
  }

  var floatingDockRaf = 0;

  function syncFloatingDocking() {
    var bar = document.querySelector('[data-floating-bar]');
    if (!bar) return;
    var footer = document.querySelector('.cmp-nav__footer, .cmp-footer');
    if (!footer) return;
    var footerRect = footer.getBoundingClientRect();
    var bottomGap = 16;
    if (footerRect.top <= window.innerHeight - bottomGap) {
      var dockTop = footerRect.top + window.scrollY - bar.offsetHeight - bottomGap;
      bar.setAttribute('data-floating-docked', 'true');
      bar.style.setProperty('--floating-dock-top', dockTop + 'px');
    } else {
      bar.removeAttribute('data-floating-docked');
      bar.style.removeProperty('--floating-dock-top');
    }
  }

  function scheduleFloatingDocking() {
    if (floatingDockRaf) return;
    floatingDockRaf = window.requestAnimationFrame(function () {
      floatingDockRaf = 0;
      syncFloatingDocking();
    });
  }

  function initTransferFloatingCta() {
    var heroCta = document.querySelector('[data-transfer-hero-cta]');
    var floatingCta = document.querySelector('[data-transfer-floating-cta]');
    if (!heroCta || !floatingCta) return;

    function headerHeight() {
      var header = document.querySelector('[data-header]');
      if (!header) return window.innerWidth < 768 ? 64 : 98;
      var utility = header.querySelector('.cmp-nav__utility');
      var main = header.querySelector('.cmp-nav__main');
      var height = 1;
      if (utility && window.getComputedStyle(utility).display !== 'none') {
        height += utility.getBoundingClientRect().height;
      }
      if (main) height += main.getBoundingClientRect().height;
      return height;
    }

    function setVisible(visible) {
      floatingCta.hidden = !visible;
      floatingCta.setAttribute('aria-hidden', visible ? 'false' : 'true');
      floatingCta.tabIndex = visible ? 0 : -1;
    }

    function update() {
      setVisible(heroCta.getBoundingClientRect().bottom <= headerHeight());
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function toggleFooterGroup(footer, key) {
    var btn = footer.querySelector('[data-footer-group-toggle="' + key + '"]');
    var body = footer.querySelector('[data-footer-group-body="' + key + '"]');
    if (!btn || !body) return;
    var open = btn.getAttribute('aria-expanded') === 'true';
    all(footer, '[data-footer-group-toggle]').forEach(function (other) {
      if (other === btn) return;
      other.setAttribute('aria-expanded', 'false');
      var sign = other.querySelector('span[aria-hidden]');
      if (sign) sign.textContent = '+';
    });
    all(footer, '[data-footer-group-body]').forEach(function (other) {
      if (other === body) return;
      other.setAttribute('data-open', 'false');
    });
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    body.setAttribute('data-open', open ? 'false' : 'true');
    var mark = btn.querySelector('span[aria-hidden]');
    if (mark) mark.textContent = open ? '+' : '\u2212';
  }

  /* ----------------------------------------------------------------------
     Lead form — field validation only. Submitting never claims the request
     was received; it reveals the real phone/email handoff instead.
     ---------------------------------------------------------------------- */

  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE = /^[+()\-\s\d]{7,}$/;

  function fieldMessage(control) {
    var value = (control.value || '').trim();
    if (control.required && !value) return 'This field is required.';
    if (!value) return '';
    if (control.type === 'email' && !EMAIL.test(value)) return 'Enter a valid email address.';
    if (control.type === 'tel' && !PHONE.test(value)) return 'Enter a valid phone number.';
    return '';
  }

  function showFieldError(wrapper, message) {
    var slot = wrapper.querySelector('[data-field-error]');
    if (!slot) return;
    slot.textContent = message;
    slot.hidden = !message;
    wrapper.setAttribute('data-invalid', message ? 'true' : 'false');
  }

  function validateLeadForm(form) {
    var firstInvalid = null;

    all(form, '[data-field]').forEach(function (wrapper) {
      var control = wrapper.querySelector('input:not([type="radio"]), select');
      if (!control) return;

      var message = fieldMessage(control);
      showFieldError(wrapper, message);
      if (message && !firstInvalid) firstInvalid = control;
    });

    var handoff = form.querySelector('[data-lead-handoff]');
    if (handoff) handoff.hidden = Boolean(firstInvalid);
    if (firstInvalid) firstInvalid.focus();

    return !firstInvalid;
  }

  /* ----------------------------------------------------------------------
     Delegated events
     ---------------------------------------------------------------------- */

  document.addEventListener('click', function (event) {
    var el = event.target;

    var announcePrev = closest(el, '[data-announce-prev]');
    var announceNext = closest(el, '[data-announce-next]');
    if (announcePrev || announceNext) {
      stepAnnouncement(closest(el, '[data-announce]'), announceNext ? 1 : -1);
      return;
    }

    var menuToggle = closest(el, '[data-menu-toggle]');
    if (menuToggle) {
      var menuHeader = closest(menuToggle, '[data-header]');
      if (menuHeader && menuHeader.getAttribute('data-branch') === 'business') {
        openMenu(menuHeader, menuToggle.getAttribute('data-menu-toggle'));
      } else {
        toggleMenu(menuHeader, menuToggle.getAttribute('data-menu-toggle'));
      }
      return;
    }

    var drawerBtn = closest(el, '[data-drawer-btn]');
    if (drawerBtn) {
      toggleDrawer(closest(drawerBtn, '[data-header]'));
      return;
    }

    var drawerToggle = closest(el, '[data-drawer-toggle]');
    if (drawerToggle) {
      toggleDrawerGroup(closest(drawerToggle, '[data-header]'), drawerToggle.getAttribute('data-drawer-toggle'));
      return;
    }

    var searchToggle = closest(el, '[data-search-toggle]');
    if (searchToggle) {
      toggleHeaderSearch(closest(searchToggle, '[data-header]'));
      return;
    }

    var variantToggle = closest(el, '[data-header-variant-toggle], [data-mobile-variant-toggle]');
    if (variantToggle) {
      event.preventDefault();
      setNavVariant(navVariant() === 'v1' ? 'v2' : 'v1');
      return;
    }

    var detailTrigger = closest(el, '[data-detail-trigger]');
    if (detailTrigger) {
      activateDetail(detailTrigger);
      return;
    }

    var appCat = closest(el, '[data-app-category-trigger]');
    if (appCat) {
      activateAppCategory(appCat);
      return;
    }

    var appTrigger = closest(el, '[data-app-trigger]');
    if (appTrigger) {
      activateAppPromo(appTrigger);
    }

    var mobileMenuBtn = closest(el, '[data-mobile-menu-btn]');
    if (mobileMenuBtn) {
      toggleMobileDrawer(closest(mobileMenuBtn, '[data-header]'));
      return;
    }

    var mobileGroup = closest(el, '[data-mobile-group-toggle]');
    if (mobileGroup) {
      toggleMobileGroup(closest(mobileGroup, '[data-header]'), mobileGroup.getAttribute('data-mobile-group-toggle'));
      return;
    }

    var mobileInner = closest(el, '[data-mobile-inner-toggle]');
    if (mobileInner) {
      var header = closest(mobileInner, '[data-header]');
      var innerKey = mobileInner.getAttribute('data-mobile-inner-toggle');
      var innerBtn = header.querySelector('[data-mobile-inner-toggle="' + innerKey + '"]');
      var innerBody = header.querySelector('[data-mobile-inner-body="' + innerKey + '"]');
      if (innerBtn && innerBody) {
        var innerOpen = innerBtn.getAttribute('aria-expanded') === 'true';
        innerBtn.setAttribute('aria-expanded', innerOpen ? 'false' : 'true');
        innerBody.setAttribute('data-open', innerOpen ? 'false' : 'true');
        var innerSign = innerBtn.querySelector('span[aria-hidden]');
        if (innerSign) innerSign.textContent = innerOpen ? '+' : '\u2212';
      }
      return;
    }

    var mobileAppCat = closest(el, '[data-mobile-app-category-toggle]');
    if (mobileAppCat) {
      var appHeader = closest(mobileAppCat, '[data-header]');
      var catKey = mobileAppCat.getAttribute('data-mobile-app-category-toggle');
      var catBtn = appHeader.querySelector('[data-mobile-app-category-toggle="' + catKey + '"]');
      var catBody = appHeader.querySelector('[data-mobile-app-category-body="' + catKey + '"]');
      if (catBtn && catBody) {
        var catOpen = catBtn.getAttribute('aria-expanded') === 'true';
        catBtn.setAttribute('aria-expanded', catOpen ? 'false' : 'true');
        catBody.setAttribute('data-open', catOpen ? 'false' : 'true');
        var catSign = catBtn.querySelector('span[aria-hidden]');
        if (catSign) catSign.textContent = catOpen ? '+' : '\u2212';
      }
      return;
    }

    var floatTrigger = closest(el, '[data-floating-trigger]');
    if (floatTrigger) {
      openFloatingPopover(floatTrigger);
      return;
    }

    var footerToggle = closest(el, '[data-footer-group-toggle]');
    if (footerToggle) {
      toggleFooterGroup(closest(footerToggle, 'footer'), footerToggle.getAttribute('data-footer-group-toggle'));
      return;
    }

    var dot = closest(el, '[data-hero-dot]');
    if (dot) {
      showSlide(closest(dot, '[data-hero]'), dot.getAttribute('data-hero-dot'));
      return;
    }

    var price = closest(el, '[data-plan-price]');
    if (price) {
      selectPlanTier(closest(price, '[data-plan]'), price.getAttribute('data-plan-price'));
      return;
    }

    var tab = closest(el, '[data-filter-value]');
    if (tab) {
      var filterGroup = closest(tab, '[data-filter-group]');
      if (filterGroup && filterGroup.getAttribute('data-filter-sync-url') === 'true') {
        event.preventDefault();
      }
      selectFilter(tab);
      return;
    }

    var carouselPrev = closest(el, '[data-carousel-prev]');
    var carouselNext = closest(el, '[data-carousel-next]');
    if (carouselPrev || carouselNext) {
      var carouselBtn = carouselPrev || carouselNext;
      if (carouselBtn.getAttribute('aria-disabled') === 'true') return;
      scrollCarousel(closest(el, '[data-carousel]'), carouselNext ? 1 : -1);
      return;
    }

    var accordionToggle = closest(el, '[data-accordion-toggle]');
    if (accordionToggle) {
      toggleAccordion(closest(accordionToggle, '[data-accordion]'), accordionToggle.getAttribute('data-accordion-toggle'));
      return;
    }

    // Clicking outside an open mega menu closes it.
    var header = document.querySelector('[data-header]');
    if (header && !closest(el, '[data-header]')) {
      closeMenus(header, null);
      closeHeaderSearch(header);
      closeMobileDrawer(header);
    }

    if (!closest(el, '[data-floating-bar]')) closeFloatingPopover();
  });

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form) return;

    if (form.matches('[data-footer-subscribe]')) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    if (form.matches('[data-lead-form]')) {
      event.preventDefault();
      validateLeadForm(form);
    }
  });

  // Clearing an error as soon as the field becomes valid again
  document.addEventListener('input', function (event) {
    var wrapper = closest(event.target, '[data-field]');
    if (!wrapper || wrapper.getAttribute('data-invalid') !== 'true') return;
    if (!fieldMessage(event.target)) showFieldError(wrapper, '');
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var header = document.querySelector('[data-header]');
    if (header) {
      closeMenus(header, null);
      closeHeaderSearch(header);
      closeMobileDrawer(header);
    }
    closeFloatingPopover();
  });

  /* ----------------------------------------------------------------------
     Roaming country search — client-side filter, ?country= URL sync
     ---------------------------------------------------------------------- */

  function initRoamingCountrySearch(wrap) {
    if (!wrap || wrap.getAttribute('data-roam-search-ready') === 'true') return;
    if (!window.RoamingData || !window.Components) return;

    var input = wrap.querySelector('[data-roam-search-input]');
    var resultsEl = wrap.querySelector('[data-roam-results]');
    if (!input || !resultsEl) return;

    var config = {
      syncUrl: wrap.getAttribute('data-roam-sync-url') === 'true',
      urlBase: wrap.getAttribute('data-roam-url-base') || '',
      showAllDefault: wrap.getAttribute('data-roam-show-all-default') === 'true',
      hideDefaultResults: wrap.getAttribute('data-roam-hide-default-results') === 'true',
      packSupportedOnly: wrap.getAttribute('data-roam-pack-supported-only') === 'true'
    };

    var pageWrap = closest(wrap, '[data-roam-page]') || document;
    wrap.setAttribute('data-roam-search-ready', 'true');

    function planToggle() {
      return pageWrap.querySelector('[data-roam-plan-toggle]');
    }

    function currentPlanType() {
      var toggle = planToggle();
      var selected = toggle && toggle.querySelector('[aria-selected="true"]');
      return selected ? selected.getAttribute('data-roam-plan-value') : 'prepaid';
    }

    function renderResults(countries, emptyText) {
      resultsEl.innerHTML = window.Components.render('roamingCountryResults', {
        countries: countries,
        planType: currentPlanType(),
        emptyText: emptyText
      });
    }

    function syncCountryUrl(countryId) {
      if (!config.syncUrl) return;
      var url = new URL(window.location.href);
      if (countryId) url.searchParams.set('country', countryId);
      else url.searchParams.delete('country');
      var search = url.searchParams.toString();
      var next = url.pathname + (search ? '?' + search : '') + url.hash;
      var current = window.location.pathname + window.location.search + window.location.hash;
      if (next !== current) history.pushState(null, '', next);
    }

    function topCountriesList() {
      return window.RoamingData.topCountries.map(function (id) {
        return window.RoamingData.getCountry(id);
      }).filter(Boolean);
    }

    function applyFromState(options) {
      var opts = options || {};
      var query = typeof opts.query === 'string' ? opts.query : input.value.trim();
      var countryId = opts.countryId || null;

      if (countryId) {
        var country = window.RoamingData.getCountry(countryId);
        if (country) {
          input.value = country.name;
          renderResults([country]);
          if (!opts.fromUrl) syncCountryUrl(countryId);
          return;
        }
        renderResults([], 'No country matches. Try another spelling.');
        if (!opts.fromUrl) syncCountryUrl(null);
        return;
      }

      if (query) {
        var matches = window.RoamingData.searchCountries(query);
        renderResults(matches);
        if (!opts.fromUrl) syncCountryUrl(null);
        return;
      }

      if (config.hideDefaultResults) {
        resultsEl.innerHTML = '';
        if (!opts.fromUrl) syncCountryUrl(null);
        return;
      }

      renderResults(topCountriesList());
      if (!opts.fromUrl) syncCountryUrl(null);
    }

    wrap._roamApplyFromUrl = function () {
      var countryId = new URLSearchParams(window.location.search).get('country');
      if (countryId) {
        applyFromState({ countryId: countryId, fromUrl: true });
      } else {
        applyFromState({ query: input.value, fromUrl: true });
      }
    };

    input.addEventListener('input', function () {
      applyFromState({ query: input.value });
    });

    wrap.addEventListener('click', function (event) {
      var chip = closest(event.target, '[data-roam-country-id]');
      if (!chip || !wrap.contains(chip)) return;
      var id = chip.getAttribute('data-roam-country-id');
      applyFromState({ countryId: id });
    });

    var toggle = planToggle();
    if (toggle) {
      toggle.addEventListener('click', function (event) {
        var tab = closest(event.target, '[data-roam-plan-value]');
        if (!tab || !toggle.contains(tab)) return;
        all(toggle, '[data-roam-plan-value]').forEach(function (btn) {
          btn.setAttribute('aria-selected', btn === tab ? 'true' : 'false');
        });
        applyFromState({ query: input.value, countryId: new URLSearchParams(window.location.search).get('country') });
      });
    }

    wrap._roamApplyFromUrl();
  }

  function refreshRoamingCountrySearch() {
    all(document, '[data-roam-search-wrap]').forEach(function (wrap) {
      if (typeof wrap._roamApplyFromUrl === 'function') wrap._roamApplyFromUrl();
      else initRoamingCountrySearch(wrap);
    });
  }

  function initBusinessRoamingCoverage(root) {
    if (!root || root.getAttribute('data-broam-coverage-ready') === 'true') return;
    var input = root.querySelector('[data-broam-coverage-input]');
    var rows = all(root, '[data-broam-coverage-row]');
    var empty = root.querySelector('[data-broam-coverage-empty]');
    if (!input || !rows.length) return;
    root.setAttribute('data-broam-coverage-ready', 'true');

    function apply() {
      var query = (input.value || '').trim().toLowerCase();
      var visible = 0;
      rows.forEach(function (row) {
        var match = !query || (row.getAttribute('data-search-text') || '').indexOf(query) !== -1;
        row.hidden = !match;
        if (match) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    }

    input.addEventListener('input', apply);
    apply();
  }

  /* ----------------------------------------------------------------------
     Init after components mount
     ---------------------------------------------------------------------- */

  function init() {
    syncSiteChromeHeight();

    all(document, '[data-filter-scope]').forEach(function (scope) {
      applyFilterFromUrl(scope);
      applyFilters(scope);
    });

    window.addEventListener('popstate', function () {
      all(document, '[data-filter-scope]').forEach(function (scope) {
        applyFilterFromUrl(scope);
        applyFilters(scope);
      });
      refreshArchiveLists();
      refreshRoamingCountrySearch();
    });

    initTariffCompare();

    all(document, '[data-archive-list]').forEach(initArchiveList);
    initTariffDetail();

    all(document, '[data-carousel]').forEach(initCarousel);
    all(document, '[data-roam-search-wrap]').forEach(initRoamingCountrySearch);
    all(document, '[data-broam-coverage]').forEach(initBusinessRoamingCoverage);

    document.addEventListener('mouseover', function (event) {
      var menuHover = closest(event.target, '[data-menu-hover]');
      if (menuHover) {
        var businessHeader = closest(menuHover, '[data-header][data-branch="business"]');
        if (businessHeader) openMenu(businessHeader, menuHover.getAttribute('data-menu-hover'));
      }
      var appTrigger = closest(event.target, '[data-app-trigger]');
      if (appTrigger) activateAppPromo(appTrigger);
      var detailTrigger = closest(event.target, '[data-detail-trigger]');
      if (detailTrigger && closest(detailTrigger, '[data-detail-hover="true"]')) activateDetail(detailTrigger);
    });

    document.addEventListener('mouseout', function (event) {
      var businessHeader = closest(event.target, '[data-header][data-branch="business"]');
      if (businessHeader && (!event.relatedTarget || !businessHeader.contains(event.relatedTarget))) {
        closeMenus(businessHeader, null);
      }
    });

    document.addEventListener('focusin', function (event) {
      var detailTrigger = closest(event.target, '[data-detail-trigger]');
      if (detailTrigger && closest(detailTrigger, '[data-detail-hover="true"]')) activateDetail(detailTrigger);
      var menuControl = closest(event.target, '[data-menu-link], [data-menu-toggle]');
      var businessHeader = closest(menuControl, '[data-header][data-branch="business"]');
      if (!businessHeader || !menuControl) return;
      var key = menuControl.getAttribute('data-menu-link') || menuControl.getAttribute('data-menu-toggle');
      openMenu(businessHeader, key);
    });

    window.addEventListener('resize', function () {
      syncSiteChromeHeight();
      all(document, '[data-carousel]').forEach(syncCarouselNav);
      var header = document.querySelector('[data-header]');
      if (header && window.innerWidth >= 1024) closeHeaderSearch(header);
      if (header && window.innerWidth >= 768) closeMobileDrawer(header);
      scheduleFloatingDocking();
    });

    window.addEventListener('scroll', scheduleFloatingDocking, { passive: true });
    scheduleFloatingDocking();
    initTransferFloatingCta();

    var variantParam = new URLSearchParams(window.location.search).get('variant');
    setNavVariant(variantParam === 'v2' ? 'v2' : 'v1');
  }

  window.PrototypeApp = {
    init: init,
    syncSiteChromeHeight: syncSiteChromeHeight,
    initTariffDetail: initTariffDetail,
    initCarousel: initCarousel
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
