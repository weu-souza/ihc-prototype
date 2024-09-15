export interface IProducts {
    id: number;
    sku: string;
    title: string;
    category: string;
    tags: string[];
    normalPrice: number;
    salePrice: number;
    discountPercentage: number;
    new: boolean;
    description: Idescription;
    colors: Icolors[];
    sizes: string[];
    rating: number;
    images: Iimages;
  }

  interface Idescription {
    short: string;
    long: string;
  }
  
  interface Icolors {
    name: string;
    hex: string;
  }
  interface Iimages {
    mainImage: string;
    gallery: string[];
  }

  export interface ICart extends IProducts {
    quantity:number
  }