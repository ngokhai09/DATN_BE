import {Request, Response} from "express";
import LikeService from "../services/LikeService";

class LikeController {
    private likeService;

    constructor() {
        this.likeService = LikeService;
    }

    getLike = async (req: Request, res: Response) => {
        try{
            let response = await this.likeService.getLike(req.params.account)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    like = async (req: Request, res: Response) => {
        try{
            let response = await this.likeService.like(req.body)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    unLike = async (req: Request, res: Response) => {
        try{
            let response = await this.likeService.unLike(req.body.post, req.body.account)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }


}

export default new LikeController();

