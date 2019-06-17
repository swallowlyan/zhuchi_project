<template>
  <el-card style="min-height: 900px">
    <el-card class="container" shadow="never">
      <div class="text" >
        <div class="el-header">
          <div class="header_separator"></div>
          <h3>单独登记</h3>
        </div>
        <div class="formInput">
          <el-row>
            <el-col :span="2"><span>&nbsp;</span></el-col>
            <el-col :span="2"><span style=" color: #ffe727;font-size: 30px;"> * </span><span>软件名：</span></el-col>
            <el-col :span="18">
              <el-input v-model="form.softName" v-if="roleId === '1'"> </el-input>

              <el-select  v-else v-model="form.softName" placeholder="请选择软件名"  @change="softChange">
                <el-option
                  v-for="item in nameList"
                  :key="item.softId"
                  :label="item.softName"
                  :value="item.softId"
                  >
                  <span class="black">{{item.softName}}</span>
                </el-option>
              </el-select>

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><span>&nbsp;</span></el-col>
            <el-col :span="2"><span>版本号：</span></el-col>
            <el-col :span="18"><el-input v-model="form.softVersion"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><span>&nbsp;</span></el-col>
            <el-col :span="2"><span>采购模块：</span></el-col>
            <el-col :span="18"><el-input v-model="form.softBoughtMoudle"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><span>&nbsp;</span></el-col>
            <el-col :span="2"><span>软件分类：</span></el-col>
            <el-col :span="18">
              <el-select v-model="selectedClassification[0]" placeholder="请选择一级分类"  @change="changeFirstlassification" >
                <el-option
                  v-for="item in firstClassification"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <span class="black">{{item.name}}</span>
                </el-option>
              </el-select>
              <el-select v-model="selectedClassification[1]" placeholder="请选择二级分类" @change="changeSecondClassification" >
                <el-option
                  v-for="item in secondClassification"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <span class="black">{{item.name}}</span>
                </el-option>
              </el-select>
              <el-select v-model="selectedClassification[2]" placeholder="请选择三级分类">
                <el-option
                  v-for="item in thirdClassification"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <span class="black">{{item.name}}</span>
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><span>&nbsp;</span></el-col>
            <el-col :span="2"><span>功能描述：</span></el-col>
            <el-col :span="18"><el-input v-model="form.softFunDes"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><span>&nbsp;</span></el-col>
            <el-col :span="2"><span>标签设置：</span></el-col>
            <el-col :span="18">
              <el-tag
                type="danger"
                color="#0099FF"
                class="tag"
                :key="tag"
                v-for="tag in form.softTag"
                closable
                :disable-transitions="false"
                @close="handleCloseTag(tag)"
                style="color:white;font-size: 1em;"
              >
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput" type="primary">+ 新增</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><span>&nbsp;</span></el-col>
            <el-col :span="2"><span>配置需求：</span></el-col>
            <el-col :span="18"><el-input v-model="form.softMinEnv"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><span>&nbsp;</span></el-col>
            <el-col :span="2"><span>软件图标：</span></el-col>
            <el-col :span="18">
                <!--<el-upload-->
                  <!--class="upload-demo"-->
                  <!--ref="upload"-->
                  <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                  <!--:on-change="handleChange"-->
                  <!--:before-upload="beforeAvatarUpload"-->
                  <!--:limit="1"-->
                  <!--list-type="picture"-->
                  <!--:auto-upload="false"-->
                  <!--:multiple=true >-->
                  <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
                  <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过50kb</div>-->
                <!--</el-upload>-->
              <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="beforeUpload"/>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="20"><el-button type="primary" @click="submitUpload" style="background-color: #0099FF;">提交</el-button></el-col>
          </el-row>
        </div>
      </div>

    </el-card>
    <el-card v-if="roleId ==1 || roleId == 2" class="container" shadow="never">
      <div class="text">
        <div class="el-header">
          <div class="header_separator"></div>
          <h3>批量登记</h3>
        </div>
        <el-row style="height: 70px;">
          <el-col :span="3" >&nbsp;</el-col>
          <el-col :span="3" >
            <el-upload
              class="upload-demo"
              ref="uploadBatch"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChangeBatch"
              :limit="1"
              list-type="fileBatch"
              :auto-upload="false"
              :multiple=true >
              <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>

            </el-upload>
            <!--<input type="file" @change="getFile($event)" class="fileBtn">-->
          </el-col>
          <el-col :span="2">
            <el-button @click="importBatch" size="mini" class="btn">导入</el-button>
          </el-col>
          <el-col :span="8">
            <el-button @click="downloadBatch" size="mini" class="btn">下载Excel模板</el-button>
          </el-col>
        </el-row>
        <div class="table">
          <el-table

            :data="datas"
            style="width: 100%;"
            border
            size="medium"
            :row-style="TableRowStyle"
            :header-cell-style="TableRowStyle"
            :cell-style="TableCellStyle"
            class="positionTable"
          >
            <el-table-column
              prop="softName"
              label="软件名">
            </el-table-column>
            <el-table-column
              prop="softVersion"
              label="版本号">
            </el-table-column>
            <el-table-column
              prop="softBoughtMoudle"
              label="采购模块">

            </el-table-column>
            <el-table-column
              prop="softCategory"
              label="所属一级分类">

            </el-table-column>

            <el-table-column
              prop="softCategory2"
              label="所属二级分类">
            </el-table-column>
            <el-table-column
              prop="softCategory3"
              label="所属三级分类">
            </el-table-column>
            <el-table-column
              prop="softFunDes"
              label="功能描述">
            </el-table-column>
            <el-table-column
              prop="softTag"
              label="标签设置">
            </el-table-column>
            <el-table-column
              prop="softMinEnv"
              label="配置需求">
            </el-table-column>
          </el-table>

          <el-button type="primary" style="margin:30px 0 0 17%;" @click="sendBatch">提交</el-button>
        </div>
      </div>
    </el-card>
  </el-card>
