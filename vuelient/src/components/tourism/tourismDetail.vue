<template>
  <div class="tourismDetail">
    <section>
      <span>时间</span>
      <span>{{message.createDate | dateYMDHIS}}</span>
    </section>
    <section>
      <span>地点</span>
      <span>{{message.province}} {{message.cityName}} {{message.areaCode}}</span>
    </section>
    <section>
      <span>备注</span>
      <span>{{message.specialty}}</span>
    </section>
    <section>
      <span>详情</span>
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="message.detail">
      </el-input>
    </section>
    <div class="btnBox">
      <el-button type="primary" plain @click="goBack">返回</el-button>
      <el-button type="primary" @click="update">提交</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        message: '',
      }
    },
    //引用组件名
    components: {},
    //生命周期--组件挂载之前
    created() {
    },
    //生命周期--组件挂载之后
    mounted() {
      console.log(this.$route.query.id);
      this.$http.post('/citys/detail', {id: this.$route.query.id}).then(res => {
        console.log(res);
        this.message = res.data[0];
      }).catch(req => {
        console.log(req)
      })
    },
    //生命周期--组件被销毁之前
    beforeDestroy() {
    },
    //生命周期==组件销毁时
    destroyed() {
    },
    //组件方法集合
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      update(){
          console.log(this.message)
        this.$http.post('/citys/update', this.message)
          .then((result)=>{
            //成功
          }).catch(function (error) {
          //失败
          console.log(error)
        });
      }
    },
    //监听事件
    watch: {},
    //计算属性
    computed: {}
  }
</script>
<style lang="scss" scoped>
  .tourismDetail {
    padding-top: 20px;
    section{
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      span{
        &:nth-of-type(1){
          margin-bottom: 10px;
        }
        &:nth-of-type(2){
          background: #fff;
          padding: 10px 20px;
        }
      }
    }
    .btnBox{
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
      button{
        width: 20%;
      }
    }
  }
</style>
