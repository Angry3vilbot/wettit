import {Schema, model as Model} from "mongoose";

const PostSchema = new Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 300 },
    content: { type: String, maxLength: 40000 },
    image: { data: Buffer, contentType: String },
    author: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    score: { type: Number, required: true },
    comments: { type: Array },
    subwettit: { type: Schema.Types.ObjectId, required: true },
    flair: { type: String },
    flairColor: { type: String }
}, { versionKey: false })

const PostModel = Model("Post", PostSchema, "Posts")

export default PostModel