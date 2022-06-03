import express from 'express';

const router = express.Router();
import {indexController} from '../controller/indexController';

router.get("/", indexController.index.bind(indexController));
router.get("/todo", indexController.add.bind(indexController));
router.post("/todo", indexController.handleAdd.bind(indexController));
router.get("/todo/:id", indexController.update.bind(indexController));
router.post("/todo/:id", indexController.handleUpdate .bind(indexController));

export const indexRoutes = router;
