<template>
  <el-card class="maintain-upgrade" style="min-height: 900px">
    <el-row>
      <el-col :span="8">
        <div class="maintain-upgrade-page">
          <div slot="header">
            <div class="header_separator"></div>
            <span class="head_text text">维护更新</span>
          </div>
          <div class="maintain-body">
            <p class="text-left text top_p">请选择要更新软件:</p>
            <div class="selection-left">
              <el-select v-model="classification_maintain_1" placeholder="请选择一级分类" size="small"
                         @change="getMaintainSecond">
                <el-option
                  v-for="item in classification_maintain_options_1"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <span class="black">{{item.name}}</span>
                </el-option>
              </el-select>
            </div>
            <div class="selection-left">
              <el-select v-model="classification_maintain_2" placeholder="请选择二级分类" size="small"
                         @change="getMaintainThird">
                <el-option
                  v-for="item in classification_maintain_options_2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <span class="black">{{item.name}}</span>
                </el-option>
              </el-select>
            </div>
            <div class="selection-left">
              <el-select v-model="classification_maintain_3" placeholder="请选择三级分类" size="small"
                         @change="getMaintainSoftware">
                <el-option
                  v-for="item in classification_maintain_options_3"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <span class="black">{{item.name}}</span>
                </el-option>
              </el-select>
            </div>
            <div class="selection-left">
              <el-select v-model="software_maintain" placeholder="请选择软件" size="small">
                <el-option
                  v-for="item in software_maintain_options"
                  :key="item.id"
                  :label="item.softName"
                  :value="item.id">
                  <span class="black">{{item.softName}}</span>
                </el-option>
              </el-select>
            </div>
            <el-button class="commit-button-left" type="primary" size="small" @click="openSoft" :disabled="isAble">打开</el-button>
            <el-button class="commit-button-left" type="primary" size="small" style="display: block" @click="bindSoft" :disabled="isAble2">提交</el-button>
          </div>
        </div>
      </el-col>
      <!--<el-col :span="16">-->
        <!--<div class="maintain-upgrade-page">-->
          <!--<div slot="header">-->
            <!--<div class="header_separator"></div>-->
            <!--<span class="text head_text">软件更新</span>-->
          <!--</div>-->
          <!--<el-row class="maintain-upgrade-right">-->
            <!--<el-col :span="6" class="text-right text"><span>选择新版本安装路径：</span></el-col>-->
            <!--<el-col :span="8">-->
              <!--<el-input size="mini"></el-input>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
              <!--<el-button type="primary" size="mini">导入</el-button>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-button type="primary" class="updeate-button" size="small">安装新版本</el-button>-->
          <!--<div>-->
            <!--<div class="maintain-upgrade-right">-->
              <!--<p class="text-right text">请选择要更新软件及其所属分类:</p>-->
              <!--<div class="selection-right">-->
                <!--<el-select v-model="classification_upgrade_1" placeholder="请选择一级分类" size="mini"-->
                           <!--@change="getUpgradeSecond">-->
                  <!--<el-option-->
                    <!--v-for="item in classification_upgrade_options_1"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id">-->
                    <!--<span class="black">{{item.name}}</span>-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</div>-->
              <!--<div class="selection-right">-->
                <!--<el-select v-model="classification_upgrade_2" placeholder="请选择二级分类" size="mini"-->
                           <!--@change="getUpgradeThird">-->
                  <!--<el-option-->
                    <!--v-for="item in classification_upgrade_options_2"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id">-->
                    <!--<span class="black">{{item.name}}</span>-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</div>-->
              <!--<div class="selection-right">-->
                <!--<el-select v-model="classification_upgrade_3" placeholder="请选择三级分类" size="mini"-->
                           <!--@change="getUpgradeSoftware">-->
                  <!--<el-option-->
                    <!--v-for="item in classification_upgrade_options_3"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id">-->
                    <!--<span class="black">{{item.name}}</span>-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</div>-->
              <!--<div class="selection-right">-->
                <!--<el-select v-model="software_upgrade" placeholder="请选择软件" size="mini">-->
                  <!--<el-option-->
                    <!--v-for="item in software_upgrade_options"-->
                    <!--:key="item.id"-->
                    <!--:label="item.softName"-->
                    <!--:value="item.id">-->
                    <!--<span class="black">{{item.softName}}</span>-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</div>-->
              <!--<el-button class="commit-button-right" type="primary" size="small">提交</el-button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</el-col>-->
    </el-row>
  </el-card>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    name: "MaintainUpgrade",
    data() {
      return {
        username:'',
        cldSessionId:'',
        isAble:false,
        isAble2:true,

        classification_maintain_1: '',
        classification_maintain_2: '',
        classification_maintain_3: '',
        classification_maintain_options_1: '',
        classification_maintain_options_2: '',
        classification_maintain_options_3: '',
        software_maintain_options: '',
        software_maintain: '',
        classification_upgrade_1: '',
        classification_upgrade_2: '',
        classification_upgrade_3: '',
        classification_upgrade_options_1: '',
        classification_upgrade_options_2: '',
        classification_upgrade_options_3: '',
        software_upgrade_options: '',
        software_upgrade: '',

        classification_options: [{
          value: 0,
          label: "设计类"
        }, {
          value: 1,
          label: "办公类"
        }],
        software_options: [{
          value: 0,
          label: "MathCAD",
        }, {
          value: 1,
          label: "Creo"
        }, {
          value: 2,
          label: "Proe4.0"
        }]
      }
    },
    methods: {
      //初始化获取第一个分类
      init() {
        this.username = sessionStorage.getItem('username');
        this.$axios.get('/soft-category')
          .then((res) => {
            this.classification_maintain_options_1 = res.data.data;
            this.classification_upgrade_options_1 = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          })
      }
      ,
      //获取软件维护下的二级分类
      getMaintainSecond(row) {
        this.$axios.get('/soft-category', {
          params: {
            parentId: row,
          }
        })
          .then((res) => {
            this.classification_maintain_options_2 = res.data.data;
            this.classification_maintain_2 = "";
            this.classification_maintain_3 = "";
            this.getMaintainSoftware(row)

          })
          .catch((err) => {
            console.log(err);
          })
      }
      ,
      //获取软件升级下的二级分类
      getUpgradeSecond(row) {
        this.$axios.get('/soft-category', {
          params: {
            parentId: row,
          }
        })
          .then((res) => {
            this.classification_upgrade_options_2 = res.data.data;
            this.classification_upgrade_2 = "";
            this.classification_upgrade_3 = "";
            this.getUpgradeSoftware(row)

          })
          .catch((err) => {
            console.log(err);
          })
      }
      ,
      //获取软件维护下的三级分类
      getMaintainThird(row) {
        this.$axios.get('/soft-category', {
          params: {
            parentId: row,
          }
        })
          .then((res) => {
            this.classification_maintain_options_3 = res.data.data;
            this.classification_maintain_3 = "";
            this.getMaintainSoftware(row)
          })
          .catch((err) => {
            console.log(err);
          })
      }
      ,
      //获取软件升级下的三级分类
      getUpgradeThird(row) {
        this.$axios.get('/soft-category', {
          params: {
            parentId: row,
          }
        })
          .then((res) => {
            this.classification_upgrade_options_3 = res.data.data;
            this.classification_upgrade_3 = "";
            this.getUpgradeSoftware(row)
          })
          .catch((err) => {
            console.log(err);
          })
      }
      ,
      //获取软件维护下的软件
      getMaintainSoftware(row) {
        let username = sessionStorage.getItem("username");
        this.$axios.post('/soft-detail/getSoftsUpdate?' + "categoryId=" + row + "&username=" + username, {
        }).then((res) => {
          this.software_maintain_options = res.data.data;
          // console.log(res);
        }).catch((err)=>{
          console.log(err);
        });
      }
      ,
      //获取软件升级下的软件
      getUpgradeSoftware(row) {
        let username = sessionStorage.getItem("username");
        this.$axios.post('/soft-detail/getSoftsUpdate?' + "categoryId=" + row + "&username=" + username, {
          softCategory: row.toString(),
        }).then((res) => {
          this.software_upgrade_options = res.data.data;
        })
          .catch((err) => {
            console.log(err);
          })
      },

      openSoft(){
        // console.log(this.software_maintain);
        if(this.software_maintain == ''){
          alert('请选择一款软件');
        }else {
          const loading = this.$loading({
            lock: true,
            text: '正在打开桌面……',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          // console.log(this.softwareId);
          this.$axios.post('/send-request/update-desktop',{
            username:this.username,
            softwareId:this.software_maintain,
          }).then((res)=>{
            console.log(res);
            if(res.data.success === true){
              this.isAble = true;
              this.isAble2 = false;
              this.cldSessionId = res.data.cldSessionId;
              setTimeout(()=>{
                window.open(res.data.desktopAddr);
                loading.close();
              },5000);
            }else {
              loading.close();
              alert('打开软件失败，请重试或联系管理员！');
            }
            // console.log(res.data);
          }).catch((err)=>{
            loading.close();
            console.log(err);
          });
        }
      },

      bindSoft(){
        const loading = this.$loading({
          lock: true,
          text: '正在更新软件……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post('/soft-detail/install-soft',{
          username:this.username,
          softId:this.software_maintain,
          cldSessionId:this.cldSessionId
        }).then((res)=>{
          console.log(res);
          loading.close();
          if(res.data.message === "成功"){
            this.isAble = false;
            this.isAble2 = true;
            this.ifSubmit=true;
            this.$message({
              message: '安装成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '安装失败',
              type: 'error'
            });
          }
        }).catch(()=>{
          this.$message({
            message: '请求失败',
            type: 'error'
          });
        });
      },
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>
  .maintain-upgrade {
    width: 100%;
    height: 600px;
  }

  .maintain-upgrade-page {
    height: 550px;
  }

  .maintain-upgrade-right {
    margin: 2% 0 0 10px;
  }

  .updeate-button {
    margin: 2% 0 0 300px;
  }

  .commit-button-left {
    margin: 20px 0 0 35%;
    width: 20%;
  }

  .commit-button-right {
    margin: 20px 0 0 32%;
    width: 10%;
  }

  .selection-left {
    margin: 4% 0 0 15%;
  }

  .selection-right {
    margin: 1% 0 0 25%;
  }

  .text-left {
    margin-left: 15%;
  }

  .text-right {
    margin-left: 10%;
  }

  .header_separator {
    float: left;
    width: 5px;
    height: 25px;
    margin-right: 10px;
    background: #ffffff;
  }

  .text {
    color: #fff;
  }

  .head_text {
    font-size: 20px;
    font-weight: bold;
  }

  .head_text {
    font-size: 20px;
    font-weight: bold;
  }

  .black {
    color: #606266;
  }

  .top_p {
    margin-top: 4%;
  }

  .maintain-body{
      margin-top: 10%;
      margin-left: 10%;
  }
</style>
