<template>
  <el-dialog title="新增分组" :visible.sync="addDialog_po" :before-close="closeModel">
    <el-form :model="positionItem" ref="positionItem" :rules="positionRules">
      <el-form-item :label="positionItem.groupTitle" :label-width="dialogLabelWidth" v-if="currentRole">
        <el-select v-model="positionItem.group" :placeholder="positionItem.groupTitle" style="width: 100%">
          <el-option v-for="item in groupArr"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门" :label-width="dialogLabelWidth" v-if="!currentRole">
        <div v-html="advanceGroup"></div>
      </el-form-item>
      <el-form-item :label="positionItem.positionTitle" :label-width="dialogLabelWidth" prop="position">
        <el-input v-model="positionItem.position" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="positionItem.roleTitle" :label-width="dialogLabelWidth" v-if="currentRole">
        <el-radio v-model="positionItem.role" label="common">普通用户</el-radio>
        <el-radio v-model="positionItem.role" label="senior">高级用户</el-radio>
      </el-form-item>
      <el-form-item :label="positionItem.noteTitle" :label-width="dialogLabelWidth" prop="note">
        <el-input v-model="positionItem.note" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="addForm('positionItem')">确 定</el-button>
    </div>

  </el-dialog>
</template>
<script>
  export default {
    name: "positionDialog",
    data(){
      return{
        dialogLabelWidth:'120px',
        submitUrl:'',
        groupArr:[],
        positionItem:{
          groupTitle:'请选择部门',
          group:'',
          positionTitle:"请输入分组名称",
          position:'',
          roleTitle:"请选择角色",
          role:'common',
          noteTitle:'请输入备注',
          note:''

        },
        positionRules:{
          /*group:[
            { required: true, message: '请输入部门名称', trigger: 'blur' },
          ],*/
          position:[
            { required: true, message: '请输入分组名称', trigger: 'blur' },
          ],
          note:[
            { required: true, message: '请输入备注', trigger: 'blur' },
          ],
        }
      }
    },
    props:{
      addDialog_po:false,
      currentRole:'',
      advanceGroupId:'',
      advanceGroup:''
    },
    created(){
      this.getAllGroup();
    },
    methods:{
      getAllGroup(){
        this.$axios.get('/wc-group/groups')
          .then((res)=>{
            this.groupArr=res.data.data;
          })
          .catch((err)=>{
            console.log("error");
          });
      },
      addForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitUrl ='/wc-position/create';
            let ifAdd=false;
            let param={};
            if(this.currentRole){//管理员
              if(this.positionItem.group===""){
                this.$message({
                  showClose: true,
                  message: '请选择部门',
                  type: 'error'
                });
              }else{
                ifAdd=true;
                param={
                  name:this.positionItem.position,
                  groupId:this.positionItem.group,
                  positionType:this.positionItem.role
                };
              }
            }else{//高级用户
              ifAdd=true;
              param={
                name:this.positionItem.position,
                groupId:this.advanceGroupId,
                positionType:"common"
              };
            }
            if(ifAdd){
              this.$axios.post(this.submitUrl,param).then((res)=>{
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
                this.$refs['positionItem'].resetFields();
                this.$emit('refresh');
                this.$emit('close');
              }).catch((err)=>{
                console.log(err);
              });
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeModel(){
        this.$refs['positionItem'].resetFields();
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
