import { assets } from './assets';

export type NavLink = { label: string; href: string; hasMenu?: boolean };

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Produk', href: '#produk', hasMenu: true },
  { label: 'Artikel & Berita', href: '#artikel' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Hubungi Kami', href: '#kontak' },
];

/** Brand names shown in the social-proof marquee (placeholders in Figma). */
export const partnerBrands = ['Logoipsum', 'IPSUM', 'LOQO', 'Logoipsum', 'Logoipsum', 'LUM', 'IPSUM', 'LOQO'];

export type Product = {
  id: string;
  category: string;
  name: string;
  description: string;
  image: string;
  tags: { label: string; tone: 'red' | 'blue' }[];
  href: string;
};

const sampleProduct: Omit<Product, 'id'> = {
  category: 'Spectrophotometry System',
  name: 'SUV-1200 Series UV-Vis Double Beam',
  description:
    'Spektrofotometer berkas ganda dengan layar sentuh 10,1 inci dan memori internal 1024 MB untuk pengujian mandiri tanpa PC.',
  image: assets.productImage,
  tags: [
    { label: 'TKDN 40,36%', tone: 'red' },
    { label: 'e-Katalog', tone: 'blue' },
  ],
  href: '#produk',
};

export const featuredProducts: Product[] = Array.from({ length: 6 }, (_, i) => ({
  id: `product-${i + 1}`,
  ...sampleProduct,
}));

export const stats = [
  { value: '10+ Tahun', label: 'Pengalaman Industri' },
  { value: '150+', label: 'Mitra Lab & Riset' },
  { value: '40%+', label: 'Sertifikasi TKDN' },
];

export type FeatureIcon = 'seal-check' | 'target' | 'wrench' | 'stack';

export const coreValues: { icon: FeatureIcon; title: string; description: string }[] = [
  {
    icon: 'seal-check',
    title: 'Sertifikasi TKDN Resmi',
    description: 'Mendukung kelancaran pengadaan instrumen berstandar TKDN untuk riset dan industri.',
  },
  {
    icon: 'target',
    title: 'Akurasi & Presisi Tinggi',
    description: 'Teknologi optik mutakhir untuk menjamin konsistensi dan validitas hasil pengujian.',
  },
  {
    icon: 'wrench',
    title: 'Dukungan Purna Jual',
    description: 'Garansi resmi, instalasi, kalibrasi, dan pendampingan oleh teknisi bersertifikat.',
  },
  {
    icon: 'stack',
    title: 'Ekosistem Terintegrasi',
    description: 'Solusi utuh perangkat analitikal, software olah data, hingga sistem proteksi daya.',
  },
];

export type Article = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
};

export const latestArticles: Article[] = Array.from({ length: 3 }, (_, i) => ({
  id: `article-${i + 1}`,
  category: 'Regulasi & TKDN',
  title: 'Cara Mengoptimalkan Akurasi Pengukuran Spektrofotometer UV-Vis',
  excerpt: 'Langkah-langkah praktis menjaga kestabilan optik dan presisi pengujian sampel harian Anda.',
  date: '12 Mei 2026',
  readTime: '4 min',
  image: assets.articleImage,
  href: '#artikel',
}));

export const company = {
  name: 'PT Adhya Waris Saintifik',
  tagline:
    'Distributor resmi instrumen laboratorium analitikal terpercaya dan pengembang produk bersertifikasi TKDN di Indonesia.',
  address: 'Ruko Arya Kemuning Blok A No. 4, Cilodong, Kota Depok, Jawa Barat 16415',
  phone: '+62 21 38741115',
  email: 'info@adhyawaris.co.id',
  website: 'www.adhyawaris.co.id',
};

export const footerLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Produk', href: '#produk' },
  { label: 'Artikel & Berita', href: '#artikel' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Hubungi Kami', href: '#kontak' },
];

export const socialLinks = [
  { label: 'Tiktok', href: 'https://www.tiktok.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];
