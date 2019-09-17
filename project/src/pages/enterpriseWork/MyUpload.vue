<template>
  <div>
    <div class="suffix">
      <div style="font-size:24px;font-weight:700;margin:0px 14px 0px -23px">|</div>企业上传服务
    </div>
    <div style="padding: 20px;max-height: 450px;overflow: auto">
      <router-link :to="{path:'/enterprise-workbench/upload-service'}">
        <el-button type="primary">企业上传服务</el-button>
      </router-link>
    </div>
    <div class="suffix">
      <el-input
        style="width:300px;"
        popper-class="my-autocomplete"
        v-model="searchVal"
        :fetch-suggestions="searchUploadData"
        placeholder="请输入内容"
      ></el-input>
      <i style="margin:0 5px" class="el-icon-search" @click="searchUploadData"></i>
    </div>
    <div class="work_table">
      <table width="90%" style="border-collapse:collapse">
        <tr style="font-weight:700;font-size:14px;line-height:35px;">
          <td>服务名</td>
          <td>软件图标</td>
          <td>版本号</td>
          <td>服务分类</td>
          <td>行业分类</td>
          <td>领域分类</td>
          <td>交付方式</td>
          <td>服务简介</td>
          <td>规格报价</td>
          <td>当前状态</td>
          <td>操作</td>
        </tr>
        <tr
          v-for="(data, index) in uploadData"
          style="font-size:12px;line-height:35px;"
          :key="index"
        >
          <td>{{data.softName}}</td>
          <td>
            <template>
              <img :src="'data:image/jpg;base64,'+data.softIcon" style="height:30px;width: 30px" />
            </template>
          </td>
          <td>{{data.softVersion}}</td>
          <td>{{data.softMenuName}}</td>
          <td>{{data.softCategoryName}}</td>
          <td>{{data.softCategory2Name}}</td>
          <td>{{data.softCategory3Name}}</td>
          <td>{{data.description}}</td>
          <td></td>
          <td v-if="data.status==='NORMAL'">正常</td>
          <td v-if="data.status==='DEL'">已下架</td>
          <td>
            <template v-if="data.status==='NORMAL'">
              <el-button size="mini" name="select" @click="editSoft(data)">编辑</el-button>
              <el-button size="mini" name="select" @click="delSoft(data.id)">下架</el-button>
            </template>
            <template v-if="data.status==='DEL'">已下架</template>
          </td>
        </tr>
      </table>
    </div>
    <el-dialog title="编辑服务" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" :rules="dialogFormRules" ref="dialogForm" label-width="100px">
        <el-form-item label="服务名:" prop="softName">
          <span>{{dialogForm.softName}}</span>
        </el-form-item>
        <div class="demo-input-suffix">
          <span>上传图标:</span>
          <img v-show="ifEditImg" :src="dialogForm.softIcon" style="height:30px;width: 30px" />
          <img
            v-show="!ifEditImg"
            :src="'data:image/jpg;base64,'+dialogForm.softIcon"
            style="height:30px;width: 30px"
          />
          <input
            class="file"
            name="icon"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            @change="iconSelect"
          />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchVal: "",
      uploadData: [],
      serviceTypeList: [],
      areaTypeList: [],
      industryTypeList: [],
      payTypeList: [],
      ifSubmit: true,
      ifSAAS: false,
      ifDown: true,
      ifOpenWin: false,
      ifInstall: false,
      ifEditImg: false,
      dialogFormVisible: false,
      editImg: [],
      dialogForm: {
        softName: "",
        softMenu: "",
        description: "",
        softSupply: "",
        softFunDes: "",
        price1: "",
        price2: "",
        price3: "",
        softIcon: "",
        file: ""
      },
      dialogFormRules: {
        softName: [
          { required: true, message: "请输入软件名", trigger: "blur" }
        ],
        softMenu: [
          { required: true, message: "请选择服务分类", trigger: "blur" }
        ],
        softCategory: [
          { required: true, message: "请选择领域分类", trigger: "blur" }
        ],
        softCategory2: [
          { required: true, message: "请选择行业分类", trigger: "blur" }
        ],
        softCategory3: [
          { required: true, message: "请选择交付分类", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.searchUploadData();
  },
  methods: {
    searchUploadData() {
      let param = { username: sessionStorage.getItem("username") };
      this.$axios
        .post("/soft-detail/my-upload", param)
        .then(res => {
          if (typeof res.data.data !== "string" && res.data.data.length > 0)
            this.uploadData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //编辑
    editSoft(data) {
      this.dialogForm = data;
      this.ifEditImg = false;
      this.dialogFormVisible = true;
    },
    //图标选择
    iconSelect(e) {
      let file = e.target.files[0];
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像只能是图片格式!");
        return false;
      } else if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过2MB!");
        return false;
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.onload = function(e) {
          console.info(e.target.result);
          this.editImg.push(e.target.result);
        };
        reader.readAsDataURL(file);
        console.info(this.editImg);
        this.ifEditImg = true;
        this.dialogForm.softIcon = file;
      }
    },
    //编辑提交
    submitUpload() {
      if (
        this.dialogForm.softIcon === "" ||
        this.dialogForm.softIcon === undefined
      ) {
        this.$message({
          message: "请选择图标，进行上传",
          type: "error"
        });
      } else {
        //开始上传
        event.preventDefault();
        // let param = new window.FormData();
        // param.append("id",this.dialogForm.id);
        // param.append("username",sessionStorage.getItem('username'));
        // Object.keys(this.dialogForm).forEach((item) => {
        //   if(item==="softIcon")param.append("softIcon",this.dialogForm.softIcon);
        // });
        let param = new window.FormData();
        param.append("id", this.dialogForm.id);
        param.append("username", sessionStorage.getItem("username"));
        Object.keys(this.dialogForm).forEach(item => {
          if (item === "softIcon")
            param.append("icon", this.dialogForm.softIcon);
        });
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.$axios
          .post("/soft-detail/update", param, config)
          .then(res => {
            let message = "";
            if (res.data.message === "成功") {
              this.dialogFormVisible = false;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.searchUploadData();
            } else {
              this.$message({
                message: "修改失败",
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //下架
    delSoft(softId) {
      this.$axios
        .post("/soft-detail/del", { id: softId })
        .then(res => {
          if (res.data.message === "成功") {
            this.$message({
              message: "已成功下架该服务",
              type: "success"
            });
            this.searchUploadData();
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.suffix {
  display: flex;
  align-items: center;
}
tr:nth-child(odd) {
  background: #fafafa;
}
tr:nth-child(1) {
  background: #fff !important;
  color: #909399;
  font-size: 12px !important;
}
tr {
  border-bottom: 1px solid #ebeef5;
}
.line_style div {
  margin: 10px 0;
}
.work_table {
  padding: 20px;
  max-height: 450px;
  overflow: auto;
}
#price table,
#price table tr th,
#price table tr td {
  border: 1px solid #dddddd;
  padding: 5px 10px;
}
#price table {
  width: 100%;
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
}
</style>
