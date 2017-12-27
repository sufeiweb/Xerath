<template>
  <div class="main">
    <div class="input_box">
      <input v-model="City.province" class="myinput" type="text" placeholder="省名" />
      <input v-model="City.cityName" class="myinput" type="text" placeholder="市名" />
      <input v-model="City.areaCode" class="myinput" type="text" placeholder="景点" />
      <input v-model="City.specialty" class="myinput" type="text" placeholder="备注" />
      <button v-if="!editCityObj" class="btn" @click="addCity()"><i class="fa fa-plus" aria-hidden="true"></i>添加</button>
      <button v-if="editCityObj" class="btn" @click="saveEditCity()"><i class="fa fa-save" aria-hidden="true"></i>保存</button>
      <button style="opacity: 0.8;" v-if="editCityObj" class="btn" @click="cancelEditCity()"><i class="fa fa fa-times-circle-o" aria-hidden="true"></i>取消</button>
    </div>
    <grid
      :listData="listData"
      :theadData="theadData"
      :ifpage="true"
      :ifEdit="true"
      :ifDelete="true"
      :ifDetail="true"
      :pageInfo="pageInfo"
      @on-delete="deleteCity"
      @on-edit="editCity"
      @on-gopage="gopage"
      @on-detail="detailCity"
    ></grid>
  </div>
</template>
<script>
  import grid from './grid.vue'
  var theadData = [
    {
      title:"时间",
      keyname:"createDate"
    },
    {
      title:"省份",
      keyname:"province"
    },{
      title:"城市",
      keyname:"cityName"
    },{
      title:"景点",
      keyname:"areaCode"
    },{
      title:"备注",
      keyname:"specialty"
    }
  ];
  export default {
    name:'tourism',
    components:{grid},
    data(){
      return{
        listData:[],
        theadData:theadData,
        pageInfo:{},
        editCityObj:null,
        City:{
          province:'',
          cityName:'',
          areaCode:'',
          specialty:'',
        }
      }
    },
    mounted(){
      this.getCityList(1);
    },
    methods:{
      getCityList(page){
        this.$http.post('/citys/CityList',{
          page:page
        }).then((res)=>{
          console.log(res);
          if(res.status==200){
            this.listData=res.data.data;
            this.pageInfo.allpage = Math.ceil( res.data.total/10 );
          }else {
            toast.message({
              text:'请求失败，请稍后尝试'
            })
          }
        })
      },
      addCity(){
          if(!this.City.province ||
            !this.City.cityName ||
            !this.City.areaCode ||
            !this.City.specialty
          ){
            toast.message({
              text:'输入框不能为空！'
            })
            return false;
          }
          this.$http.post('/citys/add',this.City)
            .then((result)=>{
              //成功
              this.getCityList();
              this.emptyCity();
            })
      },
      emptyCity(){
        this.City.province = "";
        this.City.cityName = "";
        this.City.areaCode = "";
        this.City.specialty = "";
      },
      saveEditCity(){
        if(!this.City.province ||
          !this.City.cityName ||
          !this.City.areaCode ||
          !this.City.specialty
        ){
          toast.message({
            text:'输入框不能为空！'
          })
          return false;
        }
        this.$http.post('/citys/update', this.City)
          .then((result)=>{
            //成功
            this.gopage(this.pageInfo.current);
            this.editCityObj = null;
            this.emptyCity();
          }).catch(function (error) {
          //失败
          console.log(error)
        });
      },
      deleteCity(item){
        toast.confirm({
          title: '提示',  // title 是可选的
          text: '确定要删除么？',
          onConfirm: function() {
            // 点击“确定”后的回调函数
            this.$http.post('/citys/delete',item)
              .then((result)=>{
                //成功
                this.gopage(this.pageInfo.current);
                this.emptyCity();
                toast.message({
                  text:'删除成功！'
                })
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
      editCity(item){
        this.editCityObj = item;
        this.City = JSON.parse(JSON.stringify(item));
      },
      gopage(index){
        this.pageInfo.current = index;
        //查询数据
        this.getCityList(index)

      },
      cancelEditCity(){
        this.editCityObj = null;
        this.emptyCity();
      },
      detailCity(item){
        console.log(item)
      }
    }
  }
</script>
<style scoped>
  .main{
    border-radius: 4px;
    background: #fff;
    margin-top: 10px;
  }


  .input_box{
    padding: 0 10px;
  }
  .input_box .myinput{
    width: 24.5%;
  }
</style>
