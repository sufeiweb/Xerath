<template>
  <div class="pjBox">
    <div class="pjAdd">
      <el-button type="primary" @click="goToEdit">添加</el-button>
    </div>
    <div class="pjList">
      <div class='listItem' v-for="item in codeData">
        <section class='itemTime'>
          <span>项目时间</span>
          <span>{{formatTime(item.editTime)}}</span>
        </section>
        <section class="itemTitle">
          <span>项目名称</span>
          <span>{{item.editTitle}}</span>
        </section>
        <section class="itemDescription">
          <span>项目描述</span>
          <span>{{item.editDescription}}</span>
        </section>
        <section class="itemTech">
          <span>项目技术栈</span>
          <span>{{formatArr(item.editTech)}}</span>
        </section>
        <div class="btnBox">
          <el-button type="primary" plain @click="goToDetail(item._id)">详情</el-button>
          <el-button type="primary" @click="goToEdits(item._id)">编辑</el-button>
        </div>
      </div>
    </div>
    <pagebar :current="pageInfo.current" :showItem="pageInfo.showItem" :allpage="pageInfo.allpage"
             @on-gopage="gopage"></pagebar>
  </div>

</template>
<script>
  import pagebar from '../pagebar.vue';

  export default {
    data() {
      return {
        codeData: '',//数据展示
        pageInfo: {
          current: 1,
          showItem: 10,
          allpage: 5
        }
      }
    },
    components: {
      pagebar
    },
    mounted() {
      this.getPjList(1);
    },
    methods: {
//  /Xerath/logistics
      gopage(index) {
        this.pageInfo.current = index;
        this.getPjList(index);
      },
      goToEdit() {
        this.$router.push({path: '/Xerath/pjEdit'})
      },
      goToEdits(id) {
        this.$router.push({path: '/Xerath/pjEdit?id=' + id})
      },
      goToDetail(id) {
        this.$router.push({path: '/Xerath/pjDetail?id='+id})
      },
      getPjList(page) {
        this.$http.post('/projects/pjList', {
          page: page
        }).then((result) => {
          //成功
          console.log(result.data.data);
          this.codeData = result.data.data;
          this.pageInfo.allpage = Math.ceil(result.data.total / 10);
        }).catch((error) => {
          //失败
          console.log(error)
        });
      },
      formatTime(arr) {
        if(arr){
          let time1 = new Date(arr[0]).toLocaleDateString();
          let time2 = new Date(arr[1]).toLocaleDateString();
          return time1 + ' ~ ' + time2
        }
      },
      formatArr(arr){
        if(arr){
          return arr.join(',')
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .pjBox {
    padding-top: 20px;
  }

  .pjList {
    display: flex;
    padding-top: 20px;
    align-items: center;
    flex-wrap: wrap;
    .listItem {
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      box-sizing: border-box;
      border: 3px solid #01aaef;
      cursor: pointer;
      width: 25%;
      margin-right: 10px;
      margin-bottom: 10px;
      height: 300px;
      overflow: auto;
      &:hover {
        box-shadow: 4px 12px 4px #999;
      }
      section {
        display: flex;
        margin-bottom: 8px;
        span {
          &:nth-of-type(1) {
            width: 80px;
            text-align: right;
            margin-right: 15px;
          }
          &:nth-of-type(2) {
            flex: 1;
          }
        }
      }
      .btnBox {
        display: flex;
        justify-content: center;
        button {
          padding: 0;
          margin: 0;
          width: 60px;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          font-weight: normal;
          margin-right: 10px;
        }
      }
    }
  }
</style>
