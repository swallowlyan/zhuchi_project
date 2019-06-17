<template>
    <el-card class="file-manage-panel" style="min-height: 900px">
      <div slot="header">
        <el-form :model="searchItem_file" ref="searchItem_user" :rules="fileRules" :inline="true"
                 class="demo-form-inline">
        <el-row>
          <el-col :span="6">
            <el-input v-model="searchItem_file.username" placeholder="请输入用户名"></el-input>
          </el-col>
          <el-col :span="4" style="margin: 5px">
            <el-button type="primary" icon="el-icon-search"  @click="searchFiles()" size="small" plain title="查询">查询</el-button>
            <el-button type="success" icon="el-icon-refresh"  @click="searchFiles()" size="small" title="刷新">刷新</el-button>
          </el-col>
            <el-col :span="5" style="margin: 5px">
              <el-upload class="upload-demo"
                         ref="upload"
                         :action="uploadFileUrl"
                         :headers="uploadHeader"
                         :data="uploadObj"
                         :before-upload="beforeUpload"
              >
                <el-button size="small" type="primary"><i class="el-icon-upload el-icon--left"></i>点击上传</el-button>
              </el-upload>
            </el-col>
        </el-row>
        </el-form>
      </div>
      <div>
        <el-row>
          <el-col :span="18">
            <el-card class="container" shadow="never">
              <div>
                <span class="sp-head">文件列表</span>
              </div>
              <div style="max-height: 500px;overflow: auto">
              <el-table class="file-table" style="width: 90%" :data="fileData"
                        :row-style="TableRowStyle"
                        :header-cell-style="TableRowStyle"
                        :cell-style="TableCellStyle">
                <el-table-column prop="name" label="文件名" min-width="75%" align="left">
                  <template slot-scope="scope">
                    <img src="../../assets/file-logo/01.png"/>
                    <span>{{scope.row.objectName}}</span>
                  </template>
                </el-table-column>
                <!--<el-table-column prop="size" label="文件大小" min-width="20%" align="center"></el-table-column>-->
                <el-table-column prop="lastModified" label="修改时间" min-width="35%" align="center"></el-table-column>
                <el-table-column prop="options" label="操作" min-width="20%" >
                  <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-download" circle size="mini" @click="downloadFile(scope.row)" title="下载"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="delFile(scope.row)" title="删除"></el-button>
                  </template>
                </el-table-column>
              </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
</template>

<script>
    export default {
        name: "FileManagePanel",
        data(){
          return{
            uploadFileUrl:"api/file/create",
            uploadHeader:{'Authorization':sessionStorage.getItem('userToken')},
            uploadObj:{"username":sessionStorage.getItem("username")},
            searchItem_file:{"username":sessionStorage.getItem("username")},
            fileRules: {
              name: [
                {required: true, message: '请输入用户名进行查询'},
              ]
            },
            fileData:[],
          }
      },
      created(){
        this.searchFiles();
      },
      methods:{
          searchFiles(){
            this.$axios.get("/file/list-files",{
              params:{
                username:this.searchItem_file.username
              }
            }).then((res)=>{
              this.fileData=res.data.data;
            }).catch((err)=>{
              console.log(err);
            });

          },
        beforeUpload (file,id) {
          let isLt2M = file.size/1024/1024 < 100;
          let fd = new FormData();
          fd.append('file', file);
          fd.append('username',this.username);
          console.info(file);
          if(!isLt2M) {
            this.$message({
              message: '上传文件大小不能超过 100MB!',
              type: 'warning'
            });
          }
          return isLt2M;
        },
        downloadFile(row){
          window.open(row.url);
        },
        delFile(row){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post("/file/delete",
              {
                "username":this.searchItem_file.username,
                "fileName":row.objectName
              }
            ).then((res)=>{
              this.searchFiles();
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
            }).catch((err)=>{
              console.log(err);
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });


        },
        TableRowStyle(){
          return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
        },
        TableCellStyle() {
          // return "padding:0px";
        }
      }
    }
</script>

<style scoped>
.sp-head{
  color: white;
}

  .file-table{
    margin-top: 3%;
  }
</style>
<style>
  .file-table .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
</style>
