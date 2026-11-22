import { useState, useRef } from "react";
import "./App.css";
const recommendations = {
  "Pani Puri": ["Sev Puri","Raj Kachori","Dahi Puri"],
  "Samosa": ["Kachori","Mirchi Vada","Pyaz Kachori"],
  "Jalebi": ["Rabri","Ghewar","Malpua"]
};

function App() {
  // States
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFood, setSelectedFood] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const[randomFood, setRandomFood]=
  useState(null);

  // Voice Search Ref
  const recognitionRef = useRef(null);

  // Voice Search Function
  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice Search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSearch(text);
    };

    recognition.onerror = (event) => {
  console.log("Speech Error:", event.error);
  alert("Error: " + event.error);
};

    recognition.start();
    recognitionRef.current = recognition;
  };

  const foods = [

    {
      name: "Pani Puri",
      category: "Chaat",
      description: "Crispy golgappas with spicy and tangy pani.",
      image: "/images/pani-puri.jpg",
      state: "Maharashtra",
      spice: "🌶️🌶️🌶️",
      price: "₹40",
      rating: "4.8 ⭐"
    },
    {
      name: "Samosa",
      category: "Snacks",
      description: "Crispy golden pastry filled with spicy potatoes.",
      image: "/images/samosa.jpg",
      state: "Uttar Pradesh",
      spice: "🌶️🌶️",
      price: "₹25",
      rating: "4.7 ⭐"
    },
    {
      name: "Momos",
      category: "Snacks",
      description: "Steamed dumplings served with spicy chutney.",
      image: "/images/momos.jpg",
      state: "Sikkim",
      spice: "🌶️🌶️🌶️",
      price: "₹80",
      rating: "4.9 ⭐"
    },
    {
      name: "Aloo Tikki",
      category: "Chaat",
      description: "Crispy potato patties with chutneys.",
      image: "/images/aloo-tikki.jpg",
      state: "Delhi",
      spice: "🌶️🌶️",
      price: "₹50",
      rating: "4.6 ⭐"
    },
    {
      name: "Pav Bhaji",
      category: "Snacks",
      description: "Spicy mashed vegetables served with buttered pav.",
      image: "/images/pav-bhaji.jpg",
      state: "Maharashtra",
      spice: "🌶️🌶️🌶️",
      price: "₹120",
      rating: "4.8 ⭐"
    },
    {
      name: "Vada Pav",
      category: "Snacks",
      description: "Mumbai special potato fritter burger.",
      image: "/images/vada-pav.jpg",
      state: "Maharashtra",
      spice: "🌶️🌶️",
      price: "₹35",
      rating: "4.8 ⭐"
    },
    {
      name: "Dahi Puri",
      category: "Chaat",
      description: "Crunchy puris filled with yogurt and chutneys.",
      image: "/images/dahi-puri.jpg",
      state: "Maharashtra",
      spice: "🌶️",
      price: "₹60",
      rating: "4.7 ⭐"
    },
    {
      name: "Sev Puri",
      category: "Chaat",
      description: "Crispy puris topped with sev and chutneys.",
      image: "/images/sev-puri.jpg",
      state: "Maharashtra",
      spice: "🌶️🌶️",
      price: "₹50",
      rating: "4.6 ⭐"
    },
    {
      name: "Bhel Puri",
      category: "Chaat",
      description: "Tangy puffed rice mixed with vegetables.",
      image: "/images/bhel-puri.jpg",
      state: "Maharashtra",
      spice: "🌶️🌶️",
      price: "₹40",
      rating: "4.5 ⭐"
    },
    {
      name: "Kachori",
      category: "Snacks",
      description: "Rajasthani crispy snack with spicy filling.",
      image: "/images/kachori.jpg",
      state: "Rajasthan",
      spice: "🌶️🌶️🌶️",
      price: "₹30",
      rating: "4.7 ⭐"
    },
    {
      name: "Pyaz Kachori",
      category: "Jaipur Special",
      description: "Famous Jaipur onion-filled crispy kachori.",
      image: "/images/pyaz-kachori.jpg",
      state: "Rajasthan",
      spice: "🌶️🌶️🌶️",
      price: "₹40",
      rating: "4.9 ⭐"
    },
    {
      name: "Mirchi Vada",
      category: "Jaipur Special",
      description: "Green chilli stuffed with spicy potato filling.",
      image: "/images/mirchi-vada.jpg",
      state: "Rajasthan",
      spice: "🌶️🌶️🌶️🌶️",
      price: "₹35",
      rating: "4.8 ⭐"
    },
    {
      name: "Masala Dosa",
      category: "South Indian",
      description: "Crispy dosa filled with spiced potato masala.",
      image: "/images/masala-dosa.jpg",
      state: "Karnataka",
      spice: "🌶️🌶️",
      price: "₹120",
      rating: "4.9 ⭐"
    },
    {
      name: "Idli Sambar",
      category: "South Indian",
      description: "Soft steamed rice cakes served with hot sambar.",
      image: "/images/idli-sambar.jpg",
      state: "Tamil Nadu",
      spice: "🌶️",
      price: "₹80",
      rating: "4.8 ⭐"
    },
    {
      name: "Medu Vada",
      category: "South Indian",
      description: "Crispy lentil doughnuts served with chutney.",
      image: "/images/medu-vada.jpg",
      state: "Tamil Nadu",
      spice: "🌶️",
      price: "₹70",
      rating: "4.7 ⭐"
    },
    {
      name: "Uttapam",
      category: "South Indian",
      description: "Soft savoury pancake topped with vegetables.",
      image: "/images/uttapam.jpg",
      state: "Tamil Nadu",
      spice: "🌶️",
      price: "₹100",
      rating: "4.7 ⭐"
    },
    {
      name: "Jalebi",
      category: "Sweets",
      description: "Golden crispy spirals soaked in sugar syrup.",
      image: "/images/jalebi.jpg",
      state: "Uttar Pradesh",
      spice: "❌",
      price: "₹60",
      rating: "4.9 ⭐"
    },
    {
      name: "Gulab Jamun",
      category: "Sweets",
      description: "Soft milk-solid dumplings in sugar syrup.",
      image: "/images/gulab-jamun.jpg",
      state: "West Bengal",
      spice: "❌",
      price: "₹80",
      rating: "4.9 ⭐"
    },
    {
      name: "Kulfi",
      category: "Sweets",
      description: "Traditional Indian creamy frozen dessert.",
      image: "/images/kulfi.jpg",
      state: "Delhi",
      spice: "❌",
      price: "₹70",
      rating: "4.8 ⭐"
    },
    {
      name: "Rabri",
      category: "Sweets",
      description: "Rich and creamy reduced milk dessert.",
      image: "/images/rabri.jpg",
      state: "Uttar Pradesh",
      spice: "❌",
      price: "₹90",
      rating: "4.8 ⭐"
    },
    {
      name: "Chole Bhature",
      category: "Snacks",
      description: "Spicy chickpeas served with fluffy fried bread.",
      image: "/images/chole-bhature.jpg",
      state: "Punjab",
      spice: "🌶️🌶️🌶️",
      price: "₹150",
      rating: "4.9 ⭐"
    },
    {
      name: "Dabeli",
      category: "Snacks",
      description: "Gujarati spicy potato-filled bun.",
      image: "/images/dabeli.jpg",
      state: "Gujarat",
      spice: "🌶️🌶️",
      price: "₹50",
      rating: "4.7 ⭐"
    }
  ];
  const suggestFood = () => {
  const random = foods[Math.floor(Math.random() * foods.length)];
  setRandomFood(random);
};

  const filteredFoods = foods.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.description.toLowerCase().includes(search.toLowerCase()) ||
      food.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  return (
  <div className={darkMode ? "app dark" : "app"}>
    <nav className="navbar">
      <h2>🍜 StreetBite AI</h2>
      <button
  className="dark-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#explore">Explore Food</a>
        <a href="#about">About</a>
      </div>
    </nav>

    <section className="hero" id="home">
      <p className="tagline">DISCOVER THE TASTE OF INDIA</p>

      <h1>Explore India's Amazing Street Food</h1>

      <p>
        Discover famous street foods, explore local flavours and find your
        next favourite dish.
      </p>

      <a className="explore-btn" href="#explore">
        Explore Foods
      </a>
    </section>

    <section className="explore" id="explore">

      <h2>Popular Street Foods</h2>

      <p>Explore delicious street food favourites from across India.</p>

      <input
        type="text"
        className="food-search"
        placeholder="Search food or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
  className="voice-btn"
  onClick={startVoiceSearch}
>
  🎤 Voice Search
</button>
<button
  className="random-btn"
  onClick={suggestFood}
>
  🎲 Suggest Random Food
</button>

      <div className="category-buttons">
        {[
          "All",
          "Chaat",
          "Snacks",
          "Jaipur Special",
          "South Indian",
          "Sweets",
        ].map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active-btn" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <h3>{filteredFoods.length} Foods Available</h3>

      <div className="food-grid">
  {filteredFoods.map((food) => (
    <div
      className="food-card"
      key={food.name}
      onClick={() => setSelectedFood(food)}
    

    >
      <img
        className="food-image"
        src={food.image}
        alt={food.name}
      />

      <h3>{food.name}</h3>

      <button
className="favorite-btn"
  onClick={(e) => {
          e.stopPropagation();

          if (favorites.includes(food.name)) {
            setFavorites(
              favorites.filter((item) => item !== food.name)
            );
          } else {
            setFavorites([...favorites, food.name]);
          }
        }}
      >
        {favorites.includes(food.name)
          ? "❤️ Favourite"
          : "🤍 Add Favourite"}
      </button>

      <div className="rating">
        ⭐⭐⭐⭐⭐
      </div>

      <p>{food.description}</p>

      <span className="food-category">
        {food.category}
      </span>
    </div>
  ))}

  {filteredFoods.length === 0 && (
    <p>No food found.</p>
  )}
</div>
{filteredFoods.length === 0 && (
  <p>No food found.</p>
)}


      {selectedFood && (
  <div
    className="popup-overlay"
    onClick={() => setSelectedFood(null)}
  >
    <div
      className="popup-card"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={selectedFood.image}
        alt={selectedFood.name}
      />

      <h2>{selectedFood.name}</h2>

      <p>{selectedFood.description}</p>

      <p>
        <strong>📍 Origin:</strong>{" "}
        {selectedFood.state}
      </p>

      <p>
        <strong>🌶️ Spice Level:</strong>{" "}
        {selectedFood.spice}
      </p>

      <p>
        <strong>💰 Average Price:</strong>{" "}
        {selectedFood.price}
      </p>

      <p>
        <strong>⭐ Rating:</strong>{" "}
        {selectedFood.rating}
      </p>

      <button
  className="recipe-btn"
  onClick={() =>
    window.open(
      `https://www.youtube.com/results?search_query=${selectedFood.name}+recipe`,
      "_blank"
    )
  }
>
  🍳 Watch Recipe
</button>

<button
  className="recipe-btn"
  onClick={() =>
    window.open(
      `https://www.google.com/maps/search/${selectedFood.name}`,
      "_blank"
    )
  }
>
  📍 Find Nearby
</button>

<button
  className="close-btn"
  onClick={() => setSelectedFood(null)}
>
  ❌ Close
</button>
            </div>
  </div>
)}

</section>
<footer id="about">
  <p>© 2026 StreetBite AI | Explore • Discover • Enjoy ❤️</p>
</footer>
</div>
);
}

export default App;