<template>
  <div class="techDetailsBox">
    <div class="techDetails">
      <section class="title">
        <h2>{{details.CPClass}}-/-{{details.CPName}}</h2>
      </section>
      <aside class="timer">
        <span>创建时间：{{details.createDate |dateYMDHIS}}</span>
      </aside>
      <section class="content">
        <span class="title">入参描述：</span>
        <div v-text="details.CPParameter"></div>
      </section>
      <section class="content">
        <span class="title">方法描述：</span>
        <div v-text="details.CPMethod"></div>
      </section>
      <section class="content">
        <span class="title">源代码：</span>
        <div v-html="details.SourceCode"></div>
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
          CPClass:'',
          CPName:'',
          createDate:'',
          CPParameter:'',
          CPMethod:'',
          SourceCode:'',
          _id:''
        },
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      update(){
        this.$router.push({path:'/Xerath/cpEdit',query:{id:this.$route.query.id}})
      }
    },
    mounted(){
      this.$http.post('/components/detail',{id:this.$route.query.id}).then((res)=>{
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
        .title{
          display: block;
          text-align: left;
          font-weight: bolder;
          margin-bottom: 10px;
        }
        >div{
          background: #f5f5f5;
          overflow: auto;
          border-radius: 4px;
        }
      }
      .buttonfooter{
        text-align: center;
        margin-bottom: 50px;
      }
    }
  }
</style>
