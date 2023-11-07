<template>
  <div id="app">
    <HelloWorld msg="This is a shell component" />

    <div class="container">
      <div class="container spaced" ref="react"></div>

      <div class="container spaced">
        <shopping-cart :customer="title" />
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { defineAsyncComponent } from "vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    ShoppingCart: defineAsyncComponent(() => import("Checkout/ShoppingCart")),
  },
  data() {
    return {
      title: "Checkout",
    };
  },
  methods: {
    async fetchReactLoader() {
      const reactLoader = await import("Shop/ReactLoader");

      this.createElement = reactLoader.default;
    },
    async fetchReactDomLoader() {
      const reactDom = await import("Shop/ReactDomLoader");

      const { render, unmountComponentAtNode } = reactDom.default;

      this.reactRender = render;
      this.unmountComponentAtNode = unmountComponentAtNode;
    },
    async fetchReactComponent() {
      const ReactComponent = await import("Shop/List");
      const CheckoutStore = await import("Checkout/store");

      const { addItem, removeItem } = CheckoutStore;

      this.reactComponent = ReactComponent.default;
      this.addItem = (item) => addItem(item);
      this.removeItem = (item) => removeItem(item);
    },
    updateReactComponent() {
      if (!this.reactRender) return;
      this.reactRender(
        this.createElement(this.reactComponent, {
          addItem: this.addItem,
          removeItem: this.removeItem,
        }),
        this.$refs.react
      );
    },
    unmountReactComponent() {
      this.unmountComponentAtNode(this.$refs.react);
    },
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        await this.fetchReactLoader();
        await this.fetchReactDomLoader();
        await this.fetchReactComponent();
      } catch (error) {
        console.error("Error loading the react app", error);
      }

      this.updateReactComponent();
    });
  },
  updated() {
    this.updateReactComponent();
  },
  beforeDestroy() {
    this.unmountReactComponent();
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
.container {
  display: flex;
  flex: 1;
}
.spaced {
  margin: 1rem;
}
</style>
