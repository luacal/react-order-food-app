import { useContext } from "react";
import shoppingCartContext from "../store/shoppingCartContext.jsx";

export default function CartItem({item}) {

  const cartCtx = useContext(shoppingCartContext);

  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity}x ${item.price}
      </p>
      <div className="cart-item-actions">
        <button
          onClick={() => cartCtx.updateItemQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>
        {item.quantity}
        <button
          onClick={() => cartCtx.updateItemQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
    </li>
  );
}
