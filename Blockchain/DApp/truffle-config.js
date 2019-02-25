var DefaultBuilder = require("truffle-default-builder");
const HDWalletProvider = require("truffle-hdwallet-provider");
const memonic = "guitar lesson rapid card rubber absent push suspect giant mouse gasp upon"

module.exports = {
  build: new DefaultBuilder({
    "index.html": "index.html",
    "app.js": ["javascript/app.js"]
  }),
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    live: {
      provider: function () {
        return new HDWalletProvider(memonic, "https://rinkeby.infura.io/1ace17393e9246539e641b4493e7b7f2")
      },
      network_id: 4,
      gas: 6500000,
      gasPrice: 100000000000
    }
  }
};
