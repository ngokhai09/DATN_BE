import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Post from "./Post";
import {Account} from "./Account";
import Comment from "./Comment";

@Entity()
export default class Like {
    @PrimaryGeneratedColumn()
    idLike: number;
    @ManyToOne(() => Post, (post) => post.like)
    post: Post;
    @ManyToOne(()=>Account,(account)=>account.like)
    account : Account;
    @ManyToOne(()=> Comment, (comment)=>comment.idComment)
    comment : Comment;
}
