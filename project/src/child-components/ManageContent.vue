<template>
    <div class="manage-content">
      <el-card></el-card>
    </div>
</template>

<script>
    export default {
        name: "ManageContent"
    }
</script>

<style scoped>

</style>

<el-form ref="softwareCheckForm" :model="softwareCheckForm" label-width="100px">
  <el-form-item label="软件名：" class="test" >
    <el-input>  </el-input>
  </el-form-item>
  <el-form-item label="版本号：" >
    <el-input>  </el-input>
  </el-form-item>
  <el-form-item label="采购模块：" >
    <el-input>  </el-input>
  </el-form-item>
  <el-form-item label="软件分类：" >
    <el-cascader :options="classification"
                 @active-item-change="handleItemChange"
                 :props="props"
    >

    </el-cascader>

  </el-form-item>
  <el-form-item label="功能描述：" >
    <el-input>  </el-input>
  </el-form-item><el-form-item label="标签设置：" >
  <el-tag
    class="tag"
    :key="tag"
    v-for="tag in softwareCheckForm.tags"
    closable
    :disable-transitions="false"
    @close="handleCloseTag(tag)">
    {{tag}}
  </el-tag>
  <el-input
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue"
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
  >
  </el-input>
  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
</el-form-item>

  <el-form-item label="配置需求：" >
    <el-input>  </el-input>
  </el-form-item>
  <el-form-item label="软件图标：" style="color: white;background-color: forestgreen" >
    <el-input></el-input>
  </el-form-item>
</el-form>
