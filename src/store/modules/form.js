import router from "@/router";
import { stepForm } from "@/network/api/form";

const state = {
  step: {
    payAcount: "123456",
    receiverAccount: {
      type: "alipay",
      number: "",
    },
  },
};

const actions = {
  async submitStepForm({ commit }, { payload }) {
    await stepForm(payload);
    commit("saveStepFormData", payload);
    //跳转路由
    router.push({
      path: "/form/step-form/result",
      query: {
        ...payload.query,
      },
    });
  },
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload,
    };
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
