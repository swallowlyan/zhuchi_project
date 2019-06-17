<template>
  <el-dialog title="新增部门" :visible.sync="addDialog_group" :before-close="closeModel">
    <el-form :model="groupItem" ref="groupItem" :rules="groupRules">
      <el-form-item :label="groupItem.title" :label-width="dialogLabelWidth" prop="value">
        <el-input v-model="groupItem.value" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="addForm('groupItem')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    name: "groupDialog",
    data(){
      return{
        dialogLabelWidth:'120px',
        groupItem: {
          title: '部门名称',
          value: '',
        },
        groupRules: {
          value: [
            {required: true, message: '请输入部门名称', trigger: 'blur'},
          ]
        }
      }
    },
    props:{
      addDialog_group:false
    },
    methods:{
      addForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitUrl ='/wc-group/create';
            this.$axios.post(this.submitUrl,{
              name:this.groupItem.value
            }).then((res)=>{
              if(res.data.message==="成功"){
                this.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                });
              }else{
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'error'
                });
              }
              this.$refs['groupItem'].resetFields();
              this.$emit('refresh');
              this.$emit('close');

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
        this.$refs['groupItem'].resetFields();
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
