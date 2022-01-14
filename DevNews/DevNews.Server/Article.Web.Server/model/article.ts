import { FileModel } from "./channel";

export type UpsertArticle = {
    title: string;
    shortDescription: string;
    text: string;
    file: FileModel;
    attachments: FileModel[],
    channelToken?: string;
    tags?: string;
    isActive: boolean;
    ownerType: number;
}

export const ArticleOwnerType = {
    Channel: 0,
    User: 1
}

export const ArticleFileType = {
    Main: 0,
    Attachment: 1
}