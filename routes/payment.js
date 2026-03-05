import {Router} from "express";
import { createTransaction } from "../utils/midtrans.js";

const router = Router();

router.post ("/checkout", createTransaction);

export default router;