<template>
  <section class="moduleBox">
    <div class="moduleContent">
      <aside>
        <div>类型：</div>
        <select class="myinput" v-model="htmlClass">
          <option  value="Css">Css</option>
          <option  value="Node">Node</option>
          <option  value="Javascript">Javascript</option>
          <option  value="jQuery">jQuery</option>
          <option  value="Html">Html</option>
        </select>
      </aside>
        <aside>
          <div>描述：</div>
          <input class="myinput" placeholder="描述" v-model="describe"/>
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
        <button v-if='buttonState' class="mybutton" @click="addTech">提交</button>
        <button v-else class="mybutton" @click="updateTech">提交</button>
      </aside>
    </div>
  </section>
</template>
<script>
  import UE from '../Ue/ue.vue';
  export default {
    data(){
      return {
        htmlClass:'Css',
        describe:'',
        ue:'',
        detail: [],
        xierudata: [],
        defaultMsg:'',
        buttonState:true,
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
      addTech(){
        let item = {
          htmlClass:this.htmlClass,
          describe:this.describe,
          detail:this.detail
        };
        if(!this.htmlClass || ! this.describe || !this.detail.length){
          toast.message({
            text:'输入框不能为空！'
          })
          return false;
        }
        this.$http.post('/techs/add',item)
          .then((result)=>{
            //成功
            this.$router.go(-1)
          }).catch(function (error) {
          //失败
          console.log(error)
        });
      },
      updateTech(){
        let item = {
            htmlClass:this.htmlClass,
            describe:this.describe,
            detail:this.detail,
            _id:this.$route.query.id
          };
          if(!this.htmlClass || ! this.describe || !this.detail.length){
            toast.message({
              text:'输入框不能为空！'
            })
            return false;
          }
          this.$http.post('/techs/update',item)
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
          this.$http.post('/techs/detail',{id:this.$route.query.id}).then((res)=>{
            this.htmlClass=res.data[0].htmlClass;
            this.describe = res.data[0].describe;
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
