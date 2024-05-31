import {useRef} from 'react'
import { createPortal } from "react-dom";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";

import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  const dialog = useRef();
  
  function handleOpenCart() {
    dialog.current.open();
  }
  
  return (
    <CartContextProvider>
      <main>
        {createPortal(<Cart ref={dialog} />, document.getElementById("modal"))}
        <Header onCartOpen={handleOpenCart} />
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
