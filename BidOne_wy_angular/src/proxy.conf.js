const PROXY_CONFIG = [
  {
    context: [
      "/simpleform",
    ],
    "/api/*"{
      target: "https://localhost:7189",
      secure: false,
      logLevel: "debug"
    }
  }
]

module.exports = PROXY_CONFIG;
