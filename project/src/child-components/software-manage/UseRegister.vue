<template>
  <el-card class="use-approval" style="height: 900px">
    <el-row>
      <el-col :span="12">
        <div class="bg-purple text">
          <div class="el-header" style="margin-bottom: 20px">
            <div class="header_separator"></div>
            <h3>待审登记信息</h3>
          </div>
          <div class="el-content">
            <el-table
              :data="approvalList"
              style="width: 97%;"
              border
              size="medium"
              :row-style="TableRowStyle"
              :header-cell-style="TableRowStyle"
              :cell-style="TableCellStyle"
              class="positionTable"
            >
              <el-table-column
                label="软件名" :show-overflow-tooltip="true">
                <template slot-scope="scope">

                  <button
                    size="mini"
                    style="background-color: #5E818B;border: none;color: #fff;width: 100%;height: 100%;cursor: pointer;" @click="showDetail(scope.$index, scope.row)">
                    {{scope.row.softName}}
                  </button>
                </template>


              </el-table-column>
              <el-table-column
                prop="registerName"
                label="登记人" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="groupName"
                label="所属部门" :show-overflow-tooltip="true">

              </el-table-column>
              <el-table-column
                prop="createDate"
                label="登记时间" :show-overflow-tooltip="true">
              </el-table-column>

              <el-table-column
                prop="approveStatus"
                label="当前状态">
                <template slot-scope="scoped">
                  <span v-if="scoped.row.approveStatus == '1'">同意</span>
                  <span v-else-if="scoped.row.approveStatus == '2'">驳回</span>
                  <span v-else>未审批</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope" ref="agree">

                  <el-button @click="agree(scope.row, scope.$index)" type="text" size="small" style="color: blue;">通过
                  </el-button>
                  <el-button type="text" size="small" style="color: blue;" @click="disagree(scope.row)">驳回</el-button>
                </template>
              </el-table-column>

            </el-table>
            <!--<el-pagination background class="page-part"-->
                           <!--layout="prev, pager, next"-->
                           <!--:total="total"-->
                           <!--@current-change="uncheckedChange"></el-pagination>-->

          </div>
        </div>

      </el-col>
      <el-col :span="12">
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
                label="软件名" style="padding: 0;" :show-overflow-tooltip="true">
                <template slot-scope="scope">

                  <button
                    size="mini"
                    style="background-color: #5E818B;border: none;color: #fff;width: 100%;height: 100%;cursor: pointer;" @click="showDetail(scope.$index, scope.row)">
                    {{scope.row.softName}}
                  </button>
                </template>

              </el-table-column>
              <el-table-column
                prop="registerName"
                label="登记人" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="groupName"
                label="所属部门" :show-overflow-tooltip="true">

              </el-table-column>
              <el-table-column
                prop="createDate"
                label="登记时间" :show-overflow-tooltip="true">
              </el-table-column>

              <el-table-column
                prop="approveStatus"
                label="当前状态">
                <template slot-scope="scoped">
                  <span v-if="scoped.row.approveStatus == '1'">已同意</span>
                  <span v-else>已驳回</span>
                </template>
              </el-table-column>
            </el-table>
            <!--<el-pagination background class="page-part"-->
                           <!--layout="prev, pager, next"-->
                           <!--:total="historyTotal"-->
                           <!--@current-change="checkedChange"></el-pagination>-->
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="软件名:">
          <span>{{formData.softName}}</span>
        </el-form-item>
        <el-form-item label="版本号:">
          <span>{{formData.softVersion}}</span>
        </el-form-item>
        <el-form-item label="采购模块">
          <span>{{formData.softBoughtMoudle}}</span>
        </el-form-item>
        <el-form-item label="功能描述">
          <span>{{formData.softFunDes}}</span>
        </el-form-item>
        <el-form-item label="标签设置">
          <el-tag type="info" v-for="item in targ" v-model="targ">{{item}}</el-tag>
        </el-form-item>
        <el-form-item label="配置需求">
          <span>{{formData.softMinEnv}}</span>
        </el-form-item>
        <el-form-item label="软件图标">
          <img :src=formData.softIcon style="width: 80px; height: 80px">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </el-card>
</template>

<script>
  export default {
    name: "UseApproval",
    data() {
      return {
        targ: [],
        formData: {},
        dialogVisible: false,
        approvalList: [],
        approvalRecords: [],
        total:0,
        current:1,
        historyTotal:0,
        historyCurrent:1,
      }
    },
    methods: {
      showDetail(index, row) {
        this.dialogVisible = true;
        this.$axios.get('/soft-detail' + "?id=" + row.id)
          .then((res) => {
            this.formData = res.data.data;
            this.targ = res.data.data.softTag.split(",");
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          })

      },
      TableRowStyle() {
        return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
      },
      TableCellStyle() {
        // return "padding:0px";
      },
      //同意申请
      agree(item, index) {
        // console.log(item, index);
        this.$axios.post('/stock-in-register/approve', {
          id: item.id,
          op: 1
        })
          .then((res) => {
            if (res.data.code === 0) {
              this.$message.success("已通过申请");
              this.getApplyList();
              this.getRecords();
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      //驳回
      disagree(item, index) {
        this.$axios.post('/stock-in-register/approve', {
          id: item.id,
          op: -1
        })
          .then((res) => {
            if (res.data.code === 0) {
              this.$message.success("已驳回申请");
              this.getApplyList();
              this.getRecords();
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      //获取待审批的列表
      getApplyList() {
        this.$axios.get("/stock-in-register/approve",{
          params:{
            current:this.current,
            size:12,
          }
        })
          .then(response => {
            // this.approvalList = response.data.data.records;
            this.approvalList = [];
            for(var i=0;i<(response.data.data.records.length<12?response.data.data.records.length:12);i++){
              this.approvalList.push(response.data.data.records[i]);
            }
            this.total=response.data.data.total;
          })
          .catch((err) => {
            console.log(err);
          })
      },
      //获取审批记录表
      getRecords() {
        this.$axios.get('/stock-in-register/approve-history',{
          params:{
            current:this.historyCurrent,
            size:10,
          }
        })
          .then((res) => {
            // this.approvalRecords = res.data.data;
            this.approvalRecords = [];
            for(var i=0;i<(res.data.data.length<12?res.data.data.length:12);i++){
              this.approvalRecords.push(res.data.data[i]);
            }
          })
          .catch(err => {
            console.log(err);
          })
      },

      uncheckedChange(val){
        this.current = val;
        this.getApplyList();
      },

      checkedChange(val){

      },
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
    /*margin-top: 40px;*/
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
