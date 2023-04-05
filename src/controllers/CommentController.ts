import commentService from "../services/CommentService";
import {Request, Response} from "express";
import CommentService from "../services/CommentService";

class CommentController {
    private commentService
    constructor() {
        this.commentService = commentService
    }
    getComment = async (req: Request, res: Response) => {
        try {
            let response = await CommentService.findComment();
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    findByIdCommentAccount = async (req: Request, res: Response) => {
        try {
            let response = await CommentService.findByIdAccountComment(req.params.idAccount);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    findByIdCommentPost = async (req: Request, res: Response) => {
        try {
            let idComment = req.params.id;
            let response = await CommentService.findByIdPostComment(idComment);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    addComment = async (req: Request, res: Response) => {
        try {
            let response = await CommentService.createComment(req.body);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    editComment = async (req: Request, res: Response)=> {
        try {
            let idComment = req.params.idComment;
            let newComment = req.body;
            let comments = await this.commentService.updateComment(idComment,newComment);
            res.status(200).json(comments)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    findByIdComment = async (req: Request, res: Response) => {
        try{
            let idComment = req.params.id
            let comment = await this.commentService.findBy(idComment);
            res.status(200).json(comment)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    deleteComment = async (req: Request, res: Response)=> {
        try {
            let idComment = req.params.idComment;
            let comments = await this.commentService.removeComment(idComment);
            res.status(200).json(comments)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}
export default new CommentController()
