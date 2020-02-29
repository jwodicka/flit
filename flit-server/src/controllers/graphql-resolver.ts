import {
    Resolvers,
    ChannelResolvers
} from "../types/graphql";

import {Chat} from "../models/Chat";

export class Context {
    models: { 
        chatModel: Chat;
    };
};

export const resolvers: Resolvers = {
    Query: {
        members: (root, args, ctx) => {
            return null;
        },
        channels: (root, args, ctx) => {
           return null; 
        },
        channel: (root, {id}, ctx) => {
            return ctx.chatModel.getMessages();
        }
    }
};