<template>
    <el-card style="min-height: 900px">
      <book-item typeCode="0"></book-item>
    </el-card>
</template>

<script>
  import BookItem from "../../base-component/BookItem";
    export default {
        name: "SelfBook",
      data(){
        return {
          ca:1
        }
      },
      components:{
        BookItem,
      },
      methods:{
          ischange(){
            console.log("改变了");
            this.ca++;
          }
      }
    }
</script>

<style scoped>

</style>
