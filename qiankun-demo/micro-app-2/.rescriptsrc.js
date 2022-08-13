const name = "micro-app-2";

module.exports = {
  webpack: (config) => {
    
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    // config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';
    // config.output.publicPath = 'http://localhost:9003/';

    return config;
  },

  devServer: (_) => {
    const config = _;

    console.log(config);
    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    // config.watchContentBase = false;
    config.static = false;
    config.liveReload = true;
    config.open = false;

    return config;
  },
};
