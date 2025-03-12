import React, { useState } from "react";

function SearchDishes() {
  const [spicy, setSpicy] = useState("");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    let url = "/search?";
    if (spicy) url += `spicy=${spicy}&`;
    if (price) url += `price=${price}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Search Dishes</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Spicy? (True/False): </label>
          <input
            value={spicy}
            onChange={(e) => setSpicy(e.target.value)}
            placeholder="True or False"
          />
        </div>
        <div>
          <label>Max Price: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((dish, idx) => (
          <li key={idx}>
            {dish.name} - {dish.spice} - ${dish.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchDishes;
