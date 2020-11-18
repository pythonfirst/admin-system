<template>
  <div>
    <!-- <a-button type="primary" @click="showDrawer">
      Open
    </a-button> -->

    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      width="300"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'" />
        </div>
      </template>
      <div>
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          @change="e => handleSettingChange('navTheme', e)"
        >
          <h2>切换风格</h2>
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          @change="e => handleSettingChange('navLayout', e)"
        >
          <h2>导航模式</h2>
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    onClose() {
      this.visible = false;
    },
    handleSettingChange(key, e) {
      this.$router.push({
        query: { ...this.$route.query, [key]: e.target.value }
      });
      this.$emit("handleSettingChange", { key: e.target.value });
    }
  }
};
</script>
<style scoped>
.handle {
  position: absolute;
  top: 248px;
  right: 300px;
  width: 48px;
  height: 48px;
  text-align-last: center;
  line-height: 48px;
  font-size: 28px;
  color: #fff;
  height: 48px;
  background-color: #1890ff;
  border-radius: 3px 00 3px;
}
</style>
