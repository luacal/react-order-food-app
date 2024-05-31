import { createContext, useState } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });
  

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddToCart,
    updateItemQuantity: handleUpdateItemQuantity,
  };

  function handleUpdateItemQuantity(mealId, amount) {
    // alert(amount);
    setShoppingCart((prev) => {
      const updatedItems = [...prev.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === mealId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity = amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...prev,
        items: updatedItems,
      };
    });
  }

  function handleAddToCart(meal) {
    const productIndex = shoppingCart.items.findIndex(
      (item) => item.id === meal.id
    );

    if (productIndex !== -1) {
      ctxValue.updateItemQuantity(
        meal.id,
        shoppingCart.items[productIndex].quantity + 1
      );
      return;
    }

    setShoppingCart((prev) => {
      return {
        ...prev,
        items: [
          {
            id: meal.id,
            quantity: 1,
            name: meal.name,
            price: meal.price,
          },
          ...prev.items,
        ],
      };
    });
  }

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
