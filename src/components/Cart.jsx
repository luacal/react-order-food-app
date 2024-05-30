import { useState, forwardRef, useImperativeHandle, useRef } from "react";

const Cart = forwardRef(function Cart(props, ref) {

  const dialog = useRef();

  useImperativeHandle(ref, ()=> {
    return {
      open() { dialog.current.showModal()},
      close() {dialog.current.close()} 
    }
  }, [])

  return (
    <dialog className="modal" ref={dialog}>
      <div className="cart">
        <h2>Your Cart</h2>
        <ul>
          <li className="cart-item">
            <p>Seafood Paella - 2x $19.99</p>
            <div className="cart-item-actions">
              <button>-</button>2<button>+</button>
            </div>
          </li>
        </ul>
        <div className="cart-total">$73.96</div>
        <div className="modal-actions">
          <button className="text-button" onClick={()=>dialog.current.close()}>Close</button>
          <button className="button">Go to checkout</button>
        </div>
      </div>
    </dialog>
  );
})

export default Cart;