<template>
  <el-dialog title="新增二级分类" :visible.sync="dialog_second" :before-close="closeModel">
    <el-form :model="secondItem" ref="secondItem" :rules="secondRules">
      <el-form-item prop="first" :label="secondItem.firstTitle" :label-width="dialogLabelWidth">
        <el-select v-model="secondItem.first" placeholder="请选择所属一级分类" style="width: 100%">
          <el-option v-for="item in secondItem.options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="secondItem.secondTitle" :label-width="dialogLabelWidth" prop="value">
        <el-input v-model="secondItem.value" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="addForm('secondItem')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    name: "addSecondDialog",
    data(){
      return{
        dialogLabelWidth:'150px',
        submitUrl:'',
        secondItem: {
          firstTitle: '请选择所属一级分类',
          secondTitle: '请输入二级分类名称',
          first:'',
          value: '',
          options:[]
        },
        secondRules: {
          first: [
            {required: true, message: '请选择一级分类', trigger: 'blur'},
          ],
          value: [
            {required: true, message: '请输入二级分类名称', trigger: 'blur'},
          ]
        }
      }
    },
    props:{
      dialog_second:false
    },
    created(){
      this.getFirst();
    },
    methods:{
      getFirst(){
        this.$axios.get('/soft-category',).then((res)=>{
          if(res.data.data.length>0){
            this.secondItem.options=[];
            res.data.data.forEach(item=>{
              let newItem={
                value:item.id,
                label:item.name
              };
              this.secondItem.options.push(newItem);
            });
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      addForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitUrl ='/soft-category/create';
            this.$axios.post(this.submitUrl,
              {
                parentId:this.secondItem.first,
                name:this.secondItem.value
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
                 message: '添加失败',
                 type: 'error'
               });
             }
            }).catch((err)=>{
              console.log(err);
            });
            this.$refs['secondItem'].resetFields();
            this.$emit('close');

            /*this.$http.get(this.ul).then((res)=>{
              console.log(res)
              if(res.success = true){

              }
            }).catch((res)=>{
              console.log("失败")
            });*/
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeModel(){
        this.$refs['secondItem'].resetFields();
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
