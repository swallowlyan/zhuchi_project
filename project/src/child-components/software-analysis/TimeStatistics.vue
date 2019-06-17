<template>
  <el-card class="time-statistics" style="min-height: 900px">
    <div class="text item">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="el-header" style="margin-bottom: 20px">
              <div class="header_separator"></div>
              <h3>时长统计</h3>
            </div>
            <div class="el-content">
              <el-row>
                <el-form :model="searchItem_time" ref="searchItem_time" :rules="searchRules"
                         class="demo-form-inline frequencyForm">
                  <el-col :span="3">
                    <el-form-item>
                      <el-select v-model="searchItem_time.searchType" @change="changeType">
                        <el-option v-for="item in searchTypeArr"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" v-if="ifCategory">
                    <el-form-item>
                      <el-select v-model="searchItem_time.firstItem" :placeholder="firstItem.title" @change="getSecond">
                        <el-option v-for="item in firstItem.options"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" v-if="ifCategory">
                    <el-form-item>
                      <el-select v-model="searchItem_time.secondItem" :placeholder="secondItem.title" @change="getLast">
                        <el-option v-for="item in secondItem.options"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" v-if="ifCategory">
                    <el-form-item>
                      <el-select v-model="searchItem_time.thirdItem" :placeholder="thirdItem.title" @change="getSoft">
                        <el-option v-for="item in thirdItem.options"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" v-if="ifCategory">
                    <el-form-item>
                      <el-select v-model="searchItem_time.softItem" :placeholder="softItem.title">
                        <el-option v-for="item in softItem.options"
                                   :key="item.id"
                                   :label="item.softName"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" v-if="!ifCategory">
                    <el-form-item style="margin: 0px 10px">
                      <el-input v-model="searchItem_time.softName" autocomplete="off" placeholder="请输入查询的软件名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item prop="timeItem">
                      <el-date-picker
                        v-model="searchItem_time.timeItem"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-form-item>
                      <el-button type="primary" @click="searchTime('searchItem_time')">查询</el-button>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
              <div class="search-results">
                <div class="header" v-html="resultTitle"></div>
                <div class="content">
                  <el-row>
                    <el-col :span="20">
                      <div class="grid-content bg-purple" style="margin-right: 10px;padding: 20px">
                        <div id="times_chart" style="height: 300px;"></div>
                      </div></el-col>
                  </el-row>
                  <el-col :span="18">
                  <div style="padding: 20px;max-height: 300px;overflow: auto">
                    <el-table :data="table_time" border size="medium" @sort-change="changeTableSort"
                              :row-style="TableRowStyle" :header-cell-style="TableRowStyle"  class="frequencyTable">
                      <el-table-column prop="softName" label="软件名" sortable></el-table-column>
                      <el-table-column prop="softVersion" label="版本号"></el-table-column>
                      <el-table-column prop="softCategory" label="所属分类" sortable></el-table-column>
                      <el-table-column prop="renci" label="使用人数" sortable></el-table-column>
                      <el-table-column prop="cishu" label="使用时长" sortable></el-table-column>
                      <!--<el-table-column prop="rijun" label="人均使用时长" sortable></el-table-column>-->
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
    name: "TimeStatistics",
    data(){
      return{
        resultTitle:'',
        currentCategory:'',
        result_xData:[],
        result_yData:[],
        table_time:[],
        ifCategory:true,
        searchTypeArr:[
          {label:"分级查询",value:"category"},
          {label:"名称查询",value:"name"}
        ],
        searchItem_time:{
          firstItem:'',
          secondItem:'',
          thirdItem:'',
          softItem:'',
          timeItem:'',
          softName:'',
          searchType:'category'
        },
        firstItem:{
          title:'请选择一级分类',
          options:[]
        },
        secondItem:{
          title:'请选择二级分类',
          options:[]
        },
        thirdItem:{
          title:'请选择三级分类',
          options:[]
        },
        softItem:{
          title:'请选择查询软件',
          options:[]
        },
        timeItem:{
          title:'请选择查询时间',
          options:[
            {
              value: 'day',
              label: '近24小时'
            },{
              value: 'week',
              label: '近一周'
            },{
              value: 'month',
              label: '近一个月'
            },{
              value: 'year',
              label: '近一年'
            }
          ]
        },
        searchRules:{
          firstItem: [
            {required: true, message: '请选择第一分类'},
          ],
          secondItem: [
            {required: true, message: '请选择第二分类'},
          ],
          thirdItem: [
            {required: true, message: '请选择第三分类'},
          ],
          softItem: [
            {required: true, message: '请选择查询软件'},
          ],
          timeItem: [
            {required: true, message: '请选择查询时间'},
          ]
        }
      }
    },
    mounted(){
      this.getFirst();
      this.drawBar('times_chart','使用时长',
        ["MathCAD","Proe4.0","Creo","Sinovation"],
        [5, 20, 16, 10]);
    },
    methods:{
      getFirst(){
        this.$axios.get('/soft-category',).then((res)=>{
          if(res.data.data.length>0){
            this.firstItem.options=res.data.data;
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      getSecond(val){
        let obj = {};
        obj = this.firstItem.options.find((item)=>{
          return item.id === val;
        });
        this.currentCategory=obj.name;
        this.$axios.get('/soft-category',{params:{parentId:val}}).then((res)=>{
          if(res.data.data.length>0){
            this.secondItem.options=res.data.data;
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      getLast(val){
        this.$axios.get('/soft-category',{params:{parentId:val}}).then((res)=>{
          if(res.data.data.length>0){
            this.thirdItem.options=res.data.data;
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      getSoft(val){
        this.$axios.post('/soft-detail/getSoftsByCategory',{categoryId:val}).then((res)=>{
          if(res.data.data.length>0){
            this.softItem.options=res.data.data;
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      changeType(val){
        if(val==="name"){
          this.ifCategory=false;
        }else{
          this.ifCategory=true;
        }
      },
      submitSearch(param){
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
          this.table_time=res.data.table;
        }).catch((err)=>{
          console.log(err);
        });
      },
      searchTime(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.searchItem_time.searchType==="name"){
              if(this.searchItem_time.softName===""){
                this.$message({
                  showClose: true,
                  message: "请输入查询的软件名称",
                  type: 'error'
                });
              }else{
                this.resultTitle=this.searchItem_time.timeItem[0]+
                  "至"+this.searchItem_time.timeItem[1]+"使用时长数据如下：";
                let param={
                  softName:this.searchItem_time.softName,
                  startDate:this.searchItem_time.timeItem[0],
                  endDate:this.searchItem_time.timeItem[1]
                };
                this.submitSearch(param);
              }
            }else{
              this.resultTitle='"'+this.currentCategory+'"分类中软件，'
                +this.searchItem_time.timeItem[0]+"至"+this.searchItem_time.timeItem[1]
                +"使用时长数据如下：";
              let param={
                categoryId1:this.searchItem_time.firstItem,
                categoryId2:this.searchItem_time.secondItem,
                categoryId3:this.searchItem_time.thirdItem,
                softId:this.searchItem_time.softItem,
                startDate:this.searchItem_time.timeItem[0],
                endDate:this.searchItem_time.timeItem[1]
              };
              this.submitSearch(param);
            }
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
