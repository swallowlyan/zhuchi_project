<template>
  <div style="margin-left:-40px;">
   <el-row :gutter="25">
    <el-col :span="18">
      <el-row :gutter="25">
        <el-col :span="10">
        <el-card >
          <div style="height:350px">
            <div class="suffix_s">
              <div>|</div><span>常用服务</span>
            </div>
            <div class="suffix">
              <div style="text-align:center;width:50%;"
              v-for="(data, index) in datas_a"
              :key="index">
                 <div style="color:#263d77;font-size:13px;font-weight:700;">{{data.title}}</div>
                 <div style="font-size:14px;">{{data.value}}</div>
              </div>
            </div>
          </div>
        </el-card>
        </el-col>
        <el-col :span="14">
        <el-card >
        <div style="height:350px">
          <div class="suffix_s">
            <div>|</div><span>历史服务</span>
          </div>
          <div class="suffix">
            <div style="text-align:center;width:25%;"
              v-for="(data, index) in datas_b"
              :key="index">
                <div style="color:#263d77;font-size:13px;font-weight:700;">{{data.title}}</div>
                <div style="font-size:14px;">{{data.value}}</div>
            </div>
          </div>
        </div>
      </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="25" style="margin-top:25px;">
        <el-col :span="24">
          <el-card >
            <div style="height:350px">
              <div class="suffix_s">
                <div>|</div><span>已购买服务</span>
                  <div class="suffix" style="position:absolute;right:10px;">
                  <el-input
                    style="width:240px;"
                    popper-class="my-autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容">
                  </el-input>
                    <i
                      class="el-icon-search"
                      @click="handleIconClick">
                    </i>
                  </div>
                </div>
              <div class="spe" style="border-bottom:1px dashed #aaa;">
                <div style="width:49.9%;border-right:1px dashed #aaa;height:130px;">
                 <span style="font-size:14px;margin-left:10px">工业软件</span>
                  <div style="display:flex;align-items:center;flex-wrap:wrap;">
                    <div style="text-align:center;width:25%;"
                      v-for="(data, index) in datas_c"
                      :key="index">
                        <div>图片</div>
                        <div>{{data.title}}</div>
                    </div>
                  </div>
                </div>
                <div style="width:50%;height:130px;">
                  <span style="font-size:14px;margin-left:10px;">工业app</span>
                  <div style="display:flex;align-items:center;flex-wrap:wrap;">
                    <div style="text-align:center;width:25%;"
                      v-for="(data, index) in datas_c"
                      :key="index">
                        <div>图片</div>
                        <div>{{data.title}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="spe">
                <div style="width:49.9%;border-right:1px dashed #aaa;height:130px;">
                  <span style="font-size:14px;margin-left:10px;">微服务组件</span>
                  <div style="display:flex;align-items:center;flex-wrap:wrap;">
                    <div style="text-align:center;width:25%;"
                      v-for="(data, index) in datas_c"
                      :key="index">
                        <div>图片</div>
                        <div>{{data.title}}</div>
                    </div>
                  </div>
                </div>
                <div style="width:50%;height:130px;">
                  <span style="font-size:14px;margin-left:10px;">肌理模型</span>
                  <div style="display:flex;align-items:center;flex-wrap:wrap;">
                    <div style="text-align:center;width:25%;"
                      v-for="(data, index) in datas_c"
                      :key="index">
                        <div>图片</div>
                        <div>{{data.title}}</div>
                    </div>
                  </div>
                </div>
              </div>
             </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
      <el-card >
        <div style="height:765px">
          <div class="suffix_s">
            <div>|</div><span>我的云空间</span>
            <div class="suffix" style="position:absolute;right:5px;">
              <el-input
                style="width:150px;"
                popper-class="my-autocomplete"
                v-model="state"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容">
              </el-input>
                <i
                  class="el-icon-search"
                  @click="handleIconClick">
                </i>
            </div>
          </div>
          <div style="margin-top:50px;">
            <div style="text-align:center;width:25%;margin:20px 10px;"
              v-for="(data, index) in datas_c"
              :key="index">                
                <div>
                <i
                  style="margin-right:8px;"
                  class="fa fa-file-o"
                  @click="handleIconClick">
                </i>{{data.title}}</div>
            </div>
          </div>
        </div>
      </el-card>
    </el-col >
    </el-row>
  </div>
</template>
<script>
    export default {
      data(){
          return{
            state:'',
            datas_a: [
              { title: '!!!ABAQUS',value:'ABAQUS'},
              { title: '!!!ABAQUS',value:'ABAQUS',},
              { title: '!!!ABAQUS',value:'ABAQUS',},
              { title: '!!!ABAQUS',value:'ABAQUS',},
            ],
            datas_b: [
              { title: '!!!ABAQUS',value:'ABAQUS'},
              { title: '!!!ABAQUS',value:'ABAQUS',},
              { title: '!!!ABAQUS',value:'ABAQUS',},
              { title: '!!!ABAQUS',value:'ABAQUS',},
              { title: '!!!ABAQUS',value:'ABAQUS'},
              { title: '!!!ABAQUS',value:'ABAQUS',},
              { title: '!!!ABAQUS',value:'ABAQUS',},
              { title: '!!!ABAQUS',value:'ABAQUS',},
            ],
            datas_c: [
              { title: 'Creo'},
              { title: 'Creo'},
              { title: 'Creo'},
              { title: 'Creo'},
            ],
          }
      },
      created(){
      },
      methods:{
         querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      },
    }
</script>

<style scoped>
.suffix_s{
 display:flex;
 align-items:center;
}
.suffix{
 display:flex;
 align-items:center;
 flex-wrap:wrap;
}
.suffix div{
  margin:10px 0;
}
.suffix div div{
  padding:5px 0;
} 
.suffix_s div{
  font-size:18px;
  font-weight:700;
  margin:0px 14px 0px 0px
}
.suffix_s span{
  font-weight:700;
  font-size:14px;
}
.spe{
  padding:10px 0;
  display:flex;
 align-items:center;
}
</style>
