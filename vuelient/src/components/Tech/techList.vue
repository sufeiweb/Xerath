<template>
  <div class="technical">
    <div class="technicalBox">
      <div class="codeTrue" v-for="item in codeData">
        <i class="fa fa-trash codeTrueIcon" @click="DELItem(item._id)"></i>
        <p class="htmlClass"
           :class="item.htmlClass=='Css'?'css'
           :item.htmlClass=='Javascript'?'javascript'
           :item.htmlClass=='Node'?'node'
           :item.htmlClass=='jQuery'?'jQuery'
           :item.htmlClass=='Html'?'html':''"
        >{{item.htmlClass}}</p>
        <div class="content">
          <span>描述：</span>
          <span>{{item.describe}}</span>
        </div>
        <section>
          <span>时间：{{item.createDate | dateYMDHIS}}</span>
          <button class="mybutton" @click="viewDetail(item._id)">详情</button>
        </section>
      </div>
      <div class="codeFalse" @click="addTech">
        <i class="fa fa-plus-square-o" aria-hidden="true"></i>
      </div>
    </div>
    <pagebar  :current="pageInfo.current" :showItem="pageInfo.showItem" :allpage="pageInfo.allpage" @on-gopage="gopage"></pagebar>
  </div>
</template>
<script>
  import pagebar from '../pagebar.vue';
  export default {
    data(){
      return{
        codeData:[
          {describe:'',createDate:0,id:'',htmlClass:''}
        ],
        pageInfo:{
          current:1,
          showItem:10,
          allpage:5
        }
      }
    },
    components:{
      pagebar
    },
    methods:{
      getTechList(page){
        this.$http.post('/techs/TechList',{
          page:page
        }).then((result)=>{
          //成功
          this.codeData = result.data.data;
          this.pageInfo.allpage = Math.ceil( result.data.total/20 );
        }).catch( (error)=> {
          //失败
          console.log(error)
        });
      },
      addTech(){
        this.$router.push({path:'/Xerath/techEdit'});
      },
      DELItem(id){
        toast.confirm({
          title: '提示',  // title 是可选的
          text: '确定要删除么？',
          onConfirm: function() {
            // 点击“确定”后的回调函数
            this.$http.post('/techs/delete',{id:id})
              .then((result)=>{
                //成功
                toast.message({
                  text:'删除成功！'
                })
                this.gopage(this.pageInfo.current);
              }).catch(function (error) {
              //失败
              console.log(error)
            });
          },
          onCancel: function() {
            // 点击“取消”后的回调函数
            toast.message({
              text:'您取消删除了！'
            })
          }
        })
      },
      viewDetail(id){
        this.$router.push({path:'/Xerath/techDetail',query:{id:id}})
      },
      gopage(index){
        this.pageInfo.current=index;
        this.getTechList(index);
      }
    },
    mounted(){
      this.getTechList(1)
    }
  }
</script>
<style lang="scss" scoped>
  .technicalBox{
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    margin-bottom: 20px;
    >div{
      width: 300px;
      margin-bottom: 20px;
      height: 130px;
      border:2px solid #fff;
      margin-right: 20px;
      border-radius: 10px;
      background: #efefef;
      box-sizing: border-box;
      &:hover{
        box-shadow: 3px 3px 12px #ddd;
        .codeTrueIcon{
          display: block;
        }
      }
      > section{
        display: flex;
        justify-content: space-between;
        >span{
          color: #999;
        }
        button{
          width: 50px;
          height: 24px;
        }
      }
    }
    .codeTrue{
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 10px;
      .codeTrueIcon{
        display: none;
        position: absolute;
        color: #01aaef;
        font-size: 20px;
        left: 10px;
        top:50%;
        cursor: pointer;
      }
      >div{
        display: flex;
        flex-direction: column;
        >span{
          margin-bottom: 9px;
          &:nth-of-type(2){
            padding-left: 24px;
          display: -webkit-box;
            height: 40px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
            overflow: hidden;
        }
        }
      }
      .htmlClass{
        min-width: 20px;
        position: absolute;
        top:-10px;
        right: 0;
        color: #fff;
        border-radius: 4px;
        padding: 3px 8px;
      }
    }
    .codeFalse{
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      >i{
        color: #fff;
        font-size: 60px;
      }
    }
  }
</style>
