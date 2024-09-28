import { get, del, post, put } from "../utils/request";

export const getCommentsList = async (id) => {
    const result = await get(`comments/${id}`);
    return result;
}

export const getChildCommentsList = async (id) => {
    const result = await get(`child-comments/${id}`);
    return result;
}

export const createComment = async (option) => {
    const result = await post("comments/create",option);
    return result;
}