<template>
  <div class="container">
    <div v-if="cartItems.length > 0">
      <table class="main_table">
        <thead>
        <tr>
          <th class="product-remove"></th>
          <th class="product-thumbnail"></th>
          <th class="product-name">
            <span class="tinvwl-full">Product Name</span>
            <span class="tinvwl-mobile">Product</span>
          </th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartItems" :key="product.id">
            <td class="product-remove">
              <button class="tinvwl-remove" @click="remove(product.id)">
                <fa icon="times" />
              </button>
            </td>
            <td class="product-thumbnail">
              <nuxt-link :to="'/product/' + product.slug">
                <img :src="product.image" alt="image" class="r-img" />
              </nuxt-link>
            </td>
            <td class="product-name">
              <nuxt-link :to="'/product/' + product.slug">{{product.title }}</nuxt-link>
            </td>
            <td class="product-price">{{ product.price }}$</td>
            <td>
              <div class="product-quantity">
                <span @click="inc(product.id)">+</span>
                <input
                  v-if="
                    product.amount > 0
                      ? (product.amount = product.amount)
                      : (product.amount = 1)
                  "
                  class="quantity"
                  @change="onChange(product)"
                  v-model.number="product.amount"
                />
                <span @click="dec(product.id)">-</span>
              </div>
            </td>
            <td>{{ product.cost }} $</td>
          </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="100">
            <div class="flex">
              <div class="tinvwl-to-left"></div>
              <div class="tinvwl-to-right">
                <button @click="removeAll">
                  Clear Shopping Cart
                </button>
              </div>
            </div>
          </td>
        </tr>
        </tfoot>
      </table>
      <table class="table_checkout">
        <tr>
          <td class="w50">Shipping</td>
          <td class="w50">
            Free shipping
          </td>
        </tr>
        <tr>
          <td class="w50">Total Price</td>
          <td class="w50">{{ totalPrice }} $</td>
        </tr>
        <tfoot>

          <tr>
            <td colspan="100">
              <div class="flex">
                <div class="tinvwl-to-left"></div>
                <div class="tinvwl-to-right">
                  <button v-if="loggedIn">
                    <nuxt-link to="/checkout">CHECKOUT</nuxt-link>
                  </button>
                  <span class="text-danger" v-else
                    >You are not loggedIn!
                    <nuxt-link class="text-primary" to="/auth"
                    >Please visit this link to login or register new
                      user</nuxt-link
                    >
                  </span>
              </div>
            </div>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
    <div v-else class="no_items">
      <span>No items in cart</span>
      <nuxt-link to="/">
        Return To Shop
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    },
    loggedIn() {
      return this.$store.getters.getIsLoggedIn.loggedIn;
    }
  },
  methods: {
    onChange(product) {
      if (product.amount > 0) {
        this.$store.commit("changeAmount", product);
      }
    },
    remove(id) {
      this.$store.commit("removeItemFromCart", id);
    },
    removeAll() {
      this.$store.commit("removeAllFromCart");
    },
    inc(id) {
      this.$store.commit("addToCart", id);
    },
    dec(id) {
      this.$store.commit("decreaseItemFromCart", id);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "assets/sass/main.scss";
@include repeating-style-cart-wishlist;
.w50 {
  width: 50%;
}
thead th {
  background: #f3f3f3;
  border: none;
}

.main_table tbody td{
  border-bottom: 1px solid #F3F3F3;
}
.table_checkout tr:not(:last-child){
  border-bottom: 1px solid #F3F3F3;
}
.table_checkout tfoot{
  border:none;
}
.table_checkout tr:not(:last-child) td{

  text-align: left;
  border: 1px solid #f3f3f3;
}
th:not(:last-child),
td:not(:last-child) {
  text-align: left;
}
th:last-child,
td:last-child {
  text-align: right;
}
.tinvwl-remove {
  border: none;
  background-color: white;
  color: #666;
}
.tinvwl-to-right button {
  border: 1px solid #cac7c7;
  cursor: pointer;
  outline: none;
  color: #666;
}
.product-action .button {
  width: 100%;
}
.product-quantity {
  border: 1px solid #eaeaea;
  display: flex;
  padding: 5px;
  justify-content: space-around;
}
.product-quantity span {
  font-size: 20px;
  cursor: pointer;
}
.quantity {
  text-align: center;
  border: none;
  width: 100px;
  font-size: 20px;
  font-weight: normal;
}
button {
  color: rgb(0, 0, 0);
}
.tinvwl-to-right > button:last-child {
  margin-left: 10px;
}
.tinvwl-to-right .checkout{
  background-color: #3c3c3c;
  color: white;
}
.no_items {
  padding: 60px;
  font-size: 18px;
  text-align: center;
}

.no_items a{
  display: block;
  font-size: 15px;
  font-weight: bold;
}
@media screen and (max-width: 991px) {
  @include resp-style-991px;
}
@media screen and (max-width: 776px) {
  @include resp-style-776px;
  th:not(:last-child),
  td:not(:last-child) {
    text-align: center;
  }
  th:last-child,
  td:last-child {
    text-align: center;
  }

  .main_table tbody td {
    border-bottom: none;
  }
}
</style>
