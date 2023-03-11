import {Schema, model as Model} from "mongoose";

const UserSchema = new Schema({
    username: { type: String, required: true, minLength: 3, maxLength: 20 },
    password: { type: String, minLength: 5 },
    avatar: { data: Buffer, contentType: String },
    author: { type: Schema.Types.ObjectId, required: true },
    creation_date: { type: Date, required: true },
    drops: { type: Number, required: true },
    posts: { type: Array },
    comments: { type: Array }
}, { versionKey: false })

const model = Model("User", UserSchema, "Users")

export default model