import db from "../lib/db.js";
import validator from "validator";

export const fetchAll = (req, res) => {
  try {
    db.query("SELECT * FROM wallets", (err, wallets) => {
      if (!wallets.length) {
        res.status(404).json({ message: "No wallet found" });
        return;
      }

      res.status(200).json({ message: "wallet found", wallets });
      return;
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
    return;
  }
};

export const fetch = (req, res) => {
  const { id } = req.params;

  try {
    if (!id || !validator.isInt(id)) {
      res.status(401).json({ message: "Invalid Wallet ID" });
      return;
    }

    db.query(
      `SELECT 
    users.name AS full_name, 
    users.email AS email, 
    wallets.id AS wallet_id, 
    wallets.balance AS available_balance, 
    wallets.type_id AS wallet_type_id, 
    wallets.user_id AS wallet_user_id, 
    wallet_types.name AS wallet_type
FROM 
    users
LEFT JOIN 
    wallets ON wallets.user_id = users.id
LEFT JOIN 
    wallet_types ON wallet_types.id = wallets.type_id 
    WHERE wallets.id = ?  OR users.id = ?
    LIMIT 100`,
      [id, id],
      (err, wallets) => {
        if (!wallets.length) {
          res.status(404).json({ message: "No wallet found" });
          return;
        }

        res.status(200).json({ message: "wallet found", wallets });
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
