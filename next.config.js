module.exports = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Permissions-Policy",
            value: "microphone=(self *)",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"]
  },
};
