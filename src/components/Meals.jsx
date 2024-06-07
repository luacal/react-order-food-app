import MealItem from "./MealItem.jsx";
import useHttp from "./hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

export default function Meals() {
  const {
    data: mealsData,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {mealsData &&
        mealsData.length > 0 &&
        mealsData.map((mealData) => (
          <MealItem key={mealData.id} mealData={mealData} />
        ))}
    </ul>
  );
}

// let content;

// if (!isLoading && error) {
//   content = error.message;
// } else if (!isLoading && !error && mealsData.length === 0) {
//   content = `There aren't any meal listed.`;
// } else if (isLoading) {
//   content = `Loading...`;
// } else if (mealsData.length > 0) {
//   content = mealsData.map((mealData) => (
//     <MealItem key={mealData.id} mealData={mealData} />
//   ));
// }

// return <ul id="meals">{content}</ul>;
