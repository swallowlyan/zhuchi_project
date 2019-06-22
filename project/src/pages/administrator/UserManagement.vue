<template>
  <div>
    <el-row style="border-bottom:1px solid #ddd;":gutter="25">
      <el-col :span="17" >
        <div class="suffix">
          <div style="font-size:20px;font-weight:700;margin:0px 14px 0px -23px">|</div>
          <span style="font-weight:700;font-size:12px;">用户数据指标</span>
        </div>
        <div class="suffix" style="width:100%;margin-top:30px;">
          <div style="width:25%;" class="style_s"v-for="(data, index) in datas" :key="index">
            <div style="font-size:16px;">{{data.title}}</div>
            <div style="font-size:24px;font-weight:700;">{{data.value}}</div>
            <div style="font-size:14px;">日↑{{data.way}}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="suffix">
          <div style="font-size:20px;font-weight:700;margin:0px 14px 0px -23px">|</div>
          <span style="font-weight:700;font-size:12px;">数据图</span>
        </div>
        <el-radio-group v-model="radio1"size="small">
          <el-radio-button label="总用户数"></el-radio-button>
          <el-radio-button label="在线用户数"></el-radio-button>
          <el-radio-button label="访问次数"></el-radio-button>
          <el-radio-button label="日活跃用户数"></el-radio-button>
        </el-radio-group>
        <div id="main" style="width:100%;height:260px;margin-top:-30px;"></div>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <div class="suffix">
          <div style="font-size:20px;font-weight:700;margin:0px 14px 0px -23px">|</div>
          <span style="font-weight:700;font-size:12px;">用户管理</span>
      </div>
      <div  class="special">
        <table
          width="90%"
          style="border-collapse:collapse;"
        >
        <tr style="font-weight:700;font-size:14px;line-height:35px;">
          <td>姓名</td>
          <td>注册时间</td>
          <td>账号</td>
          <td>手机号</td>
          <td>所属部门</td>
          <td>用户状态</td>
          <td>操作</td>
        </tr>
        <tr v-for="(data, index) in userList"
        style="font-size:12px;line-height:35px;"
      :key="index"
        >
          <td>{{data.nickname}}</td>
          <td>{{data.data}}</td>
          <td>{{data.username}}</td>
          <td>{{data.phone}}</td>
          <td>{{data.groupName}}</td>
          <td></td>
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
                禁用
              </el-button>
              <el-button
                size="mini"
                name="select"
              >
                重置密码
              </el-button>
            </template>
          </td>
        </tr>
      </table>
    </div>
    <div style="text-align:center;" class="special">
      <el-pagination
      style="margin-left:-100px;"
      @current-change="getuserList"
      :current-page.sync="page"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

    </el-row>
  </div>
</template>

<script>
    import MyHeader from "../../components/MyHeader";
    export default {
        name: "MainPage",
      components: {MyHeader},

      data(){
          return{
             datas: [
              { title: '总用户数',value:'2116',way:'%96.21'},
              { title: '在线用户数',value:'855',way:'%6.9'},
              { title: '访问次数',value:'821',way:'%66.3'},
              { title: '日活跃用户数',value:'544',way:'%5.5'},
            ],
            radio1:'总用户数',
             state: '',
          userList: [
              
          ],
          total: 0,
          size: 7,
          page: 1,
          }
      },

      mounted(){
        this.getuserList()
        this.draw();
      },

      methods:{
          getuserList(){
        this.$axios.post('/sysuser/list-all',{
          size:this.size,
          current:this.page,
        }).then((res)=>{
          this.userList=res.data.data.records;
          this.total=res.data.data.total;
          }).catch((err)=>{
            console.log(err);
          });
        },
        draw(){
          let myChart = this.$echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        myChart.setOption({
        xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
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
.style_s{
  padding:15px 20px;
  margin:15px;
  border:1px solid #eee;
}
.style_s div{
  padding:5px 0;
}
tr:nth-child(odd) {
  background: #efefef;
}
.line_style div{
 margin:10px 0;
}
.special{
  padding:5px 0px;
}
</style>
