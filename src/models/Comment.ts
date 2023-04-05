import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Post from "./Post";
import {Account} from "./Account";

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn()
    idComment: number;
    @Column()
    content: string;
    @CreateDateColumn({ type: "timestamp"})
    time: Date;
    @Column({default: "1"})
    image: string;
    @ManyToOne(() => Post, (post) => post.comment)
    post: Post;
    @ManyToOne(() => Account, (account) => account.comment)
    account: Account;
}
