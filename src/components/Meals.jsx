import { useState, useEffect } from "react";
import MealItem from "./MealItem.jsx";

import { fetchMeals } from "../http.js";

export default function Meals() {
  const [isFetching, setIsFetching] = useState(false);
  const [mealsData, setMealsData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsFetching(true);

    async function getMeals() {
      try {
        const data = await fetchMeals();
        setMealsData(data);
      } catch (error) {
        setError({ message: error.message || "can not fetch the data" });
      }
      setIsFetching(false);
    }
    getMeals();
  }, []);
  console.log(error);

  let content;

  if (!isFetching && error) {
    content = error.message;
  } else if (!isFetching && !error && mealsData.length === 0) {
    content = `There aren't any meal listed.`;
  } else if (isFetching) {
    content = `Loading...`;
  } else if (mealsData.length > 0) {
    content = mealsData.map((mealData) => (
      <MealItem key={mealData.id} mealData={mealData} />
    ));
  }

  return (
    <ul id="meals">
      {content}
    </ul>
  );
}
