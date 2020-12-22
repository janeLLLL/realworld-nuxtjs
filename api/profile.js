import { request } from '@/plugins/request'

//登录
export const getProfiles = username => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`
    })
}

//关注
export const follow = username => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`
    })
}

export const unFollow = username => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`
    })
}