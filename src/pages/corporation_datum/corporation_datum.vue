<template>
  <div class="personage">
    <top-header></top-header>
    <el-main>
      <el-row>
        <el-col :span="24" class="greet">
          <div class="grid-content bg-purple-dark">
            <span style="color:#1890FF;">Admin</span>
            ,欢迎进入映盛中国供应商管理系统，如有合作，我们会以027-87626798与您联系！！
          </div>
          <el-button type="primary" icon="el-icon-refresh" @click="update">更新</el-button>
        </el-col>
      </el-row>
      <!-- 基本信息start -->
      <el-row>
        <el-col :span="24" class="content_title">基本信息</el-col>
        <!-- 公司信息循环输出start -->
        <el-col :span="12" class="content_text">
          <div>公司名称：</div>
          <span>上海映盛网络技术股份有限公司</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>统一社会信用代码：</div>
          <span>1234123421</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>办公地址：</div>
          <span>浙江省杭州市西湖区万塘路18号</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>所属区域：</div>
          <span>上海市-徐汇区</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>公司成立时间：</div>
          <span>2013-02-21</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>法定代表人姓名：</div>
          <span>马发腾</span>
        </el-col>
        <!-- 公司信息循环输出end -->
        <el-col :span="12" class="content_text">
          <div>
            <span style="color: #FF6600;">*</span>营业执照：
          </div>
          <div class="license">
            <img src="~@/assets/images/license.jpg" width="108" height="108" alt="" srcset="">
          </div>
        </el-col>
      </el-row>
      <!-- 基本信息end -->
      <!-- 服务信息start -->
      <el-row>
        <el-col :span="24" class="content_title">服务信息</el-col>
        <el-col :span="24" class="content_text">
          <div style="width: 5em;">服务类型：</div>
          <span style="max-width: 92%;">例如提供提供互联网营销推广服务，企业官网认证、搜索引擎品牌建档、百度百科、新闻撰写发布、百度贴吧吧主代运营、SEO优化、抖音代运营、信息流广告开户及一手达人资源、危机公关等互联网营销产品与服务</span>
        </el-col>
        <el-col :span="24" class="content_text">
          <div style="width: 5em;">服务客户：</div>
          <span style="max-width: 92%;">东风本田,东风汽车</span>
        </el-col>
      </el-row>
      <!-- 服务信息end -->
      <!-- 联系人信息start -->
      <el-row>
        <el-col :span="24" class="content_title">联系人信息</el-col>
        <el-col :span="24" style="padding: 0;">
          <el-col :span="6" class="content_text" v-for="item of contacts_datum" :key="item.id">
            <div>{{item.title}}</div>
            <span>{{item.content}}</span>
          </el-col>
        </el-col>
        <el-col :span="24" style="padding: 0;">
          <el-col :span="6" class="content_text" v-for="item of contacts_datum" :key="item.id">
            <div>{{item.title}}</div>
            <span>{{item.content}}</span>
          </el-col>
        </el-col>
      </el-row>
      <!-- 联系人信息end -->
      <!-- 开票信息信息start -->
      <el-row>
        <el-col :span="24" class="content_title">开票信息</el-col>
        <el-col :span="12" class="content_text">
          <div>开户行名称：</div>
          <span>上海市工商银行卢湾支行</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>银行卡账号：</div>
          <span>1234-1234-1234-1234</span>
        </el-col>
        <el-col :span="7" class="content_text">
          <div>收件人姓名：</div>
          <span>大叔的哈苏</span>
        </el-col>
        <el-col :span="7" class="content_text">
          <div>收件人电话：</div>
          <span>1234123421</span>
        </el-col>
        <el-col :span="10" class="content_text">
          <div>收件人地址：</div>
          <span>浙江省杭州市西湖区万塘路18号</span>
        </el-col>
      </el-row>
      <!-- 开票信息信息end -->
      <!-- 资质信息start -->
      <el-row>
        <el-col :span="24" class="content_title">资质信息</el-col>
        <el-col :span="22" class="content_text upload_title">
          <el-col :span="9" class="text_indent_1">文件名称</el-col>
          <el-col :span="13">上传时间</el-col>
          <el-col :span="2">操作</el-col>
        </el-col>
        <!-- 循环输出文档资料start -->
        <el-col
          :span="22"
          class="content_text upload_content"
          v-for="item of upload_content"
          :key="item.id"
        >
          <el-col :span="9" class="text_indent_1">{{item.name}}</el-col>
          <el-col :span="13">{{item.time}}</el-col>
          <el-col :span="2">
            <a href="javascript:;"><el-link type="primary">预览</el-link></a>
            <a href="javascript:;"><el-link type="primary">下载</el-link></a>
          </el-col>
        </el-col>
        <!-- 循环输出文档资料end -->
        <el-col :span="24" style="height:54px;"></el-col>
      </el-row>
      <!-- 资质信息end -->
    </el-main>
  </div>
