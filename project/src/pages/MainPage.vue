<template>
    <div class="main-page" style="height: 100%">
      <my-header :username="this.username" :role-id="this.roleId"></my-header>
      <router-view class="main-part"/>
    </div>
</template>

<script>
    import MyHeader from "../components/MyHeader";
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
