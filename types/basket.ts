export interface BasketItem {
    productId: string;
    name: string;
    image: string | null;
    price: number;
    quantity: number;
    totalPrice: number;
}

export interface Basket extends BasketItem {
    totalAmount: number;
    items: BasketItem[];
}
