import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.routes.js";
import reviewRoutes from "./routes/review.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // middleware to connect ignore browser securities issues
app.use(express.json()); // middleware to parse JSON bodies: req.body
app.use(cookieParser()); // Parsing the bearer token in req.body

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", reviewRoutes);
/*  Logging each request in console
   app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
}); */



// 404 Erorr handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// DB is connected first and then the server runs.
connectDB().then(()=> {
      app.listen(PORT, ()=> {
      console.log("Server statred at ", PORT);
   });
});
