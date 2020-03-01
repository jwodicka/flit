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
    return {
        cursor: messageSet.lastId,
        hasMore: messageSet.hasMore,
        messages: messageSet.messages
    };
}
export const resolvers: Resolvers = {
    Query: {
        getMessages: (root, args, ctx) => {
            const count = args.pageSize || 10;
            const after = args.after || null;
            const messages = ctx.models.chatModel.getMessages(count, after);
            return toGraphqlMessages(messages);
        }
    }
};