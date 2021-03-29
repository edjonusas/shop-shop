<template>
  <div class="d-flex mini-card">
    <nuxt-link :to="'/product/' + product.slug">
      <img :src="product.image" alt="image" />
    </nuxt-link>
    <div >
      <nuxt-link :to="'/product/' + product.slug">{{
          product.title
        }}</nuxt-link>
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
  name: "SidebarProductCard",
  props: {
    product: {
      required: true,
      type: Object,
    },
  },

}
</script>

<style lang="scss" scoped>
@import "assets/sass/main.scss";

.mini-card{
  min-height: 110px;
  position: relative;
  padding: 20px 0 20px 90px;
  border-bottom: 1px solid #eaeaec;
  color: #666;
  font-size: 14px;
}

a {
  text-decoration: none;
  color: #666;
  cursor: pointer;
  line-height: 1.3;
  margin-bottom: 5px;
}

span {
  line-height: 1.3;
  margin-bottom: 5px;
}

img {
  left: 0;
  position: absolute;
  top: 20px;
  width: 70px;
  height: 70px;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
  object-fit: cover;
}

.product-price{
  font-weight: bold;
}

.old-price {
  color: #616161;
  text-decoration: line-through;
}


</style>
