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
        <span>* 保存富文本编辑框中的内容</span>
      </aside>
      <aside class="buttonfooter">
        <button class="mybutton" @click="goBack">返回</button>
        <button v-if='buttonState' class="mybutton" @click="addComponent">提交</button>
        <button v-else class="mybutton" @click="updateComponent">提交</button>
      </aside>
    </div>
  </section>
</template>
<script>
  import UE from '../Ue/ue.vue';
  export default {
    data(){
      return {
        CPClass:'Vue',//组件类别
        CPName:'',//组件名称
        CPParameter:'',//组件入参
        CPMethod:'',//组件方法
        ue:'',
        buttonState:true,
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
      goBack(){
        this.$router.go(-1);
      },
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
      },
      updateComponent(){
        let item = {
          CPClass:this.CPClass,
          CPName:this.CPName,
          CPParameter:this.CPParameter,
          CPMethod:this.CPMethod,
          SourceCode:this.SourceCode,
          _id:this.$route.query.id
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
        this.$http.post('/components/update',item)
          .then((result)=>{
            //成功
            toast.message({
              text:'修改成功！'
            })
            this.$router.go(-1)
          }).catch(function (error) {
          //失败
          console.log(error)
        });
      }
    },
    mounted(){
      if(this.$route.query.id){
          this.$http.post('/components/detail',{id:this.$route.query.id}).then((res)=>{
            this.CPClass=res.data[0].CPClass,
            this.CPName=res.data[0].CPName,
            this.CPParameter=res.data[0].CPParameter,
            this.CPMethod=res.data[0].CPMethod,
            this.defaultMsg = res.data[0].SourceCode
            this.buttonState = false;
          }).catch((req)=>{
            console.log(req)
          })
        }else{
          this.buttonState = true;
        }
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
