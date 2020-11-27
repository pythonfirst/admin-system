<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    chartOptions: {
      type: Object,
      defult: () => {}
    }
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    chartOptions(val) {
      this.Chart.setOption(val);
    }
  },
  methods: {
    resize() {
      console.log("resize");
      this.Chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.Chart = echarts.init(this.$refs.chartDom);
      addListener(this.$refs.chartDom, debounce(this.resize, 300));
      // 绘制图表
      this.Chart.setOption(this.chartOptions);
    }
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.Chart.dispose(); // 销毁图表实例，防止内存泄漏
    this.Chart = null;
  }
};
</script>

<style></style>
