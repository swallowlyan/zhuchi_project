<template>
    <div class="brief-item">
      <el-row>
        <el-col :span="3">
          <!--<a href="javascript:void(0)" @click="openSoft"><img class="icon-img" :src="imgUrl"></a>-->
          <img class="icon-img" :src="imgUrl">
        </el-col>
        <el-col :span="6">
          <p class="soft-name">{{softName}}</p>
          <div v-for="tag in softTag" class="div-tag">
            <el-button class="btn-tag" size="mini" disabled><span class="black">{{tag}}</span></el-button>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="brief">
            <span class="brief-content">{{softBrief}}</span>
          </div>
        </el-col>
        <el-col :span="4" class="btn-region">
          <el-button type="primary" class="btn-use" size="medium" id="use-button" @click="apply" :disabled="able" :style="buttonColor"><span class="white">{{buttonText}}</span></el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {baseUrl} from '../scripts/config'
    export default {
        name: "BriefItem",

      props:['imgUrl','softName','softTag','softBrief','softAuth','softId','able','buttonText','buttonColor'],

      data(){
          return{
            username:'',
            // able:false,
            // buttonText:'申请使用',
            // buttonColor:'background:cornflowerblue;'
          }
      },

      created(){
          this.init()
      },

      methods:{

          init(){
            this.username = sessionStorage.getItem("username");

            if(this.softAuth == 'true' || this.softAuth == 'APPLY'){
              // this.able = true;
            }

            if(this.softAuth == 'true'){
              // this.buttonText = '已拥有使用权';
              // this.buttonColor = 'background:#b0b0b0';
            }else if(this.softAuth == 'APPLY'){
              // this.buttonText = '等待审批';
              // this.buttonColor = 'background:#FF9933';
            }

            // document.getElementById("use-button").disabled = true;
            // console.log(document.getElementById("use-button").disabled);
            // if(this.softAuth == "false"){//未拥有使用权限
            //   return;
            // }
            // if(this.softAuth == "true"){//拥有使用权限
            //   document.getElementById("use-button").span="已拥有使用权限"
            // }
            // if(this.softAuth == "apply"){//正在申请中
            //
            // }
          },

          openSoft(){
            // console.log('----open----');
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              loading.close();
            }, 5000);
            // console.log('----close----');
          },

        apply(){
          this.$axios.post('/soft-use/soft-apply',{
            username:this.username,
            softId:this.softId,
          }).then((res)=>{
            if(res.data.message == "成功"){
              this.buttonText = '等待审批';
              this.buttonColor = 'background:#FF9933';
              this.able = true;
              alert('申请成功！');
              // console.log(res.data.message);
            }else {
              alert('申请失败，请重试或联系管理员！');
            }
          }).catch((err)=>{
            alert('申请失败，请重试或联系管理员！');
            console.log(err);
          });
        },
      },
    }
</script>

<style scoped>
  .soft-name{
    margin-top: 3%;
    color: white;
  }

  .brief-item{
    border-bottom: #ffffff solid 1px;
    padding: 2%;
  }

.brief{
  /*width: 100%;*/
  word-wrap:break-word;
  padding: 1% 10% 0px 7%;
  /*border-right: #ffffff 1px solid;*/
}

  .btn-tag{
    /*width: 20%;*/
    /*margin: 0px;*/
    margin-top: 10%;
    padding:4px 6px;
  }

  .btn-use{
    margin: 15% 15%;
    background: orange;
    border: 0px;
    width: 110%;
  }

  .icon-img{
    width: 70px;
    height: 70px;
  }

  .btn-region{
    border-left: #ffffff 2px solid;
    padding-left: 20px;
  }

  .black{
    color: black;
  }

  .white{
    color: white;
  }

  .brief-content{
    color: white;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .div-tag{
    display: inline;
    margin-right: 2px;
  }
</style>
