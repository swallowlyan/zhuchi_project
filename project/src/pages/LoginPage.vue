<template>
  <div class="login-page">
    <login-header></login-header>
    <router-view/>
  </div>
</template>

<script>
  import LoginHeader from "../components/LoginHeader";
  export default {
    name: "LoginPage",
    components: {LoginHeader}
  }
</script>

<style scoped>
  .login-page{
    height: 100%;
  }
</style>
