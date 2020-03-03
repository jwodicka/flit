/**
 * Functions available to an individual chat channel
 */

export interface Chat {
    getMessages(count: number, after: string): MessageSet;
}
export class Message {
    constructor(
        readonly id: string,
        readonly body: string,
        readonly when: Date,
        readonly senderId: string){

    }
}

export class MessageSet {
    hasMore: boolean;
    lastId: string;
    messages: Message[];
}

// The english translation of lorem ipsum.
const words = `But I must explain to you how all this mistaken idea
 of denouncing pleasure and praising pain was born and I will give
 you a complete account of the system, and expound the actual
 teachings of the great explorer of the truth, the master-builder
 of human happiness. No one rejects, dislikes, or avoids pleasure
 itself, because it is pleasure, but because those who do not know
 how to pursue pleasure rationally encounter consequences that are
 extremely painful. Nor again is there anyone who loves or pursues
 or desires to obtain pain of itself, because it is pain, but because
 occasionally circumstances occur in which toil and pain can procure
 him some great pleasure. To take a trivial example, which of us ever
 undertakes laborious physical exercise, except to obtain some
 advantage from it? But who has any right to find fault with a man
 who chooses to enjoy a pleasure that has no annoying consequences,
 or one who avoids a pain that produces no resultant pleasure?
 `.split(new RegExp("[ \n]"));

function randomMessage(id: number): Message {

    const len = Math.random() * 20;
    let body = "";
    let i: number;
    for(i = len; i > 0; i--) {
        const index = Math.floor(Math.random() * words.length);
        body += words[index] + " ";
    }
    return new Message(
        String(id),
        body,
        new Date(),
        "slythering.sender");
}
export class StubChat {
    getMessages(count: number, after: string | null): MessageSet {
        let afterCount = (after != null) ? Number(after) : 1;
        const result: MessageSet = new MessageSet();
        result.messages = [];
        let i: number;
        for(i = 0; i < count; i++) {
            afterCount++;
            result.messages.push(randomMessage(afterCount));
        }
        result.hasMore = true;
        result.lastId = result.messages[count - 1].id;
        return result;
    }
};
