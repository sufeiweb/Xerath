<template>
  <div class="techDetailsBox">
    <div class="techDetails">
      <section class="title">
        <h2>{{details.describe}}</h2>
      </section>
      <aside class="timer">
        <span>创建时间：{{details.createDate |dateYMDHIS}}</span>
      </aside>
      <section class="content">
        <div v-html="details.detail"></div>
      </section>
      <section class="buttonfooter">
        <button class="mybutton" @click="goBack">返回</button>
        <button class="mybutton" @click="update">编辑</button>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        details:{
          describe:'',
          createDate:'',
          detail:'',
          htmlClass:'',
          _id:''
        },
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      update(){
        this.$router.push({path:'/Xerath/techEdit',query:{id:this.$route.query.id}})
      }
    },
    mounted(){
      this.$http.post('/techs/detail',{id:this.$route.query.id}).then((res)=>{
        this.details= res.data[0];
      }).catch((req)=>{
        console.log(req)
      })
    }
  }
</script>
<style lang="scss" scoped>
  .techDetailsBox{
    padding-top: 20px;
    .techDetails{
      .title{
        text-align: center;
        margin-bottom: 30px;
      }
      .timer{
        text-align: right;
        color: #999;
        margin-bottom: 30px;
      }
      .content{
        background: #fff;
        border-radius: 4px;
        padding: 20px;
        margin-bottom: 50px;
      }
      .buttonfooter{
        text-align: center;
        margin-bottom: 50px;
      }
    }
  }
</style>
