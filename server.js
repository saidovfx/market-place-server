import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import ENV from "./lib/ENV.js";
import profile from "./routes/profile.js";
import userauth from "./routes/user.auth.js";
import post_order from "./routes/post.order.js"
import post_product from './routes/post.product.js'
const app = express();
app.use(cors({credentials:true}))

app.use(express.json());
app.use(cookieParser());
app.use("/api/profile", profile);
app.use("/api/auth", userauth);
app.use("/api/user",post_order)
app.use('/api/admin',post_product)

mongoose.connect(ENV.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

app.listen(3030, () => console.log("Server running on 5000"));