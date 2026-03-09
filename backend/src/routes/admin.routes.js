import { approveExpert, getExperts } from "../controllers/admin.controller";

const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

router.use(protect, allowRoles("admin"));


router.get("/experts", getExperts);
router.patch("/experts/:id/approve", approveExpert);

module.exports = router;