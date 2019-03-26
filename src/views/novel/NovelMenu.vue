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
                        <div class="novel-img">
                            <img :src="pageInfo.img" :alt="pageInfo.title">
                        </div>
                    </div>
                    <div class="col">
                        <div class="novel-info">
                            <h1 class="title">{{pageInfo.title}}</h1>
                            <p class="author">作者 | <span style="color: #ea5a49;">{{pageInfo.author}}</span></p>
                            <p class="last">最新章节： <br> {{pageInfo.theLast}}</p>
                            <md-button class="button button-royal button-block button-small" v-if="collect"
                                       @click.native="cancelCollect">
                                <i class="icon ion-heart-broken" style="margin-right: 5px;"></i>
                                取消收藏
                            </md-button>
                            <md-button class="button button-assertive button-block button-small" v-else
                                       @click.native="collectBook">
                                <i class="icon ion-heart" style="margin-right: 5px;"></i>
                                收藏本书
                            </md-button>
                            <md-button class="button button-positive button-block button-small"
                                       v-if="pageInfo.hasRead"
                                       @click.native="readNovel(pageInfo.hasRead)">
                                <i class="icon ion-ios-book" style="margin-right: 5px;"></i>
                                继续阅读
                            </md-button>
                            <md-button class="button button-positive button-block button-small"
                                       v-else
                                       @click.native="readNovel(pageInfo.topList[0].link)">
                                <i class="icon ion-ios-book" style="margin-right: 5px;"></i>
                                开始阅读
                            </md-button>
                        </div>
                    </div>
                </div>
                <div class="hairline-bottom"></div>
            </div>

            <div class="item item-divider novel-desc-title">内容简介：</div>
            <p class="novel-desc">{{pageInfo.desc}}</p>
            <div class="top-list">
                <item v-for="(li, i, k) in pageInfo.topList" :key="k" @click.native="readNovel(li.link)">{{li.title}}</item>
            </div>
            <div class="hidden-list">
                <md-button class="button button-positive button-block button-small" v-if="hiddenList.length < 1" @click.native="getHiddenList">点击加载隐藏章节...</md-button>
                <item v-for="(li, i, k) in hiddenList" :key="k" @click.native="readNovel(li.link)">{{li.title}}</item>
            </div>
            <div class="last-list">
                <item v-for="(li, i, k) in pageInfo.lastList" :key="k" @click.native="readNovel(li.link)">{{li.title}}</item>
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
                    img: '',
                    author: '',
                    theLast: '',
                    topList: [],
                    lastList: []
                },
                collect: false,
                hiddenList: []
            }
        },
        computed: {
            entrances() {
                return [
                    `
                    <div class="novel-img">
                        <img src="${this.pageInfo.img}" alt="">
                    </div>
                    `,
                    `
                    <div class="novel-info">
                        <h1 class="title">${this.pageInfo.title}</h1>
                        <p class="author">作者 | <span style="color: #ea5a49;">${this.pageInfo.author}</span></p>
                        <p class="last">最新章节： <br> ${this.pageInfo.theLast}</p>
                        <div @click.native="readNovel" class="md-button button button-assertive button-small button-block">开始阅读</div>
                    </div>
                    `
                ]
            }
        },
        methods: {
            goBack() {
                if( this.$route.query.from ) {
                    this.$router.push(this.$route.query.from);
                } else {
                    this.$router.push('/novel');
                }
            },
            collectBook() {
                var novelName = this.pageInfo.title;
                var novelId = this.$route.query.id;
                axios.get('/novel/addCollect', {params: {novelId, novelName}}).then(res => {
                    this.collect = res.data;
                });
            },
            cancelCollect() {
                axios.get('/novel/removeCollect', {params: {novelId: this.$route.query.id}}).then(res => {
                    this.collect = res.data;
                });
            },
            readNovel(link) {
                this.$router.push({
                    path: '/novel/detail',
                    query: {link, id: this.pageInfo.novelId, from: this.$route.fullPath}
                });
            },
            getHiddenList() {
                var params = {
                    num: this.pageInfo.ycnum,
                    id: this.pageInfo.novelId
                }
                $loading.show('加载中...');
                axios.get('/worm/getHiddenList', {params}).then(res => {
                    this.hiddenList = res.data;
                    $loading.hide();
                });
            }
        },
        mounted() {
            $loading.show('加载中...');
            axios.get('/worm/getNovelList', {params: {id: this.$route.query.id}}).then(res => {
                $loading.hide();
                this.pageInfo = res.data;
            });
            axios.get('/novel/getCollect', {params: {novelId: this.$route.query.id}}).then(res => {
                this.collect = res.data;
            });
        }
    }
</script>

<style lang="scss">
    .novel-img{
        padding: 6px;
        img{
            max-width: 100%;
            max-height: 200px;
        }
    }
    .novel-info{
        padding: 10px 10px 0 0;
        text-align: left;
        color: #999;
        .title{
            font-size: 16px;
        }
        .last{
            font-size: 12px;
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
