import {
    Resolvers,
    MessageResult,
} from "../types/generated/graphql";

import {Chat, MessageSet} from "../models/Chat";
import { PubSub } from "graphql-subscriptions";

export class Context {
    models: {
        chatModel: Chat;
    };
};

const pubsub = new PubSub();
const MESSAGE_ADDED = "MESSAGE_ADDED";

function toGraphqlMessages(messageSet: MessageSet): MessageResult {
    return {
        cursor: messageSet.lastId,
        hasMore: messageSet.hasMore,
        messages: messageSet.messages
    };
}
export const resolvers: Resolvers = {
    Mutation: {
        sendMessage(root, {body, senderId}, context) {
            const added = context.models.chatModel.addMessage(body, senderId);
            pubsub.publish(MESSAGE_ADDED, { messageAdded: added });
            return added;
          },
    },
    Query: {
        getMessages: (root, args, ctx) => {
            const count = args.pageSize || 10;
            const after = args.after || null;
            const messages = ctx.models.chatModel.getMessages(count, after);
            return toGraphqlMessages(messages);
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED])
        }
    }
};