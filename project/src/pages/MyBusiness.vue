<template>
  <div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>当前企业
    </div>
     <img src="../assets/common/logo_zhuchi.png" >
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
    <div>
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
        <tr v-for="(data, index) in datas"
        style="font-size:12px;line-height:35px;"
      :key="index"
        >
          <td>{{data.title}}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
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
          currentPage4: 4
          }
      },
      created(){
      },
      methods:{
     
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
