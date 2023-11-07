// store.js
import { createStore } from "vuex";

const actions = {
  addItem(context, value) {
    context.commit("addItem", value);
  },
  removeItem(context, value) {
    context.commit("removeItem", value);
  },
};

const store = createStore({
  state: {
    items: [],
  },
  mutations: {
    addItem(state, item) {
      state.items = [
        ...state.items.filter((current) => current.id !== item.id),
        item,
      ];
    },
    removeItem(state, id) {
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
  actions,
  getters: {
    getItems: (state) => state.items,
    getTotal: (state) =>
      state.items.map((item) => item.price).reduce((acc, cur) => acc + cur, 0),
  },
});

const addItem = (item) => store.dispatch(`addItem`, item);
const removeItem = (item) => store.dispatch(`removeItem`, item?.id);

export { addItem, removeItem, store };
