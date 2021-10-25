import { Router } from "express";
const router = Router();
import ValidateMiddleware from '../middlewares/schemaValidation';
import {validateEvent} from '../models/event.model';
import AuthenticationController from "../controllers/authentication.controller";


router.post("/auth/",[ValidateMiddleware(validateEvent)], AuthenticationController.AuthUser);

router.post("/authenticate", AuthenticationController.AuthUser);

export default router;
