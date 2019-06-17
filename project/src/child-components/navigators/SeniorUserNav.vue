<template>
    <el-card class="senior-user-nav">
      <!--<h2><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/software-manage')">软件管理</a></h2>-->

      <!--<h3><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/software-list')">可用软件列表</a></h3>-->
      <!--<h3><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/running-software')">运行软件列表</a></h3>-->
      <!--<h3><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/software-search')">目标软件搜索</a></h3>-->
      <!--<h3><a>企业软件协管</a></h3>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/use-approval')">软件使用审批</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/purchase-approval')">软件购置审批</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/info-check-in')">软件信息登记</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/installation')">软件安装部署</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/maintain-upgrade')">软件维护更新</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/scrapped-suggest')">软件报废建议</a></h4>-->

      <!--<h2><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/file-manage-panel')">文档管理</a></h2>-->

      <!--<h2><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/user-manage-panel')">用户管理</a></h2>-->
      <!--<h3><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/user-classify')">用户部门</a></h3>-->
      <!--<h3><a href="javascript:void (0)" @click="$goRoute('/main-page/senior-user-manage/permission-approval')">权限管理</a></h3>-->

      <!--<el-tree :data="navData" :props="defaultProps" @node-click="jump" class="nav-tree"></el-tree>-->
      <el-tree :props="myProps" @node-click="jump" class="nav-tree menuTree" :load="loadNav1" lazy default-expand-all></el-tree>

    </el-card>
</template>

<script>
  import {baseUrl} from '../../scripts/config'

    export default {
        name: "SeniorUserNav",
      data() {
        return {
          // navData: [{
          //   label: '软件管理',to:'/main-page/senior-user-manage/software-manage',
          //   children: [
          //     {label: '常用软件列表',to:'/main-page/senior-user-manage/commonly-used'},
          //     {label: '可用软件列表',to:'/main-page/senior-user-manage/software-list'},
          //     {label: '库存软件搜索',to:'/main-page/senior-user-manage/software-search'},
          //     {label: '在线运行软件',to:'/main-page/senior-user-manage/running-software'},
          //     {label: '企业软件协管',to:'',
          //       children:[
          //         {label: '软件使用审批',to:'/main-page/senior-user-manage/use-approval'},
          //         {label: '软件购置审批',to:'/main-page/senior-user-manage/purchase-approval'},
          //         {label: '软件信息登记',to:'/main-page/senior-user-manage/info-check-in'},
          //         {label: '软件安装部署',to:'/main-page/senior-user-manage/installation'},
          //         {label: '软件维护更新',to:'/main-page/senior-user-manage/maintain-upgrade'},
          //         {label: '软件报废建议',to:'/main-page/senior-user-manage/scrapped-suggest'}
          //       ]
          //     },
          //   ]
          // }, {
          //   label: '文档管理',to:'/main-page/senior-user-manage/file-manage-panel',
          // },{
          //   // label: '用户管理',to:'/main-page/senior-user-manage/user-manage-panel',
          //   label: '用户管理',to:'',
          //   children:[
          //     {label: '用户部门',to:'/main-page/senior-user-manage/user-classify'},
          //     {label: '权限管理',to:'/main-page/senior-user-manage/permission-approval'}
          //   ]
          // }],
          defaultProps: {
            children: 'children',
            label: 'label'
          },

          username:'',

          myProps:{
            label:'categoryName',
            children:'children',
            isLeaf: 'leaf'
          },

          firstLevel:[
            {categoryName: '软件管理',to:'/main-page/senior-user-manage/software-manage',navId:1},
            {categoryName: '文档管理',to:'/main-page/senior-user-manage/file-manage-panel',leaf: true},
            {categoryName: '用户管理',to:'',navId:4}
          ],

          secondLevel:[
            {categoryName: '常用软件列表',to:'/main-page/senior-user-manage/commonly-used',leaf: true},
            {categoryName: '可用软件列表',to:'/main-page/senior-user-manage/software-list',navId:2},
            {categoryName: '库存软件搜索',to:'/main-page/senior-user-manage/software-search',leaf: true},
            {categoryName: '在线运行软件',to:'/main-page/senior-user-manage/running-software',leaf: true},
            {categoryName: '企业软件协管',to:'',navId:3}
          ],

          thirdNode:[
            {categoryName: '软件使用审批',to:'/main-page/senior-user-manage/use-approval',leaf: true},
            {categoryName: '软件购置审批',to:'/main-page/senior-user-manage/purchase-approval',leaf: true},
            {categoryName: '软件信息登记',to:'/main-page/senior-user-manage/info-check-in',leaf: true},
            {categoryName: '软件安装部署',to:'/main-page/senior-user-manage/installation',leaf: true},
            {categoryName: '软件维护更新',to:'/main-page/senior-user-manage/maintain-upgrade',leaf: true},
            {categoryName: '软件报废建议',to:'/main-page/senior-user-manage/scrapped-suggest',leaf: true},
          ],

          forthNode:[

          ],

          fifthNode:[
            {categoryName: '用户部门',to:'/main-page/senior-user-manage/user-classify',leaf: true},
            {categoryName: '权限管理',to:'/main-page/senior-user-manage/permission-approval',leaf: true}
          ],
        };
      },

      created(){
          this.init();
        this.getAvailableCate();
      },

      methods: {
          init(){
            this.username=sessionStorage.getItem('username');
          },

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
          }else

          if(node.data.navId === 1){
            return resolve(this.secondLevel);
          }else

          if(node.data.navId === 2){
            setTimeout(()=>{
              return resolve(this.forthNode);
            },1000);
          }else

          if(node.data.navId === 3){
            return resolve(this.thirdNode);
          }else

          if(node.data.navId === 4){
            return resolve(this.fifthNode);
          }else

          {
            return resolve([]);
          }
        },

        getAvailableCate(){
          this.$axios.get('/wc-index/category-menu',{//获取可用软件目录
            params:{
              username:this.username,
            }
          }).then((res)=>{
            this.forthNode = res.data.data;
            for(var i=0;i<this.forthNode.length;i++){
              this.forthNode[i].leaf=true;
              this.forthNode[i].to='/main-page/senior-user-manage/software-list';
            }
            // console.log(this.forthNode);
          }).catch((err)=>{
            console.log(err);
          });
        },
      }
    }
</script>

<style scoped>
  .senior-user-nav{
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
