export type ChannelModel = {
    link: string;
    title: string;
    avatar: string;
    name: string;
    token: string;
    id: string;
}

export type SaveFile = {
    base64: string;
    path: string;
}

export type ChannelAdmin = {
    userName: string;
    email: string;
    avatar: string;
    token: string;
}

export type ChannelInfo = {
    channel: ChannelModel;
    owner: ChannelAdmin;
    isAdmin: boolean;
    mute: boolean;
    isIn: boolean;
}

export type FileModel = {
    base64: string;
    ogName: string;
    type: string;
}

export type SaveChannelFile = {
    file: FileModel;
    objId: string;
}