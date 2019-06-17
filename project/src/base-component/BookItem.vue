<template>
  <div v-if="isRouterAlive" class="button-item">
    <div class="text">
      <div class="header_separator"></div>
      <h3>单独登记</h3>
    </div>
    <el-row>
      <el-col :span="2" style=" margin-left: 10%">
      <el-upload
        class="upload-demo"
        ref="uploadBatch"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="getFile"
        :limit="1"
        list-type="fileBatch"
        :auto-upload="false"
        :multiple=true >
        <el-button slot="trigger"  type="primary">选取文件</el-button>

      </el-upload>
      </el-col>
      <el-col :span="2"  :offset="1">
        <el-button @click="submit($event)"  class="btn" >导入</el-button>
      </el-col>
      <el-col :span="8">
        <el-button @click="exportBook"  class="btn">下载台账</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="dialogTableVisible = true" type="primary" >添加字段</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="dialogTableVisible_modify = true" type="primary">修改字段</el-button>
      </el-col>
    </el-row>
    <el-dialog title="添加字段" :visible.sync="dialogTableVisible" width="40%" >
      <el-form>
        <el-form-item label="字段名" label-width="20%">
          <el-input v-model="columnName" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label-width="20%">
          <el-button type="primary" @click="add_column">添加</el-button>
          <el-button @click="dialogTableVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改字段" :visible.sync="dialogTableVisible_modify" width="40%">
      <el-form>
        <el-form-item label="请选择字段名" label-width="30%">
          <el-select v-model="selectColumnId" style="width: 51%">
            <el-option
              v-for="item in columnNameOption"
              :key="item.id"
              :label="item.data"
              :value="item.id">

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入新的字段名" label-width="30%">
          <el-input style="width: 51%" v-model="newColumnName"></el-input>
        </el-form-item>
        <el-form-item label-width="30%">
          <el-button type="primary" @click="modify_col">修改</el-button>
          <el-button @click="dialogTableVisible_modify = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row class="but">
      <el-col :span="2">
        <div class="pa"></div>
      </el-col>
      <el-col :span="20">
        <el-table :data="result" style="width: 100%; margin-top: 3%"
                  border
                  center
                  :row-style="TableRowStyle"
                  :header-cell-style="TableRowStyle"
                  :cell-style="TableCellStyle"
                  class="positionTable"
                  @sort-change="TableSort"
        >

          <el-table-column

            v-for="col in cols" :key="col.col"
            :prop="col.data" :label="col.data" sortable='custom'
          >
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button @click="editRow(scope.$index, scope.row)" type="text" size="medium " icon="el-icon-edit">修改
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <el-row>
          <el-col :span="18">
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="10"
                layout="sizes, prev, pager, next"
                :total="Total">
              </el-pagination>
            </div>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" style="margin-top: 18px" @click="addRow">添加一行</el-button>
          </el-col>
        </el-row>
        <!--修改记录模态框-->
        <el-dialog title="修改信息" :visible.sync="editRecordDialog" ref="editRecordDialog">
          <el-form :model="editForm">

            <el-form-item v-for="(val, key, index) in editForm.data" :label="key" label-width="120px">
              <el-input v-model="editForm.data[key]" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit">取 消</el-button>
            <el-button type="primary" @click="sendRecord">确 定</el-button>
          </div>
        </el-dialog>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    name: "BookIten",
    props: ["typeCode"],
    data() {
      return {
        isRouterAlive: true,
        Total: 10,
        file: '',
        fileList: [],
        url: "/soft-standBook/import",
        dialogTableVisible: false,
        dialogTableVisible_modify: false,
        columnName: '',
        columnNameOption: '',
        selectColumnId: '',
        newColumnName: '',
        filetype: {
          type: 0,
        },
        edit: [],
        tableData: [],
        result: [],
        obj: {},
        cols: [],
        editRecordDialog: false,
        editForm: {},
        backup: {},
        colAdd: '',
        loading: true,
        isAsc: 0,
        page_sizes: [5,10,15,20],
        page_size: 20,
        currentPage: 1,
        currentSize: 10,
        is_asc: false,
        order: 0,
        filename:'',
        content:'',
      }
    },
    components: {ElRow},
    methods: {
      addRow() {
        this.$axios.post('/soft-standBook/tailRow', {
          type: this.typeCode,
        }).then( (res)=> {
          if (res.data.code === 0) {
            this.$message.success('添加成功！');
            this.init();
          } else {
            this.$message.error(res.data.message);
          }
        })
          .catch((error) =>{
            console.log(error);
          });
      },
      handleSizeChange(val) {
        this.currentSize = val;
        this.$axios.get('/soft-standBook/' + this.typeCode, {
          params: {
            order: this.order,
            isAsc: this.is_asc,
            current: this.currentPage,
            size: this.currentSize,
          }
        }).then((res) => {
          this.tableData = res.data.data.records;
          this.standard();
        })
          .catch((err) => {
            console.log(err);
          });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.$axios.get('/soft-standBook/' + this.typeCode, {
          params: {
            order: this.order,
            isAsc: this.is_asc,
            current: this.currentPage,
            size: this.currentSize,
            content:'',
            filename:''
          }
        }).then((res) => {
          this.tableData = res.data.data.records;
          this.standard();
        })
          .catch((err) => {
            console.log(err);
          });
      },
      TableSort(row) {
        for (let i=0 ; i<this.cols.length; i++) {
          if(row.prop == this.cols[i].data) {
            this.order = i;
          }
        }
        this.is_asc = false;
        if (row.order === 'ascending') {
          this.is_asc = true;
        }
        if (row.order === 'descending') {
          this.is_asc = false
        }
        if (row.order === null) {
          this.order = -1
        }
        this.getTableData()
      },
      TableRowStyle() {
        return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
      },
      TableCellStyle() {
        return "padding:0px";
      },
      getTableData() {
        this.$axios.get('/soft-standBook/' + this.typeCode, {
          params: {
            order: this.order,
            isAsc: this.is_asc,
            current: this.currentPage,
            size: this.currentSize,
          }
        })
          .then((res) => {
            // console.log(res.data.data);
            this.tableData = res.data.data.records;
            this.Total = res.data.data.totalRows;
            this.standard();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      //初始化
      init() {
        this.$axios.get('/soft-standBook/' + this.typeCode + '/head').then((res) => {
          this.columnNameOption = res.data.data;
          // this.$set(this.cols,null , res.data.data);
          this.cols = res.data.data;
          this.getTableData();
        })
          .catch((err) => {
            console.log(err);
          });
        this.cols = [];


      },
      exportBook() {
        console.log(this.typeCode);
        let token = sessionStorage.getItem('userToken');
        let url = '/api'+'/soft-standBook/export?type='+ this.typeCode+'&token=' + token;
        // window.open('http://192.168.100.140:8080/soft-standBook/export?type=0&token=' + token);
        window.location.href = url;
     }
      ,
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true

        })
      },
      add_column() {
        this.$axios.post('/soft-standBook/tailCol', {
          type: this.typeCode,
          data: this.columnName,
        }).then( (res)=> {
          if (res.data.code === 0) {
            this.$message.success('添加成功！');
            this.init();
          } else {
            this.$message.error(res.data.message);
          }
          })
          .catch((error) =>{
          console.log(error);
        });
        this.dialogTableVisible = false;
      },

      modify_col() {
        this.$axios.put('/soft-standBook/updateById', {
          id: this.selectColumnId,
          data: this.newColumnName,
        }).then( (res) =>{
          if(res.data.code == 0) {
            this.$message.success(res.data.message);
            this.init();
          } else {
            this.$message.error(res.data.message);
          }
        }).catch( (error) =>{
          console.log(error);
        });
        this.dialogTableVisible_modify = false;
      }
      ,
      getFile(event) {
       if(event === 0){
         return ;
       }
        this.file = event.raw;
      }
      ,
      submit(event) {
        event.preventDefault();
        if (this.file == '') {
          return;
        }
        let formData = new FormData();
        formData.append('type', this.typeCode);
        formData.append('file', this.file);
        // console.log(formData);
        let config = {
          headers: {
            'enctype': 'multipart/form-data',

          }
        };
        this.$axios.post('/soft-standBook/import', formData, config).then((res) => {
          if (res.data.code === 0)  {
            this.$message.success('导入成功！');
            this.init();
          } else{
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      standard() {
        this.result = [];
        let index = -1;
        for (let i = 0, len = this.tableData.length; i < len; i++) {
          let row = this.tableData[i].row;
          let col = this.tableData[i].col;
          if (col === 0) {
            this.result.push({});
            index++;
          }
          let name = this.cols[col]["data"];
          let data = this.result[index];
          data[name] = this.tableData[i].data;
          this.result[index] = data;
        }
        this.loading = false;

      },
      editRow(index, row) {
        this.editForm.rowNum = index;
        this.editForm.data = Object.assign({}, row);
        this.backup = Object.assign({}, row);
        this.editRecordDialog = true;

      },
      cancelEdit() {
        this.editRecordDialog = false;
        this.editForm = {};
        this.backup = {};
      },
      sendRecord() {
        this.loading = true;
        let changItme = [];
        for (let item in this.editForm.data) {
          if (this.editForm.data.hasOwnProperty(item)) {
            if (this.editForm.data[item] !== this.backup[item])
              changItme.push({value: this.editForm.data[item], key: item});
          }
        }
        let i,j,len,len1;
        let data = [];
        console.log(changItme.length,this.cols.length);
        for ( i = 0, len = changItme.length; i < len; i++) {

          for ( j = 0, len1 = this.cols.length; j < len1; j++) {
            if (changItme[i].key === this.cols[j].data) {
              // ids.push(this.tableData[(this.editForm.rowNum + 1) * len1 + j].id);
              data.push({'data':changItme[i].value,id:this.tableData[(this.editForm.rowNum) * len1 + j].id});
            }
          }
        }
        // console.log(ids.join());
        // console.log(data);
        this.$axios.put("/soft-standBook/updateByIds",data)
          .then((res) => {
            this.editRecordDialog = false;
            this.backup = {};
            this.editForm = {};
            this.init();
          })
          .catch(err => {
            this.$message.error("更改失败");
          })
      }
    },
    mounted() {
      this.init();
    },

  }
</script>

<style scoped>
  .block {
    margin-left: 20%;
    margin-top: 2%;
  }
  .but {
    margin-top: 10px;
  }

  .pa {
    width: 100%;
    min-height: 20px;
  }
  .btn{
    background-color: #6d8d91;
    color: #fff;
    border-color: #fff;
  }
</style>
<style>
  .text {
    color: #fff;
  }
  .positionTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
  .header_separator{
    float: left;
    width: 5px;
    height: 25px;
    margin-right: 10px;
    background: #ffffff;
  }

</style>
