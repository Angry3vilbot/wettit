import {Schema, model as Model} from "mongoose";

const PostSchema = new Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 300 },
    content: { type: String, required: function(this: any) { return !this.image}, maxLength: 40000 },
    image: { data: Buffer, contentType: String, required: function(this: any) { return !this.content} },
    author: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    score: { type: Number, required: true },
    comments: { type: Array },
    subwettit: { type: Schema.Types.ObjectId, required: true }
}, { versionKey: false })

const PostModel = Model("Post", PostSchema, "Posts")

export default PostModel