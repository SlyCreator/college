import {ApolloServer} from "apollo-server-express";
import * as Express from "express";
import "reflect-metadata"
import {buildSchema} from "type-graphql";
import Connect from "./config/connect"
import {UserResolver} from "./UserService/UserResolver";
import UserModel from "./UserService/UserModel";

import {Container} from "typedi";
const startServer = async ()=> {
    const db = "mongodb://localhost:27017/college"
    Connect({ db })
    const app = Express()
    require('dotenv').config({ path: __dirname+'/.env' });
    const schema = await buildSchema({
        resolvers:[UserResolver],
        emitSchemaFile:true,
        nullableByDefault: true,
        container: Container,
    })
    //Container.set();

    const apolloServer = new ApolloServer({
        schema,
        context:()=>({
            userModel:UserModel,
        }),
    })
    await apolloServer.start();
    apolloServer.applyMiddleware({app})
    const  PORT = process.env.PORT || 5678;
    await new Promise(()=> app.listen({ port: PORT }));
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
    return { apolloServer, app };
}
startServer();
