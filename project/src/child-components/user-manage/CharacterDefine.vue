<template>
  <el-card class="character-define">
    <div class="text item">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="el-header" style="margin-bottom: 20px">
              <div class="header_separator"></div>
              <h3>角色设置</h3>
            </div>
            <div class="el-content">
              <el-form :model="searchItem_role" ref="searchItem_role" :rules="userRules" :inline="true"
                       class="demo-form-inline searchForm">
                  <el-form-item prop="type">
                    <el-select v-model="searchItem_role.type" placeholder="请选择搜索项">
                      <el-option v-for="item in searchItem_role.searchOptions"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="searchVal">
                    <el-input v-model="searchItem_role.searchVal"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchRole('searchItem_role')">搜索</el-button>
                  </el-form-item>
              </el-form>
              <el-table :data="tableData_role" border  :row-style="TableRowStyle"
                        :header-cell-style="TableRowStyle" :cell-style="TableCellStyle" class="roleTable">
                <el-table-column prop="number" label="编号" width="60"></el-table-column>
                <el-table-column prop="name" label="姓名" width="80"></el-table-column>
                <el-table-column prop="worknum" label="工号" width="80"></el-table-column>
                <el-table-column prop="group" label="所属部门" width="80"></el-table-column>
                <el-table-column prop="position" label="分组" width="80"></el-table-column>
                <el-table-column prop="account" label="账户名" width="80"></el-table-column>
                <el-table-column prop="role" label="用户角色" width="80"></el-table-column>
                <el-table-column prop="options" label="操作" width="90">
                  <template slot-scope="scope">
                    <el-button @click="changeRole(scope.row)" type="text" size="medium">角色变更</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "CharacterDefine",
    data(){
      return{
        searchItem_role:{
          type: '',
          searchVal: '',
          searchOptions: [
            {
              value: 'name',
              label: '姓名'
            }, {
              value: 'worknum',
              label: '工号'
            },
            {
              value: 'account',
              label: '账号'
            }
          ]
        },
        tableData_role:[
          {number: '01', name: '张三',worknum: '', group: '', position: '', account: '', role: ''},
        ]
      }
    },
    methods:{
      searchRole(){

      },
      changeRole(row){

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

</style>
<style>
  .roleTable .el-table{
    background-color:#698A8F ;
  }
</style>
