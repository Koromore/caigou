<template>
  <div class="login">
    <top-header></top-header>
    <!-- <h1 class="login-title">V客联盟自媒体录入系统</h1> -->
    <div class="login-div" :style="winHeight">
      <div class="login-title">
        <p>映盛中国</p>
        <p>供应商管理系统</p>
      </div>
      <div class="login-box">
        <div class="login-input">
          <div class="title">登录/注册</div>
          <el-form ref="form" :model="form">
            <!-- <el-form-item>
              <el-input autocomplete="off" clearable v-model="form.username" placeholder="姓名"></el-input>
            </el-form-item>-->
            <!-- 手机号输入框 start -->
            <el-form-item class="phone">
              <el-input
                autocomplete="off"
                clearable
                v-model="form.phone"
                placeholder="手机号"
                prefix-icon="el-icon-mobile"
                @blur="test"
              ></el-input>
              <div class="hint"  v-if=login_but_show>您的手机号已注册请直接登陆</div>
              <div class="hint" v-if=register_but_show>您的手机号未注册请注册后登陆</div>
            </el-form-item>
            <!-- 手机号输入框 end -->

            <!-- 手机验证码输入框 start -->
            <el-form-item class="verification" v-if=smsCodeBox>
              <el-input
                autocomplete="off"
                type="verification"
                v-model="form.smsCode"
                placeholder="验证码"
                prefix-icon="el-icon-message"
              ></el-input>
            </el-form-item>
            <!-- 手机验证码输入框 end -->

            <!-- 获取手机验证码 start -->
            <el-button plain class="getv" @click="getSmsCode" v-if=smsCodeBox>
              获取验证码
            </el-button>
            <!-- 获取手机验证码 end -->

            <!-- 图片验证码输入框 start -->
            <el-form-item class="img_verification" v-if=getImgCodeBox>
              <el-input
                autocomplete="off"
                type="verification"
                v-model="form.imgCode"
                placeholder="验证码"
                prefix-icon="el-icon-message"
              ></el-input>
            </el-form-item>
            <!-- 图片验证码输入框 end -->

            <!-- 重新获取图形验证码 start -->
            <el-form-item class="get_img_code"  v-if=imgCodeShow>
              <el-button plain @click="getImgCode">
                换一张
              </el-button>
            </el-form-item>
            <!-- 重新获取图形验证码 end -->

            <!-- img验证码 start -->
            <el-form-item class="img_code"  v-if=getImgCodeBox>
              <el-button plain @click="getImgCode" v-if=imgCodeButShow>
              获取验证码
              </el-button>
              <el-table
                v-loading="loading"
                element-loading-text=""
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                v-if=loading
                style="width: 100%;height: 40px">
              </el-table>
              <img width="36%" height="40" :src=imgcode alt="获取验证码" srcset="" v-if=imgCodeShow>
            </el-form-item>
            <!-- img验证码 end -->

            <!-- 选择账号类型 start -->
            <div style="width: 100%;height: 36px;" v-if=register_but_show>
              <el-radio v-model="form.type" label="0">个人</el-radio>
              <el-radio v-model="form.type" label="1">公司</el-radio>
            </div>
            <!-- 选择账号类型 end -->
            <!--  -->
            <!-- <el-form-item class="remember">
              <el-checkbox v-model="form.remember">自动登录</el-checkbox>
            </el-form-item>
            <el-link type="primary" class="forget">忘记密码</el-link> -->
            <!--  -->
            
            <!-- 验证按钮 start -->
            <el-form-item class="verify_but" v-if=verify_but_show>
              <el-button type="primary" @click="verify('form')">验证</el-button>
            </el-form-item>
            <!-- 验证按钮 end -->

            <!-- 登陆按钮 start -->
            <el-form-item class="login_but" v-if=login_but_show>
              <el-button type="primary" @click="login('form')">登录</el-button>
            </el-form-item>
            <!-- 登陆按钮 end -->

            <!-- 注册按钮 start -->
            <el-form-item class="register_but" v-if=register_but_show>
              <el-button type="info" @click="register('form')">注册</el-button>
            </el-form-item>
            <!-- 注册按钮 end -->
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import topHeader from '../header.vue'
export default {
  name: 'login',
  components: {
    topHeader
  },
  data() {
    return {
      imgcode: '../../../static/img/logo.png',
      form: {
        phone: '', // 手机号
        smsCode: '', // 验证码
        type: '0', // 账号类型
        imgCode: ''
      },
      loginState: true, // 避免多次点击
      registerState: true, // 避免多次点击
      winHeight: '',
      verify_code: '', // 验证手机号是否被注册的返回值
      smsCodeBox: true, // 短信验证码显示与否
      verify_but_show: false, // 验证按钮显示与否
      login_but_show: false, // 登录按钮显示与否
      register_but_show: false, // 注册按钮显示与否
      getImgCodeBox: false, // 图形验证码显示与否
      imgCodeButShow: true, // 获取图片验证码按钮显示与否
      imgCodeShow: false, // 获取图片验证码显示与否
      loading: false // 加载图片验证码动画
    }
  },
  watch: {
    verify_code () {
      this.verify_code_if()
    }
  },
  methods: {
    orderHight() {
      var winHeight = window.innerHeight - 86
      this.winHeight = 'height:' + winHeight + 'px;'
    },
    test(){
      this.verify()
    },
    // 验证手机号是否已注册 start
    verify(){
      let phone_text = /^1[34578]\d{9}$/
      if (this.form.phone === '' || !phone_text.test(this.form.phone)) {
        this.$alert('请正确填写手机号！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
        return false
      } else {
        // 获取验证码
        let params = {}
        params.phone = this.form.phone
        // console.log(params)
        this.$axios
          .post(
            '/api/insunSupplierRegisterInfo/judgeSupplierPhoneExists' + '?phone=' +params.phone
          )
          .then(this.verifySuss)
      }
    },
    verifySuss(res){
      let data = res.data
      this.verify_code = data.ext
      // console.log(res.data)
    },
    // 验证手机号是否已注册 end

    // 通过返回值显示注册/登陆 start
    verify_code_if(){
      if (this.verify_code == 1) {
        this.verify_but_show = false
        this.login_but_show = true
        this.register_but_show = false
        this.smsCodeBox = true
      }else if(this.verify_code == 0){
        this.verify_but_show = false
        this.login_but_show = false
        this.register_but_show = true
        this.smsCodeBox = true
      }
    },
    // 通过返回值显示注册/登陆 end

    // 获取短信验证码 start
    getSmsCode(){
      if (this.form.phone === '') {
        this.$alert('请填写手机号！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
        return false
      } else {
        // 获取验证码
        let params = {}
        params.phone = this.form.phone
        if (this.register_but_show == true) {
          params.type = "register"
        }else if(this.login_but_show == true){
          params.type = "login"
        }
        params.imgCode = this.form.imgCode
        // console.log(params)
        this.$axios
          .post(
            '/api/smsRestService/getShortMsg'
            + '?phone=' + params.phone
            + '&type=' + params.type
            + '&imgCode=' + params.imgCode
          )
          .then(this.getSmsCodeSuss)
      }
    },
    getSmsCodeSuss(res) {
      let data = res.data

        this.$message({
          showClose: true,
          message: res.data.msg
        });
      if (data.errorCode == "-1") {
        if (data.ext == 1) {
          this.getImgCodeBox = true
          this.getImgCode()
          // 需获取图形验证码提示
          this.$message({
          showClose: true,
          message: res.data.msg
          });

        return false
        }
      }else if(data.errorCode == "0"){
        // 手机验证码发送成功提示
        this.$message({
          showClose: true,
          message: res.data.msg
        });
      }
    },
    // 获取短信验证码 end

    // 获取图片验证码 start
    getImgCode() {
      console.log(0)
      if (this.form.phone === '') {
        this.$alert('请填写手机号！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
        return false
      } else {
        // 获取图片验证码
        this.imgCodeButShow = false
        this.loading = true
        // this.imgCodeShow = false
        let params = {}
        params.mobile = this.form.phone
        if (this.register_but_show == true) {
          params.type = "register"
        }else if(this.login_but_show == true){
          params.type = "login"
        }
        // console.log(params)
        this.$axios
          .post(
            '/api/smsRestService/captcha'
            + '?mobile=' + params.mobile
            + '&type=' + params.type
          )
          .then(this.getImgCodeSuss)
      }
    },
    getImgCodeSuss(res){
      let data = res.data
      if (data.errorCode == "0") {
        this.loading = false
        this.imgCodeShow = true
        // 验证码生成成功提示
        // this.$message({
        //   showClose: true,
        //   message: "图片验证码生成成功,30分钟内有效"
        // });
        
        const data = res.data
        this.imgcode = 'data:image/jpg;base64,' + data.img
        console.log(res.data)
      }
    },
    // 获取图片验证码 end

    // 注册start
    register(formName) {
      // if (!this.registerState) return
      // this.registerState = false
      if (this.form.phone === '' || this.form.smsCode === '') {
        this.$alert('请将信息填写完整！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.registerState = true
          }
        })
        return false
      } else {
        // 注册
        this.registerFn()
      }
    },
    // register() {
    //   this.$router.push({ path: '/register' })
    // },
    registerFn() {
      let params = {}
      params.phone = this.form.phone
      params.shortMsgCode = this.form.smsCode
      params.type = this.form.type
      params.imgCode = this.form.imgCode
      // console.log(params)
      // params.append('remember', this.form.remember ? 'yes' : 'no')
      this.$axios
        .post('/api//insunSupplierRegisterInfo/signUp'
        + '?phone=' + params.phone // 手机号
        + '&shortMsgCode=' + params.shortMsgCode // 短信验证码
        + '&imgCode=' + params.imgCode // 图形验证码
        + '&type=' + params.type) // 账号类型
        // .then(this.loginSuccess)
    },
    // register(res) {
      //艾辉
      //6000020
      // console.log(res.data)
      // this.loginState = true
      // if (res.data.result) {
      //   let userInfo = {
      //     //username: this.form.username,
      //     number: this.form.phoneNumber,
      //     password: this.form.password,
      //     remember: this.form.remember ? 'yes' : 'no'
      //   }
      //   //每次登陆后就设置 isLogin
      //   window.sessionStorage.setItem('isLogin', 'success')

      //   this.$store.commit('login', userInfo)
      //   this.$router.push({ path: '/home' })
      // } else {
      //   this.$alert('您输入的信息有误请重新输入！', '提示', {
      //     confirmButtonText: '确定',
      //     callback: action => {}
      //   })
      // }
    // },
    // 注册 end

    // 登陆start
    login(formName) {
      // if (!this.loginState) return
      // this.loginState = false
      if (
        this.form.phone === '' ||
        this.form.smsCode === ''
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
    // register() {
    //   this.$router.push({ path: '/register' })
    // },
    loginFn() {
      let params = {}
      //params.append('username', this.form.username)
      params.phone = this.form.phone
      params.shortMsgCode = this.form.smsCode
      params.imgCode = this.form.imgCode
      this.$axios
        .post('/api/insunSupplierRegisterInfo/login'
        + '?phone=' + params.phone // 手机号
        + '&shortMsgCode=' + params.shortMsgCode // 短信验证码
        + '&imgCode=' + params.imgCode) // 图形验证码
        .then(this.loginSuccess)
    },
    loginSuccess(res) {
      //艾辉
      //6000020
      console.log(res.data)
      let data = res.data
      localStorage.setItem('scissionPhone', this.form.phone)
      if (data.ext == 0 & data.img == 0 ) {
        this.$router.push({ path:'/personage_update'  }) // 个人信息填写页面
      }else if (data.ext == 1 & data.img == 0) {
        this.$router.push({ path:'/personage_datum'  }) // 个人信息详情页面
      }else if (data.ext == 0 & data.img == 1) {
        this.$router.push({ path:'/corporation_datum'  }) // 个人信息详情页面
      }else if (data.ext == 1 & data.img == 1) {
        this.$router.push({ path:'/corporation_datum'  }) // 个人信息详情页面
      }
      // this.loginState = true
      // if (res.data.result) {
      //   let userInfo = {
      //     //username: this.form.username,
      //     number: this.form.phoneNumber,
      //     password: this.form.password,
      //     remember: this.form.remember ? 'yes' : 'no'
      //   }
      //   //每次登陆后就设置 isLogin
      //   window.sessionStorage.setItem('isLogin', 'success')

      //   this.$store.commit('login', userInfo)
      //   this.$router.push({ path: '/home' })
      // } else {
      //   this.$alert('您输入的信息有误请重新输入！', '提示', {
      //     confirmButtonText: '确定',
      //     callback: action => {}
      //   })
      // }
    },
    // 登陆 end
    
    // 
    getlocalStorage() {
      //设置记住密码的默认状态
      try {
        let remember = localStorage.getItem('remember') === 'yes' ? true : false

        if (remember) {
          //this.form.username = localStorage.getItem('username')
          this.form.phoneNumber = localStorage.getItem('phoneNumber')
          this.form.password = localStorage.getItem('password')
          this.form.remember = true
        } else {
          // console.log('无数据')
          // this.form.username = ''; //姓名
          // this.form.phoneNumber = ''; //手机号
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
.login .el-form-item {
  margin-bottom: 24px;
  width: 100%;
}
.login .el-button {
  width: 100%;
}
.login-div {
  background: url('../../assets/images/login_bg.png') center top no-repeat;
  background-size: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.login-title {
  width: 36%;
  font-size: 40px;
  color: #fff;
  text-align: center;
  font-family: '微软雅黑';
}
.login-title p:nth-of-type(1) {
  color: #555555;
  font-weight: 700;
  font-size: 36px;
}
.login-title p:nth-of-type(2) {
  color: rgba(0, 0, 0, 0.42);
}
.login-box {
  /* height: 320px; */
  width: 50%;
}
.login-input {
  width: 360px;
  margin: auto;
  /* height: 100%; */
  /* height: 320px; */
  padding-top: 32px;
}
.login-input .title{
  margin-bottom: 13px
}
.login-input .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.login-input .verification {
  width: 60%;
}
.login-input .img_verification {
  width: 36%;
}
.login-input .hint{
  height: 13px;
}
.login-input .getv {
  width: 36%;
  height: 40px;
}
.login-input .get_img_code{
  width: 28%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
  align-content: flex-end;
}
.login-input .get_img_code button{
  padding: 0;
  background: none;
  border: none;
  text-align: right
}
.login-input .img_code {
  width: 36%;
  height: 40px;
}
.login-input .img_code img{
  width: 100%;
  height: 40px;
}
.login-input .remember {
  width: 50%;
}
.login-input .forget {
  height: 40px;
}
.login .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.login .el-checkbox__inner::after {
  height: 10px;
  left: 7px;
  top: 3px;
}
</style>
