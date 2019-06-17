<template>
  <div class="search-component">
    <el-row>
      <el-col :span="length"><el-input type="text" size="mini" v-model="searchContent"/></el-col>
      <el-col :span="2" :offset="distance"><a href="javascript:void(0)" @click="toSearch"><img src="../../../assets/u79.png" class="search-pic"/></a></el-col>
    </el-row>
  </div>

</template>

<script>
    export default {
        name: "SearchComponent",

      data(){
          return{
            searchContent:'',
          }
      },

      props:['length','distance'],

      methods:{
        toSearch(){
          sessionStorage.setItem('searchWord',this.searchContent);
          if (this.roleId == 2) {
            this.$router.push('/main-page/senior-user-manage/software-search');
          } else {
            this.$router.push('/main-page/general-user-manage/software-search');
          }
        },
      },
    }
</script>

<style scoped>
.search-pic{
  /*padding-top: 15%;*/
}
</style>
