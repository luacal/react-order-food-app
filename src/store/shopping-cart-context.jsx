import {createContext} from 'react';

export const CartContext = createContext({
  items:[],
  addItemToCart: () => {},
  updateItemQuantity: () => {}
});

// export default function CartContextProvider () {

// }

