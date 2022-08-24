import express from "express";
import { getAllTaluk, getTaluk, createTaluk, updateTaluk, deleteTaluk } from "../controller/grower/talukController.js";

const router = express.Router();
// router.param('id', checkID); defined in model
// router.route('/').get(getTaluk).post(checkBody, createTaluk);
router.route('/').get(getAllTaluk).post(createTaluk);
router.route('/:id').put(updateTaluk).delete(deleteTaluk).get(getTaluk);

// router.get('/', getTaluk)
// router.post('/', createTaluk)
// router.put('/:id', updateTaluk)
// router.delete('/:id', deleteTaluk)

export default router;
