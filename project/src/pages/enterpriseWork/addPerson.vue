<template>
  <el-dialog title="添加成员" :visible.sync="addDialog_person" :before-close="closeModel">
    <el-row>
      <el-col :span="15" :offset="2"><el-input v-model="searchVal" autocomplete="off"></el-input></el-col>
      <el-col :span="1">
        <el-button @click="searchPerson()">
          <i style="margin:0 5px" class="el-icon-search" ></i>
        </el-button>
      </el-col>

    </el-row>
    <el-row>
    <div class="work_table">
      <table
        width="90%"
        style="border-collapse:collapse"
      >
        <tr style="font-weight:700;font-size:14px;line-height:35px;">
          <td>用户名</td>
          <td>账号</td>
          <td>手机号</td>
          <td>邮箱</td>
          <td>操作</td>
        </tr>
        <tr v-for="(data, index) in personList"
            style="font-size:12px;line-height:35px;"
            :key="index"
        >
          <td>{{data.username}}</td>
          <td>{{data.nickname}}</td>
          <td>{{data.phone}}</td>
          <td>{{data.email}}</td>
          <td>
            <template>
              <el-button size="mini" type="text" name="select" @click="addPerson(data.id)">
                加入企业
              </el-button>
            </template>
          </td>
        </tr>
      </table>
      <el-pagination background @size-change="searchPerson"
                     @current-change="searchPerson"
                     :current-page.sync="current"
                     :page-sizes="[5,10]"
                     :page-size.sync="pageSize"
                     layout="total, sizes, prev, pager, next"
                     :total="total"
                     style="margin: 20px 0px;float: right">
      </el-pagination>
    </div>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: "addPerson",
      data(){
          return {
            searchVal:"",
            personList:[],
            pageSize:5,
            total:0,
            current:1
          }
      },
      props:{
        addDialog_person:{
          type:Boolean,
        default(){return false}
        }
      },
      created(){
          this.searchPerson();
      },
      methods:{
        searchPerson(){
          this.$axios.post('/sysuser/free-users',{
            current:this.current,
            size:this.pageSize,
            sort:'id',
            dir:'asc',
            search:this.searchVal
          }).then((res)=>{
            console.info(res.data);
            this.personList=res.data.data.records;
            this.total=res.data.data.total;
          }).catch((err)=>{
            console.log(err);
          });

        },
        addPerson(id){

        },
        closeModel(){
          this.$emit('close');
        }
      }
    }
</script>

<style scoped>
  .work_table{
    padding: 20px;
    max-height: 450px;
    overflow: auto
  }
</style>
