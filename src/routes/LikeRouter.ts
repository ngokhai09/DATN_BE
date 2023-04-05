import {Router} from "express";
import likeController from "../controllers/LikeController";

export const likeRouter = Router();

likeRouter.post('/',likeController.like);
likeRouter.delete('/',likeController.unLike);
