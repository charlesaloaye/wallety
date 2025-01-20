import db from "../lib/db.js";

export const fetchAll = (req, res) => {
  try {
    db.query("SELECT * FROM wallets", (err, wallets) => {
      if (!wallets.length) {
        res.status(404).json({ message: "No wallet found" });
      }

      res.status(200).json({ message: "wallet found", wallets });
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
