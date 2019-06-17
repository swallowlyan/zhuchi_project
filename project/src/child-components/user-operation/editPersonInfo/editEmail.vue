<template>
  <el-dialog title="修改邮箱" :visible.sync="editEmailDialog" :before-close="closeModel">
    <el-form :model="editEmailItem" ref="editEmailItem" :rules="positionRules">
      <el-form-item :label="editEmailItem.oldTitle" :label-width="dialogLabelWidth" prop="oldEmail">
        <el-input v-model="person.email" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :label="editEmailItem.newTitle" :label-width="dialogLabelWidth" prop="newEmail">
        <el-input v-model="editEmailItem.newEmail" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="editEmailForm('editEmailItem')">确 定</el-button>
    </div>

  </el-dialog>
</template>
<script>
  export default {
    name: "editEmail",
    data(){
      return{
        dialogLabelWidth:'120px',
        editEmailItem:{
          oldTitle:'当前邮箱',
          newTitle:"请输入新邮箱",
          newEmail:'',
        },
        positionRules:{
          newEmail:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
   /* watch: {
      editEmailDialog: {
        immediate: true,    // 这句重要
        handler(val) {
          console.log('action Value:' + val);
        }
      }
    },*/
      props:{
        editEmailDialog:false, person:""
    },
    methods:{
      editEmailForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get('/sysuser/check',{params:{
                column:"email",
                value:this.editEmailItem.newEmail
              }
            }).then((res)=>{
              if(res.data.data==="CHECK_NO_EXIST"){
                this.$axios.post('/sysuser/update',
                  {email:this.editEmailItem.newEmail,
                  username:this.person.username}).then((res)=>{
                  if(res.data.message==="成功"){
                    this.$message({
                      showClose: true,
                      message: "修改成功",
                      type: 'success'
                    });
                    this.$emit('refresh');
                  }else{
                    this.$message({
                      showClose: true,
                      message: "修改失败",
                      type: 'error'
                    });
                  }
                }).catch((err)=>{
                  console.log(err);
                });
                this.$refs['editEmailItem'].resetFields();
                this.$emit('close');
              }else{
                this.$message({
                  showClose: true,
                  message: "邮箱重复，请重新输入",
                  type: 'error'
                });
              }
             }).catch((err)=>{
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeModel(){
        this.$refs['editEmailItem'].resetFields();
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
