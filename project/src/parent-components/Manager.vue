<template>
    <div class="manager">
      <el-row>
        <el-col :span="4"><navigator class="nav"></navigator></el-col>
        <el-col :span="20" style="min-height: 600px"><router-view/></el-col>
      </el-row>
    </div>
</template>

<script>
    import Navigator from "../child-components/navigators/Navigator";
    import ManageContent from "../child-components/ManageContent";
    export default {
        name: "Manager",
      components: {ManageContent, Navigator}
    }
</script>

<style scoped>
  .nav{
    margin-right: 10px;
  }
</style>
