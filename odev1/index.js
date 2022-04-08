const { GraphQLServer, PubSub, withFilter } = require("graphql-yoga");
const { events, locations, participants, users } = require('./data')
const { nanoid } = require('nanoid')

const typeDefs = `
type User {
    id:ID!
    username:String!
    email:String!
}
 input AddUserInput{
    username:String!
    email:String!
 }

 input UpdateUSerInput{
    username:String
    email:String
 }
 type DeleteAllOutPut{
     count:Int!
 }
type Event {
 id:ID!
 title:String!
 desc:String!
 date:String!
 from:String!
 to:String!
 location_id:String!
 user_id:ID!
 user:User
 participants:[Participant!]!
 location:Location!
}

input AddEventInput{
    title:String!

}

input UpdateEventInput{
    title:String
 desc:String
 date:String
 from:String
 to:String
 location_id:String
 user_id:ID
}

type Location {
id:ID!
name:String!
desc:String!
lat:String!
Ing:String!
}

input AddLocationInput{
    name:String!
}

input UpdateLocationInput{
    name:String
desc:String

}

type Participant {
id:ID!
user_id:ID!
event_id:ID!
user:User!
}

input AddParticipantInput{
    user_id:ID!
event_id:ID!
}
input UpdateParticipantInput{
    user_id:ID
event_id:ID
}
type Query{
    users:[User!]!
    user(id:ID!):User!

    events:[Event!]!
    event(id:ID!):Event!

    locations:[Location!]!
    location(id:ID!):Location!

    participants:[Participant!]!
    participant(id:ID!):Participant!
}

type Mutation{
    addUser(data:AddUserInput!):User!
    updateUser(id:ID!,data:UpdateUSerInput!):User!
    deleteUser(id:ID!):User!
    deleteAllUsers:DeleteAllOutPut!


    addEvent(data:AddEventInput!):Event!
    updateEvent(id:ID!,data:UpdateEventInput!):Event!
    deleteEvent(id:ID!):Event!
    deleteAllEvents:DeleteAllOutPut!

    addLocation(data:AddLocationInput!):Location!
    updateLocation(id:ID!,data:UpdateLocationInput!):Location!
    deleteLocation(id:ID!):Location!
    deleteAllLocations:DeleteAllOutPut!

    addParticipant(data:AddParticipantInput!):Participant!
    updateParticipant(id:ID!,data:UpdateParticipantInput!):Participant!
    deleteParticipant(id:ID!):Participant!
    deleteAllParticipants:DeleteAllOutPut!

}
type Subscription {

    userCreated: User!
    userUpdated: User!
    userDeleted: User!

    eventCreated: Event!
    eventUpdated: Event!
    eventDeleted: Event!
    eventCount: Int!

    participantCreated(event_id: ID): Participant!
    participantUpdated: Participant!
    participantDeleted: Participant!
  }

`;


