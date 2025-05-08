export interface CategoryType {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  parent?: string;
}

// export interface CategoryResponse {
//   categories: CategoryType[];
//   isLoading: boolean;
//   error: Error | null;
//   refetch?: () => Promise<void>;
//   totalCategories: number;
//   page: number;
//   totalPages?: number;
//   limit: number;
// }

// product types file

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  categories: string[];
  images: string[];
  stock: number;
  price: number;
  discount: {
    discountType: string;
    discountValue: number;
    _id: string;
  };
  currentPrice: number;
  availability?: string;
  packSize?: string;
  packQuantity?: string;
  sold?: number;
  variants?: ProductVariant[];
}

// export interface ProductResponse {
//     products: ProductType[];
//     isLoading: boolean;
//     error: Error | null;
//     refetch?: () => Promise<void>;
//     totalProducts: number;
//     page: number;
//     totalPages?: number;
//     currentPage?: number;
//     limit: number;
// }

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  msg: string;
  isSuccess?: boolean;
}

export interface PaginatedResponse<T> {
  limit: number;
  page: number;
  totalPages: number;
  totalProducts?: number;
  totalCategories?: number;
  products?: T[];
  categories?: T[];
}

export interface ProductResponse extends PaginatedResponse<ProductType> {
  products: ProductType[];
}

export interface CategoryResponse extends PaginatedResponse<CategoryType> {
  categories: CategoryType[];
}

export interface CategoryFormData {
  name: string;
  parent: string;
  description: string;
  image?: File;
  _id?: string;
}

export interface ProductVariant {
  _id: string;
  name: string;
  type: string;
  variantPrice: number;
  variantStock: string;
  variantImage?: string;
  properties: { key: string; value: string; }[];
  applyDiscount: boolean;
}

export interface ProductDiscount {
  discountType: string;
  discountValue: string;
  strikeOriginalPrice: boolean;
}

export interface ProductData {
  name: string;
  description: string;
  categories: string[];
  discount: ProductDiscount;
  price: string;
  variants: ProductVariant[];
  availability: string;
  packSize: string;
  packQuantity: string;
  stock: string;
  //error in spelling from backend
  mininumStock: string;

  setOutOfStockAtMinimum: boolean;
  images: File[];
  variantImages: File[];
}

export interface ProductStore {
  isLoading: boolean;
  isFulfilled: boolean;
  productData: ProductData;
  setProductData: (data: ProductData) => void;
  error: string | null;
  resetState: () => void;
  addCategory: (formData: CategoryFormData) => Promise<ApiResponse | null>;
  getCategory: (page?: number, limit?: number) => Promise<CategoryResponse>;
  addProduct: (productData: ProductData) => Promise<ApiResponse | null>;
  getProducts: (page?: number, limit?: number) => Promise<ProductResponse>;
  deleteProduct: (productId: string) => Promise<ApiResponse | null>;
  products: ProductType[];
  getSingleProduct: (productId: string) => Promise<ProductType | null>;
}

// Cart types
export interface CartVariant {
  _id: string;
  name: string;
  type: string;
  variantPrice: number;
  variantStock: number;
  variantImage?: string;
  properties: { key: string; value: string; }[];
  applyDiscount: boolean;
}

export interface CustomSpecifications {
  brandName: string;
  description: string;
  document: string;
  images: string[];
  _id: string;
}

export interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    description: string;
    price?: number;
    currentPrice: number;
    images: string[];
    stock: number;
    availability: string;
    discount: ProductDiscount;
    total?: number;
  };
  quantity: number;
  selectedVariant?: ProductVariant;
  customSpecifications?: CustomSpecifications;
  user?: string;
  createdAt: string;
  updatedAt: string;
  total?: number
  price?: number
}

export interface CartItemInput {
  product: string;
  quantity: number;
  selectedVariant?: CartVariant;
  variantId?: string;
  customSpecifications?: {
    document: string;
    images: string[];
  };
}

export interface CartQuantityUpdate {
  quantity: number;
}

export interface CartResponse {
  data: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Review types

export interface ProductReviewUser {
  _id: string;
  name: string;
  email: string;
}

export interface ProductReview {
  _id: string;
  product: string;
  user: ProductReviewUser;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductReviewInput {
  product: string;
  rating: number;
  comment: string;
}

export interface ProductReviewsResponse {
  data: ProductReview[];
  message: string;
}

// Payment types
export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientPhone: string;
  recipientAnotherPhone?: string;
  deliveryType: "pickup" | "door";
  saveAddress?: boolean;
}

export interface PaymentInitResponse {
  isSuccess: boolean;
  message: string;
  data?: {
    data?: {
      authorization_url?: string;
      reference?: string;
      access_code?: string;
      [key: string]: unknown;
    };
    authorization?: {
      authorizationUrl?: string;
      reference?: string;
      [key: string]: unknown;
    };
    transactionId?: string;
    totalAmount?: number;
    status?: string;
    [key: string]: unknown;
  };
}

export interface PaymentVerificationResponse {
  isSuccess: boolean;
  message: string;
  data?: {
    _id?: string;
    status?: string;
    amount?: number;
    reference?: string;
    [key: string]: unknown;
  };
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      msg?: string;
      error?: string;
      [key: string]: unknown;
    };
    status?: number;
  };
  message?: string;
}

export interface AuthorizationResponse {
  authorizationUrl: string;
  accessCode: string;
  waitingTime: string;
}