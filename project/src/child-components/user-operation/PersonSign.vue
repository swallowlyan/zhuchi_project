<template>
  <div class="enterprise-sign">
    <el-form :model="personSignItem" :rules="enterSignRules" ref="personSignItem" label-width="100px" class="enterSignForm">
      <el-form-item label="账号:" prop="username">
        <el-input v-model="personSignItem.username" autocomplete="off" placeholder="请设置您的账号"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="personSignItem.password" type="password" autocomplete="off" placeholder="请设置您的密码"></el-input>
      </el-form-item>
      <el-form-item label="密码确认:" prop="confirmPass">
        <el-input v-model="personSignItem.confirmPass" type="password" autocomplete="off" placeholder="请确认您的密码"></el-input>
      </el-form-item>
      <el-form-item label="昵称:" prop="nickname">
        <el-input v-model="personSignItem.nickname" autocomplete="off" placeholder="请确认您的昵称"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="personSignItem.email" autocomplete="off" placeholder="请填写您的邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="phone">
        <el-input v-model="personSignItem.phone" autocomplete="off" placeholder="请填写您的手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitSign('personSignItem')">立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "PersonSign",
    data(){
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.personSignItem.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        personSignItem:{
          username:'',
          nickname:'',
          password:'',
          confirmPass:'',
          email:'',
          phone:''

        },
        enterSignRules:{
          username:[
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          nickname:[
            {required: true, message: '请输入昵称', trigger: 'blur'},
          ],
          password:[
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          confirmPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email:[
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          phone:[
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
        }
      }
    }
    ,methods:{
      submitSign(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //username校验
            this.$axios.get('/sysuser/check-username',
              {params:{
                  username:this.personSignItem.username
                }
              }).then((res)=>{
              if(res.data.data==="CHECK_NO_EXIST"){
                //email校验
                this.$axios.get('/sysuser/check',
                  {params:{
                      column:"email",
                      value:this.personSignItem.email
                    }
                  }).then((res)=>{
                  if(res.data.data==="CHECK_NO_EXIST"){
                    //phone校验
                    this.$axios.get('/sysuser/check',
                      {params:{
                          column:"phone",
                          value:this.personSignItem.phone
                        }
                      }).then((res)=>{
                      if(res.data.data==="CHECK_NO_EXIST"){
                        //重复验证已通过，提交信息
                        let param={
                          username:this.personSignItem.username,
                          nickname:this.personSignItem.nickname,
                          passwd:this.personSignItem.password,
                          email:this.personSignItem.email,
                          phone:this.personSignItem.phone
                        }
                        this.$axios.post('/sysuser/create',param).then((res)=>{
                          console.log(res);
                          if(res.data.message==="成功"){
                            this.$message({
                              showClose: true,
                              message: "注册成功",
                              type: 'success'
                            });
                            this.$router.push('/');
                          }else{
                            this.$message({
                              showClose: true,
                              message: "注册失败",
                              type: 'error'
                            });
                          }
                        }).catch((err)=>{
                          console.log(err);
                        });
                      }else{
                        this.$message({
                          showClose: true,
                          message: "手机号已存在，请重新输入",
                          type: 'error'
                        });
                      }
                    }).catch((err)=>{
                      console.log(err);
                    });
                  }else{
                    this.$message({
                      showClose: true,
                      message: "邮箱已存在，请重新输入",
                      type: 'error'
                    });
                  }
                }).catch((err)=>{
                  console.log(err);
                });
              }else{
                this.$message({
                  showClose: true,
                  message: "账号已存在，请重新输入",
                  type: 'error'
                });
              }
            }).catch((err)=>{
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .enterprise-sign{
    width: 50%;
    background: #ffffff;
    text-align: center;
    margin: -1.5% auto;
  }
  .enterSignForm{
    padding: 50px 20px 10px 10px;
    margin-top: 24px;
  }
</style>
