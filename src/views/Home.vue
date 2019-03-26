<template>
    <div class="page has-navbar" v-nav="navObj" v-tabbar="tabbarObj" v-tabbar-menu-index="0">
        <div class="page-content">
            <von-header theme="assertive">
                <span slot="title">首页</span>
                <button class="button button-icon ion-navicon" slot="right"></button>
            </von-header>

            <iframe width="100%" height="93%" src="//player.bilibili.com/player.html?aid=26398471&cid=45360581&page=1"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navObj: {
                    showMenuButton: true,
                    hideNavbar: true,
                    onMenuButtonClick: () => {
                        console.log('onMenuButtonClick事件触发');
                    }
                },
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
                }
            }
        },
        mounted() {

        },
        beforeDestroy() {
            $tabbar.$emit('hideTabbar');
        }
    }
</script>
