<template>
  <el-card class="time-record-manage" style="min-height: 900px">
    <div class="text item">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="el-header" style="margin-bottom: 20px">
              <div class="header_separator"></div>
              <h3>使用时长</h3>
            </div>
            <div class="el-content">
              <el-row>
                <el-form :model="searchItem_timerecord" ref="searchItem_timerecord" :rules="searchRules"
                         class="demo-form-inline frequencyForm">
                  <el-col :span="4">
                    <el-form-item>
                      <el-select v-model="searchItem_timerecord.groupItem" :placeholder="groupItem.title" @change="changeGroup">
                        <el-option v-for="item in groupItem.options"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item>
                      <el-select v-model="searchItem_timerecord.personItem" :placeholder="personItem.title" @change="getPerson">
                        <el-option v-for="item in personItem.options"
                                   :key="item.username"
                                   :label="item.nickname"
                                   :value="item.username">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item prop="thirdItem">
                      <el-date-picker
                        v-model="searchItem_timerecord.timeItem"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                      <el-button type="primary" @click="searchTimeRecord('searchItem_timerecord')">查询</el-button>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
              <div class="search-results">
                <div class="header" v-html="resultTitle"></div>
                <div class="content">
                  <el-row>
                    <el-col :span="10">
                      <div class="grid-content bg-purple" style="margin-right: 10px;padding: 20px">
                        <div id="times_chart" style="height: 300px;"></div>
                      </div></el-col>
                  </el-row>
                  <el-col :span="18">
                  <div style="padding: 20px;max-height: 300px;overflow: auto">
                    <el-table :data="table_timerecord" border size="medium" @sort-change="changeTableSort"
                              :row-style="TableRowStyle" :header-cell-style="TableRowStyle"  class="frequencyTable">
                      <el-table-column prop="softName" label="软件名" sortable></el-table-column>
                      <el-table-column prop="softVersion" label="版本号"></el-table-column>
                      <el-table-column prop="softCategory" label="所属分类" sortable></el-table-column>
                      <el-table-column prop="cishu" label="使用次数" sortable></el-table-column>
                      <!--<el-table-column prop="time" label="使用时长"></el-table-column>-->
                      <!--<el-table-column prop="rijun" label="日均使用时长" sortable></el-table-column>-->
                    </el-table>
                  </div>
                  </el-col>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "TimeRecordManage",
    data(){
      return{
        currentGroup:'',
        currentPerson:'',
        resultTitle:'',
        result_xData:[],
        result_yData:[],
        table_timerecord:[],
        searchItem_timerecord:{
          groupItem:'',
          personItem:'',
          timeItem:''
        },
        groupItem:{
          title:'请选择查询组别',
          options:[]
        },
        personItem:{
          title:'请选择查询人员',
          options:[]
        },
        searchRules:{
          groupItem: [
            {required: true, message: '请选择查询组别'},
          ],
          personItem: [
            {required: true, message: '请选择查询人员'},
          ],
          timeItem: [
            {required: true, message: '请选择查询时间'},
          ]
        }
      }
    },
    mounted(){
      this.getAllGroup();
      this.drawBar('times_chart','使用时长',["MathCAD","Proe4.0","Creo","Sinovation"],[5, 20, 16, 10]);
    },
    methods:{
      getAllGroup(){//获取部门
        this.$axios.get('/wc-group/groups')
          .then((res)=>{
            this.groupItem.options=res.data.data;
          })
          .catch((err)=>{
            console.log("error");
          });
      },
      changeGroup(val){//修改部门后查找部门下激活的用户
        let obj = {};
        obj = this.groupItem.options.find((item)=>{
          return item.id === val;
        });
        this.currentGroup=obj.name;
        this.$axios.get('/sysuser/group-users',
          {
            params:{
              groupId:val
            }
          })
          .then((res)=>{
            if(res.data.data.length>0){
              this.personItem.options=res.data.data;
            }
          })
          .catch((err)=>{
            console.log("error");
          });
      },
      getPerson(val){
        let obj = {};
        obj = this.personItem.options.find((item)=>{
          return item.username === val;
        });
        this.currentPerson=obj.nickname;
      },
      searchTimeRecord(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.resultTitle=this.currentGroup+this.currentPerson+'，'
              +this.searchItem_timerecord.timeItem[0]+"至"+this.searchItem_timerecord.timeItem[1]
              +"软件使用记录如下：";
            let param={
              groupId:this.searchItem_timerecord.groupItem,
              username:this.searchItem_timerecord.personItem,
              startDate:this.searchItem_timerecord.timeItem[0],
              endDate:this.searchItem_timerecord.timeItem[1]
            };
            ///////////图表
            this.$axios.get('/statistics/shichang-charts',{
              params:param
            }).then((res)=>{
              if(res.data.shichang!==null){
                this.drawBar('times_chart','使用时长',res.data.shichang.xData,res.data.shichang.yData);
              }else{
                this.drawBar('times_chart','使用时长',[],[]);
              }
            }).catch((err)=>{
              console.log(err);
            });
            /////////////////table
            this.$axios.get('/statistics/shichang-talbe',{
              params:param
            }).then((res)=>{
              this.table_timerecord=res.data.table;
            }).catch((err)=>{
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      changeTableSort(){
        console.log(column);
      },
      drawBar(id,title,xData,yData){
        let myChart = this.$echarts.init(document.getElementById(id));
        myChart.setOption({
          title: {
            text: title,
            left:'center'
          },
          tooltip: {},
          legend:{
            left:'center',
            bottom:'0'
          },
          grid:{
            backgroundColor:"#ffffff"
          },
          xAxis: {
            data: xData
          },
          yAxis: {},
          series: [{
            name: title,
            type: 'bar',
            itemStyle:{
              color:"#5B9BD5"
            },
            data: yData
          }],
          // backgroundColor:"#f9f9f9"
        });
        window.onresize = myChart.resize;
      },
      /**
       * @return {string}
       */
      TableRowStyle() {
        return "color:#ffffff;background-color: #698A8F;text-align:center;height:0";
      },
      /**
       * @return {string}
       */
      /*TableCellStyle() {
        return "padding:0px";
      },*/
    }
  }
</script>

<style scoped>
  .text {
    color: #ffffff;
  }
  .header_separator {
    float: left;
    width: 5px;
    height: 25px;
    margin-right: 10px;
    background: #ffffff;
  }
</style>
<style>
  .frequencyForm .el-select{margin: 0px 10px}
  .frequencyTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
</style>
