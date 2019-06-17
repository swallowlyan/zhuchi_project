<template>
  <el-card class="commonly-used">
    <search-component :length="17" :distance="2" class="search-part"></search-component>
    <el-row>
      <el-col :span="4" v-for="soft in softs">
        <software-item :img-url="soft.icon" :soft-name="soft.name" :software-id="soft.id"></software-item>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import SoftwareItem from "../../base-component/SoftwareItem";
  import {baseUrl} from '../../scripts/config';
  import SearchComponent from "./SoftwareGroup/SearchComponent";
  export default {
    name: "CommonlyUsed",
    components: {SearchComponent, SoftwareItem},

    data(){
      return{
        username:"",
        recentLimit:4,
        softs:[],

        searchContent:'',
        roleId:'',
      }
    },

    created(){
      this.username=sessionStorage.getItem('username');
      this.getRecent();
    },

    methods:{

      getRecent(){//获取常用软件
        this.$axios.get('/wc-index/recent-softs',
          {params:{
              username:this.username,
              limit:this.recentLimit,
            }}
        ).then((res)=>{
          if(res.data.data !== "无使用记录"){
            this.softs=res.data.data;
            for(var i=0;i<this.softs.length;i++){
              if(this.softs[i].icon == null || this.softs[i].icon == ''){
                this.softs[i].icon = require('../../assets/software-logo/icon.png');
              }else {
                this.softs[i].icon ="data:image/jpg;base64," + this.softs[i].icon;
              }
              // this.softs[i].icon ="data:image/jpg;base64," + this.softs[i].icon;
            }
            // console.log(this.softs);
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
    },
  }
</script>

<style scoped>
.search-part{
  margin-left: 70%;
}

  .commonly-used{
    height: 900px;
  }
</style>
