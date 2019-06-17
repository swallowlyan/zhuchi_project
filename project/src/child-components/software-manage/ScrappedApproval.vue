<template>
  <el-card class="use-approval" style="height: 900px">
    <el-row>
      <el-col :span="8">
        <div class="bg-purple text">
          <div class="el-header" style="margin-bottom: 20px">
            <div class="header_separator"></div>
            <h3>待审申请</h3>
          </div>
          <div class="el-content">
            <div v-if="!total">未有待审批的申请</div>
            <div class="message" v-for="(message, index) in approvalList">
              <div class="messageContent">
                <el-row>
                  <el-col :span="2">
                    <div class="index">{{index+1}}.</div>
                  </el-col>
                  <el-col :span="22">
                    <div class="messageDetail">

                      <div v-if="message.softCategory3">
                        {{message.groupName}}员工 {{message.applicantName}} 于 {{message.time}} 申请报废
                        {{message.softCategory}}/{{message.softCategory2}}/{{message.softCategory3}} 中的
                        {{message.softName}} 软件
                      </div>
                      <div v-else-if="message.softCategory2">
                        {{message.groupName}}员工 {{message.applicantName}} 于 {{message.time}} 申请报废
                        {{message.softCategory}}/{{message.softCategory2}} 中的
                        {{message.softName}} 软件
                      </div>
                      <div v-else>
                        {{message.groupName}}员工 {{message.applicantName}} 于 {{message.time}} 申请报废
                        {{message.softCategory}} 中的
                        {{message.softName}} 软件
                      </div>
                    </div>
                    <div class="messageContent">报废理由： </div>
                    <div class="messageContent">{{message.scrapReason}}</div>
                  </el-col>
                </el-row>

              </div>
              <div class="message-footer">
                <el-row>
                  <el-col :span="2">
                    &nbsp;
                  </el-col>
                  <el-col :span="15">
                    <div style="width: 100%;padding-top: 20px;">
                      <el-button type="success" icon="el-icon-check" circle @click="agree(message,index)"></el-button>
                      <span style="margin: 0 5px" ref="message">同意</span>
                      <el-button type="danger" icon="el-icon-close" circle @click="disagree(message,index)"></el-button>
                      <span style="margin: 0 5px" ref="disagreed">拒绝</span>

                    </div>
                  </el-col>

                </el-row>
              </div>
            </div>
            <div class="panigations" v-if="total>3">
              <el-pagination
                small
                background
                @current-change="handleCurrentChange"
                :current-page.sync="current"
                :page-size="3"
                layout=" prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>

      </el-col>
      <el-col :span="16">
        <div class="text item">
          <div class="el-header" style="margin-bottom: 20px">
            <div class="header_separator"></div>
            <h3>审批记录</h3>
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
                prop="applicantName"
                label="申请人"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="softName"
                label="报废软件名"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="scrapReason"
                label="报废原因"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="time"
                label="申请时间"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="result"
                label="审批状态"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.result === '1'">已同意</span>
                  <span v-else>已驳回</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="reason"
                label="备注"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="remarkTime"
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
        <el-form-item>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="refuseForm.reason" autocomplete="off"
                    autofocus></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sendRefuse">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  export default {
    name: "UseApproval",
    data() {
      return {
        current: 1,
        total: 0,
        tableCurrent: 1,
        tableTotal: 0,
        approvalList: [],
        approvalRecords: [],
        refuseForm: {},
        dialogFormVisible: false,
        loadMessage: true,
        loadTable: true,
        index: -1,
      }
    },
    methods: {
      TableRowStyle() {
        return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
      },
      TableCellStyle() {
        // return "padding:0px";
      },
      //同意申请
      agree(item, index) {;
        let  parm = {
          scrapId:item.scrapId,
          reviewerId:sessionStorage.getItem('uid'),
          result:1,
          reason:'',
          applicantId:item.applicantId
        };
        this.$axios.post('/soft-scrap',parm)
          .then((res)=>{
            console.log(res);
           if (res.data.code === 0){
             this.getApplyList();
             this.getRecords();
             // this.$refs.message[index].innerHTML = "已同意"
           }
          })
          .catch(err=>{
            console.log(err);
          })
      },
      disagree(item, index) {
        this.dialogFormVisible = true;
        this.refuseForm = item;
        this.index = index;
      },
      //取消拒绝
      cancel() {
        this.refuseForm.reason = '';
        this.refuseForm = {};
        this.dialogFormVisible = false;
        this.index = -1;

      },
      //发送审批理由的模态框
      sendRefuse() {
        // console.log(this.refuseForm.reason);
        this.refuseForm.reason = this.refuseForm.reason.trim();
        if (this.refuseForm.reason.length === 0) {
          this.$message.error("您未填写拒绝理由！");
          return;
        }
        //  发送请求
        let parm = {
          scrapId: this.refuseForm.scrapId,
          reviewerId: sessionStorage.getItem('uid'),
          // result: this.flag,
          result: 0,
          reason: this.refuseForm.reason,
          applicantId: this.refuseForm.applicantId

        };
        this.$axios.post('/soft-scrap', parm)
          .then(res => {
            this.dialogFormVisible = false;
            this.refuseForm = {};
              // this.$refs.disagreed[this.index].innerHTML = "已拒绝";
            this.getApplyList();
            this.getRecords();
          })
          .catch(err => {
            console.log(err);
            this.$message.error("请求失败，请重试");
            console.log(err);
          });

      },
      //获取待审批的列表
      getApplyList() {
        this.$axios.get("/soft-scrap/list-unchecked?&current=" + this.current + "&size=3")
          .then(response => {
            // console.log(response);
            // console.log(response.data.data.records);
            this.total = response.data.data.total;
            this.approvalList = response.data.data.records;
            this.loadMessage = false;
          })
          .catch((err) => {
            console.log(err);
          })
      },
      //获取审批记录表
      getRecords() {
        this.$axios.get('/soft-scrap/list-checked?current=' + this.tableCurrent)
          .then((res) => {
            setTimeout(100);
            this.approvalRecords = res.data.data.records;
            this.tableTotal = res.data.data.total;
            this.loadTable = false;
          })
          .catch(err => {
            console.log(err);
          })
      },
      //待审记录的分页
      handleCurrentChange(val) {
        this.current = val;
        this.getApplyList();
      },
      //表格的分页
      handleCheckedChange(val) {
        this.tableCurrent = val;
        this.getRecords();
      }
    },
    created() {
      this.getApplyList();
      this.getRecords();
    }
  }
</script>
<style scoped>
  .item {
    padding-left: 20px;
  }

  .text {
    color: #ffff;
  }

  .table {
    margin-top: 40px;
  }

  .header_separator {
    float: left;
    width: 5px;
    height: 25px;
    margin-right: 10px;
    background: #ffffff;
  }

  .bg-purple {
    border-right: 3px dashed #ffff;
  }

  .el-content {
    margin-left: 50px;
  }

  .message {
    margin-right: 25px;
    margin-bottom: 20px;

  }

  .messageContent {
    width: 100%;

  }

  .index {
    width: 100%;
  }

  .messageDetail {
    /*word-break: break-word;*/
    word-break: break-all;
    overflow: auto;
    width: 100%;
  }

  .message-footer {
  }

  .panigations {
    width: 100%;
  }
</style>
<style>
  .positionTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
</style>
