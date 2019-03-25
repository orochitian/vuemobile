<template>
    <div class="page">
        <div class="page-content padding-top">

            <!-- type: text, password, email, tel -->
            <div class="item item-divider">
                用户登录: {{username}}
            </div>
            <von-input type="text" v-model="username" placeholder="用户名" label="用户名"></von-input>
            <von-input type="password" v-model="password" placeholder="密码" label="密码" style="margin-bottom: 5px;"></von-input>

            <div class="padding">
                <button class="button button-positive button-block" @click="loginHandle">确认</button>
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

<style scoped>

</style>
