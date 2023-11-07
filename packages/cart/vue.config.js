const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  publicPath: "http://localhost:9001/",
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "Cart",
        filename: "remoteEntry.js",
        exposes: {
          "./ShoppingCart": "./src/components/ShoppingCart.vue",
          "./addItem": "./src/stores",
          "./removeItem": "./src/stores",
          "./store": "./src/stores",
        },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 9001,
  },
};
