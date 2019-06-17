<template>
    <div class="senior-user-manage">
      <el-row :gutter="10">
        <el-col :span="4"><senior-user-nav class="nav"></senior-user-nav></el-col>
        <el-col :span="20"><router-view/></el-col>
      </el-row>
    </div>
</template>

<script>
    import SeniorUserNav from "../child-components/navigators/SeniorUserNav";
    export default {
        name: "SeniorUserManage",
      components: {SeniorUserNav}
    }
</script>

<style scoped>
/*.nav{*/
  /*margin-right: 10px;*/
/*}*/
</style>
