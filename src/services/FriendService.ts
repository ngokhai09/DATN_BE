import {AppDataSource} from "../data-source";
import {Friend} from "../models/Friend";
import {Account} from "../models/Account";

class FriendService {
    private friendRepository
    private accountRepository

    constructor() {
        this.friendRepository = AppDataSource.getRepository(Friend)
        this.accountRepository = AppDataSource.getRepository(Account)
    }

    checkFriend = async (thisId,thatId) =>{
        let sql = `select * from friend where (idSender = ${thisId} and idReceiver = ${thatId}) or  (idSender = ${thatId} and idReceiver = ${thisId})`
        let select = await this.friendRepository.query(sql);
        let friend = select[0]
        if(!friend){
            return "Add Friend"
        } else {
            if (thisId == friend.idSender){
                if(friend.status === "Friends"){
                    return {
                        friend:friend,
                        status:"Friends"}
                }
                return {
                    friend:friend,
                    status:"Cancel Request"}
            }
            if(friend.status === "Friends"){
                return {
                    friend:friend,
                    status:"Friends"}
            }
            return {
                friend:friend,
                status:"Confirm"}
        }
    }

    createFriend = async (values) => {
        await this.friendRepository.save(values);
        let res = await this.friendRepository.findOneBy({idSender:values.idSender, idReceiver:values.idReceiver});
        return {
            friend:res,
            status:"Cancel Request"}
    }

    edit = async (id) => {
        await this.friendRepository.update({id:id}, {status:"Friends"});
        let res = await this.friendRepository.findOneBy({id:id});
        return {
            friend:res,
            status:"Friends"};
    }

    remove = async (id) => {
        await this.friendRepository.delete({id:id});
        return "Add Friend";
    }

    getFriends = async (idAccount) => {
        let id = [];
        let friends = [];
        let res1 = await this.friendRepository.query(`select * from friend where idSender = ${idAccount}  and  friend.status = "Friends"`);
        let res2 = await this.friendRepository.query(`select * from friend where idReceiver = ${idAccount}  and  friend.status = "Friends"`);
        let account = await this.accountRepository.query(`select * from account `);
        if(res1){
            res1.map(it=>{
                id.push(it.idReceiver)
            })
        }
        if(res2){
            res2.map(it=>{
                id.push(it.idSender)
            })
        }
        id.map(it=>{
            account.map(item=>{if(it === item.idAccount){friends.push(item)}})
        })
        return friends;
    }
    getIdFriends = async (idAccount) => {
        let id = [];
        let res1 = await this.friendRepository.query(`select * from friend where idSender = ${idAccount}  and  friend.status = "Friends"`);
        let res2 = await this.friendRepository.query(`select * from friend where idReceiver = ${idAccount}  and  friend.status = "Friends"`);
        let account = await this.accountRepository.query(`select * from account `);
        if(res1){
            res1.map(it=>{
                id.push(it.idReceiver)
            })
        }
        if(res2){
            res2.map(it=>{
                id.push(it.idSender)
            })
        }
        return id;
    }

}


export default new FriendService();
