import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import UsersRoutes from "./routes/UsersRoutes.js";
import WalletsRoutes from "./routes/WalletsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/users", UsersRoutes);
app.use("/wallets", WalletsRoutes);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server running on port ${PORT}`);
  }
});
