import type { BasketItem } from "~/types/basket";
export const useBasketList = () => {
    const basketList = useState<BasketItem[]>("basketList", () => []);
    const totalAmount = useState<number>("totalAmount", () => 0);


    return { basketList, totalAmount };
}