</template>
<script>
import topHeader from '../header.vue'
export default {
  name: 'corporation_datum',
  components: {
    topHeader
  },
  data() {
    return {
      // 基本信息
      // 服务信息
      // 联系人信息
      contacts_datum: [
        {
          id: 1,
          title: '姓名：',
          content: '大叔的哈苏'
        },
        {
          id: 2,
          title: '电话：',
          content: '1234123421'
        },
        {
          id: 3,
          title: '微信&QQ：',
          content: '1234123421'
        },
        {
          id: 4,
          title: '邮箱：',
          content: '12345fdf@163.com'
        }
      ],
      // 开票信息
      // 文档资料
      upload_content: [
        {
          id: 1,
          name: '身份证.jpg',
          time: '2019-10-01 12:00'
        },
        {
          id: 2,
          name: '技术认证证书.jpg',
          time: '2019-10-01 12:00'
        },
        {
          id: 3,
          name: '技术认证证书.jpg',
          time: '2019-10-01 12:00'
        },
        {
          id: 4,
          name: '技术认证证书.jpg',
          time: '2019-10-01 12:00'
        }
      ]
    }
  },
  // 方法
  methods: {
    update() {
      this.$router.push({ path: '/corporation_update' })
    },
     // 获取本地缓存的登录手机号
    locals() {
      let scissionPhone = localStorage.getItem('scissionPhone')
      this.scissionPhone = scissionPhone
    },
    // 获取供应商信息 start
    getSupplierInfo() {
      let phone = this.scissionPhone
      console.log(phone)
      this.$axios
        .post(
          '/api/insunSupplierRegisterInfo/getSupplierInfo' + '?phone=' + phone
        )
        .then(this.getSupplierInfoSuss)
    },
    getSupplierInfoSuss(res) {
      let data = res.data
      if (data.errorCode == "0") {
        let deli=JSON.parse(data.ext)
        console.log(deli)
      }
      // console.log(res.data.ext)
    }
  },
  // 钩子函数
  mounted() {
    this.locals()
    this.getSupplierInfo()
  }
}
</script>
<style scoped>
.personage {
  background: rgba(246, 247, 249, 1);
  /* background: #333333; */
}
.text_indent_1 {
  text-indent: 1em;
}
.el-main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0;
  /* background: white; */
}
.el-row {
  margin-bottom: 28px;
  padding: 13px 0;
  background: white;
  border-radius: 3px;
}
.el-col {
  padding: 0 36px;
}
.greet {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.64);
  height: 66px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.personage .content_title {
  height: 55px;
  line-height: 55px;
  margin-bottom: 13px;
  font-weight: 650;
  color: rgba(0, 0, 0, 0.81);
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.personage .content_text {
  /* height: 32px; */
  line-height: 32px;
  font-size: 14px;
  margin: 3px 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
}
.personage .content_text .license {
  padding: 6px;
  border: 1px dashed #ccc;
}
.personage .content_text.upload_title {
  height: 54px;
  line-height: 54px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.85);
  background-color: rgba(250, 250, 250, 1);
  border: 1px solid rgb(235, 235, 235);
  border-radius: 4px;
  padding: 0;
  margin: 3px 36px;
}
.personage .content_text.upload_title > div:nth-of-type(3) {
  text-align: center;
}
.personage .content_text.upload_content {
  height: 54px;
  line-height: 54px;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(235, 235, 235);
  margin: 3px 36px;
  padding: 0;
}
.personage .content_text.upload_content > div:nth-of-type(3) {
  display: flex;
  justify-content: space-around;
}
.personage .content_text .el-col,
.personage .content_text span {
  color: rgba(0, 0, 0, 0.64);
  padding: 0;
}
.personage .content_text.upload_title .el-col {
  color: rgba(0, 0, 0, 0.85);
}
</style>
