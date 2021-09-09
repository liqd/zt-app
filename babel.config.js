module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-env', '@babel/preset-react'],
    plugins: [
      ['@babel/plugin-proposal-private-methods', {'loose': false}],
      ['@babel/plugin-proposal-class-properties', {'loose': false}],
      ['@babel/plugin-proposal-private-property-in-object', {'loose': false}],
    ]
  };
};
