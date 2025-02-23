document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll("nav a");
  const contentContainer = document.getElementById("content-container");
  const pageHitCounter = document.getElementById("page-hit-counter");

  // Define categoryData with images for home page and subcategories
  const categoryData = {
    meat: {
      title: "Meat Dishes",
      description: "Delicious and flavorful meat dishes",
      image: "./images/meat-dish.jpg",
      subcategories: {
        beef: {
          title: "Beef",
          items: [
            { name: "Grilled Beef Steak", spice: "Medium", price: "$19.99" },
            { name: "Beef Stew", spice: "Hot", price: "$24.99" },
            { name: "Roast Beef", spice: "Mild", price: "$22.99" },
          ],
          image: "./images/beef-dish.jpg",
        },
        pork: {
          title: "Pork",
          items: [
            { name: "Pork Belly", spice: "Mild", price: "$15.99" },
            { name: "Pulled Pork", spice: "Spicy", price: "$13.99" },
            { name: "Pork Schnitzel", spice: "Medium", price: "$17.99" },
          ],
          image: "./images/pork-dish.jpg",
        },
        lamb: {
          title: "Lamb",
          items: [
            { name: "Lamb Chops", spice: "Hot", price: "$24.99" },
            { name: "Lamb Shawarma", spice: "Medium", price: "$22.99" },
            { name: "Lamb Curry", spice: "Spicy", price: "$19.99" },
          ],
          image: "./images/lamb-dish.jpg",
        },
        poultry: {
          title: "Poultry",
          items: [
            { name: "Grilled Chicken", spice: "Mild", price: "$12.99" },
            { name: "Chicken Wings", spice: "Hot", price: "$15.99" },
            { name: "Roast Chicken", spice: "Medium", price: "$18.99" },
          ],
          image: "./images/poultry-dish.jpg",
        },
      },
    },
    seafood: {
      title: "Seafood Dishes",
      description: "Fresh and tasty seafood options",
      image: "./images/seafood-dish.jpg",
      subcategories: {
        fish: {
          title: "Fish",
          items: [
            { name: "Grilled Salmon", spice: "Spicy", price: "$18.99" },
            { name: "Fish and Chips", spice: "Mild", price: "$14.99" },
            { name: "Baked Cod", spice: "Medium", price: "$16.99" },
          ],
          image: "./images/fish-dish.jpg",
        },
        shrimp: {
          title: "Shrimp",
          items: [
            { name: "Shrimp Scampi", spice: "Mild", price: "$14.99" },
            { name: "Shrimp Cocktail", spice: "Spicy", price: "$16.99" },
            { name: "Garlic Shrimp", spice: "Medium", price: "$17.99" },
          ],
          image: "./images/shrimp-dish.jpg",
        },
        crab: {
          title: "Crab",
          items: [
            { name: "Crab Cakes", spice: "Spicy", price: "$19.99" },
            { name: "Crab Legs", spice: "Mild", price: "$22.99" },
            { name: "Crab Soup", spice: "Medium", price: "$15.99" },
          ],
          image: "./images/crab-dish.jpg",
        },
        shellfish: {
          title: "Shellfish",
          items: [
            { name: "Clams Casino", spice: "Mild", price: "$14.99" },
            { name: "Oysters Rockefeller", spice: "Medium", price: "$19.99" },
            { name: "Lobster Roll", spice: "Spicy", price: "$24.99" },
          ],
          image: "./images/shellfish-dish.jpg",
        },
      },
    },
    vegetable: {
      title: "Vegetable Dishes",
      description: "Healthy and nutritious vegetable options",
      image: "./images/vegetable-dish.jpeg",
      subcategories: {
        salad: {
          title: "Salad",
          items: [
            { name: "Caesar Salad", spice: "Mild", price: "$9.99" },
            { name: "Greek Salad", spice: "Medium", price: "$10.99" },
            { name: "Waldorf Salad", spice: "Sweet", price: "$8.99" },
          ],
          image: "./images/salad-dish.jpg",
        },
        cooked: {
          title: "Cooked",
          items: [
            { name: "Grilled Asparagus", spice: "Mild", price: "$12.99" },
            { name: "Stuffed Bell Peppers", spice: "Spicy", price: "$14.99" },
            { name: "Vegetable Stir-Fry", spice: "Hot", price: "$13.99" },
          ],
          image: "./images/cooked-dish.jpg",
        },
      },
    },
    "bread-rice": {
      title: "Bread & Rice Dishes",
      description: "Tasty bread and rice options to accompany your meal",
      image: "./images/bread-rice-dish.jpg",
      subcategories: {
        bread: {
          title: "Bread",
          items: [
            { name: "Garlic Bread", spice: "Mild", price: "$4.99" },
            { name: "Focaccia", spice: "Medium", price: "$5.99" },
            { name: "Sourdough", spice: "Mild", price: "$3.99" },
          ],
          image: "./images/bread-dish.jpg",
        },
        rice: {
          title: "Rice",
          items: [
            { name: "Fried Rice", spice: "Spicy", price: "$8.99" },
            { name: "Biryani", spice: "Medium", price: "$12.99" },
            { name: "Pilaf", spice: "Mild", price: "$10.99" },
          ],
          image: "./images/rice-dish.jpg",
        },
        noodle: {
          title: "Noodle",
          items: [
            { name: "Pad Thai", spice: "Medium", price: "$11.99" },
            { name: "Ramen", spice: "Spicy", price: "$13.99" },
            { name: "Spaghetti", spice: "Mild", price: "$9.99" },
          ],
          image: "./images/noodle-dish.jpg",
        },
        potato: {
          title: "Potato",
          items: [
            { name: "Mashed Potatoes", spice: "Mild", price: "$5.99" },
            { name: "Baked Potato", spice: "Medium", price: "$6.99" },
            { name: "French Fries", spice: "Spicy", price: "$4.99" },
          ],
          image: "./images/potato-dish.jpg",
        },
      },
    },
    soup: {
      title: "Soup Dishes",
      description: "Warm and comforting soups",
      image: "./images/soup-dish.jpg",
      items: [
        { name: "Tomato Soup", spice: "Mild", price: "$5.99" },
        { name: "Chicken Soup", spice: "Spicy", price: "$7.99" },
        { name: "Vegetable Soup", spice: "Hot", price: "$6.99" },
      ],
    },
    drink: {
      title: "Drink Dishes",
      description: "Refreshing drinks to complement your meal",
      image: "./images/drink-dish.jpg",
      subcategories: {
        alcohol: {
          title: "Alcohol",
          items: [
            { name: "Beer", spice: "Mild", price: "$3.99" },
            { name: "Whiskey", spice: "Strong", price: "$7.99" },
            { name: "Vodka", spice: "Strong", price: "$8.99" },
          ],
          image: "./images/alcohol-dish.jpg",
        },
        wine: {
          title: "Wine",
          items: [
            { name: "Red Wine", spice: "Mild", price: "$12.99" },
            { name: "White Wine", spice: "Mild", price: "$10.99" },
            { name: "Champagne", spice: "Sweet", price: "$14.99" },
          ],
          image: "./images/wine-dish.jpg",
        },
        "soft-drink": {
          title: "Soft Drink",
          items: [
            { name: "Lemonade", spice: "Sweet", price: "$3.99" },
            { name: "Ice Tea", spice: "Mild", price: "$2.99" },
            { name: "Coffee", spice: "Hot", price: "$1.99" },
          ],
          image: "./images/soft-drink-dish.jpg",
        },
      },
    },
    dessert: {
      title: "Dessert Dishes",
      description: "Sweet and delicious desserts to end your meal",
      image: "./images/dessert-dish.jpg",
      subcategories: {
        cheese: {
          title: "Cheese",
          items: [
            { name: "Cheese Platter", spice: "Mild", price: "$6.99" },
            { name: "Cheese Cake", spice: "Sweet", price: "$8.99" },
          ],
          image: "./images/cheese-dish.jpg",
        },
        cookie: {
          title: "Cookie",
          items: [
            { name: "Chocolate Chip Cookies", spice: "Sweet", price: "$3.99" },
            { name: "Oatmeal Cookies", spice: "Mild", price: "$4.99" },
          ],
          image: "./images/cookie-dish.jpg",
        },
        cake: {
          title: "Cake",
          items: [
            { name: "Chocolate Cake", spice: "Sweet", price: "$5.99" },
            { name: "Vanilla Cake", spice: "Mild", price: "$6.99" },
          ],
          image: "./images/cake-dish.jpg",
        },
        "ice-cream": {
          title: "Ice Cream",
          items: [
            { name: "Vanilla Ice Cream", spice: "Sweet", price: "$3.99" },
            { name: "Chocolate Ice Cream", spice: "Sweet", price: "$4.99" },
          ],
          image: "./images/ice-cream-dish.jpg",
        },
        fruit: {
          title: "Fruit",
          items: [
            { name: "Fruit Salad", spice: "Sweet", price: "$4.99" },
            { name: "Berry Bowl", spice: "Sweet", price: "$5.99" },
          ],
          image: "./images/fruit-dish.jpg",
        },
      },
    },
  };

  // Function to load the content for a selected category and subcategory
  function loadCategoryContent(category, subcategory, addToHistory = true) {
    const categoryInfo = categoryData[category];
    const subcategoryInfo = categoryInfo.subcategories
      ? categoryInfo.subcategories[subcategory]
      : null;

    if (!categoryInfo) return;

    let contentHtml = `
      <main>
        <div class="category-page">
          <img src="${
            subcategoryInfo ? subcategoryInfo.image : categoryInfo.image
          }" alt="${
      subcategoryInfo ? subcategoryInfo.title : categoryInfo.title
    }" class="theme-image" />
          <div class="content">
            <h1>${
              subcategoryInfo ? subcategoryInfo.title : categoryInfo.title
            }</h1>
            <p>${categoryInfo.description}</p>
            ${
              subcategoryInfo
                ? `<ul>
                ${subcategoryInfo.items
                  .map(
                    (item) =>
                      `<li>${item.name} - <span>${item.spice}</span> - ${item.price}</li>`
                  )
                  .join("")}
              </ul>`
                : ""
            }
          </div>
        </div>
      </main>
    `;

    contentContainer.innerHTML = contentHtml;

    if (addToHistory) {
      history.pushState(
        { category, subcategory },
        `${category} - ${subcategory}`,
        `#${category}-${subcategory}`
      );
    }
  }

  // Function to load the home page
  function loadHomePage(addToHistory = true) {
    contentContainer.innerHTML = `
      <main>
        <div class="category-list">
          ${Object.keys(categoryData)
            .map(
              (category) => `
              <div class="category-item">
                <h3>${categoryData[category].title}</h3>
                <img src="${categoryData[category].image}" alt="${categoryData[category].title}" class="theme-image"/>
              </div>
            `
            )
            .join("")}
        </div>
      </main>
    `;

    if (addToHistory) {
      history.pushState(null, "Home", "#home");
    }
  }

  // Event listener for category and subcategory selection
  categories.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const category = e.target.getAttribute("data-category");
      const subcategory = e.target.getAttribute("data-subcategory");

      console.log("Category: ", category);
      console.log("Subcategory: ", subcategory);

      if (category === "home") {
        loadHomePage();
      } else if (subcategory) {
        loadCategoryContent(category, subcategory); // Load subcategory
      } else {
        loadCategoryContent(category); // Load category without subcategory
      }
    });
  });

  // Handle browser back/forward navigation
  window.onpopstate = function (event) {
    if (event.state && event.state.category && event.state.subcategory) {
      loadCategoryContent(event.state.category, event.state.subcategory, false);
    } else {
      loadHomePage(false);
    }
  };

  let pageHitCount = parseInt(localStorage.getItem("pageHitCount") || 0);
  pageHitCount += 1;
  localStorage.setItem("pageHitCount", pageHitCount);
  console.log(`This page has been visited ${pageHitCount} times.`);

  if (pageHitCounter) {
    pageHitCounter.textContent = `Page Visits: ${pageHitCount}`;
  }

  // Load the correct page on initial load or refresh
  if (window.location.hash && window.location.hash !== "#home") {
    const hash = window.location.hash.substring(1);
    const [category, subcategory] = hash.split("-");
    loadCategoryContent(category, subcategory, false);
  } else {
    loadHomePage(false);
  }
});
