<template>
    <div class="page has-navbar" v-nav="navObj">
        <div class="page-content">
            <von-header theme="assertive" style="position: fixed; z-index: 9999;">
                <button class="button button-icon ion-ios-arrow-back" slot="left" @click="$router.push($route.query.from); title = ''"></button>
                <span slot="title">小说</span>
                <button class="button button-icon" slot="right" @click="toNovelHistory">历史记录</button>
            </von-header>

            <search v-model.trim="title" placeholder="小说名/作者" :on-search="onSearch" :on-cancel="onCancel" cancelText="取消"></search>

            <div class="item item-divider" v-if="list.length > 0" style="padding-bottom: 0 !important; min-height: 0;">
                搜索结果： {{this.pageStatus}}
            </div>

            <cells class="novel-list" :items="entrances" :on-cell-click="readOnline" :col="3"></cells>

            <div id="page" v-if="list.length > 0">
                <md-button class="button button-light page-btn button-small"
                           :class="{'button-positive': page.active}"
                           v-for="(page, i, key) in pages"
                           :key="k"
                           @click.native="changePage(page.link)">
                    {{page.text}}
                </md-button>
            </div>
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
                    }
                },
                list: [],
                pages: [],
                pageStatus: '',
                title: '',
                pageNum: 1
            }
        },
        watch: {
            '$route'() {
                this.loadPage();
            }
        },
        computed: {
            entrances() {
                if( this.list.length < 1 ) {
                    return [];
                }
                var entries = [];
                this.list.forEach((item, i) => {
                    entries.push(`
                        <div class="novel-item">
                            <div class="img">
                                <img src="${item.img}" alt="${item.title}">
                            </div>
                            <p class="title">${item.title}</p>
                        </div>
                    `);
                });
                return entries;
            }
        },
        methods: {
            toNovelHistory() {
                $router.push({
                    path: '/novel/history',
                    query: {from: this.$route.fullPath}
                });
            },
            loadPage() {
                $loading.show('加载中...');
                axios.get('/worm/searchNovel', {params: {search: {title: this.$route.query.title, pageNum: this.$route.query.pageNum}}}).then(res => {
                    if( this.$route.query.pageNum !== 1 && res.data.list.length < 1 ) {
                        $toast.show('小说来源网站有BUG，没有这一页，what can i do...', 3000);
                        return;
                    };
                    $loading.hide();
                    this.list = res.data.list;
                    this.pages = res.data.pages;
                    this.pageStatus = res.data.total;
                    Vonic.app.pageContentScrollTop(0);
                });
            },
            onSearch() {
                this.$router.push({
                    query: {
                        title: this.title,
                        pageNum: 1,
                        from: this.$route.query.from
                    }
                });
            },
            readOnline(index) {
                this.$router.push({
                    path: '/novel/menu',
                    query: {
                        id: this.list[index].link.split('id=')[1],
                        from: this.$route.fullPath
                    }
                });
            },
            changePage(link) {
                if( !/^\/search/.test(link) ) return;
                var search = link.split('/search.html?searchtype=all&searchkey=')[1].split('&page=');
                if( parseInt(search[1]) === this.$route.query.pageNum ) return;
                this.$router.push({
                    query: {
                        title: search[0],
                        pageNum: search[1],
                        from: this.$route.query.from
                    }
                });
            }
        },
        mounted() {
            if( this.$route.query.title ) {
                this.loadPage();
            }
        }
    }
</script>

<style lang="scss" scoped>
    #page{
        text-align: center;
        padding: 0px 0px 60px 0px;
        .page-btn{
            margin: 10px;
        }
    }
</style>
