export const state = () => ({
    auth_token: null,
    auth_instance: null,
    domain: null,
});

export const mutations = {
    SET_DOMAIN(state, domain){
        state.domain = domain
    },
    SET_AUTH_TOKEN(state, auth_token){
        state.auth_token = auth_token
        this.$cookies.set('x-access-token', auth_token)
    },
    SET_AUTH_INSTANCE(state, auth_instance){
        state.auth_instance = auth_instance.data
    },
    LOGOUT(state){
        state.auth_token = null
        state.auth_instance = null
        this.$cookies.remove('x-access-token')
    }
}

export const actions = {
    setDomain({commit}, domain){
        commit('SET_DOMAIN', domain)
    },
    setAuthToken({commit}, auth_token){
        commit('SET_AUTH_TOKEN', auth_token)
    },
    async setAuthInstance({commit}){
        let auth_instance = await this.$axios.get('auth/me')
        commit('SET_AUTH_INSTANCE', auth_instance)
    },
    logout({commit}){
        commit('LOGOUT')
    },
}

export const getters = {
    getDomain(state){
        return state.domain;
    },
    getAuthToken(state){
        return state.auth_token;
    },
    getAuthInstance(state){
        return state.auth_instance;
    },
}