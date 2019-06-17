<template>
  <el-dialog title="新增三级分类" :visible.sync="dialog_last" :before-close="closeModel">
    <el-form :model="lastItem" ref="lastItem" :rules="lastRules">
      <el-form-item prop="first" :label="lastItem.firstTitle" :label-width="dialogLabelWidth">
        <el-select v-model="lastItem.first" placeholder="请选择所属一级分类" style="width: 100%"
                   @change="changeSecondOptions">
          <el-option v-for="item in lastItem.firstOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="second" :label="lastItem.secondTitle" :label-width="dialogLabelWidth">
        <el-select v-model="lastItem.second" placeholder="请选择所属二级分类" style="width: 100%">
          <el-option v-for="item in lastItem.secondOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="lastItem.lastTitle" :label-width="dialogLabelWidth" prop="value">
        <el-input v-model="lastItem.value" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="addForm('lastItem')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    name: "addLastDialog",
    data(){
      return{
        dialogLabelWidth:'150px',
        submitUrl:'',
        lastItem: {
          firstTitle: '请选择所属一级分类',
          secondTitle: '请选择所属二级分类',
          lastTitle: '请输入三级分类名称',
          first:'',
          second:'',
          value: '',
          firstOptions:[],
          secondOptions:[]
        },
        lastRules: {
          first: [
            {required: true, message: '请选择一级分类', trigger: 'blur'},
          ],
          second: [
            {required: true, message: '请选择二级分类', trigger: 'blur'},
          ],
          value: [
            {required: true, message: '请输入三级分类名称', trigger: 'blur'},
          ]
        }
      }
    },
    props:{
      dialog_last:false
    },
    created(){
      this.getFirst();
    },
    methods:{
      getFirst(){
        this.$axios.get('/soft-category',).then((res)=>{
          if(res.data.data.length>0){
            this.lastItem.firstOptions=[];
            res.data.data.forEach(item=>{
              let newItem={
                value:item.id,
                label:item.name
              };
              this.lastItem.firstOptions.push(newItem);
            });
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      changeSecondOptions(val){//根据一级分类联动刷新二级内容
        this.$axios.get('/soft-category',
          {
          params:{
            parentId:val
          }
        }).then((res)=>{
          if(res.data.data.length>0){
            this.lastItem.secondOptions=[];
            res.data.data.forEach(item=>{
              let newItem={
                value:item.id,
                label:item.name
              };
              this.lastItem.secondOptions.push(newItem);
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
                parentId:this.lastItem.second,
                name:this.lastItem.value
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
            this.$refs['lastItem'].resetFields();
            this.$emit('close');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeModel(){
        this.$refs['lastItem'].resetFields();
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
