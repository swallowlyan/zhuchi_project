<template>
    <el-card class="software-search" style="min-height: 900px">
      <el-row class="search-part">
        <el-col :span="6" :offset="7"><el-input type="text" size="mini" v-model="word"/></el-col>
        <el-col :span="2" :offset="1"><a href="javascript:void(0)" @click="getSoftByWord"><img src="../../assets/u79.png"/></a></el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="1">
          <!--<el-tree :data="classData" :props="defaultProps" accordion @node-click="handleNodeClick" class="class-tree"></el-tree>-->
          <el-tree :props="defaultProps" accordion @node-click="handleNodeClick" class="class-tree" :load="loadNode" lazy></el-tree>
        </el-col>
        <el-col :span="13" :offset="1">
          <p class="search-word">以下为搜索结果：</p>
          <div v-for="soft in softs">
            <brief-item
              :img-url="soft.softIcon"
              :soft-name="soft.softName"
              :soft-tag="soft.Tags"
              :soft-brief="soft.softFunDes"
              :soft-auth="soft.auth"
              :soft-id="soft.id"
              :able='soft.able'
              :button-text='soft.buttonText'
              :button-color='soft.buttonColor'></brief-item>
          </div>
        </el-col>
      </el-row>
      <el-pagination background class="page-part-1"
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="size"
                     @current-change="handleCurrentChange"></el-pagination>
    </el-card>
</template>

