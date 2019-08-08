<template>
    <div class="main-page" style="height:;margin-top:15px">
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
