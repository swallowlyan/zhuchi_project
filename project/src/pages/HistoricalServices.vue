<template>
  <div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>历史服务
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
          <td>使用总时长</td>
          <td>最近使用时间</td>
          <td>操作</td>
        </tr>
        <tr v-for="(data, index) in datas"
        style="font-size:12px;line-height:35px;"
      :key="index"
        >
          <td>{{data.title}}</td>
          <td></td>
          <td></td>
          <td>{{data.way}}</td>
          <td></td>
          <td></td>
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
    <div style="text-align:center;">
    <el-pagination
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
