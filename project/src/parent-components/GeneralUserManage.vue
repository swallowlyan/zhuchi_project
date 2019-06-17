<template>
    <div class="general-user-manage">
      <el-row :gutter="10">
        <el-col :span="4"><general-user-nav class="nav"></general-user-nav></el-col>
        <el-col :span="20"><router-view class="right-part"/></el-col>
      </el-row>
    </div>
</template>

<script>
    import GeneralUserNav from "../child-components/navigators/GeneralUserNav";
    export default {
        name: "GeneralUserManage",
      components: {GeneralUserNav}
    }
</script>

<style scoped>
/*.nav{*/
  /*margin-right: 10px;*/
/*}*/
</style>
