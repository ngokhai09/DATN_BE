import {AppDataSource} from "../data-source";
import {Account} from "../models/Account";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {SECRET} from "../middlerware/Auth";

class AccountService {
    private accountRepository;

    constructor() {
        this.accountRepository = AppDataSource.getRepository(Account);
    }

    checkUser = async (user) => {
        let userCheck = await this.accountRepository.findOneBy({username: user.username})
        if (!userCheck) {
            return 'User is not exit';
        } else {
            let passwordCompare = await bcrypt.compare(user.password, userCheck.password);
            if (!passwordCompare) {
                return 'Password is wrong'
            } else {
                let payload = {
                    idAccount: userCheck.idAccount,
                    username: userCheck.username,
                    name: userCheck.name,
                }
                return {
                    idAccount: userCheck.idAccount,
                    username: userCheck.username,
                    name: userCheck.name,
                    avatar : userCheck.avatar,
                    address:userCheck.address,
                    german:userCheck.german,
                    birthday:userCheck.birthday,
                    token: jwt.sign(payload, SECRET, {
                        expiresIn: 3000000
                    })
                }
            }
        }

    }
    register = async (account) => {
        let userCheck = await this.accountRepository.findOneBy({username: account.username})
        if (!userCheck) {
            account.password = await bcrypt.hash(account.password, 10);
            return this.accountRepository.save(account);
        }
        return 'Username registered';
    }
    findById = async (id) => {
        let account = await this.accountRepository.findOneBy({idAccount: id});
        if (!account) {
            return null;
        }
        return account;
    }
    checkUserGG = async (user) => {
        let check = await this.accountRepository.findOneBy({username: user.username});
        return !!check;
        }

    checkChangePassword = async (id, oldPassword, newPassword) => {
        let account = {
            check: false,
            accountFind: []
        }
        let accountFind = await this.accountRepository.findBy({idAccount: id})
        if (accountFind.length === 0) {
            account.check = false;
        } else {
            let compare = await bcrypt.compare(oldPassword, accountFind[0].password)
            if (!compare) {
                account.accountFind = accountFind
                account.check = false;
            }
            if (compare) {
                newPassword = await bcrypt.hash(newPassword, 10)
                await this.accountRepository.update({idAccount: id}, {password: newPassword})
                account.check = true;
                account.accountFind = await this.accountRepository.findBy({idAccount: id})
            }
        }
        return account
    }

    updateAccount = async (id, newAccount) => {
        let accounts = await this.accountRepository.findOneBy({idAccount: id})
        if (!accounts) {
            return null
        }
        return await this.accountRepository.update({idAccount: id}, newAccount)
    }
}
export default new AccountService;
