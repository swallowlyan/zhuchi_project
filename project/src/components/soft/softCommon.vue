<template>
    <div id="softList">
        <el-row class="searchForm">
          <el-col :span="2" :offset="4"><h1 style="font-size: 30px;font-weight: normal">工业软件</h1></el-col>
          <el-col :span="10" :offset="1">
            <el-col :span="5">
              <el-select v-model="searchType" placeholder="请选择分类" size="medium">
                <el-option
                  v-for="item in searchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="18">
              <el-col :span="16"><el-input v-model="searchInput" placeholder="请输入内容" size="medium"></el-input></el-col>
              <el-col :span="2"><router-link  to="/soft" ><el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button></router-link></el-col>
            </el-col>
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
      <router-view/>
    </div>
</template>
<script>
    export default {
        name: "softList",
      components:{},
      data(){
          return{
            searchType:"",
            searchInput:"",
            searchOptions:[
              {label:"",value:""}
            ]
          }
      },
      methods:{
          //查找软件
          searchSoft(val){
              console.info(val);
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
