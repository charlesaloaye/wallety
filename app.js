import express from "express";
import cors from "cors";
import morgan from "morgan";
import UsersRoutes from "./routes/UserRoutes.js";
import WalletsRoutes from "./routes/WalletRoutes.js";
import HomeRoutes from "./routes/HomeRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>{

  res.send('Hello World');

  res.end();
});

app.use("/users", UsersRoutes);
app.use("/wallets", WalletsRoutes);
app.use("/", HomeRoutes);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server running on port ${PORT}`);
  }
});
