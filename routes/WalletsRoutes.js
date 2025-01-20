import express from "express";
import { fetchAll } from "../controllers/WalletController.js";

const router = express.Router();

/*
@name: fetch all wallets
@route/endpoint: wallets/
@method:get
*/
router.get("/", fetchAll);

export default router;
