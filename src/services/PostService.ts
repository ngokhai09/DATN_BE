import {AppDataSource} from "../data-source";
import Post from "../models/Post";
import Comment from "../models/Comment";
import Like from "../models/Like";

class PostService {
    private postRepository
    private commentRepository
    private likeRepository

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post)
        this.commentRepository = AppDataSource.getRepository(Comment)
        this.likeRepository = AppDataSource.getRepository(Like)
    }
    findPost = async () => {
        return this.postRepository.find({
            relations: ['account','comment','comment.account','like','like.account'],
            order: {
                time: "DESC"
            }
        });
    }

    findByIdAccount = async (idAccount) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .leftJoinAndSelect("post.comment", "comment")
            .leftJoinAndSelect("post.like", "like")
            .where(`account.idAccount = ${idAccount}`)
            .orderBy("post.time", "DESC")
            .getMany()
        if (!post) {
            return 'Can not findPost'
        }
        return post;
    }


    findBy = async (idPost) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account","account")
            .leftJoinAndSelect("post.like", "like")
            .leftJoinAndSelect("post.comment","comment")
            .where(`post.idPost = ${idPost}`)
            .getOne()
        if (!post) {
            return "can not findByIdPost"
        }
        return post
    }
    createPost = async (value) => {
        let post = await this.postRepository.save(value);
        if (!post) {
            return 'Can not createPost'
        }
        return await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .leftJoinAndSelect("post.like", "like")
            .where(`idPost = ${post.idPost}`)
            .getMany()
    }
    findByIdPost = async (idPost) => {
        let post = await this.postRepository.findOneBy({idPost: idPost});
        if (!post) {
            return null;
        }
        return post;
    }

    findByContent = async (search) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .where(`content like '%${search}%'`)
            .orderBy("time", "DESC")
            .getMany()
        if (!post) {
            return "Can not find by name";
        }
        return post;
    }

    updatePost = async (idPost, newPost) => {
        let posts = await this.postRepository.findOneBy({idPost: idPost})
        if (!posts) {
            return null
        }
        await this.postRepository.update({idPost: idPost}, newPost);
        return await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .leftJoinAndSelect("post.like", "like")
            .leftJoinAndSelect("post.comment","comment")
            .where(`idPost = ${idPost}`)
            .getMany()
    }
    removePost = async (idPost) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .leftJoinAndSelect("post.comment", "comment")
            .leftJoinAndSelect("post.like", "like")
            .where(`post.idPost = ${idPost}`)
            .getOne()
        if (!post) {
            return null
        }
        await Promise.all(post.comment.map((commentPost) => {
        this.commentRepository.remove(commentPost);
        }));
        await Promise.all(post.like.map((likePost) => {
             this.likeRepository.remove(likePost);
        }));

         await this.postRepository.remove(post);
    }
}
export default new PostService();
