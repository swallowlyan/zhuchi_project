<template>
    <div class="senior-user">
      <el-row :gutter="10"  class="page-row">
        <el-col :span="4"><senior-user-nav></senior-user-nav></el-col>
        <el-col :span="20">
          <el-row :gutter="10">
            <el-col :span="18">
              <software-manage class="upper-com"></software-manage>
            </el-col>
            <el-col :span="6"><file-manage class="upper-com"></file-manage></el-col>
          </el-row>
          <user-manage></user-manage>
        </el-col>
      </el-row>
    </div>

</template>

<script>
    import SoftwareManage from "../child-components/software-use/SoftwareManage";
    import FileManage from "../child-components/software-use/FileManage";
    import UserManage from "../child-components/user-manage/UserManage";
    import SeniorUserNav from "../child-components/navigators/SeniorUserNav";
    export default {
        name: "SeniorUser",
      components: {SeniorUserNav, UserManage, FileManage, SoftwareManage}
    }
</script>

<style scoped>
  .page-row{
    margin: 10px;
  }

  .senior-user{
    padding-bottom: 1%;
  }

  .upper-com{
    height: 465px;
    margin-bottom: 10px;
  }
</style>
