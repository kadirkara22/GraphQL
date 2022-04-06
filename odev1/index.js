const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { args } = require('commander');
const { events, locations, participants, users } = require('./data')


const typeDefs = gql`
type User {
    id:ID!
    username:String!
    email:String!
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
type Location {
id:ID!
name:String!
desc:String!
lat:String!
Ing:String!
}

type Participant {
id:ID!
user_id:ID!
event_id:ID!
user:User!
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

`;


const resolvers = {
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
            // options
        })
    ]
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});