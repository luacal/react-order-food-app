import { useContext, forwardRef, useImperativeHandle, useRef } from "react";
import { CartContext } from "../store/shopping-cart-context";

const CheckoutForm = forwardRef(function CheckoutForm(props, ref) {
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

  function handleOrderSubmission (e) {
    e.preventDefault();
    console.log('order sent', e)
    // validate
    // send the POST to the API
  }

  return (
    <dialog className="modal" ref={dialog}>
      <h2>Checkout</h2>
      <p>Total Amount: {formattedTotalPrice}</p>
      <form onSubmit={(e)=>handleOrderSubmission(e)}>
        <div className="control">
          <label htmlFor="full-name">Full Name</label>
          <input id="full-name" name="full-name" type="text" />
        </div>
        <div className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input id="email" name="email" type="email" />
        </div>
        <div className="control">
          <label htmlFor="street">Street</label>
          <input id="street" name="street" type="text" />
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input id="postal-code" name="postal-code" type="text" />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" />
          </div>
        </div>
        <div className="modal-actions">
          <button
            className="text-button"
            onClick={() => dialog.current.close()}
          >
            Close
          </button>
          <button className="button" onClick={handleOrderSubmission}>Submit Order</button>
        </div>
      </form>
    </dialog>
  );
});

export default CheckoutForm;
