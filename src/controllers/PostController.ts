import {Request, Response} from "express";
import PostService from "../services/PostService";
import FriendService from "../services/FriendService";
import LikeService from "../services/LikeService";

 class PostController {
    private postService;
    private friendService;

    constructor() {
        this.postService = PostService;
        this.friendService = FriendService;
    }
    editPost = async (req: Request, res: Response)=> {
        try {
            let idPost = req.params.idPost;
            let newPost = req.body;
            let posts = await this.postService.updatePost(idPost,newPost);
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
     deletePost = async (req: Request, res: Response)=> {
         try {
             let idPost = req.params.idPost;
             let posts = await this.postService.removePost(idPost);
             res.status(200).json(posts)
         } catch (e) {
             res.status(500).json(e.message)
         }
     }
     findByIdPost = async (req: Request, res: Response) => {
         try{
             let idPost = req.params.id
             let post = await this.postService.findBy(idPost);
             res.status(200).json(post)
         } catch (e) {
             res.status(500).json(e.message)
         }
     }

     findByContent = async (req: Request, res: Response) => {
         try{
             let search = req.query.search;
             let response = await PostService.findByContent(search);
             res.status(200).json(response)
         }catch (e) {
             res.status(500).json(e.message)
         }

     }


    getPost = async (req: Request, res: Response) => {
        try {
            let response = await PostService.findPost();
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

     findByIdAccount = async (req: Request, res: Response) => {
         try {
             let response = await PostService.findByIdAccount(req.params.idAccount);
             res.status(200).json(response)
         } catch (e) {
             res.status(500).json(e.message)
         }
     }



    addPost = async (req: Request, res: Response) => {
        try {
            let response = await PostService.createPost(req.body);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new PostController();

