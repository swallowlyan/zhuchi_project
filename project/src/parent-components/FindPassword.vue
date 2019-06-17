<template>
    <div class="find-password">
      <p>找回密码</p>
      <el-form :model="findPassItem" ref="findPassItem" :rules="findPassRules" label-width="100px" style="padding: 0px 10px">
        <el-form-item label="请输入邮箱:" prop="email">
          <el-input v-model="findPassItem.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('findPassItem')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "FindPassword",
      data(){
          return{
            findPassItem:{
              email:''
            },
            findPassRules:{
              email:[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]
            }
          }
      },
      methods:{
        submitForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.get('/sysuser/password-back',{params:{
                  email:this.findPassItem.email
                }
              }).then((res)=>{
                    console.log(res);
              }).catch((err)=>{
                console.log(err);
              });
            }else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>

<style scoped>
  .find-password{
    background-color: #ffffff;
    width: 30%;
    /*height: 400px;*/
    text-align: center;
    margin: 10% auto;
    padding-bottom: 3%;
    /*height: 100%;*/
  }

  p{
    color: #000000;
    font-size: xx-large;
    padding: 5%;
    /*margin: 10% auto;*/
  }

  .row-item{
    margin: 3% 10%;
  }

  .phone-number{
    width: 80%;
  }

  .btn-summit{
    width: 80%;
    background: #3a8ee6;
  }
</style>
