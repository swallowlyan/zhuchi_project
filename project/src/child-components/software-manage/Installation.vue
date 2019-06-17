<template>
  <el-card class="installation" style="min-height: 900px">
    <el-row>
      <el-col :span="12">
        <div>
          <div slot="header">
            <div class="header_separator"></div>
            <span class="head_text">单独安装</span>
          </div>
          <div class="installation-left">
           <!-- <el-row>
              <el-col :span="7" class="text" style="margin-top: 1%"><span>请选择安装包路径：</span></el-col>
              <el-col :span="7">
                <el-input size="small"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" size="small">导入</el-button>
              </el-col>
            </el-row>-->
            <div>
              <div>
                <p class="text top_p">请选择所安装的软件:</p>
                <div class="selection-left">
                  <el-select v-model="single_installation_1" placeholder="请选择一级分类" size="small" @change="getSecond">
                    <el-option
                      v-for="item in classification_1"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      <span class="black">{{item.name}}</span>
                    </el-option>
                  </el-select>
                </div>
                <div class="selection-left">
                  <el-select v-model="single_installation_2" placeholder="请选择二级分类" size="small" @change="getThird">
                    <el-option
                      v-for="item in classification_2"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      <span class="black">{{item.name}}</span>
                    </el-option>
                  </el-select>
                </div>
                <div class="selection-left" v-if="ifThird">
                  <el-select v-model="single_installation_3" placeholder="请选择三级分类" size="small" @change="getSoftware">
                    <el-option
                      v-for="item in classification_3"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      <span class="black">{{item.name}}</span>
                    </el-option>
                  </el-select>
                </div>
                <div class="selection-left">
                  <el-select v-model="software_installation" placeholder="请选择软件" size="small" @change="getPermissions">
                    <el-option
                      v-for="item in software_options"
                      :key="item.id"
                      :label="item.softName"
                      :value="item.id">
                      <span class="black">{{item.softName}}</span>
                    </el-option>
                  </el-select>
                </div>
                <el-button class="commit-button" type="primary" size="small"  @click="onDaoRu" :disabled="ifOpenWin">打开桌面</el-button>
                <el-button class="commit-button" type="primary" size="small" @click="install" :disabled="ifSubmit">安装</el-button>
              </div>
              <div style="margin-top: 10%;border:1px solid #fff; padding: 3% 0 3% 6%">
                <div>
                  <span>操作提示<br></span>
                  <span>1.选择可安装软件<br></span>
                  <span>2.点击“打开桌面”，打开云桌面镜像<br></span>
                  <span>3.点击“安装”，进行软件安装<br></span>
                  <span>4.安装完成后关闭即可<br></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div slot="header">
            <div class="header_separator"></div>
            <span class="head_text">批量安装</span>
          </div>
          <div style="margin-top: 3%">
            <el-row>
              <el-col :span="8"><span>选择Excel安装路径：</span></el-col>
              <el-col :span="6">
                <el-input size="small"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" size="small" @click="showError">导入</el-button>
              </el-col>
            </el-row>
            <el-row class="installation-table">
              <el-table
                :data="tableData"
                border
                center
                :row-style="TableRowStyle"
                :header-cell-style="TableRowStyle"
                :cell-style="TableCellStyle"
                style="width: 100%">
                <el-table-column
                  prop="style"
                  label="软件分类"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="软件名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="安装路径">
                </el-table-column>
              </el-table>
            </el-row>
            <el-button class="installation-button" type="primary" size="small" @click="showError">安装</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  // import { mapActions } from "vuex";
  export default {
    name: "Installation",
    data() {
      return {
        classification_1: [],
        classification_2: [],
        classification_3: [],
        single_installation_1: '',
        single_installation_2: '',
        single_installation_3: '',
        software_installation: '',
        software_options: '',
        ifSubmit:true,
        ifOpenWin:true,
        username:'',
        tableData: [],
        UL:'',
        id:'',
        cldSessionId:'',
        ifThird:false
      }
    },
    methods: {
      // ...mapActions([ "setId","setCldSessionId"]),
      //初始化获取第一个分类
      init() {
        this.$axios.get('/soft-category')
          .then((res) => {
            this.ifThird=false;
            this.classification_1 = res.data.data;
          }).catch((err) => {
            console.log(err);
          })
      }
      ,
      //获取二级分类
      getSecond(row) {
        this.$axios.get('/soft-category', {
          params: {
            parentId: row,
          }
        }).then((res) => {
            this.classification_2 = res.data.data;
            this.single_installation_2 = "";
            this.single_installation_3 = "";
          })
          .catch((err) => {
            console.log(err);
          })
      }
      ,
      //获取三级分类
      getThird(row) {
        this.$axios.get('/soft-category', {
          params: {
            parentId: row,
          }
        }).then((res) => {
          if(res.data.data.length>0){
            this.ifThird=true;
            this.classification_3 = res.data.data;
            this.single_installation_3 = "";
          }else{
            this.ifThird=false;
            this.getSoftware(row);
          }
          })
          .catch((err) => {
            console.log(err);
          })
      }
      ,
      //获取分类下软件
      getSoftware(row) {
        this.ifOpenWin=true;
        this.ifSubmit=true;
        this.$axios.post('/soft-detail/getSoftsReg', {
          categoryId: row,
          username:sessionStorage.getItem("username")
        }).then((res) => {
          this.software_options = res.data.data;
        }).catch((err) => {
            console.log(err);
          })
      },
      getPermissions(){
        this.username=sessionStorage.getItem("username");
        this.$axios.get('/soft-auth/soft-auth', {
          params:{
            username:this.username,
            softId:this.software_installation
          }
        }).then((res)=> {
          if(res.data.data.softInstall===1){
            this.ifOpenWin=false;
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      //直接进入云桌面
      onDaoRu(){
        //loading
        const loading = this.$loading({
          lock: true,
          text: '正在打开云桌面……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post('/send-request/install-desktop').then((res)=>{
          if(res.data.success === true){
            this.ifOpenWin=true;
            this.ifSubmit=false;
            this.UL = res.data.osurl;
            this.id  = res.data.id;
            this.cldSessionId = res.data.sessionId;
            setTimeout(()=>{
              window.open(this.UL);
              loading.close();
            },25000);
           /* this.setId(this.id);
            this.setCldSessionId(this.cldSessionId);*/
          }else{
            loading.close();
            this.$message({
              message: '进入云桌面失败，请稍后再试',
              type: 'error'
            });
          }
        }).catch(()=>{
          loading.close();
          this.$message({
            message: '请求失败',
            type: 'error'
          });
        })
      },
      install(){
        this.username=sessionStorage.getItem("username");
        //loading
        const loading = this.$loading({
          lock: true,
          text: '正在安装软件……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post('/soft-detail/install-soft',{
         username:this.username,
          softId:this.software_installation,
          cldSessionId:this.cldSessionId
        }).then((res)=>{
          loading.close();
          if(res.data.message === "成功"){
            this.ifSubmit=true;
              this.$message({
                message: '安装成功',
                type: 'success'
              });
          }else{
            this.$message({
              message: '安装失败',
              type: 'error'
            });
          }
        }).catch(()=>{
          this.$message({
            message: '请求失败',
            type: 'error'
          });
        })
      },
      getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      submit(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', this.file);
        this.$axios.post('/soft-standBook/import', {
          formData,
          type: this.typeCode,

        }).then((res) => {
          alert("成功")
        }).catch((err) => {
          console.log(err)
        })
      },
      showError(){
        this.$message({
          message: '该功能暂未开发,敬请期待',
          type: 'warning'
        });
      },
      TableRowStyle() {
        return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
      },
      TableCellStyle() {
        return "padding:0px";
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>
  .head_text{
    color: #ffffff;
  }
  .installation{
    height: 800px;
  }
  .installation-left {
    font-size: 16px;
    margin-top: 2%;
  }

  .selection-left {
    margin: 10px 0 0 30%;
  }

  .commit-button {
    margin: 40px 0 0 40%;
    display: block;
  }

  .installation-table {
    margin: 10px 0;
  }

  .installation-button {
    width: 30%;
    margin-left: 35%;
  }

  .header_separator {
    float: left;
    width: 5px;
    height: 25px;
    margin-right: 10px;
    background: #ffffff;
  }

  .text {
    color: #fff;
  }

  .head_text {
    font-size: 20px;
    font-weight: bold;
  }

  .top_p {
    margin-top: 2%;
  }

  .positionTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }

  .black {
    color: #606266;
  }
</style>
