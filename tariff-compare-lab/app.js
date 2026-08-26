/* PAGE CONNECTIONS — shared Header/Footer: current nav-lab mount; tariff source pages: external hand-off; billing tab: local URL state; Header language control: comparison version. */
(function () {
  'use strict';

  var root = document.getElementById('tariff-compare-lab');
  var source = window.TARIFF_COMPARE_LAB_DATA;
  var MIN_COLUMNS = 2;
  var MAX_COLUMNS = 5;
  if (!root || !source) return;

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
  function defaultSelection(billing) { return catalog(billing).slice(0, 3).map(function (tariff) { return tariff.id; }); }
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
  function render() {
    normalize();
    var selectedTariffs = selected();
    root.innerHTML = '<section class="tcl-hero" id="top"><div class="wrap"><h1 class="t-display">Compare tariffs</h1><p class="t-lead t-muted">Choose the tariffs you want to compare and find the option that fits you best.</p></div></section><section class="tcl-compare-shell" id="compare" aria-label="Tariff comparison">' + controls() + (state.view === 'compact' ? compact(selectedTariffs) : detailed(selectedTariffs)) + '<p class="tcl-footnote t-small"><strong>Note:</strong> renewal periods differ between plans. Compare each price together with the validity shown directly below it. Prices include VAT.</p><p class="tcl-sr-only" role="status" aria-live="polite">' + state.ids.length + ' tariffs selected.</p></section>';
    var footer = document.querySelector('#footer-probe footer');
    if (footer) footer.setAttribute('aria-label', 'Footer');
  }
  function setBilling(billing, push) {
    if (billing !== 'prepaid' && billing !== 'postpaid') return;
    state.billing = billing;
    state.ids = defaultSelection(billing);
    if (push) window.history.pushState({ billing: billing, view: state.view }, '', billingUrl(billing));
    render();
    root.focus();
  }
  root.addEventListener('click', function (event) {
    var billing = event.target.closest('[data-billing]');
    if (billing) { event.preventDefault(); setBilling(billing.getAttribute('data-billing'), true); return; }
    if (event.target.closest('[data-add-next]')) { var next = catalog(state.billing).find(function (tariff) { return state.ids.indexOf(tariff.id) === -1; }); if (next && state.ids.length < MAX_COLUMNS) state.ids.push(next.id); render(); return; }
    if (event.target.closest('[data-remove-last]') && state.ids.length > MIN_COLUMNS) { state.ids.pop(); render(); }
  });
  root.addEventListener('change', function (event) {
    var select = event.target.closest('[data-column-select]');
    if (!select) return;
    var index = Number(select.getAttribute('data-column-select'));
    var nextId = select.value;
    if (!byId(nextId) || (state.ids.indexOf(nextId) !== -1 && state.ids[index] !== nextId)) return;
    state.ids[index] = nextId;
    render();
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
      if (language === 'EN') state.view = 'compact';
      if (language === 'AZ') state.view = 'detailed';
      window.history.replaceState({ billing: state.billing, view: state.view }, '', stateUrl(state.billing));
      render();
    });
  }
  window.history.replaceState({ billing: state.billing, view: state.view }, '', stateUrl(state.billing));
  render();
}());
