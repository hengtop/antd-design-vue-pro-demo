<template>
  <div class="">
    <a-input-group compact>
      <a-select v-model="type" style="width: 130px" @change="handleTypeChange">
        <a-select-option value="alipay"> 支付宝 </a-select-option>
        <a-select-option value="bank"> 银行账户 </a-select-option>
      </a-select>
      <a-input
        style="width: calc(100% - 130px)"
        v-model="number"
        @change="handleNumberChange"
      />
    </a-input-group>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "receiverAccount",
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    const { type, number } = this.value || {};
    return {
      type: type || "alipay",
      number: number || "",
    };
  },
  watch:{
   value(val){
     Object.assign(this, val);
   }
  },
  created() {},
  mounted() {},
  methods: {
    handleTypeChange(val) {
      this.$emit("change", { ...this.value, type: val });
    },
    handleNumberChange(e) {
      this.$emit("change", { ...this.value, number: e.target.value });
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
</style>
