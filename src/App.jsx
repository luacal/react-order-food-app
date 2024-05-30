import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";

import { CartContext } from "./store/shopping-cart-context.jsx";

function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });
  const dialog = useRef();

  function handleOpenCart() {
    dialog.current.open();
  }

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

  function handleAddToCart(item) {
    setShoppingCart((prev) => {
      //to do: check if the cart already has the product and increment the quantity
      return {
        ...prev,
        items: [
          {
            id: item.id,
            quantity: 1,
            name: item.name,
            price: item.price,
          },
          ...prev.items,
        ],
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddToCart,
    updateItemQuantity: handleUpdateItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>
      <main>
        {createPortal(<Cart ref={dialog} />, document.getElementById("modal"))}
        <Header onCartOpen={handleOpenCart} />
        <Meals onAdd={handleAddToCart} />
      </main>
    </CartContext.Provider>
  );
}

export default App;
