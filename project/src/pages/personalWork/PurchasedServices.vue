<template>
  <div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>已购买服务
    </div>
    <div  style="padding: 20px;max-height: 450px;overflow: auto">
      <table width="90%" style="border-collapse:collapse">
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

        <tr v-for="(data, index) in buyService"
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
          <td>
            <template>
              <el-rate
                v-model="data.scope"
                disabled
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </template>
          </td>
          <td>
            <template>
              <el-button type="text" size="mini">续费</el-button>
              <el-button type="text" size="mini">暂停</el-button>
              <el-button type="text" size="mini">退款</el-button>
              <el-button type="text" size="mini">重新下载</el-button>
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
          restaurants: [],
          state: '',
          datas: [
              { title: 'Creo',value:'5',way:'SAAS'},
              { title: 'Creo',value:'5',way:'SAAS'},
              { title: 'Creo',value:'5',way:'SAAS'},
              { title: 'Creo',value:'5',way:'SAAS'},
              { title: 'Creo',value:'5',way:'SAAS'},
          ],
          currentPage1: 5,
          currentPage2: 5,
          currentPage3: 5,
          currentPage4: 4,
            buyService:[],
          }
      },
      mounted(){
        this.getBuyService();
      },
      methods:{
        getBuyService(){
          let param={username:"admin",limit:8};
          this.$axios.get('/wc-index/available-softs',{params:param}).then((res)=>{
            if(res.data.data.length>0)this.buyService=res.data.data;
            console.info(this.buyService);
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
</style>
