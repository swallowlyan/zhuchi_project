<template>
    <el-card class="purchase-application">
      <el-row>
        <el-col :span="9">
          <el-card class="container" shadow="never">
            <p class="class-head">软件购置申请</p>
            <el-form class="body-part" label-width="30%">
              <el-form-item class="form-item" label="申请购置">
                <el-input class="name-input" v-model="softName" size="mini"></el-input>
              </el-form-item>
              <el-form-item class="form-item" label="所属分类应为" >
                <el-select class="select-kind" v-model="value1" placeholder="请选择一级分类" @change="getCategory2()" size="mini">
                  <el-option v-for="item in category1"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                    <span class="black">{{item.name}}</span>
                  </el-option>
                </el-select>
                <el-select class="select-kind" v-model="value2" placeholder="请选择二级分类" @change="getCategory3()" size="mini">
                  <el-option v-for="item in category2"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                    <span class="black">{{item.name}}</span>
                  </el-option>
                </el-select>
                <el-select class="select-kind" v-model="value3" placeholder="请选择一级分类" size="mini">
                  <el-option v-for="item in category3"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                    <span class="black">{{item.name}}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="apply()" size="small" type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="1"><img src="../../assets/u40.png"/></el-col>
        <el-col :span="14">
          <el-card class="container" shadow="never">
            <p class="class-head">申请记录</p>
            <el-table class="table-purchase" :data="ApplicationData" style="width: 100%" border
                      :row-style="TableRowStyle"
                      :header-cell-style="TableRowStyle"
                      :cell-style="TableCellStyle">
              <el-table-column class="apply-item" prop="softName" label="软件名" min-width="9%" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column class="apply-item" prop="createTime" label="申请时间" min-width="13%" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column class="apply-item" prop="result" label="高级用户审批" min-width="14%" align="center"></el-table-column>
              <el-table-column class="apply-item" prop="opinion" label="高级用户批注" min-width="14%" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column class="apply-item" prop="adminResult" label="管理员审批" min-width="13%" align="center"></el-table-column>
              <el-table-column class="apply-item" prop="adminOpinion" label="管理员批注" min-width="14%" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column class="apply-item" prop="adminReviewTime" label="审批时间" min-width="14%" align="center" :show-overflow-tooltip="true"></el-table-column>
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
        name: "PurchaseApplication",
      data(){
          return{
            username:'',
            uid:'',
            ApplicationData:[],
            category1:[],
            category2:[],
            category3:[],
            value1:'',
            value2:'',
            value3:'',
            softName:'',
            total:1,
            size:10,
          }
      },

      created(){
          this.init();
        this.getApply();
        this.getCategory1();
      },

      methods:{
          init(){
            this.username = sessionStorage.getItem('username');
            this.uid = sessionStorage.getItem('uid');
          },
        TableRowStyle(){
          return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
        },
        TableCellStyle() {
          // return "padding:0px";
        },
        apply(){
            if(this.softName == ''){
              alert('请输入软件名！');
            }else if(this.value1 == ''){
              alert('请至少选择一个分类！');
            }else {
              this.$axios.post('/soft-purchase/create',{
                softName:this.softName,
                categoryId1:this.value1,
                categoryId2:this.value2,
                categoryId3:this.value3,
                userId:this.userId,
              }).then((res)=>{
                if(res.data.message == '成功'){
                  alert('申请成功！');
                  this.getApply();
                }else {
                  alert(res.data.message);
                }
              }).catch((err)=>{
                alert('申请失败！');
                console.log(err);
              });
            }
        },

        getApply(){
          this.$axios.get('/soft-purchase/approved-history',
            {params:{
                current:1,
                size:this.size,
                uid:this.uid,
              }}
          ).then((res)=>{
            this.ApplicationData=res.data.data.records;
            for(var i=0;i<this.ApplicationData.length;i++){
              if(this.ApplicationData[i].result == '0'){
                this.ApplicationData[i].result = '驳回';
              }else if(this.ApplicationData[i].result == '1'){
                this.ApplicationData[i].result = '同意';
              }
              if(this.ApplicationData[i].adminResult == '0'){
                this.ApplicationData[i].adminResult = '驳回';
              }else if(this.ApplicationData[i].adminResult == '1'){
                this.ApplicationData[i].adminResult = '同意';
              }
            }
            this.total=res.data.data.total;
            // console.log(res);
          }).catch((err)=>{
            console.log(err);
          });
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
          this.value2='';
          this.value3='';
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
          this.value3='';
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

        handleCurrentChange(val){
            // console.log(10*(val-1)+1);
            // var cu = 10*(val-1)+1;
          this.$axios.get('/soft-purchase/approved-history',
            {params:{
                current:val,
                size:this.size,
                username:this.username,
              }}
          ).then((res)=>{
            this.ApplicationData=res.data.data.records;
            for(var i=0;i<this.ApplicationData.length;i++){
              if(this.ApplicationData[i].result == '0'){
                this.ApplicationData[i].result = '驳回';
              }else if(this.ApplicationData[i].result == '1'){
                this.ApplicationData[i].result = '同意';
              }
              if(this.ApplicationData[i].adminResult == '0'){
                this.ApplicationData[i].adminResult = '驳回';
              }else if(this.ApplicationData[i].adminResult == '1'){
                this.ApplicationData[i].adminResult = '同意';
              }
            }
            this.total=res.data.data.total;
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          });
        },
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

  .name-input{
    width: 60%;
  }

  .select-kind{
    margin-bottom: 3%;
    width: 60%;
  }

  .body-part{
    margin-top: 5%;
    margin-left: 8%;
  }

  .form-item .el-form-item__label{
    color: #ffffff;
  }

  .table-purchase{
    /*margin-left: 5%;*/
    margin-top: 5%;
  }

  .el-option__label{
    color: black;
  }

  .black {
    color: #606266;
  }
  /*.apply-item,.el-table-column__label{*/
    /*color: #2c3e50;*/
    /*font-size: small;*/
  /*}*/

  .page-part{
    margin-top: 15px;
    float: right;
  }
</style>
<style>
  .table-purchase .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
</style>
