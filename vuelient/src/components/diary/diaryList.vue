<template>
  <div class="diaryList">
    <el-button type="primary" icon="el-icon-edit" @click='goDiaryEdit'></el-button>
    <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,index) in codeData" :key='index' :name='index' :title="item.diaryTitle" >
            <div class="diaryContent">
              <span> {{item.createDate | dateYMDHIS}}</span>
              <span v-for="(value,index) in item.optionsValue" :key='index'><span v-if="index!=0">、</span>{{value}}</span>
              </div>
            <div v-html="item.diaryContent"></div>
        </el-collapse-item>
    </el-collapse>
    <pagebar :current="pageInfo.current" :showItem="pageInfo.showItem" :allpage="pageInfo.allpage" @on-gopage="gopage"></pagebar>
  </div>
</template>
<script>
import pagebar from '../pagebar.vue';
  export default {
    data() {
      return {
        activeName: '0',
        codeData:[],
        pageInfo:{
          current:1,
          showItem:10,
          allpage:5
        }
      };
    },
    components:{
      pagebar
    },
    methods:{
      getDiaryList(page){
          this.$http.post('/diarys/diaryList',{
            page:page
          }).then((result)=>{
            //成功
            console.log(result)
            this.codeData = result.data.data;
            this.pageInfo.allpage = Math.ceil( result.data.total/20 );
          }).catch( (error)=> {
            //失败
            console.log(error)
          });
      },
      goDiaryEdit(){
          this.$router.push({path:'/Xerath/diaryEdit'});
      },
      gopage(index){
        this.pageInfo.current=index;
        this.getTechList(index);
      }
    },
    mounted(){
      this.getDiaryList(1);
    }
  }
</script>
<style lang="scss" scoped>
    .el-button{
      margin-top:20px;
      margin-left: 20px;
    }
    .el-collapse{
        margin-top:20px;
        background: #fff;
        border-radius: 4px;
        .el-collapse-item{
          padding: 0 10px;
          div{
              padding: 0 10px;
            
          }
        }
    }
    .diaryList{
      .diaryContent{
        >span:nth-of-type(1){
          margin-right: 20px;
        }
      }
    }
</style>

