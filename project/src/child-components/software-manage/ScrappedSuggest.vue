<template>
    <el-card class="scrapped-suggest">
      <el-row>
        <el-col :span="9">
          <el-card class="container" shadow="never">
            <p class="class-head">软件报废建议</p>
            <el-form class="body-part-2" :label-position="labelPosition">
              <el-form-item class="form-item" label="请选择要建议报废的软件">
                <el-select class="select-soft" v-model="value1" placeholder="请选择一级分类" @change="onSelect1Change()" size="mini">
                  <el-option v-for="item in category1"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id"
                              class="op-cate">
                    <span class="black">{{item.name}}</span>
                  </el-option>
                </el-select>
                <el-select class="select-soft" v-model="value2" placeholder="请选择二级分类" @change="onSelect2Change()" size="mini">
                  <el-option v-for="item in category2"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                    <span class="black">{{item.name}}</span>
                  </el-option>
                </el-select>
                <el-select class="select-soft" v-model="value3" placeholder="请选择三级分类" @change="onSelect3Change()" size="mini">
                  <el-option v-for="item in category3"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                    <span class="black">{{item.name}}</span>
                  </el-option>
                </el-select>
                <el-select class="select-soft" v-model="softId" placeholder="请选择软件" @change="onSelect4Change()" size="mini">
                  <el-option v-for="item in softwares"
                             :key="item.id"
                             :label="item.softName"
                             :value="item.id">
                    <span class="black">{{item.softName}}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="form-item" label="报废理由：">
                <el-input class="scrap-reason" type="textarea" :rows="5" v-model="reason"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn-summit" @click="summitData()" size="small" type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="1"><img src="../../assets/u40.png"/></el-col>
        <el-col :span="14">
          <el-card class="container" shadow="never">
            <p class="class-head">申请记录</p>
            <el-table class="table-scrap" :data="ApplicationData" style="width: 100%" border
                      :row-style="TableRowStyle"
                      :header-cell-style="TableRowStyle"
                      :cell-style="TableCellStyle">
              <el-table-column class="apply-item" prop="softName" label="软件名" min-width="9%" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column class="apply-item" prop="time" label="申请时间" min-width="13%" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column class="apply-item" prop="scrapReason" label="报废理由" min-width="10%" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column class="apply-item" prop="categoryName" label="所属分类" min-width="17%" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column class="apply-item" prop="result" label="管理员审批" min-width="13%" align="center"></el-table-column>
              <el-table-column class="apply-item" prop="reason" label="管理员批注" min-width="14%" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column class="apply-item" prop="remarkTime" label="审批时间" min-width="14%" align="center" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <el-pagination background class="page-part"
                           layout="prev, pager, next"
                           :total="total"
                           @current-change="handleCurrentChange"></el-pagination>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
</template>

<script>
  import {baseUrl} from '../../scripts/config';
  export default {
        name: "ScrappedSuggest",

        data() {
        return {
          labelPosition: 'top',
          category1:[],
          category2:[],
          category3:[],
          softwares:[],
          value1:'',
          value2:'',
          value3:'',
          softName:'',
          reason:'',
          softId:'',
          username:'',
          ApplicationData:[],
          uid:'',
          total:20,
          current:1,
        };
        },

      created(){
        // this.getApply();
        this.init();
        this.getRecord();
        this.getCategory1();
      },

      methods:{
          init(){
            this.username = sessionStorage.getItem('username');
            this.uid=sessionStorage.getItem('uid');
          },
        TableRowStyle(){
          return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
        },
        TableCellStyle() {
          // return "word-break: keep-all;white-space:nowrap;";
        },

        getRecord(){
          this.$axios.get('/soft-scrap',{
            params:{
              current:this.current,
              size:10,
              uid:this.uid,
            }
          }).then((res)=>{
            this.ApplicationData = res.data.data.records;
            for(var i=0;i<this.ApplicationData.length;i++){
              if(this.ApplicationData[i].result == '0'){
                this.ApplicationData[i].result = '驳回';
              }else if(this.ApplicationData[i].result == '1'){
                this.ApplicationData[i].result = '同意';
              }
            }
            this.total = res.data.data.total;
            // console.log(res);
          }).catch((err)=>{
            console.log(err);
          });
        },

        summitData(){
            if(this.softId == ''){
              alert('请选择软件！');
            }else if(this.reason == ''){
              alert('请输入报废理由！');
            }else {
              this.$axios.post('/soft-scrap/create',{
                uid:this.uid,
                softId:this.softId,
                scrapReason:this.reason,
              }).then((res)=>{
                if(res.data.message == '成功'){
                  alert('申请成功!');
                  this.getRecord();
                }else {
                  alert('申请失败，请重试或联系管理员！');
                }
                console.log(res);
              }).catch((err)=>{
                alert('申请失败，请重试或联系管理员！');
                console.log(err);
              });
            }
        },

        onSelect1Change(){
          this.value2='';
          this.value3='';
          this.softId='';
          this.getCategory2();
          this.getSoftware(this.value1);
        },
        onSelect2Change(){
          this.value3='';
          this.softId='';
          this.getCategory3();
          this.getSoftware(this.value2);
        },
        onSelect3Change(){
          this.softId='';
          this.getSoftware(this.value3);
        },
        onSelect4Change(){

        },

        getCategory1(){
          this.$axios.get('/soft-category'
          ).then((res)=>{
            // console.log(res);
            this.category1=res.data.data;
            // console.log(this.category1[0].id);
          }).catch((err)=>{
            console.log(err);
          });
        },

        getCategory2(){
          this.$axios.get('/soft-category',
            {params:{
                parentId:this.value1,
              }}
          ).then((res)=>{
            // console.log(res);
            this.category2=res.data.data;
            // console.log(this.category2[0].id);
          }).catch((err)=>{
            console.log(err);
          });
        },

        getCategory3(){
          this.$axios.get('/soft-category',
            {params:{
                parentId:this.value2,
              }}
          ).then((res)=>{
            // console.log(res);
            this.category3=res.data.data;
            // console.log(this.category1[0].id);
          }).catch((err)=>{
            console.log(err);
          });
        },

        getSoftware(categoryId){
            // console.log(categoryId);
          this.$axios.post('/soft-detail/getSoftsByCategory',{
            categoryId:categoryId,
            username:this.username,
            current:1,
            size:30,
          }).then((res)=>{
            this.softwares=res.data.data.records;
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          })
        },

        handleCurrentChange(val){
            this.current=val;
            this.getRecord();
        }
      },
    }
</script>

<style>
  .class-head{
    color: #ffffff;
    font-size: x-large;
    border-left: #ffffff solid 7px;
    padding-left: 2%;
    margin-left: 2%;
    margin-top: 2%;
  }

  .select-soft{
    margin-bottom: 3%;
    width: 70%;
  }

  .form-item .el-form-item__label{
    color: #ffffff;
  }

  .btn-summit{
    margin-left: 25%;
  }

  .body-part-2{
    margin-top: 5%;
    margin-left: 15%;
  }

  .table-scrap{
    /*margin-left: 5%;*/
    margin-top: 5%;
  }

  .scrap-reason{
    width: 70%;
  }
  .black {
    color: #606266;
  }
  /*.op-cate .el-option__label{*/
    /*color: black !important;*/
  /*}*/

  .page-part{
    margin-top: 15px;
    float: right;
  }

  .table-scrap .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
</style>
