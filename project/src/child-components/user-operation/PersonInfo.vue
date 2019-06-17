<template>
    <el-card class="person-info" style="min-height: 900px">
      <p>个人信息</p>
      <div class="personInfo">
        <el-row class="row-item">
          <el-col :span="2" class="left-part"><span>昵称：</span></el-col>
          <el-col :span="8" ><span v-html="personItem.nickname"></span></el-col>
          <el-col :span="3"><el-button size="small" @click="editNickname"><span class="btn-label">修改</span></el-button></el-col>
        </el-row>
        <el-row class="row-item">
          <el-col :span="2" class="left-part"><span class="left-part">邮箱：</span></el-col>
          <el-col :span="8" ><span v-html="personItem.email"></span></el-col>
          <el-col :span="3"><el-button size="small" @click="editEmail"><span class="btn-label">修改</span></el-button></el-col>
        </el-row>
        <el-row class="row-item">
          <el-col :span="2" class="left-part"><span class="left-part">手机号：</span></el-col>
          <el-col :span="8" ><span v-html="personItem.phone"></span></el-col>
          <el-col :span="3"><el-button size="small" @click="editPhone"><span class="btn-label">修改</span></el-button></el-col>
        </el-row>
        <el-row class="row-item">
          <el-col :span="2" class="left-part"><span class="left-part">工号：</span></el-col>
          <el-col :span="8"><span v-html="personItem.workId"></span></el-col>
          <el-col :span="3"><el-button size="small" @click="editWorkId"><span class="btn-label">修改</span></el-button></el-col>
        </el-row>
        <el-row class="row-item">
          <el-col :span="2" class="left-part"><span class="left-part">部门：</span></el-col>
          <el-col :span="8" ><span v-html="personItem.group"></span></el-col>
        </el-row>

      </div>
      <!--Dialog_editNickname-->
      <editNickname :editNicknameDialog="editNicknameDialog" :person="personItem"
                    @close="closeModel" @refresh="getUserInfo"></editNickname>
      <!--Dialog_editNickname-->
      <!--Dialog_editEmail-->
      <editEmail :editEmailDialog="editEmailDialog" :person="personItem"
                 @close="closeModel" @refresh="getUserInfo"></editEmail>
      <!--Dialog_editEmail-->
      <!--Dialog_editPhone-->
      <editPhone :editPhoneDialog="editPhoneDialog" :person="personItem"
                 @close="closeModel" @refresh="getUserInfo"></editPhone>
      <!--Dialog_editPhone-->
      <!--Dialog_editWorkId-->
      <editWorkId :editWorkIdDialog="editWorkIdDialog" :person="personItem"
                 @close="closeModel" @refresh="getUserInfo"></editWorkId>
      <!--Dialog_editWorkId-->
    </el-card>
</template>

<script>
  import editNickname from './editPersonInfo/editNickname'
  import editEmail from './editPersonInfo/editEmail'
  import editPhone from './editPersonInfo/editPhone'
  import editWorkId from './editPersonInfo/editWorkId'
    export default {
        name: "PersonInfo",
      data(){
          return{
            personItem:{
              username:'',
              nickname:'',
              email:'',
              phone:'',
              workId:''
            },
            editNicknameDialog:false,
            editEmailDialog:false,
            editPhoneDialog:false,
            editWorkIdDialog:false
          }
      },
      created(){
        this.getUserInfo();
      },
      methods:{
          getUserInfo(){
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
        editNickname(){
            this.editNicknameDialog=true;
        },
        editEmail(){
          this.editEmailDialog=true;
        },
        editPhone(){
          this.editPhoneDialog=true;
        },
        editWorkId(){
          this.editWorkIdDialog=true;
        },
        closeModel() {//关闭弹窗-父子关联(:before-close+方法不能含参数)
          this.editNicknameDialog = false;
          this.editEmailDialog = false;
          this.editPhoneDialog = false;
          this.editWorkIdDialog=false;
        },
      },
      components:{editNickname,editEmail,editPhone,editWorkId}
    }
</script>

<style scoped>
  .personInfo span{color: #ffffff}
  .personInfo button .btn-label{color: #000000}
p{
  color: #ffffff;
  font-size: x-large;
  border-left: #ffffff solid 7px;
  padding-left: 2%;
  margin-left: 2%;
  margin-top: 2%;
}

  .row-item{
    margin: 2% auto 2% 5%;
  }

  span{
    font-size: 130%;
  }

  .left-part{
    text-align: right;
  }

  .btn-label{
    color: #000000;
    font-size: medium;
  }
</style>
