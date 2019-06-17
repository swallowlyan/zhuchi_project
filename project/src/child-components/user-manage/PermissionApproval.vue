<template>
    <el-card class="permission-approval" style="min-height: 900px">
      <div class="text item">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <div class="el-header" style="margin-bottom: 20px">
                <div class="header_separator"></div>
                <h3>权限管理</h3>
              </div>
              <div class="el-content">
                <el-form :inline="true" :model="searchItem_perApp" ref="searchItem_perApp" :rules="searchRules"
                         class="demo-form-inline perAppForm">
                <el-row>
                  <el-col :span="24">
                    <span style="font-size: 18px">请选择要进行权限管理的员工</span>
                  </el-col>
                  <el-col :span="20" style="margin: 20px 0px">
                        <el-form-item prop="groupItem" label="正在对">
                          <el-select v-model="searchItem_perApp.groupItem" :placeholder="groupItem.title" @change="changeGroup" :disabled="!ifAdmin">
                            <el-option v-for="item in groupItem.options"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item prop="personItem" label="组别中">
                          <el-select v-model="searchItem_perApp.personItem" :placeholder="personItem.title" @change="getPermissions">
                            <el-option v-for="item in personItem.options"
                                       :key="item.username"
                                       :label="item.nickname"
                                       :value="item.username">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      <el-form-item label="进行权限变更">
                      </el-form-item>

                  </el-col>
                </el-row>
                  <el-row>
                    <el-col :span="8">
                      <div style="height: 85px;line-height: 95px">通过以下操作可对权限设置进行“全选/取消全选”操作:</div>
                    </el-col>
                      <el-col :span="16">
                      <!--<br>-->
                      <table border="1"frame="above" class="chooseTable" width="550px">
                            <thead>
                            <tr>
                              <th>使用</th><th>登记</th><th>安装</th><th>维护更新</th>
                            </tr>
                            </thead>
                        <tbody>
                        <tr class="el-table__row">
                          <td  width="100px">
                            <el-button type="primary" icon="el-icon-check" circle size="mini" title="全选" @click="chooseAll('softUse')"></el-button>
                            <el-button type="info" icon="el-icon-close" circle size="mini" title="取消全选" @click="nochooseAll('softUse')"></el-button>
                          </td>
                          <td width="100px">
                            <el-button type="primary" icon="el-icon-check" circle size="mini" title="全选" @click="chooseAll('softRegister')"></el-button>
                            <el-button type="info" icon="el-icon-close" circle size="mini" title="取消全选" @click="nochooseAll('softRegister')"></el-button>
                          </td>
                          <td width="100px">
                            <el-button type="primary" icon="el-icon-check" circle size="mini" title="全选" @click="chooseAll('softInstall')"></el-button>
                            <el-button type="info" icon="el-icon-close" circle size="mini" title="取消全选" @click="nochooseAll('softInstall')"></el-button>
                          </td>
                          <td width="100px">
                            <el-button type="primary" icon="el-icon-check" circle size="mini" title="全选" @click="chooseAll('softUpdate')"></el-button>
                            <el-button type="info" icon="el-icon-close" circle size="mini" title="取消全选" @click="nochooseAll('softUpdate')"></el-button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </el-col>
                  </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-table :data="tableData" border size="medium"  class="permissionTable"
                              :header-cell-style="TableRowStyle"  :row-style="TableRowStyle">
                      <el-table-column prop="softName" label="软件名称" ></el-table-column>
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
                      <el-button type="primary" @click="submitChange('searchItem_perApp')">确认</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                </el-form>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
</template>

<script>
    export default {
        name: "PermissionApproval",
      data(){
          return {
            username:'',
            roleId:'',
            ifAdmin:true,
            userGroup:'',
            userGroupId:'',
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
            tableData:[],
          }
      },
      created(){
          this.getAllGroup();
      },
      methods:{
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
        getAllGroup(){//获取部门
          this.$axios.get('/wc-group/groups')
            .then((res)=>{
              this.groupItem.options=res.data.data;
              this.getUser();
            })
            .catch((err)=>{
              console.log("error");
            });
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
              if(res.data.data.length>0){
                this.tableData=res.data.data;
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
        chooseAll(columnName){//全选
          if(this.tableData.length>0){
            this.tableData.forEach(item=>{
              item[columnName]="1";
            });
          }else{
            this.$message({
              showClose: true,
              message: '请先选择用户进行权限设置',
              type: 'warning'
            });
          }

        },
        nochooseAll(columnName){//取消全选
          if(this.tableData.length>0){
            this.tableData.forEach(item=>{
              item[columnName]="0";
            });
          }else{
            this.$message({
              showClose: true,
              message: '请先选择用户进行权限设置',
              type: 'warning'
            });
          }

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
        /**
         * @return {string}
         */
        TableRowStyle() {
          return "color:#ffffff;background-color: #698A8F;text-align:center;height:0";
        }
      }
    }
</script>

<style scoped>
  .text {
    color: #ffff;
  }
  .el-content{margin-left: 50px}
  .header_separator {
       float: left;
       width: 5px;
       height: 25px;
       margin-right: 10px;
       background: #ffffff;
     }
.setTable th,.setTable td{
  background-color: #68898F;
  color: #ffffff;
  text-align: center;
}
  .el-footer{
    margin: 20px 0px;text-align: center
  }
  .chooseTable,.chooseTable tr th, .chooseTable tr td { border:1px solid #c0c4cc; margin: 15px}
  .chooseTable tr td {padding: 10px}
  .chooseTable {height: 85px; line-height: 25px; text-align: center; border-collapse: collapse;}
</style>
<style>
  .perAppForm .el-form-item__label{
    color: #ffffff;
    font-size: 16px;
  }
  .permissionTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
</style>
