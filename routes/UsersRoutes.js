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
@route: users/
@method:get
*/
router.get("/", fetchAll);
/*
@name: fetch a user
@route: users/:email
@method:get
*/
router.get("/:email", fetch);
/*
@name: create User
@route: users/register
@method:post
*/
router.post("/register", createUser);
/*
@name: login User
@route: users/login
@method:post
*/
router.post("/login", LoginUser);

export default router;
