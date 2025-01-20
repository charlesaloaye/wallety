import db from "../lib/db.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a new user
export const createUser = async (req, res) => {
  const { email, name, password } = req.body;
  const passwordLength = 8;

  try {
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, users) => {
        if (!email || !validator.isEmail(email)) {
          res.status(404).json({ message: "Invalid email" });
          return;
        }

        if (!password || !validator.isStrongPassword(password)) {
          res.status(404).json({
            message: `Password must be atleast ${passwordLength} characters and contains uppercase, lowercase and a special character`,
          });
          return;
        }

        if (users.length) {
          res.status(404).json({
            message: "Account already exist, please try another email",
          });
          return;
        }

        const securedPassword = await bcrypt.hash(password, 10);
        db.query(
          "INSERT INTO users(name, email, password) VALUES(?, ?, ?)",
          [name, email, securedPassword],
          (err, result) => {
            if (result) {
              res.status(200).json({
                message: "Account created successfully, please login",
              });
              return;
            }
          }
        );
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
    return;
  }
};

// Login a user
export const LoginUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    db.query(
      "SELECT email, password FROM users WHERE email = ?",
      [email],
      async (err, users) => {
        if (!email || !validator.isEmail(email)) {
          res.status(401).json({ message: "Invalid email" });
          return;
        }

        if (!users.length) {
          res.status(404).json({
            message: "Account does not exist, please try create an account",
          });
          return;
        }

        const user = users[0];

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
          res.status(401).json({
            message: "Incorrect account password",
          });
          return;
        }

        const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET_KEY, {
          expiresIn: "3h",
        });

        res.status(200).json({
          message: "Logged in successfully",
          token,
        });
        return;
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
    return;
  }
};
// Fetch All Users
export const fetchAll = async (req, res) => {
  try {
    db.query("SELECT * FROM users", async (err, users) => {
      if (!users.length) {
        res.status(404).json({ message: "Not found" });
        return;
      }

      if (users.length) {
        res.status(200).json({ message: "retrieved", users });
        return;
      }
    });
  } catch (err) {
    if (err) {
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
      return;
    }
  }
};

// Fetch a single user
export const fetch = async (req, res) => {
  const { email } = req.params;

  try {
    if (!email || !validator.isEmail(email)) {
      res.status(401).json({ message: "Invalid Email" });
      return;
    }

    db.query("SELECT * FROM users WHERE email = ? ", [email], (err, users) => {
      if (!users.length) {
        res.status(404).json({ message: "User Not found" });
        return;
      }

      res.status(200).json({ message: "retrieved", users });
      return;
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
    return;
  }
};
