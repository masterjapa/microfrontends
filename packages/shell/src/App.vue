<template>
  <div id="app">
    <HelloWorld msg="Este componente é do shell" />
    <CoreMainComponent :msg="title" />
    <div ref="react"></div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    CoreMainComponent: () => import("core/MainComponent"),
  },
  data() {
    return {
      title: "Vue microfrontend component renderizado via shell",
    };
  },
  methods: {
    async fetchReactLoader() {
      const reactLoader = await import("reactComponents/ReactLoader");

      this.createElement = reactLoader.default;
    },
    async fetchReactDomLoader() {
      const reactDom = await import("reactComponents/ReactDomLoader");

      const { render, unmountComponentAtNode } = reactDom.default;

      this.reactRender = render;
      this.unmountComponentAtNode = unmountComponentAtNode;
    },
    async fetchReactComponent() {
      const ReactComponent = await import("reactComponents/Button");

      this.reactComponent = ReactComponent.default;
    },
    updateReactComponent() {
      if (!this.reactRender) return;
      this.reactRender(
        this.createElement(this.reactComponent, {
          text: "Trocar o titulo",
          onClick: () => (this.title = "Mudei o titulo via componente react"),
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
        console.error("erro no mount", error);
        console.error("erro no mount", error);
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
</style>
