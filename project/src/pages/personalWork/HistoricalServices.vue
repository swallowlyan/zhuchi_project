<template>
  <div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>历史服务
    </div>
    <div class="work_table">
       <table width="90%" style="border-collapse:collapse;">
        <tr style="font-weight:700;font-size:14px;line-height:35px;">
          <td>服务名</td>
          <td>软件图标</td>
          <td>版本号</td>
          <td>交付方式</td>
          <td>使用总时长</td>
          <td>最近使用时间</td>
          <td>操作</td>
        </tr>
        <tr v-for="(data, index) in historyData"
        style="font-size:12px;line-height:35px;"
        :key="index">
          <td>{{data.softName}}</td>
          <td>
            <template>
              <img :src="'data:image/jpg;base64,'+data.icon" style="height:30px;width: 30px">
            </template>
          </td>
          <td>{{data.version}}</td>
          <td>{{data.jiaofu}}</td>
          <td>{{data.jiaofu}}</td>
          <td>{{data.jiaofu}}</td>
          <td>
            <template >
              <el-button
                size="mini"
                name="select"
              >
                 重新下载
              </el-button>
              <el-button
                size="mini"
                name="select"
              >
                删除记录
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
            username:sessionStorage.getItem('username'),
            historyData: []
          }
      },
      mounted(){
        this.getHistoryData();
      },
      methods:{
        getHistoryData(){
          let param={username:this.username,limit:100000};
          this.$axios.get('/wc-index/recent-softs',{params:param}).then((res)=>{
            if((typeof res.data.data!=="string")&&res.data.data.length>0)this.historyData=res.data.data;
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
