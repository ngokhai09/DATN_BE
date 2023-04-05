import {Request, Response} from "express";
import NotificationService from "../services/NotificationService";

class NotificationController {
    private notificationService;

    constructor() {
        this.notificationService = NotificationService;
    }

    getListNotification = async (req: Request, res: Response) => {
        try{
            let response = await this.notificationService.getNotification(req.params.idReceiver)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    checkListNotification = async (req: Request, res: Response) => {
        try{
            let response = await this.notificationService.checkNotification(req.params.idReceiver)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    addNotification = async (req: Request, res: Response) => {
        try{
            let response = await this.notificationService.createNotification(req.body)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    editNotification = async (req: Request, res: Response) => {
        try{
            let response = await this.notificationService.editNotification(req.params.id)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

}

export default new NotificationController();

