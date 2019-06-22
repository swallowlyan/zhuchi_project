<template>
    <div id="softList">
      <el-row class="searchForm">
        <el-col :span="3" :offset="4"><h1 style="font-size: 30px;font-weight: normal">{{menuName}}</h1></el-col>
        <el-col :span="10" :offset="1">
          <el-row>
            <!--<el-col :span="5">
              <el-select v-model="searchType" placeholder="请选择分类" size="medium">
                <el-option
                  v-for="item in searchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>-->
            <el-col :span="19">
              <el-col :span="17"><el-input v-model="searchInput" placeholder="请输入内容" size="medium" ></el-input></el-col>
              <el-col :span="2"><el-button type="primary" icon="el-icon-search" size="medium" @click="searchSoft()">搜索</el-button></el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" style="margin: 20px 0px">
                <span>热门搜索：
                  <el-button type="text">研发统计</el-button>
                  <el-button type="text">生产制造</el-button>
                  <el-button type="text">creo</el-button>
                </span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <router-view ref="list" :searchCommon="searchInput" :menuName="menuName" :menuId_pro="menuId_pro" v-on:getObj="getDetailObj" :detail="detailObj"></router-view>
    </div>
</template>
<script>
    export default {
        name: "softList",
      components:{},
      data(){
          return{
            title:"",
            searchType:"0",
            searchInput:"",
            searchOptions:[
              {label:"领域分类",value:"0"},
              {label:"行业分类",value:"1"},
              {label:"交付方式",value:"2"}
            ],
            searchVal:"",
            detailObj:{}
          }
      },
      props:{
        menuName:{
          type:String,
          default(){return ""}
        },
        menuId_pro:{
          type:Number,
          default(){return 0}
        }
      },
      methods:{
          //查找软件
          searchSoft(){
            if(this.$route.path.indexOf("Detail")>-1){
              this.$router.push({path: '/soft'});
            }else{
              this.$refs.list.getSoft();
            }
          },
        getDetailObj(obj){
            this.detailObj=obj;
            this.$router.push({path: '/soft/softDetail'});
        },
        initPage(id){
          this.$refs.list.initPage(id);
        }
      }
    }
</script>

<style scoped>
  .el-card__header .el-col{margin-bottom: 5px}
.searchForm{
  margin-top: 30px;
}
  .softContent span{font-size: 13px}
  el-card__header button{padding: 0px}
</style>
