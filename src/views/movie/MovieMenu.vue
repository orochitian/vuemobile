<template>
    <div class="page has-navbar" v-nav="navObj">
        <div class="page-content">
            <von-header theme="assertive" style="position: fixed; z-index: 9999;">
                <button class="button button-icon ion-ios-arrow-back" slot="left" @click="goBack"></button>
                <span slot="title">{{pageInfo.title}}</span>
            </von-header>

            <div class="cells nove-list">
                <div class="row">
                    <div class="hairline-top"></div>
                    <div class="col">
                        <div class="novel-info">
                            <span>分类： {{pageInfo.info.type}}</span>|
                            <span>地区： {{pageInfo.info.area}}</span>|
                            <span>年份： {{pageInfo.info.date}}</span>
                        </div>
                    </div>
                </div>
                <div class="hairline-bottom"></div>
            </div>

            <div class="item item-divider novel-desc-title">内容简介：</div>
            <p class="novel-desc">{{pageInfo.desc}}</p>
            <div>
                <md-button class="button button-royal button-block button-small" v-if="collect"
                           @click.native="cancelCollect">
                    <i class="icon ion-heart-broken" style="margin-right: 5px;"></i>
                    取消收藏
                </md-button>
                <md-button class="button button-assertive button-block button-small" v-else
                           @click.native="collectBook">
                    <i class="icon ion-heart" style="margin-right: 5px;"></i>
                    收藏电影
                </md-button>
            </div>
            <div class="top-list">
                <list>
                    <item>播放列表：</item>
                    <item v-for="(li, i, k) in pageInfo.list" :key="k" @click.native="readNovel(li.link)">{{li.title}}</item>
                </list>
            </div>
            <div style="margin-bottom: 60px;"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navObj: {
                    showMenuButton: true,
                    hideNavbar: true
                },
                pageInfo: {
                    title: '',
                    info: {}
                },
                collect: false,
            }
        },
        methods: {
            goBack() {
                if( this.$route.query.from ) {
                    this.$router.push(this.$route.query.from);
                } else {
                    this.$router.push('/movie');
                }
            },
            readNovel(link) {
                this.$router.push({
                    path: '/movie/detail',
                    query: {link, id: this.$route.query.link}
                });
            },
            collectBook() {
                var title = this.pageInfo.title;
                var link = this.$route.query.link;
                axios.get('/video/addCollect', {params: {title, link}}).then(res => {
                    this.collect = res.data;
                });
            },
            cancelCollect() {
                axios.get('/video/removeCollect', {params: {link: this.$route.query.link}}).then(res => {
                    this.collect = res.data;
                });
            }
        },
        mounted() {
            $loading.show('加载中...');
            axios.get('/worm/getVideoList', {params: {link: this.$route.query.link}}).then(res => {
                this.pageInfo = res.data;
                $loading.hide();
            });
            axios.get('/video/getCollect', {params: {link: this.$route.query.link}}).then(res => {
                this.collect = res.data;
            });
        }
    }
</script>

<style lang="scss" scoped>
    .novel-info{
        padding: 10px 0;
        color: #666;
        text-align: center;
        span{
            margin: 0 10px;
        }
    }
    .novel-desc-title{
        padding: 6px 16px !important;
        min-height: 0;
        font-weight: bold;
    }
    .novel-desc{
        font-size: 12px;
        color: #333;
        padding: 0 16px;
    }
</style>
