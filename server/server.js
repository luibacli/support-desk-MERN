const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
let PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
} else {
    app.get("/", (_, res) => {
        res.status(200).json({ message: "Welcome to the Support Desk API" });
    });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server connecting on port ${PORT}`));
