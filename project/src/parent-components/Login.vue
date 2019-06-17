<template>
    <div class="login">
      <login-panel></login-panel>
    </div>
</template>

<script>
    import LoginPanel from "../child-components/user-operation/LoginPanel";
    export default {
        name: "Login",
      components: {LoginPanel}
    }
</script>

<style scoped>
.login-panel{
  background-color: #ffffff;
  width: 30%;
  /*height: 400px;*/
  text-align: center;
  margin: 10% auto;
  padding-bottom: 3%;
}

  .login{
    height: 100%;
  }
</style>
