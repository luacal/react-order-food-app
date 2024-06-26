import { useContext } from "react"
import CartContext from "../store/shoppingCartContext.jsx"
import { currencyFormatter } from "../util/formatting"
import Button from "./UI/Button.jsx"


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
            <Button onClick={()=>ctxCart.addItemToCart(mealData)}>
              Add to Cart
            </Button>
          </p>
        </article>
      </li>
  )
}