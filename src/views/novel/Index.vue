<template>
    <div class="page has-navbar">
        <div class="page-content">
            <transition name="fade-slide">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
    .fade-slide-enter{
        transform: translateX(0);
    }
    .fade-slide-enter-active{
        transition: all .6s ease-in-out;
        transform: translateX(100vw);
        opacity: 0;
    }
    .fade-slide-enter-to{
        opacity: 1;
        transform: translateX(0);
    }
    .fade-slide-leave-active{
        transition: all .6s ease-in-out;
        transform: translateX(100vw);
    }
    .accordion-content{
        padding-right: 15px;
        p{
            margin-top: 10px;
        }
    }
    .novel-list{
        padding: 0 6px;
    }
    .novel-item{
        padding: 6px;
        .title{
            text-align: left;
            margin-bottom: 0;
            font-size: 12px;
        }
        img{
            max-width: 100%;
            border-radius: 3px;
        }
    }
    .hairline-top,.hairline-bottom,.hairline-left,.hairline-right{
        display: none;
    }
</style>
