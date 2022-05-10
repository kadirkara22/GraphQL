import { GraphQLServer } from 'graphql-yoga';
import resolvers from "@graphql/resolvers";
import typeDefs from "@graphql/type-defs";

import { countries, continents, languages } from "countries-list";

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        continents,
        countries,
        languages,
    }
});


server.start(() => console.log("Server is running on localhost:4000"));