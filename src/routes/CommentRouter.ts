import {Router} from "express";
import commentController from "../controllers/CommentController";

export const commentRouter = Router()
commentRouter.post('/',commentController.addComment);
commentRouter.get('/',commentController.getComment);
commentRouter.get('/:idAccount',commentController.findByIdCommentAccount);
commentRouter.get('/findByIdPC/:id',commentController.findByIdCommentPost);
commentRouter.get('/findById/:id',commentController.findByIdComment);
commentRouter.put('/:idComment',commentController.editComment);
commentRouter.delete('/:idComment',commentController.deleteComment);
