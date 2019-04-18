<template>
    <div class="page has-navbar" v-nav="navObj">
        <div class="page-content">
            <von-header theme="assertive" style="position: fixed; z-index: 9999;">
                <button class="button button-icon ion-ios-arrow-back" slot="left" @click="goBack"></button>
                <span slot="title" class="header-title">{{title}}</span>
            </von-header>

            <div class="content">
                <!--<video src="" id="video" controls></video>-->
                <iframe id="iframe" allowfullscreen="true" :src="iframeSrc" frameborder="0"></iframe>
                <div id="controls">
                    <button v-if="prev" class="button button-small button-positive" @click="videoControl('prev')">上一集</button>
                    <button v-else class="button button-small button-royal">上一集</button>
                    <button class="button button-small button-positive" @click="videoControl('fullscreen')">
                        <span v-if="isFullScreen">竖屏</span>
                        <span v-else>横屏</span>
                    </button>
                    <button v-if="next" class="button button-small button-positive" @click="videoControl('next')">下一集</button>
                    <button v-else class="button button-small button-royal">下一集</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import hls from 'hls.js';
    export default {
        data() {
            return {
                navObj: {
                    showMenuButton: true,
                    hideNavbar: true
                },
                title: '',
                // videoSrc: '',
                iframeSrc: '',
                // player: new hls(),
                isFullScreen: false,
                prev: '',
                next: ''
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            loadPage(link) {
                $loading.show('加载中...');
                axios.get('/worm/getVideoDetail', {params: {link, id: this.$route.query.id}}).then(res => {
                    this.iframeSrc = res.data.link;
                    this.title = res.data.title;
                    this.prev = res.data.prev;
                    this.next = res.data.next;
                    $loading.hide();
                });
            },
            videoControl(type) {
                var iframe = document.getElementById('iframe');
                switch (type) {
                    case 'fullscreen':
                        //  portrait: 竖屏, landscape: 横屏
                        if( this.isFullScreen ) {
                            plus.screen.lockOrientation("portrait");
                        } else {
                            plus.screen.lockOrientation("landscape");
                            iframe.requestFullscreen();
                        }
                        this.isFullScreen = !this.isFullScreen;
                        break
                    case 'prev':
                        this.loadPage(this.prev);
                        break
                    case 'next':
                        this.loadPage(this.next);
                        break

                }
            }
        },
        mounted() {
            // var video = document.getElementById('video');
            this.loadPage(this.$route.query.link);
        },
        beforeDestroy() {
            // this.player.detachMedia();
            // this.player.destroy();
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
    #video,#controls,#iframe{
        width: 100%;
        height: 100%;
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
