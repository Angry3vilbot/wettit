import {Schema, model as Model} from "mongoose";

const CommentSchema = new Schema({
    username: { type: String, required: true },
    url: { type: String, required: true },
    content: { type: String, required: true, minLength: 1, maxLength: 10000 },
    avatar: { data: Buffer, contentType: String, required: true },
    date: { type: Date, required: true },
    parent_comment: { type: String },
    thread_level: { type: Number }
}, { versionKey: false })

const CommentModel = Model("Comment", CommentSchema, "Comments")

export default CommentModel