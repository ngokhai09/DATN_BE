import {Router} from "express";
import AccountController from "../controllers/AccountController";
export const accountRouter = Router();
accountRouter.post('/login', AccountController.login);
accountRouter.post('/loginGG', AccountController.loginGG);
accountRouter.get('/findById/:id', AccountController.findByIdUser);
accountRouter.post('/register', AccountController.register);
accountRouter.post('/changePassword/:id', AccountController.changePassword);
accountRouter.put('/:id', AccountController.editAccount);


