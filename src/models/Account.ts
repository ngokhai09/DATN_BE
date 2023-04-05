import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Post from "./Post";
import Comment from "./Comment";
import Like from "./Like";
import {Message} from "./Message";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    idAccount: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({default: "New User"})
    name: string;
    @Column({ default: "01/01/2023"})
    birthday: string;
    @Column({default: "https://gocsuckhoe.com/wp-content/uploads/2020/09/avatar-facebook.jpg"})
    avatar: string;
    @Column({default:0})
    gendel: boolean;
    @Column({default: "Dong Anh"})
    address: string;
    @OneToMany(() => Post, (post) => post.account)
    post: Post[];
    @OneToMany(() => Comment, (comment) => comment.account)
    comment: Comment[];
    @OneToMany(() => Like, (like) => like.account)
    like: Like[];
    @OneToMany(() => Message, (message) => message.sender)
    sentMessages: Message[];

    @OneToMany(() => Message, (message) => message.receiver)
    receivedMessages: Message[];
}
