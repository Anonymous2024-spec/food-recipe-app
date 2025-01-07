import styles from "./search.module.css";
import { useState, useEffect } from "react";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "f52b5559f69a439186c7fd6198adee52";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("Pizza");

  useEffect(() => {
    async function fetchFood() {
      const response = await fetch(`${URL}?query=${query}&apiKey=${API_KEY} `);
      const data = await response.json();
      console.log(data.results);
      setFoodData(data.results);
    }
    fetchFood();
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
