import express from "express";
import { fetch, fetchAll, sendMoney } from "../controllers/WalletController.js";

const router = express.Router();

/*
@name: fetch all wallets
@route/endpoint: wallets/
@method:get
*/
router.get("/", fetchAll);

/*
@name: send money to wallet
@route/endpoint: wallets/send
@method:post
*/
router.post("/send", sendMoney);

/*
@name: fetch a wallets
@route/endpoint: wallets/:id
@method:get
*/
router.get("/:id", fetch);

export default router;
