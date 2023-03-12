import { NextFunction, Response, Request } from "express";
import UserModel from "../models/user";

export async function createPlaceholderUsers(req: Request, res: Response, next: NextFunction) {
    const usernames = ['User1', 'TheUser2', 'JohnCurtain']
    const passwords = ['password1', 'password2', 'password3']
    const creationDates = [new Date(), new Date('03/25/2015'), new Date('08/13/2018')]
    const drops = [11, 123, 5502]

    for (let i = 0; i <=  usernames.length - 1; i++) {
        let user = new UserModel({
            username: usernames[i],
            password: passwords[i],
            creation_date: creationDates[i],
            drops: drops[i]
        })
        user.save()
    }
    res.json({success: true})
}