import { useContext } from 'react';
import CartContext from '../store/shopping-cart-context';
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button.jsx';
import logoImage from '../assets/logo.jpg';

export default function Header() {

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  function handleShowCart () {
    userProgressCtx.showCart();
  }
  
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImage} alt="Logo image" />
        <h1>REACT FOOD</h1>
      </div>
      
      <Button onClick={handleShowCart} textOnly={true}>
        Cart ({(cartCtx.items) ? cartCtx.items.length : 0})
      </Button>
    </header>
  );
}
