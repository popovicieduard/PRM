export const state = () => ({
    token: null,
    domain: null,
});

export const mutations = {
    SET_DOMAIN(state, domain){
        state.domain = domain
    },
}

export const actions = {
    setDomain({commit}, domain){
        commit('SET_DOMAIN', domain)
    },
}

export const getters = {
    getDomain(state){
        return state.domain;
    },
}