<template>
  <div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>已购买服务
    </div>
    <div>
      <el-table
        :data="buyService"
        style="width: 100%">
        <el-table-column prop="softName" label="服务名" width="120"></el-table-column>
        <el-table-column prop="softIcon" label="软件图标" width="120">
          <template slot-scope="scope">
            <img :src="'data:image/jpg;base64,'+scope.row.icon" style="height:30px;width: 30px">
          </template>
        </el-table-column>
        <el-table-column prop="version" label="版本号" width="90"></el-table-column>
        <el-table-column prop="jiaofu" label="交付方式" width="100"></el-table-column>
        <el-table-column prop="bought" label="购买时间" width="150"></el-table-column>
        <el-table-column prop="end" label="到期时间" width="150"></el-table-column>
        <el-table-column prop="score" label="评分" width="150">
          <template slot-scope="scope">
          <el-rate
            v-model="scope.row.scope"
            disabled
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini">续费</el-button>
            <el-button type="text" size="mini">暂停</el-button>
            <el-button type="text" size="mini">退款</el-button>
            <el-button type="text" size="mini">重新下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align:center;">
    <el-pagination
      style="margin-left:-100px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
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
        },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
