import Cookies from 'js-cookie'

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    nuxtServerInit({ dispatch }, { req }){
        const domain = req ? req.headers.host : window.location.host;
        dispatch('auth/setDomain', domain)

        let auth_instance = this.$cookies.get('auth-instance')
        let auth_token = this.$cookies.get('x-access-token')
        this.$axios.setToken(auth_token, 'Bearer')

        dispatch('auth/setAuthInstance', auth_instance)
        dispatch('auth/setAuthToken', auth_token)
    },
}

export const getters = {

}