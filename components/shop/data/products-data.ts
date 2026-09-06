export interface ProductDetailData {
  id: string;
  brand: string;
  brandAvatarText: string;
  brandRating: string;
  title: string;
  rating: number;
  reviewScore?: number;
  reviewCount: number;
  boughtBadge?: string;
  stockBadge?: string;
  price: string;
  originalPrice?: string;
  discountBadge?: string;
  colors?: { id: string; label: string; available: boolean }[];
  sizes: { id: string; label: string; available: boolean }[];
  descriptionParagraphs: string[];
  externalLinkText?: string;
  galleryImages: { id: string; alt: string; url: string }[];
  customerPhotos: string[];
  reviews: {
    id: string;
    author: string;
    date: string;
    avatarBg: string;
    avatarInitial: string;
    rating: number;
    text: string;
    size?: string;
    helpfulCount?: number;
  }[];
}

export const PRODUCT_DETAILS_DATABASE: Record<string, ProductDetailData> = {
  "womens-ribbed-henley-tan": {
    id: "womens-ribbed-henley-tan",
    brand: "FLAG NOR FAIL",
    brandAvatarText: "FNF",
    brandRating: "4.9 ★ (19.4K)",
    title: "WOMENS RIBBED HENLEY - TAN",
    rating: 5,
    reviewScore: 4.7,
    reviewCount: 32,
    price: "BDT 4,200.00",
    originalPrice: "BDT 6,000.00",
    discountBadge: "30% off",
    sizes: [
      { id: "small", label: "SMALL", available: true },
      { id: "medium", label: "MEDIUM", available: true },
      { id: "large", label: "LARGE", available: true },
    ],
    descriptionParagraphs: [
      "Designed for everyday wear with endless possibilities, our new Women's Henley's is a staple piece for any closet. Crafted from our premium, lightweight ribbed material (also used in our Women's Ribbed Athletic Collection) these Henley's fea...",
      "ture a flattering contoured fit, custom tonal buttons, and an embroidered sleeve emblem. Perfect for casual layering or athletic downtime., Designed for everyday wear with endless possibilities, our new Women's Henley's is a staple piece for any closet. Crafted from our premium, lightweight ribbed material (also used in our Women's Ribbed Athletic Collection) these Henley's fea...",
      "ture a flattering contoured fit, custom tonal buttons, and an embroidered sleeve emblem. Perfect for casual layering or athletic downtime. Designed for everyday wear with endless possibilities, our new Women's Henley's is a staple piece for any closet. Crafted from our premium, lightweight ribbed material (also used in our Women's Ribbed Athletic Collection) these Henley's fea...",
      "ture a flattering contoured fit, custom tonal buttons, and an embroidered sleeve emblem. Perfect for casual layering or athletic downtime.",
    ],
    galleryImages: [
      {
        id: "fnf-1",
        alt: "Womens Ribbed Henley Tan Profile",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "fnf-2",
        alt: "Womens Ribbed Henley Tan Back View",
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "fnf-3",
        alt: "Womens Ribbed Henley Tan Side Standing",
        url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "fnf-4",
        alt: "Womens Ribbed Henley Tan Arm Patch Detail",
        url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "fnf-5",
        alt: "Womens Ribbed Henley Tan Fabric Close-Up",
        url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "fnf-6",
        alt: "Womens Ribbed Henley Tan Neckline Detail",
        url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "fnf-7",
        alt: "Womens Ribbed Henley Tan Hem Detail",
        url: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "fnf-8",
        alt: "Womens Ribbed Henley Tan Full Outfit",
        url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop&q=80",
      },
    ],
    customerPhotos: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&auto=format&fit=crop&q=80",
    ],
    reviews: [
      {
        id: "r1",
        author: "Cacie",
        date: "June 29, 2026",
        avatarBg: "bg-emerald-100 text-emerald-800",
        avatarInitial: "C",
        rating: 5,
        size: "SMALL",
        helpfulCount: 12,
        text: "Snug but still comfortable. I missed the blurb that said size up.",
      },
      {
        id: "r2",
        author: "Sheryn",
        date: "July 11, 2026",
        avatarBg: "bg-emerald-100 text-emerald-800",
        avatarInitial: "S",
        rating: 5,
        size: "LARGE",
        helpfulCount: 8,
        text: "I love the quality of your clothing.",
      },
      {
        id: "r3",
        author: "Sophie",
        date: "June 5, 2026",
        avatarBg: "bg-emerald-100 text-emerald-800",
        avatarInitial: "S",
        rating: 5,
        size: "MEDIUM",
        helpfulCount: 15,
        text: "Buttery soft, well-made, amazing fit. New favorite shirt. Love, love, love!",
      },
      {
        id: "r4",
        author: "Brittany K.",
        date: "September 02, 2026",
        avatarBg: "bg-amber-100 text-amber-800",
        avatarInitial: "B",
        rating: 5,
        size: "MEDIUM",
        helpfulCount: 9,
        text: "The ribbed material is unmatched. Incredibly soft, stretchy, and the tan color is so versatile!",
      },
      {
        id: "r5",
        author: "Amanda R.",
        date: "May 18, 2026",
        avatarBg: "bg-blue-100 text-blue-800",
        avatarInitial: "A",
        rating: 4,
        size: "SMALL",
        helpfulCount: 4,
        text: "Great quality top. Fits true to size if you like a fitted look with thumbholes.",
      },
    ],
  },
  "daydream-long-sleeve": {
    id: "daydream-long-sleeve",
    brand: "Born Primitive",
    brandAvatarText: "BP",
    brandRating: "4.8 ★ (120.9K)",
    title: "Daydream Long Sleeve (Black)",
    rating: 5,
    reviewCount: 44,
    boughtBadge: "100+ bought in past month",
    stockBadge: "Only 3 left",
    price: "BDT 3,300.00",
    originalPrice: "BDT 6,600.00",
    discountBadge: "50% off",
    sizes: [
      { id: "xs", label: "X-Small", available: false },
      { id: "s", label: "Small", available: true },
      { id: "m", label: "Medium", available: true },
      { id: "l", label: "Large", available: true },
      { id: "xl", label: "X-Large", available: true },
      { id: "2xl", label: "2X-Large", available: true },
      { id: "1x", label: "1X", available: true },
      { id: "2x", label: "2X", available: true },
      { id: "3x", label: "3X", available: true },
    ],
    descriptionParagraphs: [
      "If you're anything like us, you never underestimate the power of a rest day (especially after leg day). To make the most of your recovery, we made the Daydream Long Sleeve. With an ultra-soft fabric that has \"I live in this\" comfort, it's p...",
      "Engineered with a breathable four-way stretch blend that flows naturally with your movements. Designed with raglan sleeves and ergonomic flatlock seams to prevent chafing while you unwind.",
    ],
    galleryImages: [
      {
        id: "bp-1",
        alt: "Daydream Long Sleeve Front View",
        url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "bp-2",
        alt: "Daydream Long Sleeve Back View",
        url: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "bp-3",
        alt: "Daydream Long Sleeve Standing View",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "bp-4",
        alt: "Daydream Long Sleeve Profile View",
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&auto=format&fit=crop&q=80",
      },
    ],
    customerPhotos: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=300&auto=format&fit=crop&q=80",
    ],
    reviews: [
      {
        id: "r1",
        author: "Sarah M.",
        date: "September 01, 2026",
        avatarBg: "bg-purple-100 text-purple-800",
        avatarInitial: "S",
        rating: 5,
        text: "The fabric is incredibly soft! Perfect for lounging post-workout. Runs true to size and the sleeve length is just right.",
      },
      {
        id: "r2",
        author: "Jessica T.",
        date: "August 28, 2026",
        avatarBg: "bg-blue-100 text-blue-800",
        avatarInitial: "J",
        rating: 5,
        text: "My absolute favorite long sleeve! I bought it in Small and the fit is flattering without feeling too tight.",
      },
    ],
  },
  "m1-grey-syzygy": {
    id: "m1-grey-syzygy",
    brand: "notwoways",
    brandAvatarText: "ntw",
    brandRating: "4.9 ★ (1.5K)",
    title: "M1 GREY SYZYGY",
    rating: 5,
    reviewCount: 32,
    boughtBadge: "75+ bought in past month",
    stockBadge: "Only 4 left",
    price: "£130.00",
    sizes: [
      { id: "3", label: "3", available: true },
      { id: "4", label: "4", available: true },
      { id: "5", label: "5", available: true },
      { id: "6", label: "6", available: true },
      { id: "7", label: "7", available: true },
      { id: "8", label: "8", available: true },
      { id: "9", label: "9", available: true },
      { id: "10", label: "10", available: true },
      { id: "11", label: "11", available: true },
      { id: "12", label: "12", available: true },
      { id: "13", label: "13", available: false },
      { id: "14", label: "14", available: false },
    ],
    descriptionParagraphs: [
      "The latest evolution of our most iconic franchise, the grey iteration of our signature Syzygy carries forward the same Yin Yang balance.",
      "A harmony of opposites, now reimagined to feature muted grey tones, this shoe carries the same Syzygy soul with enhanced cushioning and premium mesh panels.",
    ],
    galleryImages: [
      {
        id: "ntw-1",
        alt: "M1 GREY SYZYGY Sneaker Profile",
        url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "ntw-2",
        alt: "M1 GREY SYZYGY Model Outfit",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "ntw-3",
        alt: "M1 GREY SYZYGY Side Angle",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "ntw-4",
        alt: "M1 GREY SYZYGY Standing View",
        url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "ntw-5",
        alt: "M1 GREY SYZYGY Sole View",
        url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "ntw-6",
        alt: "M1 GREY SYZYGY Top View",
        url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "ntw-7",
        alt: "M1 GREY SYZYGY Heel Detail",
        url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "ntw-8",
        alt: "M1 GREY SYZYGY Box & Extras",
        url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1000&auto=format&fit=crop&q=80",
      },
    ],
    customerPhotos: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=300&auto=format&fit=crop&q=80",
    ],
    reviews: [
      {
        id: "nr1",
        author: "Liam",
        date: "September 02, 2026",
        avatarBg: "bg-emerald-100 text-emerald-800",
        avatarInitial: "L",
        rating: 5,
        text: "Incredible silhouette and build quality. The grey colorway matches every fit perfectly. Extremely comfortable for all-day wear.",
      },
      {
        id: "nr2",
        author: "Alex",
        date: "August 29, 2026",
        avatarBg: "bg-blue-100 text-blue-800",
        avatarInitial: "A",
        rating: 5,
        text: "Sizing is spot on! Cushioning is top notch and the materials feel way more expensive than £130.",
      },
    ],
  },
  "womens-merino-travel-dress": {
    id: "womens-merino-travel-dress",
    brand: "Unbound Merino",
    brandAvatarText: "UM",
    brandRating: "4.8 ★ (35.7K)",
    title: "Women's Merino Travel Dress",
    rating: 5,
    reviewCount: 804,
    boughtBadge: "200+ bought in past month",
    price: "$99.00",
    originalPrice: "$139.00",
    discountBadge: "28% off",
    colors: [
      { id: "black", label: "Black", available: true },
      { id: "charcoal", label: "Charcoal", available: true },
      { id: "heather-charcoal", label: "Heather Charcoal", available: true },
      { id: "moonlight-blue", label: "Moonlight Blue", available: true },
      { id: "sail-blue", label: "Sail Blue", available: false },
      { id: "dusty-teal", label: "Dusty Teal", available: false },
      { id: "merlot", label: "Merlot", available: false },
      { id: "almond", label: "Almond", available: false },
      { id: "dark-violet", label: "Dark Violet", available: false },
      { id: "coffee", label: "Coffee", available: false },
      { id: "sierra-red", label: "Sierra Red", available: false },
      { id: "sedona", label: "Sedona", available: false },
    ],
    sizes: [
      { id: "XS", label: "XS", available: true },
      { id: "S", label: "S", available: true },
      { id: "M", label: "M", available: true },
      { id: "L", label: "L", available: true },
      { id: "XL", label: "XL", available: true },
    ],
    descriptionParagraphs: [
      "Seamlessly transition from day to night with comfort, versatility and performance. Made from a Merino wool blend so breathable and soft, you'll never want to take it off.",
    ],
    externalLinkText: "More details at Unbound Merino",
    galleryImages: [
      {
        id: "img-1",
        alt: "Women's Merino Travel Dress - Front View",
        url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "img-2",
        alt: "Neckline and fabric detail",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "img-3",
        alt: "Back profile view",
        url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "img-4",
        alt: "Full length standing angle 1",
        url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "img-5",
        alt: "Full length standing angle 2",
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "img-6",
        alt: "Variant drape perspective",
        url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "img-7",
        alt: "Fabric close-up texture",
        url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&auto=format&fit=crop&q=80",
      },
      {
        id: "img-8",
        alt: "Full length standing angle 3",
        url: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1000&auto=format&fit=crop&q=80",
      },
    ],
    customerPhotos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&auto=format&fit=crop&q=80",
    ],
    reviews: [
      {
        id: "r1",
        author: "Erika",
        date: "August 30, 2026",
        avatarBg: "bg-amber-100 text-amber-800",
        avatarInitial: "E",
        rating: 5,
        text: "Love this! From the photographs online, I was a little skeptical — does this amount to a grey wool sack? However, it looks terrific and is super comfortable: hugs in flattering places, skim...",
      },
      {
        id: "r2",
        author: "Sandy",
        date: "August 27, 2026",
        avatarBg: "bg-amber-100 text-amber-800",
        avatarInitial: "S",
        rating: 5,
        text: "Love, love, love. I've purchased several items with traveling in mind and except this one... Its light... free, soft, good fit, and s...",
      },
    ],
  },
};

