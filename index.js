const express = require("express");

const app = express();
const cors = require("cors"); // Import the CORS package

app.use(cors());
app.use(express.json());

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const DB = [
  {
    id: 1,
    text: "one",
    background: "red",
  },
  {
    id: 2,
    text: "two",
    background: "blue",
  },
];

app.get("/", (req, res) => {
  res.json(DB);
});

app.post("/", (req, res) => {
  const newItem = req.body;
  DB.push(newItem);
  res.json(DB);
});

app.patch("/:id", (req, res) => {
  const updatedData = req.body;
  const id = parseInt(req.params.id);
  const index = DB.findIndex((item) => item.id === id);
  if (index !== -1) {
    DB[index] = { ...DB[index], ...updatedData };
    res.json(DB);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = DB.findIndex((item) => item.id === id);
  if (index !== -1) {
    DB.splice(index, 1);
    res.json(DB);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});
