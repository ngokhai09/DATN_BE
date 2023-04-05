import {AppDataSource} from "../data-source";
import Comment from "../models/Comment";


class CommentService {
    private commentRepository;
    constructor() {
        this.commentRepository = AppDataSource.getRepository(Comment)
    }
    findComment = async () => {
        let comment = await this.commentRepository.find({
            relations: ['account','post']
        })
        if (!comment) {
            return 'Can not findPost'
        }
        return comment;
    }
    findByIdAccountComment = async (idAccount) => {
        let comment = await this.commentRepository.createQueryBuilder("comment")
            .innerJoinAndSelect("comment.account", "account")
            .where(`account.idAccount = ${idAccount}`)
            .orderBy("time", "DESC")
            .getMany()
        if (!comment) {
            return 'Can not findComment'
        }
        return comment;
    }

    findByIdPostComment = async (idComment) => {
        let comment = await this.commentRepository.createQueryBuilder("comment")
            .innerJoinAndSelect("comment.post", "post")
            .innerJoinAndSelect("comment.account","account")
            .where(`post.idPost = ${idComment}`)
            .orderBy("comment.time", "DESC")
            .getMany()
        if (!comment) {
            return 'Can not findComment'
        }
        return comment;
    }

    findBy = async (idComment) => {
        let comment = await this.commentRepository.createQueryBuilder("comment")
            .innerJoinAndSelect("comment.account","account")
            .innerJoinAndSelect("comment.post","post")
            .where(`comment.idComment = ${idComment}`)
            .getOne()
        if(!comment) {
            return "can not findByIdPost"
        }
        return comment
    }
    createComment = async (value) => {
        let comment = await this.commentRepository.save(value);
        if (!comment) {
            return 'Can not createComment'
        }
        return await this.findByIdAccountComment(comment.account);
    }
    removeComment = async (idComment) => {
        let comments = await this.commentRepository.findOneBy({idComment: idComment});
        if (!comments) {
            return null
        }
        return this.commentRepository.delete({idComment: idComment});
    }
    updateComment = async (idComment, newComment) => {
        let comments = await this.commentRepository.findOneBy({idComment: idComment})
        if (!comments) {
            return null
        }
        await this.commentRepository.update({idComment: idComment}, newComment);
        return await this.commentRepository.createQueryBuilder("comment")
            .innerJoinAndSelect("comment.account", "account")
            .where(`idComment = ${idComment}`)
            .getMany()
    }


}
export default new CommentService()
