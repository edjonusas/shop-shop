<template>
  <div class="product-card">
    <div
      class="image-container"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <transition-group name="photo-fade" tag="div" class="image-container">
        <img
          v-if="hover === false"
          key="1"
          :src="product.image[0]"
          :alt="product.title"
          @click="toProductPage"
        />
        <img
          v-if="hover === true"
          key="2"
          :src="product.image[1] ? product.image[1] : product.image[0]"
          :alt="product.title"
          @click="toProductPage"
        />
      </transition-group>
      <span v-if="product.discount" class="sale-block">Sale</span>
      <div class="icons-block" v-if="true">
        <div
          class="icon-bg"
          :class="{ 'icon-bg-wishlist': wishlist, ' available': available }"
          @click="addToWishlist(product._id)"
        >
          <fa
            class="icon"
            :class="{ 'icon-wishlist': wishlist }"
            icon="heart"
          />
        </div>
        <div
          class="icon-bg"
          v-if="true"
          :class="{ 'icon-bg-cart': cart, ' availableCart': availableCart }"
          @click="addToCart(product._id)"
        >
          <fa
            class="icon"
            :class="{ 'icon-cart': cart }"
            icon="shopping-basket"
          />
        </div>
      </div>
    </div>
    <div class="info-container">
      <span class="product-name" @click="toProductPage">
        {{ product.title }}
      </span>
      <div class="price-container">
        <span v-if="product.discount" class="old-price"
          >{{ product.price }} &euro;</span
        >
        <span v-if="product.discount"> - </span>
        <span class="product-price"
          >{{
            product.discount ? product.discountPrice : product.price
          }}
          &euro;</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      required: true,
      type: Object
    },
    wishlist: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      hover: true,
      available: false,
      availableCart: false
    };
  },
  methods: {
    toProductPage() {
      return this.$router.push("/product/" + this.product.slug);
    },
    addToWishlist(id) {
      this.on = !this.on;
      if (this.on) {
        this.$store.commit("addToWishlist", id);
        let allItemsInWishlist = localStorage.getItem("wishlistCart") || [];
        allItemsInWishlist = JSON.parse(allItemsInWishlist);
        if (!allItemsInWishlist.some(x => x._id === id)) {
          allItemsInWishlist.push(this.product);
        }
        localStorage.setItem(
          "wishlistCart",
          JSON.stringify(allItemsInWishlist)
        );
        this.available = true;
      } else {
        let allItemsInWishlist = localStorage.getItem("wishlistCart");
        allItemsInWishlist = JSON.parse(allItemsInWishlist);
        allItemsInWishlist = allItemsInWishlist.filter(x => x._id !== id);
        localStorage.setItem(
          "wishlistCart",
          JSON.stringify(allItemsInWishlist)
        );
        this.$store.commit("removeItemFromWishlist", id);
        this.available = false;
      }
    },
    addToCart(id) {
      this.on = !this.on;
      if (this.on) {
        this.$store.commit("addToCart", id);
        let allItemsInCart = localStorage.getItem("cart") || [];
        allItemsInCart = JSON.parse(allItemsInCart);

        if (!allItemsInCart.some(x => x._id === id)) {
          allItemsInCart.push(this.product);
        }

        localStorage.setItem("cart", JSON.stringify(allItemsInCart));

        this.availableCart = true;
      } else {
        let allItemsInCart = localStorage.getItem("cart");
        allItemsInCart = JSON.parse(allItemsInCart);
        allItemsInCart = allItemsInCart.filter(x => x._id !== id);
        localStorage.setItem("cart", JSON.stringify(allItemsInCart));
        this.$store.commit("removeItemFromCart", id);
        this.availableCart = false;
      }
    }
  },
  mounted() {
    let allItems = localStorage.getItem("wishlistCart");
    allItems = JSON.parse(allItems);
    if (!!allItems) {
      allItems.map(x => {
        if (x.id === this.product._id) {
          this.available = true;
          this.on = true;
        }
      });
    }
    let allCartItems = localStorage.getItem("cart");
    allCartItems = JSON.parse(allCartItems);
    if (!!allCartItems) {
      allCartItems.map(x => {
        if (x.id === this.product._id) {
          this.availableCart = true;
          this.on = true;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/sass/main.scss";

.product-card {
  margin: 10px 0;
  cursor: pointer;
  width: 260px;
  display: flex;
  flex-direction: column;
}

.product-card:hover .icons-block {
  opacity: 1;
  bottom: 10px;
}

.image-container {
  background-color: #616161;
  overflow: hidden;
  position: relative;
  height: 260px;

  span {
    font-weight: 700;
    font-size: 12px;
    padding: 0 10px;
    border-radius: 2px;
    color: #fff;
    position: absolute;
  }
}

.image-container img {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.sale-block {
  background-color: #ff6831;
  top: 15px;
  left: 15px;
}

.featured-block {
  background-color: $mainColor;
  top: 15px;
  right: 15px;
}

.sold-out-block {
  background-color: #999999;
  top: 15px;
  right: 15px;
}

.icons-block {
  transition: 0.1s ease-in;
  opacity: 0;
  position: absolute;
  display: flex;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);

  .icon-bg {
    transition: 0.1s ease-in;
    margin: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    background-color: #0f0f0fb7;
  }

  .icon-bg-wishlist {
    background-color: #0f0f0fb7;
  }

  .icon-bg-cart {
    background-color: #0f0f0fb7;
  }

  .available {
    background-color: #3e976c;
  }

  .availableCart {
    background-color: #3e976c;
  }

  .icon-bg:hover {
    cursor: pointer;
    background-color: $mainColor;
  }

  .icon {
    color: #ffffffdc;
    box-sizing: initial;
    font-size: 14px;
    padding: 5px;
  }

  .icon-wishlist {
    color: #ffffffdc;
  }

  .icon-cart {
    color: #ffffffdc;
  }
}

.info-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .product-name {
    margin-top: 10px;
    transition: 0.5s;
    font-weight: 600;
    color: #616161;
  }

  .product-name:hover {
    color: $mainColor;
  }

  .old-price {
    color: #616161;
    font-weight: 700;
    text-decoration: line-through;
  }

  .product-price {
    font-weight: 700;
  }
}

@media only screen and (max-width: 1200px) {
  .product-card {
    width: 453px;
  }
  .image-container {
    height: 453px;
  }
}

@media only screen and (max-width: 992px) {
  .product-card {
    width: 333px;
  }
  .image-container {
    height: 333px;
  }
}

@media only screen and (max-width: 767px) {
  .product-card {
    width: 243px;
  }
  .image-container {
    height: 243px;
  }
}

@media only screen and (max-width: 575px) {
  .product-card {
    width: 47.5%;
  }
  .image-container {
    height: 220px;
  }
}

@media only screen and (max-width: 412px) {
  .image-container {
    height: 150px;
  }
}

@media only screen and (max-width: 298px) {
  .product-card {
    width: 100%;
  }
  .image-container {
    height: 230px;
  }
}

//photo animation
.photo-fade-enter-active {
  transition: all 0.5s ease;
}

.photo-fade-leave-active {
  transition: all 1s ease;
}

.photo-fade-enter,
.photo-fade-leave-to {
  opacity: 0;
}
</style>