</template>

<script>
  export default {
    name: "InfoCheckIn",
    data(){
      return{
        fileBatch:[],
        size:0,
        fileList: [],
        roleId:'',
        form: {
          softName:'',
          softVersion:'',
          softBoughtMoudle:'',
          softFunDes:'',
          softTag: [],
          softMinEnv:'',
          softIcon:'',
          softId:'',
        },
        firstClassification:[],
        secondClassification:[],
        thirdClassification:[],
        selectedClassification:["","",""],
        inputVisible:false,
        inputValue:'',
        datas:[],
        nameList:[]
      }
    },
    methods: {
      TableRowStyle() {
        return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
      },
      TableCellStyle() {
        return "padding:0px";
      },

      beforeUpload(e) {
        let file=e.target.files[0];
        const isJPG =(file.type === 'image/jpeg'
          ||file.type === 'image/jpg'
          ||file.type === 'image/png'
        ) ;
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像只能是图片格式!');
          return false;
        }
        else if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过2MB!');
          return false;
        }else{
          this.form.softIcon=file;
        }
      },

      handleInputConfirm(){
        let inputValue = this.inputValue;
        if (inputValue) {
          this.form.softTag.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      showInput(){
        if (this.form.softTag.length === 3){
          return ;
        }
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleCloseTag(tag) {
        this.form.softTag.splice(this.form.softTag.indexOf(tag), 1);
      },
      getFirstCategroy(){
        this.$axios.get('/soft-category')
          .then((res)=>{
            this.firstClassification = res.data.data;
          })
          .catch(err=>{
            console.log(err);
          })
      },

      getName(){

        this.$axios.get('/soft-auth/auth-reg')
          .then(res=>{
            this.nameList = res.data.data;
            console.log(this.nameList)
          })
      },

      beforeAvatarUpload(file){
       console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isLt50Kb = file.size / 1024 / 50;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt50Kb) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt50Kb;
      },

      submitUpload() {

        const loading = this.$loading({
          lock: true,
          text: '正在打开云桌面……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        if(this.roleId === "1"){
          if (this.form.softName=== ""){
            this.$message.warning("请填写软件名！");
            return ;
          }
          // if (this.size>50*1024){
          //   this.$message.error("图标超过限制大小，请更换图标！");
          //   return ;
          // }
        } else {

          if (this.form.softName=== ""||this.form.softBoughtMoudle === "" || this.selectedClassification[0] === ""  ){
            this.$message.warning("请填写软件名！");
            return ;
          }
          // if (this.size>50*1024){
          //   this.$message.error("图标超过限制大小，请更换图标！");
          //   return ;
          // }
        }
        event.preventDefault();
        let parm = new window.FormData();
        parm.append('softName',this.form.softName);
        parm.append('softVersion',this.form.softVersion);
        parm.append('softBoughtMoudle',this.form.softBoughtMoudle);
        parm.append('softCategory',this.selectedClassification[0]);
        parm.append('softCategory2',this.selectedClassification[1]);
        parm.append('softCategory3',this.selectedClassification[2]);
        parm.append('softFunDes',this.softFunDes);
        parm.append('softTag',this.form.softTag.join(";"));
        parm.append('softMinEnv',this.form.softMinEnv);
        parm.append('softIcon',this.form.softIcon);
        parm.append('username',sessionStorage.getItem('username'));
        parm.append('softId',this.form.softId);
        // {
        //   softName:this.form.softName,
        //   softVersion:this.form.softVersion,
        //   softBoughtMoudle:this.form.softBoughtMoudle,
        //   softCategory:this.selectedClassification[0],
        //   softCategory2:this.selectedClassification[1],
        //   softCategory3:this.selectedClassification[2],
        //   softFunDes:this.form.softFunDes,
        //   softTag:this.form.softTag.join(";"),
        //   softMinEnv:this.form.softMinEnv,
        //   softIcon:this.form.softIcon,
        //   username:sessionStorage.getItem('username'),
        //   softId:this.form.softId,
        // };
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };

        // if(this.roleId == '1'){
          var thisUrl = '/stock-in-register/single-register';
        // }else {
        //   var thisUrl = 'soft-detail/update';
        // }

        this.$axios.post(thisUrl,parm,config)
          .then((res)=>{
            loading.close();
            if (res.data.code === 0)  {
              this.$message.success("入库成功");
            } else{
              this.$message.error(res.data.message);
            }
          })
          .catch(err=>{
            loading.close();
            console.log(err);
          })
      },
      handleChange(file){
        this.size = file.size;
        this.form.softIcon = file
        let reader = new FileReader();
        reader.onload = () => {

          let _base64 = reader.result;
          // this.form.softIcon = _base64;
          // console.log(_base64);
        }
        reader.readAsDataURL(file.raw);

      },
      changeFirstlassification(val){
        this.selectedClassification[1] = '';
        this.selectedClassification[2] = '';
        this.secondClassification = [];
        this.thirdClassification = [];
        this.$axios.get('/soft-category?parentId='+val)
          .then(res=>{
            this.secondClassification = res.data.data;
          }).catch(err=>{
            console.log(err);
        })
      },
      changeSecondClassification(val){
        this.selectedClassification[2] = '';
        this.thirdClassification = [];
        this.$axios.get('/soft-category?parentId='+val)
          .then(res=>{
              this.thirdClassification = res.data.data;
          })
          .catch(err=>{
            console.log(err);
          })
      },
      handleChangeBatch(file){
        this.fileBatch[0] = file;
      },
      //导入文件
      importBatch(){
        if (this.fileBatch.length === 0){
          this.$message.warning('您未选择文件！');
          return ;
        }
        let formData = new FormData();
        formData.append('file', this.fileBatch[0].raw);
        let config = {
          headers: {
            'enctype': 'multipart/form-data',
          }
        };
        this.$axios.post('/stock-in-register/import', formData, config)
          .then((res) => {

            if (res.data.code === 0){
              this.datas = res.data.data;
            } else {
              this.$message.error(res.data.message);
            }

        }).catch((err) => {
          console.log(err);
        })
      },
      //下载模板
      downloadBatch(){
        let token = sessionStorage.getItem('userToken');
        let url = '/api'+'/stock-in-register/download-template?token=' + token;
        token = token.split(" ")[1];
        alert(token);
        // window.open('http://192.168.100.140:8080/soft-standBook/export?type=0&token=' + token);
        window.location.href = url;
      },
    //  提交批量
      sendBatch(){
        let config = {
          headers: {
            'Content-Type': 'application/json',

          }
        };
        this.$axios.post('/stock-in-register/batch-register',this.datas,config)
          .then((res)=>{
              if (res.data.code === 0){
                this.$message.success("导入成功！");
              } else{
                console.log(res.data.message);
              }
          })
          .catch(err=>{
            console.log(err);
          })

      },

      softChange(val){
        // console.log('----------------');
        // console.log(val);
        this.form.softId = val;
        for (var i=0;i<this.nameList.length;i++){
          if(this.nameList[i].softId === val){
            this.form.softName = this.nameList[i].softName;
          }
        }
        // console.log(this.form.softName);
      },

    },
    mounted(){
      this.roleId = sessionStorage.getItem("roleId");
      this.getFirstCategroy();
      if (sessionStorage.getItem("roleId") == 3 || sessionStorage.getItem("roleId") == 2 ){
        this.getName();
      }
    }

  }
</script>

<style scoped>
  .el-row + .el-row{
    margin-top: 1.5rem;
  }
.formInput .el-row .el-col span{
  display: inline-block;
 vertical-align: middle;
  height: 37px;
  line-height: 37px;
}
.tag{

  /*color: red;*/
}
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    color: black;
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .header_separator{
    float: left;
    width: 5px;
    height: 25px;
    margin-right: 10px;
    background: #ffffff;
  }
  .text {
    color: #fff;
  }
  .el-select + .el-select{
    margin-left: 40px;
  }
  .black {
    color: #606266;
  }
  .btn{
    background-color: #6d8d91;
    color: #fff;
    border-color: #fff;
  }
  .table{
    margin-top: 30px;
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
