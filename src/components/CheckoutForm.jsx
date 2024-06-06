import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/shoppingCartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
// import formValidation from "../form-validation.js";
import Button from "./UI/Button.jsx";
import Input from "./UI/Input.jsx";

export default function CheckoutForm() {
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

  function handleCheckoutClose(event) {
    event.preventDefault();
    userProgressCtx.hideCheckout();
  }

  function handleOrderSubmission(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    // const enteredFullName = fd.get("full-name");
    // const enteredEmail = fd.get("email");
    // const enteredStreet = fd.get("street");
    // const enteredPostalCode = fd.get("postal-code");
    // const enteredCity = fd.get("city");

    //or: const data = Object.fromEntries(fd.entries()); -> a data object containing all values

    const customerData = Object.fromEntries(fd.entries())

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData
        }
      })
    })

    // validate
    
    // console.log('formValidation', formValidation)
    // console.log(formValidation.isNotEmpty(value));

    // send the POST to the API
  }

  return (
    <Modal className="checkout" open={userProgressCtx.progress === "checkout"} onClose={handleCheckoutClose}>

      <form onSubmit={(event) => handleOrderSubmission(event)}>

        <h2>Checkout</h2>
        <p>Total Amount: {formattedTotalPrice}</p>

        <Input label="Full Name" id="name" type="text"></Input>
        <Input label="E-mail Address" id="email" type="email"></Input>
        <Input label="Street" id="street" type="text"></Input>

        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text"></Input>
          <Input label="City" id="city" type="text"></Input>
        </div>

        <div className="modal-actions">
          <Button
            textOnly={true}
            onClick={(event) => handleCheckoutClose(event)}
          >
            Close
          </Button>
          <Button>Submit Order</Button>
        </div>
      </form>
    </Modal>
  );
}
