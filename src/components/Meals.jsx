import { useState, useEffect } from 'react'
import MealItem from './MealItem.jsx'

import {fetchMeals} from '../http.js'

export default function Meals () {
  const [isFetching, setIsFetching] = useState(false);
  const [mealsData, setMealsData] = useState([]);
  const [error, setError] = useState('');
    
  
  useEffect(() => {
    setIsFetching(true);

    async function getMeals () {

      try {
        const data = await fetchMeals();
        setMealsData(data);
      } catch (error) {
        setError({message: error.message || 'can not fetch the data'})
      }
      setIsFetching(false);
    }
    getMeals();
  }, [])

  return (
    <ul id="meals" >
      {mealsData.length > 0 && mealsData.map((mealData) => (
        <MealItem key={mealData.id} mealData={mealData}/>
      ))}      
    </ul>
  )
}