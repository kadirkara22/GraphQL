export const Query = {
    users: (parent, args, { db }) => db.users,
    user: (parent, args, { db }) => db.users.find(user => user.id === args.id),

    events: (parent, args, { db }) => db.events,
    event: (parent, args, { db }) => db.events.find(event => event.id === args.id),
    locations: (parent, args, { db }) => db.locations,
    location: (parent, args, { db }) => db.locations.find(location => location.id === args.id),
    participants: (parent, args, { db }) => db.participants,
    participant: (parent, args, { db }) => db.participants.find(participant => participant.id === args.id)


}