export function getProductData(id?: string): ProductDetailData {
  if (id && PRODUCT_DETAILS_DATABASE[id]) {
    return PRODUCT_DETAILS_DATABASE[id];
  }
  if (
    id &&
    (id.toLowerCase().includes("henley") ||
      id.toLowerCase().includes("ribbed") ||
      id.toLowerCase().includes("flag") ||
      id.toLowerCase().includes("tan"))
  ) {
    return PRODUCT_DETAILS_DATABASE["womens-ribbed-henley-tan"];
  }
  if (
    id &&
    (id.toLowerCase().includes("daydream") ||
      id.toLowerCase().includes("born") ||
      id.toLowerCase().includes("primitive") ||
      id.toLowerCase().includes("sleeve"))
  ) {
    return PRODUCT_DETAILS_DATABASE["daydream-long-sleeve"];
  }
  if (id && id.toLowerCase().includes("syzygy")) {
    return PRODUCT_DETAILS_DATABASE["m1-grey-syzygy"];
  }
  if (
    id &&
    (id.toLowerCase().includes("shoe") ||
      id.toLowerCase().includes("sneaker") ||
      id.toLowerCase().includes("kith") ||
      id.toLowerCase().includes("on-cloud"))
  ) {
    return PRODUCT_DETAILS_DATABASE["m1-grey-syzygy"];
  }
  return PRODUCT_DETAILS_DATABASE["womens-ribbed-henley-tan"];
}

