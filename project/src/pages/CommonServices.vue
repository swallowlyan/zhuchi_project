<template>
  <div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>运营管理
    </div>
    <div class="suffix">
      <div style="text-align:center;">
        <i class="fa fa-users fa-3x"></i>
        <div>客户管理组件</div>
      </div>
      <div style="text-align:center;">
        <i class="fa fa-clipboard fa-3x"></i>
        <div>销售物流监控组件</div>
      </div>
    </div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>仓储物流
    </div>
    <div class="suffix">
      <div style="text-align:center;">
        <i class="fa fa-bar-chart fa-3x"></i>
        <div>仓储质量监控组件</div>
      </div>
      <div style="text-align:center;">
        <i class="fa fa-line-chart fa-3x"></i>
        <div>仓库成本监控组件</div>
      </div>
       <div style="text-align:center;">
        <i class="fa fa-file-text-o fa-3x"></i>
        <div>出库任务统计追踪组件</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      data(){
          return{
          }
      },
      created(){
      },
      methods:{
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
.suffix div{
  margin:10px;
  cursor:pointer;
}
.suffix div div{
  font-size:14px;
}
</style>
