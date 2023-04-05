import { Request, Response } from 'express';
import { MessageService } from '../services/MessageService';
import { Account } from '../models/Account';

export class MessageController {
    private messageService = new MessageService();

    async sendMessage(req: Request, res: Response) {
        const sender: Account = req.body.sender;
        const receiver: Account = req.body.receiver;
        const content: string = req.body.content;
        try {
            const savedMessage = await this.messageService.sendMessage(sender, receiver, content);

            res.status(201).send(savedMessage);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getMessages(req: Request, res: Response) {
        try {
            const messages = await this.messageService.getMessages(req);
            res.status(200).send(messages);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    async getConversations(req: Request, res: Response) {
        const idAccount = req.params.idAccount;

        try {
            const accounts = await this.messageService.getConversations(idAccount);
            res.status(200).send(accounts);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}
export default new MessageController()
