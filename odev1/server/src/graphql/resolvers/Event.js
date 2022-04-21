export const Event = {
    user: async (parent, args, { _db }) => await _db.User.findById(parent.user),
    participants: async (parent, args, { _db }) => await _db.Participant.find({ event: parent.id }),
    location: async (parent, args, { _db }) => await _db.Location.findById(parent.location)
}

