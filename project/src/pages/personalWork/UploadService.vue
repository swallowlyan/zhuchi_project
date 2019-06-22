<template>
    <div>
      <el-row>
        <el-col  :span="24">
    <div class="demo-input-suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>上传服务
    </div>
        </el-col>
        <el-col :span="16">
      <el-form :model="uploadForm" :rules="uploadFormRules" ref="uploadForm"  label-width="100px">
        <el-form-item label="服务名:" prop="softName">
          <el-input v-model="uploadForm.softName" size="medium" placeholder="请输入内容" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="服务分类:" prop="softMenu">
          <el-select v-model="uploadForm.softMenu" placeholder="请选择服务分类">
            <el-option
              v-for="item in serviceTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领域分类:" prop="softCategory">
          <el-select v-model="uploadForm.softCategory" placeholder="请选择领域分类">
            <el-option
              v-for="item in areaTypeList"
              :key="item.id"
              :label="item.fieldName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业分类:" prop="softCategory2">
          <el-select v-model="uploadForm.softCategory2" placeholder="请选择行业分类">
            <el-option
              v-for="item in industryTypeList"
              :key="item.id"
              :label="item.industryName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交付方式:" prop="softCategory3">
          <el-select v-model="uploadForm.softCategory3" placeholder="请选择交付方式" @change="changePayType()">
            <el-option
              v-for="item in payTypeList"
              :key="item.id"
              :label="item.deliverType"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务介绍">
          <el-input type="textarea" v-model="uploadForm.description" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="服务支持">
          <el-input type="textarea" v-model="uploadForm.softSupply" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="规格报价">
          <el-col :span="15" :offset="3" id="price">
            <table>
              <tr><td>按时租赁</td><td>按月租赁</td><td>按年租赁</td></tr>
              <tr>
                <td><el-input size="small" v-model="uploadForm.price1" placeholder="请输入报价"></el-input></td>
                <td><el-input size="small" v-model="uploadForm.price2" placeholder="请输入报价"></el-input></td>
                <td><el-input size="small" v-model="uploadForm.price3" placeholder="请输入报价"></el-input></td></tr>
            </table>
          </el-col>
        </el-form-item>
        <el-form-item label="部署使用说明">
          <el-input type="textarea" v-model="uploadForm.softFunDes" placeholder="请输入内容"></el-input>
        </el-form-item>
    <div class="demo-input-suffix"><span>上传图标:</span>
      <input class="file" name="icon" type="file" accept="image/png,image/gif,image/jpeg" @change="iconSelect"/>
      <!--<el-upload class="upload-demo"
                 ref="upload"
                 :action="uploadFileUrl"
                 :headers="uploadHeader"
                 :data="uploadForm"
                 :on-change="iconSelect"
                 :auto-upload="false"
                 :multiple="false"
                 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP"
      >
      <el-button slot="trigger" size="small" type="primary">选取图标</el-button>
    <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
    </el-upload>--></div>
    <div class="demo-input-suffix"><span>上传服务:</span>
      <input class="file" name="file" type="file"  @change="fileSelect"/>
      <!--<el-upload class="upload-demo"
      ref="upload"
      :action="uploadFileUrl"
      :headers="uploadHeader"
      :data="uploadForm"
      :on-change="fileSelect"
      :auto-upload="false":multiple="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>-->
  </div>
      </el-form>
      <div v-if="ifDown" style="margin-left:220px;" id="upload_btn"><el-button type="primary" @click="submitUpload('uploadForm')">提交</el-button></div>
      <div v-if="ifSAAS">
        <div style="margin-left:220px;"><el-button type="primary">云化服务</el-button></div>
        <div style="margin-left:220px;"><el-button type="primary">安装</el-button></div>
      </div>
        </el-col>
      </el-row>
