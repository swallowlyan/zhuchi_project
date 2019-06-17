<template>
    <el-card class="user-manage">
      <a href="javascript:void(0)" @click="toManagePanel" class="head-href">用户管理</a>
      <el-row gutter="20">
        <el-col :span="12">
          <el-card class="join-approval container" shadow="never">
            <div class="region-head">
              <a href="javascript:void(0)" @click="toManagePanel" class="head-href">用户部门</a>
            </div>
            <el-table :data="tableData_position" border size="medium" :row-style="TableRowStyle"
                      :header-cell-style="TableRowStyle" :cell-style="TableCellStyle" class="positionTable-1">
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
          </el-card>
        </el-col>

        <el-col :span="1" class="down-a-little"><img src="../../assets/u4526.png"/></el-col>

        <el-col :span="11">
          <el-card class="permission-manage container" shadow="never">
            <div class="region-head">
              <a href="javascript:void(0)" @click="toPermissionPanel" class="head-href">权限管理</a>
            </div>

            <el-form :inline="true" :model="searchItem_perApp" ref="searchItem_perApp" :rules="searchRules"
                     class="demo-form-inline perAppForm">
              <el-row>
                <el-col :span="20" style="margin: 20px 0px">
                  <!--<el-form-item prop="groupItem" label="正在对">-->
                    <!--<el-select v-model="searchItem_perApp.groupItem" :placeholder="groupItem.title" @change="changeGroup" :disabled="!ifAdmin">-->
                      <!--<el-option v-for="item in groupItem.options"-->
                                 <!--:key="item.id"-->
                                 <!--:label="item.name"-->
                                 <!--:value="item.id">-->
                      <!--</el-option>-->
                    <!--</el-select>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item prop="personItem" label="组别中">-->
                  <el-form-item prop="personItem" label="正在对" class="form-label">
                    <el-select v-model="searchItem_perApp.personItem" :placeholder="personItem.title" @change="getPermissions" size="mini">
                      <el-option v-for="item in personItem.options"
                                 :key="item.username"
                                 :label="item.nickname"
                                 :value="item.username">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="进行权限变更" class="form-label">
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-table :data="tableData" border size="mini"  class="permissionTable-1"
                            :header-cell-style="TableRowStyle"  :row-style="TableRowStyle">
                    <el-table-column prop="softName" label="软件名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="options" label="使用">
                      <template slot-scope="scope">
                        <el-switch v-model="scope.row.softUse" active-value="1" inactive-value="0"></el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column prop="options" label="登记">
                      <template slot-scope="scope">
                        <el-switch v-model="scope.row.softRegister" active-value="1" inactive-value="0"></el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column prop="options" label="安装">
                      <template slot-scope="scope">
                        <el-switch v-model="scope.row.softInstall" active-value="1" inactive-value="0"></el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column prop="options" label="维护更新">
                      <template slot-scope="scope">
                        <el-switch v-model="scope.row.softUpdate" active-value="1" inactive-value="0"></el-switch>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="el-footer">
                    <el-form-item>
                      <el-button type="primary" @click="submitChange('searchItem_perApp')" class="btn-confirm" size="small">确认</el-button>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>

          </el-card>
        </el-col>
      </el-row>
      <setDialogPos :setPositionShow="DialogVisible_setPos" :position="currentPosition" ref="setPosition"
                    @close="closeModel"></setDialogPos>
      <editDialogPos :editDialog="DialogVisible_editPos" :position="currentPosition"
                     :oldName="editPositionName" @close="closeModel" @refresh="initPosition"></editDialogPos>
      <el-dialog title="删除分组" :visible.sync="delPositionDialog" :before-close="closeModel">
        <div v-html="delPositionContent" style="text-align: center;"></div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeModel">取 消</el-button>
          <el-button type="primary" @click="delForm">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
</template>

