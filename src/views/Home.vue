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
            <!--https://api.sigujx.com/?url=https://v.youku.com/v_show/id_XNDA3MzgwMzQ3Ng==.html?spm=a2h0k.11417342.soresults.dplaybutton&lang=%E8%8B%B1%E8%AF%AD-->
            <!--<iframe src="https://www.baidu.com" width="100%" height="30%" frameborder="0"></iframe>-->

            <iframe width="100%" height="73%" allowfullscreen="true" :src="iframeSrc" frameborder="0"></iframe>

            <div class="von-input-wrapper login-input">
                <label class="item item-borderless item-input von-input">
                    <div class="hairline-top"></div>
                    <span class="input-label">视频地址：</span> <input type="text" v-model.trim="videoSrc" placeholder="直接粘贴视频地址">
                    <div class="hairline-bottom"></div>
                </label>
                <span class="input-clear active" @click="videoSrc = ''"></span>
            </div>
            <button class="button button-positive button-block" @click="play">破解视频</button>
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
                },
                videoSrc: '',
                iframeSrc: ''
            }
        },
        methods: {
            play() {
                if( !this.videoSrc ) {
                    $dialog.alert({
                        // 效果
                        effect: 'default',
                        // 标题
                        title: '提示',
                        // 内容
                        content: '把你能的，空地址都破解呢！',
                        // 按钮文本
                        okText: '我错了',
                        // 按钮主题
                        okTheme: 'assertive'
                    });
                    return;
                };
                this.iframeSrc = 'http://jx.arpps.com/pps/pps.php?url=' + this.videoSrc;
            }
        },
        mounted() {
            //https://media001.geekbang.org/8ddb9b3ad2b745629d6a04d9c79d39a8/01cf7257583a4f6f841d980f23b8c902-4ba255f2ffc038d7db93d202b74dc719-sd.m3u8
            //https://media001.geekbang.org/f0b334e7d55e4e4882616576c2fdda94/e8daea29c8be4e57ace17bb8868bfd39-421658fcd6e62f332e11b93fc1f79bcb-sd.m3u8

            // var huiid = "https://baidu.com-l-baidu.com/20190223/12251_22104181/index.m3u8";
            // var huiid = "https://media001.geekbang.org/8ddb9b3ad2b745629d6a04d9c79d39a8/01cf7257583a4f6f841d980f23b8c902-dd0080d36e595db81a3b8d966f83883b-hd.m3u8";
            // if(Hls.isSupported()) {
            //     var video = document.getElementById('video');
            //     var hls = new Hls();
            //     hls.loadSource(huiid);
            //     hls.attachMedia(video);
            //     hls.on(Hls.Events.MANIFEST_PARSED,function() {
            //         // video.play();
            //     });
            // }
        },
        beforeDestroy() {
            $tabbar.$emit('hideTabbar');
        }
    }
</script>
