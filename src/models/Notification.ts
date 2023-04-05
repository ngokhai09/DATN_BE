import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    idSender: number;
    @Column()
    idReceiver: number;
    @Column()
    status: string;
    @Column({default:'new'})
    check: string;
}
