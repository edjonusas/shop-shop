<template>
  <div>
    <div class="product-block">
      <div class="main-section container py-5">
        <div class="row justify-content-between" v-if="!!product">
          <!-- Product-photos block -->
          <div
            class="product-photo-block col-md-12 col-xl-7 col-lg-7 d-flex flex-md-row flex-column-reverse"
          >
            <!-- Product small photos -->
            <div class="d-flex flex-md-column flex-row">
              <div
                class="small-image mr-3"
                v-for="(image, index) in product.image"
                :key="image"
                @click="changeMainImage(index)"
                ref="thumb"
              >
                <img
                  :src="image"
                  :alt="product.title + ' ' + Number(index + 1)"
                />
              </div>
            </div>
            <!-- Product main photo -->
            <div
              class="main-image w-100"
              :style="'background-image: url(' + mainImage + ')'"
            >
              <div class="sale-block">
                <span v-if="product.discount" class="sale">Sale</span>
              </div>
            </div>
          </div>
          <!--Product Info block -->
          <div class="col-lg-5 col-md-12">
            <h5 class="mt-0 font-weight-bold">{{ product.title }}</h5>
            <div class="price-block d-flex mb-2">
              <span v-if="product.discountPrice" class="old-price mr-3">
                {{ "€ " + product.discountPrice }}
              </span>
              <span class="price">{{ "€ " + product.price }}</span>
            </div>
            <p class="description">{{ product.description }}</p>
            <div class="add-to-cart-section w-100">
              <div class="quantity">
                <span @click="decreaseQuantity">-</span>
                <input type="text" v-model="totalQuantity"/>
                <span @click="increaseQuantity">+</span>
              </div>

              <div class="add-to-cart-button">
                <button @click="addToCart(product._id)">
                  <fa :icon="['fas', 'shopping-basket']"/>
                  ADD TO CART
                </button>
              </div>
            </div>
            <div class="add-to-wishlist-section my-4">
              <a href="#" class="font-weight-lighter"

                 @click="addToWishlist(product._id)">
                <fa :icon="['fas', 'heart']":class="{ 'available': available}"/>
                Add to wishlist</a
              >
            </div>
            <div class="buy-now-section">
              <div class="buy-now mt-4 mb-5">
                <button @click="buyNow(product._id)">
                  <fa :icon="['fas', 'shopping-basket']"/>
                  BUY NOW
                </button>
              </div>
              <div class="credentials-section my-5">
                <div class="row py-2">
                  <div class="col-6 font-weight-bold">Categories:</div>
                  <div class="col-6">
                    <span
                      v-for="category in product.category"
                      :key="category"
                      class="category-span d-inline-block pr-2"
                    >{{ category }}</span
                    >
                  </div>
                </div>
                <div class="row py-2">
                  <div class="col-6 font-weight-bold">Tag:</div>
                  <div class="category-span col-6">{{ product.slug }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-tabs py-5">
        <!--  container end  -->
        <div class="row">
          <div class="col-sm">
            <div class="product-additional mt-5">
              <b-card no-body class="border-0 mx-auto bg-transparent">
                <b-tabs
                  no-nav-style
                  nav-class="align-center d-flex justify-content-center"
                  active-nav-item-class="additional-active"
                  content-class="m-5 border-0"
                >
                  <b-tab
                    title="Description"
                    active
                    :title-link-class="'tab-title font-weight-bold'"
                  >
                    <b-card-text>{{ product.description }}</b-card-text>
                  </b-tab>
                  <b-tab
                    title="Additional information"
                    :title-link-class="'tab-title font-weight-bold'"
                  >
                    <b-card-text>{{ product.info }}</b-card-text>
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductInfo",
  props: {
    product: Object
  },
  data() {
    return {
      mainImage: null,
      totalQuantity: 1,
      available: false,
    };
  },
  watch: {
    totalQuantity() {
      if (this.totalQuantity < 1) this.totalQuantity = 1;
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.getIsLoggedIn.loggedIn;
    }
  },
  methods: {
    changeMainImage(number) {
      this.mainImage = this.product.image[number];
      this.$refs.thumb.map(x => {
        x.classList.remove("small-image-active");
      });
      this.$refs.thumb[number].classList.add("small-image-active");
    },
    increaseQuantity() {
      this.totalQuantity++;
    },
    decreaseQuantity() {
      this.totalQuantity--;
    },
    addToCart(id) {
      for (let i = 0; i < this.totalQuantity; i++)
        this.$store.commit("addToCart", id);
    },
    buyNow(id) {
     if (this.loggedIn) {
        for (let i = 0; i < this.totalQuantity; i++)
          this.$store.commit("addToCart", id);

        this.$router.push("/checkout");
      } else {
        this.$router.push("/auth");
      }
    },
    addToWishlist(id) {
      this.on = !this.on
      if (this.on) {
        this.$store.commit("addToWishlist", id);
        let allItemsInWishlist = localStorage.getItem("wishlistCart") || [];
        allItemsInWishlist = JSON.parse(allItemsInWishlist)

        if (!allItemsInWishlist.some(x => x._id === id)) {
          allItemsInWishlist.push(this.product)
        }

        localStorage.setItem('wishlistCart', JSON.stringify(allItemsInWishlist))

        this.available = true
      } else {
        let allItemsInWishlist = localStorage.getItem("wishlistCart");
        allItemsInWishlist = JSON.parse(allItemsInWishlist)
        allItemsInWishlist = allItemsInWishlist.filter(x => x._id !== id);
        localStorage.setItem('wishlistCart', JSON.stringify(allItemsInWishlist))
        this.$store.commit('removeItemFromWishlist', id)
        this.available = false
      }
    },
  },
  beforeMount() {
    this.mainImage = this.product.image[0];
  }
};
</script>

