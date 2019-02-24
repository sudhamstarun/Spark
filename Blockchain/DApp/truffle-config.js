var DefaultBuilder = require("truffle-default-builder");

module.exports = {
  build: new DefaultBuilder({
    "index.html": "index.html",
    "app.js": ["javascript/app.js"]
  }),
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },

    live: {
      host: "<host_ip_address>",
      port: 80,
      network_id: 1
    },

    develop: {
      accounts: 5,
      defaultEtherBalance: 500,
      blockTime: 3
    }
  }
};
