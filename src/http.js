export async function fetchMeals () {
  console.log('fetching data...');
  const response = await fetch('http://localhost:3000/meals');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('can not fetch data');
  }
  console.log(resData);
  return resData;

}