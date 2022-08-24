import express from "express";
import { getAllGrower, getGrower, createGrower, updateGrower, deleteGrower } from "../controller/grower/growerController.js";
import { protect } from "../controller/user/authController.js";
const router = express.Router();
// router.param('id', checkID); defined in model
// router.route('/').get(getTaluk).post(checkBody, createTaluk);
router.route('/').get(getAllGrower).post(createGrower);
router.route('/:id').put(updateGrower).delete(deleteGrower).get(getGrower);

// router.get('/', getTaluk)
// router.post('/', createTaluk)
// router.put('/:id', updateTaluk)
// router.delete('/:id', deleteTaluk)
// router.route('/tour-stats').get(tourController.getTourStats);
// router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

export default router;
