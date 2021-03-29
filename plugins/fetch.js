const host = "http://localhost:3000";

// ROUTES IN API
{
  // register user
  // POST - /api/register
  // BODY - email, passwordOne, passwordTwo
  // ----------------
  // login
  // POST - /api/login
  // BODY - email, password
  // ----------------
  // recover password user
  // POST - /api/recover
  // BODY - email
  // ----------------
  // get 8 index products
  // GET - /api/getIndexProducts
  // ----------------
  // get product by slug as :id
  // GET - /api/product/:id
  // ----------------
  // get product by category and page
  // GET - /api/products/:category/:page
  // ----------------
  // create an order
  // POST - /api/createOrder
  // ----------------
  // get user posts
  // POST - /api/getUserOrders
  // BODY - token (from store user object)
}

const requests = {
  get: async (axios, url) => {
    return await axios.$get(url);
  },
  post: async (axios, url, data) => {
    return await axios.$post(url, data);
  }
};

export default ({ app }, inject) => {
  inject("getIndexProducts", async axios => {
    return await requests.get(axios, host + "/api/getIndexProducts");
  });
  inject("getFullProductInfo", async (axios, slug) => {
    return await requests.get(axios, host + "/api/product/" + slug);
  });

  // USER AUTH
  inject("authRegister", async (axios, data) => {
    return await requests.post(axios, host + "/api/register", data);
  });

  inject("authLogin", async (axios, data) => {
    return await requests.post(axios, host + "/api/login", data);
  });

  inject("authRecover", async (axios, data) => {
    return await requests.post(axios, host + "/api/recover", data);
  });

  inject("createOrder", async (axios, data) => {
    return await requests.post(axios, host + "/api/createOrder", data);
  });
  inject("getRecentPosts", async axios => {
    return await requests.get(axios, host + "/api/recentPosts");
  });

  inject("getUserOrders", async (axios, token) => {
    return await requests.post(axios, host + "/api/getUserOrders", token);
  });


};
