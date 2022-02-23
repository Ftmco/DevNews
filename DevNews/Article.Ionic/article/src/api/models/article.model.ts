export type UpsertArticle = {
    id?: string,
    text: string,
    shortDescription: string,
    title: string,
    categories: string[],
    image: FileModel,
    attechmentFiles: FileModel[],
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