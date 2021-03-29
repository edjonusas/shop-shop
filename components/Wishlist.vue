<template>
  <div class="container">
    <div v-if="products.length > 0">
      <div class="tinv-header">
        <h2 class="">Default wishlist</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th class="product-remove"></th>
            <th class="product-thumbnail"></th>
            <th class="product-name">
              <span class="tinvwl-full">Product Name</span>
              <span class="tinvwl-mobile">Product</span>
            </th>
            <th class="product-price">Unit Price</th>
            <th class="product-date">Date Added</th>
            <th class="product-stock">Stock Status</th>
            <th class="product-action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td class="product-remove">
              <button class="tinvwl-remove" @click="deleteProduct(product.id)">
                <fa icon="times" />
              </button>
            </td>
            <td class="product-thumbnail">
              <nuxt-link :to="'/product/' + product.slug">
                <img :src="product.image" alt="image" class="r-img" />
              </nuxt-link>
            </td>
            <td class="product-name">
              <nuxt-link :to="'/product/' + product.slug">{{
                product.title
              }}</nuxt-link>
            </td>

            <td class="product-price">
              <span v-if="product.discount" class="old-price"
                >{{ product.price }} &euro;</span
              >
              <span v-if="product.discount"> - </span>
              <span class="product-price"
                >{{
                  product.discount ? product.discountPrice : product.price
                }}&euro;</span
              >
            </td>
            <td class="product-date ">{{ product.data }}</td>
            <td class="product-stock">{{ product.stock }}</td>
            <td class="product-action">
              <button @click="addProduct(product.id)" class="button">
                <span class="tinvwl-txt">Add to Cart</span>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="100">
              <div class="flex">
                <div class="tinvwl-to-left"></div>
                <div class="tinvwl-to-right">
                  <!--                <button @click="deleteAllProds">Delete All from Wishlist</button>-->
                  <button @click="addAllProdsToCart">Add All to Cart</button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="social-buttons">
        <span>Share on</span>
        <ul>
          <li>
            <a class="social social-facebook" title="Facebook">
              <fa :icon="['fab', 'facebook']" />
            </a>
          </li>
          <li>
            <a class="social social-twitter" title="Twitter">
              <fa :icon="['fab', 'twitter']" />
            </a>
          </li>
          <li>
            <a class="social social-pinterest" title="Pinterest">
              <fa :icon="['fab', 'pinterest']" />
            </a>
          </li>
          <li>
            <a class="social social-whatsapp" title="WhatsApp">
              <fa :icon="['fab', 'whatsapp']" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="no_items">
      <span>Your Wishlist is currently empty.</span>
      <nuxt-link to="/">
        Return To Shop
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "wishlist",
  computed: {
    products() {
      return this.$store.getters.getWishlistItems;
    },
    cartItems() {
      return this.$store.getters.getCartItems;
    }
  },
  methods: {
    deleteProduct(id) {
      this.$store.commit("removeItemFromWishlist", id);
    },
    deleteAllProds() {
      this.$store.commit("removeAllFromWishlist");
    },
    addProduct(id) {
      this.$store.commit("addToCart", id);
      console.log(this.product);
    },
    addAllProdsToCart() {
      this.$store.commit("addAllItemsToCart");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/sass/main.scss";

@include repeating-style-cart-wishlist;

.tinv-header {
  margin-bottom: 30px;
}

.tinv-header > h2 {
  margin: 15px 0;
  color: #222;
  font-size: 28px;
  line-height: 1.2em;
  font-weight: 600;
  font-family: $mainFont;
}

thead th {
  font-weight: 700;
  border-width: 0 1px 1px 0;
}

table,
th,
td {
  border: 1px solid #eaeaea;
}

.tinvwl-remove {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  padding: 0;
  box-shadow: none;
  border: 0;
  background-color: #f7f7f7;
  color: #000;
}

.fa-times {
  font-size: 12px;
}

.old-price {
  color: #616161;
  text-decoration: line-through;
}

.product-action .button {
  width: 100%;
}

button {
  color: #666;
}

.tinvwl-to-right > button:last-child {
  margin-left: 10px;
}

.social-buttons {
  text-align: right;
}

.social-buttons > span {
  margin-right: 27px;
}

.social-buttons > span,
.social-buttons > ul {
  display: inline-block;
  vertical-align: middle;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.social-buttons li {
  float: left;
  margin-right: 5px;
  list-style: none;
}

.social-buttons li a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  color: #666;
  text-align: center;
  border: 0;
  font-size: 20px;
  text-decoration: none;
}

.social-buttons li a fa {
  line-height: 2em;
}

.no_items {
  padding: 60px;
  font-size: 18px;
  text-align: center;
}

.no_items a {
  display: block;
  font-size: 15px;
  font-weight: bold;
}

@media screen and (max-width: 991px) {
  @include resp-style-991px;
}

@media screen and (max-width: 776px) {
  @include resp-style-776px;

  thead th {
    display: block;
    width: 100%;
    text-align: center;
  }
}
</style>
