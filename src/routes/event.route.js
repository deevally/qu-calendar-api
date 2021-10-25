import {Router} from "express";
const router = Router();
import EventController from '../controllers/event.controller';
import ValidateMiddleware from '../middlewares/schemaValidation';
import {validateEvent} from '../models/event.model';


router.post("/create-event",[ValidateMiddleware(validateEvent)], EventController.CreateEvent);
router.get("/geteventsday", EventController.GetAllEventsDay)
router.get("/geteventsweek", EventController.GetAllEventsWeek)
router.get("/geteventsmonth", EventController.GetAllEventsMonth)

export default router;