const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(["/api","/api1", "/socket.io"],
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
