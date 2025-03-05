const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = "your_mongodb_connection_string_here";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model("User", userSchema);

// Register Route
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send("User registered successfully!");
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send("Email already exists.");
        } else {
            res.status(500).send("Server error.");
        }
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
