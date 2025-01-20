import express from "express";
import {
  createUser,
  LoginUser,
  fetchAll,
  fetch,
} from "../controllers/UsersController.js";

const router = express.Router();

/*
@name: fetch all users
@route/endpoint: users/
@method:get
*/
router.get("/", fetchAll);
/*
@name: fetch a user
@route/endpoint: users/:email
@method:get
*/
router.get("/:email", fetch);
/*
@name: create User
@route/endpoint: users/register
@method:post
*/
router.post("/register", createUser);
/*
@name: login User
@route/endpoint: users/login
@method:post
*/
router.post("/login", LoginUser);

export default router;
