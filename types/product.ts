export interface IProduct {
    id: string;
    image: string | null;
    name: string;
    description: string;
    price: number;
    stock: number;
}

export interface IProductDetail extends IProduct {
    totalProducts: number;
    limit: number;
    offset: number;
    products: IProduct[];
}