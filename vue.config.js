module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      "@/api": {
        // 为什么不@会请求很多次这里还没搞懂webpack哪里有问题。
        target: "http://localhost:8080",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            console.log("path", req.path, Date.now());
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./src/mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./src/mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
