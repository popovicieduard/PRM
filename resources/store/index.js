export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async nuxtServerInit({ dispatch }, { req, route, store, redirect}){
        const domain = req ? req.headers.host : window.location.host;
        dispatch('auth/setDomain', domain)

        let auth_token = this.$cookies.get('x-access-token')

        if(auth_token){
            await dispatch('auth/setAuthToken', auth_token)

            await dispatch('auth/setAuthInstance')
        }

        let route_name = route.name
        
        if(route_name){
            let auth_route = route_name.substr(0, route_name.indexOf('-')) || route_name;

            switch(auth_route){
                case 'network':
                    if (!store.state.auth.auth_token || store.state.auth.auth_instance.role != 'network') {
                        return redirect({'name': 'auth-login'});
                    }
                break;
                case 'advertiser':
                    if (!store.state.auth.auth_token || store.state.auth.auth_instance.role != 'advertiser') {
                        return redirect({'name': 'auth-login'});
                    }
                break;
                case 'partner':
                    if (!store.state.auth.auth_token || store.state.auth.auth_instance.role != 'partner') {
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