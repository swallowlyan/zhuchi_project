<template>
    <el-card class="file-manage">
      <el-row>
        <el-col :span="6"><a class="head-href">文件管理</a></el-col>
        <el-col :span="18">
          <el-row>
            <el-col :span="18" :offset="3"><el-input type="text" size="mini"/></el-col>
            <el-col :span="2" :offset="1"><img src="../../assets/u79.png"/></el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-card class="cloud-file container" shadow="never">
            <div class="region-head">
              <span class="head-href">云端文件</span>
            </div>
            <div class="body" v-for="o in 4">
              <file-item></file-item>
            </div>
          </el-card>
        </el-col>
        <el-col :span="1"><img src="../../assets/u40.png"/></el-col>
        <el-col :span="11">
          <el-card class="local-file container" shadow="never">
            <div class="region-head">
              <span class="head-href">本地文件</span>
            </div>
            <div class="body" v-for="o in 4">
              <file-item></file-item>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
</template>

<script>
    import FileItem from "../../base-component/FileItem";
    export default {
        name: "FileManage",
      components: {FileItem}
    }
</script>

<style scoped>
.cloud-file,.local-file{

}

  .file-item{
    margin-top: 5%;
  }
</style>
