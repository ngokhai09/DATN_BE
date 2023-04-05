import {Request, Response} from "express";
import FriendService from "../services/FriendService";

class FriendController {
    private friendService;

    constructor() {
        this.friendService = FriendService;
    }
    checkFriend = async (req: Request, res: Response) => {
        try{
            let thisId = req.query.thisId;
            let thatId = req.query.thatId;
            let response = await this.friendService.checkFriend(thisId,thatId)

            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    addFriend = async (req: Request, res: Response) => {
        try{
            let response = await this.friendService.createFriend(req.body)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    updateFriend = async (req: Request, res: Response) => {
        try{
            let response = await this.friendService.edit(req.params.id)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    removeFriend = async (req: Request, res: Response) => {
        try{
            let response = await this.friendService.remove(req.params.id)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    getListFriend = async (req: Request, res: Response) => {
        try{
            let response = await this.friendService.getFriends(req.params.idAccount)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new FriendController();

