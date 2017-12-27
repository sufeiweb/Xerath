<template>
  <section class="moduleBox">
    <div class="moduleContent">
      <aside>
        <div>框架类型：</div>
        <select class="myinput" v-model="CPClass">
          <option value="Vue">Vue</option>
          <option value="React">React</option>
        </select>
      </aside>
      <aside>
        <div>组件名称：</div>
        <input class="myinput" placeholder="组件名称" v-model="CPName"/>
      </aside>
      <aside>
        <div>入参描述：</div>
        <input class="myinput" placeholder="入参描述" v-model="CPParameter"/>
      </aside>
      <aside>
        <div>方法描述：</div>
        <input class="myinput" placeholder="方法描述" v-model="CPMethod"/>
      </aside>
      <aside>
        <div>源码：</div>
        <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
      </aside>
      <aside class="buttonfooter">
        <button class="mybutton" @click="getUEContent">保存</button>
        <button class="mybutton" @click="addComponent">提交</button>
      </aside>
    </div>
  </section>
</template>
<script>
  import UE from './ue.vue';
  export default {
    data(){
      return {
        CPClass:'Vue',//组件类别
        CPName:'',//组件名称
        CPParameter:'',//组件入参
        CPMethod:'',//组件方法
        ue:'',
        SourceCode: [],//源码
        xierudata: [],
        defaultMsg:'',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    components: {UE},
    methods:{
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        if(content){
          this.SourceCode = content;
          toast.message({
            text:'保存成功！'
          })
        }else{
          toast.message({
            text:'文本不能为空！'
          })
        }
      },
      addComponent(){
        let item = {
          CPClass:this.CPClass,
          CPName:this.CPName,
          CPParameter:this.CPParameter,
          CPMethod:this.CPMethod,
          SourceCode:this.SourceCode
        };
        if(
          !this.CPClass ||
          ! this.CPName ||
          ! this.CPMethod ||
          ! this.SourceCode.length ||
          !this.CPParameter
        ){
          toast.message({
            text:'输入框不能为空！'
          })
          return false;
        }
        this.$http.post('/components/add',item)
          .then((result)=>{
            //成功
            this.$router.go(-1)
          }).catch(function (error) {
          //失败
          console.log(error)
        });
      }
    },
    mounted(){

    },
  }
</script>
<style lang="scss" scoped>
  .moduleBox{
    .moduleContent{
      padding: 20px;
      box-sizing: border-box;
      border-radius: 4px;
      .buttonfooter{
        padding-top: 30px;
        text-align: center;
        margin-bottom: 50px;
      }
    }
  }
</style>
