export default {
  head: {
    title: "ca_vue_ecommerce_front",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins&display=swap"
      }
    ]
  },
  css: [],
  plugins: [
    "~/plugins/fetch.js",
    "~/plugins/DateFilter.js",
    { src: "@/plugins/localStorage.js", ssr: false },
    { src: "~/plugins/paypal-checkout", ssr: false }
  ],
  components: true,
  buildModules: ["@nuxtjs/fontawesome"],
  fontawesome: {
    component: "fa",
    icons: {
      solid: true,
      brands: true
    }
  },
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios", "nuxt-session"],
  styleResources: {
    sass: ["assets/sass/main.scss"]
  },
  axios: {},
  build: {
    transpile: ["vue-paypal-checkout"]
  }
};
