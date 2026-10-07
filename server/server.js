import express from "express";
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// HOME
app.get("/", (req, res) => {
  res.json({
    message: "Foodie API is running successfully!",
  });
});


// GET FOODS
app.get("/api/foods", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Margherita Pizza",
      price: 249,
      category: "Pizza",
    },
    {
      id: 2,
      name: "Classic Cheese Burger",
      price: 199,
      category: "Burger",
    },
    {
      id: 3,
      name: "Chicken Biryani",
      price: 299,
      category: "Biryani",
    },
    {
      id: 4,
      name: "Paneer Tikka",
      price: 229,
      category: "Indian",
    },
    {
      id: 5,
      name: "Creamy Pasta",
      price: 219,
      category: "Pasta",
    },
  ]);
});


// PLACE ORDER
app.post("/api/orders", (req, res) => {

  console.log("");
  console.log("====================================");
  console.log("       ORDER RECEIVED FROM REACT");
  console.log("====================================");

  console.log("Name:", req.body.name);
  console.log("Email:", req.body.email);
  console.log("Phone:", req.body.phone);
  console.log("Address:", req.body.address);
  console.log("Items:", req.body.items);

  console.log("====================================");
  console.log("");

  res.status(201).json({
    message: "Order placed successfully!",
    order: req.body,
  });
});


// START SERVER
app.listen(PORT, "127.0.0.1", () => {
  console.log("");
  console.log("====================================");
  console.log("       FOODIE BACKEND SERVER");
  console.log("====================================");
  console.log("Server running on:");
  console.log("http://localhost:5000");
  console.log("====================================");
  console.log("");
});