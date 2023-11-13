import {Router} from "express";
import {getAllProfes, New_profe, verifyProfe} from "../Controller/Controller_profe.js";
import uploadStrategy from "../middleawares/upload.js";

const router = Router()

router.post('/new_profe', uploadStrategy, New_profe)
router.post('/validate', verifyProfe)
router.get('/all_profes', getAllProfes);

export default router;