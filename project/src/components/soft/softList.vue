<template>
    <div>
      <el-row class="searchTypes">
        <el-row>
          <el-col :span="16" :offset="4">
            <el-card class="box-card">
              <el-row class="type">
                <el-col :span="3"><span>领域分类：</span></el-col>
                <el-col :span="2"><el-button type="text" @click="searchSoft('area_all')">全部</el-button></el-col>
                <el-col :span="3"><el-button type="text" @click="searchSoft('area_search')">研发设计</el-button></el-col>
                <el-col :span="3"><el-button type="text">生产制造</el-button></el-col>
                <el-col :span="3"><el-button type="text">远程维护</el-button></el-col>
                <el-col :span="3"><el-button type="text">增值服务</el-button></el-col>
              </el-row>
              <el-row class="type">
                <el-col :span="3"><span>行业分类：</span></el-col>
                <el-col :span="2"><el-button type="text">全部</el-button></el-col>
                <el-col :span="3"><el-button type="text">汽车制造</el-button></el-col>
                <el-col :span="3"><el-button type="text">航空航天</el-button></el-col>
                <el-col :span="3"><el-button type="text">信息技术</el-button></el-col>
                <el-col :span="3"><el-button type="text">机械制造</el-button></el-col>
                <el-col :span="3"><el-button type="text">精密仪器</el-button></el-col>
                <el-col :span="3"><el-button type="text">化学化工</el-button></el-col>
              </el-row>
              <el-row class="type">
                <el-col :span="3"><span>交付方式：</span></el-col>
                <el-col :span="2"><el-button type="text">全部</el-button></el-col>
                <el-col :span="3"><el-button type="text">下载</el-button></el-col>
                <el-col :span="3"><el-button type="text">SAAS</el-button></el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>

      </el-row>
      <el-row class="searchTables">
        <el-col :span="16" :offset="4">
          <el-card class="box-card">
            <div slot="header" class="clearfix" style="height: 50px">
              <el-col :span="2" :offset="1"><span>排序：</span></el-col>
              <el-col :span="2"><el-button type="text" @click="searchSoft('order_normal')">默认</el-button></el-col>
              <el-col :span="3"><el-button type="text"@click="searchSoft('order_sale')">总销量<i class="el-icon-top"></i></el-button></el-col>
              <el-col :span="3"><el-button type="text"@click="searchSoft('order_time')">上架时间<i class="el-icon-top"></i></el-button></el-col>
              <el-col :span="2"><el-button type="text"@click="searchSoft('order_score')">评分<i class="el-icon-top"></i></el-button></el-col>
              <el-col :span="2"><el-button type="text"@click="searchSoft('order_price')">价格<i class="el-icon-top"></i></el-button></el-col>
            </div>
            <div class="softContent">
              <!--softInfo-->
              <el-row>
                <el-col :span="2" class="softImg">
                  <router-link  to="/soft/softDetail" >
                  <img src="../../assets/common/logo_zhuchi.png" height="80" width="80">
                  </router-link>
                </el-col>
                <el-col :span="5" class="softInfo">
                  <el-row><h3 class="softName">Cero</h3></el-row>
                  <el-row><span class="company">北京XX公司</span></el-row>
                  <el-row><span class="info">Cero是一款XX软件</span></el-row>
                </el-col>
                <el-col :span="5" style="margin-top: 10px">
                  <el-row>
                    <el-col :span="6">评分：</el-col>
                    <el-col :span="16"><el-rate
                      v-model="testScore"
                      disabled
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate></el-col>
                  </el-row>
                  <el-row style="margin-top: 15px;"><span class="saleCount">月销量10件</span></el-row>
                </el-col>
                <el-col :span="3"><h3 class="money" style="margin: 10px 0px">￥500000</h3></el-col>
                <el-col :span="3"><el-button type="text"><i class="fa fa-heart-o"></i></el-button>点击收藏</el-col>
                <el-col :span="4" style="margin-top: 5px">
                  <el-row><el-button type="button"size="medium">点击获取</el-button></el-row>
                  <el-row style="margin-top: 10px"><span class="pay">交付方式：SAAS</span></el-row>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <!--softInfo-->
              <el-row>
                <el-col :span="2" class="softImg">
                  <router-link  to="/soft/softDetail" >
                  <img src="../../assets/common/logo_zhuchi.png" height="80" width="80">
                  </router-link></el-col>
                <el-col :span="5" class="softInfo">
                  <el-row><h3 class="softName">Cero</h3></el-row>
                  <el-row><span class="company">北京XX公司</span></el-row>
                  <el-row><span class="info">Cero是一款XX软件</span></el-row>
                </el-col>
                <el-col :span="5" style="margin-top: 10px">
                  <el-row>
                    <el-col :span="6">评分：</el-col>
                    <el-col :span="16"><el-rate
                      v-model="testScore"
                      disabled
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate></el-col>
                  </el-row>
                  <el-row style="margin-top: 15px;"><span class="saleCount">月销量10件</span></el-row>
                </el-col>
                <el-col :span="3"><h3 class="money" style="margin: 10px 0px">￥500000</h3></el-col>
                <el-col :span="3"><el-button type="text"><i class="fa fa-heart-o"></i></el-button>点击收藏</el-col>
                <el-col :span="4">
                  <el-row><el-button type="button"size="medium">点击获取</el-button></el-row>
                  <el-row style="margin-top: 10px"><span class="pay">交付方式：SAAS</span></el-row>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="2" class="softImg">
                  <router-link  to="/soft/softDetail" >
                    <img src="../../assets/common/logo_zhuchi.png" height="80" width="80">
                  </router-link></el-col>
                <el-col :span="5" class="softInfo">
                  <el-row><h3 class="softName">Cero</h3></el-row>
                  <el-row><span class="company">北京XX公司</span></el-row>
                  <el-row><span class="info">Cero是一款XX软件</span></el-row>
                </el-col>
                <el-col :span="5" style="margin-top: 10px">
                  <el-row>
                    <el-col :span="6">评分：</el-col>
                    <el-col :span="16"><el-rate
                      v-model="testScore"
                      disabled
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate></el-col>
                  </el-row>
                  <el-row style="margin-top: 15px;"><span class="saleCount">月销量10件</span></el-row>
                </el-col>
                <el-col :span="3"><h3 class="money" style="margin: 10px 0px">￥500000</h3></el-col>
                <el-col :span="3"><el-button type="text"><i class="fa fa-heart-o"></i></el-button>点击收藏</el-col>
                <el-col :span="4">
                  <el-row><el-button type="button"size="medium">点击获取</el-button></el-row>
                  <el-row style="margin-top: 10px"><span class="pay">交付方式：SAAS</span></el-row>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="2" class="softImg">
                  <router-link  to="/soft/softDetail" ><img src="../../assets/common/logo_zhuchi.png" height="80" width="80">
                  </router-link></el-col>
                <el-col :span="5" class="softInfo">
                  <el-row><h3 class="softName">Cero</h3></el-row>
                  <el-row><span class="company">北京XX公司</span></el-row>
                  <el-row><span class="info">Cero是一款XX软件</span></el-row>
                </el-col>
                <el-col :span="5" style="margin-top: 10px">
                  <el-row>
                    <el-col :span="6">评分：</el-col>
                    <el-col :span="16"><el-rate
                      v-model="testScore"
                      disabled
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate></el-col>
                  </el-row>
                  <el-row style="margin-top: 15px;"><span class="saleCount">月销量10件</span></el-row>
                </el-col>
                <el-col :span="3"><h3 class="money" style="margin: 10px 0px">￥500000</h3></el-col>
                <el-col :span="3"><el-button type="text"><i class="fa fa-heart-o"></i></el-button>点击收藏</el-col>
                <el-col :span="4">
                  <el-row><el-button type="button"size="medium">点击获取</el-button></el-row>
                  <el-row style="margin-top: 10px"><span class="pay">交付方式：SAAS</span></el-row>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="2" class="softImg">
                  <router-link  to="/soft/softDetail" >
                  <img src="../../assets/common/logo_zhuchi.png" height="80" width="80">
                  </router-link></el-col>
                <el-col :span="5" class="softInfo">
                  <el-row><h3 class="softName">Cero</h3></el-row>
                  <el-row><span class="company">北京XX公司</span></el-row>
                  <el-row><span class="info">Cero是一款XX软件</span></el-row>
                </el-col>
                <el-col :span="5" style="margin-top: 10px">
                  <el-row>
                    <el-col :span="6">评分：</el-col>
                    <el-col :span="16"><el-rate
                      v-model="testScore"
                      disabled
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate></el-col>
                  </el-row>
                  <el-row style="margin-top: 15px;"><span class="saleCount">月销量10件</span></el-row>
                </el-col>
                <el-col :span="3"><h3 class="money" style="margin: 10px 0px">￥500000</h3></el-col>
                <el-col :span="3"><el-button type="text"><i class="fa fa-heart-o"></i></el-button>点击收藏</el-col>
                <el-col :span="4">
                  <el-row><el-button type="button"size="medium">点击获取</el-button></el-row>
                  <el-row style="margin-top: 10px"><span class="pay">交付方式：SAAS</span></el-row>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <!--page-->
              <el-row style="text-align: center">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="1"
                  :page-sizes="[5, 10, 15]"
                  :page-size="5"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="40">
                </el-pagination>
              </el-row>

            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "softCommon",
      data(){
        return{
          testScore:3.8,
        }
      },
      methods:{
        //查找软件
        searchSoft(val){
          console.info(val);
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
      }
    }
</script>

<style scoped>
  .searchTypes{margin: 5px 0px}
  .searchTypes .type{margin: 20px 0px}
  .softImg{margin: 5px}
  .softContent span{font-size: 13px}
  .softInfo{margin-top: 10px}
  .softContent{max-height: 800px;overflow: auto}
  .searchTypes button,.el-card__header button{padding: 0px}
</style>
