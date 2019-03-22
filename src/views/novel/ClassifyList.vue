<template>
    <div>
        <cells class="novel-list" :items="entrances" :on-cell-click="readOnline" :col="4" :row="10"></cells>

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
            loadPage() {
                $loading.show('加载中...');
                axios.get('/worm/getNovelClassifyList', {params: {link: this.$route.query.link}}).then(res => {
                    if( this.$route.query.pageNum !== 1 && res.data.list.length < 1 ) {
                        $toast.show('小说来源网站有BUG，没有这一页，what can i do...', 3000);
                        return;
                    };
                    this.list = res.data.list;
                    this.pages = res.data.pages;
                    this.pageStatus = res.data.total;
                    Vonic.app.pageContentScrollTop(0);
                    $loading.hide();
                });
            },
            readOnline(index) {
                this.$router.push({
                    path: '/novel/menu',
                    query: {
                        id: this.list[index].id,
                        from: this.$route.fullPath
                    }
                });
            },
            changePage(link) {
                this.$router.push({query: {link, tabIndex: this.$route.query.tabIndex}})
            }
        },
        mounted() {
            this.loadPage();
        }
    }
</script>

<style lang="scss" scoped>
    #page{
        text-align: center;
        .page-btn{
            margin: 10px;
        }
    }
</style>
