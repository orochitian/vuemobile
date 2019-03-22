<template>
    <div>
        <div class="item item-divider" style="padding-bottom: 0 !important; min-height: 0;">今日热门：</div>
        <cells class="novel-list" :items="entrances(hotList)" :on-cell-click="readOnline(hotList)" :col="4"></cells>

        <div class="item item-divider" style="">新书精品榜：</div>

        <div class="item" v-for="(li, i, k) in newList" :key="k" @click="readNewList(li)">
                <span :class="{top: i<3}">
                    {{i+1}}、{{li.title}}
                </span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabIndex: 0,
                hotList: [],
                newList: []
            }
        },
        methods: {
            readNewList(li) {
                this.$router.push({
                    path: '/novel/menu',
                    query: {
                        id: li.link.replace(/\//g, ''),
                        from: this.$route.fullPath
                    }
                });
            },
            entrances(list) {
                if( list.length < 1 ) {
                    return [];
                }
                var entries = [];
                list.forEach((item, i) => {
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
            },
            readOnline(list) {
                return function (index) {
                    this.$router.push({
                        path: '/novel/menu',
                        query: {
                            id: list[index].link.replace(/\//g, ''),
                            from: this.$route.fullPath
                        }
                    });
                }
            },
            loadPage() {
                $loading.show('加载中...');
                if( this.tabIndex === 0 ) {
                    axios.get('/worm/getNovelIndex').then(res => {
                        this.hotList = res.data.hots;
                        this.newList = res.data.news;
                        $loading.hide();
                    });
                }
            }
        },
        mounted() {
            this.loadPage()
        }
    }
</script>

<style lang="scss">
    .tabs{
        position: fixed;
    }
    .top{
        color: #ea5a49;
    }
</style>
