<template>
  <div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>当前企业
    </div>
     <img src="../../assets/common/logo_zhuchi.png" >
     <div class="suffix">
      当前企业：株洲齿轮有限责任公司
     </div>
     <div class="suffix">
      加入时间：2019年6月11日
     </div>
      <div class="suffix">
        <el-button type="primary">变更企业</el-button>
        <el-button type="primary">离开企业</el-button>
     </div>

    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>企业已购服务
    </div>
    <div class="work_table">
       <table
        width="90%"
        style="border-collapse:collapse;"
      >
        <tr style="font-weight:700;font-size:14px;line-height:35px;">
          <td>服务名</td>
          <td>软件图标</td>
          <td>版本号</td>
          <td>交付方式</td>
          <td>购买时间</td>
          <td>到期时间</td>
          <td>评分</td>
          <td>操作</td>
        </tr>
        <tr v-for="(data, index) in softData"
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
          <td>{{data.jiaofu}}</td>
          <td>{{data.bought}}</td>
          <td>{{data.end}}</td>
          <td><el-rate
            v-model="data.value"
            disabled
            show-score
            text-color="#ccc">
            </el-rate>
          </td>
          <td>
            <template >
                <el-button
                size="mini"
                name="select"
              >
                下载软件
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
          state: '',
            softData:[]
          }
      },
      mounted(){
        this.searchData();
      },
      methods:{
        searchData(){
          let param={username:this.username};
          this.$axios.get('/wc-group/group-softs',{params:param}).then((res)=>{
            if((typeof res.data.data!=="string")&&res.data.data.length>0)this.softData=res.data.data;
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
