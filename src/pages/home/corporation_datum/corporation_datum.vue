<template>
  <div class="personage">
    <el-main>
      <el-row>
        <el-col :span="24" class="greet">
          <div class="grid-content bg-purple-dark">
            <span style="color:#1890FF;">{{this.$store.state.phone}}</span>
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
          <span>{{supplierRegisterInfo.companyName}}</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>统一社会信用代码：</div>
          <span>{{supplierRegisterInfo.creditCode}}</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>办公地址：</div>
          <span>{{supplierRegisterInfo.address}}</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>所属区域：</div>
          <span>{{supplierRegisterInfo.area}}</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>公司成立时间：</div>
          <span>{{supplierRegisterInfo.companyTime}}</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>法定代表人姓名：</div>
          <span>{{supplierRegisterInfo.companyLegal}}</span>
        </el-col>
        <!-- 公司信息循环输出end -->
        <el-col :span="12" class="content_text">
          <div>
            <span style="color: #FF6600;">*</span>营业执照：
          </div>
          <div class="license">
            <img :src="'/api/upload'+supplierRegisterInfo.businessLicensePath" width="108" height="108" alt="" srcset="">
          </div>
        </el-col>
      </el-row>
      <!-- 基本信息end -->
      <!-- 服务信息start -->
      <el-row>
        <el-col :span="24" class="content_title">服务信息</el-col>
        <el-col :span="24" class="content_text">
          <div style="width: 5em;">服务类型：</div>
          <span style="max-width: 92%;">{{supplierRegisterInfo.serviceType}}</span>
        </el-col>
        <el-col :span="24" class="content_text">
          <div style="width: 5em;">服务客户：</div>
          <span style="max-width: 92%;">{{supplierRegisterInfo.serviceCustomer}}</span>
        </el-col>
      </el-row>
      <!-- 服务信息end -->
      <!-- 联系人信息start -->
      <el-row>
        <el-col :span="24" class="content_title">联系人信息</el-col>
        <el-col :span="24" style="padding: 0;"  v-for="item of supplierContactInfoList" :key=item.index>
          <el-col :span="6" class="content_text">
            <div>姓名:</div>
            <span>{{item.name}}</span>
          </el-col>
          <el-col :span="6" class="content_text">
            <div>电话：</div>
            <span>{{item.tel}}</span>
          </el-col>
          <el-col :span="6" class="content_text">
            <div>微信&QQ：</div>
            <span>{{item.wechatOrQQ}}</span>
          </el-col>
          <el-col :span="6" class="content_text">
            <div>邮箱：</div>
            <span>{{item.mail}}</span>
          </el-col>
        </el-col>
      </el-row>
      <!-- 联系人信息end -->
      <!-- 开票信息信息start -->
      <el-row>
        <el-col :span="24" class="content_title">开票信息</el-col>
        <el-col :span="12" class="content_text">
          <div>开户行名称：</div>
          <span>{{supplierRegisterInfo.invoiceBank}}</span>
        </el-col>
        <el-col :span="12" class="content_text">
          <div>银行卡账号：</div>
          <span>{{supplierRegisterInfo.invoiceAccount}}</span>
        </el-col>
        <el-col :span="7" class="content_text">
          <div>收件人姓名：</div>
          <span>{{supplierRegisterInfo.invoiceReceiveUser}}</span>
        </el-col>
        <el-col :span="7" class="content_text">
          <div>收件人电话：</div>
          <span>{{supplierRegisterInfo.invoiceReceiveContact}}</span>
        </el-col>
        <el-col :span="10" class="content_text">
          <div>收件人地址：</div>
          <span>{{supplierRegisterInfo.invoiceReceiveAddr}}</span>
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
          v-for="item of supplierRegisterFileList"
          :key=item.index
        >
          <el-col :span="9" class="text_indent_1">{{item.fileName}}</el-col>
          <el-col :span="13">{{item.createTime}}</el-col>
          <el-col :span="2">
            <el-link type="primary"  @click="preview(item.filePath)">预览</el-link>
            <el-link type="primary" @click="downLoadDoc(item.filePath)">下载</el-link>
          </el-col>
        </el-col>
        <!-- 循环输出文档资料end -->
        <el-col :span="24" style="height:54px;"></el-col>
      </el-row>
      <!-- 资质信息end -->
    </el-main>
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="previewImage">
        <img :src="previewImage" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {preview} from "../../../utils/preview";// 引入文件预览方法
import {matchType} from "../../../utils/matchType";// 引入文件格式判断方法
export default {
  name: 'corporation_datum',
  components: {},
  data() {
    return {
      scissionPhone: '', // vue-x 存的手机号
      deli: '',
      // 基本信息 服务信息 
      supplierRegisterInfo: '',
      // 联系人信息
      supplierContactInfoList: [],
      // 文档资料
      supplierRegisterFileList: '',
      dialogVisible:false, //控制显示预览弹框
      previewImage:'', //预览的图片
    }
  },
  // 方法
  methods: {
    // 文件格式判断
    matchType,
    // 文件预览
    preview,
    // 更新按钮跳转
    update() {
      this.$router.push({ path: '/corporation_update' })
    },
    // 获取供应商信息 start
    getSupplierInfo() {
      let phone = this.$store.state.phone
      this.$axios
        .post(
          '/api/insunSupplierRegisterInfo/getSupplierInfo' + '?phone=' + phone
        )
        .then(this.getSupplierInfoSuss)
    },
    // 回调
    getSupplierInfoSuss(res) {
      let data = res.data
      if (data.errorCode == "0") {
        let deli=JSON.parse(data.ext)
        this.deli = deli
        this.supplierRegisterInfo = deli.supplierRegisterInfo
        this.supplierContactInfoList = deli.supplierRegisterInfo.supplierContactInfoList
        this.supplierRegisterFileList = deli.supplierRegisterInfo.supplierRegisterFileList
      }
    },
     // 下载附件
    downLoadDoc(path){
      let a = document.createElement('a');
      a.download = '';
      a.setAttribute('href',path);
      a.click();
    },
    // 获取供应商信息 end
    // 测试
    test(){}
  },
  // 钩子函数
  mounted() {
    this.getSupplierInfo()
  }
}
</script>
<style scoped>
.personage {
  background: rgba(246, 247, 249, 1);
}
.previewImage{
  width: 100%;
  text-align: center;
}
.previewImage img{
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
}
.text_indent_1 {
  text-indent: 1em;
}
.el-main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0;
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
