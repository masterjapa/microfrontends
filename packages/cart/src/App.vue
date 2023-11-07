<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <shopping-cart :customer="customer" />
  </div>
</template>

<script>
import ShoppingCart from "./components/ShoppingCart";

export default {
  name: "AppContainer",
  components: {
    ShoppingCart,
  },
  props: {
    customer: String,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
