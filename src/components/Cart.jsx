import {useContext } from "react";
import CartContext from "../store/shoppingCartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from './CartItem.jsx';
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  let formattedTotalPrice = `$0,00`;

  if (cartCtx.items.length > 0) {
    const totalPrice = cartCtx.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  }

  function handleCloseCart () {
    userProgressCtx.hideCart();
  }

  function handleCheckoutOpen () {
    userProgressCtx.showCheckout();
  }
 
  return (
      <Modal className="cart" open={userProgressCtx.progress === 'cart'}>

        <h2>Your Cart</h2>
        <ul>
          {cartCtx.items.length > 0 &&
            cartCtx.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
        </ul>
        <div className="cart-total">
          {formattedTotalPrice ? formattedTotalPrice : 0}
        </div>
        <div className="modal-actions">
          <Button textOnly={true} onClick={handleCloseCart}>
            Close
          </Button>
          {cartCtx.items.length > 0 && 
          <Button onClick={handleCheckoutOpen}>
            Go to checkout
          </Button>}          
        </div>
      </Modal>
  );
}

