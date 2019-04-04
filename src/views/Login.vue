<template>
    <div class="page">
        <div class="page-content padding-top">
            <von-header theme="assertive">
                <span slot="title">用户登录</span>
            </von-header>
            <div style="text-align: center; padding: 30px 0;">
                <img src="/logo.png" alt="" style="border-radius: 50%;">
            </div>
            <div class="von-input-wrapper login-input">
                <label class="item item-borderless item-input von-input">
                    <div class="hairline-top"></div>
                    <span class="input-label">用户名：</span> <input type="text" v-model="username" placeholder="请输入您的用户名">
                    <div class="hairline-bottom"></div>
                </label>
                <span class="input-clear active" @click="username = ''"></span>
            </div>
            <div class="von-input-wrapper login-input">
                <label class="item item-borderless item-input von-input">
                    <div class="hairline-top"></div>
                    <span class="input-label">密码：</span> <input type="password" v-model="password" placeholder="请输入您的密码">
                    <div class="hairline-bottom"></div>
                </label>
                <span class="input-clear active" @click="password = ''"></span>
            </div>

            <div class="padding">
                <button class="button button-positive button-block" @click="loginHandle">登录</button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            loginHandle() {
                if( !this.username || !this.password ) {
                    $dialog.alert({
                        // 效果
                        effect: 'default',
                        // 标题
                        title: '提示',
                        // 内容
                        content: '请输入用户名或密码',
                        // 按钮文本
                        okText: '确定',
                        // 按钮主题
                        okTheme: 'assertive'
                    });
                    return;
                }
                axios.post('/login', {username: this.username, password: this.password}).then(res => {
                    if( res.data ) {
                        this.$router.push('/');
                    } else {
                        $dialog.alert({
                            effect: 'default',
                            title: '提示',
                            content: '用户名或密码错误',
                            okText: '确定',
                            okTheme: 'assertive'
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .page{
        .page-content{
            background-color: #2d3a4b;
        }
    }
    .item.item-divider{
        background: none;
    }
    .login-input{
        border: 1px solid hsla(0,0%,100%,.1);
        background: rgba(0,0,0,.1);
        border-radius: 5px;
        margin: 20px 10px;
        label{
            background: none;
            input{
                background: none;
                color: #eee;
            }
        }
        .input-label{
            color: #999;
        }
    }
</style>
