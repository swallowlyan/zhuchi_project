<template>
    <div>

      <el-row class="searchTypes">
        <el-row>
          <el-col :span="16" :offset="4">
            <el-card class="box-card">
              <el-row class="type">
                <el-col :span="3"><span>领域分类：</span></el-col>
                <el-col :span="2"><el-button type="text" @click="getSoft('')">全部</el-button></el-col>
                <el-col :span="3" v-for="(item,index) in areaTypeList">
                  <el-button type="text" @click="getSoft(item.id)">{{item.fieldName}}</el-button>
                </el-col>
              </el-row>
              <el-row class="type">
                <el-col :span="3"><span>行业分类：</span></el-col>
                <el-col :span="2"><el-button type="text"@click="getSoft('')">全部</el-button></el-col>
                <el-col :span="3" v-for="(item,index) in industryTypeList">
                  <el-button type="text" @click="getSoft(item.id)">{{item.industryName}}</el-button>
                </el-col>
              </el-row>
              <el-row class="type">
                <el-col :span="3"><span>交付方式：</span></el-col>
                <el-col :span="2"><el-button type="text"@click="getSoft('')">全部</el-button></el-col>
                <el-col :span="3" v-for="(item,index) in payTypeList">
                  <el-button type="text" @click="getSoft(item.id)">{{item.deliverType}}</el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>

      </el-row>
      <el-row class="searchTables">
        <el-col :span="16" :offset="4">
          <el-card class="box-card">
            <div slot="header" class="clearfix" style="height: 50px">
              <el-col :span="2" :offset="1"><span>排序：</span></el-col>
              <el-col :span="2"><el-button type="text" @click="searchSoft()">默认</el-button></el-col>
              <el-col :span="3"><el-button type="text"@click="searchSoft()">总销量<i class="el-icon-top"></i></el-button></el-col>
              <el-col :span="3"><el-button type="text"@click="searchSoft()">上架时间<i class="el-icon-top"></i></el-button></el-col>
              <el-col :span="2"><el-button type="text"@click="searchSoft()">评分<i class="el-icon-top"></i></el-button></el-col>
              <el-col :span="2"><el-button type="text"@click="searchSoft()">价格<i class="el-icon-top"></i></el-button></el-col>
            </div>
            <div class="softContent">
              <!--softInfo-->
              <div v-for="(item,index) in softList">
              <el-row >
                <el-col :span="2" class="softImg">
                    <el-button type="text" @click="toDetail(item)">
                      <img :src="'data:image/jpg;base64,'+item.softIcon" height="80" width="80">
                    </el-button>
                </el-col>
                <el-col :span="5" class="softInfo">
                  <el-row><h3 class="softName">{{item.softName}}</h3></el-row>
                  <el-row><span class="company">{{item.creator}}</span></el-row>
                  <el-row><span class="info">{{item.description}}</span></el-row>
                </el-col>
                <el-col :span="5" style="margin-top: 10px">
                  <el-row>
                    <el-col :span="6">评分：</el-col>
                    <el-col :span="16"><el-rate
                      v-model="testScore"
                      disabled
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate></el-col>
                  </el-row>
                  <el-row style="margin-top: 15px;"><span class="saleCount">月销量10件</span></el-row>
                </el-col>
                <el-col :span="3"><h3 class="money" style="margin: 10px 0px">￥500000</h3></el-col>
                <el-col :span="3"><el-button type="text"><i class="fa fa-heart-o"></i></el-button>点击收藏</el-col>
                <el-col :span="4" style="margin-top: 5px">
                  <el-row><el-button type="button"size="medium">点击获取</el-button></el-row>
                  <el-row style="margin-top: 10px"><span class="pay">交付方式：SAAS</span></el-row>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              </div>
              <!--softInfo-->
              <!--page-->
              <el-row style="text-align: center">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 15]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "softCommon",
      data(){
        return{
          menuName:"",
          commonSearch:"",
          testScore:3.8,
          menuId:"",
          areaTypeList:[],
          industryTypeList:[],
          payTypeList:[],
          softList:[],
          currentPage:0,
          pageSize:0,
          total:0,
          param:{
            current:1,
            size:5,
            sort:'id',
            dir:'asc'
          }
        }
      },
      created(){
        this.menuId=this.$route.params.menuId;
        this.menuName=this.$route.params.menuName;
          this.getAreaType();this.getIndustryType();this.getPayType();
          this.searchSoftByMenu();
      },
      watch: {
        '$route' (to, from) {
          this.$router.go(0);
        }
      },
      props: {
          searchCommon:{
            type:String,
            default(){return ""}
          }
      },
      methods:{
          //获取分类
        getAreaType(){
          this.$axios.get('/field-cate/list-all').then((res)=>{
            if(res.data.data.length>0)this.areaTypeList=res.data.data;
          }).catch((err)=>{
            console.log(err);
          });
        },
        getIndustryType(){
          this.$axios.get('/industry-cate/list-all').then((res)=>{
            if(res.data.data.length>0)this.industryTypeList=res.data.data;
          }).catch((err)=>{
            console.log(err);
          });
        },
        getPayType(){
          this.$axios.get('/deliver-type/list-all').then((res)=>{
            if(res.data.data.length>0)this.payTypeList=res.data.data;
          }).catch((err)=>{
            console.log(err);
          });
        },
        //查找软件
        searchSoftByMenu(){
          this.param.menuId=this.menuId;
          this.$axios.post('/soft-detail/getSoftsByMenu',this.param).then((res)=>{
            this.total=res.data.data.total;
            this.currentPage=res.data.data.current;
            this.pageSize=res.data.data.size;
            this.softList=res.data.data.records;
          }).catch((err)=>{
            console.log(err);
          });
        },
        getSoft(val){
          this.param.softName=this.searchInput;
          this.param.softMenu=this.menuId;
          this.param.softCategory=val;
          this.$axios.post('/soft-detail/search-softs',this.param).then((res)=>{
            this.total=res.data.data.total;
            this.currentPage=res.data.data.current;
            this.pageSize=res.data.data.size;
            this.softList=res.data.data.records;
          }).catch((err)=>{
            console.log(err);
          });
        },
        handleSizeChange(val) {
          this.pageSize=val;
          this.param={
            current:1,
            size:val,
            sort:'id',
            dir:'asc'
          };
          this.searchSoft();
        },
        handleCurrentChange(val) {
          this.param={
            current:val,
            size:this.pageSize,
            sort:'id',
            dir:'asc'
          };
          this.searchSoft();
        },
        toDetail(obj){
          this.$emit('getObj', obj);
          this.$router.push({name: 'softDetail', params: {menuId: this.menuId,menuName:this.menuName}});
        }
      }
    }
</script>

<style scoped>
  .searchTypes{margin: 5px 0px}
  .searchTypes .type{margin: 20px 0px}
  .softImg{margin: 5px}
  .softContent span{font-size: 13px}
  .softInfo{margin-top: 10px}
  .softContent{max-height: 800px;overflow: auto}
  .searchTypes button,.el-card__header button{padding: 0px}
  .el-card__header .el-col{margin-bottom: 5px}
  .searchForm{
    margin-top: 30px;
  }
  .softContent span{font-size: 13px}
  el-card__header button{padding: 0px}
</style>
