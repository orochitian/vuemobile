<template>
    <div class="page has-navbar" v-nav="navObj">
        <div class="page-content">
            <von-header theme="assertive" style="position: fixed; z-index: 9999;">
                <button class="button button-icon ion-ios-arrow-back" slot="left" @click="goBack"></button>
                <span slot="title" class="header-title">{{$route.query.title}}</span>
            </von-header>

            <div class="content">
                <video src="" id="video" controls></video>
                <div id="controls">
                    <button class="button button-small button-positive" @click="videoControl('prev')">快退10秒</button>
                    <button class="button button-small button-assertive" @click="videoControl('play')">播放</button>
                    <button class="button button-small button-royal" @click="videoControl('pause')">暂停</button>
                    <button class="button button-small button-positive" @click="videoControl('next')">快进10秒</button>
                    <button class="button button-small button-positive" @click="videoControl('fullscreen')">快进10秒</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import hls from 'hls.js';
    export default {
        data() {
            return {
                navObj: {
                    showMenuButton: true,
                    hideNavbar: true
                },
                videoSrc: '',
                player: new hls(),
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            videoControl(type) {
                var video = document.getElementById('video');
                switch (type) {
                    case 'prev':
                        video.currentTime -= 10;
                        break
                    case 'next':
                        video.currentTime += 10;
                        break
                    case 'play':
                        video.play();
                        break
                    case 'pause':
                        video.pause();
                        break
                    case 'fullscreen':
                        //  portrait: 竖屏, landscape: 横屏
                        plus.screen.lockOrientation("landscape");
                        video.requestFullscreen();
                        break
                }
            }
        },
        mounted() {
            $loading.show('加载中...');
            var video = document.getElementById('video');
            axios.get('/worm/getVideoDetail', {params: {link: this.$route.query.link}}).then(res => {
                this.videoSrc = res.data;
                $loading.hide();
                if(hls.isSupported()) {
                    this.player.loadSource(this.videoSrc);
                    this.player.attachMedia(video);
                }
            });
            video.onresize = function () {
                console.log(1);
            }
        },
        beforeDestroy() {
            // this.player.detachMedia();
            this.player.destroy();
        }
    }
</script>

<style lang="scss" scoped>
    #video{
        border: 1px solid #000;
        box-sizing: border-box;
        background: rgba(0,0,0,.8);
    }
    .content{
        position: relative;
    }
    #video,#controls{
        width: 100%;
        height: 90%;
        position: absolute;
        left: 0;
        top: 0;
    }
    #controls{
        height: auto;
        text-align: center;
        margin-top: 20px;
        button{
            margin: 0 10px;
            padding: 0 5px;
        }
        z-index: 9999;
    }
</style>
