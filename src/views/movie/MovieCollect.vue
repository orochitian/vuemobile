<template>
    <div class="page has-navbar">
        <div class="page-content">
            <von-header theme="assertive" style="position: fixed; z-index: 9999;">
                <button class="button button-icon ion-ios-arrow-back" slot="left" @click="goBack"></button>
                <span slot="title">收藏的电影</span>
            </von-header>
            <div class="item item-divider" style="">收藏的电影：</div>

            <div class="item"
                 v-for="(li, i, k) in collectList"
                 :key="k"
                 @click="toNovelMenu(li.link)">
                <i style="font-size: 12px;">{{i+1}}、</i>
                <span style="font-size: 12px;">{{li.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                collectList: []
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
            toNovelMenu(link) {
                this.$router.push({
                    path: '/movie/menu',
                    query: {
                        link,
                        from: this.$route.fullPath
                    }
                });
            },
            loadPage() {
                $loading.show('加载中...');
                axios.get('/video/getAllCollect').then(res => {
                    this.collectList = res.data;
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
