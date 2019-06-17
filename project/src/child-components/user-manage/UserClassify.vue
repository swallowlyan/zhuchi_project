<template>
  <el-card class="user-classify" style="min-height: 900px">
   <!-- <div slot="header" class="clearfix">
      <span>用户部门</span>
      &lt;!&ndash;<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>&ndash;&gt;
    </div>-->
    <div class="text item">
      <el-row>
        <!--Position content-->
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="el-header">
              <div class="header_separator"></div>
              <h3>分组设置</h3>
            </div>
            <div class="el-content">
              <el-form :model="searchItem_position" ref="searchItem_position"
                       class="demo-form-inline searchForm"><!--:rules="positionRules"-->
                <el-form-item :label="searchItem_position.gorpTitle" v-if="currentRole"><!--  prop="groupVal"-->
                  <el-col :span="8" style="margin-right: 20px">
                    <el-input v-model="searchItem_position.groupVal"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-button type="primary" @click="searchPosition('searchItem_position')">查询</el-button>
                    <el-button @click="addModelShow('group')">新增</el-button>
                  </el-col>
                </el-form-item>
                <el-form-item :label="searchItem_position.positionTitle"><!-- prop="positionVal"-->
                  <el-col :span="8" style="margin-right: 20px">
                    <el-input v-model="searchItem_position.positionVal"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-button type="primary" @click="searchPosition('searchItem_position')">查询</el-button>
                    <el-button @click="addModelShow('position')">新增</el-button>
                  </el-col>
                </el-form-item>
              </el-form>
              <el-col :span="22">
              <el-table :data="tableData_position" border size="medium" :row-style="TableRowStyle"
                        :header-cell-style="TableRowStyle" :cell-style="TableCellStyle" class="positionTable">
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="name" label="分组名称":show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="groupName" label="所属部门"></el-table-column>
                <el-table-column prop="groupId" label="分组Id" v-if="false"></el-table-column>
                <el-table-column prop="positionType" label="角色" v-if="false"></el-table-column>
                <el-table-column prop="note" label="备注"></el-table-column>
                <el-table-column prop="options" label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button @click="setPosition(scope.row)" type="text" size="medium">设置人员</el-button>
                    <el-button @click="editPosition(scope.row)" type="text" size="medium">编辑</el-button>
                    <el-button @click="delPosition(scope.row)" type="text" size="medium">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              </el-col>
              <el-pagination background  @size-change="SizeChange_position"
                             @current-change="CurrentChange_position"
                             :current-page="1"
                             :page-sizes="[5, 10]"
                             :page-size=positionSize
                             layout="total, sizes, prev, pager, next"
                             :total="positionTotal"
                             style="margin: 20px 0px;float: right">
              </el-pagination>
            </div>
          </div>
        </el-col>
        <!--Position content-->
        <!--User content-->
        <el-col :span="12">
          <div class="grid-content bg-purple-light" style="margin-left: 20px">
            <div class="el-header">
              <div class="header_separator"></div>
              <h3>用户列表</h3>
            </div>
            <div class="el-content">
              <el-form :model="searchItem_user" ref="searchItem_user" :rules="userRules" :inline="true"
                       class="demo-form-inline searchForm">
                <el-col :span="5">
                  <el-form-item prop="type">
                    <el-select v-model="searchItem_user.type" placeholder="请选择搜索项">
                      <el-option v-for="item in searchItem_user.searchOptions"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="searchVal">
                    <el-input v-model="searchItem_user.searchVal"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <el-button type="primary" @click="searchUser('searchItem_user')">搜索</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
              <el-col :span="24">
              <el-table :data="tableData_user" border size="medium" @sort-change="changeTableSort"
                        :row-style="TableRowStyle":header-cell-style="TableRowStyle" :cell-style="TableCellStyle" class="userTable">
                <!--<el-table-column prop="id" label="编号"></el-table-column>-->
                <el-table-column prop="nickname" label="姓名" width="100px" sortable></el-table-column>
                <el-table-column prop="username" label="账号" sortable></el-table-column>
                <el-table-column prop="email" label="邮箱"  :show-overflow-tooltip="true" sortable></el-table-column>
                <el-table-column prop="phone" label="手机号"  width="90px":show-overflow-tooltip="true" sortable></el-table-column>
                <el-table-column prop="workId" label="工号" sortable></el-table-column>
                <el-table-column prop="groupName" label="所属部门" width="110px" sortable></el-table-column>
                <el-table-column prop="positionName" label="分组" width="100px" :show-overflow-tooltip="true" sortable></el-table-column>
                <el-table-column prop="locked" label="用户状态" :formatter="formatterUserState"></el-table-column>
                <el-table-column prop="options" label="操作" width="150px" >
                  <template slot-scope="scope">
                    <el-button @click="lockUser(scope.row)" type="text" size="medium" v-html="formatterLocked(scope.row)"></el-button>
                    <el-button @click="resetPassword(scope.row)" type="text" size="medium">重置密码</el-button>
                  </template>
                </el-table-column>
              </el-table>
                <el-pagination background @size-change="SizeChange_user"
                               @current-change="CurrentChange_user"
                               :current-page="1"
                               :page-sizes="[5,10]"
                               :page-size=userSize
                               layout="total, sizes, prev, pager, next"
                               :total="userTotal"
                               style="margin: 20px 0px;float: right">
                </el-pagination>
              </el-col>
            </div>
          </div>
        </el-col>
        <!--User content-->
      </el-row>
    </div>
    <!--Dialog_Add_group-->
    <addDialogGroup :addDialog_group="DialogVisible_group" @close="closeModel" @refresh="refreshGroup"></addDialogGroup>
    <!--Dialog_Add_group-->
    <!--Dialog_Add_Position-->
    <addDialogPos :addDialog_po="DialogVisible_position" :currentRole="currentRole"
                  :advanceGroupId="advanceGroupId" :advanceGroup="advanceGroup" @close="closeModel" @refresh="initPosition" ref="newGroup"></addDialogPos>
    <!--Dialog_Add_Position-->
    <!--Dialog_edit_Position-->
    <editDialogPos :editDialog="DialogVisible_editPos" :position="currentPosition"
                   :oldName="editPositionName" @close="closeModel" @refresh="initPosition"></editDialogPos>
    <!--Dialog_edit_Position-->
    <!--Dialog_set_Position-->
    <setDialogPos :setPositionShow="DialogVisible_setPos" :position="currentPosition" ref="setPosition"
                  @close="closeModel"></setDialogPos>
    <!--Dialog_set_Position-->
    <!--Dialog_delPosition-->
    <el-dialog title="删除分组" :visible.sync="delPositionDialog" :before-close="closeModel">
      <div v-html="delPositionContent" style="text-align: center;"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="delForm">确 定</el-button>
      </div>
    </el-dialog>
    <!--Dialog_delPosition-->
  </el-card>
