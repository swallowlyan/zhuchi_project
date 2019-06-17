<template>
  <el-dialog title="编辑分组" :visible.sync="editDialog" :before-close="closeModel">
    <el-form :model="editItem" ref="editItem" :rules="positionRules">
      <el-form-item :label="editItem.oldTitle" :label-width="dialogLabelWidth" prop="oldName">
        <el-input v-model="oldName" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :label="editItem.newTitle" :label-width="dialogLabelWidth" prop="newName">
        <el-input v-model="editItem.newName" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="editForm('editItem')">确 定</el-button>
    </div>

  </el-dialog>
</template>
<script>
  export default {
    name: "editPosition",
    data(){
      return{
        dialogLabelWidth:'120px',
        editItem:{
          oldTitle:'当前分组名称',
          newTitle:"请输入新名称",
          newName:'',
        },
        positionRules:{
          newName:[
            { required: true, message: '请输入分组名称', trigger: 'blur' },
          ]
        }
      }
    },
    watch: {
      editDialog: {
        immediate: true,    // 这句重要
        handler(val) {
          console.log('action Value:' + val);
        }
      }
    },
      props:{
      editDialog:false, position:"",oldName:''
    },
    methods:{
      editForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/wc-position/update',{
              positionId:this.position.id,
              name:this.editItem.newName
            }).then((res)=>{
              if(res.data.message==="成功"){
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                });
              }else{
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'error'
                });
              }
             }).catch((err)=>{
              console.log(err);
            });
            this.$refs['editItem'].resetFields();
            this.$emit('refresh');
            this.$emit('close');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeModel(){
        this.$refs['editItem'].resetFields();
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
