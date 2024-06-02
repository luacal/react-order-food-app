import { useContext } from "react"
import { CartContext } from "../store/shopping-cart-context"
import { currencyFormatter } from "../util/formatting"


export default function MealItem ({mealData}) {

  const ctxCart = useContext(CartContext)

  return (
    <li className="meal-item">
        <article>
          <img src={`http://localhost:3000/${mealData.image}`} alt={mealData.description} />
          <div>
            <h3>{mealData.name}</h3>
            <span className="meal-item-price">{currencyFormatter.format(mealData.price)}</span>
            <p className="meal-item-description">
              {mealData.description}
            </p>
          </div>
          <p className="meal-item-actions">
            <button className="button" onClick={()=>ctxCart.addItemToCart(mealData)}>
              Add to Cart
            </button>
          </p>
        </article>
      </li>
  )
}