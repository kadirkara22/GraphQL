export const Event = {
    user: (parent, args, { db }) => db.users.find(user => user.id === parent.user_id),
    participants: (parent, args, { db }) => db.participants.filter(participant => participant.event_id === parent.id),
    location: (parent, args, { db }) => db.locations.find(location => location.id === parent.location_id)
}

