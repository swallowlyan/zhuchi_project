<template>
  <el-card class="classify-manage" style="min-height: 900px">
    <!--<div slot="header" class="clearfix">
      <span>分类管理</span>
    </div>-->
    <div class="text item">
      <el-row>
        <div class="el-header" style="margin-bottom: 20px">
          <div class="header_separator"></div>
          <h3>软件分类管理</h3>
        </div>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="el-content">
              <el-tree :props="type" highlight-current accordion class="typeTree" :load="loadNode" lazy>
                   <span class="custom-tree-node" slot-scope="{node, data}">
                  <span>
                <i :class="node.icon"></i>{{ node.label }}
            </span>
        </span>
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light" style="margin-left: 20px; padding-left: 20px;">
            <div class="el-content">
              <el-row style="margin: 10px 0px;color: #ffffff" class="classifyBreadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item>{{firstNode}}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{secondNode}}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{lastNode}}</el-breadcrumb-item>
                </el-breadcrumb>
              </el-row>
              <el-row>
                <el-button type="primary" @click="showModel('first')">新增一级分类</el-button>
                <el-button type="primary" @click="showModel('second')">新增二级分类</el-button>
                <el-button type="primary" @click="showModel('last')">新增三级分类</el-button>
                <el-button type="primary" @click="showModel('addSoft')" v-show="ifShow_addSoft">新增软件</el-button>
              </el-row>
              <el-row style="margin: 20px 0px">
                <el-form :inline="true" :model="searchItem" ref="searchItem"
                         class="demo-form-inline searchForm"><!--:rules="searchRules"-->
                  <el-form-item :label="searchItem.label"><!-- prop="val"  -->
                    <el-input v-model="searchItem.val" placeholder="请输入软件名称进行搜索"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button icon="el-icon-search" circle @click="searchData"></el-button>
                  </el-form-item>
                </el-form>
              </el-row>
              <el-row>
                <el-col :span="24">
                <el-table :data="tableData" border size="medium" @sort-change="changeTableSort"
                          :row-style="TableRowStyle":header-cell-style="TableRowStyle"
                          :cell-style="TableCellStyle" class="classifyTable">
                  <el-table-column prop="id" label="编号" :show-overflow-tooltip="true" sortable></el-table-column>
                  <el-table-column prop="softName" label="软件名" width="90px" :show-overflow-tooltip="true" sortable></el-table-column>
                  <el-table-column prop="softIcon" label="软件图标">
                    <template slot-scope="scope">
                      <img :src="scope.row.softIcon" style="height:30px;width: 30px">
                    </template>
                  </el-table-column>
                  <el-table-column prop="softVersion" label="版本号" width="90px" sortable></el-table-column>
                  <el-table-column prop="softBoughtMoudle" label="采购模块"></el-table-column>
                  <el-table-column prop="softCategoryName" label="所属一级分类" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="softCategory2Name" label="所属二级分类" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="softCategory3Name" label="所属三级分类" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="softFunDes" label="功能描述" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="softTag" label="标签设置" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="softMinEnv" label="配置需求" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="created" label="添加时间" width="110px" :show-overflow-tooltip="true" sortable></el-table-column>
                  <el-table-column prop="options" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button @click="editRow(scope.row)" type="text" size="medium">编辑</el-button>
                      <el-button @click="delRow(scope.row)" type="text" size="medium">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                  <el-pagination background @size-change="SizeChange"
                                 @current-change="CurrentChange"
                                 :current-page="1"
                                 :page-sizes="[5,10]"
                                 :page-size=pageSize
                                 layout="total, sizes, prev, pager, next"
                                 :total="softTotal"
                                 style="margin: 20px 0px;float: right">
                  </el-pagination>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--Dialog_addFirst-->
    <addFirstDialog :dialog_first="dialog_addFirst" @close="closeModel" @refresh="getNewFirst"></addFirstDialog>
    <!--Dialog_addFirst-->
    <!--Dialog_addSecond-->
    <addSecondDialog :dialog_second="dialog_addSecond" @close="closeModel" ref="classify2"></addSecondDialog>
    <!--Dialog_addSecond-->
    <!--Dialog_addLast-->
    <addLastDialog :dialog_last="dialog_addLast" @close="closeModel" ref="classify3"></addLastDialog>
    <!--Dialog_addLast-->
    <!--Dialog_addSoft-->
    <addSoftDialog :dialog_addSoft="dialog_addSoft" :firstNode="firstNode"
                   :secondNode="secondNode" :lastNode="lastNode"
                   :currentCategory="currentCategory" :currentCategory2="currentCategory2"
                   :currentCategory3="currentCategory3"
                   @close="closeModel" @refresh="initSoft"></addSoftDialog>
    <!--Dialog_addSoft-->
    <!--Dialog_editSoft-->
    <editSoftDialog :dialog_editSoft="dialog_editSoft" :softItem="current_row"
                    @close="closeModel" @refresh="initSoft"></editSoftDialog>
    <!--Dialog_editSoft-->
    <!--Dialog_delSoft-->
    <el-dialog title="删除软件" :visible.sync="dialog_delSoft" :before-close="closeModel">
      <div style="text-align: center;font-size: 18px;">是否确认删除"{{current_row.name}}"软件？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="delForm">确 定</el-button>
      </div>
    </el-dialog>
    <!--Dialog_delSoft-->
  </el-card>
