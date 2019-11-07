export const state = () => ({

});

export const mutations = {

}

export const actions = {
    nuxtServerInit({ dispatch }, { req }){
        const domain = req ? req.headers.host : window.location.host;
        dispatch('auth/setDomain', domain)
    },
}

export const getters = {

}