const resolvers = {
    Subscription: {
        // User
        userCreated: {
            subscribe: (parent, args, { pubsub }) =>
                pubsub.asyncIterator("userCreated"),
        },
        userUpdated: {
            subscribe: (parent, args, { pubsub }) =>
                pubsub.asyncIterator("userUpdated"),
        },
        userDeleted: {
            subscribe: (parent, args, { pubsub }) =>
                pubsub.asyncIterator("userDeleted"),
        },
        // Event
        eventCreated: {
            subscribe: withFilter(
                (parent, args, { pubsub }) => pubsub.asyncIterator("eventCreated"),
                (payload, variables) => {
                    console.log("payload =>", payload, "variables =>", variables);
                    return variables.user_id
                        ? payload.eventCreated.user_id === variables.user_id
                        : true;
                }
            ),
        },
        eventUpdated: {
            subscribe: (parent, args, { pubsub }) =>
                pubsub.asyncIterator("eventUpdated"),
        },
        eventDeleted: {
            subscribe: (parent, args, { pubsub }) =>
                pubsub.asyncIterator("eventDeleted"),
        },
        eventCount: {
            subscribe: (parent, args, { pubsub }) => {
                setTimeout(() => {
                    pubsub.publish("eventCount", { eventCount: events.length });
                }, 1000);

                return pubsub.asyncIterator("eventCount");
            },
        },
        // Participant
        participantCreated: {
            subscribe: withFilter(
                (parent, args, { pubsub }) =>
                    pubsub.asyncIterator("participantCreated"),
                (payload, variables) => {
                    console.log("payload =>", payload, "variables =>", variables);
                    return variables.event_id
                        ? payload.participantCreated.event_id === variables.event_id
                        : true;
                }
            ),
        },
        participantUpdated: {
            subscribe: (parent, args, { pubsub }) =>
                pubsub.asyncIterator("participantUpdated"),
        },
        participantDeleted: {
            subscribe: (parent, args, { pubsub }) =>
                pubsub.asyncIterator("participantDeleted"),
        },
    },
    Mutation: {
        addUser: (parent, { data }, { pubsub }) => {
            const user = {
                id: nanoid(),
                ...data
            }
            users.push(user)
            pubsub.publish("userCreated", { userCreated: user });
            return user
        },
        updateUser: (parent, { id, data }, { pubsub }) => {
            const user_index = users.findIndex(user => user.id === id)
            if (user_index === -1) {
                throw new Error("User not found")
            }

            const updated_user = (users[user_index] = {
                ...users[user_index],
                ...data
            })
            pubsub.publish("userUpdated", { userUpdated: updated_user });
            return updated_user
        },
        deleteUser: (parent, { id }, { pubsub }) => {
            const user_index = users.findIndex(user => user.id === id)
            if (user_index === -1) {
                throw new Error("User not Found")
            }

            const delete_user = users[user_index]
            users.splice(user_index, 1)
            pubsub.publish("userDeleted", { userDeleted: delete_user });
            return delete_user
        },
        deleteAllUsers: () => {
            const length = users.length
            users.splice(0, length)
            return {
                count: length
            }
        },
        addEvent: (parent, { data }, { pubsub }) => {
            const event = {
                id: nanoid(),
                ...data
            }
            events.push(event)
            pubsub.publish("eventCreated", { eventCreated: event });
            pubsub.publish("eventCount", { eventCount: events.length });
            return event

        },
        updateEvent: (parent, { id, data }, { pubsub }) => {
            const event_index = events.findIndex(event => event.id === id)
            if (event_index === -1) {
                throw new Error("Event not found")
            }

            const updated_event = (events[event_index] = {
                ...events[event_index],
                ...data
            })
            pubsub.publish("eventUpdated", { eventUpdated: updated_event });
            return updated_event
        },
        deleteEvent: (parent, { id }, { pubsub }) => {
            const event_index = events.findIndex(event => event.id === id)
            if (event_index === -1) {
                throw new Error("User not Found")
            }

            const delete_event = events[event_index]
            events.splice(event_index, 1)
            pubsub.publish("eventDeleted", { eventDeleted: delete_event });
            pubsub.publish("eventCount", { eventCount: events.length });
            return delete_event
        },
        deleteAllEvents: () => {
            const length = events.length
            events.splice(0, length)
            return {
                count: length
            }
        },
        addLocation: (parent, { data }) => {
            const location = {
                id: nanoid(),
                ...data
            }
            locations.push(location)
            return location
        },
        updateLocation: (parent, { id, data }) => {
            const location_index = locations.findIndex(location => location.id === id)
            if (location_index === -1) {
                throw new Error("location not found")
            }

            const updated_location = (locations[location_index] = {
                ...locations[location_index],
                ...data
            })

            return updated_location
        },
        deleteLocation: (parent, { id }) => {
            const location_index = locations.findIndex(location => location.id === id)
            if (location_index === -1) {
                throw new Error("location not Found")
            }

            const delete_location = locations[location_index]
            locations.splice(location_index, 1)
            return delete_location
        },
        deleteAllLocations: () => {
            const length = locations.length
            locations.splice(0, length)
            return {
                count: length
            }
        },
        addParticipant: (parent, { data }, { pubsub }) => {
            const participant = {
                id: nanoid(),
                ...data
            }
            participants.push(participant)
            pubsub.publish("participantCreated", { participantCreated: participant });
            return participant
        },
        updateParticipant: (parent, { id, data }, { pubsub }) => {
            const participant_index = participants.findIndex(participant => participant.id === id)
            if (participant_index === -1) {
                throw new Error("participant not found")
            }

            const updated_participant = (participants[participant_index] = {
                ...participants[participant_index],
                ...data
            })
            pubsub.publish("participantUpdated", { participantUpdated: updated_participant });
            return updated_participant
        },
        deleteParticipant: (parent, { id }, { pubsub }) => {
            const participant_index = participants.findIndex(participant => participant.id === id)
            if (participant_index === -1) {
                throw new Error("participant not Found")
            }

            const delete_participant = participants[participant_index]
            participants.splice(participant_index, 1)
            pubsub.publish("participantDeleted", { participantDeleted: delete_participant });
            return delete_participant
        },
        deleteAllParticipants: () => {
            const length = participants.length
            participants.splice(0, length)
            return {
                count: length
            }
        }

    },

    Query: {
        users: () => users,
        user: (parent, args) => users.find(user => user.id === args.id),

        events: () => events,
        event: (parent, args) => events.find(event => event.id === args.id),
        locations: () => locations,
        location: (parent, args) => locations.find(location => location.id === args.id),
        participants: () => participants,
        participant: (parent, args) => participants.find(participant => participant.id === args.id)


    },
    Event: {
        user: (parent) => users.find(user => user.id === parent.user_id),
        participants: (parent) => participants.filter(participant => participant.event_id === parent.id),
        location: (parent) => locations.find(location => location.id === parent.location_id)
    },
    Participant: {
        user: (parent) => users.find(user => user.id === parent.user_id),
    }
};

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: { pubsub }
});
server.start(() => console.log("Server is running on localhost:4000"));