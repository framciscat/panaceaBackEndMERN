import express from "express";
import { createUser, login, logout, getAllUsers, updateUser, deleteUser } from "../controller/userController";

const router = express.Router();

router.post('/create', createUser);

router.post('/login', login);

router.post('/logout', logout);

router.get('/', getAllUsers);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);


export = router;