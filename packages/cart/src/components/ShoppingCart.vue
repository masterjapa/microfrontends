<template>
  <div class="cart-container">
    <h1 v-if="customer">{{ customer }}</h1>

    <ul v-if="items" class="list">
      <li v-for="item in items" :key="item?.id" class="item">
        <b>{{ item?.name }}</b>
        <button class="remove" @click="this.removeItem(item?.id)">
          Remove
        </button>
      </li>
    </ul>
    <div v-if="!items.length">Add items to your cart.</div>
    <h4>{{ total }}</h4>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ShoppingCart",
  props: {
    customer: String,
  },
  computed: {
    ...mapGetters(["getItems", "getTotal"]),
    items() {
      return this.getItems;
    },
    total() {
      return `$${this.getTotal}`;
    },
  },
  methods: {
    ...mapActions(["removeItem"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h1 {
  text-align: left;
}
h4 {
  text-align: right;
  margin-top: auto;
}
.cart-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid rgba(22, 22, 222, 0.5);
  padding: 0.5rem 2rem;
  border-radius: 10px;
}
.list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.item {
  display: flex;
  width: 100%;
  padding: 3px 0;
}
.remove {
  margin-left: auto;
}
</style>
