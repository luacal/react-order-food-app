import { useContext } from "react"
import { CartContext } from "../store/shopping-cart-context"


export default function MealItem ({mealData}) {

  const ctxCart = useContext(CartContext)

  return (
    <li className="meal-item">
        <article>
          <img src={`http://localhost:3000/${mealData.image}`} alt={mealData.description} />
          <h3>{mealData.name}</h3>
          <span className="meal-item-price">${mealData.price}</span>
          <p className="meal-item-description">
            {mealData.description}
          </p>
          <p className="meal-item-actions">
            <button className="button" onClick={()=>ctxCart.addItemToCart(mealData)}>
              Add to Cart
            </button>
          </p>
        </article>
      </li>
  )
}