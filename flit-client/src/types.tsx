export type Message = {
    source: Account,
    content: string,
    timestamp: number, // epoch time in s
}

export type Account = {
    name: string,
    // avatar: Image - how will we represent this?
    // add in whatever auth-related info we need
}