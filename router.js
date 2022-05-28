const express = require("express");
const router = express.Router();
const userController = require("./userController");
const addressController = require("./addressController");

//      A   D	D	R	E	S	S	 R  O   U	T	E	S

router.post("/addAddress", addressController.addNewContact);
router.post("/addBulkAddress", addressController.addWholeBulk);
router.get(
  "/getAddress/:id",
  userController.protectRoute,
  userController.checkAdmin("admin"),
  addressController.getTargetId
);
router.patch("/updateAddress/:id", addressController.updateTargetId);
router.delete("/deleteAddress/:id", addressController.deleteTargetId);
router.get("/getAllAddress", addressController.paginatedResults);

//==============================================================

//      U   S   E   R   S            R  O   U   T   E   S
router.post("/user/add", userController.createUser);
router.post("/user/login", userController.login);

module.exports = router;
