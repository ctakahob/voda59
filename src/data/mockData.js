// Моковые данные для продуктов воды "Новолядская Вода"

export const waterProducts = [
  {
    id: 1,
    name: "Новолядская Родниковая 0.5л",
    description: "Кристально чистая родниковая вода из экологически чистых источников Новолядских гор. Обладает уникальным минеральным составом и мягким вкусом.",
    price: 45,
    category: "питьевая",
    volume: "0.5л",
    image: "/images/water-bottle-500ml.jpg",
    images: [
      "/images/water-bottle-500ml.jpg",
      "/images/water-bottle-500ml-2.jpg",
      "/images/water-bottle-500ml-3.jpg"
    ],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    featured: true,
    specifications: {
      mineralContent: "Умеренная минерализация",
      ph: "7.2-7.6",
      hardness: "Мягкая",
      source: "Артезианская скважина №1",
    },
    benefits: [
      "Природная минерализация",
      "Без искусственных добавок",
      "Экологически чистый источник",
      "Идеально для ежедневного употребления"
    ]
  },
  {
    id: 2,
    name: "Новолядская Родниковая 1.5л",
    description: "Семейная упаковка родниковой воды. Идеально подходит для домашнего использования и приготовления пищи.",
    price: 75,
    category: "питьевая",
    volume: "1.5л",
    image: "/images/water-bottle-1500ml.jpg",
    images: [
      "/images/water-bottle-1500ml.jpg",
      "/images/water-bottle-1500ml-2.jpg"
    ],
    rating: 4.9,
    reviews: 243,
    inStock: true,
    featured: true,
    specifications: {
      mineralContent: "Умеренная минерализация",
      ph: "7.2-7.6",
      hardness: "Мягкая",
      source: "Артезианская скважина №1",
    },
    benefits: [
      "Экономичная упаковка",
      "Удобная для хранения",
      "Высокое качество",
      "Семейный размер"
    ]
  },
  {
    id: 3,
    name: "Новолядская Газированная 0.5л",
    description: "Освежающая газированная вода с естественной карбонизацией. Прекрасно утоляет жажду и освежает в жаркий день.",
    price: 55,
    category: "газированная",
    volume: "0.5л",
    image: "/images/sparkling-water-500ml.jpg",
    images: [
      "/images/sparkling-water-500ml.jpg",
      "/images/sparkling-water-500ml-2.jpg"
    ],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    featured: false,
    specifications: {
      mineralContent: "Умеренная минерализация",
      ph: "7.0-7.4",
      hardness: "Мягкая",
      source: "Артезианская скважина №2",
      carbonation: "Естественная"
    },
    benefits: [
      "Естественная газация",
      "Освежающий вкус",
      "Помогает пищеварению",
      "Без консервантов"
    ]
  },
  {
    id: 4,
    name: "Новолядская Детская 0.33л",
    description: "Специально разработанная вода для детей. Имеет оптимальный минеральный состав для растущего организма.",
    price: 40,
    category: "детская",
    volume: "0.33л",
    image: "/images/kids-water-330ml.jpg",
    images: [
      "/images/kids-water-330ml.jpg",
      "/images/kids-water-330ml-2.jpg"
    ],
    rating: 4.9,
    reviews: 178,
    inStock: true,
    featured: true,
    specifications: {
      mineralContent: "Низкая минерализация",
      ph: "6.8-7.2",
      hardness: "Очень мягкая",
      source: "Специальная детская скважина",
    },
    benefits: [
      "Безопасна для детей с рождения",
      "Сбалансированный состав",
      "Удобная детская упаковка",
      "Педиатрически протестирована"
    ]
  },
  {
    id: 5,
    name: "Новолядская Спортивная 0.75л",
    description: "Обогащенная электролитами вода для активных людей. Помогает восстановить водно-солевой баланс после тренировок.",
    price: 85,
    category: "спортивная",
    volume: "0.75л",
    image: "/images/sport-water-750ml.jpg",
    images: [
      "/images/sport-water-750ml.jpg",
      "/images/sport-water-750ml-2.jpg"
    ],
    rating: 4.7,
    reviews: 134,
    inStock: true,
    featured: false,
    specifications: {
      mineralContent: "Повышенная минерализация",
      ph: "7.4-7.8",
      hardness: "Средняя",
      source: "Минеральная скважина №3",
      electrolytes: "Натрий, Калий, Магний"
    },
    benefits: [
      "Обогащена электролитами",
      "Быстрое восстановление",
      "Идеально после тренировок",
      "Поддерживает энергию"
    ]
  },
  {
    id: 6,
    name: "Новолядская Бутыль 19л",
    description: "Большой объем для офисов и домов. Используется с кулерами и помпами. Экономичное решение для большого потребления.",
    price: 420,
    category: "бутыль",
    volume: "19л",
    image: "/images/water-bottle-19l.jpg",
    images: [
      "/images/water-bottle-19l.jpg",
      "/images/water-bottle-19l-2.jpg"
    ],
    rating: 4.8,
    reviews: 267,
    inStock: true,
    featured: true,
    specifications: {
      mineralContent: "Умеренная минерализация",
      ph: "7.2-7.6",
      hardness: "Мягкая",
      source: "Артезианская скважина №1",
    },
    benefits: [
      "Экономичное решение",
      "Для кулеров и помп",
      "Долгий срок хранения",
      "Удобно для офиса"
    ]
  },
  {
    id: 7,
    name: "Новолядская Премиум 0.33л (стекло)",
    description: "Премиальная линейка в стеклянной упаковке. Сохраняет первозданный вкус и чистоту воды.",
    price: 120,
    category: "премиум",
    volume: "0.33л",
    image: "/images/premium-glass-330ml.jpg",
    images: [
      "/images/premium-glass-330ml.jpg",
      "/images/premium-glass-330ml-2.jpg"
    ],
    rating: 4.9,
    reviews: 95,
    inStock: true,
    featured: false,
    specifications: {
      mineralContent: "Премиум минерализация",
      ph: "7.3-7.7",
      hardness: "Мягкая",
      source: "Эксклюзивная скважина",
      packaging: "Стекло"
    },
    benefits: [
      "Стеклянная упаковка",
      "Премиальное качество",
      "Сохраняет вкус",
      "Экологически чистая"
    ]
  },
  {
    id: 8,
    name: "Новолядская Лечебная 0.5л",
    description: "Лечебно-столовая минеральная вода с повышенным содержанием полезных минералов. Рекомендована для профилактики заболеваний.",
    price: 95,
    category: "лечебная",
    volume: "0.5л",
    image: "/images/medical-water-500ml.jpg",
    images: [
      "/images/medical-water-500ml.jpg",
      "/images/medical-water-500ml-2.jpg"
    ],
    rating: 4.5,
    reviews: 67,
    inStock: true,
    featured: false,
    specifications: {
      mineralContent: "Высокая минерализация",
      ph: "7.8-8.2",
      hardness: "Жесткая",
      source: "Лечебная скважина №1",
      minerals: "Ca, Mg, HCO3, SO4"
    },
    benefits: [
      "Лечебные свойства",
      "Богата минералами",
      "Медицинские показания",
      "Натуральный состав"
    ]
  }
];

