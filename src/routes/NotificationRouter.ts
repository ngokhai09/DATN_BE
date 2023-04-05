import {Router} from "express";
import notificationController from "../controllers/NotificationController";

export const notificationRouter = Router();

notificationRouter.get('/:idReceiver',notificationController.getListNotification);
notificationRouter.post('/',notificationController.addNotification);
notificationRouter.get('/check/:idReceiver',notificationController.checkListNotification);
notificationRouter.put('/:id',notificationController.editNotification);