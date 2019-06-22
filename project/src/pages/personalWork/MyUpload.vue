<template>
  <div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>我的上传
    </div>
    <div>
    <router-link :to="{path:'/personal-workbench/upload-service'}">
      <el-button type="primary">上传服务</el-button>
    </router-link></div>
    <div class="suffix">
      <el-input
      style="width:300px;"
        popper-class="my-autocomplete"
        v-model="searchVal" size="small"
        :fetch-suggestions="searchUploadData"
        placeholder="请输入内容">
      </el-input>
        <i
         style="margin:0 5px"
          class="el-icon-search"
          @click="searchUploadData">
        </i>
    </div>
    <div class="work_table">
       <table
        width="90%"
        style="border-collapse:collapse"
      >
        <tr style="font-weight:700;font-size:14px;line-height:35px;">
          <td>服务名</td>
          <td>软件图标</td>
          <td>版本号</td>
          <td>服务分类</td>
          <td>行业分类</td>
          <td>领域分类</td>
          <td>交付方式</td>
          <td>服务简介</td>
          <td>规格报价</td>
          <td>当前状态</td>
          <td>操作</td>
        </tr>
        <tr v-for="(data, index) in uploadData"
        style="font-size:12px;line-height:35px;"
      :key="index"
        >
          <td>{{data.softName}}</td>
          <td>
            <template>
              <img :src="'data:image/jpg;base64,'+data.icon" style="height:30px;width: 30px">
            </template>
          </td>
          <td>{{data.version}}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{data.state}}</td>
          <td>
            <template >
              <el-button
                size="mini"
                name="select"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                name="select"
              >
                下架
              </el-button>
            </template>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
    export default {
      data(){
          return{
            searchVal: '',
            uploadData:[]
          }
      },
      mounted(){
        this.searchUploadData();
      },
      methods:{
        searchUploadData(){
          let param={username:"admin",limit:100000};
          this.$axios.get('/soft-detail/my-upload',{params:param}).then((res)=>{
            if((typeof res.data.data!=="string")&&res.data.data.length>0)this.uploadData=res.data.data;
          }).catch((err)=>{
            console.log(err);
          });
        }
      },
    }
</script>

<style scoped>
.suffix{
 display:flex;
 align-items:center;
}
tr:nth-child(odd) {
  background: #efefef;
}
.line_style div{
 margin:10px 0;
}
.work_table{
  padding: 20px;
  max-height: 450px;
  overflow: auto
}
</style>
