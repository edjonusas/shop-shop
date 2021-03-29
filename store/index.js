import categories from "../assets/categories.json"

export const strict = false;


export const state = () => ({
  paypalClient: { sandbox: process.env.PAYPAL_SANDBOX_ID },
  paypalState: "sandbox", // sandbox -- production
  user: {
    loggedIn: false,
    token: null
  },
  userOrders: [],
  products: [],
  productCategories: categories,
  singleProduct: null,
  cart: [],
  totalPages: null,
  wishlistCart: [],
  sliderPhotos: [
    {
      id: "1",
      smallText: "Small text one",
      bigText: "Big text one",
      url:
        "https://images.unsplash.com/photo-1597424876964-6dbd55d3f916?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: "2",
      smallText: "Small text two",
      bigText: "Big text two",
      url:
        "https://images.unsplash.com/photo-1597424877208-91cf1b750505?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: "3",
      smallText: "Small text tree",
      bigText: "Big text three",
      url:
        "https://images.unsplash.com/photo-1515947480858-520f69695a69?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
    }
  ],
  latestNews: []
});
export const getters = {
  getLatestNews: state => state.latestNews,
  getSliderPhotos: state => state.sliderPhotos,
  getProducts: state => state.products,
  getSingleProduct: state => state.singleProduct,
  getCartItems: state => state.cart,
  getIsLoggedIn: state => state.user,
  getTotalPrice: state => {
    let total = 0;
    state.cart.map(x => {
      total += x.cost;
    });
    return total;
  },
  getCartTotalAmount: state => {
    let totalAmount = 0;
    state.cart.map(x => {
      totalAmount += x.amount;
    });
    return totalAmount;
  },
  getWishlistTotalAmount: state => {
    return state.wishlistCart.length;
  },
  getPaypalClient: state => {
    return state.paypalClient;
  },
  getPaypalState: state => state.paypalState,
  getWishlistItems: state => state.wishlistCart,
  getUser: state => state.user,
  getUserOrders: state => state.userOrders,
  getCategories: state => state.productCategories
};

export const mutations = {
  setProducts(state, data) {
    state.products = data;
  },
  setSingleProduct(state, data) {
    state.singleProduct = data;
  },
  setRecentPosts(state, data) {
    state.latestNews = data;
  },
  addToCart(state, id) {
    const product = state.products.filter(x => x._id === id)[0];
    let nPrice;
    product.discount
      ? (nPrice = product.discountPrice)
      : (nPrice = product.price);
    const cartItem = {
      ...product,
      id: product._id,
      amount: 1,
      price: nPrice,
      cost: nPrice
    };
    if (state.cart.some(x => x.id === id)) {
      const index = state.cart.findIndex(x => x.id === id);
      state.cart[index].amount++;
      state.cart[index].cost += nPrice;
    } else {
      state.cart.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  decreaseItemFromCart(state, id) {
    const product = state.products.filter(x => x._id === id)[0];
    let nPrice;
    product.discount
      ? (nPrice = product.discountPrice)
      : (nPrice = product.price);

    const cartItem = state.cart.filter(x => x.id === id)[0];
    if (cartItem.amount > 1) {
      const index = state.cart.findIndex(x => x.id === id);
      state.cart[index].amount--;
      state.cart[index].cost -= nPrice;
    }
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  removeItemFromCart(state, id) {
    state.cart = state.cart.filter(x => x.id !== id);
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  removeAllFromCart(state) {
    state.cart = [];
    localStorage.removeItem("cart");
  },
  setUserLoggedIn(state, token) {
    state.user.loggedIn = true;
    state.user.token = token;
  },
  addToWishlist(state, id) {
    const item = state.products.filter(x => x._id === id)[0];
    let data = new Date().toLocaleString();
    const wishlistItem = {
      ...item,
      id: item._id,
      cost: item.price,
      data: data,
      stock: "In stock",
      amount: 1
    };

    if (!state.wishlistCart.some(x => x._id === id)) {
      state.wishlistCart.push(wishlistItem);
    }

    localStorage.setItem("wishlistCart", JSON.stringify(state.wishlistCart));
  },
  removeItemFromWishlist(state, id) {
    state.wishlistCart = state.wishlistCart.filter(x => x._id !== id);
    localStorage.setItem("wishlistCart", JSON.stringify(state.wishlistCart));
  },
  removeAllFromWishlist(state) {
    state.wishlistCart = [];
    localStorage.removeItem("wishlistCart");
  },
  addAllItemsToCart(state) {
    state.wishlistCart.forEach(item => {
      if (state.cart.some(x => x.id === item.id)) {
        const index = state.cart.findIndex(x => x.id === item.id);
        state.cart[index].amount++;
        state.cart[index].cost += item.price;
      } else {
        state.cart.push(item);
      }
    });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  changeAmount(state, data) {
    const product = state.products.filter(x => x._id === data.id)[0];
    let nPrice;
    product.discount
      ? (nPrice = product.discountPrice)
      : (nPrice = product.price);

    const index = state.cart.findIndex(x => x.id === data.id);
    state.cart[index].amount = data.amount;
    state.cart[index].cost = data.amount * nPrice;
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  setUserOrders(state, data){
    state.userOrders = data
  }
};
export const actions = {
  // USER AUTH
  async register({ commit }, data) {
    return this.$authRegister(this.$axios, data).then(res => {
      return res;
    });
  },
  async login({ commit }, data) {
    return this.$authLogin(this.$axios, data).then(res => {
      if (res.success) {
        commit("setUserLoggedIn", res.token);
      }
      console.log(res);
      return res;
    });
  },
  async recoverPassword({ commit }, data) {
    return this.$authRecover(this.$axios, data).then(res => {
      return res;
    });
  },
  // GET PRODUCTS
  async getIndexProducts({ commit }) {
    return this.$getIndexProducts(this.$axios).then(res => {
      commit("setProducts", res);
    });
  },
  async getFullProductInfo({ commit }, slug) {
    return this.$getFullProductInfo(this.$axios, slug).then(res => {
      commit("setSingleProduct", res);
    });
  },
  // ORDERS
  async createOrder({ commit, state }, data) {
    return this.$createOrder(this.$axios, {
      order: data,
      user: state.user
    }).then(res => {
      // console.log(res);
      // commit("setUserOrder", res);
      return res
    });
  },

  async getUserOrders({ commit, state }) {
    return this.$getUserOrders(this.$axios, {
      token: state.user.token
    }).then(res => {
      console.log(res);
      return commit('setUserOrders', res)
    });
  },

  // GET POSTS
  async getPosts({}, page) {
    return await this.$axios.$get(
      `http://localhost:3000/api/posts/?page=${page}`
    );
  },
  async singlePost({}, slug) {
    return await this.$axios.$get(`http://localhost:3000/api/post/s/${slug}`);
  },

  async getRecentPosts({ commit }) {
    return this.$getRecentPosts(this.$axios).then(res => {
      commit("setRecentPosts", res);
    });
  },
  //ADD COMMENT
  async addComment({}, data) {
    return await this.$axios.$post(
      "http://localhost:3000/api/comment/add",
      data
    );
  },
  //ADD VIEW
  async addView({}, { views, _id }) {
    return await this.$axios.$put(
      `http://localhost:3000/api/post/add/view/${_id}`,
      { views }
    );
  }
};
