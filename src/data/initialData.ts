import { MenuItem, Order, Review } from '../types/restaurant';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Bebek Crispy Panggonan (1/2 Ekor)',
    description: 'Bebek muda ungkep bumbu rempah 12 jam, digoreng garing renyah di luar lembut di dalam. Disajikan lengkap dengan sambal korek ulek, lalapan segar, dan serundeng gurih.',
    category: 'unggasan_daging',
    price: 68000,
    originalPrice: 75000,
    image: '/src/assets/images/panggonan_signature_dish_1794295774678.jpg',
    isAvailable: true,
    stock: 24,
    spicyLevel: 2,
    isChefRecommended: true,
    isHalal: true,
    prepTimeMinutes: 15,
    portionSize: '1-2 Orang',
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: 'm2',
    name: 'Sate Maranggi Sapi Panggonan (10 Tusuk)',
    description: 'Daging sapi tenderloin pilihan dimarinasi ketumbar, gula aren, dan rempah khas. Dibakar arang kelapa dengan olesan kecap legit, disajikan dengan acar tomat hijau dan cabai rawit.',
    category: 'sate_bakaran',
    price: 58000,
    image: '/src/assets/images/panggonan_sate_maranggi_1794295776533.jpg',
    isAvailable: true,
    stock: 18,
    spicyLevel: 1,
    isChefRecommended: true,
    isHalal: true,
    prepTimeMinutes: 12,
    portionSize: '10 Tusuk',
    rating: 4.8,
    reviewsCount: 98
  },
  {
    id: 'm3',
    name: 'Sop Buntut Kuah Rempah Istimewa',
    description: 'Buntut sapi impor direbus perlahan hingga empuk lembut, kuah kaldu sapi bening kaya cengkeh dan kapulaga. Disajikan bersama wortel, kentang, emping melinjo, dan jeruk nipis.',
    category: 'sup_kuah',
    price: 85000,
    originalPrice: 92000,
    image: '/src/assets/images/panggonan_sop_buntut_1794295776801.jpg',
    isAvailable: true,
    stock: 15,
    spicyLevel: 0,
    isChefRecommended: true,
    isHalal: true,
    prepTimeMinutes: 10,
    portionSize: '1 Mangkok Besar',
    rating: 4.9,
    reviewsCount: 116
  },
  {
    id: 'm4',
    name: 'Es Kelapa Kopyor Jeruk Nipis',
    description: 'Daging kelapa kopyor lembut berpadu perasan jeruk nipis segar, sirup gula batu alami, daun mint, selasih, dan pecahan es kristal. Segar melegakan tenggorokan.',
    category: 'minuman',
    price: 25000,
    image: '/src/assets/images/panggonan_es_kelapa_jeruk_1794295776288.jpg',
    isAvailable: true,
    stock: 40,
    spicyLevel: 0,
    isChefRecommended: false,
    isHalal: true,
    prepTimeMinutes: 5,
    portionSize: 'Gelas Jumbo 500ml',
    rating: 4.7,
    reviewsCount: 84
  },
  {
    id: 'm5',
    name: 'Ayam Bakar Madu Panggonan',
    description: 'Ayam kampung bakar empuk berlumur madu hutan murni dan saus rempah manis gurih. Aroma smokey arang kelapa khas dipadu sambal terasi matang.',
    category: 'unggasan_daging',
    price: 52000,
    image: '/src/assets/images/panggonan_signature_dish_1794295774678.jpg',
    isAvailable: true,
    stock: 20,
    spicyLevel: 1,
    isChefRecommended: true,
    isHalal: true,
    prepTimeMinutes: 15,
    portionSize: '1 Paha/Dada Besar',
    rating: 4.8,
    reviewsCount: 76
  },
  {
    id: 'm6',
    name: 'Gurame Terbang Sambal Kecombrang',
    description: 'Ikan gurame segar fillet goreng kipas garing renyah tanpa bau tanah. Disiram cacahan sambal bunga kecombrang wangi aromatik dan perasan jeruk limau.',
    category: 'sate_bakaran',
    price: 78000,
    image: '/src/assets/images/hero_panggonan_resto_1794295774747.jpg',
    isAvailable: true,
    stock: 10,
    spicyLevel: 2,
    isChefRecommended: true,
    isHalal: true,
    prepTimeMinutes: 18,
    portionSize: '600-700 gram',
    rating: 4.9,
    reviewsCount: 63
  },
  {
    id: 'm7',
    name: 'Nasi Liwet Kastrol Komplit Panggonan',
    description: 'Nasi pulen dimasak dengan santan gurih, serai, daun salam, bawang merah utuh, cabai rawit, teri medan goreng, dan pete bakar di dalam panci kastrol tradisional.',
    category: 'unggasan_daging',
    price: 45000,
    image: '/src/assets/images/panggonan_sate_maranggi_1794295776533.jpg',
    isAvailable: true,
    stock: 30,
    spicyLevel: 1,
    isChefRecommended: true,
    isHalal: true,
    prepTimeMinutes: 15,
    portionSize: '2-3 Orang',
    rating: 4.9,
    reviewsCount: 105
  },
  {
    id: 'm8',
    name: 'Tahu Telur Petis Gurih Surabaya',
    description: 'Dadar telur lembut bercampur tahu sutra kotak, disajikan tinggi dengan tauge segar, taburan seledri, kacang tanah goreng, dan siraman bumbu petis udang istimewa.',
    category: 'camilan',
    price: 32000,
    image: '/src/assets/images/panggonan_sop_buntut_1794295776801.jpg',
    isAvailable: true,
    stock: 16,
    spicyLevel: 1,
    isChefRecommended: false,
    isHalal: true,
    prepTimeMinutes: 10,
    portionSize: 'Porsi Sharing',
    rating: 4.6,
    reviewsCount: 44
  },
  {
    id: 'm9',
    name: 'Bakwan Jagung Manis Renyah (4 Pcs)',
    description: 'Bakwan renyah dengan butiran jagung manis pipil segar, daun bawang, dan bumbu rempah tradisional. Renyah tahan lama, disajikan dengan cabai rawit hijau.',
    category: 'camilan',
    price: 24000,
    image: '/src/assets/images/panggonan_signature_dish_1794295774678.jpg',
    isAvailable: true,
    stock: 25,
    spicyLevel: 0,
    isChefRecommended: false,
    isHalal: true,
    prepTimeMinutes: 8,
    portionSize: '4 Buah Besar',
    rating: 4.7,
    reviewsCount: 52
  },
  {
    id: 'm10',
    name: 'Es Cendol Nangka Gula Aren Organik',
    description: 'Cendol tepung beras pandan suji asli berpadu santan kental gurih, irisan nangka manis wangi, dan sirup gula aren murni pekat dengan es serut halus.',
    category: 'dessert',
    price: 22000,
    image: '/src/assets/images/panggonan_es_kelapa_jeruk_1794295776288.jpg',
    isAvailable: true,
    stock: 35,
    spicyLevel: 0,
    isChefRecommended: false,
    isHalal: true,
    prepTimeMinutes: 5,
    portionSize: '1 Mangkok Kaca',
    rating: 4.8,
    reviewsCount: 71
  },
  {
    id: 'm11',
    name: 'Wedang Ronde Jahe Wangi Solo',
    description: 'Sup jahe merah hangat membakar tenggorokan berisi bulatan ronde kenyal isi pasta kacang tumbuk manis, kolang-kaling empuk, dan taburan kacang tanah sangrai.',
    category: 'dessert',
    price: 26000,
    image: '/src/assets/images/panggonan_sop_buntut_1794295776801.jpg',
    isAvailable: true,
    stock: 18,
    spicyLevel: 0,
    isChefRecommended: false,
    isHalal: true,
    prepTimeMinutes: 7,
    portionSize: '1 Mangkok Keramik Hangat',
    rating: 4.7,
    reviewsCount: 39
  },
  {
    id: 'm12',
    name: 'Jus Alpukat Kocok Kental Espresso',
    description: 'Alpukat mentega matang pohon dikocok lembut dengan susu kental manis cokelat dan sentuhan single shot espresso aromatik Panggonan.',
    category: 'minuman',
    price: 28000,
    image: '/src/assets/images/panggonan_es_kelapa_jeruk_1794295776288.jpg',
    isAvailable: true,
    stock: 20,
    spicyLevel: 0,
    isChefRecommended: true,
    isHalal: true,
    prepTimeMinutes: 6,
    portionSize: 'Gelas Kaca 450ml',
    rating: 4.9,
    reviewsCount: 88
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: '#PG-8821',
    tableNumber: 'Meja 05',
    orderType: 'dine_in',
    customerName: 'Bima Santoso',
    customerPhone: '081289123456',
    items: [
      {
        id: 'c1',
        menuItem: INITIAL_MENU_ITEMS[0],
        quantity: 1,
        spicyLevel: 2,
        notes: 'Sambal minta dipisah, bebek agak garing.',
        itemTotal: 68000
      },
      {
        id: 'c2',
        menuItem: INITIAL_MENU_ITEMS[3],
        quantity: 2,
        spicyLevel: 0,
        notes: 'Es batu sedikit saja.',
        itemTotal: 50000
      }
    ],
    subtotal: 118000,
    tax: 11800,
    serviceFee: 5900,
    discount: 0,
    total: 135700,
    paymentMethod: 'qris',
    paymentStatus: 'paid',
    orderStatus: 'cooking',
    createdAt: new Date(Date.now() - 1000 * 60 * 11).toISOString(), // 11 mins ago
    estimatedMinutes: 15
  },
  {
    id: 'ord-102',
    orderNumber: '#PG-8822',
    tableNumber: 'Meja 08',
    orderType: 'dine_in',
    customerName: 'Siti Rahmawati',
    customerPhone: '085712998811',
    items: [
      {
        id: 'c3',
        menuItem: INITIAL_MENU_ITEMS[1],
        quantity: 2,
        spicyLevel: 1,
        notes: 'Banyakin acar tomat hijau.',
        itemTotal: 116000
      },
      {
        id: 'c4',
        menuItem: INITIAL_MENU_ITEMS[2],
        quantity: 1,
        spicyLevel: 0,
        notes: 'Kuah panas mendidih.',
        itemTotal: 85000
      },
      {
        id: 'c5',
        menuItem: INITIAL_MENU_ITEMS[9],
        quantity: 2,
        spicyLevel: 0,
        notes: 'Manis sedang.',
        itemTotal: 44000
      }
    ],
    subtotal: 245000,
    tax: 24500,
    serviceFee: 12250,
    discount: 15000,
    promoCode: 'PANGGONANHEMAT',
    total: 266750,
    paymentMethod: 'gopay',
    paymentStatus: 'paid',
    orderStatus: 'ready',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
    estimatedMinutes: 18
  },
  {
    id: 'ord-103',
    orderNumber: '#PG-8823',
    tableNumber: 'Meja 12 (VIP)',
    orderType: 'dine_in',
    customerName: 'Hendra Wijaya',
    customerPhone: '081333444555',
    items: [
      {
        id: 'c6',
        menuItem: INITIAL_MENU_ITEMS[2],
        quantity: 2,
        spicyLevel: 0,
        notes: 'Buntut pilih yang banyak dagingnya.',
        itemTotal: 170000
      },
      {
        id: 'c7',
        menuItem: INITIAL_MENU_ITEMS[6],
        quantity: 1,
        spicyLevel: 1,
        notes: 'Pete dipisah mangkok kecil.',
        itemTotal: 45000
      }
    ],
    subtotal: 215000,
    tax: 21500,
    serviceFee: 10750,
    discount: 0,
    total: 247250,
    paymentMethod: 'cashier',
    paymentStatus: 'unpaid',
    orderStatus: 'received',
    createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(), // 4 mins ago
    estimatedMinutes: 16
  },
  {
    id: 'ord-104',
    orderNumber: '#PG-8820',
    tableNumber: 'Takeaway #03',
    orderType: 'takeaway',
    customerName: 'Dewi Lestari',
    customerPhone: '081809091212',
    items: [
      {
        id: 'c8',
        menuItem: INITIAL_MENU_ITEMS[0],
        quantity: 2,
        spicyLevel: 3,
        notes: 'Sambal ekstra di cup terpisah.',
        itemTotal: 136000
      }
    ],
    subtotal: 136000,
    tax: 13600,
    serviceFee: 6800,
    discount: 0,
    total: 156400,
    paymentMethod: 'dana',
    paymentStatus: 'paid',
    orderStatus: 'served',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    estimatedMinutes: 15,
    isReviewed: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Rian Prasetyo',
    rating: 5,
    comment: 'Bebek Crispy-nya juara banget! Bumbunya meresap sampai ke tulang, sambal koreknya nendang pedas segar. Suasana joglo Panggonan bikin betah kumpul keluarga.',
    dishName: 'Bebek Crispy Panggonan (1/2 Ekor)',
    createdAt: 'Hari ini, 13:20',
    tableNumber: 'Meja 08',
    verifiedDineIn: true
  },
  {
    id: 'rev-2',
    customerName: 'Anindita Putri',
    rating: 5,
    comment: 'Sop Buntut kuahnya kaya rempah dan daging buntutnya super lembut ga perlu tenaga buat ngunyah. Pesan lewat HP dari meja sangat praktis langsung scan QRIS selesai.',
    dishName: 'Sop Buntut Kuah Rempah Istimewa',
    createdAt: 'Hari ini, 14:05',
    tableNumber: 'Meja 04',
    verifiedDineIn: true
  },
  {
    id: 'rev-3',
    customerName: 'Dimas Ardiansyah',
    rating: 5,
    comment: 'Sate Maranggi empuk manis gurihnya pas, dipadu acar tomat hijaunya segar pol. Es Kelapa Kopyor Jeruk Nipis bikin adem cuaca panas.',
    dishName: 'Sate Maranggi Sapi Panggonan (10 Tusuk)',
    createdAt: 'Kemarin, 19:40',
    tableNumber: 'Meja VIP 2',
    verifiedDineIn: true
  }
];

export const RESTAURANT_INFO = {
  name: 'Panggonan Resto',
  tagline: 'Cita Rasa Nusantara dalam Kehangatan Tradisi',
  address: 'Jl. Raya Panggonan No. 88, Kuliner Nusantara',
  city: 'Yogyakarta / Solo',
  phone: '+62 812-3456-7890',
  instagram: '@panggonanresto',
  website: 'https://panggonanresto.com',
  openHours: '10:00 - 22:00 WIB',
  qrisMerchantId: 'ID10203040506070PANGGONAN',
  taxRate: 0.10, // 10% PB1
  serviceFeeRate: 0.05 // 5% Service charge
};
