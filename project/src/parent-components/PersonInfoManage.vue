<template>
    <div class="person-info-manage">
      <el-row>
        <el-col :span="3"><person-info-nav class="nav"></person-info-nav></el-col>
        <el-col :span="21"><router-view/></el-col>
      </el-row>
    </div>
</template>

<script>
    import PersonInfoNav from "../child-components/navigators/PersonInfoNav";
    export default {
        name: "PersonInfoManage",
      components: {PersonInfoNav}
    }
</script>

<style scoped>
  .nav{
    margin-right: 10px;
  }
</style>
