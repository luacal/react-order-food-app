import { useContext, forwardRef, useImperativeHandle, useRef } from "react";
import { CartContext } from "../store/shopping-cart-context";
// import formValidation from "../form-validation.js";
import Button from "./UI/Button.jsx";

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

  function handleOrderSubmission (event) {
    e.preventDefault();
    
    const  fd = new FormData(event.target);
    const enteredFullName = fd.get('full-name');
    const enteredEmail = fd.get('email');
    const enteredStreet = fd.get('street');
    const enteredPostalCode = fd.get('postal-code');
    const enteredCity = fd.get('city');

    //or: const data = Object.fromEntries(fd.entries()); -> a data object containing all values

    console.log('fd',fd);
    // validate
    const value = 'aaaa';
    // console.log('formValidation', formValidation)
    // console.log(formValidation.isNotEmpty(value));
    

    // send the POST to the API


  }

  return (
    <dialog className="modal" ref={dialog}>
      <h2>Checkout</h2>
      <p>Total Amount: {formattedTotalPrice}</p>
      <form onSubmit={(event)=>handleOrderSubmission(event)}>
        <div className="control">
          <label htmlFor="full-name">Full Name</label>
          <input id="full-name" name="full-name" type="text" value="Luã Caldeira Oliveira" />
        </div>
        <div className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input id="email" name="email" type="email" value="luacal@gmail.com" />
        </div>
        <div className="control">
          <label htmlFor="street">Street</label>
          <input id="street" name="street" type="text" value="Rua Alice B" />
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input id="postal-code" name="postal-code" type="text" value="96785172"/>
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" value="Camaquã" />
          </div>
        </div>
        <div className="modal-actions">
          <Button textOnly={true} onClick={() => dialog.current.close()}>Close</Button>
          <Button>Submit Order</Button>
        </div>
      </form>
    </dialog>
  );
});

export default CheckoutForm;
