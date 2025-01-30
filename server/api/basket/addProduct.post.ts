import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
      const { userId, productId, quantity } = await readBody(event)
  
      // Проверяем, существует ли корзина пользователя
      let basket = await prisma.basket.findUnique({
        where: {
          userId: userId,
        },
        include: {
          items: true,
        },
      })
  
      // Если корзина не найдена, создаем новую
      if (!basket) {
        basket = await prisma.basket.create({
          data: {
            userId: userId,
          },
          include: {
            items: true,
          },
        })
      }
  
      
      const existingItem = basket.items.find(item => item.productId === productId)
  
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity
  
        
        if (newQuantity > 100) {
          await prisma.basketItems.update({
            where: {
              id: existingItem.id,
            },
            data: {
              quantity: 100, 
            },
          })
        } else {
          await prisma.basketItems.update({
            where: {
              id: existingItem.id,
            },
            data: {
              quantity: newQuantity,
            },
          })
        }
      } else {
        // Если товара нет в корзине, добавляем новый, ограничиваем количество до 100
        await prisma.basketItems.create({
          data: {
            productId: productId,
            quantity: Math.min(quantity, 100), // Ограничиваем количество до 100
            cartId: basket.id,
          },
        })
      }
  
      return { userId, message: 'Product added to basket' }
    } catch (error) {
      // Обработка ошибок
      console.error('Error adding product to basket:', error)
      return { error: 'There was an error while adding the product to the basket' }
    }
  })
