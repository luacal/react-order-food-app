import { useContext } from "react";
import CartContext from "../store/shoppingCartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "./hooks/useHttp.js";
import Error from "./Error.jsx";
import Button from "./UI/Button.jsx";
import Modal from "./UI/Modal.jsx";
import Input from "./UI/Input.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckoutForm() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

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

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
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

    const customerData = Object.fromEntries(fd.entries());
    
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        }
      })
    );
    
  }

  let actions = (
    <>
      <Button textOnly={true} onClick={(event) => handleCheckoutClose(event)}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
      <h2>Success</h2>
      <p>Your order was submitted successfully</p>
      <p>We will get back to you with more details via email within the next few minutes.</p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
  }

  return (
    <Modal
      className="checkout"
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCheckoutClose}
    >
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
        {error && <Error title="Failed to submit order" message={error} />}
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
