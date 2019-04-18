<template>
    <div class="page has-navbar" v-tabbar="tabbarObj" v-tabbar-menu-index="3">
        <div class="page-content">
            <div class="card">
                <div>
                    <img src="/logo.png" alt="" class="user-icon">
                    <span class="username">用户名： {{pageInfo.username}}</span>
                </div>
            </div>
            <div class="item item-divider novel-desc-title">小说：</div>
            <item class="item-icon-left" @click.native="toNovelHistory">
                <i class="icon ion-android-bookmark" style="color: #f17c67;"></i>
                读过的小说
            </item>
            <br>
            <item class="item-icon-left" @click.native="toNovelCollect">
                <i class="icon ion-heart" style="color: #f17c67;"></i>
                收藏的小说
            </item>
            <br>
            <div class="item item-divider novel-desc-title">电影：</div>

            <item class="item-icon-left" @click.native="toVideoHistory">
                <i class="icon ion-android-bookmark" style="color: #f17c67;"></i>
                看过的电影
            </item>
            <br>
            <item class="item-icon-left" @click.native="toVideoCollect">
                <i class="icon ion-heart" style="color: #f17c67;"></i>
                收藏的电影
            </item>
            <br>
            <md-button class="button button-assertive button-block" @click.native="logout">
                <i class="icon ion-android-exit" style="margin-right: 10px;"></i>
                退出登录
            </md-button>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabbarObj: {
                    menus: [
                        {
                            iconOn: 'ion-ios-home',
                            iconOff: 'ion-ios-home-outline',
                            text: '首页',
                            path: '/'
                        },
                        {
                            iconOn: 'ion-ios-book',
                            iconOff: 'ion-ios-book-outline',
                            text: '小说',
                            path: '/novel'
                        },
                        {
                            iconOn: 'ion-ios-videocam',
                            iconOff: 'ion-ios-videocam-outline',
                            text: '电影',
                            path: '/movie'
                        },
                        {
                            iconOn: 'ion-ios-person',
                            iconOff: 'ion-ios-person-outline',
                            text: '我的',
                            path: '/user'
                        }
                    ]
                },
                pageInfo: {}
            }
        },
        methods: {
            loadPage() {
                $loading.show('加载中...');
                axios.get('/user/detail').then(res => {
                    this.pageInfo = res.data;
                    $loading.hide();
                });
            },
            toNovelHistory() {
                $router.push({
                    path: '/novel/history',
                    query: {from: this.$route.fullPath}
                });
            },
            toNovelCollect() {
                $router.push({
                    path: '/novel/collect',
                    query: {from: this.$route.fullPath}
                });
            },
            toVideoHistory() {
                $router.push({
                    path: '/video/history',
                    query: {from: this.$route.fullPath}
                });
            },
            toVideoCollect() {
                $router.push({
                    path: '/video/collect',
                    query: {from: this.$route.fullPath}
                });
            },
            logout() {
                var popup = $popup.fromTemplate('你确定要退出当前账号吗？', {
                    effect: 'scale',
                    buttons: [
                        {text: '确定'},
                        {text: '取消'},
                    ]
                });
                popup.show().then(buttonIndex => {
                    if( buttonIndex === 0 ) {
                        axios.get('/logout').then(res => {
                            this.$router.push('/login');
                        });
                    }
                });

            }
        },
        mounted() {
            this.loadPage();
        },
        beforeDestroy() {
            $tabbar.$emit('hideTabbar');
        }
    }
</script>

<style scoped lang="scss">
    .page.has-navbar .page-content{
        padding-top: 0;
    }
    .card{
        background-color: #fff9e6;
        padding: 20px;
        border-radius: 8px;
        /*box-shadow: none;*/
        /*border: 1px solid #ffd77a;*/
    }
    .user-icon{
        width: 40px;
        height: 40px;
        vertical-align: middle;
        border-radius: 50%;
        box-shadow: 0 0 10px 2px green;
    }
    .username{
        margin-left: 20px;
    }
</style>