<script>
    import ApplicationItem from "../../base-component/ApplicationItem";
    import editDialogPos from './UserClassify/editPosition'
    import setDialogPos from './UserClassify/setPosition'

    export default {
        name: "UserManage",
      components: {ApplicationItem,editDialogPos, setDialogPos},

      data(){
          return{
            username:'',
            roleId:'',

            tableData_position:'',
            submitUrl:'',
            positionSize:5,//分页pageSize
            currentPosition:{},
            DialogVisible_editPos: false,
            DialogVisible_setPos: false,
            delPositionDialog: false,
            delPositionContent: '',

            searchItem_perApp:{
              groupItem:'',
              personItem:'',
            },
            groupItem:{
              title:'请选择组别',
              options:[]
            },
            personItem:{
              title:'请选择员工',
              options:[]
            },
            searchRules:{
              groupItem: [
                {required: true, message: '请选择组别'},
              ],
              personItem: [
                {required: true, message: '请选择员工'},
              ],
            },
            ifAdmin:true,
            tableData:[],
          }
      },

      created(){
          this.initPosition();
          this.getAllGroup();
      },

      methods:{
        toManagePanel(){
          this.$router.push('/main-page/senior-user-manage/user-classify');
        },
        toPermissionPanel(){
          this.$router.push('/main-page/senior-user-manage/permission-approval');
        },
        TableRowStyle() {
          return "color:#ffffff;background-color: #698A8F;text-align:center;height:0";
        },
        TableCellStyle() {
          return "padding:0px";
        },

        getPositions(param) {//分组查找
          this.submitUrl = '/wc-position/senior-positions';
          param.username=sessionStorage.getItem("username");
          this.$axios.post(this.submitUrl,param).then((res)=>{
              this.tableData_position=res.data.data;
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
        closeModel() {//关闭弹窗-父子关联(:before-close+方法不能含参数)
          this.DialogVisible_editPos = false;
          this.DialogVisible_setPos = false;
          this.delPositionDialog = false;
        },

        changeGroup(val){//修改部门后查找部门下激活的用户
          this.$axios.get('/sysuser/group-users',
            {
              params:{
                groupId:val
              }
            })
            .then((res)=>{
              if(res.data.data.length>0){
                this.personItem.options=res.data.data;
                if(this.roleId==="2"){//高级用户下拉选项去除自身
                  this.personItem.options.forEach((item,index)=>{
                    if(item.username===this.username){
                      this.personItem.options.splice(index, 1);
                    }
                  })
                }
              }else{
                this.personItem.options=[];
              }
            })
            .catch((err)=>{
              console.log("error");
            });
        },
        getPermissions(val){//获得一个用户的软件权限
          this.$axios.get('/soft-auth/user-softs',
            {params:{username:val}})
            .then((res)=>{
              this.tableData = [];
              if(res.data.data.length>0){
                for(var i=0;i<(res.data.data.length<5?res.data.data.length:5);i++){
                  this.tableData.push(res.data.data[i]);
                }
                // this.tableData=res.data.data;
                this.tableData.forEach(item=>{
                  if(item.softUse===1){
                    item.softUse="1";
                  }else{
                    item.softUse="0";
                  }
                  if(item.softRegister===1){
                    item.softRegister="1";
                  }else{
                    item.softRegister="0";
                  }
                  if(item.softInstall===1){
                    item.softInstall="1";
                  }else{
                    item.softInstall="0";
                  }
                  if(item.softUpdate===1){
                    item.softUpdate="1";
                  }else{
                    item.softUpdate="0";
                  }
                })
              }
            })
            .catch((err)=>{
              console.log("error");
            });
        },
        submitChange(){//用户的软件权限设置
          this.$axios.post('/soft-auth/auth',{
            auth_json:JSON.stringify(this.tableData)
          })
            .then((res)=>{
              if(res.data.message==="成功"){
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                });
              }else{
                this.$message({
                  showClose: true,
                  message: '修改失败',
                  type: 'error'
                });
              }

            })
            .catch((err)=>{
              console.log("error");
            });
        },
        getAllGroup(){//获取部门
          this.$axios.get('/wc-group/groups')
            .then((res)=>{
              this.groupItem.options=res.data.data;
              console.log(this.groupItem);
              this.getUser();
            })
            .catch((err)=>{
              console.log(err);
            });
        },
        getUser(){
          this.roleId=sessionStorage.getItem("roleId");
          this.username=sessionStorage.getItem("username");
          if(this.roleId==="1"){//管理员
            this.ifAdmin=true;
          }else{//高级用户-获得自己所在分组信息
            this.ifAdmin=false;
            this.$axios.get('/wc-group/advince-user-group',
              {
                params:{username:this.username}
              })
              .then((res)=>{
                this.searchItem_perApp.groupItem=res.data.data.id;
                this.changeGroup(res.data.data.id);
              })
              .catch((err)=>{
                console.log("error");
              });
          }
        },

      },
    }
</script>

<style scoped>
  .positionTable-1{
    margin-top: 10px;
  }

  .permissionTable-1{
    margin-top: -30px;
  }

  .btn-confirm{
    margin-left: 310%;
    margin-top: 10px;
  }

  .down-a-little{
    margin-top: 2%;
  }
</style>
<style>
  .positionTable-1 .el-table__body tr:hover > td,.userTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
  .permissionTable-1 .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
  .form-label .el-form-item__label{
    color: white;
  }
</style>
