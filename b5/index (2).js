const express = require("express");
const app = express();
const port = 8081;

// Parse JSON
app.use(express.json());

// In-memory users
const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "adminpassword",
    role: "admin",
  },
];

// In-memory categories and dishes
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

// Helper to check admin
function isAdmin(username) {
  const user = users.find((u) => u.username === username);
  return user && user.role === "admin";
}

// ----------------- Registration/Login ----------------- //
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const existing = users.find(
    (u) => u.username === username || u.email === email
  );
  if (existing) {
    return res.status(409).json({ error: "User already exists." });
  }
  const newUser = { username, email, password, role: "user" };
  users.push(newUser);
  return res.status(201).json({ message: "User registered", user: newUser });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }
  const found = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!found) {
    return res.status(401).json({ error: "Invalid credentials." });
  }
  return res.json({
    message: "Login successful",
    user: { username: found.username, email: found.email, role: found.role },
  });
});

// ----------------- Normal User Features ----------------- //
app.get("/categories", (req, res) => {
  return res.json(Object.keys(categories));
});

// Search dishes by spice/price
app.get("/search", (req, res) => {
  const { spicy, price } = req.query;
  let filtered = [];
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
          filtered.push(dish);
        }
      });
    }
  }
  return res.json(filtered);
});

// Category info
app.get("/:category", (req, res) => {
  const { category } = req.params;
  if (!categories[category]) {
    return res.status(404).json({ error: "Category not found" });
  }
  return res.json({
    subcategories: categories[category].subcategories,
    details: categories[category].details,
  });
});

// Dishes in subcategory
app.get("/:category/:subcategory", (req, res) => {
  const { category, subcategory } = req.params;
  if (dishes[category] && dishes[category][subcategory]) {
    return res.json(dishes[category][subcategory]);
  }
  return res.status(404).json({ error: "Dishes not found" });
});

// ----------------- Admin Routes ----------------- //

// 1) Search user by name or email
app.get("/admin/users", (req, res) => {
  const { adminUser, username, email } = req.query;
  if (!isAdmin(adminUser)) {
    return res.status(403).json({ error: "Admin access required." });
  }
  let result = users;
  if (username) {
    result = result.filter((u) => u.username.includes(username));
  }
  if (email) {
    result = result.filter((u) => u.email.includes(email));
  }
  // Return { name, email } for each user
  const mapped = result.map((u) => ({
    name: u.username,
    email: u.email,
  }));
  return res.json(mapped);
});

// 2) Add Dish
app.post("/admin/dish", (req, res) => {
  const { adminUser } = req.query;
  if (!isAdmin(adminUser)) {
    return res.status(403).json({ error: "Admin access required." });
  }
  const { category, subcategory, name, spice, price } = req.body;
  if (!category || !subcategory || !name || !spice || price === undefined) {
    return res.status(400).json({ error: "Missing dish info." });
  }
  if (!dishes[category] || !dishes[category][subcategory]) {
    return res.status(404).json({ error: "Invalid category/subcategory." });
  }
  dishes[category][subcategory].push({ name, spice, price });
  return res.status(201).json({ message: "Dish added successfully." });
});

// 3) Remove Dish
app.delete("/admin/dish", (req, res) => {
  const { adminUser } = req.query;
  if (!isAdmin(adminUser)) {
    return res.status(403).json({ error: "Admin access required." });
  }
  const { category, subcategory, name } = req.body;
  if (!category || !subcategory || !name) {
    return res.status(400).json({ error: "Missing dish info." });
  }
  if (!dishes[category] || !dishes[category][subcategory]) {
    return res.status(404).json({ error: "Invalid category/subcategory." });
  }
  dishes[category][subcategory] = dishes[category][subcategory].filter(
    (d) => d.name !== name
  );
  return res.json({ message: "Dish removed successfully." });
});

