<template>
  <div>
    分析页
    <input v-auth="['admin']" type="number" autofocus />
    <Chart :chartOptions="options" style="height: 400px"></Chart>
  </div>
</template>

<script>
import Chart from "../../components/Chart";
import { request } from "../../utils/request";
export default {
  components: { Chart },
  created() {
    this.changeOptions();
    this.getChartData();
  },
  data() {
    return {
      options: {}
    };
  },
  methods: {
    changeOptions() {
      this.interval = setInterval(() => {
        this.getChartData();
      }, 300000);
    },
    getChartData() {
      request({
        methods: "get",
        url: "/api/dashboard/chart",
        params: { ID: 12345 }
      })
        .then(response => {
          this.options = {
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
                data: response.data
              }
            ]
          };
        })
        .catch(err => console.log("err", err));
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style></style>
