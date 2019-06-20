<template>
  <div class="register-page">
    <el-row>
    <el-col :span="8" :offset="7" style="margin-top:50px;margin-bottom: 50px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户注册</span>
      </div>
    <el-row>
      <el-form :model="registerForm" :rules="registerRule" ref="ruleForm" label-width="100px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入您的账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" type="password" placeholder="请输入您的密码"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="registerForm.email" placeholder="请输入您的电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="联系地址" prop="address">
            <el-input v-model="registerForm.address" placeholder="请输入您的联系地址"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="registerForm.name" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="userCode">
            <el-input v-model="registerForm.userCode" placeholder="请输入您的身份证号"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="registerForm.phone" placeholder="请输入您的手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verificationCode">
            <el-input v-model="registerForm.verificationCode" placeholder="请输入验证码"></el-input>
          </el-form-item>
        </el-form>
        <el-row><el-col :span="13" :offset="5">
          <el-button type="primary" @click="submitForm('registerForm')">立即注册</el-button>
        </el-col>
        </el-row>
    </el-row>
    </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "signPage",
      data(){
          return {
            registerForm:{
              username:"",
              password:"",
              email:"",
              address:"",
              name:"",
              userCode:"",
              phone:"",
              verificationCode:""
            },
            registerRule: {
              username: [{required: true, message: '请输入您的账号', trigger: 'blur'}],
            password: [{required: true, message: '请输入您的密码', trigger: 'blur'}],
              email: [{required: true, message: '请输入您的邮箱', trigger: 'blur'}],
              address: [{required: true, message: '请输入您的地址', trigger: 'blur'}],
              name: [{required: true, message: '请输入您的地址', trigger: 'blur'}],
              userCode: [{required: true, message: '请输入您的身份证号码', trigger: 'blur'}],
              phone: [{required: true, message: '请输入您的手机号', trigger: 'blur'}],
              verificationCode: [{required: true, message: '请输入验证码', trigger: 'blur'}],
        }
          }
      },
      methods:{
        submitForm(formName){

        }
      }
    }
</script>

<style scoped>
  .register-page{
    width:100%;
    height:100%;
    background-size:100% 100%;
    background: url("../assets/login_bg.jpg");
  }
  .box-card{background-color: #ffffff}
  .el-row button{width: 100%;margin: 10px 0px}
  .managerArea{display: none}
</style>
<style>

</style>
