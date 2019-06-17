<template>
    <div class="software-item">
      <!--<a href="javascript:void(0)" @click="openSoft()"><img src="../assets/software-logo/01.png"></a>-->
      <a href="javascript:void(0)" @click="openSoft()"><img class="icon-img" :src="imgUrl"></a>
      <!--<p>Creo</p>-->
      <p class="soft-name">{{softName}}</p>
    </div>
</template>

<script>
  import {Base64} from '../scripts/base64'
  import {baseUrl} from '../scripts/config';
  export default {
        name: "SoftwareItem",

      data(){
        return{
          // softwareId:'001',
          username:'',
          roleId:'',
        }
      },

      props:['imgUrl','softName','softwareId'],

      created(){
          this.username=sessionStorage.getItem('username');
          this.roleId=sessionStorage.getItem('roleId');
        // console.log(this.imgUrl);
      },

      methods:{
        openSoft(){
          const loading = this.$loading({
            lock: true,
            text: '正在打开软件……',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          // setTimeout(() => {
          //
          // }, 60000);
          console.log(this.softwareId);
          this.$axios.post('/send-request/use-desktop',{
            username:this.username,
            softwareId:this.softwareId,
          }).then((res)=>{
            // console.log(res);
            if(res.data.success === true){
              setTimeout(()=>{
                window.open(res.data.desktopAddr);
                loading.close();
                if (this.roleId == 2) {
                  this.$router.push('/main-page/senior-user-manage/running-software');
                } else {
                  this.$router.push('/main-page/general-user-manage/running-software');
                }
              },5000);
            }else {
              loading.close();
              alert('打开软件失败，请重试或联系管理员！');
            }
            // console.log(res.data);
          }).catch((err)=>{
            loading.close();
            alert('打开软件失败，请重试或联系管理员！');
            console.log(err);
          });
        },
      },
    }
</script>

<style scoped>
  .soft-name{
  color: #ffffff;
  margin-top: 10px;
  margin-bottom: 10px;
    font-size: small;
  /*text-align: center;*/
}

  .software-item{
    text-align: center;
  }

  .icon-img{
    margin-top: 10px;
    width: 70px;
    height: 70px;
  }
</style>
