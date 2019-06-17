<template>
  <el-dialog title="编辑软件" :visible.sync="dialog_editSoft" :before-close="closeModel">
    <el-form :model="softItem" ref="softItem" :rules="softRules">
      <el-form-item label="软件名" :label-width="dialogLabelWidth" prop="name">
        <el-input v-model="softItem.softName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="版本号" :label-width="dialogLabelWidth" prop="version">
        <el-input v-model="softItem.softVersion" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="采购模块" :label-width="dialogLabelWidth" prop="procurement">
        <el-input v-model="softItem.softBoughtMoudle" autocomplete="off"></el-input>
      </el-form-item>
      <form class="demo-form-inline frequencyForm" style="height:60px">
        <el-col :span="10">
        <el-form-item label="所属部门" :label-width="dialogLabelWidth" prop="softCategory">
            <el-select v-model="softItem.softCategory" placeholder="所属一级分类" @change="getSecond">
              <el-option v-for="item in firstOptions"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label=""  prop="softCategory2">
            <el-select v-model="softItem.softCategory2" placeholder="所属二级分类" @change="getLast">
              <el-option v-for="item in secondOptions"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label=""  prop="softCategory3">
            <el-select v-model="softItem.softCategory3" placeholder="所属三级分类">
              <el-option v-for="item in lastOptions"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
      </form>

      <el-form-item label="功能描述" :label-width="dialogLabelWidth" prop="function">
        <el-input v-model="softItem.softFunDes" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标签设置" :label-width="dialogLabelWidth" prop="label">
        <el-input v-model="softItem.softTag" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="配置需求" :label-width="dialogLabelWidth" prop="config">
        <el-input v-model="softItem.softMinEnv" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="softItem.iconTitle" :label-width="dialogLabelWidth" prop="icon">
        <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="beforeUpload"/>
        <img :src="softItem.softIcon" style="height:60px;width: 60px"/>
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
        username:'',
        firstOptions:[],
        secondOptions:[],
        lastOptions:[],
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
          ],
          softCategory:[
            {required: true, message: '请选择软件分类', trigger: 'blur'},
          ],
        }
      }
    },
    props:{
      dialog_editSoft:false,
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
        softCategory:'',
        softCategory2:'',
        softCategory3:'',
        softIcon:''
      },
    },
    created(){
      this.getGroup();
      /*this.getSecond(this.softItem.softCategory);
      this.getLast(this.softItem.softCategory2);*/
    },
    watch: {
      softItem: {
        immediate: true,    // 这句重要
        handler(val) {
          if(val.softCategory!==""){
            this.getSecond(val.softCategory);
          }else{
            this.getGroup();
          }
          if(val.softCategory2!==""){
            this.getLast(val.softCategory2);
          }
        }
      }
    },
    methods:{
      getGroup(){
        this.$axios.get('/soft-category').then((res)=>{
          if(res.data.data.length>0){
            this.firstOptions=res.data.data;
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      getSecond(val){
        console.log(val);
        this.$axios.get('/soft-category',{params:{parentId:val}}).then((res)=>{
          if(res.data.data.length>0){
            this.secondOptions=res.data.data;
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      getLast(val){
        this.$axios.get('/soft-category',{params:{parentId:val}}).then((res)=>{
          if(res.data.data.length>0){
            this.lastOptions=res.data.data;
          }else{
            this.softItem.softCategory3="";
            this.lastOptions=[];
          }
        }).catch((err)=>{
          console.log(err);
        });
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
          this.softItem.softIcon=file;
        }
      },
      addForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = new window.FormData();
            param.append('id', this.softItem.id);
            param.append('softName', this.softItem.softName);
            param.append('softVersion', this.softItem.softVersion);
            param.append('softBoughtMoudle', this.softItem.softBoughtMoudle);
            param.append('softMinEnv', this.softItem.softMinEnv);
            param.append('softFunDes', this.softItem.softFunDes);
            param.append('softTag', this.softItem.softTag);
            param.append('softCategory', this.softItem.softCategory);
            param.append('softCategory2', this.softItem.softCategory2);
            param.append('softCategory3', this.softItem.softCategory3);
            this.username = sessionStorage.getItem("username");
            param.append('username', this.username);
            if(this.softItem.softIcon.size!==undefined){
              param.append('icon', this.softItem.softIcon);
            }
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            };
            this.$axios.post('/soft-detail/update', param,config)
              .then((res)=> {
                if(res.data.message==="成功"){
                  this.$message({
                    showClose: true,
                    message: '修改成功',
                    type: 'success'
                  });
                  this.$emit('refresh');
                }else{
                  this.$message.error('修改失败');
                  this.$emit('refresh');
                }
              }).catch((err)=>{
              console.log(err);
            });

            this.$refs['softItem'].resetFields();
            this.$emit('close');
          } else {
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
