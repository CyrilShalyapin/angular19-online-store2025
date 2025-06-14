export type ProductType = {
    id: number
    title: string
    description: string
    category: CategoryType
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string [],
    brand: string,
    sku: string,
    weight: number,
    dimensions: {
      width: number
      height: number
      depth: number
    },
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: {
        rating: number
        comment: string
        date: string
        reviewerName: string
        reviewerEmail: string
    }[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: {
      createdAt: string
      updatedAt: string
      barcode: string
      qrCode: string
    },
    thumbnail: string,
    images: string[]
}

export type CategoryType =
    "all-categories" |
    "beauty" |
    "fragrances" |
    "furniture" |
    "groceries" |
    "home-decoration" |
    "kitchen-accessories" |
    "laptops" |
    "mens-shirts" |
    "mens-shoes" |
    "mens-watches" |
    "mobile-accessories" |
    "motorcycle" |
    "skin-care" |
    "smartphones" |
    "sports-accessories" |
    "sunglasses" |
    "tablets" |
    "tops" |
    "vehicle" |
    "womens-bags" |
    "womens-dresses" |
    "womens-jewellery" |
    "womens-shoes" |
    "womens-watches"

export enum Category {
  AllCategories = 'ALL_CATEGORIES',
  Beauty = 'BEAUTY',
  Fragrances = 'FRAGRANCES',
  Furniture = 'FURNITURE',
  Groceries = 'GROCERIES',
  HomeDecoration = 'HOME_DECORATION',
  KitchenAccessories = 'KITCHEN_ACCESSORIES',
  Laptops = 'LAPTOPS',
  MensShirts = 'MENS_SHIRTS',
  MensShoes = 'MENS_SHOES',
  MensWatches = 'MENS_WATCHES',
  MobileAccessories = 'MOBILE_ACCESSORIES',
  Motorcycle = 'MOTORCYCLE',
  SkinCare = 'SKIN_CARE',
  Smartphones = 'SMARTPHONES',
  SportsAccessories = 'SPORTS_ACCESSORIES',
  Sunglasses = 'SUNGLASSES',
  Tablets = 'TABLETS',
  Tops = 'TOPS',
  Vehicle = 'VEHICLE',
  WomensBags = 'WOMENS_BAGS',
  WomensDresses = 'WOMENS_DRESSES',
  WomensJewellery = 'WOMENS_JEWELLERY',
  WomensShoes = 'WOMENS_SHOES',
  WomensWatches = 'WOMENS_WATCHES',
}
    
export enum SortMethod {
  PriceASC = 'PRICE_ASC',
  PriceDESC = 'PRICE_DESC',
  Title = 'TITLE',
  Category = 'CATEGORY',
}
  