<template>
  <el-dialog title="新增一级分类" :visible.sync="dialog_first" :before-close="closeModel">
    <el-form :model="firstItem" ref="firstItem" :rules="firstRules">
      <el-form-item :label="firstItem.title" :label-width="dialogLabelWidth" prop="value">
        <el-input v-model="firstItem.value" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="addForm('firstItem')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    name: "addFirstDialog",
    data(){
      return{
        dialogLabelWidth:'150px',
        submitUrl:'',
        firstItem: {
          title: '请输入一级分类名称',
          value: '',
        },
        firstRules: {
          value: [
            {required: true, message: '请输入一级分类名称', trigger: 'blur'},
          ]
        }
      }
    },
    props:{
      dialog_first:false
    },
    methods:{
      addForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitUrl ='/soft-category/create';
            this.$axios.post(this.submitUrl,
              {parentId:null,name:this.firstItem.value}
              ).then((res)=>{
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
            this.$refs['firstItem'].resetFields();
            this.$emit('refresh');
            this.$emit('close');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeModel(){
        this.$refs['firstItem'].resetFields();
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
