import { Component } from "react";

class RestaurantInfo extends Component {
  render() {
    return (
      <div className="restaurant-info">
        <div className="restaurant-info-text">
          <p className="section-label">WHY CHOOSE FOODIE?</p>

          <h2>Good Food. Great Experience.</h2>

          <p>
            At Foodie, we prepare fresh and delicious meals
            using quality ingredients. From quick snacks to
            satisfying meals, we make ordering food simple.
          </p>

          <div className="restaurant-stats">
            <div>
              <strong>4.8★</strong>
              <span>Average Rating</span>
            </div>

            <div>
              <strong>30 min</strong>
              <span>Average Delivery</span>
            </div>

            <div>
              <strong>1000+</strong>
              <span>Happy Customers</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantInfo;