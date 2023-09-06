import mongoose from "mongoose"
const Schema = mongoose.Schema
export const TodoSchema = new Schema({
    description: { type: String, required: true, minLength: 3 },
    completed: { type: Boolean, default: false },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
})