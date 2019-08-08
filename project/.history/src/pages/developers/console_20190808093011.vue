<template>
    <div class="main-page" style="text-align:center">
        <el-row>
            <h1></h1>
        </el-row>
        <el-row>
            <div>您还未获得使用权限</div>
        </el-row>
        <el-row>
            <div>请点击<el-button type="primary" size="small">申请使用</el-button>获取使用权限</div>
        </el-row>
    </div>
</template>
<script>
    export default {
    name: "consolePage",
      data(){
          return{
            username:'',
            roleId:'',
          }
      },
      mounted(){
          this.getUsername();
          this.getRoleId();
      },

      methods:{
        getUsername(){
          this.username = sessionStorage.getItem('username');
          // console.log(this.username);
        },

        getRoleId(){
          this.roleId = sessionStorage.getItem("roleId");
          // console.log(this.roleId);
        },
         handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
      },
    }
</script>

<style scoped>
</style>
