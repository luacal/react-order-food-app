
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";


import {CartContextProvider} from "./store/shoppingCartContext.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import CheckoutForm from './components/CheckoutForm.jsx';

function App() {
  
  return (
    
    <UserProgressContextProvider>
    <CartContextProvider>
      <>
        <Cart />
        <CheckoutForm />
        <Header />
        <Meals />
      </>
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
