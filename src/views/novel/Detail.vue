<template>
    <div class="page has-navbar" v-nav="navObj">
        <div class="page-content">
            <von-header theme="assertive" style="position: fixed; z-index: 9999;">
                <button class="button button-icon ion-ios-arrow-back" slot="left" @click="goBack"></button>
                <span slot="title" class="header-title">{{pageInfo.title}}</span>
            </von-header>

            <div class="novel-menu">
                <div class="content">
                    <div v-html="pageInfo.content"></div>
                    <div class="page-list">
                        <md-button class="button button-positive button-fab page-btn" @click.native="changePage(pageInfo.prevLink)">
                            <i class="icon ion-android-arrow-back"></i>
                        </md-button>
                        <md-button class="button button-energized button-fab page-btn" @click.native="changePage('')">
                            <i class="icon ion-home"></i>
                        </md-button>
                        <md-button class="button button-positive button-fab page-btn" @click.native="changePage(pageInfo.nextLink)">
                            <i class="icon ion-android-arrow-forward"></i>
                        </md-button>
                    </div>
                </div>
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
                    hideNavbar: true
                },
                pageInfo: {}
            }
        },
        watch: {
            '$route'() {
                this.loadPage();
            }
        },
        methods: {
            goBack() {
                this.$router.push(this.$route.query.from);
            },
            loadPage() {
                $loading.show('加载中...');
                axios.get('/worm/getNovelDetail', {params: this.$route.query}).then(res => {
                    this.pageInfo = res.data;
                    $loading.hide();
                    Vonic.app.pageContentScrollTop(0);
                });
            },
            changePage(link) {
                if( !link ) {
                    this.$router.push({
                        path: '/novel/menu',
                        query: {
                            id: this.$route.query.id
                        }
                    });
                    return;
                }
                if( link.indexOf('readend.html') !== -1 ) {
                    alert('这本小说已经读完了');
                    this.changePage('');
                    return;
                }
                this.$router.push({
                    query: {
                        link,
                        id: this.$route.query.id,
                        from: this.$route.query.from
                    }
                });
            }
        },
        mounted() {
            console.log(this.$route.query);
            this.loadPage();
        }
    }
</script>

<style lang="scss">
    .novel-menu{
        position: relative;
        min-height: 200px;
        .title{
            cursor: pointer;
            transition: .3s;
            display: inline-block;
            &:hover{
                color: #41b883;
                transform: scale(1.2);
            }
        }
    }
    .header-title{
        padding: 0 35px;
        white-space: pre-wrap;
        font-size: 16px;
    }
    .content{
        width: 100%;
        height: 100%;
        color: #ddd;
        padding: 30px 15px;
        background: #2d3a4b;
        overflow: hidden;
        font-size: 16px;
    }
    .page-list{
        text-align: center;
        padding: 20px 0 50px 0;
        .page-btn{
            margin: 0 20px;
        }
    }
</style>
