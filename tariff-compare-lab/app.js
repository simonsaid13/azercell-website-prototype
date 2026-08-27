/* PAGE CONNECTIONS — shared Header/Footer: current nav-lab mount; tariff source pages: external hand-off; billing tab: local URL state; Header language control: comparison version. */
(function () {
  'use strict';

  var root = document.getElementById('tariff-compare-lab');
  var source = window.TARIFF_COMPARE_LAB_DATA;
  var MIN_COLUMNS = 2;
  var MAX_COLUMNS = 5;
  if (!root || !source) return;

  if ((new URLSearchParams(window.location.search).get('lang') || '').toUpperCase() === 'RU') {
    runRuVersion();
    return;
  }

  function esc(value) {
    return String(value == null ? '—' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function list(value) { return Array.isArray(value) ? value : []; }
  var tariffs = list(source.tariffs);
  function billingFromUrl() { return new URLSearchParams(window.location.search).get('billing') === 'postpaid' ? 'postpaid' : 'prepaid'; }
  function viewFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var language = (params.get('lang') || '').toUpperCase();
    if (language === 'AZ') return 'detailed';
    if (language === 'EN') return 'compact';
    return params.get('variant') === 'v2' ? 'detailed' : 'compact';
  }
  function catalog(billing) { return tariffs.filter(function (tariff) { return tariff.billing === billing; }); }
  function price(tariff) { return tariff.price && typeof tariff.price === 'object' ? (tariff.price.display || tariff.price.amount + ' ' + (tariff.price.currency || '₼')) : tariff.price; }
  function value(tariff, key) {
    if (key === 'price') return price(tariff);
    if (key.indexOf('.') !== -1) return key.split('.').reduce(function (item, part) { return item && item[part] != null ? item[part] : null; }, tariff);
    return tariff.features && tariff.features[key] != null ? tariff.features[key] : tariff[key];
  }

  var state = { billing: billingFromUrl(), view: viewFromUrl(), ids: [] };
  function defaultSelection(billing) { return catalog(billing).slice(0, window.innerWidth < 1024 ? 2 : 3).map(function (tariff) { return tariff.id; }); }
  state.ids = defaultSelection(state.billing);
  function byId(id) { return catalog(state.billing).find(function (tariff) { return tariff.id === id; }); }
  function selected() { return state.ids.map(byId).filter(Boolean); }
  function normalize() {
    var known = catalog(state.billing).map(function (tariff) { return tariff.id; });
    state.ids = state.ids.filter(function (id, index, ids) { return known.indexOf(id) !== -1 && ids.indexOf(id) === index; }).slice(0, MAX_COLUMNS);
    while (state.ids.length < Math.min(MIN_COLUMNS, known.length)) {
      var next = known.find(function (id) { return state.ids.indexOf(id) === -1; });
      if (!next) break;
      state.ids.push(next);
    }
  }
  function stateUrl(billing) {
    var params = new URLSearchParams(window.location.search);
    params.set('billing', billing);
    params.delete('view');
    return window.location.pathname + '?' + params.toString() + window.location.hash;
  }
  function billingUrl(billing) { return stateUrl(billing); }
  function options(currentId) {
    var groups = {};
    catalog(state.billing).forEach(function (tariff) { (groups[tariff.family || 'Tariffs'] || (groups[tariff.family || 'Tariffs'] = [])).push(tariff); });
    return Object.keys(groups).map(function (family) {
      return '<optgroup label="' + esc(family) + '">' + groups[family].map(function (tariff) {
        var disabled = tariff.id !== currentId && state.ids.indexOf(tariff.id) !== -1;
        return '<option value="' + esc(tariff.id) + '"' + (tariff.id === currentId ? ' selected' : '') + (disabled ? ' disabled' : '') + '>' + esc(tariff.name) + '</option>';
      }).join('') + '</optgroup>';
    }).join('');
  }
  function link(tariff, className) {
    return '<a class="' + className + '" href="' + esc(tariff.url) + '" target="_blank" rel="noreferrer" aria-label="View tariff: ' + esc(tariff.name) + '">View tariff <span aria-hidden="true">↗</span></a>';
  }
  function contract(tariff) {
    if (state.billing !== 'postpaid') return '';
    return '<div class="tcl-contract-strip"><div><strong>' + esc(value(tariff, 'contract.12Month')) + '</strong><span>12 months</span></div><div><strong>' + esc(value(tariff, 'contract.24Month')) + '</strong><span>24 months</span></div></div>';
  }
  function card(tariff, index) {
    return '<article class="tcl-compact-plan' + (tariff.popular ? ' tcl-featured' : '') + '">' +
      '<div class="tcl-column-toolbar"><label class="t-label" for="compact-tariff-' + index + '">Tariff ' + (index + 1) + '</label></div>' +
      '<div class="tcl-select-wrap"><select class="t-body" id="compact-tariff-' + index + '" data-column-select="' + index + '">' + options(tariff.id) + '</select></div>' +
      '<div class="tcl-plan-meta t-small"><span>' + esc(tariff.family) + '</span>' + (tariff.popular ? '<em class="t-label">Popular</em>' : '') + '</div>' +
      '<h2 class="t-h3">' + esc(tariff.name) + '</h2><p class="tcl-compact-price t-small"><strong class="t-h4">' + esc(price(tariff)) + '</strong><span> / ' + esc(String(tariff.validity).toLowerCase()) + '</span></p>' +
      '<div class="tcl-compact-highlights"><div><strong class="t-body">' + esc(value(tariff, 'internet')) + '</strong><span class="t-small">Internet</span></div><div><strong class="t-body">' + esc(value(tariff, 'calls')) + '</strong><span class="t-small">Calls</span></div></div>' +
      '<dl class="tcl-compact-list t-small"><div><dt>SMS</dt><dd>' + esc(value(tariff, 'sms')) + '</dd></div><div><dt>WhatsApp</dt><dd>' + esc(value(tariff, 'whatsapp')) + '</dd></div><div><dt>Social media</dt><dd>' + esc(value(tariff, 'social')) + '</dd></div><div><dt>Roaming</dt><dd>' + esc(value(tariff, 'roaming')) + '</dd></div></dl>' +
      contract(tariff) + '<p class="tcl-compact-activation t-small"><span>Activation</span><strong class="t-body">' + esc(tariff.activation) + '</strong></p>' + link(tariff, 'tcl-compact-cta t-body') +
    '</article>';
  }
  function compact(selectedTariffs) {
    return '<div class="tcl-scroll tcl-compact-scroll" tabindex="0" role="region" aria-label="Compact tariff comparison"><div class="tcl-compact-grid" style="--tcl-columns:' + selectedTariffs.length + '">' + selectedTariffs.map(card).join('') + '</div></div>';
  }
  function detailHeader(tariff, index) {
    return '<th scope="col" class="tcl-plan-head' + (tariff.popular ? ' tcl-featured' : '') + '">' +
      '<div class="tcl-column-toolbar"><label class="t-label" for="detail-tariff-' + index + '">Tariff ' + (index + 1) + '</label></div><div class="tcl-select-wrap"><select class="t-body" id="detail-tariff-' + index + '" data-column-select="' + index + '">' + options(tariff.id) + '</select></div>' +
      '<div class="tcl-plan-meta t-small"><span>' + esc(tariff.family) + '</span>' + (tariff.popular ? '<em class="t-label">Popular</em>' : '') + '</div><h2 class="t-h3">' + esc(tariff.name) + '</h2><p class="t-small"><strong class="t-h4">' + esc(price(tariff)) + '</strong><span> / ' + esc(String(tariff.validity).toLowerCase()) + '</span></p>' + link(tariff, 'tcl-plan-head__link t-body') +
    '</th>';
  }
  function featureBlock(block, selectedTariffs) {
    return '<tr class="tcl-feature-block">' + selectedTariffs.map(function (tariff) {
      return '<td><h3 class="t-h4">' + esc(block.title) + '</h3><div class="tcl-feature-lines">' + list(block.items).map(function (item) { return '<p><strong class="t-h4">' + esc(value(tariff, item.key)) + '</strong><span class="t-small">' + esc(item.label) + '</span></p>'; }).join('') + '</div></td>';
    }).join('') + '</tr>';
  }
  function detailed(selectedTariffs) {
    var blocks = list(source.featureBlocks).filter(function (block) { return !block.billing || block.billing === state.billing; });
    return '<div class="tcl-scroll tcl-table-scroll" tabindex="0" role="region" aria-label="Detailed tariff comparison"><table class="tcl-detail-table" style="--tcl-columns:' + selectedTariffs.length + '"><thead><tr>' + selectedTariffs.map(detailHeader).join('') + '</tr></thead><tbody>' + blocks.map(function (block) { return featureBlock(block, selectedTariffs); }).join('') + '</tbody></table></div>';
  }
  function controls() {
    var canRemove = state.ids.length > MIN_COLUMNS;
    var canAdd = state.ids.length < MAX_COLUMNS && catalog(state.billing).some(function (tariff) { return state.ids.indexOf(tariff.id) === -1; });
    return '<div class="tcl-control-bar" aria-label="Tariff comparison controls"><nav class="tcl-segmented" aria-label="Billing type">' + ['prepaid', 'postpaid'].map(function (billing) {
      return '<a data-billing="' + billing + '" href="' + billingUrl(billing) + '"' + (state.billing === billing ? ' aria-current="page"' : '') + '>' + (billing === 'prepaid' ? 'Prepaid' : 'Postpaid') + '</a>';
    }).join('') + '</nav><div class="tcl-selection-stepper" aria-label="Number of tariffs selected"><button class="t-body" type="button" data-remove-last' + (canRemove ? '' : ' disabled') + ' aria-label="Remove the last tariff">− <span>Remove</span></button><strong class="t-body">' + state.ids.length + ' selected</strong><button class="t-body" type="button" data-add-next' + (canAdd ? '' : ' disabled') + ' aria-label="Add another tariff">+ <span>Add</span></button></div></div>';
  }
  function legacyScrollSelector() { return state.view === 'compact' ? '.tcl-compact-scroll' : '.tcl-table-scroll'; }
  function readScrollLeft(selector) {
    var scroll = root.querySelector(selector);
    return scroll ? scroll.scrollLeft : 0;
  }
  function restoreScrollLeft(selector, scrollLeft, callback) {
    window.requestAnimationFrame(function () {
      var scroll = root.querySelector(selector);
      if (scroll) scroll.scrollLeft = Math.max(0, Math.min(scrollLeft, scroll.scrollWidth - scroll.clientWidth));
      if (callback) callback();
    });
  }
  function render(preserveScroll) {
    var selector = legacyScrollSelector();
    var previousScrollLeft = preserveScroll ? readScrollLeft(selector) : 0;
    normalize();
    var selectedTariffs = selected();
    root.innerHTML = '<section class="tcl-hero" id="top"><div class="wrap"><h1 class="t-display">Compare tariffs</h1><p class="t-lead t-muted">Choose the tariffs you want to compare and find the option that fits you best.</p></div></section><section class="tcl-compare-shell" id="compare" aria-label="Tariff comparison">' + controls() + (state.view === 'compact' ? compact(selectedTariffs) : detailed(selectedTariffs)) + '<p class="tcl-footnote t-small"><strong>Note:</strong> renewal periods differ between plans. Compare each price together with the validity shown directly below it. Prices include VAT.</p><p class="tcl-sr-only" role="status" aria-live="polite">' + state.ids.length + ' tariffs selected.</p></section>';
    restoreScrollLeft(selector, previousScrollLeft);
    var footer = document.querySelector('#footer-probe footer');
    if (footer) footer.setAttribute('aria-label', 'Footer');
  }
  function setBilling(billing, push) {
    if (billing !== 'prepaid' && billing !== 'postpaid') return;
    state.billing = billing;
    state.ids = defaultSelection(billing);
    if (push) window.history.pushState({ billing: billing, view: state.view }, '', billingUrl(billing));
    render(false);
    root.focus();
  }
  root.addEventListener('click', function (event) {
    var billing = event.target.closest('[data-billing]');
    if (billing) { event.preventDefault(); setBilling(billing.getAttribute('data-billing'), true); return; }
    if (event.target.closest('[data-add-next]')) { var next = catalog(state.billing).find(function (tariff) { return state.ids.indexOf(tariff.id) === -1; }); if (next && state.ids.length < MAX_COLUMNS) state.ids.push(next.id); render(true); return; }
    if (event.target.closest('[data-remove-last]') && state.ids.length > MIN_COLUMNS) { state.ids.pop(); render(true); }
  });
  root.addEventListener('change', function (event) {
    var select = event.target.closest('[data-column-select]');
    if (!select) return;
    var index = Number(select.getAttribute('data-column-select'));
    var nextId = select.value;
    if (!byId(nextId) || (state.ids.indexOf(nextId) !== -1 && state.ids[index] !== nextId)) return;
    state.ids[index] = nextId;
    render(true);
    var replacement = root.querySelector('[data-column-select="' + index + '"]');
    if (replacement) replacement.focus();
  });
  window.addEventListener('popstate', function () {
    state.view = viewFromUrl();
    setBilling(billingFromUrl(), false);
  });
  var navigationMount = document.getElementById('navigation-probe');
  if (navigationMount) {
    navigationMount.addEventListener('click', function (event) {
      var option = event.target.closest('[data-language-option]');
      if (!option) return;
      var language = option.getAttribute('data-language-option');
      if (language === 'RU') { window.location.reload(); return; }
      if (language === 'EN') state.view = 'compact';
      if (language === 'AZ') state.view = 'detailed';
      window.history.replaceState({ billing: state.billing, view: state.view }, '', stateUrl(state.billing));
      render(false);
    });
  }
  window.history.replaceState({ billing: state.billing, view: state.view }, '', stateUrl(state.billing));
  render(false);

  function runRuVersion() {
    var ruTariffs = list(source.ruTariffs);
    var familyOrder = {
      prepaid: ['DigiMax', 'Premium+', 'Data+', 'Veteran', 'Əsgərcell'],
      postpaid: ['Alfa Plan']
    };
    var recommended = {
      'DigiMax': 'digimax-10',
      'Premium+': 'premium-60',
      'Data+': 'data-plus-12',
      'Veteran': 'veteran',
      'Əsgərcell': 'esgercell',
      'Alfa Plan': 'alfa-60'
    };
    var RU_MIN_COLUMNS = 2;
    var RU_MAX_COLUMNS = 5;
    var ruState = { ids: ['digimax-10', 'premium-60'] };
    var ruFeatureBlocks = [
      { title: 'Plan details', items: [{ key: 'validity', label: 'Validity' }] },
      { title: 'Internet', items: [{ key: 'internet', label: 'Included data' }, { key: 'whatsapp', label: 'WhatsApp data' }, { key: 'social', label: 'Social media data' }] },
      { title: 'Calls and messages', items: [{ key: 'calls', label: 'Countrywide calls' }, { key: 'sms', label: 'Countrywide SMS' }] },
      { title: 'Roaming', items: [{ key: 'roaming', label: 'Roaming data' }] },
      { title: 'Contract options', items: [{ key: 'contract.12Month', label: '12-month contract' }, { key: 'contract.24Month', label: '24-month contract' }] },
      { title: 'Activation', items: [{ key: 'activation', label: 'Activation code' }] }
    ];

    function ruById(id) { return ruTariffs.find(function (tariff) { return tariff.id === id; }); }
    function ruSelected() { return ruState.ids.map(ruById).filter(Boolean); }
    function ruFamilyTariffs(family) { return ruTariffs.filter(function (tariff) { return tariff.family === family; }); }
    function ruDefaultId(family) { return recommended[family] || (ruFamilyTariffs(family)[0] || {}).id; }
    function ruValue(tariff, key) {
      if (key === 'validity') return tariff.validity;
      if (key.indexOf('.') !== -1) return key.split('.').reduce(function (item, part) { return item && item[part] != null ? item[part] : null; }, tariff) || '—';
      return tariff.features && tariff.features[key] != null ? tariff.features[key] : (tariff[key] != null ? tariff[key] : '—');
    }
    function ruPrice(tariff) { return tariff.price && tariff.price.display ? tariff.price.display : '—'; }
    function ruLink(tariff, className) {
      return '<a class="' + className + '" href="' + esc(tariff.url) + '" target="_blank" rel="noreferrer" aria-label="View tariff: ' + esc(tariff.name) + '">View tariff <span aria-hidden="true">↗</span></a>';
    }
    function familySelect(tariff, index) {
      return '<label class="tcl-sr-only" for="ru-family-' + index + '">Tariff family for tariff ' + (index + 1) + '</label>' +
        '<div class="tcl-select-wrap"><select class="t-body" id="ru-family-' + index + '" data-ru-family-select="' + index + '">' +
          ['prepaid', 'postpaid'].map(function (billing) {
            return '<optgroup label="' + (billing === 'prepaid' ? 'Prepaid' : 'Postpaid') + '">' + familyOrder[billing].map(function (family) {
              return '<option value="' + esc(family) + '"' + (tariff.family === family ? ' selected' : '') + '>' + esc(family) + '</option>';
            }).join('') + '</optgroup>';
          }).join('') +
        '</select></div>';
    }
    function variantSelect(tariff, index) {
      var variants = ruFamilyTariffs(tariff.family);
      if (variants.length < 2) return '';
      return '<label class="tcl-sr-only" for="ru-variant-' + index + '">Variant for ' + esc(tariff.family) + '</label>' +
        '<div class="tcl-select-wrap tcl-ru-variant-select"><select class="t-small" id="ru-variant-' + index + '" data-ru-variant-select="' + index + '">' +
          variants.map(function (variant) {
            var label = variant.name.replace(tariff.family, '').trim() || variant.name;
            return '<option value="' + esc(variant.id) + '"' + (variant.id === tariff.id ? ' selected' : '') + '>' + esc(label) + '</option>';
          }).join('') +
        '</select></div>';
    }
    function ruSummary(tariff, index, isRail) {
      var canRemove = ruState.ids.length > RU_MIN_COLUMNS;
      var billingLabel = tariff.billing === 'postpaid' ? 'Postpaid' : 'Prepaid';
      return '<div class="tcl-ru-summary' + (isRail ? ' tcl-ru-summary--rail' : '') + '">' +
        '<button type="button" class="tcl-ru-remove" data-ru-remove="' + index + '" aria-label="Remove ' + esc(tariff.name) + '"' + (canRemove ? '' : ' disabled aria-disabled="true"') + '>×</button>' +
        (isRail ? '' : familySelect(tariff, index) + variantSelect(tariff, index)) +
        '<div class="tcl-ru-summary__main">' +
          '<div class="tcl-plan-meta t-small"><span>' + billingLabel + '</span></div>' +
          (isRail ? '<h2 class="t-h3">' + esc(tariff.name) + '</h2>' : '') +
          '<p class="tcl-compact-price t-small"><strong class="t-h4">' + esc(ruPrice(tariff)) + '</strong><span> / ' + esc(String(tariff.validity).toLowerCase()) + '</span></p>' +
          ruLink(tariff, 'tcl-plan-head__link t-body') +
        '</div>' +
      '</div>';
    }
    function ruFeatures(tariff) {
      return '<div class="tcl-ru-features">' + ruFeatureBlocks.map(function (block) {
        return '<section class="tcl-ru-feature-block"><h3 class="t-h4">' + esc(block.title) + '</h3><div class="tcl-feature-lines">' + block.items.map(function (item) {
          return '<p><strong class="t-h4">' + esc(ruValue(tariff, item.key)) + '</strong><span class="t-small">' + esc(item.label) + '</span></p>';
        }).join('') + '</div></section>';
      }).join('') + '</div>';
    }
    function ruColumn(tariff, index) {
      return '<article class="tcl-ru-column">' + ruSummary(tariff, index, false) + ruFeatures(tariff) + '</article>';
    }
    function ruEmpty() {
      return '<div class="tcl-ru-empty"><p class="t-body">Add a tariff to start comparing.</p></div>';
    }
    function renderRu(preserveScroll) {
      var previousScrollLeft = preserveScroll ? readScrollLeft('[data-ru-scroll]') : 0;
      var selectedTariffs = ruSelected();
      root.innerHTML = '<section class="tcl-hero" id="top"><div class="wrap"><h1 class="t-display">Compare tariffs</h1><p class="t-lead t-muted">Choose the tariffs you want to compare and find the option that fits you best.</p></div></section>' +
        '<section class="tcl-compare-shell tcl-ru-shell" id="compare" aria-label="Tariff comparison">' +
          '<div class="tcl-ru-actions"><button class="tcl-ru-add t-body" type="button" data-ru-add aria-label="Add another tariff"' + (selectedTariffs.length < RU_MAX_COLUMNS ? '' : ' disabled') + '><span aria-hidden="true">+</span><span>Add tariff</span></button></div>' +
          '<div class="tcl-ru-scroll" data-ru-scroll tabindex="0" role="region" aria-label="Tariff comparison">' +
            (selectedTariffs.length ? '<div class="tcl-ru-grid" style="--tcl-ru-columns:' + selectedTariffs.length + '">' + selectedTariffs.map(ruColumn).join('') + '</div>' : ruEmpty()) +
          '</div>' +
          '<div class="tcl-ru-sticky-rail" data-ru-sticky-rail hidden><div class="tcl-ru-sticky-grid" data-ru-sticky-grid style="--tcl-ru-columns:' + selectedTariffs.length + '">' + selectedTariffs.map(function (tariff, index) { return ruSummary(tariff, index, true); }).join('') + '</div></div>' +
          '<p class="tcl-footnote t-small"><strong>Note:</strong> renewal periods differ between plans. Compare each price together with the validity shown directly below it. Prices include VAT.</p>' +
          '<p class="tcl-sr-only" role="status" aria-live="polite">' + selectedTariffs.length + ' tariffs selected.</p>' +
        '</section>';
      var footer = document.querySelector('#footer-probe footer');
      if (footer) footer.setAttribute('aria-label', 'Footer');
      restoreScrollLeft('[data-ru-scroll]', previousScrollLeft, syncRuSticky);
    }
    function ruReplace(index, id) {
      if (!ruById(id) || index < 0 || index >= ruState.ids.length) return;
      ruState.ids[index] = id;
      renderRu(true);
    }
    function syncRuSticky() {
      var scroll = root.querySelector('[data-ru-scroll]');
      var shell = root.querySelector('.tcl-ru-shell');
      var rail = root.querySelector('[data-ru-sticky-rail]');
      var railGrid = root.querySelector('[data-ru-sticky-grid]');
      var firstSummary = root.querySelector('.tcl-ru-column .tcl-ru-summary');
      var header = document.querySelector('[data-header]');
      if (!scroll || !shell || !rail || !railGrid || !firstSummary || !header) return;
      var headerBottom = header.getBoundingClientRect().bottom;
      var shellRect = shell.getBoundingClientRect();
      var scrollRect = scroll.getBoundingClientRect();
      var railHeight = rail.offsetHeight || firstSummary.getBoundingClientRect().height;
      var shouldShowRail = firstSummary.getBoundingClientRect().top <= headerBottom && shellRect.bottom > headerBottom + railHeight + 16;
      rail.hidden = !shouldShowRail;
      if (shouldShowRail) {
        var gridRect = scroll.firstElementChild.getBoundingClientRect();
        rail.style.top = Math.max(0, headerBottom) + 'px';
        rail.style.left = scrollRect.left + 'px';
        rail.style.width = scroll.clientWidth + 'px';
        railGrid.style.transform = 'translateX(' + (gridRect.left - scrollRect.left) + 'px)';
      }
    }
    root.addEventListener('click', function (event) {
      var remove = event.target.closest('[data-ru-remove]');
      if (remove) {
        var removeIndex = Number(remove.getAttribute('data-ru-remove'));
        if (removeIndex >= 0 && ruState.ids.length > RU_MIN_COLUMNS) { ruState.ids.splice(removeIndex, 1); renderRu(true); }
        return;
      }
      if (event.target.closest('[data-ru-add]') && ruState.ids.length < RU_MAX_COLUMNS) { ruState.ids.push('digimax-10'); renderRu(true); }
    });
    root.addEventListener('change', function (event) {
      var family = event.target.closest('[data-ru-family-select]');
      if (family) { ruReplace(Number(family.getAttribute('data-ru-family-select')), ruDefaultId(family.value)); return; }
      var variant = event.target.closest('[data-ru-variant-select]');
      if (variant) ruReplace(Number(variant.getAttribute('data-ru-variant-select')), variant.value);
    });
    root.addEventListener('scroll', syncRuSticky, true);
    window.addEventListener('scroll', syncRuSticky, { passive: true });
    window.addEventListener('resize', syncRuSticky);
    var navigationMount = document.getElementById('navigation-probe');
    if (navigationMount) {
      navigationMount.addEventListener('click', function (event) {
        var option = event.target.closest('[data-language-option]');
        if (option && option.getAttribute('data-language-option') !== 'RU') window.location.reload();
      });
    }
    renderRu(false);
  }
}());
