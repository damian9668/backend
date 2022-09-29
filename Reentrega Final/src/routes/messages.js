import {Router} from "express";
import {getAllByEmail} from "../controllers/messages.js";

export const messagesRouter = Router();

messagesRouter.get('/:email', getAllByEmail)