<template>
  <el-card class="use-approval" style="height: 900px">
    <el-row>
      <el-col :span="8">
        <div class="bg-purple text">
          <div class="el-header" style="margin-bottom: 20px" >
            <div class="header_separator"></div>
            <h3 >待审申请</h3>
          </div>
          <div class="el-content" >
            <div v-if="!total">未有待审批的申请</div>
            <div class="message" v-else v-for="(message, index) in approvalList">
              <div class="messageContent">
                <el-row >
                  <el-col :span="2"> <div class="index">{{index+1}}.</div></el-col>
                  <el-col :span="22"> <div class="messageDetail">{{message.groupName}}员工{{message.nickname}}于 {{message.createTime}}建议采购{{message.softName}}软件</div></el-col>
                </el-row>
              </div>
              <div class="message-footer">
                <el-row>
                  <el-col :span="2">
                    &nbsp;
                  </el-col>
                  <el-col :span="15">
                    <div style="width: 100%;padding-top: 20px;">
                      <el-button type="success" icon="el-icon-check" circle  @click="agree(message,index)"></el-button><span style="margin: 0 5px" ref="agree">同意</span>
                      <el-button type="danger" icon="el-icon-close" circle  @click="disagree(message,index)" ></el-button><span style="margin: 0 5px" ref="dis">拒绝</span>
                    </div>
                  </el-col>

                </el-row>
              </div>
            </div>
            <div class="panigations" v-if="total>5">
              <el-pagination
                small
                :pager-count="4"
                background
                @current-change="handleUncheckedChange"
                :current-page.sync="current"
                :page-size="5"
                layout=" prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>

      </el-col>
      <el-col :span="16">
        <div class="text item">
          <div class="el-header" style="margin-bottom: 20px" >
            <div class="header_separator"></div>
            <h3 >审批记录</h3>
          </div>
          <div class="table">
            <el-table

              :data="approvalRecords"
              style="width: 100%;"
              border
              size="medium"
              :row-style="TableRowStyle"
              :header-cell-style="TableRowStyle"
              :cell-style="TableCellStyle"
              class="positionTable"
            >
              <el-table-column
                prop="nickname"
                label="申请人"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="softName"
                label="软件名"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="申请时间"
                :show-overflow-tooltip="true">

              </el-table-column>
              <el-table-column
                prop="result"
                :label="tableText1">
                <template slot-scope="scope">
                  <span v-if="scope.row.result === '1'">已同意</span>
                  <span v-else-if="scope.row.result === '0'">已驳回</span>
                  <span v-else>未审批</span>
                </template>

              </el-table-column>

              <el-table-column
                prop="opinion"
                :label="tableText2"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="adminResult"
                :label="tableText3">
                <template slot-scope="scope">
                  <span v-if="scope.row.adminResult == '1'">已同意</span>
                  <span v-else-if="scope.row.adminResult == '0'">已驳回</span>
                  <span v-else>未审批</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="adminOpinion"
                :label="tableText4"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="adminReviewTime"
                label="审批时间"
                :show-overflow-tooltip="true">
              </el-table-column>
            </el-table>
          </div>
          <div class="panigations" v-if="tableTotal>10">
            <el-pagination
              small
              :pager-count="6"
              background
              @current-change="handleCheckedChange"
              :current-page.sync="tableCurrent"
              :page-size="10"
              layout=" prev, pager, next"
              :total="tableTotal">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--拒绝理由弹框-->
    <el-dialog title="拒绝理由" :visible.sync="dialogFormVisible">
      <el-form :model="refuseForm">
        <el-form-item >
          <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 4}"  v-model="refuseForm.opinion" autocomplete="off"  autofocus></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sendRefuse">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script >
  export default {
    name: "UseApproval",
    data(){
      return{
        tableText1: '',
        tableText2: '',
        tableText3: '',
        tableText4: '',
        current:1,
        total:0,
        tableTotal:0,
        tableCurrent:1,
        approvalList:[],
        approvalRecords:[],
        refuseForm:{},
        dialogFormVisible:false,
        index:-1,
        loadMessage:true,
        loadTable:true,
        pageSize:5,
        tableSize:10,
      }
    },
    methods:{
      init() {
        this.getApplyList();
        this.getRecords();
        let roleId = sessionStorage.getItem('roleId', 0);
        if (roleId === '1') {
          this.tableText1 = "高级用户审批";
          this.tableText2 = "高级用户批注";
          this.tableText3 = "您的审批";
          this.tableText4 = "您的批注";
        }
        if (roleId === '2') {
          this.tableText1 = "您的审批";
          this.tableText2 = "您的批注";
          this.tableText3 = "管理员审批";
          this.tableText4 = "管理员批注";
        }
      },
      TableRowStyle(){
        return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
      },
      TableCellStyle() {
        // return "padding:0px";
      },
      //同意申请
      agree(item, index){
        let roleId = sessionStorage.getItem('roleId', 0);
        let  parm = {
          id: item.id,
          result: 1,
          opinion: '',
        };
        if (roleId === '1'){
        this.$axios.post('/soft-purchase/admin-approve',parm)
          .then((res)=>{
            if (res.data.code === 0) {
              this.$refs.agree[index].innerHTML = '已同意';
              this.init();
            }
          })
          .catch(err=>{
            console.log(err);
          })
        }
        if (roleId === '2') {
          this.$axios.post('/soft-purchase/approve',parm)
            .then((res)=>{
              if (res.data.code === 0) {
                this.$refs.agree[index].innerHTML = '已同意';
                this.init();
              }
            })
            .catch(err=>{
              console.log(err);
            })
        }
      },
      disagree(item, index){
        this.dialogFormVisible = true;
        this.refuseForm = item;
        this.index = index;
      },
      //取消拒绝申请
      cancel(){
        this.refuseForm.opinion = null;
        this.dialogFormVisible = false;
        this.index = -1;
      },
      sendRefuse(){
        if (this.refuseForm.opinion === null){
          this.$message.error("您未填写拒绝理由！");
          return ;
        }
        //  发送请求
        let date = new Date();
        let  parm = {
          id: this.refuseForm.id,
          result: 0,
          opinion: this.refuseForm.opinion
        };
        let roleId = sessionStorage.getItem('roleId', 0);
        if(roleId === '1') {
          this.$axios.post('/soft-purchase/admin-approve', parm)
            .then(res => {
              // console.log(res);
              if (res.data.code === 0) {
                this.init();
                this.dialogFormVisible = false;
                this.refuseForm = {};
                this.$refs.dis[this.index].innerHTML = '已拒绝';
              }

            }).catch(err => {
            this.$message.error("请求失败，请重试");
            console.log(err);
          });
        }
        if(roleId === '2'){
          this.$axios.post('/soft-purchase/approve', parm)
            .then(res => {
              // console.log(res);
              if (res.data.code === 0) {
                this.init();
                this.dialogFormVisible = false;
                this.refuseForm = {};
                this.$refs.dis[this.index].innerHTML = '已拒绝';
              }

            }).catch(err => {
            this.$message.error("请求失败，请重试");
            console.log(err);
          });
        }

      },
      //获取待审批的列表
      getApplyList(){
        let username = sessionStorage.getItem('username', 0);
        let roleId = sessionStorage.getItem('roleId', 0);
        if (roleId === '1') {
          this.$axios.get('/soft-purchase/admin-apply', {
            params: {
              current: this.current,
              size: this.pageSize,
            }
          })
            .then((res) => {
              this.approvalList = res.data.data.records;
              this.total = res.data.data.total;

            })
            .catch((err) => {
            })
        }
        if (roleId === '2') {
          this.$axios.get('/soft-purchase/apply', {
            params: {
              current: this.current,
              size: this.pageSize,
            }
          })
            .then((res) => {
              this.approvalList = res.data.data.records;
              this.total = res.data.data.total;
            })
            .catch((err) => {
            })
        }
      },
      //获取审批记录表
      getRecords(){
        let username = sessionStorage.getItem('username', 0);
        let roleId = sessionStorage.getItem('roleId', 0);
        if (roleId === '1') {
          this.$axios.get('/soft-purchase/admin-approved', {
            params: {
              current: this.tableCurrent,
              size: this.tableSize,
            }
          })
            .then((res) => {
              this.approvalRecords = res.data.data.records;
              this.tableTotal = res.data.data.total;
            })
            .catch((err) => {
            })
        }
        if (roleId === '2') {
          console.log(username);
          this.$axios.get('/soft-purchase/approved', {
            params: {
              current: this.tableCurrent,
              size: this.tableSize,
            }
          })
            .then((res) => {
              this.approvalRecords = res.data.data.records;
              this.tableTotal = res.data.data.total;
            })
            .catch((err) => {
            })
        }
      },
      //待审记录的分页
      handleUncheckedChange(val){
        this.current = val;
        this.getApplyList();
      },
      //审核记录的分页
      handleCheckedChange(val){
        this.tableCurrent = val;
        this.getRecords();
      }
    },
    mounted() {
      this.init();
    }
  }
</script>
<style scoped>
  .item{
    padding-left: 20px;
  }
  .text{
    color: #ffff;
  }
  .table{
    margin-top: 40px;
  }
  .header_separator {
    float: left;
    width: 5px;
    height: 25px;
    margin-right: 10px;
    background: #ffffff;
  }
  .bg-purple{
    border-right: 3px dashed #ffff;
  }
  .el-content{
    margin-left: 50px;
  }
  .message{
    margin-right: 25px;
    margin-bottom: 20px;

  }
  .messageContent{
    width: 100%;

  }
  .index{
    width: 100%;
  }
  .messageDetail{
    /*word-break: break-word;*/
    word-break:break-all;
    overflow:auto;
    width: 100%;
  }
  .message-footer{
  }
  .panigations{
    width: 100%;
  }
</style>
<style>
  .positionTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
</style>
