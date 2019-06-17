<template>
  <div id="ind_div">
    <!-- 头 -->
    <div class="ind_header">
      <div class="header_cont">
        <div class="head_cont_le">
          <img src="../assets/u149.png" alt="">
        </div>
        <!--<div class="head_cont_re">-->
          <!--&lt;!&ndash; 首页 &ndash;&gt;-->
          <!--<div @click="onInd()"><span class="wc" title="首页"></span></div>-->
          <!--&lt;!&ndash; <div></div> &ndash;&gt;-->
          <!--<div @mouseover="overShow" @mouseout="outHide">-->
            <!--&lt;!&ndash; 人物 &ndash;&gt;-->
            <!--<div>-->
              <!--<span ></span>-->
            <!--</div>-->
          <!--</div>-->
          <!--<p class="ssp" @mouseover="overShow" @mouseout="outHide">{{msg}}</p>-->
          <!--&lt;!&ndash; 上下 &ndash;&gt;-->
          <!--<div class="updw" @click="xianshi()" @mouseover="overShow" @mouseout="outHide">-->
            <!--<span class="le " v-show="willshow === 0"></span>-->
            <!--<span class="re " v-show="willshow === 1"></span>-->
          <!--</div>-->
          <!--&lt;!&ndash; 修改密码——退出 &ndash;&gt;-->
          <!--<div class="exit" v-show="willshow === 1" @mouseover="overShow" @mouseout="outHide">-->
            <!--<div @click="OnFolder(1)">-->
              <!--<span style="background: url(../../../static/soft_jia.png) no-repeat center;"></span>-->
              <!--<p>文件管理</p>-->
            <!--</div>-->
            <!--<div @click="OnchengPwd(1)">-->
              <!--<span style="background: url(../../../static/mima_icon.png) no-repeat center;"></span>-->
              <!--<p>修改密码</p>-->
            <!--</div>-->
            <!--<div @click="OnExit()">-->
              <!--<span style="background: url(../../../static/tuichu_icon.png) no-repeat center;"></span>-->
              <!--<p>退出</p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <!-- 身体 -->
    <el-row class="index-row">
      <el-col :span="2" :offset="6">
        <div class="index-div" @click="onIndex()">
          <div id="bg1" class="empty-span"></div>
          <p class="index-word">创新设计云服务</p>
          <div></div>
        </div>
      </el-col>
      <el-col :span="2" :offset="1">
        <div @click="zhizao()" class="index-div">
            <div id="bg2" class="empty-span"></div>
            <p class="index-word">柔性制造云服务</p>
            <div></div>
        </div>
      </el-col>
      <el-col :span="2" :offset="1">
        <div @click="gongying()" class="index-div">
          <div id="bg3" class="empty-span"></div>
          <p class="index-word">供应链协同云服务</p>
          <div></div>
        </div>
      </el-col>
      <el-col :span="2" :offset="1">
        <div @click="yuancheng()" class="index-div">
          <div id="bg4" class="empty-span"></div>
          <p class="index-word">远程维护云服务</p>
          <div></div>
        </div>
      </el-col>
    </el-row>
    <div class="ind_body">
      <!-- 1 -->
      <!--<div class="index-div" @click="onIndex()">-->
        <!--<div id="bg1" class="empty-span"></div>-->
        <!--<p>创新设计云服务</p>-->
        <!--<div></div>-->
      <!--</div>-->
      <!-- 2 -->
      <!--<div @click="zhizao()" class="index-div">-->
        <!--<div id="bg2" class="empty-span"></div>-->
        <!--<p>柔性制造云服务</p>-->
        <!--<div></div>-->
      <!--</div>-->
      <!-- 3 -->
      <!--<div @click="gongying()" class="index-div">-->
        <!--<div id="bg3" class="empty-span"></div>-->
        <!--<p>供应链协同云服务</p>-->
        <!--<div></div>-->
      <!--</div>-->
      <!-- 4 -->
      <!--<div @click="yuancheng()" class="index-div">-->
        <!--<div id="bg4" class="empty-span"></div>-->
        <!--<p>远程维护云服务</p>-->
        <!--<div></div>-->
      <!--</div>-->
    </div>
    <!-- 脚 -->
    <!--<div class="ind_footer">-->
      <!--<span>版权所有©潍柴控股集团有限公司</span>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "Ind",

    data(){
      return{

      }
    },

    methods:{
      onIndex(){
        console.log('1111111111');
        this.$router.push('/login-page/login');
      },

      zhizao(){
        console.log('222222222');
        // window.open('http://www.baidu.com');
        window.location.href = 'http://127.0.0.1:8080'
      }
    },
  }
</script>

<style scoped>
#ind_div{
  background: url(../assets/BG2.jpg) no-repeat;
  background-size: cover;
  height: 1000px;
}

  #bg1{
    background: url("../assets/index/1.png") no-repeat center;
  }

  #bg2{
    background: url("../assets/index/2.png") no-repeat center;
  }

  #bg3{
    background: url("../assets/index/3.png") no-repeat center;
  }

  #bg4{
    background: url("../assets/index/4.png") no-repeat center;
  }

  .index-div{
    /*height: 120px;*/
    width: 130px;
    background-color: #0b5aa5;
    text-align: center;
    padding: 5%;
  }

  .empty-span{
    height: 100px;
  }

  .index-word{
    margin-top: 5%;
    color: white;
  }

  .index-row{
    margin-top: 15%;
  }

  .head_cont_le{
    padding: 15px;
  }
</style>
