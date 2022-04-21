
export const Participant = {
    user: async (parent, args, { _db }) => await _db.User.findById(parent.user)
}
