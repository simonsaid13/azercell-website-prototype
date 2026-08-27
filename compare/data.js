(function (global) {
  'use strict';

  var prepaidUrl = 'https://www.azercell.com/en/personal/plans-and-services/mobile-tariffs/prepaid.html';
  var postpaidUrl = 'https://www.azercell.com/en/personal/plans-and-services/mobile-tariffs/postpaid.html';
  var digimaxUrl = 'https://www.azercell.com/en/personal/plans-and-services/mobile-tariffs/prepaid/digimax.html';

  // Working prototype content copied from the colleague-provided source.
  // It is intentionally replaceable data, not a claim of canonical CMS truth.
  var tariffs = [
    { id: 'digimax-daily', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax Daily', price: { amount: 1, currency: 'AZN', display: '1 ₼' }, cycle: { days: 1, display: '1 day' }, validity: '1 day', features: { internet: '300 MB', internetMb: 300, calls: '30 min', callsMin: 30, sms: '15 SMS', whatsapp: '—', social: '—', roaming: '—' }, activation: 'D1 → 7575', url: digimaxUrl, popular: false, status: 'active' },
    { id: 'digimax-weekly', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax Weekly', price: { amount: 4, currency: 'AZN', display: '4 ₼' }, cycle: { days: 7, display: '7 days' }, validity: '7 days', features: { internet: '1 GB', internetMb: 1024, calls: '100 min', callsMin: 100, sms: '50 SMS', whatsapp: '—', social: '—', roaming: '—' }, activation: 'D7 → 7575', url: digimaxUrl, popular: false, status: 'active' },
    { id: 'digimax-3', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax 3GB', price: { amount: 8, currency: 'AZN', display: '8 ₼' }, cycle: { days: 14, display: '14 days' }, validity: '14 days', features: { internet: '3 GB', internetMb: 3072, calls: '200 min', callsMin: 200, sms: '100 SMS', whatsapp: '—', social: '—', roaming: '—' }, activation: 'D3 → 7575', url: digimaxUrl, popular: false, status: 'active' },
    { id: 'digimax-5', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax 5GB', price: { amount: 12, currency: 'AZN', display: '12 ₼' }, cycle: { days: 28, display: '28 days' }, validity: '28 days', features: { internet: '5 GB', internetMb: 5120, calls: '300 min', callsMin: 300, sms: '150 SMS', whatsapp: '1 GB', social: '—', roaming: '—' }, activation: 'D5 → 7575', url: digimaxUrl, popular: false, status: 'active' },
    { id: 'digimax-10', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax 10GB', price: { amount: 18, currency: 'AZN', display: '18 ₼' }, cycle: { days: 28, display: '28 days' }, validity: '28 days', features: { internet: '10 GB', internetMb: 10240, calls: '600 min', callsMin: 600, sms: '300 SMS', whatsapp: '1 GB', social: '1 GB', roaming: '—' }, activation: 'D10 → 7575', url: digimaxUrl, popular: false, status: 'active' },
    { id: 'digimax-25', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax 25GB', price: { amount: 30, currency: 'AZN', display: '30 ₼' }, cycle: { days: 28, display: '28 days' }, validity: '28 days', features: { internet: '25 GB', internetMb: 25600, calls: '1,500 min', callsMin: 1500, sms: '500 SMS', whatsapp: '3 GB', social: '3 GB', roaming: '—' }, activation: 'D25 → 7575', url: digimaxUrl, popular: true, status: 'active' },
    { id: 'premium-60', billing: 'prepaid', family: 'Premium+', name: 'Premium+ 60GB', price: { amount: 60, currency: 'AZN', display: '60 ₼' }, cycle: { days: 28, display: '28 days' }, validity: '28 days', features: { internet: '60 GB', internetMb: 61440, calls: '3,000 min', callsMin: 3000, sms: '1,500 SMS', whatsapp: '5 GB', social: '5 GB', roaming: '1 GB' }, activation: 'PP60 → 7575', url: prepaidUrl, popular: false, status: 'active' },
    { id: 'premium-100', billing: 'prepaid', family: 'Premium+', name: 'Premium+ 100GB', price: { amount: 90, currency: 'AZN', display: '90 ₼' }, cycle: { days: 28, display: '28 days' }, validity: '28 days', features: { internet: '100 GB', internetMb: 102400, calls: '5,000 min', callsMin: 5000, sms: '2,500 SMS', whatsapp: '10 GB', social: '10 GB', roaming: '3 GB' }, activation: 'PP100 → 7575', url: prepaidUrl, popular: false, status: 'active' },
    { id: 'alfa-12', billing: 'postpaid', family: 'Alfa Plan', name: 'Alfa Plan 12GB', price: { amount: 20, currency: 'AZN', display: '20 ₼' }, cycle: { days: 30, type: 'monthly', display: 'Monthly' }, validity: 'Monthly', features: { internet: '12 GB', internetMb: 12288, calls: '1,200 min', callsMin: 1200, sms: '—', whatsapp: '—', social: '—', roaming: '—' }, activation: 'A12 → 650', contract: { '12Month': '10% off', '24Month': '20% off' }, url: postpaidUrl, popular: false, status: 'active' },
    { id: 'alfa-25', billing: 'postpaid', family: 'Alfa Plan', name: 'Alfa Plan 25GB', price: { amount: 30, currency: 'AZN', display: '30 ₼' }, cycle: { days: 30, type: 'monthly', display: 'Monthly' }, validity: 'Monthly', features: { internet: '25 GB', internetMb: 25600, calls: '2,500 min', callsMin: 2500, sms: '—', whatsapp: '—', social: '—', roaming: '—' }, activation: 'A25 → 650', contract: { '12Month': '10% off', '24Month': '20% off' }, url: postpaidUrl, popular: true, status: 'active' },
    { id: 'alfa-40', billing: 'postpaid', family: 'Alfa Plan', name: 'Alfa Plan 40GB', price: { amount: 40, currency: 'AZN', display: '40 ₼' }, cycle: { days: 30, type: 'monthly', display: 'Monthly' }, validity: 'Monthly', features: { internet: '40 GB', internetMb: 40960, calls: '4,000 min', callsMin: 4000, sms: '—', whatsapp: '—', social: '—', roaming: '—' }, activation: 'A40 → 650', contract: { '12Month': '10% off', '24Month': '20% off' }, url: postpaidUrl, popular: false, status: 'active' },
    { id: 'alfa-60', billing: 'postpaid', family: 'Alfa Plan', name: 'Alfa Plan 60GB', price: { amount: 60, currency: 'AZN', display: '60 ₼' }, cycle: { days: 30, type: 'monthly', display: 'Monthly' }, validity: 'Monthly', features: { internet: '60 GB', internetMb: 61440, calls: '5,000 min', callsMin: 5000, sms: '—', whatsapp: '5 GB', social: '5 GB', roaming: '1 GB' }, activation: 'A60 → 650', contract: { '12Month': '10% off', '24Month': '20% off' }, url: postpaidUrl, popular: false, status: 'active' },
    { id: 'alfa-120', billing: 'postpaid', family: 'Alfa Plan', name: 'Alfa Plan 120GB', price: { amount: 90, currency: 'AZN', display: '90 ₼' }, cycle: { days: 30, type: 'monthly', display: 'Monthly' }, validity: 'Monthly', features: { internet: '120 GB', internetMb: 122880, calls: '10,000 min', callsMin: 10000, sms: '—', whatsapp: '10 GB', social: '10 GB', roaming: '3 GB' }, activation: 'A120 → 650', contract: { '12Month': '10% off', '24Month': '20% off' }, url: postpaidUrl, popular: false, status: 'active' }
  ];

  // RU is an explicitly separate comparison version. Keep this catalogue apart
  // from the EN/AZ source data so their existing controls and defaults remain unchanged.
  var ruTariffs = [
    { id: 'digimax-daily', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax Daily', price: { display: '1 ₼' }, validity: '1 day', features: { internet: '300 MB', calls: '30 min', sms: '15 SMS', whatsapp: '—', social: '—', roaming: '—' }, url: digimaxUrl },
    { id: 'digimax-weekly', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax Weekly', price: { display: '4 ₼' }, validity: '7 days', features: { internet: '1 GB', calls: '100 min', sms: '50 SMS', whatsapp: '—', social: '—', roaming: '—' }, url: digimaxUrl },
    { id: 'digimax-3', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax 3GB', price: { display: '8 ₼' }, validity: '14 days', features: { internet: '3 GB', calls: '200 min', sms: '100 SMS', whatsapp: '—', social: '—', roaming: '—' }, url: digimaxUrl },
    { id: 'digimax-5', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax 5GB', price: { display: '12 ₼' }, validity: '28 days', features: { internet: '5 GB', calls: '300 min', sms: '150 SMS', whatsapp: '1 GB', social: '—', roaming: '—' }, url: digimaxUrl },
    { id: 'digimax-10', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax 10GB', price: { display: '18 ₼' }, validity: '28 days', features: { internet: '10 GB', calls: '600 min', sms: '300 SMS', whatsapp: '1 GB', social: '1 GB', roaming: '—' }, url: digimaxUrl },
    { id: 'digimax-25', billing: 'prepaid', family: 'DigiMax', name: 'DigiMax 25GB', price: { display: '30 ₼' }, validity: '28 days', features: { internet: '25 GB', calls: '1,500 min', sms: '500 SMS', whatsapp: '3 GB', social: '3 GB', roaming: '—' }, url: digimaxUrl },
    { id: 'premium-60', billing: 'prepaid', family: 'Premium+', name: 'Premium+ 60GB', price: { display: '60 ₼' }, validity: '28 days', features: { internet: '60 GB', calls: '3,000 min', sms: '1,500 SMS', whatsapp: '5 GB', social: '5 GB', roaming: '1 GB' }, url: prepaidUrl },
    { id: 'premium-100', billing: 'prepaid', family: 'Premium+', name: 'Premium+ 100GB', price: { display: '90 ₼' }, validity: '28 days', features: { internet: '100 GB', calls: '5,000 min', sms: '2,500 SMS', whatsapp: '10 GB', social: '10 GB', roaming: '3 GB' }, url: prepaidUrl },
    { id: 'data-plus-3', billing: 'prepaid', family: 'Data+', name: 'Data+ 3GB', price: { display: '9 ₼' }, validity: '28 days', features: { internet: '3 GB', calls: 'No voice calls', sms: 'Supported', whatsapp: '—', social: '—', roaming: '—' }, url: 'https://www.azercell.com/en/personal/plans-and-services/mobile-tariffs/prepaid/data-tarifi.html' },
    { id: 'data-plus-6', billing: 'prepaid', family: 'Data+', name: 'Data+ 6GB', price: { display: '12 ₼' }, validity: '28 days', features: { internet: '6 GB', calls: 'No voice calls', sms: 'Supported', whatsapp: '—', social: '—', roaming: '—' }, url: 'https://www.azercell.com/en/personal/plans-and-services/mobile-tariffs/prepaid/data-tarifi.html' },
    { id: 'data-plus-12', billing: 'prepaid', family: 'Data+', name: 'Data+ 12GB', price: { display: '19 ₼' }, validity: '28 days', features: { internet: '12 GB', calls: 'No voice calls', sms: 'Supported', whatsapp: '—', social: '—', roaming: '—' }, url: 'https://www.azercell.com/en/personal/plans-and-services/mobile-tariffs/prepaid/data-tarifi.html' },
    { id: 'data-plus-30', billing: 'prepaid', family: 'Data+', name: 'Data+ 30GB', price: { display: '29 ₼' }, validity: '28 days', features: { internet: '30 GB', calls: 'No voice calls', sms: 'Supported', whatsapp: '—', social: '—', roaming: '—' }, url: 'https://www.azercell.com/en/personal/plans-and-services/mobile-tariffs/prepaid/data-tarifi.html' },
    { id: 'data-plus-60', billing: 'prepaid', family: 'Data+', name: 'Data+ 60GB', price: { display: '39 ₼' }, validity: '28 days', features: { internet: '60 GB', calls: 'No voice calls', sms: 'Supported', whatsapp: '—', social: '—', roaming: '—' }, url: 'https://www.azercell.com/en/personal/plans-and-services/mobile-tariffs/prepaid/data-tarifi.html' },
    { id: 'veteran', billing: 'prepaid', family: 'Veteran', name: 'Veteran', price: { display: 'No monthly fee' }, validity: '5–120 days', features: { internet: '0.03 AZN / MB', calls: '0.03 on-net / 0.04 off-net', sms: '0.03 AZN', whatsapp: '—', social: '—', roaming: '—' }, url: 'https://www.azercell.com/en/personal/plans-and-services/mobile-tariffs/prepaid/veteran-tarifi.html' },
    { id: 'esgercell', billing: 'prepaid', family: 'Əsgərcell', name: 'Əsgərcell', price: { display: '88 ₼ one time' }, validity: '18 months', features: { internet: 'Unavailable', calls: '0.03 on-net / 0.04 off-net', sms: 'Unavailable', whatsapp: '—', social: '—', roaming: '—' }, url: 'https://www.azercell.com/en/personal/esgercell.html' },
    { id: 'alfa-12', billing: 'postpaid', family: 'Alfa Plan', name: 'Alfa Plan 12GB', price: { display: '20 ₼' }, validity: 'Monthly', features: { internet: '12 GB', calls: '1,200 min', sms: '—', whatsapp: '—', social: '—', roaming: '—' }, url: postpaidUrl },
    { id: 'alfa-25', billing: 'postpaid', family: 'Alfa Plan', name: 'Alfa Plan 25GB', price: { display: '30 ₼' }, validity: 'Monthly', features: { internet: '25 GB', calls: '2,500 min', sms: '—', whatsapp: '—', social: '—', roaming: '—' }, url: postpaidUrl },
    { id: 'alfa-40', billing: 'postpaid', family: 'Alfa Plan', name: 'Alfa Plan 40GB', price: { display: '40 ₼' }, validity: 'Monthly', features: { internet: '40 GB', calls: '4,000 min', sms: '—', whatsapp: '—', social: '—', roaming: '—' }, url: postpaidUrl },
    { id: 'alfa-60', billing: 'postpaid', family: 'Alfa Plan', name: 'Alfa Plan 60GB', price: { display: '60 ₼' }, validity: 'Monthly', features: { internet: '60 GB', calls: '5,000 min', sms: '—', whatsapp: '5 GB', social: '5 GB', roaming: '1 GB' }, url: postpaidUrl },
    { id: 'alfa-120', billing: 'postpaid', family: 'Alfa Plan', name: 'Alfa Plan 120GB', price: { display: '90 ₼' }, validity: 'Monthly', features: { internet: '120 GB', calls: '10,000 min', sms: '—', whatsapp: '10 GB', social: '10 GB', roaming: '3 GB' }, url: postpaidUrl }
  ];
  var ruActivation = {
    'digimax-daily': 'D1 → 7575', 'digimax-weekly': 'D7 → 7575', 'digimax-3': 'D3 → 7575',
    'digimax-5': 'D5 → 7575', 'digimax-10': 'D10 → 7575', 'digimax-25': 'D25 → 7575',
    'premium-60': 'PP60 → 7575', 'premium-100': 'PP100 → 7575',
    'data-plus-3': 'Activate in Kabinetim', 'data-plus-6': 'Activate in Kabinetim', 'data-plus-12': 'Activate in Kabinetim', 'data-plus-30': 'Activate in Kabinetim', 'data-plus-60': 'Activate in Kabinetim',
    'veteran': 'Enrolment in an Azercell store',
    'alfa-12': 'A12 → 650', 'alfa-25': 'A25 → 650', 'alfa-40': 'A40 → 650', 'alfa-60': 'A60 → 650', 'alfa-120': 'A120 → 650'
  };
  ruTariffs.forEach(function (tariff) {
    tariff.activation = ruActivation[tariff.id] || '—';
    if (tariff.family === 'Alfa Plan') tariff.contract = { '12Month': '10% off', '24Month': '20% off' };
  });

  global.TARIFF_COMPARE_LAB_DATA = {
    status: 'active',
    source: {
      kind: 'colleague-provided prototype source',
      path: '.scratch/colleague-tariff-source/azercell-tariff-comparison-site/app/page.tsx',
      authority: 'working prototype content; not canonical CMS truth',
      freshness: null
    },
    featureBlocks: [
      { id: 'plan-details', title: 'Plan details', items: [{ key: 'validity', label: 'Validity' }] },
      { id: 'internet', title: 'Internet', items: [{ key: 'internet', label: 'Included data' }, { key: 'whatsapp', label: 'WhatsApp data' }, { key: 'social', label: 'Social media data' }] },
      { id: 'calls-and-messages', title: 'Calls and messages', items: [{ key: 'calls', label: 'Countrywide calls' }, { key: 'sms', label: 'Countrywide SMS' }] },
      { id: 'roaming', title: 'Roaming', items: [{ key: 'roaming', label: 'Roaming data' }] },
      { id: 'contract-options', title: 'Contract options', billing: 'postpaid', items: [{ key: 'contract.12Month', label: '12-month contract' }, { key: 'contract.24Month', label: '24-month contract' }] },
      { id: 'activation', title: 'Activation', items: [{ key: 'activation', label: 'Activation code' }] }
    ],
    tariffs: tariffs,
    ruTariffs: ruTariffs
  };
}(window));
