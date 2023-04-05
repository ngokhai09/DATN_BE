import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Like from "./Like";
import Comment from "./Comment";
import {Account} from "./Account";

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    idPost: number;
    @Column({default:1})
    isLike: string;
    @Column({default: "Public"})
    status: string;
    @Column()
    content: string;
    @CreateDateColumn({type : "timestamp"})
    time: Date;
    @Column({default: "1"})
    image: string;
    @Column()
    commentCount: number;
    @Column()
    likeCount: number;
    @OneToMany(() => Comment, (comment) => comment.post, { cascade : true })
    comment: Comment[]
    @OneToMany(() => Like, (like) => like.post,{ cascade : true })
    like: Like[]
    @ManyToOne(()=>Account,(account)=>account.post)
    account : Account;
}
