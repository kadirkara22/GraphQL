export const Query = {
    users: async (parent, args, { _db }) => {
        const users = await _db.User.find();
        return users
    },
    user: async (parent, args, { _db }) => {

        const user = await _db.User.findById(args.id)
        return user
    },

    events: async (parent, args, { _db }) => {
        const events = await _db.Event.find();
        return events
    },
    event: async (parent, args, { _db }) => {

        const event = await _db.Event.findById(args.id)
        return event
    },



    locations: async (parent, args, { _db }) => {
        const locations = await _db.Location.find();
        return locations
    },
    location: async (parent, args, { _db }) => {
        const location = await _db.Location.findById(args.id)
        return location
    },


    participants: async (parent, args, { _db }) => {
        const participants = await _db.Participant.find();
        return participants
    },
    participant: async (parent, args, { _db }) => {
        const participant = await _db.Participant.findById(args.id)
        return participant
    }


}
