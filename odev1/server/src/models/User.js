import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Participant'
        }
    ]
})
export default mongoose.model('User', UserSchema)