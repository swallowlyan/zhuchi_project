<template>
  <el-dialog title="修改工号" :visible.sync="editWorkIdDialog" :before-close="closeModel">
    <el-form :model="editWorkIdItem" ref="editWorkIdItem" :rules="positionRules">
      <el-form-item :label="editWorkIdItem.oldTitle" :label-width="dialogLabelWidth" prop="oldName">
        <el-input v-model="person.WorkId" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :label="editWorkIdItem.newTitle" :label-width="dialogLabelWidth" prop="newWorkId">
        <el-input v-model="editWorkIdItem.newWorkId" type="WorkId" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="editWorkIdForm('editWorkIdItem')">确 定</el-button>
    </div>

  </el-dialog>
</template>
<script>
  export default {
    name: "editWorkId",
    data(){
      return{
        dialogLabelWidth:'120px',
        editWorkIdItem:{
          oldTitle:'当前工号',
          newTitle:"请输入新工号",
          val:'',
        },
        positionRules:{
          newWorkId:[
            { required: true, message: '请输入新工号', trigger: 'blur' },
          ]
        }
      }
    },
    /* watch: {
       editWorkIdDialog: {
         immediate: true,    // 这句重要
         handler(val) {
           console.log('action Value:' + val);
         }
       }
     },*/
    props:{
      editWorkIdDialog:false, person:""
    },
    methods:{
      editWorkIdForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /* this.$axios.get('/sysuser/check',{params:{
                 column:"workId",
                 value:this.editWorkIdItem.newWorkId
               }
             }).then((res)=>{
               if(res.data.data==="CHECK_NO_EXIST"){*/
            this.$axios.post('/sysuser/update',
              {workId:this.editWorkIdItem.newWorkId,username:this.person.username}).then((res)=>{
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
            this.$refs['editWorkIdItem'].resetFields();
            this.$emit('close');
            // parent.location.reload();
            /* }else{
               this.$message({
                 showClose: true,
                 message: "工号重复，请重新输入",
                 type: 'error'
               });
             }
           }).catch((err)=>{
             console.log(err);
           });*/
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeModel(){
        this.$refs['editWorkIdItem'].resetFields();
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
