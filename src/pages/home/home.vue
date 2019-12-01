<template>
  <el-container>
    <el-header>
      <top-header></top-header>
    </el-header>
    <el-container>
      <el-main>
        阿萨德撒大撒
        <div class="homepage">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import topHeader from '../header.vue'
export default {
    name: 'home',
    components: {
        topHeader,
    },
    data() {
        return {}
    },
    methods: {},
    mounted() {}
}
</script>
<style scoped>
.homepage {
    min-width: 1160px;
    overflow: hidden;
}
.el-header {
    padding: 0px;
}
.el-main{
    padding: 0px;
}
</style>