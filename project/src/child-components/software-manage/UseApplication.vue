<template>
    <div class="use-application">
      <el-row>
        <el-col :span="10">
          <el-card>
            <div slot="header" class="type-head">
              <span>软件使用申请</span>
            </div>
            <div class="body">
              <el-row>
                <el-col :span="5"><span>申请使用</span></el-col>
                <el-col :span="7"><el-select></el-select></el-col>
                <el-col :span="5"><span>分类中</span></el-col>
                <el-col :span="7"><el-select></el-select></el-col>
              </el-row>
              <el-button>提交</el-button>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <span>当前权限</span>
            </div>
            <div>
              您当前可使用的软件有：
            </div>
          </el-card>
        </el-col>
        <el-col :span="14">
          <el-card>
            <div slot="header">
              <span>申请记录</span>
            </div>
            <div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "UseApplication"
    }
</script>

<style scoped>

</style>
