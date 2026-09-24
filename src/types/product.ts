export type ProductCategory =
  | "rudraksha"
  | "crystal"
  | "stone"
  | "gemstone"
  | "yantra"
  | "bracelet"
  | "combo"
  | "other";

export type Intention =
  | "Peace"
  | "Wealth"
  | "Health"
  | "Protection"
  | "Relationship"
  | "Success"
  | "Spirituality";

export type ProductImage = {
  url: string;
  alt?: string;
  isPrimary?: boolean;
};

export type ProductVariant = {
  _id?: string;
  sku?: string;
  label: string;
  mukhi?: string;
  size?: string;
  weight?: string;
  material?: string;
  color?: string;
  mrp: number;
  salePrice: number;
  quantity: number;
  isActive: boolean;
};

export type ProductAttributes = {
  face?: string;
  stone?: string;
  shape?: string;
  weight?: string;
  gender?: string;
  color?: string;
  occasion?: string;
  zodiac?: string;
  material?: string;
  mukhi?: string;
  jewelryType?: string;
  planet?: string;
  origin?: string;
};

export type StoreProduct = {
  _id: string;
  title: string;
  slug: string;
  sku?: string;
  shortDescription?: string;
  description?: string;
  category: ProductCategory;
  images: ProductImage[];
  mrp: number;
  salePrice: number;
  quantity: number;
  lowStockThreshold?: number;
  variants: ProductVariant[];
  status?: "draft" | "listed" | "unlisted";
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  intentions: Intention[];
  attributes?: ProductAttributes;
  seo?: { metaTitle?: string; metaDescription?: string };
  tags?: string[];
  weightCarat?: number;
  weightRatti?: number;
  ratingAvg?: number;
  ratingCount?: number;
  discountPercent?: number;
  totalStock?: number;
  isLowStock?: boolean;
  effectiveSalePrice?: number;
  effectiveMrp?: number;
  effectiveStock?: number;
  effectiveDiscountPercent?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

export type FacetValue = {
  value: string;
  count: number;
  label?: string;
};

export type CatalogFacets = {
  category?: FacetValue[];
  intention?: FacetValue[];
  stone?: FacetValue[];
  color?: FacetValue[];
  shape?: FacetValue[];
  gender?: FacetValue[];
  material?: FacetValue[];
  mukhi?: FacetValue[];
  jewelryType?: FacetValue[];
  zodiac?: FacetValue[];
  occasion?: FacetValue[];
  planet?: FacetValue[];
  availability?: FacetValue[];
  tags?: FacetValue[];
  origin?: FacetValue[];
  price?: { min: number; max: number };
};

export type CatalogParams = {
  category?: string;
  categories?: string;
  intention?: string;
  intentions?: string;
  stone?: string;
  color?: string;
  shape?: string;
  gender?: string;
  material?: string;
  mukhi?: string;
  jewelryType?: string;
  zodiac?: string;
  occasion?: string;
  planet?: string;
  origin?: string;
  tags?: string;
  tag?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  minCarat?: string | number;
  maxCarat?: string | number;
  minRatti?: string | number;
  maxRatti?: string | number;
  inStock?: string | boolean;
  onSale?: string | boolean;
  featured?: string | boolean;
  bestSeller?: string | boolean;
  isNewArrival?: string | boolean;
  q?: string;
  sort?: string;
  page?: string | number;
  limit?: string | number;
  includeFacets?: string | boolean;
};

export type StoreCustomer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses?: unknown[];
  createdAt?: string;
};

export type StoreReview = {
  _id: string;
  productSlug: string;
  name: string;
  rating: number;
  title?: string;
  body?: string;
  createdAt?: string;
};

export type StoreBanner = {
  _id: string;
  title: string;
  subtitle?: string;
  key?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
  sortOrder?: number;
};

export type StoreBlogPost = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  publishedAt?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
};

export type StoreCmsPage = {
  _id: string;
  slug: string;
  title: string;
  content?: string;
  isActive?: boolean;
};

export type CouponValidation = {
  code: string;
  type: string;
  value: number;
  discount: number;
  description?: string;
};

export type WishlistItem = {
  _id?: string;
  productId: string | { _id: string };
  productSlug?: string;
  title?: string;
  image?: string;
  salePrice?: number;
  product?: StoreProduct;
  createdAt?: string;
};

export type CatalogResponse = {
  success: boolean;
  data: StoreProduct[];
  pagination: Pagination;
  priceStats?: { minPrice: number; maxPrice: number };
  appliedFilters?: Record<string, unknown>;
  sortOptions?: { value: string; label: string }[];
  facets?: CatalogFacets;
  message?: string;
};

export type MenuLink = { label: string; href: string; badge?: string };
export type MenuColumn = { title: string; links: MenuLink[] };
export type MenuItem = {
  id: string;
  label: string;
  href: string;
  columns?: MenuColumn[];
};

export type StoreMenu = {
  primary: MenuItem[];
  utility?: MenuLink[];
};

export type StoreMeta = {
  categories: string[];
  intentions: Intention[];
  zodiacSigns: string[];
  paymentMethods: string[];
  currency: string;
  trustBadges: { id: string; label: string; description?: string }[];
  support?: { email?: string; phone?: string };
  sortOptions?: { value: string; label: string }[];
};

export type CollectionDetail = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
  trustBadges?: { id: string; label: string }[];
  comparisonTable?: {
    headers?: string[];
    rows?: string[][];
  };
  faqs?: { question: string; answer: string }[];
  defaultFilters?: Record<string, string>;
};

export type HomeIntention = {
  id: string;
  label: string;
  href: string;
  color?: string;
  icon?: string;
};

export type HomeCategoryCard = {
  id: string;
  label: string;
  href: string;
  productCount?: number;
  image?: string;
};

export type HomeZodiac = {
  id?: string;
  label: string;
  href: string;
};

export type HomeConsultCta = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type HomeContent = {
  banners: StoreBanner[];
  trustBadges?: { id: string; label: string; description?: string }[];
  intentions?: HomeIntention[];
  categories?: HomeCategoryCard[];
  zodiacSigns?: HomeZodiac[] | string[];
  carousels?: {
    featured?: StoreProduct[];
    bestsellers?: StoreProduct[];
    newArrivals?: StoreProduct[];
  };
  latestBlogs: StoreBlogPost[];
  faqs?: { question: string; answer: string }[];
  consultCta?: HomeConsultCta;
  faqPage?: StoreCmsPage | null;
  stats?: { listedProducts?: number; categoryCounts?: Record<string, number> };
};
