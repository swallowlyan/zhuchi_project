<template>
    <el-card class="modify-password" style="min-height: 900px">
      <p>修改密码</p>
        <el-form :model="personItem" status-icon :rules="personRules" ref="personItem" label-width="150px" class="modifyPass">
          <el-input size="small" v-show="false" v-model="personItem.username"></el-input>
          <el-form-item label="当前密码:" prop="oldPassword">
            <el-col :span="8">
              <el-input type="text" v-model="personItem.oldPassword" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="新密码:" prop="newPassword">
            <el-col :span="8">
            <el-input type="text" v-model="personItem.newPassword" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>


          <el-form-item label="重复新密码:" prop="confirmPass">
            <el-col :span="8">
            <el-input type="text" v-model="personItem.confirmPass" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
        <el-button class="row-item"><span class="btn-label" @click="submitModify">提交</span></el-button>
          </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "ModifyPassword",
      data(){
        let validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.personItem.newPassword !== '') {
              this.$refs.ruleForm2.validateField('confirmPass');
            }
            callback();
          }
        };
        let validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.personItem.newPassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
          return{
            personItem:{
              username:'',
              oldPassword:'',
              newPassword:'',
              confirmPass:''
            },
            personRules: {
              oldPassword: [
                { required: true, message: '请输入当前密码', trigger: 'blur' },
              ],
              newPassword: [
                { required: true, message: '请输入新密码', trigger: 'blur' }
              ],
              confirmPass: [
                { validator: validatePass2, trigger: 'blur' }
              ]
            }
          }
      },
      created(){
          this.getPerson();
      },
      methods:{
        getPerson(){
          this.personItem.username = sessionStorage.getItem("username");
          // this.personItem.username ="1";
          this.$axios.get('/sysuser/user-info',{
            params:{username:this.personItem.username}
          }).then((res)=>{
            this.personItem=res.data.data;
          }).catch((err)=>{
            console.log(err);
          });
        },
        submitModify(){
          this.$axios.post('/sysuser/modify-password',
            {
              username:this.personItem.username,
              oldPassword:this.personItem.oldPassword,
              newPassword:this.personItem.newPassword,
            }).then((res)=>{
            if(res.data.message==="成功"){
              this.$message({
                showClose: true,
                message: "修改成功",
                type: 'success'
              });
              this.personItem.newPassword="";
              this.personItem.confirmPass="";
            }else{
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              });
            }
          }).catch((err)=>{
            console.log(err);
          });
        }
      }
    }
</script>

<style scoped>
  p{
    color: #ffffff;
    font-size: x-large;
    border-left: #ffffff solid 7px;
    padding-left: 2%;
    margin-left: 2%;
    margin-top: 2%;
  }

  span{
    font-size: 130%;
  }
  .modifyPass{margin: 30px}
  .left-part{
    text-align: right;
  }

  .row-item{
    margin: 2% auto 2% 5%;
  }

  .el-button{
    background: #3a8ee6;
    border: 0px;
    width: 10%;
    /*margin-left: 20%;*/
  }

  .btn-label{
    color: #ffffff;
    font-size: medium;
  }
</style>
<style>
  .modifyPass .el-form-item__label{color: #ffffff;font-size: 130%;}
</style>
