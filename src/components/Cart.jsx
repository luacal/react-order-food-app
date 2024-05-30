import { forwardRef, useImperativeHandle, useRef, useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

const Cart = forwardRef(function Cart(props, ref) {
  const cartCtx = useContext(CartContext);
  const dialog = useRef();
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
          dialog.current.showModal();
        },
        close() {
          dialog.current.close();
        },
      };
    },
    []
  );
  
  return (
    <dialog className="modal" ref={dialog}>
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
          <button
            className="text-button"
            onClick={() => dialog.current.close()}
          >
            Close
          </button>
          <button className="button">Go to checkout</button>
        </div>
      </div>
    </dialog>
  );
});

export default Cart;
