import { GraphQLServer, PubSub } from 'graphql-yoga';
import resolvers from '@graphql/resolvers';
import typeDefs from '@graphql/type-defs';
import db from './data';



const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: { pubsub, db }
});
server.start(() => console.log("Server is running on localhost:4000"));