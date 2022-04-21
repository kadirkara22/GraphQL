import { nanoid } from 'nanoid';
import mongoose from 'mongoose'
export const Mutation = {
    addUser: async (parent, { data }, { pubsub, _db }) => {
        const newUser = new _db.User({
            ...data
        })
        const user = await newUser.save()

        pubsub.publish("userCreated", { userCreated: user });
        return user
    },
    updateUser: async (parent, { id, data }, { pubsub, _db }) => {
        const is_user_exist = await _db.User.findById(id)
        if (!is_user_exist) {
            throw new Error("User not found")
        }

        const updated_user = await _db.User.findByIdAndUpdate(id, data, {
            new: true,
        })
        pubsub.publish("userUpdated", { userUpdated: updated_user });
        return updated_user
    },
    deleteUser: async (parent, { id }, { pubsub, _db }) => {
        const is_user_exist = await _db.User.findById(id)
        if (!is_user_exist) {
            throw new Error("User not found")
        }

        const delete_user = await _db.User.findByIdAndDelete(id)

        pubsub.publish("userDeleted", { userDeleted: delete_user });
        return delete_user
    },
    deleteAllUsers: async (_, __, { _db }) => {
        const delete_users = await _db.User.deleteMany({})

        return {
            count: delete_users.deletedCount
        }
    },
    addEvent: async (parent, { data }, { pubsub, _db }) => {
        const newEvent = new _db.Event({
            ...data
        })
        const event = await newEvent.save()

        const user = await _db.User.findById(mongoose.Types.ObjectId(data.user))
        user.events.push(event.id)
        user.save()
        const eventCount = await _db.Event.countDocuments()
        pubsub.publish("eventCreated", { eventCreated: event });
        pubsub.publish("eventCount", { eventCount });
        return event

    },
    updateEvent: async (parent, { id, data }, { pubsub, _db }) => {
        const is_event_exist = await _db.Event.findById(id)
        if (!is_event_exist) {
            throw new Error("Event not found")
        }

        const updated_event = await _db.Event.findByIdAndUpdate(id, data, {
            new: true,
        })
        pubsub.publish("eventUpdated", { eventUpdated: updated_event });
        return updated_event
    },
    deleteEvent: async (parent, { id }, { pubsub, _db }) => {
        const is_event_exist = await _db.Event.findById(id)
        if (!is_event_exist) {
            throw new Error("Event not found")
        }

        const eventDeleted = await _db.Event.findByIdAndDelete(id)
        const eventCount = await _db.Event.countDocuments();

        pubsub.publish("eventDeleted", { eventDeleted });
        pubsub.publish("eventCount", { eventCount });

        return eventDeleted
    },
    deleteAllEvents: async (_, __, { _db }) => {
        const delete_events = await _db.Event.deleteMany({})

        return {
            count: delete_events.deletedCount
        }
    },
    addLocation: async (parent, { data }, { _db }) => {
        const newLocation = new _db.Location({
            ...data
        })
        const location = await newLocation.save()
        return location
    },
    updateLocation: async (parent, { id, data }, { _db }) => {
        const is_location_exist = await _dbLocation.findById(id)
        if (!is_location_exist) {
            throw new Error("Location not found")
        }

        const updated_location = await _db.Location.findByIdAndUpdate(id, data, {
            new: true,
        })

        return updated_location
    },
    deleteLocation: async (parent, { id }, { _db }) => {
        const is_location_exist = await _db.Location.findById(id)
        if (!is_location_exist) {
            throw new Error("Location not found")
        }

        const delete_location = await _db.Location.findByIdAndDelete(id)
        return delete_location
    },
    deleteAllLocations: async (_, __, { _db }) => {
        const delete_locations = await _db.Location.deleteMany({})

        return {
            count: delete_locations.deletedCount
        }
    },
    addParticipant: async (parent, { data }, { pubsub, _db }) => {

        const newParticipant = new _db.Participant(data)
        const createdParticipant = await newParticipant.save()

        const user = await _db.User.findById(mongoose.Types.ObjectId(data.user))
        const event = await _db.Event.findById(mongoose.Types.ObjectId(data.event))

        user.participants.push(createdParticipant.id)
        event.participants.push(createdParticipant.id)

        await user.save()
        await event.save()

        pubsub.publish("participantCreated", { participantCreated: createdParticipant });
        return createdParticipant
    },
    updateParticipant: async (parent, { id, data }, { pubsub, _db }) => {
        const is_participant_exist = await _db.Participant.findById(id)
        if (!is_participant_exist) {
            throw new Error("Participant not found")
        }

        const updated_participant = await _db.Participant.findByIdAndUpdate(id, data, {
            new: true,
        })
        pubsub.publish("participantUpdated", { participantUpdated: updated_participant });
        return updated_participant
    },
    deleteParticipant: async (parent, { id }, { pubsub, _db }) => {
        const is_participant_exist = await _db.Participant.findById(id)
        if (!is_participant_exist) {
            throw new Error("Participant not found")
        }

        const delete_participant = await _db.Participant.findByIdAndDelete(id)

        pubsub.publish("participantDeleted", { participantDeleted: delete_participant });
        return delete_participant
    },
    deleteAllParticipants: async (_, __, { _db }) => {
        const delete_participants = await _db.Participant.deleteMany({})

        return {
            count: delete_participants.deletedCount
        }
    }

}
