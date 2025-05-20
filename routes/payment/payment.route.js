import { Router } from "express";
import {
    createOrder
} from '../../controller/payment.controller'


const router = Router();


// create order
router.route("/create-order").post(
    // 1. integrate verifyJWT here ----->skipping for now, will add later
    createOrder
)

export default router;
