import { request } from '@/plugins/request'

//获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: "/api/articles",
        params
    })
}

export const getYourFeedArticles = params => {
    return request({
        method: 'GET',
        url: "/api/articles/feed",
        params,
    })
}

//添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`,
    })
}

//取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`,
    })
}

//获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`,
    })
}

//获取评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`,
    })
}

//添加评论
export const addComments = (slug,data) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
}

//删除评论
export const deleteComments = (slug,id) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${id}`,
    })
}

//添加文章
export const createArticle = data => {
    return request({
        method: 'POST',
        url: "/api/articles",
        data
    })
}

//删除文章
export const deleteArticle = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`,
    })
}