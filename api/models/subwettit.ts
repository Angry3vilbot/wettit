import {Schema, model as Model} from "mongoose";

const SubwettitSchema = new Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 21 },
    type: { type: String, required: true, enum: ["private", "public", "restricted"] },
    logo: { data: Buffer, contentType: String },
    nsfw: { type: Boolean, required: true },
    members: { type: Array },
    moderators: { type: Array }
}, { versionKey: false })

const model = Model("Subwettit", SubwettitSchema, "Subwettits")

export default model