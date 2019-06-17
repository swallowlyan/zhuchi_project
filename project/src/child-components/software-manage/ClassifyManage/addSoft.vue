<template>
  <el-dialog title="新增软件" :visible.sync="dialog_addSoft" :before-close="closeModel">
    <el-form :model="softItem" ref="softItem" :rules="softRules" enctype="multipart/form-data">
      <div style="margin: 2% 10%;font-size: 16px">您正在为&nbsp;&nbsp;{{firstNode}}&nbsp;>&nbsp;{{secondNode}}&nbsp;>&nbsp;{{lastNode}}&nbsp;&nbsp;分类中添加软件</div>
      <el-form-item :label="softItem.nameTitle" :label-width="dialogLabelWidth" prop="softName">
        <el-input v-model="softItem.softName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="softItem.versionTitle" :label-width="dialogLabelWidth" prop="softVersion">
        <el-input v-model="softItem.softVersion" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="softItem.proTitle" :label-width="dialogLabelWidth" prop="softBoughtMoudle">
        <el-input v-model="softItem.softBoughtMoudle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="softItem.functionTitle" :label-width="dialogLabelWidth" prop="softFunDes">
        <el-input v-model="softItem.softFunDes" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="softItem.labelTitle" :label-width="dialogLabelWidth" prop="softTag">
        <el-input v-model="softItem.softTag" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="softItem.configTitle" :label-width="dialogLabelWidth" prop="softMinEnv">
        <el-input v-model="softItem.softMinEnv" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="softItem.iconTitle" :label-width="dialogLabelWidth" prop="icon">
        <!--<el-upload class="upload-demo" action="" ref="upload"
          :auto-upload="false"
          :limit="3"
          :multiple="false"
          :on-change="beforeUpload">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>-->
        <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="beforeUpload"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="addForm('softItem')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    name: "addSoftDialog",
    data(){
      return{
        dialogLabelWidth:'150px',
        submitUrl:'',
        imageUrl: '',
        username:'',
        fileList:[],
        src:'',
        softItem: {
          nameTitle: '软件名',
          softName: '',
          versionTitle: '版本号',
          softVersion: '',
          proTitle: '采购模块',
          softBoughtMoudle: '',
          functionTitle: '功能描述',
          softFunDes: '',
          labelTitle: '标签设置',
          softTag: '',
          configTitle: '配置需求',
          softMinEnv: '',
          iconTitle:'软件图标',
          icon:''
        },
        softRules: {
          softName: [
            {required: true, message: '请输入软件名', trigger: 'blur'},
          ],
          softVersion: [
            {required: true, message: '请输入版本号', trigger: 'blur'},
          ],
          softBoughtMoudle: [
            {required: true, message: '请输入采购模块', trigger: 'blur'},
          ],
          softFunDes: [
            {required: true, message: '请输入功能描述', trigger: 'blur'},
          ],
          softTag: [
            {required: true, message: '请输入标签设置', trigger: 'blur'},
          ],
          softMinEnv: [
            {required: true, message: '请输入配置需求', trigger: 'blur'},
          ]
        }
      }
    },
    props:{
      dialog_addSoft:false,
      firstNode:'',
      secondNode:'',
      lastNode:'',
      currentCategory:'',
      currentCategory2:'',
      currentCategory3:''
    },
    methods:{
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
          this.softItem.icon=file;
        }
      },
      addForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.softItem.icon===undefined||this.softItem.icon===""){
              this.$message({
                showClose: true,
                message: '请上传图片',
                type: 'error'
              });
            }else{
            event.preventDefault();
              let param = new window.FormData();
              param.append('softName', this.softItem.softName);
              param.append('softVersion', this.softItem.softVersion);
              param.append('softBoughtMoudle', this.softItem.softBoughtMoudle);
              param.append('softMinEnv', this.softItem.softMinEnv);
              param.append('softFunDes', this.softItem.softFunDes);
              param.append('softTag', this.softItem.softTag);
              param.append('softCategory', this.currentCategory);
              param.append('softCategory2', this.currentCategory2);
              if(this.currentCategory3!==""){
                param.append('softCategory3', this.currentCategory3);
              }
              this.username = sessionStorage.getItem("username");
              param.append('username', this.username);
              param.append('icon', this.softItem.icon);
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              };
              this.$axios.post('/soft-detail/create', param,config)
                .then((res)=> {
                  if(res.data.message==="成功"){
                    this.$message({
                      showClose: true,
                      message: '添加成功',
                      type: 'success'
                    });
                  }else{
                    this.$message({
                      showClose: true,
                      message: '添加失败',
                      type: 'error'
                    });
                  }
                }).catch((err)=>{
                console.log(err);
              });
              this.$refs['softItem'].resetFields();
              this.$emit('refresh');
              this.$emit('close');
            }
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeModel(){
        this.$refs['softItem'].resetFields();
        this.$emit('close');
      }
    }
  }
</script>
<style>
  .el-form-item__label
  {
    color: #000000;
  }
  </style>
