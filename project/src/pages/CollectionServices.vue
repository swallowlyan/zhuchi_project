<template>
  <div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>已收藏服务
    </div>
    <div>
      <div style="margin:0 auto;width:85%;">
        <div class="suffix" style="justify-content:space-between;border-bottom:1px dashed #aaa;padding:0 10px;"
         v-for="(data, index) in datas"
        :key="index"
        >
          <div>图片</div>
          <div>
            <div style="font-size:14px;font-weight:700;">{{data.title}}</div>
            <div style="font-size:12px;">catia</div>
            <div style="font-size:12px;">catia</div>
          </div>
          <div> 
            <div style="font-size:12px;" class="suffix">
            <span>评分:&emsp;</span>
            <el-rate
              v-model="data.value"
              disabled
              show-score
              text-color="#ccc">
            </el-rate>
            </div>
            <div style="font-size:12px;">月销量:{{data.value}}笔</div>
          </div>
          <div>
            <el-button
                size="mini"
                name="select"
              >
               已购买
              </el-button>
            <div style="font-size:12px;">交付方式:{{data.way}}</div>
          </div>
          <div>
            <el-button
                size="mini"
                name="select"
              >
               取消收藏
            </el-button>
          <div style="font-size:12px;">&emsp;</div>
          </div>
        </div>
      </div>
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
              { title: 'CATIA',value:'5',way:'SAAS'},
              { title: 'Creo',value:'',way:'下载'},
              { title: 'Creo',value:'',way:'SAAS'},
              { title: 'Creo',value:'',way:'SAAS'},
              { title: 'Creo',value:'',way:'SAAS'},
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
