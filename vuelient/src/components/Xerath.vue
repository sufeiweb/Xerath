<template>
  <div class="backlogin">
    <div class="header">
      <div class="search_box" :class="{search_box_fouce:search_box_fouce}">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input @focus="focusFn" @blur="blurFn" type="text" name="" id="" value="" placeholder="搜索..."/>
      </div>
      <div class="handler">
        <div class="more"  @click="toggleSlide">
          <i class="fa fa-align-justify" aria-hidden="true"></i>
          <ul :class="{showul:showExit}">
            <li><a href="javascript:;" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i>退出</a></li>
            <!--<li><a href="javascript:;" @click="">修改密码</a></li>-->
            <!--<li><a href="javascript:;">意见反馈</a></li>-->
          </ul>
        </div>
        <img src="../assets/images/Xerath.jpg" alt="" />
      </div>
    </div>

    <!--侧面导航-->
    <div class="sidenav_box">
      <img class="logo" src="../assets/images/sufei.jpg" alt="" />
      <ul class="sidenav">
        <li class="now">
          <router-link to="/Xerath/home">
            <!--<i class="fa fa-home" aria-hidden="true"></i>-->
            <div>主页</div>
          </router-link>
        </li>
        <li>
          <router-link to="/Xerath/noteMain">
            <!--// <i class="fa fa-file-code-o" aria-hidden="true"></i>-->
            <div>随笔</div>
          </router-link>
        </li>
        <li>
          <router-link to="/Xerath/techList">
            <!--// <i class="fa fa-hdd-o" aria-hidden="true"></i>-->
            <div>技术</div>
          </router-link>
        </li>
        <li>
          <router-link to="/Xerath/cpList">
            <!--// <i class="fa fa-microchip" aria-hidden="true"></i>-->
            <div>组件</div>
          </router-link>
        </li>
        <li>
          <router-link to="/Xerath/pjList">
            <!--// <i class="fa fa-briefcase" aria-hidden="true"></i>-->
            <div>项目</div>
          </router-link>
        </li>
        <li>
          <router-link to="/Xerath/diaryList">
            <!--// <i class="fa fa-file-word-o" aria-hidden="true"></i>-->
            <div>日记</div>
          </router-link>
        </li>
        <li>
          <router-link to="/Xerath/tourism">
            <!--// <i class="fa fa-plane" aria-hidden="true"></i>-->
            <div>旅游</div>
          </router-link>
        </li>
        <li>
          <router-link to="/Xerath/reportMain">
            <!--// <i class="fa fa-files-o" aria-hidden="true"></i>-->
            <div>日志报告</div>
          </router-link>
        </li>
        <li>
          <router-link to="/Xerath/consigneeMain">
            <!--// <i class="fa fa-envelope" aria-hidden="true"></i>-->
            <div>邮箱</div>
          </router-link>
        </li>
        <li>
          <router-link to="/Xerath/admin">
            <!--// <i class="fa fa-user-o" aria-hidden="true"></i>-->
            <div>开发人员</div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="content">

      <ul class="breadcrumb">
        <li><a href="#/Xerath/">首页</a></li>
        <li>{{pageTitle}}</li>
      </ul>
      <router-view></router-view>

    </div>

  </div>
</template>

