import { PostModel } from "../../model/post";

export default interface IPost {
    sendPost(post: any): any

    getChannelPost(channelId: string): any

    getPost(id: string): any
}