import { Router } from "express";
import {
  createOrder,
  verifyPayment,
} from "../../controller/payment.controller.js";
import authenticate from "../../middleware/authenticate.js";

const router = Router();

// create order
router.route("/create-order").post(
  // 1. integrate verifyJWT here ----->skipping for now, will add later
  authenticate,
  createOrder
);

router.route("/verify-payment").post(
  // 2. integrate verifyJWT here ----->skipping for now, will add later
  authenticate,
  verifyPayment
);

export default router;
