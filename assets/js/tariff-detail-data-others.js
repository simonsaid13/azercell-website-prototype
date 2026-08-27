/* ==========================================================================
   Azercell HTML Prototype — tariff detail content (tariffs 2–6)
   Loaded after tariff-detail-data.js
   ========================================================================== */

(function (global) {
  'use strict';

  var cross = function (id, title) {
    return [
      { label: 'Compare ' + title + ' with other plans', href: '/compare/?billing=' + (id === 'alfa' ? 'postpaid' : 'prepaid'), variant: 'primary' },
      { label: 'All mobile tariffs', href: '/tariffs/mobile/' }
    ];
  };

  global.TariffDetailDataOthers = {
    'premium-plus': {
      id: 'premium-plus',
      hero: {
        eyebrow: 'Prepaid',
        title: 'Premium+',
        body: 'High-volume prepaid packs with roaming data, social media and WhatsApp bonuses included.'
      },
      activateHref: 'https://kabinetim.azercell.com/my/login',
      activateLabel: 'Activate in Kabinetim',
      compareId: 'premium-plus',
      note: 'Roaming data is included in the pack. All prices include VAT.',
      tiers: [
        {
          id: 'pp60',
          label: 'Premium+ 60GB',
          price: '60 AZN',
          validity: 'Valid 28 days.',
          internet: '60GB',
          calls: '3000 min countrywide',
          sms: '1500',
          social: '5GB',
          whatsapp: '5GB',
          roaming: '1GB',
          extras: '—',
          keyword: 'PP60',
          activation: 'Send "PP60" to 7575'
        },
        {
          id: 'pp90',
          label: 'Premium+ 100GB',
          price: '90 AZN',
          validity: 'Valid 28 days.',
          internet: '100GB',
          calls: '5000 min countrywide',
          sms: '2500',
          social: '10GB',
          whatsapp: '10GB',
          roaming: '3GB',
          extras: '—',
          keyword: 'PP100',
          activation: 'Send "PP100" to 7575'
        }
      ],
      activation: {
        shortCode: '7575',
        smsCost: '0.01 AZN per request',
        intro: 'Send the keyword for your pack to 7575 or activate in Kabinetim.',
        keywords: [
          { keyword: 'PP60', pack: 'Premium+ 60GB' },
          { keyword: 'PP100', pack: 'Premium+ 100GB' }
        ],
        bonusCheck: [
          'Send an empty SMS to 2112 (0.10 AZN per SMS)',
          'Dial *111*1*7#YES (0.10 AZN per USSD message)'
        ]
      },
      overageRates: {
        title: 'Rates after bonuses are used up',
        intro: 'If pack bonuses are exhausted while the pack is still valid:',
        items: [
          { label: 'Countrywide calls', value: '0.08 AZN per minute' },
          { label: 'Internet', value: '0.05 AZN per MB' },
          { label: 'SMS countrywide', value: '0.10 AZN' }
        ]
      },
      faq: [
        { question: 'Who can join Premium+?', answer: 'Any prepaid subscriber can activate a Premium+ pack.' },
        { question: 'How is roaming data used?', answer: 'Roaming data included in the pack is used when travelling in supported roaming destinations. Check roaming rates for countries not covered.' },
        { question: 'Can I use social and WhatsApp bonuses after main data runs out?', answer: 'Social and WhatsApp traffic uses its dedicated allowance first, then the main internet pack.' },
        { question: 'How to change pack?', answer: 'Switch via Kabinetim, SMS to 7575, or in an Azercell store — not on this website.' }
      ],
      legal: 'All prices VAT inclusive. For personal use only.',
      crossLinks: cross('premium-plus', 'Premium+')
    },

    'data-plus': {
      id: 'data-plus',
      hero: {
        eyebrow: 'Prepaid · Data-only',
        title: '"Data+" tariff',
        body: 'Data-only prepaid packs for internet, SMS and video calls. No standard voice calls.'
      },
      activateHref: 'https://kabinetim.azercell.com/my/login',
      activateLabel: 'Activate in Kabinetim',
      compareId: 'data-plus',
      note: 'Video calls supported. Overage: 0.05 AZN per MB and per SMS.',
      tiers: [
        { id: 'dp3', label: '"Data+" 3GB', price: '9 AZN', validity: 'Valid 28 days. Data-only — no voice calls.', internet: '3GB', calls: 'No voice calls', sms: 'Supported', smsLabel: 'SMS', extras: 'Video calls supported', activation: 'Activate in Kabinetim' },
        { id: 'dp6', label: '"Data+" 6GB', price: '12 AZN', validity: 'Valid 28 days.', internet: '6GB', calls: 'No voice calls', sms: 'Supported', smsLabel: 'SMS', extras: 'Video calls supported', activation: 'Activate in Kabinetim' },
        { id: 'dp12', label: '"Data+" 12GB', price: '19 AZN', validity: 'Valid 28 days.', internet: '12GB', calls: 'No voice calls', sms: 'Supported', smsLabel: 'SMS', extras: 'Video calls supported', activation: 'Activate in Kabinetim' },
        { id: 'dp30', label: '"Data+" 30GB', price: '29 AZN', validity: 'Valid 28 days.', internet: '30GB', calls: 'No voice calls', sms: 'Supported', smsLabel: 'SMS', extras: 'Video calls supported', activation: 'Activate in Kabinetim' },
        { id: 'dp60', label: '"Data+" 60GB', price: '39 AZN', validity: 'Valid 28 days.', internet: '60GB', calls: 'No voice calls', sms: 'Supported', smsLabel: 'SMS', extras: 'Video calls supported', activation: 'Activate in Kabinetim' }
      ],
      overageRates: {
        title: 'Overage rates',
        intro: 'After the pack allowance is used up:',
        items: [
          { label: 'Internet', value: '0.05 AZN per MB' },
          { label: 'SMS', value: '0.05 AZN' }
        ]
      },
      faq: [
        { question: 'Are voice calls included?', answer: 'No. Standard voice calls are not included. Video calls over data are supported.' },
        { question: 'How to activate?', answer: 'Activate the selected pack in Kabinetim. This website does not complete activation.' },
        { question: 'Can I send SMS?', answer: 'Yes. SMS is supported within the tariff. Overage SMS costs 0.05 AZN.' }
      ],
      legal: 'All prices VAT inclusive.',
      crossLinks: cross('data-plus', '"Data+"')
    },

    data: {
      id: 'data',
      hero: {
        eyebrow: 'Prepaid · Data-only',
        title: 'Data',
        body: 'Data-only prepaid packs for SimSim numbers. Internet, SMS and video calls — no standard voice calls.'
      },
      activateHref: 'https://kabinetim.azercell.com/my/login',
      activateLabel: 'Activate in Kabinetim',
      compareId: 'data',
      note: 'For SimSim numbers. Overage: 0.04 AZN per MB on prepaid.',
      tiers: [
        { id: 'dat3', label: 'Data 3GB', price: '9 AZN', validity: 'Valid 28 days. Data-only for SimSim numbers.', internet: '3GB', calls: 'No voice calls', sms: 'Video', smsLabel: 'Calls supported', extras: 'Video calls supported', activation: 'Activate in Kabinetim' },
        { id: 'dat6', label: 'Data 6GB', price: '12 AZN', validity: 'Valid 28 days.', internet: '6GB', calls: 'No voice calls', sms: 'Video', smsLabel: 'Calls supported', extras: 'Video calls supported', activation: 'Activate in Kabinetim' },
        { id: 'dat12', label: 'Data 12GB', price: '19 AZN', validity: 'Valid 28 days.', internet: '12GB', calls: 'No voice calls', sms: 'Video', smsLabel: 'Calls supported', extras: 'Video calls supported', activation: 'Activate in Kabinetim' },
        { id: 'dat30', label: 'Data 30GB', price: '29 AZN', validity: 'Valid 28 days.', internet: '30GB', calls: 'No voice calls', sms: 'Video', smsLabel: 'Calls supported', extras: 'Video calls supported', activation: 'Activate in Kabinetim' },
        { id: 'dat56', label: 'Data 56GB', price: '39 AZN', validity: 'Valid 28 days.', internet: '56GB', calls: 'No voice calls', sms: 'Video', smsLabel: 'Calls supported', extras: 'Video calls supported', activation: 'Activate in Kabinetim' }
      ],
      overageRates: {
        title: 'Overage rates',
        intro: 'After the pack allowance is used up:',
        items: [
          { label: 'Internet', value: '0.04 AZN per MB' },
          { label: 'SMS', value: '0.10 AZN' }
        ]
      },
      faq: [
        { question: 'Who is the Data tariff for?', answer: 'SimSim prepaid numbers. Standard voice calls are not included.' },
        { question: 'How to activate?', answer: 'Activate in Kabinetim. This website does not complete activation.' },
        { question: 'Are video calls supported?', answer: 'Yes. Video calls work over the data allowance.' }
      ],
      legal: 'All prices VAT inclusive.',
      crossLinks: cross('data', 'Data')
    },

    veteran: {
      id: 'veteran',
      hero: {
        eyebrow: 'Prepaid',
        title: 'Veteran',
        body: 'Exclusive discounted pay-as-you-go rates for certified war veterans. Enrolment in an Azercell store only.',
        badge: 'Eligibility'
      },
      activateHref: '/stores/',
      activateLabel: 'Find a store',
      compareId: 'veteran',
      note: 'Balance-linked validity from 5 to 120 days depending on top-up amount.',
      tiers: [
        {
          id: 'vet',
          label: 'Veteran tariff',
          price: 'No monthly fee',
          validity: 'Pay-as-you-go. Line validity depends on top-up amount (5–120 days).',
          internet: '0.03 AZN/MB',
          calls: '0.03 on-net / 0.04 off-net per min',
          callsLabel: 'Calls',
          sms: '0.03 AZN',
          extras: 'Certified war veterans only',
          activation: 'Enrolment in an Azercell store with required documents'
        }
      ],
      faq: [
        { question: 'Who can join?', answer: 'Certified war veterans only. Enrolment is in person at an Azercell store.' },
        { question: 'Is there a monthly fee?', answer: 'No subscription fee. You pay per use at the discounted rates shown.' },
        { question: 'How long does the line stay active?', answer: 'Validity is linked to your balance and top-up amount — from 5 to 120 days.' }
      ],
      legal: 'Eligibility documents required. Rates VAT inclusive where applicable.',
      crossLinks: cross('veteran', 'Veteran')
    },

    alfa: {
      id: 'alfa',
      hero: {
        eyebrow: 'Postpaid',
        title: 'Alfa Plan',
        body: 'Monthly postpaid plans on contract. Signing and plan changes happen in an Azercell store or via approved channels — not on this website.',
        badge: 'Contract'
      },
      activateHref: '/stores/',
      activateLabel: 'Find a store',
      compareId: 'alfa',
      discountNote: '10% off on a 12-month contract. 20% off on a 24-month contract.',
      note: 'Postpaid contract. Signing takes place in an Azercell store.',
      tiers: [
        { id: 'a12', label: 'Alfa Plan 12GB', price: '20 AZN', validity: 'Monthly billing cycle.', internet: '12GB', calls: '1200 min countrywide', sms: '—', extras: '—', keyword: 'A12', shortCode: '650', activation: 'Send "A12" to 650, or sign contract in store' },
        { id: 'a25', label: 'Alfa Plan 25GB', price: '30 AZN', validity: 'Monthly billing cycle.', internet: '25GB', calls: '2500 min countrywide', sms: '—', extras: '—', keyword: 'A25', shortCode: '650', activation: 'Send "A25" to 650, or sign contract in store' },
        { id: 'a40', label: 'Alfa Plan 40GB', price: '40 AZN', validity: 'Monthly billing cycle.', internet: '40GB', calls: '4000 min countrywide', sms: '—', extras: 'Priority call-centre requests', keyword: 'A40', shortCode: '650', activation: 'Send "A40" to 650, or sign contract in store' },
        { id: 'a60', label: 'Alfa Plan 60GB', price: '60 AZN', validity: 'Monthly billing cycle. Personal curator and callback service.', internet: '60GB', calls: '5000 min countrywide', sms: '—', social: '5GB', whatsapp: '5GB', roaming: '1GB', extras: 'Personal curator, callback service', keyword: 'A60', shortCode: '650', activation: 'Send "A60" to 650, or sign contract in store' },
        { id: 'a120', label: 'Alfa Plan 120GB', price: '90 AZN', validity: 'Monthly billing cycle. Free mobile customer service.', internet: '120GB', calls: '10000 min countrywide', sms: '—', social: '10GB', whatsapp: '10GB', roaming: '3GB', extras: 'Free mobile customer service', keyword: 'A120', shortCode: '650', activation: 'Send "A120" to 650, or sign contract in store' }
      ],
      activation: {
        shortCode: '650',
        intro: 'Send the plan keyword to 650 or sign a contract in an Azercell store. Contract discounts apply on 12- and 24-month terms.',
        keywords: [
          { keyword: 'A12', pack: 'Alfa Plan 12GB' },
          { keyword: 'A25', pack: 'Alfa Plan 25GB' },
          { keyword: 'A40', pack: 'Alfa Plan 40GB' },
          { keyword: 'A60', pack: 'Alfa Plan 60GB' },
          { keyword: 'A120', pack: 'Alfa Plan 120GB' }
        ]
      },
      faq: [
        { question: 'How do contract discounts work?', answer: '10% off on a 12-month contract. 20% off on a 24-month contract. Signing happens in store.' },
        { question: 'How to activate or change plan?', answer: 'Send the keyword to 650, use Kabinetim where supported, or visit an Azercell store. Not on this website.' },
        { question: 'What extras are on higher tiers?', answer: 'Alfa 40GB adds priority call-centre requests. Alfa 60GB adds roaming, WhatsApp, social data and a personal curator. Alfa 120GB adds expanded roaming and free mobile customer service.' }
      ],
      legal: 'All prices VAT inclusive. Postpaid billing applies.',
      crossLinks: cross('alfa', 'Alfa Plan')
    }
  };

  if (global.TariffDetailData && global.TariffDetailData.mergeOthers) {
    global.TariffDetailData.mergeOthers(global.TariffDetailDataOthers);
  }
})(window);
