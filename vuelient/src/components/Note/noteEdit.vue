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
        <span>* 保存富文本编辑框中的内容</span>
      </aside>
      <aside class="buttonfooter">
        <button class="mybutton" @click="goBack">返回</button>
        <button v-if='buttonState' class="mybutton" @click="addNote">提交</button>
        <button v-else class="mybutton" @click="updateNote">提交</button>
      </aside>
    </div>
  </section>
</template>
<script>
  import UE from '../Ue/ue.vue';
  export default {
    data(){
      return {
        noteClass:'Css',
        noteName:'',
        ue:'',
        detail: [],
        xierudata: [],
        defaultMsg:'',
        buttonState:true,//编辑或者提交，在编辑中是update(false)，在新建中是add(true)
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
      addNote(){
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
      },
      updateNote(){
          let item = {
            noteClass:this.noteClass,
            noteName:this.noteName,
            detail:this.detail,
            _id:this.$route.query.id
          };
          if(!this.noteClass || ! this.noteName || !this.detail.length){
            toast.message({
              text:'输入框不能为空！'
            })
            return false;
          }
          this.$http.post('/notes/update',item)
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
          this.$http.post('/notes/detail',{id:this.$route.query.id}).then((res)=>{
            this.noteClass=res.data[0].noteClass;
            this.noteName = res.data[0].noteName;
            this.defaultMsg = res.data[0].detail
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
        >button{
          margin-right:10px;
        }
        >span{
          color:#aaa;
        }
      }
    }
  }
</style>