export const categories = [
  { id: 'all', name: 'Все категории', count: waterProducts.length },
  { id: 'питьевая', name: 'Питьевая вода', count: waterProducts.filter(p => p.category === 'питьевая').length },
  { id: 'газированная', name: 'Газированная', count: waterProducts.filter(p => p.category === 'газированная').length },
  { id: 'детская', name: 'Детская', count: waterProducts.filter(p => p.category === 'детская').length },
  { id: 'спортивная', name: 'Спортивная', count: waterProducts.filter(p => p.category === 'спортивная').length },
  { id: 'бутыль', name: 'Бутыли', count: waterProducts.filter(p => p.category === 'бутыль').length },
  { id: 'премиум', name: 'Премиум', count: waterProducts.filter(p => p.category === 'премиум').length },
  { id: 'лечебная', name: 'Лечебная', count: waterProducts.filter(p => p.category === 'лечебная').length },
];

// Отзывы покупателей
export const testimonials = [
  {
    id: 1,
    name: "Анна Петрова",
    rating: 5,
    comment: "Заказываю Новолядскую воду уже больше года. Качество отличное, доставка быстрая!",
    date: "2024-01-15",
    verified: true
  },
  {
    id: 2,
    name: "Михаил Сидоров",
    rating: 5,
    comment: "Вода действительно вкусная и чистая. Особенно нравится детская линейка для малыша.",
    date: "2024-01-10",
    verified: true
  },
  {
    id: 3,
    name: "Елена Козлова",
    rating: 4,
    comment: "Отличный сервис доставки. Вода всегда свежая, упаковка качественная.",
    date: "2024-01-08",
    verified: true
  }
];

// Информация о компании (обновлено с реального сайта voda59.ru)
export const companyInfo = {
  name: "Ново-Лядовская артезианская вода",
  founded: "2010",
  description: "Мы добываем воду из артезианской скважины, с глубины 74 метра. Сама природа несколько веков создавала это уникальное месторождение живой воды, что обеспечило нашу воду кристальной чистотой и уникальным набором минеральных веществ.",
  mission: "Обеспечить сохранность уникального природного состава и природного вкуса воды. Вода сохраняет в себе все самое лучшее от природы: полезные для человека минеральные вещества, такие как магний, йод, селен, фтор, кальций и серебро.",
  location: "Месторождение уникальной природной воды расположено в экологической зоне недалеко от Перми, в поселке Новые Ляды.",
  awards: "Вода награждена 29 медалями за вкус и качество на международных выставках.",
  features: [
    {
      title: "Экологическая защита",
      description: "Месторождение защищено тремя поясами санитарной зоны. 30-ти метровый водозащитный глиняный горизонт полностью защищает скважину от внешних воздействий."
    },
    {
      title: "Природная фильтрация",
      description: "Пласты земной коры (74 метра) на протяжении многих веков фильтруют и защищают месторождение воды, обеспечивая ее кристальную чистоту."
    },
    {
      title: "Доставка по краю",
      description: "Доставляем в любую точку Пермского края, с 8 утра до 8 вечера. Наши машины оборудованы термокамерами для поддержания оптимальной температуры."
    },
    {
      title: "Минеральный состав",
      description: "Уникальный набор микро и макро элементов: серебро, йод, селен, кальций, магний и другие полезные минералы."
    }
  ],
  depth: "74 метра",
  protection: "Три пояса санитарной зоны",
  workingHours: "8:00 - 20:00 (прием заказов на следующий день)",
  deliveryArea: "Пермский край",
  certifications: [
    "29 международных медалей за вкус и качество",
    "Санитарно-эпидемиологическое заключение",
    "Сертификат соответствия ЕАЭС",
    "Экологический сертификат"
  ]
};