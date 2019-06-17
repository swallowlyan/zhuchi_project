<template>
    <el-card class="general-user-nav">
      <!--<h2><a href="javascript:void (0)" @click="$goRoute('/main-page/general-user-manage/software-manage')">软件管理</a></h2>-->
      <!--<h3><a href="javascript:void (0)" @click="$goRoute('/main-page/general-user-manage/software-list')">可用软件列表</a></h3>-->
      <!--<h3><a href="javascript:void (0)" @click="$goRoute('/main-page/general-user-manage/running-software')">运行软件列表</a></h3>-->
      <!--<h3><a href="javascript:void (0)" @click="$goRoute('/main-page/general-user-manage/software-search')">目标软件搜索</a></h3>-->
      <!--<h3><a>企业软件协管</a></h3>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/general-user-manage/purchase-application')">软件购置申请</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/general-user-manage/info-check-in')">软件信息登记</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/general-user-manage/installation')">软件安装部署</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/general-user-manage/maintain-upgrade')">软件维护更新</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/general-user-manage/scrapped-suggest')">软件报废建议</a></h4>-->
      <!--<h2><a href="javascript:void (0)" @click="$goRoute('/main-page/general-user-manage/file-manage-panel')">文档管理</a></h2>-->
      <!--<el-tree :data="navData" :props="defaultProps" @node-click="jump" class="nav-tree" :load="loadNode" lazy></el-tree>-->

      <!--<el-tree :data="navData" :props="defaultProps" @node-click="jump" class="nav-tree"></el-tree>-->

      <el-tree :props="myProps" @node-click="jump" class="nav-tree menuTree" :load="loadNav1" lazy default-expand-all></el-tree>
    </el-card>
</template>

<script>
  import {baseUrl} from '../../scripts/config';

    export default {
        name: "GeneralUserNav",

      data() {
        return {
          navData: [{
            label: '软件管理',to:'/main-page/general-user-manage/software-manage',
            children: [
			        {label: '常用软件列表',to:'/main-page/general-user-manage/commonly-used'},
              {label: '可用软件列表',to:'/main-page/general-user-manage/software-list'},
              {label: '运行软件列表',to:'/main-page/general-user-manage/running-software'},
              {label: '目标软件搜索',to:'/main-page/general-user-manage/software-search'},
              {label: '企业软件协管',to:'',
                children:[
                  {label: '软件购置申请',to:'/main-page/general-user-manage/purchase-application'},
                  {label: '软件信息登记',to:'/main-page/general-user-manage/info-check-in'},
                  {label: '软件安装部署',to:'/main-page/general-user-manage/installation'},
                  {label: '软件维护更新',to:'/main-page/general-user-manage/maintain-upgrade'},
                  {label: '软件报废建议',to:'/main-page/general-user-manage/scrapped-suggest'}
                ]
              },
            ]
          }, {
            label: '文档管理',to:'/main-page/general-user-manage/file-manage-panel',
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          },

          firstLevel:[
            {categoryName: '软件管理',to:'/main-page/general-user-manage/software-manage',navId:1},
            {categoryName: '文档管理',to:'/main-page/general-user-manage/file-manage-panel',leaf: true}
          ],

          secondLevel:[
            {categoryName: '常用软件列表',to:'/main-page/general-user-manage/commonly-used',leaf: true},
            {categoryName: '可用软件列表',to:'/main-page/general-user-manage/software-list',navId:2},
            {categoryName: '库存软件搜索',to:'/main-page/general-user-manage/software-search',leaf: true},
            {categoryName: '在线运行软件',to:'/main-page/general-user-manage/running-software',leaf: true},
            {categoryName: '企业软件协管',to:'',navId:3}
          ],

          thirdNode:[
            {categoryName: '软件购置申请',to:'/main-page/general-user-manage/purchase-application',leaf: true},
            {categoryName: '软件信息登记',to:'/main-page/general-user-manage/info-check-in',leaf: true},
            {categoryName: '软件安装部署',to:'/main-page/general-user-manage/installation',leaf: true},
            {categoryName: '软件维护更新',to:'/main-page/general-user-manage/maintain-upgrade',leaf: true},
            {categoryName: '软件报废建议',to:'/main-page/general-user-manage/scrapped-suggest',leaf: true}
          ],

          forthNode:[

          ],

          myProps:{
            label:'categoryName',
            children:'children',
            isLeaf: 'leaf'
          },

          username:'',
        };
      },

      created(){
          this.username=sessionStorage.getItem('username');
        this.getAvailableCate();
      },

      methods: {
          // loadNode(node,resolve){
          //   // console.log(node);
          //   // if(node.childNodes.label === '软件管理'){
          //   //   return resolve(this.navData);
          //   // }
          //   // // if(node.level>2) return resolve([]);
          //   //
          //   // setTimeout(()=>{
          //   //   // const data=this.navData.children;
          //   //   resolve(this.navData[0].children);
          //   // },500);
          // },

        jump(data) {
          if(data.navId === 2){
            eventBus.$emit('cateId','all');
            sessionStorage.setItem('cateId','all');
            // console.log(data.navId);
          }
          if(typeof (data.categoryId1) != "undefined"){
            eventBus.$emit('cateId',data.categoryId1);
            sessionStorage.setItem('cateId',data.categoryId1);
            // console.log(data.categoryId1);
          }
          this.$router.push(data.to);
        },

        loadNav1(node,resolve){
          if(node.level === 0){
            return resolve(this.firstLevel);
          } else

          if(node.data.navId === 1){
            return resolve(this.secondLevel);
          } else

          if(node.data.navId === 2){
            setTimeout(()=>{
              return resolve(this.forthNode);
            },1000);
          } else

          if(node.data.navId === 3){
            return resolve(this.thirdNode);
          }

          else {
            return resolve([]);
          }
        },

        getAvailableCate(){
          this.$axios.get('/wc-index/category-menu',{
            params:{
              username:this.username,
            }
          }).then((res)=>{
            this.forthNode = res.data.data;
            for(var i=0;i<this.forthNode.length;i++){
              this.forthNode[i].leaf=true;
              this.forthNode[i].to='/main-page/general-user-manage/software-list';
            }
            // console.log('----------forNode---------');
            // console.log(this.forthNode);
          }).catch((err)=>{
            console.log(err);
          });
        },
      }
    }
</script>

<style scoped>
  .general-user-nav{
    height: 900px;
  }

  .nav-tree{
    background: #fff0;
    color: #ffffff;
  }
</style>
<style>
  .nav-tree .el-tree-node__content:hover,.typeTree .el-tree-node:focus>.el-tree-node__content{
    background-color:#2E5A63
  }
  .nav-tree .is-current .el-tree-node__content{
    background-color:#57838c !important;
  }
</style>
