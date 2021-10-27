import {Router} from "express";
const router = Router();
import TaskController from '../controllers/task.controller';
import ValidateMiddleware from '../middlewares/schema.validation';
import {validateTask} from '../models/task.model';


router.post("/create-tasks",[ValidateMiddleware(validateTask)] ,TaskController.CreateTask);
router.get("/get-tasks-today", TaskController.GetAllTaskstoday);
router.get("/get-tasks-today-week-month", TaskController.GetAllTasksDayWeekMonth)
router.get("/authuser",TaskController.AuthUser);
router.get("/auth/callback", TaskController.AuthCallback);
router.post("/create-event", TaskController.CreateEvent);
router.patch("/update-task/:taskId", TaskController.UpdateTaskProgress);


export default router;