import { Router } from "express";
import TaskRoute from "./task.route";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    Message: "Welcome to QU-Calendar",
  });
});


router.use("/", TaskRoute);


export default router;
