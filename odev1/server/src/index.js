import { GraphQLServer, PubSub } from 'graphql-yoga';
import resolvers from '@graphql/resolvers';
import typeDefs from '@graphql/type-defs';

import db from './db'
db()

import User from './models/User'
import Event from './models/Event'
import Participant from './models/Participant'
import Location from './models/Location'


import data from './data';

/* setTimeout(async () => {
    const locations = await Location.find();
    console.log(locations)
}, 2000) */

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        pubsub,
        db: data,
        _db: {
            User,
            Event,
            Location,
            Participant,
        }
    }
});
server.start(() => console.log("Server is running on localhost:4000"));