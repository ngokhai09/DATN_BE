import {Message} from '../models/Message';
import {Account} from '../models/Account';
import {AppDataSource} from "../data-source";
import {Request} from "express";

export class MessageService {
    private messageRepository;

    constructor() {
        this.messageRepository = AppDataSource.getRepository(Message)
    }

// lưu tin nhắn vào db
    async sendMessage(sender: Account, receiver: Account, content: string): Promise<Message> {
        const newMessage = new Message();
        newMessage.content = content;
        newMessage.sender = sender;
        newMessage.receiver = receiver;

        return await this.messageRepository.save(newMessage);
    }

// lấy ra những thằng đã nhắn cho 1 idAccount nào đó
    async getConversations(idAccount: string): Promise<Account[]> {
        const conversations = await this.messageRepository
            .createQueryBuilder('message')
            .select('DISTINCT senderIdAccount')
            .addSelect('receiverIdAccount')
            .addSelect('time')
            .addSelect('content')
            .where('senderIdAccount = :idAccount OR receiverIdAccount = :idAccount', {idAccount})
            .orderBy('time', 'DESC')
            .getRawMany();

        const idAccounts = conversations
            .map((conversation) => [
                conversation.senderIdAccount,
                conversation.receiverIdAccount,
            ])
            .flat()
            .filter((id) => id !== idAccount);
        return await AppDataSource.getRepository(Account).findByIds(idAccounts);
    }


// lấy ra tin nhắn giữ 2 người
    getMessages = async (req: Request) => {
        if (req.query.senderId !== undefined && req.query.receiverId !== undefined) {
            let sql = `select content, time, senderIdAccount
                       from message
                       where (senderIdAccount = '${req.query.senderId}' and receiverIdAccount = '${req.query.receiverId}')
                          or (senderIdAccount = '${req.query.receiverId}' and receiverIdAccount = '${req.query.senderId} ')
                       order by (time) ASC`
            return await this.messageRepository.query(sql)
        }
    }

}
