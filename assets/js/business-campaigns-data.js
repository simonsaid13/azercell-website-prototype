/* ==========================================================================
   Azercell HTML Prototype — B2B Campaigns content
   Source markers:
   - site: current public Azercell Business website
   - deck: presentation / spreadsheet handoff (#f0f)
   - dummy: invented prototype content for documented gaps (#8000FF80)
   ========================================================================== */

(function (global) {
  'use strict';

  var routes = {
    hub: '/business/campaigns/',
    why: '/business/campaigns/why-azercell-business/',
    wifi: '/business/campaigns/my-business-wifi/',
    acquisition: '/business/campaigns/acquisition-campaigns/',
    mnp60: '/business/campaigns/acquisition-campaigns/mnp-60gb/',
    mnp80: '/business/campaigns/acquisition-campaigns/mnp-80gb/',
    devices: '/business/campaigns/devices-and-financing/',
    iphone16: '/business/campaigns/devices-and-financing/iphone-16-for-b2b/',
    iphone17: '/business/campaigns/devices-and-financing/iphone-17-for-b2b/',
    leasing: '/business/campaigns/devices-and-financing/smartphone-leasing/',
    discounts: '/business/campaigns/my-business-tariff-discounts/',
    club: '/business/campaigns/my-business-club/',
    wallet: '/business/campaigns/my-business-club/virtual-wallet/',
    archive: '/business/campaigns/archive/'
  };

  var pages = {
    hub: {
      hero: {
        eyebrow: 'Campaigns',
        title: 'Business-oriented limited-time offers',
        body: 'Special corporate offers available only to our valued business clients. Discover how Azercell can help your business connect and grow.',
        source: 'site'
      },
      primary: [
        { eyebrow: 'Start here', title: 'Why Azercell Business?', body: 'See how Azercell supports business connectivity and digital transformation.', href: routes.why, source: 'site' },
        { eyebrow: 'Active campaign', title: 'My Business Wi-Fi', body: 'Mi-Fi and WTTx internet offers from 40 AZN per month.', href: routes.wifi, source: 'site' },
        { eyebrow: 'Loyalty', title: 'My Business Club', body: 'Privileges, academy discounts and corporate event invitations.', href: routes.club, source: 'site' }
      ],
      campaignGroups: [
        { title: 'Acquisition campaigns', body: 'MNP bundles with 60GB or 80GB and inclusive minutes.', href: routes.acquisition, source: 'deck' },
        { title: 'Devices & financing', body: 'iPhone offers and a smartphone leasing mechanism for corporate customers.', href: routes.devices, source: 'deck' },
        { title: 'My Business tariff discounts', body: 'Discount options with and without a penalty mechanism.', href: routes.discounts, source: 'deck' },
        { title: 'Virtual Wallet', body: 'Invoice-based loyalty bonuses for bills or device purchases.', href: routes.wallet, source: 'deck' },
        { title: 'Campaigns archive', body: 'Browse all seven ended campaigns from the current site archive.', href: routes.archive, source: 'site' }
      ]
    },

    why: {
      hero: {
        eyebrow: 'Why Azercell Business?',
        title: "Future's close to you",
        body: 'Digital technology, voice, data, Internet of Things and communications that help enterprises stay connected and grow.',
        source: 'site',
        actions: [{ label: 'Contact us', href: 'mailto:business@azercell.com', variant: 'primary' }]
      },
      intro: [
        'We are here to help enterprises improve their businesses digitally. Our solutions in digital technology, voice, data, Internet of Things and other communications are fundamental for every business that understands digital transformation.',
        'As a digital solutions provider, we support every part of a business in staying connected internally and with the wider world. Our solutions and services meet the needs of different industries regardless of business size.',
        'We are a large team with a 23-year success story, opening new opportunities for business customers in a rapidly changing digital world.'
      ],
      reasons: [
        { title: 'Customer centric', body: 'Customers are what we are here for. We tailor solutions to SMEs, professionals and large enterprises.', source: 'site' },
        { title: 'One stop shop', body: 'A broad product portfolio helps businesses bring connectivity and digital services together.', source: 'site' },
        { title: 'Simple', body: 'Stay focused on your core business while Azercell keeps the connection trouble-free and easy to use.', source: 'site' }
      ],
      fairUse: [
        'Azercell Telecom may fully or partially restrict or suspend a service when subscriber activity violates fair-use or security requirements, involves fraud, threatens financial interests or business reputation, or falls under other cases in legislation or the agreement.',
        'Suspicious transactions and security threats may be monitored, and subscribers may be informed by phone, SMS or other means. Restrictions may be lifted after an investigation based on the subscriber’s request.'
      ]
    },

    wifi: {
      hero: {
        eyebrow: 'My Business Wi-Fi',
        title: 'Keep your business connected',
        body: 'Share mobile internet with customers or employees through a portable Mi-Fi or fixed WTTx modem, without physical infrastructure.',
        source: 'site',
        stats: [
          { value: 'From 40 AZN', label: 'Monthly fee' },
          { value: 'Up to 210GB', label: 'Internet' },
          { value: 'Up to 32', label: 'Connected devices' }
        ],
        actions: [{ label: 'Contact us', href: 'mailto:business@azercell.com', variant: 'primary' }]
      },
      intro: [
        'Azercell Business offers My Business Wi-Fi to corporate subscribers using Mi-Fi and WTTx modems. Flexible data packs suit small, medium and individual enterprises and can be changed during the 12-month period.',
        'Mi-Fi is a portable modem that shares Wi-Fi with up to 10 devices. WTTx shares internet with up to 32 devices and is designed for plug-and-play installation.'
      ],
      benefits: [
        { title: 'Advantageous', body: 'Receive the device without pre-payment when the selected internet package is paid.', source: 'site' },
        { title: 'Multifunctional', body: 'Provide convenient internet access to as many as 32 devices.', source: 'site' },
        { title: 'Flexible', body: 'Change the selected internet pack to another option during the next 12 months.', source: 'site' }
      ],
      mifi: [
        { label: '60 GB', value: '40 AZN' },
        { label: '110 GB', value: '50 AZN' },
        { label: '210 GB', value: '70 AZN' }
      ],
      wttx: [
        { label: '110 GB', value: '50 AZN' },
        { label: '210 GB', value: '70 AZN' }
      ],
      note: 'The campaign applies only to new subscribers activated after 02.06.2025; existing terms remain unchanged for current customers.',
      faq: [
        { question: 'Will I need a new number?', answer: 'One prepaid line on the Data tariff is provided with every device. The offer applies only to the number supplied with that device.', source: 'site' },
        { question: 'What happens when the included data is used up?', answer: 'Internet access stops until the next renewal period.', source: 'site' },
        { question: 'Can I purchase an additional internet pack?', paragraphs: ['Yes. Subscribers may purchase non-recurrent packs.', 'If an additional pack is ordered, the most recently ordered pack is activated. Monthly recurring and short-time packages are not available with the offer.'], source: 'site' },
        { question: 'Who provides technical assistance?', paragraphs: ['Akhundoff Networks', 'Phone: +994 51 259 81 42 or +994 50 704 24 24. Address: AZ1000, Bul-Bul Avenue 8a.'], source: 'site' }
      ]
    },

    acquisition: {
      hero: {
        eyebrow: 'Acquisition campaigns',
        title: 'Bring your business numbers to Azercell',
        body: 'Move eligible corporate numbers and choose a high-volume bundle with all-net, international and unlimited corporate calls.',
        source: 'dummy',
        actions: [{ label: 'Check eligibility', href: 'mailto:business@azercell.com', variant: 'primary' }]
      },
      cards: [
        { title: 'MNP 60GB Campaign', body: '60GB, 2,000 all-net minutes, 50 international minutes and unlimited corporate calls.', meta: ['26 AZN per billing cycle', 'Not a mass offer'], href: routes.mnp60, source: 'deck' },
        { title: 'MNP 80GB Campaign', body: '80GB, 5,000 all-net minutes, 100 international minutes and unlimited corporate calls.', meta: ['46 AZN per billing cycle', 'Not a mass offer'], href: routes.mnp80, source: 'deck' }
      ],
      snapshot: [
        { label: 'Eligibility', value: 'Companies porting at least 5 active business numbers to Azercell.', source: 'dummy' },
        { label: 'Campaign window', value: '01 September–31 December 2026.', source: 'dummy' },
        { label: 'Commitment', value: '12 months from activation of each participating number.', source: 'dummy' },
        { label: 'How to apply', value: 'Ask the corporate account manager or email business@azercell.com.', source: 'dummy' }
      ]
    },

    mnp60: {
      hero: {
        eyebrow: 'MNP 60GB Campaign',
        title: 'MNP 60GB Campaign',
        body: '60GB, 2,000 all-net minutes, 50 international minutes and unlimited corporate calls.',
        source: 'deck',
        stats: [
          { value: '26 AZN', label: 'Monthly fee' },
          { value: '60GB', label: 'Internet' },
          { value: '2,000 min', label: 'All-net calls' }
        ]
      },
      details: [
        { label: 'Monthly fee', value: '26 AZN', source: 'deck' },
        { label: 'Internet', value: '60 GB', source: 'deck' },
        { label: 'All-net minutes', value: '2,000', source: 'deck' },
        { label: 'International minutes', value: '50', source: 'deck' },
        { label: 'Corporate calls', value: 'Unlimited', source: 'deck' },
        { label: 'Availability', value: 'Not a mass offer', source: 'deck' },
        { label: 'Launch', value: 'Summer 2025', source: 'deck' },
        { label: 'Eligibility', value: 'Business customers porting 5 or more active numbers.', source: 'dummy' },
        { label: 'Campaign period', value: 'Applications accepted until 31 December 2026.', source: 'dummy' },
        { label: 'Commitment', value: '12-month minimum term per number; early cancellation fee equals the remaining monthly fees, capped at 78 AZN.', source: 'dummy' }
      ],
      steps: [
        { title: 'Submit the number list', body: 'Send company details, TAX ID and the numbers to be ported to the account manager.', source: 'dummy' },
        { title: 'Complete MNP checks', body: 'Azercell checks number ownership, debt status and portability.', source: 'dummy' },
        { title: 'Activate the bundle', body: 'Sign the addendum and activate the offer after the port completes.', source: 'dummy' }
      ]
    },

    mnp80: {
      hero: {
        eyebrow: 'MNP 80GB Campaign',
        title: 'MNP 80GB Campaign',
        body: '80GB, 5,000 all-net minutes, 100 international minutes and unlimited corporate calls.',
        source: 'deck',
        stats: [
          { value: '46 AZN', label: 'Monthly fee' },
          { value: '80GB', label: 'Internet' },
          { value: '5,000 min', label: 'All-net calls' }
        ]
      },
      details: [
        { label: 'Monthly fee', value: '46 AZN', source: 'deck' },
        { label: 'Internet', value: '80 GB', source: 'deck' },
        { label: 'All-net minutes', value: '5,000', source: 'deck' },
        { label: 'International minutes', value: '100', source: 'deck' },
        { label: 'Corporate calls', value: 'Unlimited', source: 'deck' },
        { label: 'Availability', value: 'Not a mass offer', source: 'deck' },
        { label: 'Launch date', value: '15 September 2026.', source: 'dummy' },
        { label: 'Eligibility', value: 'Business customers porting 10 or more active numbers.', source: 'dummy' },
        { label: 'Campaign period', value: '15 September 2026–31 January 2027.', source: 'dummy' },
        { label: 'Commitment', value: '18-month minimum term per number; early cancellation fee equals 50% of the remaining monthly fees.', source: 'dummy' }
      ],
      steps: [
        { title: 'Request a proposal', body: 'Ask the account manager to confirm the number volume and company eligibility.', source: 'dummy' },
        { title: 'Approve the port', body: 'Provide signed MNP authorisation and verify all number owners.', source: 'dummy' },
        { title: 'Start using the bundle', body: 'The offer starts on the first full billing cycle after porting.', source: 'dummy' }
      ]
    },

    devices: {
      hero: {
        eyebrow: 'Devices & financing',
        title: 'Equip every role with the right device',
        body: 'Combine smartphones with My Business tariff plans and predictable 12- or 24-month payment terms.',
        source: 'dummy'
      },
      cards: [
        { title: 'iPhone 16 campaign for B2B', body: 'Apple devices with zero initial payment and interest-free instalments.', meta: ['My Business 12GB–100GB', '12 or 24 months'], href: routes.iphone16, source: 'deck' },
        { title: 'iPhone 17 campaign for B2B', body: 'Current-generation Apple devices combined with a My Business tariff.', meta: ['My Business 12GB–100GB', '12 or 24 months'], href: routes.iphone17, source: 'deck' },
        { title: 'Smartphone Leasing Campaign', body: 'Selected Business Family plans with a structured credit mechanism.', meta: ['Corporate customers', '12–24 months'], href: routes.leasing, source: 'deck' }
      ]
    },

    iphone16: {
      hero: {
        eyebrow: 'iPhone 16 campaign for B2B',
        title: 'iPhone 16 for corporate customers',
        body: 'Reliable connectivity, tariff choice and interest-free payment opportunities in one corporate offer.',
        source: 'site'
      },
      paragraphs: [
        'iPhone 16 models are offered under special and favourable conditions. Subscribers can obtain a device with zero initial payment and interest-free monthly instalments.',
        'Companies choose a relevant My Business tariff package. Included internet and voice minutes help employees stay connected and support effective business processes.'
      ],
      bullets: [
        'iPhone 16, iPhone 16 Plus, iPhone 16 Pro and iPhone 16 Pro Max.',
        'My Business 12GB, 20GB, 60GB or 100GB tariff plans.',
        'Contract options for 12 or 24 months.'
      ]
    },

    iphone17: {
      hero: {
        eyebrow: 'iPhone 17 campaign for B2B',
        title: 'iPhone 17 for corporate customers',
        body: 'Current-generation Apple devices with reliable connectivity and interest-free monthly instalments.',
        source: 'site'
      },
      paragraphs: [
        'iPhone 17 models are offered under special and favourable conditions. Subscribers can obtain a device with zero initial payment and interest-free monthly instalments.',
        'Companies choose a relevant My Business tariff package. Included internet and voice minutes help employees stay connected and support effective business processes.'
      ],
      bullets: [
        'iPhone 17, iPhone 17 Pro, iPhone 17 Pro Max and iPhone Air.',
        'My Business 12GB, 20GB, 60GB or 100GB tariff plans.',
        'Contract options for 12 or 24 months.'
      ]
    },

    leasing: {
      hero: {
        eyebrow: 'Smartphone Leasing Campaign',
        title: 'Spread device costs across the contract term',
        body: 'Corporate customers on selected Business Family plans can purchase smartphones through a structured credit mechanism.',
        source: 'deck'
      },
      devices: [
        { label: 'Samsung Galaxy A56 5G', value: '0 AZN upfront · 29 AZN/month for 24 months', source: 'dummy' },
        { label: 'Xiaomi 15T', value: '49 AZN upfront · 34 AZN/month for 24 months', source: 'dummy' },
        { label: 'iPhone 16e', value: '99 AZN upfront · 58 AZN/month for 24 months', source: 'dummy' }
      ],
      terms: [
        { label: 'Eligible tariffs', value: 'My Business 20GB, 60GB and 100GB.', source: 'dummy' },
        { label: 'Credit requirement', value: 'Company account active for 6 months, no overdue balance, signed director guarantee.', source: 'dummy' },
        { label: 'Device limit', value: 'Up to 1 device per eligible active line and 20 devices per TAX ID.', source: 'dummy' },
        { label: 'Early termination', value: 'Remaining device instalments become payable on the next invoice; a 25 AZN administration fee applies.', source: 'dummy' },
        { label: 'Application channels', value: 'Corporate account manager, selected Customer Care offices or business@azercell.com.', source: 'dummy' }
      ],
      steps: [
        { title: 'Choose devices', body: 'Select the model, quantity and eligible tariff lines.', source: 'dummy' },
        { title: 'Complete the credit check', body: 'Provide the company extract, director ID and signed application.', source: 'dummy' },
        { title: 'Collect and activate', body: 'Sign the device schedule and collect devices from the selected office.', source: 'dummy' }
      ]
    },

    discounts: {
      hero: {
        eyebrow: 'My Business tariff discounts',
        title: 'Flexible discounts for eligible corporate lines',
        body: 'Discounts may apply to My Business tariffs with or without a penalty mechanism.',
        source: 'deck'
      },
      summary: [
        { label: 'Product category', value: 'B2B Discounts', source: 'deck' },
        { label: 'Applicable tariffs', value: 'My Business tariffs', source: 'deck' },
        { label: 'Mechanism 1', value: 'Discount without penalty mechanism', source: 'deck' },
        { label: 'Mechanism 2', value: 'Discount with penalty mechanism', source: 'deck' },
        { label: 'Discount level', value: '10% for 12 months without commitment, or 20% for 24 months with commitment.', source: 'dummy' },
        { label: 'Eligible SN codes', value: 'SN-B2B-12, SN-B2B-20, SN-B2B-60 and SN-B2B-100.', source: 'dummy' },
        { label: 'Eligibility', value: 'At least 10 active lines under one TAX ID and no overdue invoices for the previous 90 days.', source: 'dummy' },
        { label: 'Penalty formula', value: 'Months remaining × standard monthly fee × applied discount percentage.', source: 'dummy' }
      ],
      steps: [
        { title: 'Check the account', body: 'The account manager confirms line count, SN codes and payment history.', source: 'dummy' },
        { title: 'Choose a mechanism', body: 'Select the 12-month flexible discount or the larger 24-month committed discount.', source: 'dummy' },
        { title: 'Sign and activate', body: 'The discount starts from the next full billing cycle after the addendum is signed.', source: 'dummy' }
      ]
    },

    club: {
      hero: {
        eyebrow: 'My Business Club',
        title: 'The privilege you deserve',
        body: 'An exclusive programme for corporate clients with special discounts, learning opportunities and event invitations.',
        source: 'site',
        actions: [{ label: 'Contact us', href: 'mailto:business@azercell.com', variant: 'primary' }]
      },
      intro: [
        'We look to the future with confidence by building a digital ecosystem of world-class products and services and discovering a new generation of communication channels.',
        'My Business Club members can take advantage of special discounts under the My Business Loyalty programme.',
        'Members also receive exclusive Azercell Academy discounts, invitations to special corporate events and other benefits.'
      ],
      cards: [
        { title: 'My Business Loyalty', body: 'Special member discounts across selected Azercell Business offers.', source: 'site' },
        { title: 'Azercell Academy', body: 'Exclusive discounts on professional learning opportunities.', source: 'site' },
        { title: 'Corporate events', body: 'Invitations to selected events for the business community.', source: 'site' },
        { title: 'Virtual Wallet', body: 'Invoice-based bonuses that can later support bill or device payments.', href: routes.wallet, source: 'deck' }
      ]
    },

    wallet: {
      hero: {
        eyebrow: 'Virtual Wallet',
        title: 'Turn regular invoice payments into business value',
        body: 'Eligible company accounts receive a percentage of monthly invoice payments as a bonus that becomes available after 12 months.',
        source: 'deck'
      },
      intro: [
        'Companies with the service accrue a bonus based on monthly invoice payments. Once available, the amount can be used to pay an open invoice or purchase a device.'
      ],
      details: [
        { label: 'Accrual rate', value: '3% of the VAT-exclusive amount paid by the invoice due date.', source: 'dummy' },
        { label: 'Accrual cap', value: 'Maximum 500 AZN per account per month.', source: 'dummy' },
        { label: 'Availability', value: 'Each monthly bonus becomes usable after 12 complete calendar months.', source: 'dummy' },
        { label: 'Bonus lifetime', value: 'Usable for 6 months after release; expired amounts are cancelled.', source: 'dummy' },
        { label: 'Taxes', value: 'Bonus value is applied after VAT and cannot be withdrawn as cash.', source: 'dummy' },
        { label: 'Use case 1', value: 'Pay an open Azercell Business invoice.', source: 'deck' },
        { label: 'Use case 2', value: 'Purchase an eligible device through the account manager.', source: 'deck' }
      ],
      steps: [
        { title: 'Join the service', body: 'The authorised company representative signs the Virtual Wallet addendum.', source: 'dummy' },
        { title: 'Pay invoices on time', body: 'Eligible paid amounts are added to the pending wallet balance each month.', source: 'dummy' },
        { title: 'Redeem available funds', body: 'Ask the account manager to apply the wallet to an invoice or device order.', source: 'dummy' }
      ]
    },

    archive: {
      hero: {
        eyebrow: 'Campaigns archive',
        title: 'Ended business campaigns',
        body: 'Reference material for corporate offers that are no longer available to new participants.',
        source: 'site'
      },
      items: [
        { title: 'Lenovo (Ended campaign) A2016 (LTE)', href: 'https://www.azercell.com/en/corporate/mobile-communications/campaigns/ended-campaigns/lenovo-a2016-lte.html', linkLabel: 'Original page', source: 'site' },
        { title: 'General Mobile (Ended campaign) Android One', href: 'https://www.azercell.com/en/corporate/mobile-communications/campaigns/ended-campaigns/general-mobile-android-one.html', linkLabel: 'Original page', source: 'site' },
        { title: '20GB 20 AZN (Ended campaign)', href: 'https://www.azercell.com/en/corporate/mobile-communications/campaigns/ended-campaigns/20-gb-20-azn.html', linkLabel: 'Original page', source: 'site' },
        { title: 'iPhone 16 and iPhone 17 Campaigns for Corporate Customers', href: 'https://www.azercell.com/en/corporate/mobile-communications/campaigns/ended-campaigns/korporativ-metrilr-ecen-yeni-iphone-16-kampaniyasi.html', linkLabel: 'Original page', source: 'site' },
        { title: 'My Business Wi-Fi (Ended campaign)', href: 'https://www.azercell.com/en/corporate/mobile-communications/campaigns/ended-campaigns/biznesim-wifi.html', linkLabel: 'Original page', source: 'site' },
        { title: 'New company campaign - GM (Ended campaign)', href: 'https://www.azercell.com/en/corporate/mobile-communications/campaigns/ended-campaigns/campaign-new-company-gm.html', linkLabel: 'Original page', source: 'site' },
        { title: 'New company campaign - Lenovo (Ended campaign)', href: 'https://www.azercell.com/en/corporate/mobile-communications/campaigns/ended-campaigns/campaign-new-company-lenovo.html', linkLabel: 'Original page', source: 'site' }
      ]
    }
  };

  global.BusinessCampaignsData = {
    routes: routes,
    pages: pages,
    sourceLegend: {
      deckLabel: 'Presentation / spreadsheet content',
      dummyLabel: 'Dummy content added to complete the prototype'
    }
  };
})(window);
