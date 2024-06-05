import {useContext } from "react";
import CartContext from "../store/shopping-cart-context.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";

export default function Cart({onCheckoutOpen, onClose}) {
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
 
  return (
      <Modal className="cart" open={userProgressCtx.progress === 'cart'}>

        <h2>Your Cart</h2>
        <ul>
          {cartCtx.items.length > 0 &&
            cartCtx.items.map((item) => (
              <li key={item.id} className="cart-item">
                <p>
                  {item.name} - {item.quantity}x ${item.price}
                </p>
                <div className="cart-item-actions">
                  <button
                    onClick={() =>
                      cartCtx.updateItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() =>
                      cartCtx.updateItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <div className="cart-total">
          {formattedTotalPrice ? formattedTotalPrice : 0}
        </div>
        <div className="modal-actions">
          <Button textOnly={true} onClick={handleCloseCart}>
            Close
          </Button>
          <Button onClick={onCheckoutOpen}>
            Go to checkout
          </Button>
        </div>
      </Modal>
  );
}

