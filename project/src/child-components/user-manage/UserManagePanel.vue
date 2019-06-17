<template>
    <el-card class="user-manage-panel">
      <el-row>
        <el-col :span="12">
          <el-card>
            <div slot="header">
              <span>入组审批</span>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <span>权限管理</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header">
              <span>角色定义</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "UserManagePanel"
    }
</script>

<style scoped>

</style>
