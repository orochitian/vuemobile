import routes from './router'

axios.defaults.baseURL = 'http://132.232.119.153';
// axios.defaults.baseURL = 'http://localhost';
axios.defaults.withCredentials = true;

document.addEventListener("plusready", function () {
    var main = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function () {
        plus.nativeUI.confirm('你确定要退出啊？', function (ev) {
            if( ev.index === 0 ) {
                plus.webview.close(main);
            }
        }, {
            title: '提示！',
            buttons: ['退出', null, '点错了']
        });
    });
}, false);

Vue.config.productionTip = false;

Vonic.app.setConfig('beforeEach', (to, from, next) => {
    axios.options('/').then(res => {
        if( res.data.code === 401) {
            if (to.path === '/login') {
                next();
                return
            }
            next({path: '/login'});
        } else {
            next();
        }
    });
});

Vue.use(Vonic.app, {
    routes: routes
});


