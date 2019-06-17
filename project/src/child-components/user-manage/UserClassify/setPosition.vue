<template>
  <el-dialog title="设置人员" :visible.sync="setPositionShow" :before-close="closeModel" center  class="setPosDialog">
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-form :inline="true" :model="searchFrom" class="demo-form-inline setPosForm" :rules="searchRules">
          <el-form-item prop="searchVal">
            <el-input v-model="searchFrom.searchVal" placeholder="姓名/邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" circle @click="searchInactiveUsers('searchFrom')"></el-button>
          </el-form-item>
        </el-form>
        <el-table :data="inactiveUsers" style="width: 100%">
          <el-table-column prop="username" label="账号" width="80" ></el-table-column>
          <el-table-column prop="nickname" label="姓名" width="80" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="80" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="是否选择" width="80">
            <template slot-scope="scope">
              <el-radio v-model="scope.row.ifSelect" label="" @change="changeSelect(scope.row)"></el-radio>
            </template>
          </el-table-column>
        </el-table>
      </div>

      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <div class="el-header" style="margin: 10px">
            <span style="font-size: 16px">已选员工:</span>
          </div>
          <el-table :data="selectArr" style="width: 100%">
            <el-table-column prop="username" label="账号" width="100" hidden></el-table-column>
            <el-table-column prop="nickname" label="姓名" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="80"></el-table-column>
            <el-table-column label="" width="50">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-error" @click="cancelSelect(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-pagination background @size-change="SizeChange_inactiveUsers"
                     @current-change="CurrentChange_inactiveUsers"
                     :current-page="1"
                     :page-size=inactiveUsersSize
                     layout="total, prev, pager, next"
                     :total="inactiveUsersTotal"
                     style="margin: 20px 0px;float: left">
      </el-pagination>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitBefore">确 认</el-button>
    </div>

  </el-dialog>
</template>
<script>
  export default {
    name: "positionDialog",
    data(){
      return{
        dialogLabelWidth:'120px',
        submitUrl:'',
        radio: '0',
        searchFrom:{
          searchVal:''
        },
        ifSelect:false,
        /*inactiveUsers:[
          {name: '张三', work: '001',ifSelect:false},
          {name: '李四', work: '002',ifSelect:false},
          {name: '王五', work: '003',ifSelect:false},
        ],*/
        selectArr:[],
        inactiveUsers:[],
        inactiveUsersSize:5,
        inactiveUsersTotal:0,
        searchRules:{
          searchVal: [
            {required: true, message: '请输入查询内容', trigger: 'blur'},
          ],
        },
      }
    },
    created(){
      this.initInactiveUsers();
    },
    watch: {
      position: {
        immediate: true,
        handler(val) {
          this.searchActiveUser();
        }
      }
    },
    props:{
      setPositionShow:false,
      position:''
    },
    methods:{
      changeSelect(row){//radio选择事件
          let newSelect={};
          newSelect.username=row.username;
          newSelect.nickname=row.nickname;
          newSelect.email=row.email;
          let ifAdd=true;
        this.selectArr.forEach((item,index)=>{
          if(item.username===row.username){
            ifAdd=false;
            return false;
          }
        });
        if(ifAdd)this.selectArr.push(newSelect);
      },
      cancelSelect(row){//取消选中
        this.selectArr.forEach((item,index)=>{
          if(item.username==row.username){
            this.$axios.post("/sysuser/user-group-remove",{username:item.username}).then((res)=>{
              console.log(res);
              if(res.data.message==="成功"){
                this.$message({
                  showClose: true,
                  message: '移出成功',
                  type: 'success'
                });
                this.selectArr.splice(index,1);
                this.initInactiveUsers();
              }else{
                this.$message({
                  showClose: true,
                  message: '移出失败',
                  type: 'error'
                });
              }
            }).catch((err)=>{
              console.log(err);
            });
          }
        });
        this.inactiveUsers.forEach(item=>{
              if(row.username==item.username){
                item.ifSelect=false;
              }
        });
      },
      getInactiveUsers(param){
        this.submitUrl = '/sysuser/free-users';
        this.$axios.post(this.submitUrl,param).then((res)=>{
          if(res.data.data.records!=null){
            this.inactiveUsers=res.data.data.records;
            this.inactiveUsersTotal=res.data.data.total;
          }else{
            this.inactiveUsers=[];
            this.inactiveUsersTotal=0;
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      initInactiveUsers(){
        let param={
          current:1,
          size:5,
          sort:"id",
          dir:"asc"
        };
        this.getInactiveUsers(param);
      },
      searchInactiveUsers(){//查找未部门成员
        let param={
          current:1,
          size:5,
          sort:"id",
          dir:"asc",
          search:this.searchFrom.searchVal
        };
        this.getInactiveUsers(param);
      },
      SizeChange_inactiveUsers(val){
        this.inactiveUsersSize=val;
        let param={
          current:1,
          size:val,
          sort:"id",
          dir:"asc"
        };
        this.getInactiveUsers(param);
      },
      CurrentChange_inactiveUsers(val){
        let param={
          current:val,
          size: this.inactiveUsersSize,
          sort:"id",
          dir:"asc"
        };
        this.getInactiveUsers(param);
      },
      searchActiveUser(){//查找分组下激活用户
            this.submitUrl ='/sysuser/position-users';
            this.$axios.get(this.submitUrl,
              {params:{
                positionId:this.position.id}
            })
              .then((res)=>{
                if(res.data.data!=null){
                  this.selectArr=res.data.data;
                }else{
                  this.selectArr=[];
                }
            }).catch((err)=>{
              console.log(err);
            });

      },
      submitForm(){
        if(this.selectArr.length>0){
          this.submitUrl ='/sysuser/user-group';
          let usernames=[];
          this.selectArr.forEach(item=>{
            usernames.push(item.username);
          });
          let param={
            gropuId:this.position.groupId,
            positionId:this.position.id,
            usernames:usernames.join(","),
            positionType:this.position.positionType
          };
          this.$axios.post(this.submitUrl,param).then((res)=>{
            if(res.data.message==="成功"){
              this.$message({
                showClose: true,
                message: '设置成功',
                type: 'success'
              });
            }else{
              this.$message({
                // showClose: true,
                message: res.data.message,
                type: 'error'
              });
            }
            this.$emit('close');
          }).catch((err)=>{
            console.log(err);
          });
          this.selectArr=[];
          this.inactiveUsers.forEach(item=>{
            item.ifSelect=false;
          });
        }
        this.$emit('close');
      },
      submitBefore(){//为用户设置部门分组
          if(this.position.positionType==="senior"){//高级用户判断
            if(this.selectArr.length>1){
              this.$message({
                showClose: true,
                message: "高级用户只能设置一个人员",
                type: 'error'
              });
            }else{
              this.submitForm();
            }
          }else{
            this.submitForm();
          }
      },
      closeModel(){
        this.$emit('close');
      }
    }
  }
</script>
<style scoped>
  .el-pagination__total{color: black !important}
  .grid-content{
    max-height: 450px;
    height: 400px;
    padding: 10px;
    margin: 15px;
    border: 1px solid #999999;
    overflow-y: auto;
  }
  .bg-purple-light{
    margin-left: 0px;
  }
  .el-button--text {
    color: #409EFF;
  }
</style>
<style>
  .setPosDialog .el-form-item__label
  {
    color: #000000;
  }
  .setPosDialog .el-dialog__body{
    padding: 0;
  }
  .setPosForm .el-form-item{margin-bottom: 0px}
  .setPosDialog .bg-purple-light .el-button
  {
    padding: 0px;
  }
  </style>
