import {AppDataSource} from "../data-source";
import Like from "../models/Like";
import Post from "../models/Post";

class LikeService {
    private likeRepository
    private postRepository

    constructor() {
        this.likeRepository = AppDataSource.getRepository(Like)
        this.postRepository = AppDataSource.getRepository(Post)
    }
    getLike = async (account) => {
        let post = []
        post=[];
        let res = await this.likeRepository.find(
            {relations: ['account','post'],
                where:{"account.idAccount":account}
            })
        res.map(it=>{post.push(it.post.idPost)})
        if (!post){
            return "Error"
        }
        return post
    }


    like = async (values) => {
        let res = await this.likeRepository.save(values);
        await this.postRepository.update({idPost: values.post}, {isLike: 2})
        if (!res){
            return "Error"
        }
        return res
    }

    unLike = async (post,account) => {
        let sql = `select idLike from mxh.like where accountIdAccount = ${account} and postIdPost = ${post}`
        let like = await this.likeRepository.query(sql)
        let res = await this.likeRepository.delete({idLike:like[0].idLike});
        await this.postRepository.update({idPost:post}, {isLike: 1})

        if (!res){
            return "Error"
        }
        return "Ok"
    }

}


export default new LikeService();
