<template>
    <el-card class="scrapped-application">
      <el-row>
        <el-col :span="8">
          <el-card>
            <div slot="header">
              <span>软件报废申请</span>
            </div>
            <div>
              <el-row>
                <el-col :span="5"><span>申请报废</span></el-col>
                <el-col :span="7"><el-select></el-select></el-col>
                <el-col :span="5"><span>分类中</span></el-col>
                <el-col :span="7"><el-select></el-select></el-col>
              </el-row>
              <el-row>
                <el-col :span="5"><span>报废理由：</span></el-col>
                <el-col :span="19"><el-input type="textarea" :rows="5"></el-input></el-col>
              </el-row>
              <el-button>提交</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card>
            <div slot="header">
              <span>报废申请记录</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "ScrappedApplication"
    }
</script>

<style scoped>

</style>
