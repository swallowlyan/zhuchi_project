<template>
    <div class="general-user">
      <el-row :gutter="10" class="page-row">
        <el-col :span="4"><general-user-nav></general-user-nav></el-col>
        <el-col :span="15"><software-manage></software-manage></el-col>
        <el-col :span="5"><file-manage></file-manage></el-col>
      </el-row>
    </div>
</template>

<script>
    import SoftwareManage from "../child-components/software-use/SoftwareManage";
    import FileManage from "../child-components/software-use/FileManage";
    import GeneralUserNav from "../child-components/navigators/GeneralUserNav";
    export default {
    name: "GeneralUser",
    components: {GeneralUserNav, FileManage, SoftwareManage}
    }
</script>

<style scoped>
  .page-row{
    margin: 10px;
  }

  .general-user{
    padding-bottom: 1%;
  }
</style>
