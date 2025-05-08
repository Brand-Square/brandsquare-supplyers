// supportArticles.ts

export interface SupportArticle {
    title: string;
    content: string;
  }
  
  // Managing your orders content
  export const supportArticles: SupportArticle[] = [
    {
      title: "How to Track Your Order",
      content: "To track your order, log in to your account, navigate to 'My Orders', and select the specific order you want to track. You will see the current status, estimated delivery date, and tracking number if available. You can also click 'Track Package' for real-time updates.",
    },
    {
      title: "How to Cancel an Order",
      content: "To cancel an order, visit the 'My Orders' page, select the order you want to cancel, and click 'Cancel Order'. Keep in mind that cancellations are only possible if the item has not yet been shipped. Once shipped, you may need to initiate a return instead.",
    },
    {
      title: "How to Request a Refund",
      content: "If you received a damaged or incorrect item, go to 'My Orders', select the order, and click 'Report an Issue'. Choose the issue type, provide relevant details, and upload photos if necessary. Our support team will review your request and process a refund if applicable.",
    },
    {
      title: "How to Modify an Existing Order",
      content: "Unfortunately, once an order is placed, you cannot modify it directly. However, you may cancel the order if it hasn't been shipped and place a new one with the correct items.",
    },
    {
      title: "What to Do If Your Order Is Delayed",
      content: "If your order is delayed beyond the estimated delivery date, check the tracking information for updates. You can also contact our support team if there is no progress or if the tracking information is unavailable.",
    },
    {
      title: "How to Confirm Order Delivery",
      content: "Once you receive your package, log in to your account and mark the order as 'Delivered'. This helps us know that your order has arrived successfully.",
    },
  ];
  
  // Uploading products content
  export const uploadArticles: SupportArticle[] = [
    {
      title: "How to Add a New Product",
      content: "To add a new product, access your vendor dashboard and click 'Add Product'. Fill in the product name, description, category, price, and upload clear images. Double-check your information and click 'Submit' to make the product live.",
    },
    {
      title: "How to Update Product Details",
      content: "If you need to edit product details, go to 'My Products' in your dashboard. Select the product you wish to update and click 'Edit'. Make your changes and click 'Save' to update the information.",
    },
    {
      title: "How to Change Your Profile Picture",
      content: "To update your profile picture, visit your profile settings, click on the existing image, and select 'Upload New Photo'. Choose a clear, professional image and click 'Save' to update.",
    },
    {
      title: "How to Manage Your Product Inventory",
      content: "To manage inventory, navigate to 'My Products' and click 'Inventory Settings'. You can update the stock count, set low-stock alerts, and manage product availability. Keep your inventory updated to avoid overselling.",
    },
    {
      title: "How to Feature a Product",
      content: "To feature a product on your store page, go to 'My Products', select the product, and toggle the 'Feature' option. Featured products gain higher visibility on your profile.",
    },
    {
      title: "How to Upload Product Variants",
      content: "If your product comes in multiple sizes or colors, add variants during the upload process. Select 'Add Variant', choose the attribute (e.g., size, color), and specify the details for each option.",
    },
    {
      title: "How to Add Promotional Discounts",
      content: "To offer a discount, navigate to 'Product Promotions' in your dashboard. Select the product, set the discount percentage, and specify the duration of the promotion. Click 'Apply' to activate the discount.",
    },
  ];
  
  