<template>
  <el-dialog title="修改昵称" :visible.sync="editNicknameDialog" :before-close="closeModel">
    <el-form :model="editNameItem" ref="editNameItem" :rules="positionRules">
      <el-form-item :label="editNameItem.oldTitle" :label-width="dialogLabelWidth" prop="oldName">
        <el-input v-model="person.nickname" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :label="editNameItem.newTitle" :label-width="dialogLabelWidth" prop="newName">
        <el-input v-model="editNameItem.newName" type="nickname" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="editNameForm('editNameItem')">确 定</el-button>
    </div>

  </el-dialog>
</template>
<script>
  export default {
    name: "editNickname",
    data(){
      return{
        dialogLabelWidth:'120px',
        editNameItem:{
          oldTitle:'当前昵称',
          newTitle:"请输入新昵称",
          val:'',
        },
        positionRules:{
          newName:[
            { required: true, message: '请输入新昵称', trigger: 'blur' },
          ]
        }
      }
    },
    /* watch: {
       editNicknameDialog: {
         immediate: true,    // 这句重要
         handler(val) {
           console.log('action Value:' + val);
         }
       }
     },*/
    props:{
      editNicknameDialog:false, person:""
    },
    methods:{
      editNameForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get('/sysuser/check',{params:{
                column:"nickname",
                value:this.editNameItem.newName
              }
            }).then((res)=>{
              if(res.data.data==="CHECK_NO_EXIST"){
                this.$axios.post('/sysuser/update',
                  {nickname:this.editNameItem.newName,username:this.person.username}).then((res)=>{
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
                this.$refs['editNameItem'].resetFields();
                this.$emit('close');
                // parent.location.reload();
              }else{
                this.$message({
                  showClose: true,
                  message: "昵称重复，请重新输入",
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
        this.$refs['editNameItem'].resetFields();
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
