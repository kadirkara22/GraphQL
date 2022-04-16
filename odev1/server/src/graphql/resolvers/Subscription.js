import { withFilter } from "graphql-yoga";
export const Subscription = {
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
        subscribe: (parent, args, { pubsub, db }) => {
            setTimeout(() => {
                pubsub.publish("eventCount", { eventCount: db.events.length });
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
}