// 4) Edit Dish
app.put("/admin/dish", (req, res) => {
  const { adminUser } = req.query;
  if (!isAdmin(adminUser)) {
    return res.status(403).json({ error: "Admin access required." });
  }
  const { category, subcategory, name, newName, newSpice, newPrice } = req.body;
  if (!category || !subcategory || !name) {
    return res.status(400).json({ error: "Missing dish info." });
  }
  if (!dishes[category] || !dishes[category][subcategory]) {
    return res.status(404).json({ error: "Invalid category/subcategory." });
  }
  const arr = dishes[category][subcategory];
  const idx = arr.findIndex((d) => d.name === name);
  if (idx === -1) {
    return res.status(404).json({ error: "Dish not found." });
  }
  if (newName) arr[idx].name = newName;
  if (newSpice) arr[idx].spice = newSpice;
  if (newPrice !== undefined) arr[idx].price = newPrice;
  return res.json({ message: "Dish updated successfully." });
});

// 5) Add Category
app.post("/admin/category", (req, res) => {
  const { adminUser } = req.query;
  if (!isAdmin(adminUser)) {
    return res.status(403).json({ error: "Admin access required." });
  }
  const { category, details } = req.body;
  if (!category || !details) {
    return res.status(400).json({ error: "Missing category info." });
  }
  if (categories[category]) {
    return res.status(409).json({ error: "Category already exists." });
  }
  categories[category] = { subcategories: [], details };
  dishes[category] = {};
  return res.status(201).json({ message: "Category added successfully." });
});

// 6) Delete Category
app.delete("/admin/category", (req, res) => {
  const { adminUser } = req.query;
  if (!isAdmin(adminUser)) {
    return res.status(403).json({ error: "Admin access required." });
  }
  const { category } = req.body;
  if (!category) {
    return res.status(400).json({ error: "Category required." });
  }
  if (!categories[category]) {
    return res.status(404).json({ error: "Category not found." });
  }
  delete categories[category];
  delete dishes[category];
  return res.json({ message: "Category deleted successfully." });
});

// 7) Add Subcategory
app.post("/admin/subcategory", (req, res) => {
  const { adminUser } = req.query;
  if (!isAdmin(adminUser)) {
    return res.status(403).json({ error: "Admin access required." });
  }
  const { category, subcategory } = req.body;
  if (!category || !subcategory) {
    return res.status(400).json({ error: "Missing subcategory info." });
  }
  if (!categories[category]) {
    return res.status(404).json({ error: "Category not found." });
  }
  if (categories[category].subcategories.includes(subcategory)) {
    return res.status(409).json({ error: "Subcategory already exists." });
  }
  categories[category].subcategories.push(subcategory);
  dishes[category][subcategory] = [];
  return res.status(201).json({ message: "Subcategory added successfully." });
});

// 8) Delete Subcategory
app.delete("/admin/subcategory", (req, res) => {
  const { adminUser } = req.query;
  if (!isAdmin(adminUser)) {
    return res.status(403).json({ error: "Admin access required." });
  }
  const { category, subcategory } = req.body;
  if (!category || !subcategory) {
    return res.status(400).json({ error: "Missing subcategory info." });
  }
  if (!categories[category]) {
    return res.status(404).json({ error: "Category not found." });
  }
  categories[category].subcategories = categories[
    category
  ].subcategories.filter((sc) => sc !== subcategory);
  delete dishes[category][subcategory];
  return res.json({ message: "Subcategory deleted successfully." });
});

// 9) Reset Admin Password
app.put("/admin/reset-password", (req, res) => {
  const { adminUser } = req.query;
  if (!isAdmin(adminUser)) {
    return res.status(403).json({ error: "Admin access required." });
  }
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ error: "New password required." });
  }
  const adminIndex = users.findIndex((u) => u.username === "admin");
  if (adminIndex === -1) {
    return res.status(404).json({ error: "Admin user not found." });
  }
  users[adminIndex].password = newPassword;
  return res.json({ message: "Admin password reset successfully." });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
