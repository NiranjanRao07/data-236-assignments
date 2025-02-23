document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll("nav a");
  const contentContainer = document.getElementById("content-container");
  const pageHitCounter = document.getElementById("page-hit-counter"); // Add reference to the counter

  // Define categoryData fully before using it
  const categoryData = {
    meat: {
      title: "Meat Dishes",
      description: "Delicious and flavorful meat dishes",
      items: [
        { name: "Grilled Chicken", spice: "Spicy", price: "$12.99" },
        { name: "Beef Steak", spice: "Medium", price: "$19.99" },
        { name: "Lamb Chops", spice: "Hot", price: "$24.99" },
      ],
      image: "./images/meat-dish.jpg", // Fixed path
    },
    seafood: {
      title: "Seafood Dishes",
      description: "Fresh and tasty seafood options",
      items: [
        { name: "Shrimp Scampi", spice: "Mild", price: "$14.99" },
        { name: "Grilled Salmon", spice: "Spicy", price: "$18.99" },
        { name: "Lobster Tail", spice: "Hot", price: "$29.99" },
      ],
      image: "./images/seafood-dish.jpg", // Fixed path
    },
    vegetable: {
      title: "Vegetable Dishes",
      description: "Healthy and nutritious vegetable options",
      items: [
        { name: "Grilled Asparagus", spice: "Mild", price: "$9.99" },
        { name: "Stuffed Bell Peppers", spice: "Spicy", price: "$12.99" },
        { name: "Vegetable Stir-Fry", spice: "Hot", price: "$15.99" },
      ],
      image: "./images/vegetable-dish.jpeg", // Fixed path
    },
    "bread-rice": {
      title: "Bread & Rice Dishes",
      description: "Tasty bread and rice options to accompany your meal",
      items: [
        { name: "Garlic Bread", spice: "Mild", price: "$4.99" },
        { name: "Fried Rice", spice: "Spicy", price: "$8.99" },
        { name: "Chicken Biryani", spice: "Hot", price: "$12.99" },
      ],
      image: "./images/bread-rice.jpg", // Fixed path
    },
    soup: {
      title: "Soup Dishes",
      description: "Warm and comforting soups",
      items: [
        { name: "Tomato Soup", spice: "Mild", price: "$5.99" },
        { name: "Chicken Soup", spice: "Spicy", price: "$7.99" },
        { name: "Vegetable Soup", spice: "Hot", price: "$6.99" },
      ],
      image: "./images/soup-dish.jpg", // Fixed path
    },
    drink: {
      title: "Drink Dishes",
      description: "Refreshing drinks to complement your meal",
      items: [
        { name: "Lemonade", spice: "Sweet", price: "$3.99" },
        { name: "Ice Tea", spice: "Mild", price: "$2.99" },
        { name: "Coffee", spice: "Hot", price: "$1.99" },
      ],
      image: "./images/drink-dish.jpg", // Fixed path
    },
    dessert: {
      title: "Dessert Dishes",
      description: "Sweet and delicious desserts to end your meal",
      items: [
        { name: "Chocolate Cake", spice: "Sweet", price: "$6.99" },
        { name: "Fruit Salad", spice: "Mild", price: "$4.99" },
        { name: "Ice Cream Sundae", spice: "Sweet", price: "$5.99" },
      ],
      image: "./images/dessert-dish.jpg", // Fixed path
    },
  };

  // Function to load the content for a selected category
  function loadCategoryContent(category, addToHistory = true) {
    const categoryInfo = categoryData[category];
    if (!categoryInfo) return;

    contentContainer.innerHTML = `
        <main>
          <div class="category-page">
            <img src="${categoryInfo.image}" alt="${
      categoryInfo.title
    }" class="theme-image" /> <!-- Image on the left -->
            <div class="content">
              <h1>${categoryInfo.title}</h1>
              <p>${categoryInfo.description}</p>
              <ul>
                ${categoryInfo.items
                  .map(
                    (item) =>
                      `<li>${item.name} - <span>${item.spice}</span> - ${item.price}</li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        </main>
      `;

    // Add to history only if it's not a popstate event
    if (addToHistory) {
      history.pushState({ category }, `${category} Page`, `#${category}`);
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
                </div>`
              )
              .join("")}
          </div>
        </main>
      `;

    if (addToHistory) {
      history.pushState(null, "Home", "#home");
    }
  }

  // Event listener for category selection
  categories.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = e.target.getAttribute("data-category");
      if (category === "home") {
        loadHomePage();
      } else {
        loadCategoryContent(category);
      }
    });
  });


  window.onpopstate = function (event) {
    if (event.state && event.state.category) {
      loadCategoryContent(event.state.category, false);
    } else {
      loadHomePage(false);
    }
  };

  let pageHitCount = parseInt(localStorage.getItem("pageHitCount") || 0);
  pageHitCount += 1; // Increment the page hit count
  localStorage.setItem("pageHitCount", pageHitCount);
  console.log(`This page has been visited ${pageHitCount} times.`);

  // Ensure the counter updates in the footer
  if (pageHitCounter) {
    pageHitCounter.textContent = `Page Visits: ${pageHitCount}`;
  }

  // Load the correct page on initial load or refresh
  if (window.location.hash && window.location.hash !== "#home") {
    const category = window.location.hash.substring(1);
    loadCategoryContent(category, false);
  } else {
    loadHomePage(false);
  }
});