export interface RecommendedProduct {
  id: string;
  type?: "product" | "brand";
  brand: string;
  brandRating?: string;
  title: string;
  price?: string;
  originalPrice?: string;
  discountBadge?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  thumbnails?: string[];
}

export const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
  {
    id: "rec-1",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMENS RIBBED HENLEY - BLACK",
    price: "BDT 4,200.00",
    originalPrice: "BDT 6,000.00",
    discountBadge: "30% off",
    rating: 5,
    reviewCount: 41,
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-2",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMENS OVERSIZED CROP HOODIE - ACID...",
    price: "BDT 9,800.00",
    rating: 5,
    reviewCount: 40,
    imageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-3",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMENS ESSENTIAL OVERSIZED TEE",
    price: "BDT 4,500.00",
    rating: 5,
    reviewCount: 24,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-4",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMENS RIBBED TANK - BLACK",
    price: "BDT 5,300.00",
    rating: 5,
    reviewCount: 17,
    imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-5",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMENS RIBBED TANK - GREY",
    price: "BDT 5,300.00",
    rating: 5,
    reviewCount: 5,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-6",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMEN'S HOODED FOREVER FLANNEL - ...",
    price: "BDT 10,800.00",
    rating: 5,
    reviewCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-7",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "MEN'S HOODED FOREVER FLANNEL - DARK",
    price: "BDT 10,800.00",
    rating: 5,
    reviewCount: 38,
    imageUrl: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-8",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMEN'S HOODED FOREVER FLANNEL - RED",
    price: "BDT 10,800.00",
    rating: 5,
    reviewCount: 29,
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-9",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMENS OVERSIZED CROPPED HOODIE - GREY",
    price: "BDT 9,800.00",
    rating: 5,
    reviewCount: 35,
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-10",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMENS OVERSIZED BUTTON UP - BROWN",
    price: "BDT 7,200.00",
    rating: 5,
    reviewCount: 14,
    imageUrl: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-11",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMENS SHERPA FLEECE HALF ZIP - TAN",
    price: "BDT 11,500.00",
    rating: 5,
    reviewCount: 52,
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-12",
    type: "product",
    brand: "FLAG NOR FAIL",
    title: "WOMENS ESSENTIAL OVERSIZED HOODIE - BONE",
    price: "BDT 9,200.00",
    rating: 5,
    reviewCount: 68,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
  },
];