<script>
    import BriefItem from "../../base-component/BriefItem";
    import {baseUrl} from '../../scripts/config';
    export default {
        name: "SoftwareSearch",
      components: {BriefItem},

      data() {
        return {
          // classData: [
          //   {
          //     label:'仿真软件',
          //     children:[
          //       {
          //         label:'一维动力学仿真',
          //         children:[
          //           {label:'配气机构/传动系统仿真'},
          //           {label:'曲轴仿真'},
          //           {label:'活塞仿真'},
          //           {label:'发动机性能仿真'},
          //           {label:'轮系仿真'}
          //         ]
          //       },{
          //         label:'一维热力学仿真',
          //         children:[
          //           {label:'发动机/车辆性能分析'},
          //           {label:'硬件在环仿真'}
          //         ]
          //       },{
          //         label:'一维流体仿真',
          //         children:[
          //           {label:'润滑和冷却系统仿真'},
          //           {label:'燃油喷射系统仿真'}
          //         ]
          //       },{
          //         label:'三维动力学仿真',
          //         children:[
          //           {label:'发动机整机动力学'}
          //         ]
          //       },{
          //         label:'三维热力学仿真',
          //         children:[
          //           {label:'电子设备热仿真'}
          //         ]
          //       },{
          //         label:'三维流体仿真',
          //         children:[
          //           {label:'沸腾传热计算'},
          //           {label:'流体仿真'},
          //           {label:'燃烧仿真'}
          //         ]
          //       },{
          //         label:'三维结构仿真',
          //         children:[
          //           {label:'有限元仿真'}
          //         ]
          //       },{
          //         label:'三维结构/流体仿真'
          //       },{
          //         label:'疲劳分析仿真',
          //         children:[
          //           {label:'整车疲劳仿真'},
          //           {label:'整车疲劳分析'},
          //           {label:'发动机疲劳仿真'}
          //         ]
          //       },{
          //         label:'整车仿真',
          //         children:[
          //           {label:'整车力学结构仿真'},
          //           {label:'整车碰撞结构仿真'},
          //           {label:'机械系统动力学仿真'},
          //           {label:'整车线束设计'},
          //           {label:'整车性能仿真'}
          //         ]
          //       },{
          //         label:'建模仿真',
          //         children:[
          //           {label:'通用建模仿真'},
          //           {label:'叶轮建模仿真'},
          //           {label:'性能标定'},
          //           {label:'模型标定'}
          //         ]
          //       },{
          //         label:'声学仿真',
          //         children:[
          //           {label:'振动/气动声学仿真'},
          //           {label:'振动噪声仿真'}
          //         ]
          //       },{
          //         label:'电磁仿真'
          //       },{
          //         label:'生产过程仿真',
          //         children:[
          //           {label:'生产过程仿真'},
          //           {label:'冲压成形模拟仿真'},
          //           {label:'铸造仿真'},
          //           {label:'机床仿真'},
          //           {label:'板料成形模拟仿真'},
          //           {label:'三维加工仿真'}
          //         ]
          //       },{
          //         label:'仿真前处理工具',
          //         children:[
          //           {label:'有限元前处理工具'}
          //         ]
          //       },{
          //         label:'仿真优化工具'
          //       },{
          //         label:'后期处理仿真'
          //       },{
          //         label:'设计公差仿真',
          //         children:[
          //           {label:'设计公差分析'}
          //         ]
          //       }
          //     ]
          //   },{
          //     label:'电控软件',
          //     children:[
          //       {
          //         label:'管理类',
          //         children:[
          //           {label:'全周期管理'},
          //           {label:'配置管理'},
          //           {label:'需求管理'},
          //           {label:'变更管理'}
          //         ]
          //       },{
          //         label:'开发类',
          //         children:[
          //           {label:'编译器'},
          //           {label:'代码检查'},
          //           {label:'操作系统'},
          //           {label:'开发工具'},
          //           {label:'通讯工具'},
          //           {label:'架构开发'},
          //           {label:'可视化开发'},
          //           {label:'标定开发'},
          //           {label:'界面开发'},
          //           {label:'诊断工具'},
          //           {label:'策略开发'},
          //           {label:'加密工具'},
          //           {label:'协议开发'},
          //           {label:'开发环境'},
          //           {label:'ECU底层启动开发'}
          //         ]
          //       },{
          //         label:'设计类',
          //         children:[
          //           {label:'嵌入式设计'}
          //         ]
          //       },{
          //         label:'测试类',
          //         children:[
          //           {label:'系统级测试'},
          //           {label:'代码测试'},
          //           {label:'测试管理'},
          //           {label:'测试平台'},
          //         ]
          //       }
          //     ]
          //   },{
          //     label:'设计软件',
          //     children:[
          //       {
          //         label:'二维设计工具',
          //       },{
          //         label:'二维设计',
          //       },{
          //         label:'二维标注',
          //       },{
          //         label:'辅助工具',
          //       },{
          //         label:'三维设计',
          //       },{
          //         label:'三维选配',
          //       },{
          //         label:'模型轻量化',
          //       },{
          //         label:'船用发动机设计',
          //       },{
          //         label:'动画制作',
          //       }
          //     ]
          //   },{
          //     label:'数据分析软件',
          //     children:[
          //       {
          //         label:'试验数据分析',
          //       },{
          //         label:'可靠性分析',
          //       },{
          //         label:'整车性能开发试验数据分析',
          //       }
          //     ]
          //   },
          // ],

          defaultProps: {
            children: 'children',
            label: 'name'
          },

          word:'',
          categoryId:'',
          softs:[],
          username:'',
          size:7,
          current:1,
          total:1,
          using:1,
        };
      },

      created(){
        this.init();
      },

      beforeDestroy(){
        this.word='';
        sessionStorage.setItem('searchWord','');
      },

      methods: {
          dataProcess(){
            for(var i=0;i<this.softs.length;i++){
              if(this.softs[i].softIcon == null || this.softs[i].softIcon == ''){
                this.softs[i].softIcon = require('../../assets/software-logo/icon.png');
              }else {
                this.softs[i].softIcon ="data:image/jpg;base64," + this.softs[i].softIcon;
              }
              if(this.softs[i].auth == 'true'){
                this.softs[i].able = true;
                this.softs[i].buttonText = '已拥有';
                this.softs[i].buttonColor = 'background:#b0b0b0;';
              } else if(this.softs[i].auth == 'APPLY'){
                this.softs[i].able = true;
                this.softs[i].buttonText = '正在审核';
                this.softs[i].buttonColor = 'background:#FF9933;';
              } else{
                this.softs[i].able = false;
                this.softs[i].buttonText = '申请使用';
                this.softs[i].buttonColor = 'background:cornflowerblue;';
              }
              if(this.softs[i].softTag === null){
                this.softs[i].Tags=[];
              }else {
                this.softs[i].Tags=this.softs[i].softTag.split(";");
              }
            }
          },

          getAllSoft(){//获取所有软件
            this.using = 1;
            this.$axios.post('/soft-detail/get-all-softs',{
              current:this.current,
              size:this.size,
              sort:'id',
              dir:'asc',
              username:this.username,
            }).then((res)=>{
              // console.log('所有');
              // console.log(res);
              this.total = res.data.data.total;
              this.softs = res.data.data.records;
              this.dataProcess();
              // for(var i=0;i<this.softs.length;i++){
              //   this.softs[i].softIcon ="data:image/jpg;base64," + this.softs[i].softIcon;
              //   if(this.softs[i].auth == 'true'){
              //     this.softs[i].able = true;
              //     this.softs[i].buttonText = '已拥有';
              //     this.softs[i].buttonColor = 'background:#b0b0b0;';
              //   } else if(this.softs[i].auth == 'APPLY'){
              //     this.softs[i].able = true;
              //     this.softs[i].buttonText = '正在审核';
              //     this.softs[i].buttonColor = 'background:#FF9933;';
              //   } else{
              //     this.softs[i].able = false;
              //     this.softs[i].buttonText = '申请使用';
              //     this.softs[i].buttonColor = 'background:cornflowerblue;';
              //   }
              //   if(this.softs[i].softTag === null){
              //     this.softs[i].Tags=[];
              //   }else {
              //     this.softs[i].Tags=this.softs[i].softTag.split(";");
              //   }
              // }
              // console.log(this.softs);
            }).catch((err)=>{
              console.log(err);
            });
          },

          getSoftByCate(){//按照目录获取软件
            this.using = 2;
            this.$axios.post( '/soft-detail/getSoftsByCategory',{
              categoryId:this.categoryId,
              username:this.username,
              current:this.current,
              size:this.size,
            }).then((res)=>{
              // console.log('目录');
              console.log(res);
              this.total = res.data.data.total;
              this.softs=res.data.data.records;
              this.dataProcess();
              // for(var i=0;i<this.softs.length;i++){
              //   this.softs[i].softIcon ="data:image/jpg;base64," + this.softs[i].softIcon;
              //   if(this.softs[i].auth == 'true'){
              //     this.softs[i].able = true;
              //     this.softs[i].buttonText = '已拥有';
              //     this.softs[i].buttonColor = 'background:#b0b0b0;';
              //   } else if(this.softs[i].auth == 'APPLY'){
              //     this.softs[i].able = true;
              //     this.softs[i].buttonText = '正在审核';
              //     this.softs[i].buttonColor = 'background:#FF9933;';
              //   } else{
              //     this.softs[i].able = false;
              //     this.softs[i].buttonText = '申请使用';
              //     this.softs[i].buttonColor = 'background:cornflowerblue;';
              //   }
              //   if(this.softs[i].softTag === null){
              //     this.softs[i].Tags=[];
              //   }else {
              //     this.softs[i].Tags=this.softs[i].softTag.split(";");
              //   }
              // }
            }).catch((err)=>{
              console.log(err);
            });
          },

          getSoftByWord(){//搜索软件
            this.using = 3;
            this.$axios.post( '/soft-detail/search-softs',{
              current:this.current,
              size:this.size,
              sort:'id',
              dir:'asc',
              username:this.username,
              softName:this.word,
            }).then((res)=>{
              // console.log('搜索软件');
              // console.log(res);
              this.total = res.data.data.total;
              this.softs=res.data.data.records;
              this.dataProcess();
              // for(var i=0;i<this.softs.length;i++){
              //   this.softs[i].softIcon ="data:image/jpg;base64," + this.softs[i].softIcon;
              //   if(this.softs[i].auth == 'true'){
              //     this.softs[i].able = true;
              //     this.softs[i].buttonText = '已拥有';
              //     this.softs[i].buttonColor = 'background:#b0b0b0;';
              //   } else if(this.softs[i].auth == 'APPLY'){
              //     this.softs[i].able = true;
              //     this.softs[i].buttonText = '正在审核';
              //     this.softs[i].buttonColor = 'background:#FF9933;';
              //   } else{
              //     this.softs[i].able = false;
              //     this.softs[i].buttonText = '申请使用';
              //     this.softs[i].buttonColor = 'background:cornflowerblue;';
              //   }
              //   if(this.softs[i].softTag === null){
              //     this.softs[i].Tags=[];
              //   }else {
              //     this.softs[i].Tags=this.softs[i].softTag.split(";");
              //   }
              // }
            }).catch((err)=>{
              console.log(err);
            });
          },

          init(){
            this.username = sessionStorage.getItem('username');
            this.word = sessionStorage.getItem('searchWord');
            // console.log(this.word);
            if(this.word == '' || this.word == null){
              this.getAllSoft();
            }else {
              this.getSoftByWord();
            }
          },

        handleNodeClick(data) {
          this.categoryId=data.id;
          this.getSoftByCate();
        },

        loadNode(node, resolve){
          if(node.level===0){
            this.$axios.get('/soft-category'
            ).then((res)=>{
              // console.log(res.data.data);
              return resolve(res.data.data);
            }).catch((err)=>{
              console.log(err);
            });
          }else {
            setTimeout(()=>{
              this.$axios.get('/soft-category',{
                params:{
                  parentId:node.data.id,
                }
              }).then((res1)=>{
                return resolve(res1.data.data);
              }).catch((err1)=>{
                console.log(err1);
              });
            },500);
          }
        },

        handleCurrentChange(val){
          this.current = val;
          if(this.using === 1){
            this.getAllSoft();
          }else if(this.using === 2){
            this.getSoftByCate();
          }else {
            this.getSoftByWord();
          }
        }
      },
    }
</script>

<style scoped>

  .search-word{
    color: #ffffff;
    margin-top: 5%;
    font-size: large;
    margin-bottom: 3%;
    margin-left: 10%;
  }
.search-part{
  margin-top: 1%;
}

.class-tree{
  background: #fff0;
  color: #ffffff;
  margin-top: 20%;
  border: #ffffff solid 1px;
}
  .page-part-1{
    margin-left: 35%;
    margin-top: 1%;
  }
</style>
<style>
  .class-tree .el-tree-node__content:hover,.typeTree .el-tree-node:focus>.el-tree-node__content{
    background-color:#2E5A63
  }
  .class-tree .is-current .el-tree-node__content{
    background-color:#57838c !important;
  }
</style>
