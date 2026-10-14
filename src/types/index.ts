export type Category = 
  | 'all' 
  | 'festive-lawn' 
  | 'luxury-pret' 
  | 'unstitched' 
  | 'wedding-formals' 
  | 'velvet-edit';

export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED' | 'CAD' | 'SAR';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // relative to PKR (1 PKR = rate in target currency)
  decimals: number;
}

export type StitchingType = 'unstitched' | 'stitched-standard' | 'stitched-custom';

export type StandardSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type TrouserStyle = 'Straight Pant' | 'Flared Gharara' | 'Classic Shalwar' | 'Tulip Shalwar' | 'Culottes';

export interface CustomMeasurements {
  shirtLength: number; // inches
  bust: number;
  waist: number;
  hips: number;
  shoulder: number;
  sleeveLength: number;
  armhole: number;
  trouserLength: number;
  trouserStyle: TrouserStyle;
  specialInstructions?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: Category;
  collection: string;
  pricePKR: number;
  originalPricePKR?: number;
  stitchingPricePKR: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  fabric: string;
  pieces: '3-Piece (Shirt, Dupatta, Trouser)' | '2-Piece (Shirt & Trouser)' | '1-Piece Kurta';
  embroideryTechnique: string;
  description: string;
  inStock: boolean;
  colors: { name: string; hex: string }[];
  includes: string[];
  careInstructions: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique cart entry key
  product: Product;
  stitchingType: StitchingType;
  selectedSize?: StandardSize;
  customMeasurements?: CustomMeasurements;
  selectedColor?: string;
  quantity: number;
  totalPricePKR: number; // calculated with stitching add-on
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
  paymentMethod: 'cod' | 'card' | 'jazzcash_easypaisa';
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  customer: OrderCustomer;
  subtotalPKR: number;
  discountPKR: number;
  shippingPKR: number;
  totalPKR: number;
  currency: CurrencyCode;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}
