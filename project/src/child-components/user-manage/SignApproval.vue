<template>
    <el-card class="sign-approval" style="min-height: 900px">
      <div class="text item">
        <el-row>
          <el-col :span="8" style="max-height: 400px;overflow: auto;border-right: 3px dashed #ffffff;">
            <div class="grid-content bg-purple" style="padding-right: 20px;">
              <div class="el-header">
                <div class="header_separator"></div>
                <h3> 用户注册审批</h3>
              </div>
              <div class="el-content">
                  <div class="message" v-for="(item,index) in messageArr">
                    <div class="message-content">
                      <div class="number">{{index+1}}.</div>
                      <div calss="detail" v-html="item"></div>
                    </div>
                    <div class="el-footer" style="text-align: right">
                      <el-button type="success" icon="el-icon-check" circle  @click="approve(index,0)"></el-button><span style="margin: 0px 5px"></span>&nbsp;&nbsp;&nbsp;
                      <el-button type="danger" icon="el-icon-close" circle  @click="approve(index,3)"></el-button><span style="margin: 0px 5px"></span>
                    </div>
                  </div>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light" style="margin-left: 20px">
              <div class="el-header">
                <div class="header_separator"></div>
                <h3>审批记录</h3>
              </div>
              <div class="el-content">
                <el-table :data="tableData_signApp" border size="medium" :row-style="TableRowStyle"
                          :header-cell-style="TableRowStyle" :cell-style="TableCellStyle"  class="signAppTable">
                  <el-table-column prop="username" label="申请人" ></el-table-column>
                  <!--<el-table-column prop="enterpriseName" label="企业名称"></el-table-column>-->
                  <el-table-column prop="phone" label="手机号":show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="email" label="邮箱":show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="created" label="申请时间" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="approveId" label="审批人"></el-table-column>
                  <el-table-column prop="result" label="审批结果" :formatter="formatterResult"></el-table-column>
                  <el-table-column prop="opinion" label="审批批注" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="approveTime" label="审批时间" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
                <el-pagination background @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="signAppCurrent"
                               :page-sizes="[5, 10]"
                               :page-size="signAppSize"
                               layout="total, sizes, prev, pager, next"
                               :total="signAppTotal"
                               style="margin: 20px 0px;float: right">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
</template>

<script>
    export default {
        name: "SignApproval",
      data(){
          return{
            submitUrl:'',
            username:'',
            tableData_signApp:[],
            signAppTotal:0,
            signAppSize:5,
            signAppCurrent:1,
            messageItems:[],
            messageArr:[]
          }
      },
      created(){
        this.getApprove();
        this.initTable();
      },
      methods:{
          getApprove(){
            this.username = sessionStorage.getItem("username");
            // this.username ="admin";
            this.submitUrl = '/sysuser/user-approve';
            this.$axios.post(this.submitUrl,{username:this.username}).then((res)=>{
              if(res.data.data.length>0){
                this.messageArr=[];
                this.messageItems=res.data.data;
                res.data.data.forEach(item=>{
                  let message='用户   "'+item.username+"("+item.nickname+')"   于'+item.created+
                    "申请注册。<br>注册手机号："+item.phone+";<br>注册邮箱:"+item.email+"。";
                  this.messageArr.push(message);
                });
              }
            }).catch((err)=>{
              console.log(err);
            });
          },
        getTableData(param){
          this.submitUrl = '/sysuser/approve-history';
          this.$axios.post(this.submitUrl,param).then((res)=>{
            console.log(res.data);
            if(res.data.data.records.length>0){
              this.tableData_signApp=res.data.data.records;
              this.signAppTotal=res.data.data.total;
            }
          }).catch((err)=>{
            console.log(err);
          });
        },
        initTable(){
          this.username = sessionStorage.getItem("username");
          // this.username ="admin";
          let param={
            current:1,
            size:this.signAppSize,
            username:this.username
          };
          this.getTableData(param);
        },
        approve(index,result){//审批操作
          let messageTip='';
            if(result===0){
              messageTip="同意";
            }else if(result===3){
              messageTip="拒绝";
            }
              this.$confirm('是否确定'+messageTip+'此申请？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.submitUrl = '/sysuser/approve';
                this.$axios.post(this.submitUrl,{
                  username:this.messageItems[index].username,
                  result:result,
                  resultId:this.username
                }).then((res)=>{
                  if(res.data.message==="成功"){
                    this.messageItems.splice(index, 1);
                    this.messageArr.splice(index, 1);
                    this.$message({
                      type: 'success',
                      message: '已'+messageTip+'注册申请'
                    });
                    this.initTable();
                  }else{
                    this.$message({
                      type: 'error',
                      message: '审批失败'
                    });
                  }
                }).catch((err)=>{
                  console.log(err);
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消审批'
                });
              });

        },
        formatterResult(row, column, cellValue){
          if(cellValue==="unlocked"){
            return "已批准";
          }else if(cellValue==="unpass"){
            return "已拒绝";
          }else{
            return "暂无";
          }
        },
        handleSizeChange(val) {
          this.signAppSize=val;
          let param={
            current:1,
            size:this.signAppSize,
            username:this.username
          };
          this.getTableData(param);
        },
        handleCurrentChange(val) {
          let param={
            current:val,
            size:this.signAppSize,
            username:this.username
          };
          this.getTableData(param);
        },
        /**
         * @return {string}
         */
        TableRowStyle() {
          return "color:#ffffff;margin:10px 0px;background-color: #5E818B;text-align:center;height:0";
        },
        /**
         * @return {string}
         */
        TableCellStyle() {
          return "padding:0px";
        }
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
  .grid-content {
    height: 500px
  }
  .bg-purple {
    /*border-right: 3px dashed #ffffff;*/
  }
  .el-header {
    margin-bottom: 20px;
  }
  .message{
    border-bottom: 1px dashed;
    margin: 10px 0px;
  }
  .message-content .number{
    float: left;margin-right: 10px
  }
  .message-content .detail{
    width: 80%;margin-left: 40px;margin-bottom: 10px;
  }
  .el-footer{
    margin: 10px;
  }

</style>
<style>
  .signAppTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
</style>
