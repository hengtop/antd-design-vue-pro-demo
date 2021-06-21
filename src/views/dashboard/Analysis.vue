<template>
  <div class="">
    Analysis
    {{$t('message')['app.dashboard.analysis.timeLabel']}}:
     <a-date-picker />
    <chart :options="chartOptions" style="height: 400px" />
    <pre v-highlightjs="chartCode"><code class="html"></code></pre>
  </div>
</template>

<script type="text/ecmascript-6">
import chart from "@/components/Chart";
import { chartOptions } from "@/network/api/chart";
//配置演示代码
import chartCode from '!!raw-loader!../../components/Chart';
export default {
  name: "analysis",
  data() {
    return {
      chartOptions: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
      chartCode
    };
  },
  created() {},
  mounted() {
    this.getChartOption();
    //在修改了图表的值后手动传一个新对象过去触发chart组件中的watch
  },
  methods: {
    async getChartOption() {
      const res = await chartOptions(12345);
      this.chartOptions.series[0].data = res.data;
       this.chartOptions = { ...this.chartOptions };
    },
  },
  components: {
    chart,
  },
};
</script>

<style lang="less" scoped>
</style>
