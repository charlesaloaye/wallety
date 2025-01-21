import express from "express";
import { fetch, fetchAll, sendMoney } from "../controllers/WalletController.js";

const router = express.Router();

/*
@name: fetch all wallets
@route: wallets/
@method:get
*/
router.get("/", fetchAll);

/*
@name: send money to wallet
@route: wallets/send
@method:post
*/
router.post("/send", sendMoney);

/*
@name: fetch a wallets
@route: wallets/:id
@method:get
*/
router.get("/:id", fetch);

export default router;