</div>
</template>
<script>
    export default {
      data(){
          return{
            username:sessionStorage.getItem('username'),
            roleId:'',
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            serviceTypeList:[],
            areaTypeList:[],
            industryTypeList:[],
            payTypeList:[],
            ifSAAS:false,
            ifDown:true,
            uploadFormData:new FormData(),
            uploadForm:{
              username:this.username,
              softName:'',softMenu:'',description:'',
              softCategory:'',softCategory2:'',softCategory3:'',
              softSupply:'',softFunDes:'',
              price1:"",price2:"",price3:"",
              icon:"",file:""

            },
            uploadFormRules:{
              softName: [{required: true, message: '请输入软件名', trigger: 'blur'}],
              softMenu: [{required: true, message: '请选择服务分类', trigger: 'blur'}],
              softCategory: [{required: true, message: '请选择领域分类', trigger: 'blur'}],
              softCategory2: [{required: true, message: '请选择行业分类', trigger: 'blur'}],
              softCategory3: [{required: true, message: '请选择交付分类', trigger: 'blur'}]
            },
            uploadHeader:{'Authorization':sessionStorage.getItem('userToken')},
            uploadFileUrl:""
          }
      },
      mounted(){
        this.getServiceType();this.getAreaType();this.getIndustryType();this.getPayType();
          this.getUsername();
          this.getRoleId();
      },

      methods:{
        //获取分类
        getServiceType(){
          this.$axios.get('/menu/list-all').then((res)=>{
            if(res.data.data.length>0)this.serviceTypeList=res.data.data;
          }).catch((err)=>{
            console.log(err);
          });
        },
        getAreaType(){
          this.$axios.get('/field-cate/list-all').then((res)=>{
            if(res.data.data.length>0)this.areaTypeList=res.data.data;
          }).catch((err)=>{
            console.log(err);
          });
        },
        getIndustryType(){
          this.$axios.get('/industry-cate/list-all').then((res)=>{
            if(res.data.data.length>0)this.industryTypeList=res.data.data;
          }).catch((err)=>{
            console.log(err);
          });
        },
        getPayType(){
          this.$axios.get('/deliver-type/list-all').then((res)=>{
            if(res.data.data.length>0)this.payTypeList=res.data.data;
          }).catch((err)=>{
            console.log(err);
          });
        },
        getUsername(){
          this.username = sessionStorage.getItem('username');
          // console.log(this.username);
        },
        getRoleId(){
          this.roleId = sessionStorage.getItem("roleId");
          // console.log(this.roleId);
        },
        //修改交付方式
        changePayType(){
          if(this.uploadForm.softCategory3===2){//SAAS方式
              this.ifSAAS=true;this.ifDown=false;
          }else{
            this.ifSAAS=false;this.ifDown=true;
          }
        },
        //图标选择
        iconSelect(e) {
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
            this.uploadForm.icon=file;
          }
        },
        //服务选择
        fileSelect (e) {
          let file=e.target.files[0];
          const isLt2M = file.size / 1024 / 1024 < 100;
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过100MB!');
            return false;
          }else{
            this.uploadForm.file=file;
          }
        },
        submitUpload(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              event.preventDefault();
              let param = new window.FormData();
              Object.keys(this.uploadForm).forEach((item) => {
                param.append(item,this.uploadForm[item]);
              });
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              };
              this.$axios.post('/soft-detail/create',param,config).then((res)=>{
                if(res.data.message==="成功"){
                  this.$message({
                    message: '上传成功',
                    type: 'success'
                  });
                  this.$refs[formName].resetFields();
                }else{
                  this.$message({
                    message: '上传失败',
                    type: 'error'
                  });
                }

              }).catch((err)=>{
                console.log(err);
              });
            }else {
              console.log('error submit!!');
              return false;
            }
          })
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
         handleChange(file, fileList) {
          this.fileList = fileList.slice(-3);
        }
      },
    }
</script>

<style scoped>
.main-part{
  margin: 20px;
}
.line_style div{
 margin:10px 0;
}
.line_style div span{
 display:inline-block;
 width:120px;
}
.demo-input-suffix{
 display:flex;
 align-items:center;
}
#price table,#price table tr th, #price table tr td {
  border:1px solid #dddddd;
  padding: 5px 10px;
}
#price table {
  width: 100%;
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
}
</style>