<style lang="scss" scoped>
@import "assets/sass/main";



h5 {
  font-size: 18px;
}

.main-image {
  height: 569px;
  width: 569px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.product-block {
  padding: 50px 0;
  background: #f9f9f9;
}

.product-tabs {
  background: #fff;
}

.small-image {
  box-sizing: border-box;
  margin-bottom: 5px;
  width: 80px;
  height: 80px;
}

.small-image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.small-image-active {
  border: 1px solid gray;
}

.product-additional {
  text-align: center;
  border: 1px solid green;
}

.additional-simple {
  text-align: center;
}

.additional-active {
  border-bottom: 2px solid $mainColor;
  font-size: 17px;
  font-weight: bold;
  color: black;
}

a,
a:visited,
a:hover {
  color: #757575;
  font-weight: bold;
}

.available {
  color: #3e976c;
}

.customer-reviews {
  color: orange;
  font-size: 11px;
}

.price-block span {
  font-size: 24px;
}

.price {
  color: $mainColor;
}

.old-price {
  color: #9b9b9b;
  text-decoration: line-through;
}

.description {
  color: #666666;
}

.add-to-cart-section {
  display: flex;
  justify-content: space-between;
}

.quantity {
  border: 1px solid #e8e8e8;
  background: #fff;
  max-width: 160px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  font-size: 18px;
  max-width: 100px;
  min-width: 40px;
  text-align: center;
  border: none;
  padding: 0;
  outline: none;
}

.quantity span {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  font-size: 24px;
  vertical-align: middle;
  line-height: 0;
  padding: 10px 0 15px;
  font-weight: lighter;
  cursor: pointer;
}

button {
  height: 40px;
  background-color: $mainColor;
  border: none;
  padding: 5px 15px;
  width: 200px;
  color: white;
}

.add-to-cart-section {
  width: 85%;
  display: flex;
  align-items: center;
}

.category-span {
  color: #666666;
}

.buy-now button {
  width: 100%;
}

.sale-block {
  box-sizing: border-box;
  margin: 16px 20px;
}

.sale {
  font-weight: 700;
  font-size: 12px;
  padding: 0 10px;
  border-radius: 2px;
  color: #fff;
  background-color: #ff6831;
}

::v-deep .tab-title {
  font-size: 18px;
  margin: 20px;
  padding: 5px 0;
  color: #666666;
}

::v-deep .active {
  border-bottom: 2px solid $mainColor;
}

::v-deep .tab-pane {
  border: none;
}

::v-deep .product-additional {
  border: none;
}

@media (max-width: 576px) {
  .main-image {
    height: 400px;
  }
}
</style>
