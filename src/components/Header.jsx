import { useContext } from 'react';
import { CartContext } from '../store/shopping-cart-context';
import logoImage from '../assets/logo.jpg';


export default function Header({onCartOpen}) {

  const ctxCart = useContext(CartContext)
  
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImage} alt="Logo image" />
        <h1>REACT FOOD</h1>
      </div>
      <button className="text-button" onClick={onCartOpen}>
        Cart ({(ctxCart.items) ? ctxCart.items.length : 0})
      </button>
    </header>
  );
}
