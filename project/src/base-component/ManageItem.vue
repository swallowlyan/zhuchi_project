<template>
    <div class="manage-item">
      <el-row>
        <el-col :span="8"><img src="../assets/manage-logo/01.jpg"/></el-col>
        <el-col :span="12"><span>软件管理</span></el-col>
        <el-col :span="4"><img src="../assets/manage-logo/up-arrow.png"/></el-col>
      </el-row>
      <div class="child-option" v-for="o in 5">
        <p>软件购置审批</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ManageItem"
    }
</script>

<style scoped>

</style>
