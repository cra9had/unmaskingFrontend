import { createStore } from "vuex";

export const state = () => ({
  show: false,
  loading: true,
});

export const mutations = {
  setShow: (state) => {
    state.show = !state.show;
  },

  setLoad(state, payload) {
    state.loading = payload;
  },
};

export const actions = {};
const store = createStore({
  state,
  mutations,
  actions,
  getters: {
    getShow: (state) => state.show,

    getLoad(state) {
      return state.loading;
    },
  },
});
export default store;
