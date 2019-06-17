<template>
    <el-card class="software-group container" shadow="never" :style="canWeSeeThis">
      <!--<el-card class="design container" shadow="never">-->
        <div class="type-head-1">
          <span>{{typeName}}</span>
        </div>
        <div class="body type-body-1">
          <el-row class="many-soft">
            <el-col :span="softWidth" v-for="soft in softToShow">
              <!--<software-item ></software-item>-->
              <software-item :img-url="soft.softIcon" :soft-name="soft.softName" :software-id="soft.softId"></software-item>
            </el-col>
            <el-col :span="3" :offset="1" :style="isShow"><a href="javascript:void (0)" @click="toMore">更多>></a></el-col>
          </el-row>
        </div>
        <div class="multi-line" v-for="line in multiSoft" :style="isMulti">
          <el-row class="single-line">
            <el-col :span="softWidth" v-for="soft in line.child">
              <software-item :img-url="soft.softIcon" :soft-name="soft.softName" :software-id="soft.softId"></software-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    <!--</el-card>-->
</template>

<script>
    import SoftwareItem from "../../../base-component/SoftwareItem";
    export default {
        name: "SoftwareGroup",
      components: {SoftwareItem},

      data(){
          return{
            softToShow:[],
            hasMore:true,
            isShow:'display:inline;',
            // multiLine:true,
            multiSoft:[],
            isMulti:'display:none;',
            canWeSeeThis:'',
          }
      },

      created(){
        // this.init();
        this.anotherInit();
        this.see();
      },

      props:['typeName','softs','count','cateId','multiLine','softWidth'],

      methods:{
          init(){
            for(var i=0;i<(this.softs.length<this.count?this.softs.length:this.count);i++){
              this.softToShow.push(this.softs[i]);
              this.softToShow[i].softIcon ="data:image/jpg;base64," + this.softs[i].softIcon;
            }

            this.hasMore = this.softs.length>this.count;
            if(!this.hasMore){
              this.isShow='display:none;';
            }
          },

        anotherInit(){
            var temp=[];
            for(var i=0;i<this.softs.length;i++){
              if(this.softs[i].softIcon == null || this.softs[i].softIcon == ''){
                this.softs[i].softIcon = require('../../../assets/software-logo/icon.png');
              }else {
                this.softs[i].softIcon ="data:image/jpg;base64," + this.softs[i].softIcon;
              }
              // this.softs[i].softIcon = "data:image/jpg;base64," + this.softs[i].softIcon;
              if(i<this.count){
                this.softToShow.push(this.softs[i]);
              }else {
                temp.push(this.softs[i]);
                if(temp.length == this.count){
                  var temp2={child:temp};
                  this.multiSoft.push(temp2);
                  // console.log(this.multiSoft);
                  temp=[];
                }
                if(i === this.softs.length - 1 && temp.length != 0){
                  var temp2={child:temp};
                  this.multiSoft.push(temp2);
                  console.log(this.multiSoft);
                }
              }
            }

          this.hasMore = this.softs.length>this.count;
          if(this.hasMore && !this.multiLine){
            this.isShow='display:inline';
            this.isMulti='display:none';
          }else if(this.hasMore && this.multiLine){
            this.isShow='display:none';
            this.isMulti='display:block';
          }else if(!this.hasMore){
            this.isShow='display:none';
          }
        },

        toMore(){
          eventBus.$emit('cateId',this.cateId);
          sessionStorage.setItem('cateId',this.cateId);

          this.roleId = sessionStorage.getItem("roleId");
          if (this.roleId == 2) {
            this.$router.push('/main-page/senior-user-manage/software-list');
          } else {
            this.$router.push('/main-page/general-user-manage/software-list');
          }
        },

        see(){
            if(this.softs.length == 0){
              this.canWeSeeThis='display:none;';
            }
        },
      },
    }
</script>

<style scoped>
.many-soft{
  /*margin-top: -3%;*/
}

.type-head-1{
  border-left: #ffffff solid 9px;
  padding-left: 9px;
  color: white;
  font-weight: bold;
}
</style>
