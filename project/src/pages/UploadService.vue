<template>
    <div class="main-page" style="height: 100%">
   
       
    </div>
</template>

<script>
    export default {
        name: "MainPage",
      components: {MyHeader},

      data(){
          return{
            username:'',
            roleId:'',
          }
      },

      created(){
          this.getUsername();
          this.getRoleId();
      },

      methods:{
        getUsername(){
          this.username = sessionStorage.getItem("nickname");
          // console.log(this.username);
        },

        getRoleId(){
          this.roleId = sessionStorage.getItem("roleId");
          // console.log(this.roleId);
        },
      },
    }
</script>

<style scoped>
.main-part{
  margin: 20px;
}
</style>