<script>
  var pageTitleObj = {
    home:"主页",
    admin:"开发人员",

    pjList:"项目",
    pjEdit:'编辑项目',
    pjDetail:'项目详情',
    tourism:"旅游",
    tourismDetail:"旅游详情",

    techList:"技术",
    techDetail:'技术详情',
    techEdit:'编辑技术',

    cpEdit:'编辑组件',
    cpList:"组件",
    cpDetail:'组件详情',

    noteMain:'随笔',
    noteEdit:'编辑随笔',
    noteDetail:'随笔详情',

    reportMain:'报告列表',

    diaryList:'日记',
    diaryEdit:'编辑日记',
    consigneeMain:'邮箱'
  };

  export default {
    name: 'backlogin',
    data () {
      return {
        search_box_fouce:false,
        showExit:false,
        pageTitle: pageTitleObj[ this.$route.path.substr( this.$route.path.lastIndexOf("/")+1 ) ] || "主页"
      }
    },
    methods:{
      focusFn(){  //搜索框获取焦点，添加class
        this.search_box_fouce = true;
      },
      blurFn(){   //搜索框失去焦点，去掉class
        this.search_box_fouce = false;
      },
      toggleSlide(){ //这个是用来显示和隐藏头像旁的退出下拉框
        this.showExit = !this.showExit
      },
      logout(){ //退出系统
          this.$http.post('/users/logout',{})
            .then((res)=>{
            console.log(res)
            this.$router.push({path:'/'});
          }).catch((req)=>{
            toast.message({
              title:'error',
              text:'请求失败'
            })
          })
      }
    },
    watch:{ //监控路径变化  当路径发送变化的时候，改变面包屑导航的显示
      $route: {
        handler: function (val, oldVal) {
          var path = val.path;
          this.pageTitle = pageTitleObj[ path.substr( path.lastIndexOf("/")+1 ) ] || "主页";
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul, li{
    list-style: none;
  }
  .header{
    height: 60px;
    box-shadow: 0 1px 5px rgba(13,62,73,0.2) ;
    background: #fff;
    margin-left: 80px;
    min-width: 740px;
  }

  .sidenav_box{
    width: 120px;
    box-shadow: 0 1px 5px rgba(13,62,73,0.2) ;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    z-index: 99;
    overflow-y:auto
  }
  .sidenav_box .logo{
    width: 46px;
    margin: 20px 0 0 17px;
  }
  .sidenav{
    margin-top: 30px;
  }
  .sidenav li{
    margin-bottom: 10px;
  }
  .sidenav a{
    color: #444;
    display: block;
    width: 56px;
    /*height: 56px;*/
    padding-left: 10px;
    position: relative;
    cursor: pointer;
    opacity: 0.6;
    transition:all 0.5s ease;
    text-decoration: none;
  }
  .sidenav a i{
    font-size: 20px;
    /*line-height: 56px;*/
    text-align: center;
    display: block;
    color: #444;
  }
  .sidenav a:hover{
    background: #f0f2f5;
    opacity: 1;
  }
  .sidenav a span{
    position: absolute;
    left: 55px;
    top: 22px;
    background: #000;
    color: #fff;
    width: 0px;
    padding: 5px 0;
    border-radius: 3px;
    font-size: 12px;
    opacity: 0;
    z-index: 99999;
  }
  .sidenav a:hover span{
    opacity: 1;
    left: 65px;
    width: 60px;
    padding: 5px 20px;
    transition:none 0.5s ease-out;
    transition-property: opacity,left;

  }
  .sidenav a span:after{
    content: "";
    position: absolute;
    top: 8px;
    left: -10px;
    border:5px solid transparent;
    border-right-color: #000;
  }
  .sidenav .router-link-active:after{
    content: "";
    position: absolute;
    left: -16px;
    top: 8px;
    height: 40px;
    width: 8px;
    border-radius: 3px;
    background: #566a80;
  }
  .sidenav .router-link-active{
    opacity: 1;
    background: #f0f2f5;
  }

  /*顶部栏*/
  .search_box{
    color: #979fa8;
    padding-top: 20px;
    float: left;
  }
  .search_box i{
    margin: 0 12px 0 70px;
    transition: all 0.5s ease;
  }
  .search_box input{
    border:none;
    outline: none;
  }
  .search_box_fouce i{
    margin-left: 55px;
    color: #2C3D50;
  }

  .handler > *{
    float: right;
    margin-right: 20px;
    cursor: pointer;
  }
  .handler .more{
    font-size: 20px;
    color: #566A80;
    margin: 15px 30px 0 0;
    position: relative;
  }
  .handler .more:hover{
    color: #2C3D50;
  }
  .handler .more ul{
    font-size: 14px;
    position: absolute;
    right: 0;
    top: 55px;
    width: 120px;
    box-shadow: 0 1px 5px rgba(13,62,73,0.2);
    transition: all 0.3s ease-out;
    height: 0;
    opacity: 0;
    overflow: hidden;
    text-align: center;
  }
  .handler .more .showul{
    height: auto;
    top: 45px;
    opacity: 1;
    border-top: 1px solid #979FA8;
    /*z-index: 999;*/
  }
  .handler .more a{
    display: block;
    padding: 8px 10px;
    background: #fff;
    color: #566A80;
    text-decoration: none;
  }
  .handler .more a:hover{
    background: #f8f9fb;
  }
  .handler > img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 5px;
    margin-right: 30px;
  }

  .content{
    margin: 20px 30px 0px 140px;
    min-height: 300px;
    min-width: 700px;
  }

  .breadcrumb{
    border-radius: 4px;
    padding: 10px 15px;
    background: #fff;
  }
  .breadcrumb > li{
    display: inline-block;
    color: #777777;
  }
  .breadcrumb > li+li:before{
    padding: 0 5px;
    color: #ccc;
    content: "/\00a0";
  }
  .breadcrumb > li > a{
    color: #32475f;
    text-decoration: none;
  }
  .main{
    border-radius: 4px;
    background: #fff;
    margin-top: 10px;
  }
</style>
