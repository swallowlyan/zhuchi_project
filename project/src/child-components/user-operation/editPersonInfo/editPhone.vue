<template>
  <el-dialog title="修改手机号" :visible.sync="editPhoneDialog" :before-close="closeModel">
    <el-form :model="editPhoneItem" ref="editPhoneItem" :rules="positionRules">
      <el-form-item :label="editPhoneItem.oldTitle" :label-width="dialogLabelWidth" prop="oldPhone">
        <el-input v-model="person.phone" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :label="editPhoneItem.newTitle" :label-width="dialogLabelWidth" prop="newPhone">
        <el-input v-model="editPhoneItem.newPhone" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="editPhoneForm('editPhoneItem')">确 定</el-button>
    </div>

  </el-dialog>
</template>
<script>
  export default {
    name: "editPhone",
    data(){
      let validPhone=(rule, value, callback) =>{
        let regPhone=/^1[34578]d{9}$/;
        if(value===""){
          callback(new Error('请输入新的手机号'));
        }/*else if(!regPhone.test(value)){
          callback(new Error('请输入正确的手机号'));
        }else{
          callback();
        }*/
      };
      return{
        dialogLabelWidth:'120px',
        editPhoneItem:{
          oldTitle:'当前手机号',
          newTitle:"请输入新手机号",
          newPhone:'',
        },
        positionRules:{
          newPhone:[
            { required: true, message: '请输入手机号', trigger: 'blur'},
          ]
        }
      }
    },
    /* watch: {
       editPhoneDialog: {
         immediate: true,    // 这句重要
         handler(val) {
           console.log('action Value:' + val);
         }
       }
     },*/
    props:{
      editPhoneDialog:false, person:""
    },
    methods:{
      editPhoneForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get('/sysuser/check',{params:{
                column:"phone",
                value:this.editPhoneItem.newPhone
              }
            }).then((res)=>{
              if(res.data.data==="CHECK_NO_EXIST"){
                this.$axios.post('/sysuser/update',
                  {phone:this.editPhoneItem.newPhone,
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
                this.$refs['editPhoneItem'].resetFields();
              }else{
                this.$message({
                  showClose: true,
                  message: "手机号重复，请重新输入",
                  type: 'error'
                });
              }
            }).catch((err)=>{
              console.log(err);
            });
            this.$emit('close');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeModel(){
        this.$refs['editPhoneItem'].resetFields();
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
