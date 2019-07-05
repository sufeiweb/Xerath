<template>
  <div class="user_main layout_mv">
    <MvHeader :showBack="false" />
    <div class="user_main_content">
      <wv-panel class="content_item">
        <wv-cell class="content_item_box" title="个人中心" is-link to="/vue/user/info">
          <i class="el-icon-user-solid cell-icon i_code_class" slot="icon"></i>
        </wv-cell>
        <wv-cell class="content_item_box" title="历史任务" is-link to="/vue/user/historytask">
          <i class="el-icon-s-order cell-icon i_code_class" slot="icon"></i>
        </wv-cell>
      </wv-panel>
      <!-- <wv-panel  class="content_item">
        <wv-cell class="content_item_box" title="设置" is-link to="/vue/user/setting">
          <i class="el-icon-s-tools cell-icon i_code_class" slot="icon"></i>
        </wv-cell>
      </wv-panel>-->
    </div>
  </div>
</template>
<script>
import { getUrlParam } from "../utils/util";
import { apiVueTaskDetail, apiLogin } from "../fetch/VueApi";
import { mapGetters } from "vuex";
import MvHeader from "../components/Mv_header";
import { Toast } from "we-vue";
export default {
  components: {
    MvHeader
  }
};
</script>
<style lang="scss" scoped>
.user_main {
  .user_main_content {
    height: calc(100% - 40px);
    overflow-y: auto;
    box-sizing: border-box;
    font-size: 14px;
    color: #666;
    .content_item {
      margin-top: 22px;
    }
    .i_code_class {
      font-size: 20px;
      margin-right: 10px;
      color: #00d69e;
    }
  }
}
</style>

