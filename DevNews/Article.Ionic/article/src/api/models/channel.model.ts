export type Channel = {
    avatar: ChannelAvater;
    name: string;
    link: string;
    token: string;
    id: string;
    categories: never[]
}

export type ChannelAvater = {
    base64: string;
    type: string;
    ogName: string;
}