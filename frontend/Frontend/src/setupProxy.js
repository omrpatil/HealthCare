const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/doctors",
    createProxyMiddleware({
      target: "http://localhost:8083",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/appointments",
    createProxyMiddleware({
      target: "http://localhost:8082",
      changeOrigin: true,
    })
  );
};
