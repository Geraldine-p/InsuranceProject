<template>
    <div>
        <div class="login">
            <div class="login_content">
                <div class="title">
                    <h1>Login</h1>
                </div>
                <div class="login_form">
                    <el-form :model="userinfo" :rules="rules" ref="LoginForm" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input type="text" v-model="userinfo.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" autocomplete="off" v-model="userinfo.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="Login" type="primary">登录</el-button>
                            <el-button @click="Register">注册</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from "@/router";

export default {
    data() {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                // 用户只能输入数字和字母
                let reg = /^[0-9a-zA-Z]*$/g;
                if (this.userinfo.password !== '') {
                    this.$refs.LoginForm.validateField('checkPass');
                }
                if (!reg.test(value)) {
                    callback(new Error('密码只能由数字和字母组成'));
                }
                callback();
            }
        };
        let validateUserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                let reg = /^[0-9a-zA-Z]*$/g;
                if (!reg.test(value)) {
                    callback(new Error('用户名只能由数字和字母组成'));
                }
                if (this.userinfo.password !== '') {
                    this.$refs.LoginForm.validateField('checkPass');
                }
                callback();
            }
        }
        return {
            userinfo: {
                username: "",
                password: ""
            },
            rules: {
                username: [{validator: validateUserName, trigger: 'blur', min: 3, max: 18}],
                password: [{validator: validatePass, trigger: 'blur', min: 6, max: 10}]
            }


        }
    },
    methods: {
        
        Login() {
            this.$refs.LoginForm.validate((valid) => {
                if (valid) {
                    // 把参数转为json
                    let params = JSON.stringify(this.userinfo);

                    axios.post('http://vaala.cloud:9046/user/login',
                        params
                    ).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            sessionStorage.setItem('authorization', res.data.data.authorization);
                            this.$router.push('/Main')
                        }
                        if (res.data.code === 500) {
                            this.$message({
                                message: '没有查询到用户',
                                type: 'error'
                            });
                            router.push('/register');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        Register() {
            this.$router.push('/register');
        }
    },
}
</script>
<style scoped lang="scss">


.login {
  border: 1px solid #000;
  height: 99.8vh;
  background-color: #1685a9;
  display: flex;
  justify-content: center;
  align-items: center;

  .login_content {
    width: 350px;
    height: 350px;
    background-color: #fff;
    border-radius: 20px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      margin: 20px 0;
      text-align: center;
    }

    .login_form {
      margin: 20px 0;
    }
  }
}
</style>
