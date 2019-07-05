<template>
  <div class="mv_header">
    <i v-if="showBack" class="el-icon-back" @click.stop="goback"></i>
    <span>{{AppName}}</span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    showBack: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters(["AppName"])
  }
};
</script>
<style lang="scss" scoped>
.mv_header {
  height: 40px;
  background: #00d69e;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  color: #fff;
  flex-shrink: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > i {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>


