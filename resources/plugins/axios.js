export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.auth.auth_token) {
      config.headers.common['Authorization'] = `Bearer ${store.state.auth.auth_token}`;
    }
  })
  $axios.onResponse((response) => {
    return response
  },
  (error) => {
    return Promise.reject(error);
  })
}