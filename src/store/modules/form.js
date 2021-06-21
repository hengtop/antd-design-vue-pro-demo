import router from '@/router';
import { stepForm } from "@/network/api/form";

const state = {
  step: {
    payAcount: "123456",
    receiverAccount: {
      type: "alipay",
      number: ""
    }
  }
}

const actions = {
  async submitStepForm({ commit }, { payload }) {
    await stepForm(payload);
    commit('saveStepFormData', payload);
    //跳转路由
    router.push("/form/step-form/result");
  }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}