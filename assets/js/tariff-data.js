/* ==========================================================================
   Azercell HTML Prototype — mobile tariff data for compare tool
   Source: Azercell_Database_B2C.md + /tariffs/mobile/
   ========================================================================== */

(function (global) {
  'use strict';

  var MOBILE_TARIFFS = [
    {
      id: 'digimax',
      name: 'DigiMax',
      type: 'Prepaid',
      badge: 'Popular',
      note: 'All prices include VAT. Usage is for personal use only.',
      detailHref: '/tariffs/mobile/prepaid/digimax/',
      activateHref: 'https://kabinetim.azercell.com/my/login',
      activateLabel: 'Activate in Kabinetim',
      tiers: [
        {
          price: '1 AZN',
          validity: 'Valid 1 day',
          internet: '300MB',
          calls: '30 min countrywide',
          sms: '15',
          extras: '—',
          activation: 'Send "D1" to 7575'
        },
        {
          price: '4 AZN',
          validity: 'Valid 7 days',
          internet: '1GB',
          calls: '100 min countrywide',
          sms: '50',
          extras: '—',
          activation: 'Send "D7" to 7575'
        },
        {
          price: '8 AZN',
          validity: 'Valid 14 days',
          internet: '3GB',
          calls: '200 min countrywide',
          sms: '100',
          extras: '—',
          activation: 'Send "D3" to 7575'
        },
        {
          price: '12 AZN',
          validity: 'Valid 28 days',
          internet: '5GB',
          calls: '300 min countrywide',
          sms: '150',
          social: '1GB',
          extras: '—',
          activation: 'Send "D5" to 7575'
        },
        {
          price: '18 AZN',
          validity: 'Valid 28 days',
          internet: '10GB',
          calls: '600 min countrywide',
          sms: '300',
          social: '1GB',
          whatsapp: '1GB',
          extras: '—',
          activation: 'Send "D10" to 7575'
        },
        {
          price: '30 AZN',
          validity: 'Valid 28 days',
          internet: '25GB',
          calls: '1500 min countrywide',
          sms: '500',
          social: '3GB',
          whatsapp: '3GB',
          extras: '—',
          activation: 'Send "D25" to 7575'
        }
      ]
    },
    {
      id: 'premium-plus',
      name: 'Premium+',
      type: 'Prepaid',
      note: 'Roaming data is included in the pack. All prices include VAT.',
      detailHref: '/tariffs/mobile/prepaid/premium-plus/',
      activateHref: 'https://kabinetim.azercell.com/my/login',
      activateLabel: 'Activate in Kabinetim',
      tiers: [
        {
          price: '60 AZN',
          validity: 'Valid 28 days',
          internet: '60GB',
          calls: '3000 min countrywide',
          sms: '1500',
          social: '5GB',
          whatsapp: '5GB',
          roaming: '1GB',
          extras: '—',
          activation: 'Send "PP60" to 7575'
        },
        {
          price: '90 AZN',
          validity: 'Valid 28 days',
          internet: '100GB',
          calls: '5000 min countrywide',
          sms: '2500',
          social: '10GB',
          whatsapp: '10GB',
          roaming: '3GB',
          extras: '—',
          activation: 'Send "PP100" to 7575'
        }
      ]
    },
    {
      id: 'data-plus',
      name: '"Data+" tariff',
      type: 'Prepaid · Data-only',
      note: 'No standard voice calls. Video calls and SMS supported. Overage: 0.05 AZN per MB and per SMS.',
      detailHref: '/tariffs/mobile/prepaid/data-plus/',
      activateHref: 'https://kabinetim.azercell.com/my/login',
      activateLabel: 'Activate in Kabinetim',
      tiers: [
        {
          price: '9 AZN',
          validity: 'Valid 28 days',
          internet: '3GB',
          calls: 'No voice calls',
          sms: 'Supported',
          extras: 'Video calls supported',
          activation: 'Activate in Kabinetim'
        },
        {
          price: '12 AZN',
          validity: 'Valid 28 days',
          internet: '6GB',
          calls: 'No voice calls',
          sms: 'Supported',
          extras: 'Video calls supported',
          activation: 'Activate in Kabinetim'
        },
        {
          price: '19 AZN',
          validity: 'Valid 28 days',
          internet: '12GB',
          calls: 'No voice calls',
          sms: 'Supported',
          extras: 'Video calls supported',
          activation: 'Activate in Kabinetim'
        },
        {
          price: '29 AZN',
          validity: 'Valid 28 days',
          internet: '30GB',
          calls: 'No voice calls',
          sms: 'Supported',
          extras: 'Video calls supported',
          activation: 'Activate in Kabinetim'
        },
        {
          price: '39 AZN',
          validity: 'Valid 28 days',
          internet: '60GB',
          calls: 'No voice calls',
          sms: 'Supported',
          extras: 'Video calls supported',
          activation: 'Activate in Kabinetim'
        }
      ]
    },
    {
      id: 'data',
      name: 'Data',
      type: 'Prepaid · Data-only',
      note: 'For SimSim numbers. No standard voice calls. Overage: 0.04 AZN per MB on prepaid. All prices include VAT.',
      detailHref: '/tariffs/mobile/prepaid/data/',
      activateHref: 'https://kabinetim.azercell.com/my/login',
      activateLabel: 'Activate in Kabinetim',
      tiers: [
        {
          price: '9 AZN',
          validity: 'Valid 28 days',
          internet: '3GB',
          calls: 'No voice calls',
          sms: 'Supported',
          extras: 'Video calls supported',
          activation: 'Activate in Kabinetim'
        },
        {
          price: '12 AZN',
          validity: 'Valid 28 days',
          internet: '6GB',
          calls: 'No voice calls',
          sms: 'Supported',
          extras: 'Video calls supported',
          activation: 'Activate in Kabinetim'
        },
        {
          price: '19 AZN',
          validity: 'Valid 28 days',
          internet: '12GB',
          calls: 'No voice calls',
          sms: 'Supported',
          extras: 'Video calls supported',
          activation: 'Activate in Kabinetim'
        },
        {
          price: '29 AZN',
          validity: 'Valid 28 days',
          internet: '30GB',
          calls: 'No voice calls',
          sms: 'Supported',
          extras: 'Video calls supported',
          activation: 'Activate in Kabinetim'
        },
        {
          price: '39 AZN',
          validity: 'Valid 28 days',
          internet: '56GB',
          calls: 'No voice calls',
          sms: 'Supported',
          extras: 'Video calls supported',
          activation: 'Activate in Kabinetim'
        }
      ]
    },
    {
      id: 'veteran',
      name: 'Veteran',
      type: 'Prepaid',
      badge: 'Eligibility',
      note: 'Balance-linked validity from 5 to 120 days depending on top-up amount. Enrolment in store only.',
      detailHref: '/tariffs/mobile/prepaid/veteran/',
      activateHref: '/stores/',
      activateLabel: 'Find a store',
      tiers: [
        {
          price: 'No monthly fee',
          validity: 'Pay-as-you-go rates',
          internet: '0.03 AZN per MB',
          calls: '0.03 AZN on-net / 0.04 AZN off-net per min',
          sms: '0.03 AZN',
          extras: 'For certified war veterans only',
          activation: 'Enrolment in an Azercell store'
        }
      ]
    },
    {
      id: 'alfa',
      name: 'Alfa Plan',
      type: 'Postpaid',
      badge: 'Contract',
      note: 'Postpaid contract. Signing takes place in an Azercell store.',
      discountNote: '10% off on a 12-month contract. 20% off on a 24-month contract.',
      detailHref: '/tariffs/mobile/postpaid/alfa/',
      activateHref: '/stores/',
      activateLabel: 'Find a store',
      tiers: [
        {
          price: '20 AZN',
          validity: 'Monthly billing',
          internet: '12GB',
          calls: '1200 min countrywide',
          sms: '—',
          extras: '—',
          activation: 'Send "A12" to 650, or sign contract in store'
        },
        {
          price: '30 AZN',
          validity: 'Monthly billing',
          internet: '25GB',
          calls: '2500 min countrywide',
          sms: '—',
          extras: '—',
          activation: 'Send "A25" to 650, or sign contract in store'
        },
        {
          price: '40 AZN',
          validity: 'Monthly billing',
          internet: '40GB',
          calls: '4000 min countrywide',
          sms: '—',
          extras: 'Priority call-centre requests',
          activation: 'Send "A40" to 650, or sign contract in store'
        },
        {
          price: '60 AZN',
          validity: 'Monthly billing',
          internet: '60GB',
          calls: '5000 min countrywide',
          sms: '—',
          social: '5GB',
          whatsapp: '5GB',
          roaming: '1GB',
          extras: 'Personal curator, callback service',
          activation: 'Send "A60" to 650, or sign contract in store'
        },
        {
          price: '90 AZN',
          validity: 'Monthly billing',
          internet: '120GB',
          calls: '10000 min countrywide',
          sms: '—',
          social: '10GB',
          whatsapp: '10GB',
          roaming: '3GB',
          extras: 'Free mobile customer service',
          activation: 'Send "A120" to 650, or sign contract in store'
        }
      ]
    }
  ];

  function byId(id) {
    for (var i = 0; i < MOBILE_TARIFFS.length; i += 1) {
      if (MOBILE_TARIFFS[i].id === id) return MOBILE_TARIFFS[i];
    }
    return null;
  }

  global.TariffData = {
    MOBILE_TARIFFS: MOBILE_TARIFFS,
    byId: byId
  };
})(window);
