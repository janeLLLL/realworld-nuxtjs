const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务器渲染期间运行的都是同一个实例
// 为了防止数据冲突，务必要把state定义成一个函数，返回数据对象
const state = () => {
    return {
        //当前登录用户的登录状态
        user: null
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {
    //nuxtServerInit是一个特殊的action方法
    //这个特殊的action只会在服务端渲染期间运行
    //作用：初始化容器数据，传递数据给客户端使用
    nuxtServerInit({ commit }, { req }) {
        let user = null
        //commit：提交mutations的方法
        //req：服务端渲染的请求对象

        //如果请求头中有cookie
        if (req.headers.cookie) {
            //使用cookieparser把cookie字符串转为JavaScript对象
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)//还原到js对象
            } catch (err) {
                // No valid cookie found
            }
        }
        //提交mutation修改state状态
        commit('setUser', user)
    }
}