</template>

<script>
  import addFirstDialog from './ClassifyManage/addFirst'
  import addSecondDialog from './ClassifyManage/addSecond'
  import addLastDialog from './ClassifyManage/addLast'
  import addSoftDialog from './ClassifyManage/addSoft'
  import editSoftDialog from './ClassifyManage/editSoft'
  export default {
    name: "ClassifyManage",
    data() {
      return {
        url:'',
        firstNode:'',
        secondNode:'',
        lastNode:'',
        currentCategory:'',
        currentCategory2:'',
        currentCategory3:'',
        pageSize:5,
        softTotal:0,
        ifShow_addSoft:false,
        dialog_addFirst:false,
        dialog_addSecond:false,
        dialog_addLast:false,
        dialog_addSoft:false,
        dialog_editSoft:false,
        dialog_delSoft:false,
        current_row:{},
        TypeData: [{
          label:"test1",
          id:1,
          level:1,
          children:[{
            id:2,
            label:"test2",
            level:2,
            parent:"test1",
            parentId:1,
            children:[{
              id:3,
              label:"test3",
              level:3,
              parent1:"test",
              parent2:"test2",
              parentId1:1,
              parentId2:2,
              children:[]
            }]
          }]
        }],
        type: {
          children: 'children',
          label: 'name'
        },
        searchItem:{
          label:'',
          val:''
        },
        searchRules:{
          val:[
            {required: true, message: '请输入搜索内容', trigger: 'blur'}
          ]
        },
        tableData:[]
      }
    },
    created(){
      this.initSoft();
    },
    methods: {
      getSoft(param){
        this.url = '/soft-detail/get-all-softs';
        this.$axios.post(this.url,param).then((res)=>{
          if(res.data.data.records.length>0){
            this.tableData=res.data.data.records;
            this.tableData.forEach(item=>{
              item.softIcon="data:image/jpg;base64,"+item.softIcon;
              item.created = item.created.split(".")[0];
            });
          }
          this.softTotal=res.data.data.total;
        }).catch((err)=>{
          console.log(err);
        });
      },
      initSoft(){
        let param={
          current:1,
          size:5,
          sort:'id',
          dir:'asc'
        };
        this.getSoft(param);
      },
      loadNode(node, resolve){
        if(node.level===0){
          this.$axios.get('/soft-category'
          ).then((res)=>{
            return resolve(res.data.data);
          }).catch((err)=>{
            console.log(err);
          });
        }
        setTimeout(()=>{
         if(node.level!==0){
           this.$axios.get('/soft-category',{
             params:{
               parentId:node.data.id,
             }
           }).then((res1)=>{
             this.ifShow_addSoft=false;
             if(node.level===1){
               this.firstNode=node.data.name;
               this.currentCategory=node.data.id;
               this.secondNode="";
               this.lastNode="";
               this.currentCategory2="";
               this.currentCategory3="";
             }else if(node.level===2){
               this.secondNode=node.data.name;
               this.currentCategory2=node.data.id;
               this.ifShow_addSoft=true;
             }else{
               this.lastNode=node.data.name;
               this.currentCategory3=node.data.id;
               this.ifShow_addSoft=true;
             }
             return resolve(res1.data.data);
           }).catch((err1)=>{
             console.log(err1);
           });
         }

        },500);
      },
      searchData(){//目标软件搜索
        this.url = '/soft-detail/search-softs';
        this.$axios.post(this.url,
          {
            current:1,
            size:this.pageSize,
            sort:'id',
            dir:'asc',
            softName:this.searchItem.val
          }
        ).then((res)=>{
          this.tableData=res.data.data.records;
          this.tableData.forEach(item=>{
            item.softIcon="data:image/jpg;base64,"+item.softIcon;
            item.created = item.created.split(".")[0];
          });
          this.softTotal=res.data.data.total;
        }).catch((err)=>{
          console.log(err);
        });
      },
      SizeChange(val){
        this.pageSize=val;
        let param={
          current:1,
          size:val,
          sort:'id',
          dir:'asc'
        };
        this.getSoft(param);
      },
      CurrentChange(val){
        let param={
          current:val,
          size:this.pageSize,
          sort:'id',
          dir:'asc'
        };
        this.getSoft(param);
      },
      getNewFirst(){//刷新二级、三级分类中一级的下拉框
        this.$refs.classify2.getFirst();
        this.$refs.classify3.getFirst();
      },
      showModel(type){
        if(type=='first'){
          this.dialog_addFirst=true;
        }else if(type=='second'){
          this.dialog_addSecond=true;
        }else if(type=='last'){
          this.dialog_addLast=true;
        }else if(type=='addSoft'){
          this.dialog_addSoft=true;
        }
      },
      closeModel() {
        this.dialog_addFirst=false;
        this.dialog_addSecond=false;
        this.dialog_addLast=false;
        this.dialog_addSoft=false;
        this.dialog_editSoft=false;
        this.dialog_delSoft=false;
      },
      editRow(row){
        this.current_row=row;
        // this.current_row.softIcon="data:image/jpg;base64,"+row.softIcon;
        this.dialog_editSoft=true;
      },
      delRow(row){
        this.current_row=row;
        this.dialog_delSoft=true;
      },
      delForm(){
        this.url = '/soft-detail/del';
        this.$axios.post(this.url,
          {id:this.current_row.id}
        ).then((res)=>{
          console.log(res);
          if(res.data.message==="成功"){
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.initSoft();
          }else{
            this.$message({
              showClose: true,
              message: '删除失败',
              type: 'error'
            });
          }
        }).catch((err)=>{
          console.log(err);
        });
        this.dialog_delSoft=false;
      },
      changeTableSort(column){
        let param={
          current:1,
          size:this.pageSize,
          sort:column.prop,
          dir:""
        };
        if(column.order==="descending"){
          param.dir="desc";
        }else{
          param.dir="asc";
        }
        this.getSoft(param);
      },
      /**
       * @return {string}
       */
      TableRowStyle() {
        return "color:#ffffff;background-color: #5E818B;text-align:center;height:0";
      },
      /**
       * @return {string}
       */
      TableCellStyle() {
        return "padding:0px";
      }
    },
    components:{
      addFirstDialog,addSecondDialog,addLastDialog,addSoftDialog,editSoftDialog
    }
  }
</script>

<style scoped>
  .clearfix, .text {
    color: #ffffff;
  }

  .grid-content {
    height:100%
  }

  .bg-purple-light {
    border-left: 3px dashed #ffffff;
  }
  .header_separator {
    float: left;
    width: 5px;
    height: 25px;
    margin-right: 10px;
    background: #ffffff;
  }
</style>
<style>
  .typeTree{
      background: #fff0;
      color: #ffffff;
  }
  .typeTree .el-tree-node__content:hover,.typeTree .el-tree-node:focus>.el-tree-node__content{
    background-color:#2E5A63
  }
  .typeTree .is-current .el-tree-node__content{
    background-color:#57838c !important;
  }
  .classifyTable .el-table__body tr:hover > td {
    background-color: #5A7D87 !important;
  }
  .classifyBreadcrumb .el-breadcrumb__inner{color: #ffffff !important;}
</style>
