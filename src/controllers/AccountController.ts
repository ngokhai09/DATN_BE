import AccountService from "../services/AccountService";
import {Request, Response} from "express";

class AccountController {
    private accountService;

    constructor() {
        this.accountService = AccountService;
    }

    register = async (req: Request, res: Response) => {
        try {
            let account = await this.accountService.register(req.body)
            res.status(201).json(account)
        } catch (e) {
            console.log(1)
            res.status(500).json(e.message)
        }
    }
    login = async (req: Request, res: Response) => {
        try {
            let account = {
                username: req.body.username,
                password: req.body.password
            }
            let response = await this.accountService.checkUser(account);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    findByIdUser = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            let account = await this.accountService.findById(id);
            res.status(200).json(account)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    loginGG = async (req: Request, res: Response) => {
        try {
            let account = {
                username: req.body.username,
                password: req.body.password
            }
            let response = await this.accountService.checkUserGG(account);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    changePassword = async (req: Request, res: Response) => {
        try {
            let account = await this.accountService.checkChangePassword(req.params.id, req.body.oldPassword, req.body.newPassword)
            if (!account.check) {

                res.json({
                    account,
                    mess: "Old Password Is Not Correct"
                })
            } else {
                res.json(account)
            }
        } catch (e) {
            res.json({
                mess: e.message + 1,
            })
        }
    }

    editAccount = async (req: Request, res: Response) => {
        try {
            let account = await this.accountService.updateAccount(req.params.id, req.body);
            res.status(200).json(account)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new AccountController;
