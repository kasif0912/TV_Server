import { Router } from "express";
import {
    createOrder,
    verifyPayment
} from '../../controller/payment.controller.js'


const router = Router();


// create order
router.route("/create-order").post(
    // 1. integrate verifyJWT here ----->skipping for now, will add later
    createOrder
)

router.route("/verify-payment").post(
    // 2. integrate verifyJWT here ----->skipping for now, will add later
    verifyPayment
)

export default router;