</template>
<script>
  import addDialogGroup from './UserClassify/addGroup'
  import addDialogPos from './UserClassify/addPosition'
  import editDialogPos from './UserClassify/editPosition'
  import setDialogPos from './UserClassify/setPosition'

  export default {
    name: "UserClassify",
    data() {
      return {
        currentRole:'',
        roleId:'',
        advanceGroupId:'',
        advanceGroup:'',
        searchItem_position: {
          gorpTitle: '部门名称',
          positionTitle: "分组名称",
          groupVal: '',
          positionVal: '',
        },
        searchItem_user: {
          type: '',
          searchVal: '',
          searchOptions: [
            {
              value: 'nickname',
              label: '姓名'
            }, {
              value: 'workId',
              label: '工号'
            },
            {
              value: 'username',
              label: '账号'
            },
            {
              value: 'phone',
              label: '手机号'
            },
            {
              value: 'email',
              label: '邮箱'
            },
            {
              value: 'groupName',
              label: '所属部门'
            }
          ]
        },
        positionRules: {
          groupVal: [
            {required: true, message: '请输入部门名称', trigger: 'blur'},
          ],
          positionVal: [
            {required: true, message: '请输入分组名称', trigger: 'blur'},
          ]
        },
        userRules: {
          type: [
            {required: true, message: '请选择搜索分类'},
          ],
          searchVal: [
            {required: true, message: '请输入搜索内容', trigger: 'blur'}
          ]
        },
        tableData_position: [],
        positionTotal:0,
        positionSize:5,//分页pageSize
        tableData_user: [],
        userTotal:0,
        userSize:5,//分页pageSize
        DialogVisible_group: false,
        DialogVisible_position: false,
        DialogVisible_editPos: false,
        DialogVisible_setPos: false,
        delPositionDialog: false,
        currentPosition:{},
        editPositionName:'',
        delPositionContent: '',
        submitUrl:'',
        dialogLabelWidth: '120px'
      }
    },
    created(){
      this.getRole();
      this.initPosition();
      this.initUser();
    },
    methods: {
      getRole(){
        this.roleId= sessionStorage.getItem("roleId");
        if(this.roleId==="1"){//管理员
          this.currentRole=true;
        }else if(this.roleId==="2"){//高级用户
          this.currentRole=false;
          this.$axios.get("/wc-group/advince-user-group",{
            params:{
              username:sessionStorage.getItem("username")
            }
          }).then((res)=>{
            this.advanceGroupId=res.data.data.id;
            this.advanceGroup=res.data.data.name;
          }).catch((err)=>{
            console.log(err);
          });
        }
      },
      getPositions(param) {//分组查找
        if(this.roleId==="1"){//管理员
          this.submitUrl = '/wc-position/list';
        }else{//高级用户
          this.submitUrl = '/wc-position/senior-positions';
          param.username=sessionStorage.getItem("username");
          if(param.positionName===undefined){
            param.positionName="";
          }
        }
        this.$axios.post(this.submitUrl,param).then((res)=>{
          if(this.roleId==="1") {//管理员
            this.tableData_position=res.data.data.records;
            this.positionTotal=res.data.data.total;
          }else{
            this.tableData_position=res.data.data;
            this.positionTotal=res.data.data.length;
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      getUsers(param){//获取所有用户
        if(this.roleId=="1"){//管理员
          this.submitUrl = '/sysuser/list-all';
        }else{//高级用户
          this.submitUrl = '/sysuser/advance-list-all';
          param.uid=sessionStorage.getItem("uid");
        }
        this.$axios.post(this.submitUrl,param).then((res)=>{
          this.tableData_user=res.data.data.records;
          this.userTotal=res.data.data.total;
        }).catch((err)=>{
          console.log(err);
        });
      },
      initPosition(){//初始化分组列表
        let param={
          current:1,
          size:this.positionSize,
          sort:'id',
          dir:'asc'
        };
        this.getPositions(param);
      },
      searchPosition(formName){
       /* this.$refs[formName].validate((valid) => {
            if (valid) {*/
              let param = {
                groupName: this.searchItem_position.groupVal,
                positionName: this.searchItem_position.positionVal,
                current: 1,
                size: 10,
                sort: 'id',
                dir: 'asc'
              };
              this.getPositions(param);
           /* }else{
          console.log('error submit!!');
          return false;
          }
      })*/
      },
      initUser(){
        let param={
          current:1,
          size:this.userSize,
          sort:'id',
          dir:'asc'
        };
        this.getUsers(param);
      },

      searchUser(formName) {//用户查找
       /* this.$refs[formName].validate((valid) => {
          if (valid) {*/
       let type=this.searchItem_user.type;
       let param={};
       param[type]=this.searchItem_user.searchVal;
       param["current"]=1;
        param["size"]=10;
        param["sort"]='id';
        param["dir"]='asc';
            this.getUsers(param);
          /*} else {
            console.log('error submit!!');
            return false;
          }
        });*/
      },
      formatterUserState(row, column, cellValue){//格式化用户状态
          if(cellValue===0){
            return "正常";
          }else if(cellValue===1){
            return "锁定";
          }else if(cellValue===2){
            return "申请中";
          }else if(cellValue===3){
            return "审批未通过";
          }
      },
      formatterLocked(row){//根据用户状态修改bottom
        if(row.locked===1){
            return "启用";
        }else if(row.locked===0){
          return "禁用";
        }
      },
      refreshGroup(){//刷新分组表单的部门下拉菜单
        this.$refs.newGroup.getAllGroup();
      },
      setPosition(row) {//设置人员
        this.currentPosition = row;
        this.$refs.setPosition.initInactiveUsers();
        this.$refs.setPosition.searchActiveUser();
        this.DialogVisible_setPos = true;
      },
      editPosition(row) {//编辑分组
        this.currentPosition = row;
        this.editPositionName=row.name;
        this.DialogVisible_editPos = true;
      },
      delPosition(row) {
        let del_name = row.name;
        this.currentPosition=row;
        this.delPositionContent =  "当前分组'" + del_name + "'中可能还有对应分配的员工<br>"+
                                    "删除分组将自动解除分组中的员工<br>"+"是否确认删除？";
        this.delPositionDialog = true;
      },
      delForm(){
        this.submitUrl ='/wc-position/delete';
        this.$axios.post(this.submitUrl,{
          positionId:this.currentPosition.id
        }).then((res)=>{
          if(res.data.message==="成功"||res.data.message===null){
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.initPosition();
          }else{
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error'
            });
          }
          this.delPositionDialog=false;
        }).catch((err)=>{
          console.log(err);
        });
      },
      lockUser(row){//禁用&启用
        let url="";
        let msg="";
        if(row.locked===1){//进行启用
          url="/sysuser/enable";
          msg="启用";
        }else{
          url="/sysuser/disable";
          msg="禁用";
        }
        this.$axios.post(url,{
          username:row.username
        }).then((res)=>{
          if(res.data.message==="成功"||res.data.message===null){
            this.$message({
              showClose: true,
              message: row.username+'已'+msg,
              type: 'success'
            });
            this.initUser();
          }else{
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error'
            });
          }
          this.delPositionDialog=false;
        }).catch((err)=>{
          console.log(err);
        });
      },
      resetPassword(row){//重置密码
        this.$axios.post("/sysuser/reset-password",{
          username:row.username
        }).then((res)=>{
          if(res.data.message==="成功"||res.data.message===null){
            this.$message({
              showClose: true,
              message: row.username+'-密码已重置',
              type: 'success'
            });
            this.initUser();
          }else{
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error'
            });
          }
          this.delPositionDialog=false;
        }).catch((err)=>{
          console.log(err);
        });
      },
      changeTableSort(column){
        let param={
          current:1,
          size:this.userSize,
          sort:column.prop,
          dir:""
          };
        if(column.order==="descending"){
          param.dir="desc";
        }else{
          param.dir="asc";
        }
        this.getUsers(param);
      },
      addModelShow(val) {//增加弹窗显示
        if (val == 'group') {
          this.DialogVisible_group = true;
        } else {
          this.DialogVisible_position = true;
        }
      },
      closeModel() {//关闭弹窗-父子关联(:before-close+方法不能含参数)
        this.DialogVisible_group = false;
        this.DialogVisible_position = false;
        this.DialogVisible_editPos = false;
        this.DialogVisible_setPos = false;
        this.delPositionDialog = false;
      },
      SizeChange_position(val) {
        this.positionSize=val;
        let param={
          current:1,
          size:val,
          sort:'id',
          dir:'asc'
        };
        this.getPositions(param);
      },
      CurrentChange_position(val) {
        let param={
          current:val,
          size:this.positionSize,
          sort:'id',
          dir:'asc'
        };
        this.getPositions(param);
      },
      SizeChange_user(val) {
        this.userSize=val;
        let param={
          current:1,
          size:val,
          sort:'id',
          dir:'asc'
        };
        this.getUsers(param);
      },
      CurrentChange_user(val) {
        let param={
          current:val,
          size:this.userSize,
          sort:'id',
          dir:'asc'
        };
        this.getUsers(param);
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
      TableCellStyle() {
        return "padding:0px";
      },

    },
    components: {
      addDialogPos, addDialogGroup, editDialogPos, setDialogPos
    }
  }
</script>

<style scoped>
  .clearfix, .text {
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
    height:650px
  }

  .bg-purple {
    border-right: 3px dashed #ffffff;
  }

  .el-header {
    margin-bottom: 20px;
  }
  .el-pagination__total{color: #ffffff}
</style>
<style>
  .el-button--text {
    color: blue;
  }
  .searchForm .el-form-item__label {
    color: #ffffff;
    font-size: 16px;
  }
  .searchForm .el-button--default span {
    color: #606266;
  }
  .positionTable .el-table__body tr:hover > td,.userTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }

</style>
