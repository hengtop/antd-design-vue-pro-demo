<template>
  <div class="">
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{ step.payAcount }}
      </a-form-item>
      <a-form-item
        label="密码"
        :labelCol="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: '',
              rules: [{ required: true, min: 6, message: '请输入密码' }],
            },
          ]"
          type="password"
          placeholder="请输入付款密码"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button type="primary" @click="onPrev">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleSubmit() {
      const { form, $store, step, $route } = this;
      form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          $store.dispatch({
            type: "form/submitStepForm",
            payload: {...step, ...values, query:$route.query},
          });
        }
      });
    },
    onPrev(){
      this.$router.back();
    }
  },
  components: {},
};
</script>

<style lang="less" scoped></style>
