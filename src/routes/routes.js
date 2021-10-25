import { Router } from "express";
import authRoute from "./auth.route";
import eventRoute from "./event.route";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    Message: "Welcome to QU-Calendar",
  });
});


router.use("/", authRoute);
router.use("/", eventRoute);


export default router;
