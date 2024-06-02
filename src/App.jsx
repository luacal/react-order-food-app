import {useRef} from 'react'
import { createPortal } from "react-dom";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";

import CartContextProvider from "./store/shopping-cart-context.jsx";
import CheckoutForm from './components/CheckoutForm.jsx';

function App() {
  const cartDialog = useRef();
  const checkoutDialog = useRef();
  
  function handleOpenCart() {
    cartDialog.current.open();
  }

  function handleCheckoutOpen() {
    console.log('checkout open');
    cartDialog.current.close();
    checkoutDialog.current.open();
  }
  
  return (
    <CartContextProvider>
      <main>
        {createPortal(<Cart ref={cartDialog} onCheckoutOpen={handleCheckoutOpen} />, document.getElementById("modal"))}
        {createPortal(<CheckoutForm ref={checkoutDialog} />, document.getElementById("modal"))}
        <Header onCartOpen={handleOpenCart} />
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
