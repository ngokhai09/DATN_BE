import {Router} from 'express';
import {MessageController} from '../controllers/MessageController';

const messageRouter = Router();
const messageController = new MessageController();

messageRouter.post('/', messageController.sendMessage.bind(messageController));
messageRouter.get('/', messageController.getMessages.bind(messageController));
messageRouter.get('/contacts/:idAccount', messageController.getConversations.bind(messageController));

export default messageRouter;
