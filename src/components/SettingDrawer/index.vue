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
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
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
