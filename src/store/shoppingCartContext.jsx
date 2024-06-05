import { createContext, useState, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {

  if (action.type === 'ADD_ITEM') {

    const meal = action.payload;
    
    return {
      ...state,
      items: [
        {
          id: meal.id,
          quantity: 1,
          name: meal.name,
          price: meal.price,
        },
        ...state.items,
      ],
    };
  }

  if (action.type === 'UPDATE_ITEM') {

    const mealId = action.payload.mealId;
    const amount = action.payload.amount;
    
    const updatedItems = [...state.items];
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
        ...state,
        items: updatedItems,
      };
  }


  return state;
}

export function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  // to do: remove this State
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddToCart,
    updateItemQuantity: handleUpdateItemQuantity,
  };

  function handleUpdateItemQuantity(mealId, amount) {

    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        mealId: mealId,
        amount: amount
    }});

 }

  function handleAddToCart(meal) {

    //to do: improve this function to include the validation of existing product inside the ADD_ITEM reducer

    const productIndex = shoppingCartState.items.findIndex(
      (item) => item.id === meal.id
    );
    
    if (productIndex !== -1) {
      
      shoppingCartDispatch({
        type: 'UPDATE_ITEM',
        payload: {
          mealId: meal.id,
          amount: shoppingCartState.items[productIndex].quantity + 1
      }});
      return;
    }
    
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: meal
    })

  }

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;