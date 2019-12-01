<template>
  <div class="register">
    <top-header></top-header>
    <div class="register-div" :style="winHeight">
      <div class="register-title">
        <p>映盛中国</p>
        <p>供应商管理系统</p>
      </div>
      <div class="register-box">
        <div class="register-input">
          <div>注册</div>
          <el-form ref="form" :model="form">
            <!-- <el-form-item>
              <el-input autocomplete="off" clearable v-model="form.jobnumber1" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input autocomplete="off" clearable show-password v-model="form.jobnumber2" placeholder="6 - 16位密码，区分大小写"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input autocomplete="off" clearable show-password v-model="form.jobnumber3" placeholder="确认密码"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-input
                autocomplete="off"
                clearable
                v-model="form.jobnumber"
                placeholder="11位手机号"
              >
              <template slot="prepend">+ 86</template>
              </el-input>
            </el-form-item>
            <el-form-item class="verification">
              <el-input
                autocomplete="off"
                type="verification"
                v-model="form.password"
                placeholder="输入验证码"
              ></el-input>
            </el-form-item>
            <el-button plain class="getv">获取验证码</el-button>
            <!-- 选择账号类型 start -->
            <div style="width: 100%;height: 36px;">
              <el-radio v-model="type" label="1">公司</el-radio>
              <el-radio v-model="type" label="0">个人</el-radio>
            </div>
            <!-- 选择账号类型 end -->
            <el-form-item class="register_but">
              <el-button type="primary" @click="submitForm('form')">注册</el-button>
            </el-form-item>
            <el-link href="login" type="primary" class="to_login">使用已有账户登录</el-link>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import topHeader from '../header.vue'
export default {
  name: 'register',
  components: {
    topHeader
  },
  data() {
    return {
      form: {
        //username: '', //姓名
        jobnumber: '', //工号
        password: '', //密码
        remember: false //是否记住密码
      },
      loginState: true, // 避免多次点击
      winHeight: '',
      type: '1'
    }
  },
  methods: {
    // get(){
    //   console.log(this.radio)
    // },
    orderHight() {
      var winHeight = window.innerHeight - 86
      this.winHeight = 'height:' + winHeight + 'px;'
      // console.log(winHeight)
    },
    submitForm(formName) {
      if (!this.loginState) return
      this.loginState = false

      if (
        //this.form.username === '' ||
        this.form.jobnumber === '' ||
        this.form.password === ''
      ) {
        this.$alert('请将信息填写完整！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
        return false
      } else {
        //登录
        this.loginFn()
      }
    },
    loginFn() {
      let params = new URLSearchParams()
      //params.append('username', this.form.username)
      params.append('number', this.form.jobnumber)
      params.append('password', this.form.password)
      params.append('remember', this.form.remember ? 'yes' : 'no')
      this.$axios
        .post('/api/index.php?mod=login&ac=login', params)
        .then(this.loginSuccess)
    },
    loginSuccess(res) {
      //艾辉
      //6000020
      this.loginState = true
      if (res.data.result) {
        let userInfo = {
          //username: this.form.username,
          number: this.form.jobnumber,
          password: this.form.password,
          remember: this.form.remember ? 'yes' : 'no'
        }
        //每次登陆后就设置 isLogin
        window.sessionStorage.setItem('isLogin', 'success')

        this.$store.commit('login', userInfo)
        this.$router.push({ path: '/home' })
      } else {
        this.$alert('您输入的信息有误请重新输入！', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      }
    },
    getlocalStorage() {
      //设置记住密码的默认状态
      try {
        let remember = localStorage.getItem('remember') === 'yes' ? true : false

        if (remember) {
          //this.form.username = localStorage.getItem('username')
          this.form.jobnumber = localStorage.getItem('jobnumber')
          this.form.password = localStorage.getItem('password')
          this.form.remember = true
        } else {
          // console.log('无数据')
          // this.form.username = ''; //姓名
          // this.form.jobnumber = ''; //工号
          // this.form.password = '',  //密码
          // this.form.remember = false;  //是否记住密码
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.getlocalStorage(), this.orderHight()
  }
}
</script>
<style scoped>
/* .login {
} */
.register .el-form-item {
  margin-bottom: 24px;
  width: 100%;
}
.register .el-button {
  width: 100%;
}
.register-div {
  background: url('../../assets/images/login_bg.png') center top no-repeat;
  background-size: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.register-title {
  width: 36%;
  font-size: 40px;
  color: #fff;
  text-align: center;
  font-family: '微软雅黑';
}
.register-title p:nth-of-type(1) {
  color: #555555;
  font-weight: 700;
  font-size: 36px;
}
.register-title p:nth-of-type(2) {
  color: rgba(0, 0, 0, 0.42);
}
.register-box {
  width: 50%;
}
.register-input {
  width: 360px;
  margin: auto;
  padding-top: 40px;
}
.register-input .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.register-input .verification {
  width: 60%;
}
.register-input .getv {
  width: 36%;
  height: 40px;
}
.register-input .remember {
  width: 50%;
}
.register-input .to_login {
  height: 40px;
}
.register .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.register .el-checkbox__inner::after {
  height: 10px;
  left: 7px;
  top: 3px;
}
.register-input .register_but{
  width: 169px;
}
</style>
