import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "EasyRent Server is running!",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "All Good!",
  });
});

const properties = [
  {
    id: 1,
    title: "Modern 2 BHK Apartment",
    location: "Nashik",
    price: 15000,
    type: "Apartment",
  },
  {
    id: 2,
    title: "Beautiful 1 BHK Flat",
    location: "Pune",
    price: 12000,
    type: "Flat",
  },
  {
    id: 3,
    title: "Spacious Family House",
    location: "Ahmednagar",
    price: 18000,
    type: "House",
  },
];

// Get all properties
app.get("/api/properties", (req, res) => {
  res.json(properties);
});

// Get property by ID
app.get("/api/properties/:id", (req, res) => {
  const id = Number(req.params.id);

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return res.status(404).json({
      message: "Property not found",
    });
  }

  res.json(property);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`EasyRent server running on port ${PORT}`);
});