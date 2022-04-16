
export const Participant = {
    user: (parent, args, { db }) => db.users.find(user => user.id === parent.user_id),
}
