/* ==========================================================================
   Azercell HTML Prototype — tariff detail page renderer
   ========================================================================== */

(function (global) {
  'use strict';

  function section(inner, modifier) {
    return '<section class="section' + (modifier ? ' ' + modifier : '') + '"><div class="wrap">' + inner + '</div></section>';
  }

  function specValue(value) {
    return String(value || '').replace(/\s*countrywide/i, '');
  }

  function bonusSpecs(tier) {
    var specs = [];
    if (tier.social) specs.push({ value: tier.social, label: 'Social media' });
    if (tier.whatsapp) specs.push({ value: tier.whatsapp, label: 'WhatsApp' });
    if (tier.roaming) specs.push({ value: tier.roaming, label: 'Roaming data' });
    return specs;
  }

  function tierSpecs(tier) {
    var calls = tier.calls;
    var sms = tier.sms;
    if (calls === 'No voice calls') calls = '—';
    return [
      { value: tier.internet, label: 'Internet' },
      { value: specValue(calls), label: tier.callsLabel || 'Calls' },
      { value: sms, label: tier.smsLabel || 'SMS' }
    ].concat(bonusSpecs(tier));
  }

  function packValidity(tier) {
    var text = tier.validity || '';
    if (tier.extras && tier.extras !== '—' && text.indexOf(tier.extras) === -1) {
      text = text + (text ? ' ' : '') + tier.extras + '.';
    }
    return text;
  }

  function activationNote(tier) {
    if (tier.keyword && tier.shortCode) {
      return 'Send "' + tier.keyword + '" to ' + tier.shortCode + '.';
    }
    if (tier.keyword) return 'Send "' + tier.keyword + '" to 7575.';
    if (tier.activation) return tier.activation;
    return '';
  }

  function hasActivationBlock(tariff) {
    var data = tariff.activation || {};
    return !!(
      data.intro ||
      (data.keywords && data.keywords.length) ||
      (data.ussdCodes && data.ussdCodes.length) ||
      (data.bonusCheck && data.bonusCheck.length)
    );
  }

  function packCardProps(tariff, tier, tierIndex, href) {
    var R = global.SiteRegistry;
    var compareHref = tariff.compareId && R && R.tariffCompareHref
      ? R.tariffCompareHref(tariff.compareId, tierIndex)
      : href('/tariffs/compare/?add=' + (tariff.compareId || tariff.id));
    return {
      tierId: tier.id,
      name: tier.label,
      type: tariff.hero ? tariff.hero.eyebrow : '',
      price: tier.price,
      validity: packValidity(tier),
      specs: tierSpecs(tier),
      note: activationNote(tier),
      ussd: tier.ussd ? 'Dial ' + tier.ussd : '',
      compareHref: compareHref,
      actions: [
        {
          label: tariff.activateLabel || 'Activate in Kabinetim',
          href: tariff.activateHref && /^https?:/.test(tariff.activateHref) ? tariff.activateHref : href(tariff.activateHref || '/stores/'),
          variant: 'primary'
        }
      ]
    };
  }

  function activationFaqItem(tariff) {
    var data = tariff.activation || {};
    var lines = [];
    (data.keywords || []).forEach(function (row) {
      lines.push(row.keyword + ' — ' + row.pack);
    });
    (data.ussdCodes || []).forEach(function (row) {
      lines.push(row.code + ' — ' + row.pack);
    });
    (data.bonusCheck || []).forEach(function (line) {
      lines.push(line);
    });
    var paragraphs = [];
    if (data.intro) paragraphs.push(data.intro);
    if (data.shortCode) {
      paragraphs.push('Short number ' + data.shortCode + (data.smsCost ? ' (' + data.smsCost + ')' : '') + '.');
    }
    return {
      question: 'All activation codes and bonus checks',
      paragraphs: paragraphs,
      list: lines
    };
  }

  function mountMain(tariff) {
    var C = global.Components;
    var R = global.SiteRegistry;
    var href = R ? R.href : function (path) { return path; };
    var hero = tariff.hero || {};
    var tiers = tariff.tiers || [];
    var faqItems = (tariff.faq || []).slice();
    if (hasActivationBlock(tariff)) {
      faqItems.unshift(activationFaqItem(tariff));
    }

    var legalParts = [tariff.legal || 'All prices include VAT.'];
    if (tariff.discountNote) legalParts.push(tariff.discountNote);
    if (tariff.note) legalParts.push(tariff.note);

    var packCards = tiers.map(function (tier, i) {
      return C.render('tariffPackCard', packCardProps(tariff, tier, i, href));
    }).join('');

    var crossLinks = (tariff.crossLinks || []).map(function (link) {
      return {
        label: link.label,
        href: href(link.href.indexOf('/tariffs/compare/') === 0 && tariff.compareId && R && R.tariffCompareHref
          ? R.tariffCompareHref(tariff.compareId, 0)
          : link.href),
        variant: link.variant
      };
    });

    var blocks = [
      section(
        C.render('sectionHead', {
          eyebrow: hero.eyebrow,
          title: hero.title,
          body: hero.body,
          action: { label: 'All mobile tariffs', href: href('/tariffs/mobile/') }
        })
      ),

      section(
        '<div data-tariff-detail data-tariff-id="' + tariff.id + '">' +
          C.render('carousel', {
            label: 'All ' + (hero.title || 'packs'),
            variant: 'packs',
            content: packCards
          }) +
          '<p class="t-small t-muted" style="margin-top: var(--sp-4)">' + escLegal(legalParts.join(' ')) + '</p>' +
        '</div>'
      ),

      tariff.internetPacks && tariff.internetPacks.length
        ? section(C.render('tariffAddonGrid', {
            title: 'Need more internet?',
            body: 'Monthly add-on packs stack on your current tariff.',
            items: tariff.internetPacks
          }), 'section--tight')
        : '',

      tariff.overageRates && tariff.overageRates.items && tariff.overageRates.items.length
        ? section(C.render('tariffOverageNote', { overageRates: tariff.overageRates }), 'section--tight')
        : '',

      (tariff.faq && tariff.faq.length) || hasActivationBlock(tariff)
        ? section(C.render('tariffFaq', {
            title: 'Questions and answers',
            items: faqItems
          }))
        : '',

      section(C.render('tariffDetailCrossLinks', {
        links: crossLinks,
        legal: null
      }), 'section--tight')
    ];

    C.mount('#page-main', blocks.filter(Boolean));
  }

  function escLegal(text) {
    return text || 'All prices include VAT.';
  }

  function mount(tariffId) {
    if (global.TariffDetailData && global.TariffDetailData.mergeOthers && global.TariffDetailDataOthers) {
      global.TariffDetailData.mergeOthers(global.TariffDetailDataOthers);
    }
    var tariff = global.TariffDetailData && global.TariffDetailData.byId(tariffId);
    if (!tariff || !global.Components) return;
    mountMain(tariff);
    if (global.PrototypeApp && global.PrototypeApp.initTariffDetail) {
      global.PrototypeApp.initTariffDetail();
    }
  }

  global.TariffPage = { mount: mount };
})(window);
