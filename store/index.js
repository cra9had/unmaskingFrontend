import { createStore } from "vuex";
export const state = () => ({
  show: false,
  loading: true,
});

export const mutations = {
  setShow: (state) => {
    state.show = !state.show;
  },
};

export const actions = {};

const store = createStore({
  state,
  mutations,
  actions,
  getters: {
    getShow: (state) => state.show,
  },
});
export default store;
