import { forwardRef, useImperativeHandle, useRef, useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";
import Button from "./UI/Button.jsx";

const Cart = forwardRef(function Cart({onCheckoutOpen}, ref) {
  const cartCtx = useContext(CartContext);
  const cartDialog = useRef();
  let formattedTotalPrice = `$0,00`;

  if (cartCtx.items.length > 0) {
    const totalPrice = cartCtx.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          cartDialog.current.showModal();
        },
        close() {
          cartDialog.current.close();
        },
      };
    },
    []
  );

  
  
  return (
    <dialog className="modal" ref={cartDialog}>
      <div className="cart">
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
          <Button textOnly={true} onClick={() => cartDialog.current.close()}>
            Close
          </Button>
          <Button onClick={onCheckoutOpen}>
            Go to checkout
          </Button>
        </div>
      </div>
    </dialog>
  );
});

export default Cart;
