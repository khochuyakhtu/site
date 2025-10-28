export const Resources = {
  shared: {
    brand: {
      emoji: '🚤',
      name: 'Хочу Яхту',
      tagline: 'crypto collective'
    },
    navigation: {
      home: 'Головна',
      blog: 'Блог',
      earn: 'Earn',
      launchpool: 'Launchpool',
      joinCta: 'Приєднатись',
      toggleAriaLabel: 'Toggle navigation'
    },
    allOption: 'Усі',
    contact: {
      email: 'crew@hochu-yacht.xyz',
      telegram: {
        label: 'Telegram',
        url: 'https://t.me/hochu-yacht'
      },
      x: {
        label: 'X (Twitter)',
        url: 'https://x.com/hochu-yacht'
      }
    },
    themeToggle: {
      light: '☀️ Світла',
      dark: '🌙 Темна'
    }
  },
  header: {
    logoAlt: 'Хочу Яхту'
  },
  footer: {
    title: '🚤 Хочу Яхту',
    description:
      'Спільнота ентузіастів Web3, які діляться знаннями та будують пасивний дохід на крипторинку.',
    navigationTitle: 'Навігація',
    contactsTitle: 'Контакти',
    copyright: '© {year} Хочу Яхту. Всі права захищені.'
  },
  home: {
    hero: {
      badge: 'Web3 Community',
      title: 'Хочу Яхту — клуб криптономадів, що інвестують у майбутнє',
      description:
        'Акумулюємо найкращі можливості для пасивного доходу, ділимося альфа-ресерчем та створюємо інфраструктуру для росту капіталу спільноти.',
      primaryCta: 'Переглянути Earn',
      secondaryCta: 'Читати блог',
      stats: {
        heading: 'Станом на квітень 2024',
        items: [
          { value: '4 200+', label: 'учасників спільноти' },
          { value: '$12.5M', label: 'сукупного TVL у стратегіях' },
          { value: '38', label: 'аналітичних звітів на місяць' }
        ]
      }
    },
    highlights: {
      title: 'Що отримує член спільноти',
      description:
        'Ми формуємо нетворк, що дає доступ до приватних угод, спільних пулів ліквідності та експертних консультацій з управління ризиками.',
      cards: [
        {
          title: 'Приватний Launchpad',
          description:
            'Доступ до угод на ранніх стадіях з ретельним юридичним та технічним дьюдилом.'
        },
        {
          title: 'Аналітика 24/7',
          description:
            'Slack-канал з алертами щодо стейкінгів, airdrop-кампаній та нестандартних рішень для збільшення APY.'
        },
        {
          title: 'Програми наставництва',
          description:
            'Професійні ментори з досвідом управління DeFi-портфелями та деривативами.'
        }
      ]
    },
    roadmap: {
      title: 'Дорожня карта 2024',
      items: [
        {
          title: 'Q2 • Launchpool Radar',
          description:
            'Автоматизований трекер з push-нотифікаціями по ключових біржах та калькулятором ризик/нагорода.'
        },
        {
          title: 'Q3 • Community Fund',
          description:
            'Запуск DAO-скарбниці для спільних інвестицій у прибуткові протоколи.'
        },
        {
          title: 'Q4 • Yacht Summit',
          description:
            'Офлайн-подія в Середземноморʼї з партнерами бірж та фондами.'
        }
      ]
    }
  },
  blog: {
    badge: 'База знань',
    title: 'Блог спільноти «Хочу Яхту»',
    description:
      'Глибокі гайди, ресерч та дайджести з DeFi, NFT, трейдингу та безпеки. Фільтруйте матеріали за категоріями або шукайте за ключовими словами.',
    searchLabel: 'Пошук по матеріалам',
    searchPlaceholder: 'Наприклад: стейкінг SOL або халвінг',
    allCategoryLabel: 'Усі',
    readTimeSuffix: 'хв читати',
    emptyState: {
      title: 'Нічого не знайдено',
      description: 'Спробуйте змінити категорію або уточнити пошуковий запит.'
    },
    categories: ['DeFi', 'Трейдинг', 'NFT', 'Аналітика', 'Безпека'],
    posts: [
      {
        id: 'yield-farming-101',
        title: 'Як стартувати з yield farming без ризику',
        excerpt:
          'Розбираємо ключові протоколи та страхові механізми, які допоможуть зменшити ризики.',
        category: 'DeFi',
        author: 'Олена Мельник',
        readTime: 8,
        publishedAt: '2024-03-01'
      },
      {
        id: 'options-trading',
        title: 'Опціони на крипторинку: стратегія «залізний кондор»',
        excerpt:
          'Пояснюємо, як працює стратегія з фіксованим ризиком для досвідчених трейдерів.',
        category: 'Трейдинг',
        author: 'Максим Модуль',
        readTime: 10,
        publishedAt: '2024-02-14'
      },
      {
        id: 'nft-utility',
        title: 'Utility NFT: прикладні кейси поза мистецтвом',
        excerpt:
          'Глянемо, як токени відкривають доступ до клубів, івентів та фінансових продуктів.',
        category: 'NFT',
        author: 'Олександр Стоун',
        readTime: 6,
        publishedAt: '2024-01-28'
      },
      {
        id: 'btc-halving',
        title: 'Як халвінг Bitcoin впливає на alt season',
        excerpt:
          'Історичні дані з попередніх циклів та прогнози для портфелів у 2024 році.',
        category: 'Аналітика',
        author: 'Ірина Алгоритм',
        readTime: 7,
        publishedAt: '2024-04-05'
      },
      {
        id: 'wallet-security',
        title: '5 правил безпеки для зберігання криптовалют',
        excerpt:
          'Лайфхаки для апаратних гаманців, мультипідписів та бекапів seed-фраз.',
        category: 'Безпека',
        author: 'Сергій Шифр',
        readTime: 5,
        publishedAt: '2024-02-01'
      }
    ]
  },
  earn: {
    badge: 'Стратегії доходу',
    title: 'Earn панель',
    description:
      'Актуальні пропозиції стейкінгу з централізованих бірж. Фільтруйте за біржею, монетою, мінімальним APY та тривалістю блокування.',
    summaryTitle: 'Зведена статистика',
    summaryAverageLabel: 'Середній APY',
    summaryTvlLabel: 'Сукупний TVL',
    filters: {
      exchangeLabel: 'Біржа',
      assetLabel: 'Монета',
      assetPlaceholder: 'Наприклад, SOL',
      minApyLabel: 'Мінімальний APY',
      termLabel: 'Термін',
      reset: 'Скинути фільтри'
    },
    table: {
      headers: {
        exchange: 'Біржа',
        asset: 'Монета',
        apy: 'APY',
        term: 'Термін',
        tvl: 'TVL (тис.$)',
        risk: 'Ризик'
      },
      empty: 'За вибраними параметрами немає пропозицій.',
      datasetNote:
        'Дані оновлені вручну для демо. У продакшені інтегруйте API бірж для отримання реальних значень.',
      datasetCount: 'Показано {current} з {total} продуктів.'
    },
    options: {
      exchanges: ['Binance', 'Bybit', 'OKX', 'Kraken'],
      stakingTerms: ['Гнучкий', '30 днів', '60 днів', '90 днів']
    },
    products: [
      {
        id: 'bnb-flex',
        exchange: 'Binance',
        asset: 'BNB',
        apy: 5.2,
        term: 'Гнучкий',
        tvl: 320,
        risk: 'Низький'
      },
      {
        id: 'sol-locked',
        exchange: 'Binance',
        asset: 'SOL',
        apy: 8.7,
        term: '30 днів',
        tvl: 210,
        risk: 'Середній'
      },
      {
        id: 'eth-stake',
        exchange: 'Kraken',
        asset: 'ETH',
        apy: 4.5,
        term: 'Гнучкий',
        tvl: 150,
        risk: 'Низький'
      },
      {
        id: 'dot-lock',
        exchange: 'OKX',
        asset: 'DOT',
        apy: 12.1,
        term: '60 днів',
        tvl: 95,
        risk: 'Середній'
      },
      {
        id: 'avax-earn',
        exchange: 'Bybit',
        asset: 'AVAX',
        apy: 14.5,
        term: '90 днів',
        tvl: 120,
        risk: 'Високий'
      },
      {
        id: 'usdt-flex',
        exchange: 'OKX',
        asset: 'USDT',
        apy: 6.3,
        term: 'Гнучкий',
        tvl: 400,
        risk: 'Низький'
      }
    ]
  },
  launchpool: {
    badge: 'Launchpool центр',
    title: 'Моніторинг Launchpool',
    description:
      'Відстежуйте активні та майбутні кампанії на різних біржах. Підберіть відповідні пропозиції та одразу порахуйте прогнозований прибуток.',
    calculator: {
      title: 'Калькулятор прибутку',
      depositLabel: 'Депозит, $',
      apyLabel: 'Очікуваний APY, %',
      durationLabel: 'Тривалість, днів',
      forecast: {
        profit: 'Очікуваний прибуток',
        total: 'Підсумок'
      }
    },
    filters: {
      statusLabel: 'Статус',
      exchangeLabel: 'Біржа',
      queryLabel: 'Пошук за проектом або активами',
      queryPlaceholder: 'Наприклад, Sui або BNB'
    },
    card: {
      descriptionPrefix: 'APY до',
      assetsLabel: 'Локація активів:',
      cta: 'Додати в трекер',
      empty: {
        title: 'Пропозицій не знайдено',
        description: 'Змініть фільтри, щоб побачити більше launchpool кампаній.'
      }
    },
    statuses: ['Активні', 'Майбутні', 'Завершені'],
    campaigns: [
      {
        id: 'sui-launch',
        project: 'Sui Network',
        exchange: 'Binance',
        status: 'Активні',
        lockAssets: ['BNB', 'TUSD'],
        roi: 38,
        startDate: '2024-03-20',
        endDate: '2024-04-18'
      },
      {
        id: 'celestia-lp',
        project: 'Celestia',
        exchange: 'Bybit',
        status: 'Майбутні',
        lockAssets: ['BIT', 'USDT'],
        roi: 42,
        startDate: '2024-05-01',
        endDate: '2024-05-30'
      },
      {
        id: 'worldcoin-reward',
        project: 'Worldcoin',
        exchange: 'OKX',
        status: 'Активні',
        lockAssets: ['OKB', 'USDT'],
        roi: 25,
        startDate: '2024-03-05',
        endDate: '2024-04-05'
      },
      {
        id: 'layerzero-lp',
        project: 'LayerZero',
        exchange: 'Binance',
        status: 'Майбутні',
        lockAssets: ['BNB', 'FDUSD'],
        roi: 55,
        startDate: '2024-04-25',
        endDate: '2024-05-20'
      },
      {
        id: 'aptos-lp',
        project: 'Aptos',
        exchange: 'Kraken',
        status: 'Завершені',
        lockAssets: ['ETH', 'USDC'],
        roi: 21,
        startDate: '2023-12-01',
        endDate: '2024-01-02'
      }
    ]
  }
} as const;

export const blogCategories = Resources.blog.categories;
export const blogPosts = Resources.blog.posts;
export const exchanges = Resources.earn.options.exchanges;
export const stakingTerms = Resources.earn.options.stakingTerms;
export const earnProducts = Resources.earn.products;
export const launchpoolStatuses = Resources.launchpool.statuses;
export const launchpoolCampaigns = Resources.launchpool.campaigns;
