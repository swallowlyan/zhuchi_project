<template>
    <el-card class="purchase-book" style="min-height: 900px">
      <book-item typeCode="1"></book-item>
    </el-card>
</template>

<script>
    import BookItem from "../../base-component/BookItem";
    export default {
        name: "PurchaseBook",
      components:{
        BookItem,
      }

    }
</script>

<style scoped>
  .pa {
    width: 100%;
    min-height: 20px;
  }

</style>
