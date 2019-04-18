<template>
    <div class="page has-navbar">
        <div class="page-content">
            <von-header theme="assertive" style="position: fixed; z-index: 9999;">
                <button class="button button-icon ion-ios-arrow-back" slot="left" @click="goBack"></button>
                <span slot="title">历史记录</span>
            </von-header>
            <div class="item item-divider" style="">历史记录：</div>

            <div class="item"
                 v-for="(li, i, k) in historyList"
                 :key="k"
                 @click="readOnline(li)">
                <i style="font-size: 12px;">{{i+1}}、</i>
                <span style="font-size: 12px;">{{li.lastChapter}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                historyList: []
            }
        },
        methods: {
            goBack() {
                if( this.$route.query.from ) {
                    this.$router.push(this.$route.query.from);
                } else {
                    this.$router.push('/user');
                }
            },
            readOnline(list) {
                this.$router.push({
                    path: '/movie/detail',
                    query: {
                        link: list.lastChapterLink,
                        id: list.id,
                        from: this.$route.fullPath
                    }
                });
            },
            loadPage() {
                $loading.show('加载中...');
                axios.get('/user/detail').then(res => {
                    this.historyList = res.data.videoHistory;
                    $loading.hide();
                });
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
