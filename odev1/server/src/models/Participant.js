import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
export default mongoose.model('Participant', ParticipantSchema)