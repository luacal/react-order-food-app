import {useRef} from 'react'
import { createPortal } from "react-dom";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";


import {CartContextProvider} from "./store/shopping-cart-context.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import CheckoutForm from './components/CheckoutForm.jsx';

function App() {
  const cartDialog = useRef();
  const checkoutDialog = useRef();
  
  function handleOpenCart() {
    cartDialog.current.open();
  }

  function handleCheckoutOpen() {
    cartDialog.current.close();
    checkoutDialog.current.open();
  }
  
  return (
    
    <UserProgressContextProvider>
    <CartContextProvider>
      <>
        <Cart />
        {createPortal(<CheckoutForm ref={checkoutDialog} />, document.getElementById("modal"))}
        <Header onCartOpen={handleOpenCart} />
        <Meals />
      </>
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
