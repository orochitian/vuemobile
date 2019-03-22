<template>
    <div class="page" v-tabbar="tabbarObj">
        <transition name="fade-slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabbarObj: {
                    menus: [
                        {
                            iconOn: 'ion-ios-home',
                            iconOff: 'ion-ios-home-outline',
                            text: '首页',
                            path: '/'
                        },
                        {
                            iconOn: 'ion-ios-book',
                            iconOff: 'ion-ios-book-outline',
                            text: '小说',
                            path: '/novel'
                        },
                        {
                            iconOn: 'ion-ios-videocam',
                            iconOff: 'ion-ios-videocam-outline',
                            text: '电影',
                            path: '/movie'
                        },
                        {
                            iconOn: 'ion-ios-person',
                            iconOff: 'ion-ios-person-outline',
                            text: '我的',
                            path: '/user'
                        }
                    ]
                }
            }
        }
    }
</script>

<style lang="scss">
    /*.fade-slide-enter{*/
        /*transform: scale(1);*/
    /*}*/
    /*.fade-slide-enter-active{*/
        /*transition: all .6s ease-in-out;*/
        /*transform: scale(.1);*/
        /*opacity: 0;*/
    /*}*/
    /*.fade-slide-enter-to{*/
        /*opacity: 1;*/
        /*transform: scale(1);*/
    /*}*/
    /*.fade-slide-leave-active{*/
        /*transition: all .6s ease-in-out;*/
        /*transform: scale(.1);*/
    /*}*/
</style>
