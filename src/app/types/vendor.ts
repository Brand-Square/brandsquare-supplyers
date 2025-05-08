interface UserDetails {
//   performanceMetrics: PerformanceMetrics;
//   notificationPreferences: NotificationPreferences;
//   wishlist: any[];
  _id: string;
  user: string;
  businessName?: string;
  logo?: string;
}

export interface VendorDetails {
  createdAt: string;
  email: string;
  contact: string;
  address: string;
  inviteToken: null | string;
  updatedAt: string;
  userDetails: UserDetails;
  productCategories: string[];
  userType: "vendor";
  __v: number;
  _id: string;
}
