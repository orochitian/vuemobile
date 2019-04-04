<template>
    <div class="page has-navbar" v-nav="navObj" v-tabbar="tabbarObj" v-tabbar-menu-index="0">
        <div class="page-content">
            <von-header theme="assertive">
                <span slot="title">首页</span>
                <button class="button button-icon ion-navicon" slot="right"></button>
            </von-header>

            <!-- http://www.kuyun5.com/ -->
            <!-- https://kuyun.tv/ -->

            <!--<iframe src="https://kuyun.tv/" width="100%" height="93%" style="overflow-y: scroll;"></iframe>-->
            <!--<iframe width="100%" height="93%" src="//player.bilibili.com/player.html?aid=26398471&cid=45360581&page=1"></iframe>-->
            <video id="video" width="100%" height="50%" controls></video>
        </div>
    </div>
</template>

<script>
    import Hls from 'hls.js';
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
            var huiid = "https://baidu.com-l-baidu.com/20190223/12251_22104181/index.m3u8";
            if(Hls.isSupported()) {
                var video = document.getElementById('video');
                var hls = new Hls();
                hls.loadSource(huiid);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                    // video.play();
                });
            }
        },
        beforeDestroy() {
            $tabbar.$emit('hideTabbar');
        }
    }
</script>
