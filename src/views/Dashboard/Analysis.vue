<template>
  <div>
    分析页
    <input v-auth="['admin']" type="number" autofocus />
    <Chart :chartOptions="options" style="height: 400px"></Chart>
  </div>
</template>

<script>
import Chart from "../../components/Chart";
import random from "lodash/random";
export default {
  components: { Chart },
  created() {
    this.changeOptions();
  },
  data() {
    return {
      options: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  methods: {
    changeOptions() {
      this.interval = setInterval(() => {
        this.options.series[0].data = this.options.series[0].data.map(() =>
          random(100)
        );
        this.options = { ...this.options };
      }, 2000);
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style></style>
