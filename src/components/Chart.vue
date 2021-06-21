<template>
  <!-- 封装一个chart组件,接收父组件传过来的options -->
  <div ref="chartDom"></div>
</template>

<script type="text/ecmascript-6">
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent  
} from "echarts/components";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);
import _debounce from "lodash/debounce";
/* 解决图标渲染位置尺寸问题,可能其他布局没有完全渲染出来导致图表先渲染出来造成溢出 */
import { addListener, removeListener } from "resize-detector";


export default {
  name: "chart",
  props: {
    options: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    //监听图表配置变化重新设置图表(如果只是修改配置对象中属性的那要深度监听才能生效)
    options: function (val) {
      this.chart.setOption(val);
    },
    /* 但是深度监听很消耗性能的所以我们可以在传props时 赋值一个新的对象 */
    /*  options:{
      handle(val){
        this.chart.setOption(val);
      },
      deep:true
    } */
  },
  created() {},
  mounted() {
    this.renderChart();
    //监听尺寸变化
    addListener(this.$refs.chartDom, _debounce(this.resize, 300));
  },
  methods: {
    /* resize 在尺寸变化时执行,我们为了避免多次触发可以设置防抖 */
    resize() {
      console.log("防抖测试resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.options);
    },
  },
  beforeDestroy() {
    //取消监听,销毁chart实例
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  components: {},
};
</script>

<style lang="less" scoped>
</style>
