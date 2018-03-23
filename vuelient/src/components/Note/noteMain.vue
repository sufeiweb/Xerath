<template>
  <div class="noteMainBox">
    <div>
      <el-select v-model="selectValue" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button size="medium" type="primary" @click="searchselect">搜索</el-button>
    </div>
    <div class="noteMain">
      <div class="codeTrue" v-for="item in codeData">
        <i class="fa fa-trash codeTrueIcon" @click="DELItem(item._id)"></i>
        <aside class="cpClass"
               :class= "item.noteClass=='Vue'?'vue'
                        :item.noteClass=='React'?'react'
                        :item.noteClass=='Css'?'css'
                        :item.noteClass=='Javascript'?'javascript'
                        :item.noteClass=='Node'?'node'
                        :item.noteClass=='jQuery'?'jQuery'
                        :item.noteClass=='Html'?'html'
                        :item.noteClass=='Wexx'?'wexx'
                        :item.noteClass=='Weex'?'weex'
                        :item.noteClass=='Other'?'other'
                        :''"
        >{{item.noteClass}}</aside>
        <p>
          <span>名称：</span>
          <span>{{item.noteName}}</span>
        </p>
        <p>
          <span>创建时间：</span>
          <span>{{item.createDate | dateHIS}}</span>
        </p>
        <section class='buttonBox'>
          <button class="mybutton" @click="viewUpdate(item._id)">编辑</button>
          <button class="mybutton" @click="viewDetail(item._id)">详情</button>
        </section>
      </div>
      <div class="codeFalse" @click="addComponent">
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
          {CPClass:'vue',CPName:'分页',createDate:1514566696666,CPParameter:'pageSize,',CPMethod:'qqqqq',_id:'111111'}
        ],
        options:[
          {value:'Css', label:'Css'},
          {value:'Html', label:'Html'},
          {value:'Javascript', label:'Javascript'},
          {value:'jQuery', label:'jQuery'},
          {value:'Json', label:'Json'},
          {value:'Node', label:'Node'},
          {value:'Vue', label:'Vue'},
          {value:'React', label:'React'},
          {value:'Wexx', label:'Wexx'},
          {value:'Weex', label:'Weex'},
          {value:'Other', label:'Other'},
          ],
        pageInfo:{
          current:1,
          showItem:10,
          allpage:5
        },
        selectValue:''
      }
    },
    components:{
      pagebar
    },
    mounted(){
      this.getComponentList(1);
    },
    methods:{
      getComponentList(page){
        this.$http.post('/notes/noteList',{
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
      viewDetail(id){
        this.$router.push({path:'/Xerath/noteDetail',query:{id:id}})
      },
      viewUpdate(id){
        this.$router.push({path:'/Xerath/noteEdit',query:{id:id}})
      },
      addComponent(){
        //添加组件
        this.$router.push({path:'/Xerath/noteEdit'});
      },
      gopage(index){
        this.pageInfo.current=index;
        this.getComponentList(index)
      },
      DELItem(id){
        let _this = this;
        toast.confirm({
          title: '提示',  // title 是可选的
          text: '确定要删除么？',
          onConfirm: function() {
            // 点击“确定”后的回调函数
            _this.$http.post('/notes/delete',{id:id})
              .then((result)=>{
                //成功
                toast.message({
                  text:'删除成功！'
                })
                _this.$router.go(0);
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
      searchselect(){
        if(!this.selectValue){
          toast.message({
            type:'error',
            text:'请选择需要检索的类型！'
          })
        } else {
          this.$http.post('/notes/search',{
            noteClass:this.selectValue,
            page:1
          }).then((result)=>{
            //成功
            toast.message({
              type:'success',
              text:'检索成功！'
            });
            this.codeData = result.data.data;
            this.pageInfo.allpage = Math.ceil( result.data.total/20 );
          }).catch( (error)=> {
            //失败
            toast.message({
              type:'error',
              text:'检索失败！'
            });
            console.log(error)
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .noteMainBox{
    padding-top: 20px;
    .noteMain{
      display: flex;
      flex-wrap: wrap;
      padding-top: 20px;
      >div{
        width: 415px;
        height: 140px;
        margin-bottom: 20px;
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
          justify-content: center;
          button{
            width: 100px;
            height: 34px;
          }
        }
      }
      .codeTrue{
        padding: 20px;
        position: relative;
        .buttonBox{
          button{
            &:nth-of-type(1){
              margin-right:20px;
            }
          }
        }
        .codeTrueIcon{
          position: absolute;
          display: none;
          color: #01aaef;
          font-size: 20px;
          right: 25px;
          bottom:28px;
          cursor: pointer;
        }
        .cpClass{
          position: absolute;
          top:-10px;
          right: 0;
          border-radius:4px;
          background: #01aaef;
          color: #fff;
          padding: 2px 8px;
        }
        >p{
          margin-bottom: 10px;
          display: flex;
          >span:nth-of-type(1){
            width: 80px;
            text-align: right;
          }
          >span:nth-of-type(2){
            flex: 1;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
      .codeFalse{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        >i{
          color: #fff;
          font-size: 100px;
        }
      }
    }
  }
</style>
