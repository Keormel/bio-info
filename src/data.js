export const bio = {
  name: 'Keormel',
  role: 'Веб-разработчик · Full-stack',
  about:
    'Создаю аккуратные интерфейсы, собираю быстрые фронтенды и надежные API. Люблю простую архитектуру, понятный UI и честную верстку без лишнего шума.',
  status: 'Открыт к работе',
  location: 'Кишинёв, MD',
  birthDate: '2007-01-16',
  stats: {
    experience: '3+',
    projects: '10+',
    code: '100K+',
  },
};

export const skills = [
  { name: 'React / Next.js', level: 90 },
  { name: 'TypeScript', level: 80 },
  { name: 'Node.js / Express', level: 75 },
  { name: 'CSS / Tailwind', level: 85 },
  { name: 'Python', level: 70 },
];

export const stack = [
  { name: 'React', icon: 'ti-brand-react' },
  { name: 'Next.js', icon: 'ti-brand-nextjs' },
  { name: 'Node.js', icon: 'ti-brand-nodejs' },
  { name: 'Git', icon: 'ti-brand-git' },
  { name: 'SQL', icon: 'ti-database' },
  { name: 'Tailwind', icon: 'ti-brand-tailwind' },
  { name: 'Python', icon: 'ti-brand-python' },
  { name: 'C++', icon: 'ti-brand-cplusplus' },
];

export const contacts = [
  { label: 'Telegram', icon: 'ti-brand-telegram', url: 'https://t.me/USERNAME' },
  { label: 'GitHub', icon: 'ti-brand-github', url: 'https://github.com/USERNAME' },
  { label: 'Email', icon: 'ti-mail', url: 'mailto:EMAIL' },
];

export const projects = [
  {
    id: 'agency-site',
    title: 'Agency Site',
    desc: 'Лаконичный сайт для студии с акцентом на конверсию, понятную структуру и быстрый первый экран.',
    long:
      'Собрал сайт студии с несколькими сценариями входа, блоками доверия и понятной навигацией. Основной акцент был на скорости, ясной иерархии и контролируемой визуальной плотности.',
    tags: ['React', 'UI', 'Landing'],
    url: 'https://example.com/agency',
    repo: 'https://github.com/USERNAME/agency-site',
    icon: 'ti-building-estate',
    color: '#7c3aed',
    challenge: 'Сделать структуру короткой, но не бедной по смыслу.',
    result: 'Сайт выглядит собранно и помогает быстро пройти к заявке.',
    stack: ['React', 'CSS', 'Forms'],
    features: ['Hero-блок', 'Секция доверия', 'CTA-карточки', 'Адаптивная сетка'],
  },
  {
    id: 'crm-dashboard',
    title: 'CRM Dashboard',
    desc: 'Рабочая панель для внутренних процессов с таблицами, статусами и сводками по задачам.',
    long:
      'Разработал dashboard для операционной работы команды: фильтры, карточки статусов, сводные показатели и компактные экраны для ежедневного использования.',
    tags: ['Dashboard', 'TypeScript', 'Admin'],
    url: 'https://example.com/crm',
    repo: 'https://github.com/USERNAME/crm-dashboard',
    icon: 'ti-layout-dashboard',
    color: '#2563eb',
    challenge: 'Удержать высокую плотность данных без визуального шума.',
    result: 'Интерфейс читается быстро и подходит для регулярной работы.',
    stack: ['React', 'TypeScript', 'Node.js'],
    features: ['Сводные метрики', 'Статусы', 'Табличные списки', 'Модульные карточки'],
  },
  {
    id: 'booking-app',
    title: 'Booking App',
    desc: 'Сервис записи и бронирования с понятными сценариями выбора, подтверждения и обратной связи.',
    long:
      'Собрал приложение для бронирования с цепочкой шагов, минимальными отвлечениями и акцентом на прозрачный процесс подтверждения заявки.',
    tags: ['Product', 'Booking', 'Mobile'],
    url: 'https://example.com/booking',
    repo: 'https://github.com/USERNAME/booking-app',
    icon: 'ti-calendar-event',
    color: '#0f766e',
    challenge: 'Сделать процесс бронирования коротким и предсказуемым.',
    result: 'Пользователь проходит сценарий без лишних решений.',
    stack: ['React', 'Node.js', 'SQL'],
    features: ['Пошаговая форма', 'Подтверждение', 'Список броней', 'Адаптивность'],
  },
];
