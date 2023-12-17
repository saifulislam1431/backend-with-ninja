import express from "express";
import { userControllerData } from "./users.controller";
const router = express.Router();

//Create user
router.post("/", userControllerData.createNewUserData);

//Get users
router.get("/", userControllerData.findAllUserData);

//Get user
router.get("/:userId", userControllerData.findSingleUserData);

//Update user
router.put("/:userId", userControllerData.updateSingleUserData);

//Delete user
router.delete("/:userId", userControllerData.deleteSingleUserData);

//create order
router.put("/:userId/orders", userControllerData.createOrderToUser);

//Get order Data
router.get("/:userId/orders", userControllerData.findUserOrderData);

//Price calculate
router.get(
  "/:userId/orders/total-price",
  userControllerData.calculateAllUserOrderPrice
);


export const userRoutes = router;