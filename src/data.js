export const bio = {
  name: 'Keormel',
  avatar: 'image/avatar.jpg',
  role: 'Full-stack developer',
  about:
    'Привет! Я Keormel, увлечённый full-stack разработчик с опытом в создании веб-приложений и ботов. Мой путь в программировании начался с Python, и с тех пор я расширил свои навыки, освоив React, Node.js и другие технологии. Я люблю создавать проекты, которые решают реальные проблемы и приносят пользу пользователям. Способен написать, что угодно и быстро разобраться в новых технологиях.',
  status: 'Открыт к работе',
  location: 'Кишинёв, MD',
  localTimeGif: 'https://i.imgur.com/JX2KebW.gif',
  birthDate: '2007-01-16',
  stats: {
    experience: '3+',
    projects: '10+',
    code: '100K+',
  },
};

export const skills = [
  { name: 'React / Next.js', level: 70 },
  { name: 'TypeScript', level: 67 },
  { name: 'Node.js / Express', level: 65 },
  { name: 'CSS / Tailwind', level: 85 },
  { name: 'Python', level: 70 },
  { name: 'Java', level: 20 },
  { name: 'C++', level: 32 },
  
];

export const stack = [
  { name: 'React', icon: 'ti-brand-react' },
  { name: 'Node.js', icon: 'ti-brand-nodejs' },
  { name: 'SQL', icon: 'ti-database' },
  { name: 'Tailwind', icon: 'ti-brand-tailwind' },
  { name: 'Python', icon: 'ti-brand-python' },
];

export const contacts = [
  { label: 'Telegram', icon: 'ti-brand-telegram', url: 'https://t.me/keormel' },
  { label: 'GitHub', icon: 'ti-brand-github', url: 'https://github.com/Keormel' },
  { label: 'Discord', icon: 'ti-brand-discord', url: 'https://discord.com/users/514528372068450326' },
];

export const projects = [
  {
    id: 'telegram-shoe-bot',
    title: 'Telegram-бот для продажи обуви',
    desc: 'Автоматизированный бот для приема заказов, управления каталогом и обработки платежей в Telegram.',
    long:
      'Разработал Telegram-бота для онлайн-продажи обуви, который позволяет пользователям просматривать каталог, оформлять заказы и получать уведомления о статусе доставки.',
    tags: ['Python', 'aiogram3.x', 'SQLite'],
    url: 'https://t.me/CrossBrandCross_bot',
    date: '2024',
    icon: 'ti-brand-python',
    color: '#3a88ed',
    challenge: 'Сделать процесс заказа максимально простым и понятным в рамках Telegram.',
    result: 'Пользователи могут оформить заказ в несколько кликов, а администраторы управляют каталогом и заказами через удобную панель.',
    stack: ['Python', 'SQLite', 'API Telegram'],
    features: ['Каталог товаров', 'Оформление заказов', 'Уведомления о статусе', 'Панель администратора'],
  },
  {
    id: 'orsted-project',
    title: 'Orsted Project',
    desc: 'Сайт для майнкрафт сервера с кастомными плагинами, игровыми механиками и интеграцией с внешними сервисами.',
    long:
      'Создал сайт для майнкрафт сервера Orsted, который включает в себя кастомные игровые механики, интеграцию с Discord и систему управления аккаунтами игроков.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    url: 'https://mtminecraft.online/',
    date: '2026',
    logo: '/image/OrstedLogo.jpg',
    challenge: 'Создать удобный и интуитивно понятный интерфейс для управления аккаунтами игроков.',
    result: 'Игроки могут легко регистрироваться, просматривать свои игровые достижения и взаимодействовать с сообществом через интеграцию с Discord.',
    stack: ['React', 'TypeScript', 'Tailwind', 'API Discord'],
    features: ['Регистрация и управление аккаунтом', 'Интеграция с Discord', 'Просмотр достижений', 'Новости и обновления сервера'],
  },
  {
    id: 'booking-app',
    title: 'Booking App',
    desc: 'Сервис записи и бронирования с понятными сценариями выбора, подтверждения и обратной связи.',
    long:
      'Собрал приложение для бронирования с цепочкой шагов, минимальными отвлечениями и акцентом на прозрачный процесс подтверждения заявки.',
    tags: ['Product', 'Booking', 'Mobile'],
    // url: '',
    date: '2023',
    icon: 'ti-calendar-event',
    color: '#0f766e',
    challenge: 'Сделать процесс бронирования коротким и предсказуемым.',
    result: 'Пользователь проходит сценарий без лишних решений.',
    stack: ['React', 'Node.js', 'SQL'],
    features: ['Пошаговая форма', 'Подтверждение', 'Список броней', 'Адаптивность'],
  },
];
