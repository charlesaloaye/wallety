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
    WHERE wallets.id = ?
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

export const sendMoney = (req, res) => {
  const { sender_email, receiver_email, amount, wallet } = req.body;

  try {
    if (!sender_email || !validator.isEmail(sender_email)) {
      res.status(401).json({ message: "Invalid sender email" });
      return;
    }

    if (!receiver_email || !validator.isEmail(receiver_email)) {
      res.status(401).json({ message: "Invalid receiver email" });
      return;
    }

    if (!amount || !validator.isNumeric(amount)) {
      res.status(401).json({ message: "Invalid amount" });
      return;
    }

    if (!wallet || !validator.isAlpha(wallet)) {
      res.status(401).json({ message: "Invalid wallet to credit" });
      return;
    }

    db.query(
      `SELECT users.email, users.id, wallets.balance, wallets.type_id, wallet_types.minimum_balance, wallet_types.name AS wallet FROM users LEFT JOIN wallets ON wallets.user_id = users.id LEFT JOIN wallet_types ON wallet_types.id = wallets.type_id WHERE users.email = ? AND wallet_types.name = ?`,
      [sender_email, wallet],
      (err, sender) => {
        const _sender = sender[0];

        if (_sender.balance > _sender.minimum_balance) {
          if (_sender.balance > amount) {
            db.query(
              `SELECT users.email, users.id AS receiver_id, wallets.balance, wallets.type_id FROM users LEFT JOIN wallets ON wallets.user_id = users.id LEFT JOIN  wallet_types ON wallet_types.id = wallets.id WHERE users.email = ? `,
              [receiver_email],
              (err, receiver) => {
                const _receiver = receiver[0];
                if (!err) {
                  const receiver_balance =
                    parseFloat(_receiver.balance) + parseFloat(amount);

                  const sender_balance =
                    parseFloat(_sender.balance) - parseFloat(amount);

                  db.query(
                    "UPDATE wallets SET balance = ? WHERE user_id = ? AND type_id = ?",
                    [
                      receiver_balance,
                      _receiver.receiver_id,
                      _receiver.type_id,
                    ],
                    (err) => {
                      if (err) throw err;

                      db.query(
                        "UPDATE wallets SET balance = ? WHERE user_id = ? AND type_id = ?",
                        [sender_balance, _sender.id, _sender.type_id],
                        (err) => {
                          if (err) throw err;

                          res.status(200).json({
                            message: "Transaction successfull",
                            data: {
                              senderId: _sender.id,
                              receiverId: _receiver.receiver_id,
                              amount: amount,
                              currency: _sender.wallet,
                            },
                          });
                        }
                      );
                    }
                  );
                } else {
                  res
                    .status(404)
                    .json({ message: "No receiver with that email found" });
                }
              }
            );
          } else {
            res.status(400).json({ message: "Insufficient funds" });
            return;
          }
        } else {
          res.status(401).json({
            message: `Balance must be atleast ${_sender.minimum_balance} to perform this operation`,
          });
          return;
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
