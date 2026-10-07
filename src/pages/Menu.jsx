import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  X,
  Star,
  Clock,
  Search,
} from "lucide-react";
import { useCart } from "../CartContext";

const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 249,
    rating: 4.7,
    time: "25 min",
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Classic Cheese Burger",
    price: 199,
    rating: 4.6,
    time: "20 min",
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    price: 299,
    rating: 4.8,
    time: "30 min",
    category: "Biryani",
    image:
      "https://images.pexels.com/photos/12737817/pexels-photo-12737817.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    name: "Paneer Tikka",
    price: 229,
    rating: 4.7,
    time: "25 min",
    category: "Indian",
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Creamy Pasta",
    price: 219,
    rating: 4.5,
    time: "20 min",
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Crispy French Fries",
    price: 129,
    rating: 4.6,
    time: "15 min",
    category: "Sides",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Chocolate Cake",
    price: 179,
    rating: 4.8,
    time: "15 min",
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Fresh Lemon Drink",
    price: 99,
    rating: 4.5,
    time: "10 min",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  "All",
  "Pizza",
  "Burger",
  "Biryani",
  "Indian",
  "Pasta",
  "Sides",
  "Dessert",
  "Drinks",
];

function Menu() {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartCount,
    cartTotal,
  } = useCart();

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [notification, setNotification] =
    useState("");

  const [cartOpen, setCartOpen] = useState(false);

  // ADD TO CART
  // Cart will NOT open automatically.
  const handleAddToCart = (food) => {
    addToCart(food);

    setNotification(
      `${food.name} added to cart!`
    );

    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">

          <Link to="/" className="logo">
            <span className="logo-icon">
              🍴
            </span>

            Foodie
          </Link>

          <div className="nav-links">
            <Link to="/">
              Home
            </Link>

            <Link
              to="/menu"
              className="active"
            >
              Menu
            </Link>

            <a href="/#about">
              About
            </a>
          </div>

          {/* CART BUTTON */}
          <button
            className="cart-button"
            onClick={() =>
              setCartOpen(true)
            }
          >
            <ShoppingCart size={20} />

            Cart

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </nav>

      {/* Menu */}
      <section className="menu-section">
        <div className="section-container">

          <div className="section-heading">

            <div>
              <p className="section-label">
                OUR MENU
              </p>

              <h1>
                Explore Our Delicious Food
              </h1>

              <p>
                Choose from our selection of
                freshly prepared dishes.
              </p>
            </div>

            <div className="search-wrapper">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search food..."
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
              />
            </div>

          </div>

          {/* Categories */}
          <div className="categories">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
              >
                {category}
              </button>
            ))}
          </div>

          {/* Food Grid */}
          <div className="food-grid">

            {filteredFoods.map((food) => (
              <div
                className="food-card"
                key={food.id}
              >

                <div className="food-image-wrapper">

                  <img
                    src={food.image}
                    alt={food.name}
                    className="food-image"
                  />

                  <div className="rating">
                    <Star
                      size={14}
                      fill="currentColor"
                    />

                    {food.rating}
                  </div>

                </div>

                <div className="food-content">

                  <div className="food-title-row">
                    <h3 className="food-title">
                      {food.name}
                    </h3>
                  </div>

                  <p className="food-category">
                    {food.category}
                  </p>

                  <div className="food-bottom">

                    <div>

                      <div className="food-price">
                        ₹{food.price}
                      </div>

                      <div className="food-time">
                        <Clock size={14} />
                        {food.time}
                      </div>

                    </div>

                    {/* ADD BUTTON */}
                    <button
                      className="add-button"
                      onClick={() =>
                        handleAddToCart(food)
                      }
                    >
                      <Plus size={18} />
                      Add
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {filteredFoods.length === 0 && (
            <div className="no-results">
              <h3>
                No food found
              </h3>

              <p>
                Try another search or
                category.
              </p>
            </div>
          )}

          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            <Link
              to="/"
              className="secondary-button"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">

        <div className="footer-container">

          <div>

            <div className="logo">
              <span className="logo-icon">
                🍴
              </span>

              Foodie
            </div>

            <p>
              Delicious food delivered
              straight to your door.
            </p>

          </div>

          <div className="footer-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/menu">
              Menu
            </Link>

            <Link to="/checkout">
              Checkout
            </Link>

          </div>

        </div>

        <div className="copyright">
          © 2026 Foodie. All rights reserved.
        </div>

      </footer>

      {/* Cart Overlay */}
      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() =>
            setCartOpen(false)
          }
        >

          <div
            className="cart-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="cart-header">

              <div>

                <h2>
                  Your Cart
                </h2>

                <p>
                  {cartCount} item
                  {cartCount !== 1
                    ? "s"
                    : ""}
                </p>

              </div>

              <button
                className="close-cart"
                onClick={() =>
                  setCartOpen(false)
                }
              >
                <X size={22} />
              </button>

            </div>

            {cart.length === 0 ? (

              <div className="empty-cart">

                <ShoppingCart size={50} />

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add some delicious
                  food to get started.
                </p>

              </div>

            ) : (

              <>

                <div className="cart-items">

                  {cart.map((item) => (

                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          ₹{item.price}
                        </p>

                        <div className="quantity-controls">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                          >
                            <Minus size={15} />
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                          >
                            <Plus size={15} />
                          </button>

                        </div>

                      </div>

                      <button
                        className="remove-item"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  ))}

                </div>

                <div className="cart-footer">

                  <div className="cart-total">

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹{cartTotal}
                    </strong>

                  </div>

                  <Link
                    to="/checkout"
                    className="checkout-button"
                    onClick={() =>
                      setCartOpen(false)
                    }
                  >
                    Proceed to Checkout
                  </Link>

                </div>

              </>

            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Menu;