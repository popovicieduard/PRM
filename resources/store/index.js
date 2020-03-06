export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async nuxtServerInit({ dispatch}, { req, route, store, redirect, app}){
        const domain = req ? req.headers.host : window.location.host;
        dispatch('auth/setDomain', domain)

        let authToken = this.$cookies.get('x-access-token')

        if(authToken){
            try {
                await dispatch('auth/setAuthToken', authToken)

                await this.app.$axios.get('auth/me').then(async (data) => {
                    let user = data.data
                    
                    await dispatch('auth/setAuthInstance', user)
                    await dispatch('auth/setAuthToken', authToken)
                })
            } catch (error) {
                await dispatch('auth/logout')
                return redirect({'name': 'auth-login'});
            }
        }else{
            await dispatch('auth/logout')
            return redirect({'name': 'auth-login'});
        }

        let route_name = route.name
        
        if(route_name){
            let auth_route = route_name.substr(0, route_name.indexOf('-')) || route_name;

            switch(auth_route){
                case 'network':
                    if (!store.state.auth.auth_token || !store.state.auth.auth_instance.role != 'network') {
                        return redirect({'name': 'auth-login'});
                    }
                break;
                case 'advertiser':
                    if (!store.state.auth.auth_token || !store.state.auth.auth_instance.role != 'advertiser') {
                        return redirect({'name': 'auth-login'});
                    }
                break;
                case 'partner':
                    if (!store.state.auth.auth_token || !store.state.auth.auth_instance.role != 'network') {
                        return redirect({'name': 'auth-login'});
                    }
                break;
                default:
                    
            }
        }
    },
}

export const getters = {

}