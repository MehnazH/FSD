import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { useCart } from "../CartContext";

function Checkout() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const deliveryFee = cart.length > 0 ? 40 : 0;
  const finalTotal = cartTotal + deliveryFee;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          items: cart,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      console.log("Backend response:", data);

      setOrderPlaced(true);
    } catch (error) {
      console.error("Order error:", error);

      setErrorMessage(
        "Could not connect to the server. Make sure the Express server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="success-card">
          <CheckCircle size={70} />

          <h1>Order Placed Successfully! 🎉</h1>

          <p>
            Thank you, {formData.name}! Your order has been received.
          </p>

          <p>
            We will deliver your food to:
            <br />
            <strong>{formData.address}</strong>
          </p>

          <Link to="/" className="checkout-button">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* HEADER */}

        <div className="checkout-header">
          <Link to="/menu" className="back-link">
            <ArrowLeft size={20} />
            Back to Menu
          </Link>

          <h1>Checkout</h1>

          <p>Complete your order details below.</p>
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <div className="checkout-layout">

          {/* FORM */}

          <div className="checkout-form-card">

            <h2>Delivery Details</h2>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Delivery Address</label>

                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>

                <select
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                >
                  <option>Cash on Delivery</option>
                  <option>UPI</option>
                  <option>Credit / Debit Card</option>
                </select>
              </div>

              <button
                type="submit"
                className="checkout-button"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

            </form>
          </div>

          {/* ORDER SUMMARY */}

          <div className="order-summary-card">

            <div className="summary-heading">
              <ShoppingBag size={24} />
              <h2>Your Order</h2>
            </div>

            {cart.length === 0 ? (
              <div className="empty-checkout">
                <p>Your cart is empty.</p>

                <Link to="/menu">
                  Browse Menu
                </Link>
              </div>
            ) : (
              <>
                <div className="checkout-items">

                  {cart.map((item) => (
                    <div
                      className="checkout-item"
                      key={item.id}
                    >
                      <div>
                        <h3>{item.name}</h3>

                        <p>
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <div className="quantity-controls">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          <Minus size={15} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          <Plus size={15} />
                        </button>

                        <button
                          type="button"
                          className="remove-item"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </div>
                  ))}

                </div>

                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>

                <div className="summary-line">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <strong>₹{finalTotal}</strong>
                </div>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;