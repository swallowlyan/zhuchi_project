<template>
    <el-card class="use-record" style="min-height: 900px">
      <p class="head-class">使用记录</p>
      <el-card class="container recent-use" shadow="never">
        <div class="type-head" slot="header">
          <span>最近使用</span>
        </div>
        <div class="body-part">
          <el-row>
            <el-col :span="4" v-for="(soft,index) in recentSofts">
              <software-item :img-url="soft.icon" :soft-name="soft.name" :software-id="soft.id"></software-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="container statistic" shadow="never">
        <div class="type-head" slot="header">
          <span>数据统计</span>
        </div>
        <div class="body-part">
          <el-form :model="searchItem" ref="searchItem" :rules="searchRules" :inline="true">
            <el-form-item prop="timeItem">
              <el-date-picker
                v-model="searchItem.timeItem"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search('searchItem')">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="RunningData" border style="width: 80%" :row-style="TableRowStyle"
                    :header-cell-style="TableRowStyle" class="useRecordTable">
            <el-table-column prop="softName" label="软件名" min-width="13%" align="center"></el-table-column>
            <el-table-column prop="softVersion" label="版本" min-width="15%" align="center"></el-table-column>
            <el-table-column prop="softCategory" label="所属分类" min-width="18%" align="center"></el-table-column>
            <!--<el-table-column prop="url" label="最后打开时间" min-width="13%" align="center"></el-table-column>
            <el-table-column prop="operation" label="使用时长" min-width="7%" align="center"></el-table-column>-->
            <el-table-column prop="cishu" label="总使用次数" min-width="7%" align="center"></el-table-column>
            <el-table-column prop="rijun" label="日均使用时长" min-width="7%" align="center"></el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-card>
</template>

<script>
    import SoftwareItem from "../../base-component/SoftwareItem";
    export default {
        name: "UseRecord",
      components: {SoftwareItem},
      data(){
        return{
          username:'',
          recentLimit:4,
          recentSofts:[],
          RunningData:[],
          searchItem:{
            timeItem:[]
          },
          searchRules:{
            timeItem:[
              {required: true, message: '请选择查询时间'}
            ]
          }
        }
      },
      created(){
          this.getRecent();
      },
      methods:{
        getRecent(){//获取常用软件
          this.username=sessionStorage.getItem("username");
          this.$axios.get('/wc-index/recent-softs',
            {params:{
                username:this.username,
                limit:this.recentLimit,
              }}
          ).then((res)=>{
           if(res.data.data.length>0){
             this.recentSofts=res.data.data;
             this.recentSofts.forEach(item=>{
               item.icon="data:image/jpg;base64,"+item.icon;
             });
           }
          }).catch((err)=>{
            console.log(err);
          })
        },
        search(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.username=sessionStorage.getItem("username");
              this.$axios.get('/statistics/shichang-talbe',{
                params:{
                  username:this.username,
                  startDate:this.searchItem.timeItem[0],
                  endDate:this.searchItem.timeItem[1]
                }
              }).then((res)=>{
                if(res.data.table.length>0){
                  this.RunningData=res.data.table;
                }
                console.log(res.data);
              }).catch((err)=>{
                console.log(err);
              });
            }else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        /**
         * @return {string}
         */
        TableRowStyle() {
          return "color:#ffffff;background-color: #698A8F;text-align:center;height:0";
        },
      },
    }
</script>

<style scoped>
  .head-class{
    color: #ffffff;
    font-size: x-large;
    border-left: #ffffff solid 7px;
    padding-left: 1%;
    margin-left: 1.5%;
    margin-top: 2%;
  }

  span{
    color: #ffffff;
    font-size: large;
  }
</style>
<style>
  .useRecordTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
</style>
