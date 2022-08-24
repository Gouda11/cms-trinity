import express from "express";
import {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} from "../controller/user/UserController.js";
//import authController from "../controller/user/authController";
import { signup, login } from "../controller/user/AuthController.js";

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
// router.post('/signup', (req, res) => {
//   res.send("Uta mans ")
// });
// router.route('/').get(UserController.).post(createTaluk);
// router.route('/:id').put(updateTaluk).delete(deleteTaluk).get(getTaluk);

// router.get('/', getTaluk)
// router.post('/', createTaluk)
// router.put('/:id', updateTaluk)
// router.delete('/:id', deleteTaluk)
router.route('/').get(getUser).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
export default router;
