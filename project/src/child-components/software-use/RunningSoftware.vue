<template>
    <el-card class="running-software">
      <p class="running-head">运行软件列表</p>
      <el-table class="running-table" :data="RunningData" border style="width: 60%"
                :row-style="TableRowStyle"
                :header-cell-style="TableRowStyle"
                :cell-style="TableCellStyle">
        <el-table-column prop="softName" label="软件名" min-width="10%" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="softVersion" label="版本" min-width="5%" align="center" :show-overflow-tooltip="true"></el-table-column>
        <!--<el-table-column prop="module" label="运行模块" min-width="7%" align="center"></el-table-column>-->
        <el-table-column prop="cloudUrl" label="云桌面地址" min-width="20%" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="cloudUrl" label="操作" min-width="18%" align="center">
          <template slot-scope="scope">
            <el-button @click="openSoft(scope.row)" type="text" size="medium">重进软件</el-button>
            <el-button @click="releaseSoft(scope.row)" type="text" size="medium">归还软件</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
</template>

<script>
  import {baseUrl} from '../../scripts/config'

    export default {
        name: "RunningSoftware",
      data(){
          return{
            RunningData:[],
            username:'',
          }
      },

      created(){
          this.init();
        this.getRunning();
      },

      methods:{
          init(){
            this.username=sessionStorage.getItem('username');
          },
        TableRowStyle(){
          return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
        },
        TableCellStyle() {
          // return "padding:0px";
        },

          getRunning(){
            this.$axios.get('/soft-detail/running-softs',{
              params:{
                username:this.username,
              }
            }).then((res)=>{
              this.RunningData=res.data.data;
              // console.log(this.RunningData);
            }).catch((err)=>{
              alert('获取信息失败，请刷新页面！');
              console.log(err);
            });
          },

        openSoft(row){
          const loading = this.$loading({
            lock: true,
            text: '正在打开软件……',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(()=>{
            window.open(row.cloudUrl);
            loading.close();
          },5000);
            // console.log(row);
        },

        releaseSoft(row){
          const loading = this.$loading({
            lock: true,
            text: '正在释放软件……',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$axios.get('send-request/release-desktop',{
            params:{
              username:this.username,
              softwareId:row.softId,
            }
          }).then((res)=>{
            if(res.data.success == true){
              setTimeout(()=>{
                this.getRunning();
                loading.close();
                alert('归还成功');
              },2000);
            }else {
              alert('归还失败');
              loading.close();
            }
          }).catch((err)=>{
            alert('归还失败');
            loading.close();
            console.log(err);
          });
          // console.log(row);
        },
      },
    }
</script>

<style scoped>
  .running-head{
    color: #ffffff;
    font-size: x-large;
    border-left: #ffffff solid 7px;
    padding-left: 2%;
    margin-left: 2%;
    margin-top: 2%;
  }

  .running-table{
    margin-left: 5%;
    margin-top: 3%;
  }

.running-software{
  min-height: 900px;
}
</style>
<style>
  .running-table .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
</style>
