<template>
    <el-card class="software-manage">
      <el-row>
        <el-col :span="6"><a href="javascript:void(0)" @click="toManagePanel" class="head-href">软件管理</a></el-col>
        <el-col :span="6" :offset="12">
          <search-component :length="17" :distance="2"></search-component>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-card class="commonly-used container" shadow="never">
            <div class="region-head region-head-1">
              <span class="span-head">常用软件</span>
            </div>
            <div class="body" v-for="soft in recentSofts">
              <software-item :img-url="soft.icon" :soft-name="soft.name" :software-id="soft.id"></software-item>
            </div>
          </el-card>
        </el-col>
        <el-col :span="1"><img src="../../assets/u40.png"/></el-col>
        <el-col :span="19">
          <el-card class="available-software container" shadow="never">
            <div class="region-head">
              <span class="span-head">可用软件列表</span>
            </div>
            <div class="body" v-for="cate in availableSofts">
              <software-group :type-name="cate.categoryName" :softs="cate.softs" :count="4" :cate-id="cate.categoryId1" :multi-line="false" :soft-width="4"></software-group>
            <!--<div class="body">-->
              <!--<el-card class="design container" shadow="never">-->
                <!--<div class="type-head">-->
                  <!--<span>设计类</span>-->
                <!--</div>-->
                <!--<div class="body type-body">-->
                  <!--<el-row>-->
                    <!--<el-col :span="3" v-for="o in 5"><software-item></software-item></el-col>-->
                    <!--<el-col :span="3" :offset="1"><a href="javascript:void (0)" @click="">更多>></a></el-col>-->
                  <!--</el-row>-->
                <!--</div>-->
              <!--</el-card>-->
              <!--<el-card class="office container" shadow="never">-->
                <!--<div class="type-head">-->
                  <!--<span>日常办公类</span>-->
                <!--</div>-->
                <!--<div class="body type-body">-->
                  <!--<el-row>-->
                    <!--<el-col :span="3" v-for="o in 5"><software-item></software-item></el-col>-->
                    <!--<el-col :span="3" :offset="1"><a class="more-click" href="javascript:void (0)" @click="">更多>></a></el-col>-->
                  <!--</el-row>-->
                <!--</div>-->
              <!--</el-card>-->
            </div>
        </el-card>
        </el-col>
      </el-row>
    </el-card>
</template>

<script>
    import SoftwareItem from "../../base-component/SoftwareItem";
    import {baseUrl} from '../../scripts/config'
    import SoftwareGroup from "./SoftwareGroup/SoftwareGroup";
    import SearchComponent from "./SoftwareGroup/SearchComponent";
    export default {
        name: "SoftwareManage",
      components: {SearchComponent, SoftwareGroup, SoftwareItem},

      data(){
        return{
          username:'',
          roleId:'',
          recentLimit:4,
          recentSofts:[],
          // availableLimit:4,
          availableSofts:[],

          searchContent:'',
        }
      },

      created(){
        this.getRoleId();
        this.getRecent();
          this.getAvailableSoft();
      },

      methods:{



          getRoleId(){
            this.username = sessionStorage.getItem('username');
            // console.log(this.username);
            this.roleId = sessionStorage.getItem("roleId");
            // console.log(this.roleId);
          },

        getRecent(){//获取常用软件
            // console.log('----recent-----');
          this.$axios.get('/wc-index/recent-softs',
            {params:{
                username:this.username,
                limit:this.recentLimit,
              }}
          ).then((res)=>{
            if(res.data.data !== "无使用记录"){
              this.recentSofts=res.data.data;
              // console.log(res);
              for(var i=0;i<this.recentSofts.length;i++){
                // i.icon="data:image/jpg;base64,"+i.icon;
                // console.log(this.softs[i]);
                this.recentSofts[i].icon ="data:image/jpg;base64," + this.recentSofts[i].icon;
              }
            }
          }).catch((err)=>{
            console.log(err);
          });
        },

        getAvailableSoft(){//获取可用软件
          var availableUrl='/wc-index/available-softs';
          this.$axios.get(
            availableUrl,{params:{
                username:this.username,
                // limit:this.availableLimit,
              }}
          ).then((res)=>{
            this.availableSofts=res.data.data;
            // console.log(this.username);
            // console.log('----首页-----');
            // console.log(res);
          })
            .catch((err)=>{
              console.log(err);
            });
        },

        toManagePanel(){
          if (this.roleId == 2) {
            this.$router.push('/main-page/senior-user-manage/software-manage');
          } else {
            this.$router.push('/main-page/general-user-manage/software-manage');
          }
        }
      }
    }
</script>

<style>
/*.commonly-used,.available-software,.design,.office{*/
  /*background: rgba(255,255,255,0);!*firefox、chrome*!*/
  /*background: #fff\7;!*IE*!*/
  /*filter: alpha(opacity=0);!*IE*!*/
/*}*/
.type-head{
  border-left: #ffffff solid 9px;
  padding-left: 9px;
}

  a,span{
  }
  .head-href,.span-head{
    color: #ffffff;
  }
/*.el-button--default span{
  color:#000000
}*/
  .region-head-1{
    text-align: center;
  }

  .type-body{
    margin-top: 4%;
  }

  .more-click{
     /*vertical-align: bottom;*/
   }

  input{
    background-color: transparent;
  }
</style>
