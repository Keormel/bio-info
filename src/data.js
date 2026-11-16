export const bio = {
  name: 'Keormel',
  avatar: 'image/avatar.jpg',
  role: 'Full-stack developer',
  about:
    'Привет! Я Keormel, увлечённый full-stack разработчик с опытом в создании веб-приложений и ботов. Мой путь в программировании начался с Python, и с тех пор я расширил свои навыки, освоив React, Node.js и другие технологии. Я люблю создавать проекты, которые решают реальные проблемы и приносят пользу пользователям. Способен выполнить любую задачу и быстро разобраться в новых технологиях.',
  status: 'Открыт к работе',
  location: 'Кишинёв, MD',
  localTimeGif: 'https://i.imgur.com/JX2KebW.gif',
  birthDate: '2007-01-16',
  stats: {
    experience: '3+',
    projects: '19+',
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
    id: 'safecall',
    title: 'SafeCall',
    desc: 'Платформа защиты от телефонных мошенников: мобильное приложение, серверная аналитика рисков и админ-панель.',
    long:
      'Полноценная платформа для борьбы с телефонным мошенничеством. Android-приложение проверяет входящие номера по локальной базе, сервер агрегирует отчёты пользователей в оценки риска и кампании мошенников, а LLM-движок (Gemini) создаёт цифровые отпечатки жалоб.',
    tags: ['Python', 'Flutter', 'React', 'Docker'],
    repo: 'https://github.com/Keormel/SafeCall',
    date: '2026',
    icon: 'ti-shield-check',
    color: '#16a34a',
    challenge: 'Объединить мобильное приложение, серверную аналитику и админ-панель в единую систему с оффлайн-базой и delta-синхронизацией.',
    result: 'Приложение работает без интернета благодаря локальной базе номеров, сервер агрегирует отчёты в реальном времени, а LLM автоматически классифицирует мошеннические кампании.',
    stack: ['FastAPI', 'Flutter', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Gemini API', 'Alembic'],
    features: ['Проверка номеров в реальном времени', 'Оффлайн-база с delta-синхронизацией', 'LLM-классификация мошенничества', 'Админ-панель на React', 'Docker Compose стек', 'REST API с Swagger'],
  },
  {
    id: 'fusion-forensics',
    title: 'Fusion Forensics',
    desc: 'C++ агент сбора криминалистической телеметрии для серверов Garry\'s Mod с WebView2-интерфейсом.',
    long:
      'Десктопный агент на C++ для сбора артефактов и следов присутствия в ОС. Агент собирает факты, а сервер-парсер принимает решение на основе базы хэшей и сигнатур. Интерфейс реализован через WebView2 — одна HTML-страница, вшитая в exe.',
    tags: ['C++', 'WebView2', 'Anti-Cheat'],
    repo: 'https://github.com/Keormel/CheckForFusionRP',
    date: '2026',
    logo: '/image/projects/fusion-mark.svg',
    logoBackground: '#0A0911',
    logoFit: 'contain',
    challenge: 'Создать надёжный инструмент сбора телеметрии без сигнатурного поиска в памяти, с защитой от подмены отчётов.',
    result: 'Агент с подписью отчётов, детектами в реальном времени, хронологией и экспортом вердикта в формате Discord-тикетов.',
    stack: ['C++', 'WebView2', 'HTML/CSS/JS', 'Win32 API'],
    features: ['Сбор телеметрии ОС', 'WebView2 интерфейс', 'Подпись отчётов', 'Поиск в памяти', 'Экспорт для Discord', 'Хронология событий'],
  },
  {
    id: 'voice-assistant',
    title: 'Voice Assistant Gemini',
    desc: 'Десктопный ИИ-ассистент: слушает звук на ПК, распознаёт речь локально и отвечает через Google Gemini.',
    long:
      'Программа слушает системный звук или микрофон, переводит речь в текст через faster-whisper (локально, без отправки звука) и задаёт вопросы Google Gemini. Ответ появляется в полупрозрачном окне поверх других программ — удобно на лекциях, созвонах и в играх.',
    tags: ['Python', 'AI', 'Whisper', 'Gemini'],
    repo: 'https://github.com/Keormel/voice-assistant-gemini',
    date: '2026',
    logo: '/image/projects/voice-assistant.png',
    challenge: 'Реализовать распознавание речи локально без отправки аудио, с минимальной задержкой и поддержкой системного звука.',
    result: 'Работает на всех ОС, распознаёт речь локально через faster-whisper, поддерживает скриншоты экрана, файлы и три режима отправки.',
    stack: ['Python', 'faster-whisper', 'Gemini API', 'PyQt/PySide', 'PortAudio'],
    features: ['Локальное распознавание речи', 'Анализ скриншотов экрана', 'Прикрепление файлов', 'Полупрозрачное окно поверх других', 'Автоопределение языка', 'Сборка в exe'],
  },
  {
    id: 'filecompression',
    title: 'FileCompression',
    desc: 'Система сжатия и передачи файлов в локальной сети с собственными алгоритмами Huffman, LZW и RLE.',
    long:
      'Курсовой проект: система сжатия файлов без потерь с веб-интерфейсом. Алгоритмы реализованы вручную, без сторонних библиотек. Работает на Raspberry Pi — загружаете файл с одного устройства, сервер сжимает и выдаёт ссылку с QR-кодом для скачивания.',
    tags: ['Python', 'C', 'Docker', 'Web'],
    repo: 'https://github.com/Keormel/FileCompression',
    date: '2026',
    icon: 'ti-file-zip',
    color: '#ea580c',
    challenge: 'Реализовать три алгоритма сжатия вручную с потоковой обработкой файлов любого размера.',
    result: 'Собственный контейнер FCMP v2 с блочным сжатием, C-расширения в 7–10x быстрее Python, Docker-образы под ARM и x86.',
    stack: ['Python', 'C', 'FastAPI', 'React', 'Docker', 'SHA-256'],
    features: ['Huffman, LZW, RLE алгоритмы', 'Потоковая обработка без лимита размера', 'C-расширения для скорости', 'QR-коды для передачи', 'Docker под Raspberry Pi', 'CLI, GUI и веб-интерфейс'],
  },
  {
    id: 'car-service-landing',
    title: 'Aleks-Blitz Landing',
    desc: 'Современный адаптивный лендинг для премиального автосервиса с SEO-оптимизацией и анимациями.',
    long:
      'Лендинг для автосервиса Aleks-Blitz: адаптивный дизайн, плавные анимации через Framer Motion, полная SEO-оптимизация с Open Graph, JSON-LD, sitemap и robots.txt.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    url: 'https://car-service-landing-eight.vercel.app',
    repo: 'https://github.com/Keormel/CarServiceLanding',
    date: '2026',
    icon: 'ti-car',
    color: '#2563eb',
    challenge: 'Создать быстрый и визуально привлекательный лендинг с полной SEO-оптимизацией для поисковых систем.',
    result: 'Лендинг с идеальными метриками Lighthouse, структурированными данными и адаптивным дизайном на всех устройствах.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    features: ['Адаптивный дизайн', 'Framer Motion анимации', 'SEO: Open Graph, JSON-LD', 'Sitemap и robots.txt', 'Оптимизация производительности'],
  },
  {
    id: 'youtube-autoupload',
    title: 'YouTube Shorts Auto-Uploader',
    desc: 'Telegram-бот для массовой автозагрузки видео в YouTube Shorts с автонарезкой и расписанием.',
    long:
      'Telegram-бот, который автоматизирует публикацию контента на YouTube Shorts. Принимает видео, нарезает на отрезки по 59 секунд, загружает параллельно на несколько каналов по расписанию.',
    tags: ['Python', 'YouTube API', 'Telegram'],
    repo: 'https://github.com/Keormel/youtube_autoupload',
    date: '2026',
    icon: 'ti-brand-youtube',
    color: '#dc2626',
    challenge: 'Автоматизировать полный цикл публикации — от загрузки видео до параллельной выкладки на несколько каналов.',
    result: 'Бот нарезает длинные видео на shorts, управляет очередью загрузки и публикует на все каналы одновременно.',
    stack: ['Python', 'YouTube Data API', 'Telegram Bot API', 'FFmpeg'],
    features: ['Автонарезка на 59-сек shorts', 'Параллельная загрузка на каналы', 'Умная очередь', 'Загрузка по расписанию', 'Управление через Telegram'],
  },
  {
    id: 'orsted-website',
    title: 'Orsted Website',
    desc: 'Сайт для Minecraft-сервера с интеграцией Discord, управлением аккаунтами и новостями.',
    long:
      'Создал сайт для Minecraft-сервера Orsted с системой регистрации и управления аккаунтами игроков, интеграцией с Discord и лентой новостей сервера.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    url: 'https://mtminecraft.online/',
    repo: 'https://github.com/Keormel/Orstedwebsite',
    date: '2026',
    logo: '/image/OrstedLogo.jpg',
    challenge: 'Создать удобный интерфейс для управления аккаунтами игроков с интеграцией в Discord.',
    result: 'Игроки регистрируются, просматривают достижения и взаимодействуют с сообществом через единый интерфейс.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Discord API'],
    features: ['Регистрация и управление аккаунтом', 'Интеграция с Discord', 'Просмотр достижений', 'Новости и обновления сервера'],
  },
];
