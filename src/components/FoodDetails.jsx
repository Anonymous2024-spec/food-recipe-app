import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";

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
    <div className={styles.recipeCard}>
      <div>
        <h1 className={styles.recipeName}>{food.title}</h1>

        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>🕒 {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👨‍👩‍👦‍👦<strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕 Vegetarian" : "🍗 Not Vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐮 Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          $
          <span>
            <strong>{food.pricePerServing / 100}</strong>
          </span>
        </div>
      </div>
      <h2>Ingredients</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        food.extendedIngredients.map((item, index) => (
          <div key={index}>
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
              alt={item.name}
            />
            <h3>{item.name}</h3>
            <h3>
              {item.amount} {item.unit}
            </h3>
          </div>
        ))
      )}

      <h2>Instructions</h2>
      <div className={styles.recipeInstructions}>
        <ol>
          {isLoading ? (
            <p>Loading.....</p>
          ) : (
            food.analyzedInstructions[0].steps.map((item) => (
              <li>{item.step}</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
