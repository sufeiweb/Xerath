<template>
  <div class="pjList">
    <div class="pjList-item" @click="goEditLog">
        电商小程序物流接口
        <el-input v-model="logisticsNo" placeholder="请输入运单号"></el-input>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        logisticsNo:''
      }
    },
    methods:{
//  /Xerath/logistics
      goEditLog(){
          if(this.logisticsNo){
            this.$router.push(`/Xerath/logistics?logisticsNo=${this.logisticsNo}`)
          }else {
            toast.message({
              text:'请输入运单号'
            })
          }
      }
    }
  }
</script>
<style scoped lang="scss">
  .pjList{
    display: flex;
    padding-top: 20px;
    align-items: center;
    flex-wrap: wrap;
    .pjList-item{
      background: #fff;
      padding:10px;
      border-radius: 6px;
      width: 20%;
    }
  }
</style>
