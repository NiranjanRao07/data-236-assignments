import React, { useEffect, useState } from "react";

function Categories({ user }) {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    fetch("/categories")
      .then((res) => res.json())
      .then((data) => setCats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Categories</h1>
      <ul>
        {cats.map((cat) => (
          <li key={cat}>{cat}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
