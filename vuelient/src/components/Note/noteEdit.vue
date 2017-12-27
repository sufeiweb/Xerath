<template>
  <section class="moduleBox">
    <div class="moduleContent">
      <aside>
        <div>类型：</div>
        <select class="myinput" v-model="noteClass">
          <option  value="Css">Css</option>
          <option  value="Html">Html</option>
          <option  value="Json">Json</option>
          <option  value="jQuery">jQuery</option>
          <option  value="Javascript">Javascript</option>
          <option  value="Node">Node</option>
          <option  value="React">React</option>
          <option  value="Vue">Vue</option>
          <option  value="Wexx">Wexx</option>
          <option  value="Weex">Weex</option>
          <option  value="Other">Other</option>
        </select>
      </aside>
      <aside>
        <div>名称：</div>
        <input class="myinput" placeholder="名称" v-model="noteName"/>
      </aside>
      <aside>
        <div>详细：</div>
        <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
      </aside>
      <aside class="buttonfooter">
        <button class="mybutton" @click="getUEContent">保存</button>
        <button class="mybutton" @click="addTech">提交</button>
      </aside>
    </div>
  </section>
</template>
<script>
  import UE from '../Module/ue.vue';
  export default {
    data(){
      return {
        noteClass:'Css',
        noteName:'',
        ue:'',
        detail: [],
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
          this.detail = content;
          toast.message({
            text:'保存成功！'
          })
        }else{
          toast.message({
            text:'文本不能为空！'
          })
        }
      },
      addTech(){
        let item = {
          noteClass:this.noteClass,
          noteName:this.noteName,
          detail:this.detail
        };
        if(!this.noteClass || ! this.noteName || !this.detail.length){
          toast.message({
            text:'输入框不能为空！'
          })
          return false;
        }
        this.$http.post('/notes/add',item)
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
