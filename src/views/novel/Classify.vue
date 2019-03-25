<template>
    <div class="page has-navbar" v-nav="navObj">
        <div class="page-content">
            <von-header theme="assertive" style="position: fixed; z-index: 9999;">
                <button class="button button-icon ion-home" slot="left" @click="$router.push('/')"></button>
                <span slot="title">小说</span>
                <button class="button button-icon" slot="right" @click="$router.push('/novel/history')">历史记录</button>
            </von-header>

            <search v-model.trim="title" placeholder="小说名/作者" :on-search="onSearch" :on-cancel="onCancel" cancelText="取消"></search>
            <transition name="fade-slide">
                <router-view></router-view>
            </transition>
            <div style="margin-bottom: 60px;"></div>
            <tabs :tab-items="tabs" :tab-index="tabIndex" bgColor="dark" tabColor="light" :on-tab-click="changeClassify" position="bottom"></tabs>

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
                tabIndex: 0,
                tabs: ['首页', '男生', '女生', '完本', '排行榜'],
                tabsLink: ['', '/type/nan_0_0_allvisit_1.html', '/type/nv_0_0_allvisit_1.html', '/type/0_0_2_allvisit_1.html', '/top.html"'],
                title: ''
            }
        },
        methods: {
            changeClassify(i) {
                if( i === this.tabIndex ) return;
                if( i === 0 ) {
                    this.$router.push({path: '/novel', query: {tabIndex: i}});
                } else if( i === 1 || i === 2 || i === 3 ) {
                    this.$router.push({
                        path: '/novel/classifylist',
                        query: {link: this.tabsLink[i], tabIndex: i}
                    });
                } else if( i === 4 ) {
                    $toast.show('没做好呢', 3000);
                    return;
                    this.$router.push({path: '/novel/toplist', query: {tabIndex: i}});
                }
                this.tabIndex = i;
            },
            onSearch() {
                this.$router.push({
                    path: '/novel/searchresult',
                    query: {
                        title: this.title,
                        pageNum: 1,
                        from: this.$route.fullPath
                    }
                });
            },
            onCancel() {
                this.title = '';
            }
        },
        mounted() {
            if( this.$route.query.tabIndex ) {
                this.tabIndex = this.$route.query.tabIndex;
            }
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
