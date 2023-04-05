import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    idSender: number;
    @Column()
    idReceiver: number;
    @Column({default:"Waiting"})
    status: string;
}
