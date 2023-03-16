import {Schema, model as Model} from "mongoose";

const PostSchema = new Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 300 },
    content: { type: String, maxLength: 40000 },
    image: { data: Buffer, contentType: String },
    author: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    upvotes: { type: Array },
    downvotes: { type: Array },
    comments: { type: Array },
    subwettit: { type: Schema.Types.ObjectId, required: true },
    flair: { type: String },
    flairColor: { type: String }
}, { versionKey: false, toJSON:{ virtuals: true } })

PostSchema.virtual("score").get(function () {
    return this.upvotes.length - this.downvotes.length
})

PostSchema.virtual("formatted_subwettit", {
    ref: 'Subwettit',
    localField: 'subwettit',
    foreignField: '_id',
    justOne: true
})

const PostModel = Model("Post", PostSchema, "Posts")

export default PostModel