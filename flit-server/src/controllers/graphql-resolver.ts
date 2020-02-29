import {
    Resolvers,
    MessageResult,
} from "../types/generated/graphql";

import {Chat, MessageSet} from "../models/Chat";

export class Context {
    models: { 
        chatModel: Chat;
    };
};

function toGraphqlMessages(messageSet: MessageSet): MessageResult {
    return new MessageResult(
        cursor: messageSet.lastId
    )
}
export const resolvers: Resolvers = {
    Query: {
        getMessages: (root, args, ctx) => {
            const messages = ctx.chatModel.getMessages();
            return toGraphqlMessages(messages);
        }
    }
};