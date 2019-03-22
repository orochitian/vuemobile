import routes from './router'

axios.defaults.baseURL = 'http://localhost';
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

Vue.use(Vonic.app, {
    routes: routes
});

// axios.interceptors.response.use( res => {
//     if( res.data.code === 401 ) {
//         new VueRouter({routes}).push('/login');
//     }
//     return res;
// }, error => {
//     return Promise.reject(error);
// });
