<template>
  <div class="">
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAcount',
            {
              initialValue: step.payAcount,
              rules: [{ required: true, min: 6, message: '请输入付款账号' }],
            },
          ]"
          placeholder="请输入付款账号"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="收款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <ReceiverAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: step.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  },
                },
              ],
            },
          ]"
          placeholder="请输入收款账号"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script type="text/ecmascript-6">
import ReceiverAccount from "@/components/ReceiverAccount";
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
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          $store.commit({
            type: "form/saveStepFormData",
            payload: values,
          });
          $router.push("/form/step-form/confirm");
        }
      });
    },
  },
  components: {
    ReceiverAccount,
  },
};
</script>

<style lang="less" scoped>
</style>
