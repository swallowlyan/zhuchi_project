<template>
    <el-card class="software-list">
       <!--<el-card class="design">-->
         <!--<div slot="header" class="type-head">-->
           <!--<span>设计类</span>-->
         <!--</div>-->
         <!--<div class="body">-->
           <!--<el-row>-->
             <!--<el-col :span="4" v-for="o in 4"><software-item></software-item></el-col>-->
           <!--</el-row>-->
         <!--</div>-->
       <!--</el-card>-->
       <!--<el-card class="office">-->
            <!--<div slot="header" class="type-head">-->
              <!--<span>日常办公类</span>-->
            <!--</div>-->
            <!--<div class="body">-->
              <!--<el-row>-->
                <!--<el-col :span="4" v-for="o in 3"><software-item></software-item></el-col>-->
              <!--</el-row>-->
            <!--</div>-->
          <!--</el-card>-->
      <!--<software-group></software-group>-->
      <!--<software-group></software-group>-->
      <search-component :length="17" :distance="2" class="search-part"></search-component>
      <div v-for="cate in availableSoft" class="scroll-bar">
        <software-group :type-name="cate.categoryName" :softs="cate.softs" :count="6" :cate-id="cate.categoryId1" :multi-line="multiLine" :soft-width="3"></software-group>
      </div>
    </el-card>
</template>

<script>
    import SoftwareItem from "../../base-component/SoftwareItem";
    import SoftwareGroup from "./SoftwareGroup/SoftwareGroup";
	import {baseUrl} from '../../scripts/config'
    import SearchComponent from "./SoftwareGroup/SearchComponent";
    export default {
        name: "SoftwareList",
      components: {SearchComponent, SoftwareGroup, SoftwareItem},

      data(){
        return{
          username:'',
          availableLimit:8,
          availableSoft:[],

          searchContent:'',
          roleId:'',
          cateId:'',
          multiLine:false,
        }
      },

      created(){
        eventBus.$on('cateId',(val)=>{
          if(val == 'all'){
            this.multiLine = false;
            this.getAvailableSoft();
          }else {
            this.cateId = val;
            this.multiLine = true;
            this.getAvailableSoftByCate();
          }
        });
        this.init();
        // this.getAvailableSoft();
        // this.getAvailableSoftByCate();
      },

      beforeDestroy(){
        eventBus.$off('cateId');
      },

      methods:{
          init(){
              this.username=sessionStorage.getItem('username');
              this.cateId=sessionStorage.getItem('cateId');
              if(this.cateId == 'all'){
                this.multiLine = false;
                this.getAvailableSoft();
              }else {
                this.multiLine = true;
                this.getAvailableSoftByCate();
              }
          },
        toSearch(){
          sessionStorage.setItem('searchWord',this.searchContent);
          this.roleId = sessionStorage.getItem("roleId");
          if (this.roleId == 2) {
            this.$router.push('/main-page/senior-user-manage/software-search');
          } else {
            this.$router.push('/main-page/general-user-manage/software-search');
          }
        },

        getAvailableSoft(){//获取可用软件
          this.availableSoft = [];
          var availableUrl='/wc-index/available-softs';
          this.$axios.get(
            availableUrl,{params:{
                username:this.username,
                // limit:this.availableLimit,
              }}
          ).then((res)=>{
            this.availableSoft=res.data.data;
            // console.log(this.username);
            // console.log(res.data.data);
          })
            .catch((err)=>{
              console.log(err);
            });
        },

        getAvailableSoftByCate(){
          this.availableSoft = [];
          this.$axios.get('/wc-index/soft-more',{
            params:{
              username:this.username,
              categoryId:this.cateId,
            }
          }).then((res)=>{
            // console.log(res.data.data.child);
            this.availableSoft=res.data.data.child
          }).catch((err)=>{
            console.log(err);
          });
        }
      }
    }
</script>

<style scoped>
  .search-part{
    margin-left: 70%;
  }

  .software-list{
    height: 900px;
  }

  .scroll-bar{
    overflow:auto;
  }
</style>
