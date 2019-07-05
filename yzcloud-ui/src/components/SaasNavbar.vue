<template>
  <div class="sassnavbar_main">
    <div class="sassnavbar_logo">LOGO</div>
    <el-row class="sassnavbar">
      <el-col>
        <el-menu
          :default-active="initPath"
          class="el-menu-vertical-demo sassnavbar"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-submenu :index="menu.key" v-for="(menu,index) in listArr" :key="`${index}-1`">
            <div slot="title">
              <i class="el-icon-menu"></i>
              <span>{{menu.title}}</span>
            </div>
            <el-menu-item
              :index="menuLink.path"
              :key="indexList"
              v-for="(menuLink,indexList) in menu.children"
            >
              <i class="el-icon-menu"></i>
              <span>{{menuLink.title}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-for="(menu,index) in listAlone" :key="`${index}-2`" :index="menu.path">
            <i class="el-icon-menu"></i>
            <span>{{menu.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      muneList: [
        {
          key: "1",
          title: "任务管理",
          children: [
            {
              key: "1-1",
              title: "任务列表",
              path: "/admin/task"
            },
            {
              key: "1-2",
              title: "申请审核",
              path: "/admin/apply/task"
            }
          ]
        },
        {
          key: "2",
          title: "历史雇员",
          path: "/admin/employee"
        },
        {
          key: "3",
          title: "薪金发放",
          path: "/admin/salary"
        },
        {
          key: "4",
          title: "企业设置",
          path: "/admin/company"
        }
      ],
      initPath: ""
    };
  },
  computed: {
    listArr: function() {
      return this.muneList.filter(item => item.children);
    },
    listAlone: function() {
      return this.muneList.filter(item => !item.children);
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  mounted() {
    if (
      this.$router.history &&
      this.$router.history.current &&
      this.$router.history.current.path
    ) {
      if (this.$router.history.current.path.indexOf("apply/task") > -1) {
        this.initPath = "/admin/apply/task";
        return;
      }
      this.initPath = this.$router.history.current.path;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path.indexOf("apply/task") > -1) {
        this.initPath = "/admin/apply/task";
        return;
      }
      this.initPath = to.path;
    }
  }
};
</script>
<style lang="scss" scoped>
.sassnavbar_main {
  width: 280px;
  height: 100%;
  background: rgb(84, 92, 100);
  .sassnavbar {
    width: 280px;
    height: calc(100% - 60px);
    overflow: auto;
  }
  .sassnavbar_logo {
    width: 100%;
    height: 60px;
    color: #fff;
    background: #01aaef;
    text-align: center;
    line-height: 60px;
    font-size: 40px;
    font-weight: bold;
  }
}
</style>

