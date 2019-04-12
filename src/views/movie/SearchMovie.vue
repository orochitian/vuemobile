<template>
    <div class="page has-navbar" v-nav="navObj">
        <div class="page-content">
            <von-header theme="assertive" style="position: fixed; z-index: 9999;">
                <button class="button button-icon ion-home" slot="left" @click="$router.push('/'); search.title = ''"></button>
                <span slot="title">电影</span>
            </von-header>
            <search v-model.trim="search.title" placeholder="电影名" :on-search="onSearch" :on-cancel="onCancel" cancelText="取消"></search>

            <div class="item item-divider" v-if="pageInfo.list.length > 0">
                搜索结果： 共搜索到 <b class="assertive">{{this.pageInfo.state}}</b> 条数据
            </div>

            <item v-for="(li, i, k) in pageInfo.list" :key="k" @click.native="readOnline(li.link)">{{li.title}}</item>

            <div id="page" v-if="pageInfo.pages.length > 0">
                <md-button class="button button-light page-btn button-small"
                           :class="{'button-positive': page.active}"
                           v-for="(page, index, key) in pageInfo.pages"
                           :key="key"
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
                search: {
                    title: '',
                    page: ''
                },
                pageInfo: {
                    list: [],
                    pages: []
                }
            }
        },
        watch: {
            '$route'() {
                this.loadPage();
            }
        },
        computed: {
            entrances() {
                if( this.pageInfo.list.length < 1 ) {
                    return [];
                }
                var entries = [];
                this.pageInfo.list.forEach((item, i) => {
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
            loadPage() {
                $loading.show('加载中...');
                axios.get('/worm/searchVideo', {params: this.$route.query}).then(res => {
                    this.pageInfo = res.data;
                    $loading.hide();
                });
            },
            onSearch() {
                this.search.page = '';
                if( this.search.title && this.search.title.length > 0 ) {
                    this.$router.push({
                        path: this.$route.path,
                        query: {search: JSON.stringify(this.search)}
                    });
                } else {
                    this.$router.push({
                        path: this.$route.path
                    });
                }
            },
            onCancel() {
                this.search.title = '';
            },
            readOnline(link) {
                this.$router.push({
                    path: '/movie/menu',
                    query: {link, from: this.$route.fullPath}
                });
            },
            changePage(link) {
                if( !/^\/vod/.test(link) ) return;
                if( !link ) return;
                this.search.page = link;
                this.$router.push({
                    path: this.$route.path,
                    query: {search: JSON.stringify(this.search)}
                });
            }
        },
        mounted() {
            if( this.$route.query.search ) {
                this.search = JSON.parse(this.$route.query.search);
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
