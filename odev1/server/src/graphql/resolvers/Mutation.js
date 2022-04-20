import { nanoid } from 'nanoid';
export const Mutation = {
    addUser: (parent, { data }, { pubsub, db }) => {
        const user = {
            id: nanoid(),
            ...data
        }
        db.users.push(user)
        pubsub.publish("userCreated", { userCreated: user });
        return user
    },
    updateUser: (parent, { id, data }, { pubsub, db }) => {
        const user_index = db.users.findIndex(user => user.id === id)
        if (user_index === -1) {
            throw new Error("User not found")
        }

        const updated_user = (db.users[user_index] = {
            ...db.users[user_index],
            ...data
        })
        pubsub.publish("userUpdated", { userUpdated: updated_user });
        return updated_user
    },
    deleteUser: (parent, { id }, { pubsub, db }) => {
        const user_index = db.users.findIndex(user => user.id === id)
        if (user_index === -1) {
            throw new Error("User not Found")
        }

        const delete_user = db.users[user_index]
        db.users.splice(user_index, 1)
        pubsub.publish("userDeleted", { userDeleted: delete_user });
        return delete_user
    },
    deleteAllUsers: (_, __, { db }) => {
        const length = db.users.length
        db.users.splice(0, length)
        return {
            count: length
        }
    },
    addEvent: (parent, { data }, { pubsub, db }) => {
        const event = {
            id: nanoid(),
            ...data
        }
        db.events.unshift(event)
        /*  pubsub.publish("eventCreated", { eventCreated: event });
         pubsub.publish("eventCount", { eventCount: events.length }); */
        return event

    },
    updateEvent: (parent, { id, data }, { pubsub, db }) => {
        const event_index = db.events.findIndex(event => event.id === id)
        if (event_index === -1) {
            throw new Error("Event not found")
        }

        const updated_event = (db.events[event_index] = {
            ...db.events[event_index],
            ...data
        })
        pubsub.publish("eventUpdated", { eventUpdated: updated_event });
        return updated_event
    },
    deleteEvent: (parent, { id }, { pubsub, db }) => {
        const event_index = db.events.findIndex(event => event.id === id)
        if (event_index === -1) {
            throw new Error("User not Found")
        }

        const delete_event = db.events[event_index]
        db.events.splice(event_index, 1)
        /*  pubsub.publish("eventDeleted", { eventDeleted: delete_event });
         pubsub.publish("eventCount", { eventCount: events.length }); */
        return delete_event
    },
    deleteAllEvents: (_, __, { db }) => {
        const length = db.events.length
        db.events.splice(0, length)
        return {
            count: length
        }
    },
    addLocation: (parent, { data }, { db }) => {
        const location = {
            id: nanoid(),
            ...data
        }
        db.locations.push(location)
        return location
    },
    updateLocation: (parent, { id, data }, { db }) => {
        const location_index = db.locations.findIndex(location => location.id === id)
        if (location_index === -1) {
            throw new Error("location not found")
        }

        const updated_location = (db.locations[location_index] = {
            ...db.locations[location_index],
            ...data
        })

        return updated_location
    },
    deleteLocation: (parent, { id }, { db }) => {
        const location_index = db.locations.findIndex(location => location.id === id)
        if (location_index === -1) {
            throw new Error("location not Found")
        }

        const delete_location = db.locations[location_index]
        db.locations.splice(location_index, 1)
        return delete_location
    },
    deleteAllLocations: (_, __, { db }) => {
        const length = db.locations.length
        db.locations.splice(0, length)
        return {
            count: length
        }
    },
    addParticipant: (parent, { data }, { pubsub, db }) => {
        const participant = {
            id: nanoid(),
            ...data
        }
        db.participants.push(participant)
        pubsub.publish("participantCreated", { participantCreated: participant });
        return participant
    },
    updateParticipant: (parent, { id, data }, { pubsub, db }) => {
        const participant_index = db.participants.findIndex(participant => participant.id === id)
        if (participant_index === -1) {
            throw new Error("participant not found")
        }

        const updated_participant = (db.participants[participant_index] = {
            ...db.participants[participant_index],
            ...data
        })
        pubsub.publish("participantUpdated", { participantUpdated: updated_participant });
        return updated_participant
    },
    deleteParticipant: (parent, { id }, { pubsub, db }) => {
        const participant_index = db.participants.findIndex(participant => participant.id === id)
        if (participant_index === -1) {
            throw new Error("participant not Found")
        }

        const delete_participant = db.participants[participant_index]
        db.participants.splice(participant_index, 1)
        pubsub.publish("participantDeleted", { participantDeleted: delete_participant });
        return delete_participant
    },
    deleteAllParticipants: () => {
        const length = db.participants.length
        db.participants.splice(0, length)
        return {
            count: length
        }
    }

}
