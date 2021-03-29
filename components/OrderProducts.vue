<template>
  <div class="d-flex">
    <div class="image_block">
      <img :src="orderProducts.image" alt="" />
    </div>
    <div class="product_info">
      <span>{{ orderProducts.title }}</span>
      <span>Amount: {{ orderProducts.amount }}</span>
      <span>Cost: {{ orderProducts.cost }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "OrderProducts",
  props: {
    orderProducts: Object
  }
};
</script>

<style lang="sass" scoped>
@import "assets/sass/main"

.image_block
  width: 20%
  height: 20%
  padding: 0 10px 10px 10px
  box-sizing: border-box


.image_block img
  width: 100%
  height: auto
  padding: 0 10px
  box-sizing: border-box

.product_info, .total
  width: 80%
  padding: 10px 10px
  box-sizing: border-box


.product_info span:first-child, .address span, .shipping span:first-child, .tracking span:first-child, .total > span
  display: block
  color: black
  font-weight: 700

@media screen and (max-width: 991px)
  .image_block
    display: none


  .product_info, .total
    padding: 5px 20px

@media screen and (max-width: 767px)
  .product_info
    width: 100%
</style>
