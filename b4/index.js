const express = require("express");
const app = express();
const port = 8081;

const categories = {
  meat: {
    subcategories: ["beef", "pork", "lamb", "chicken"],
    details: "Delicious meat dishes",
  },
  seafood: {
    subcategories: ["fish", "shrimp"],
    details: "Fresh and tasty seafood",
  },
  vegies: {
    subcategories: ["salad", "cookedVeggies"],
    details: "Healthy vegetable-based dishes",
  },
  breadRice: {
    subcategories: ["bread", "rice", "noodle"],
    details: "Bread, rice, and noodle dishes",
  },
  drinks: {
    subcategories: ["alcohol", "nonAlcoholic"],
    details: "Refreshing drinks",
  },
  dessert: {
    subcategories: ["cakes", "cookies", "iceCream"],
    details: "Sweet dessert options",
  },
};

const dishes = {
  meat: {
    beef: [
      { name: "Grilled Beef Steak", spice: "Spicy", price: 15 },
      { name: "Beef Stew", spice: "Mild", price: 20 },
    ],
    pork: [
      { name: "Pork Belly", spice: "Medium", price: 18 },
      { name: "Pulled Pork", spice: "Spicy", price: 16 },
    ],
    lamb: [{ name: "Lamb Chops", spice: "Medium", price: 22 }],
    chicken: [{ name: "Grilled Chicken", spice: "Mild", price: 12 }],
  },
  seafood: {
    fish: [
      { name: "Grilled Salmon", spice: "Spicy", price: 18 },
      { name: "Fish and Chips", spice: "Mild", price: 14 },
    ],
    shrimp: [
      { name: "Shrimp Scampi", spice: "Mild", price: 16 },
      { name: "Shrimp Cocktail", spice: "Spicy", price: 17 },
    ],
  },
  vegies: {
    salad: [{ name: "Caesar Salad", spice: "Mild", price: 9 }],
    cookedVeggies: [
      { name: "Grilled Asparagus", spice: "Mild", price: 12 },
      { name: "Stuffed Bell Peppers", spice: "Spicy", price: 14 },
    ],
  },
  breadRice: {
    bread: [{ name: "Garlic Bread", spice: "Mild", price: 4 }],
    rice: [
      { name: "Fried Rice", spice: "Spicy", price: 8 },
      { name: "Biryani", spice: "Medium", price: 12 },
    ],
    noodle: [{ name: "Pad Thai", spice: "Medium", price: 10 }],
  },
  drinks: {
    alcohol: [
      { name: "Beer", spice: "Mild", price: 3 },
      { name: "Whiskey", spice: "Strong", price: 7 },
    ],
    nonAlcoholic: [
      { name: "Lemonade", spice: "Sweet", price: 5 },
      { name: "Iced Tea", spice: "Mild", price: 2 },
    ],
  },
  dessert: {
    cakes: [
      { name: "Chocolate Cake", spice: "Sweet", price: 6 },
      { name: "Vanilla Cake", spice: "Mild", price: 5 },
    ],
    cookies: [
      { name: "Chocolate Chip Cookies", spice: "Sweet", price: 3 },
      { name: "Oatmeal Cookies", spice: "Mild", price: 4 },
    ],
    iceCream: [
      { name: "Vanilla Ice Cream", spice: "Sweet", price: 4 },
      { name: "Chocolate Ice Cream", spice: "Sweet", price: 4 },
    ],
  },
};

app.get("/", (req, res) => {
  res.json(Object.keys(categories));
});

app.get("/search", (req, res) => {
  const { spicy, price } = req.query;
  let filteredDishes = [];

  const isSpicyQuery =
    spicy === "True" ? true : spicy === "False" ? false : null;
  const maxPrice = price ? parseFloat(price) : null;

  for (let catKey in dishes) {
    for (let subKey in dishes[catKey]) {
      dishes[catKey][subKey].forEach((dish) => {
        let spiceMatch = true;
        let priceMatch = true;

        if (isSpicyQuery === true) {
          spiceMatch = dish.spice.toLowerCase() === "spicy";
        } else if (isSpicyQuery === false) {
          spiceMatch = dish.spice.toLowerCase() !== "spicy";
        }

        if (maxPrice !== null) {
          priceMatch = dish.price <= maxPrice;
        }

        if (spiceMatch && priceMatch) {
          filteredDishes.push(dish);
        }
      });
    }
  }

  res.json(filteredDishes);
});

app.get("/:category", (req, res) => {
  const { category } = req.params;

  if (!categories[category]) {
    return res.status(404).send("Category not found");
  }

  res.json({
    subcategories: categories[category].subcategories,
    description: categories[category].details,
  });
});

app.get("/:category/:subcategory", (req, res) => {
  const { category, subcategory } = req.params;

  if (dishes[category] && dishes[category][subcategory]) {
    return res.json(dishes[category][subcategory]);
  } else {
    return res
      .status(404)
      .send("Dishes not found for the given category or subcategory");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
