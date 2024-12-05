import { useEffect, useState } from "react";

export default function FoodDetails({ foodId }) {
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "37aa341159af4b2d88e658cdc3079bb5";

  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  return (
    <div>
      <div>
        <h1>{food.title}</h1>

        <img src={food.image} alt="" />
        <div>
          <span>
            <strong>🕒 {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👨‍👩‍👦‍👦<strong>Serves {food.servings}</strong>
          </span>
          <span>{food.vegetarian ? "🥕 Vegetarian" : "🍗 Not Vegetarian"}</span>
          <span>{food.vegan ? "🐮 Vegan" : ""}</span>
        </div>
        <div>
          $<span>{food.pricePerServing / 100}</span>
        </div>
      </div>
      <div>
        <h2>Instructions</h2>
        {isLoading ? (
          <p>Loading.....</p>
        ) : (
          food.analyzedInstructions[0].steps.map((item) => <li>{item.step}</li>)
        )}
      </div>
    </div>
  );
}
