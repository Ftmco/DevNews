export type UpsertArticle = {
    title: string;
    shortDescription: string;
    text: string;
    file: FileModel;
    attachments: FileModel[],
    channelToken?: string;
    tags?: string;
    isActive: boolean;
    ownerType: number
}

export type FileModel = {
    base64: string;
    ogName: string;
    type: string;
}

export const ArticleOwnerType = {
    Channel: 0,
    User: 1
}