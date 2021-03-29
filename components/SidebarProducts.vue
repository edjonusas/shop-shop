<template>
  <div class="sidebar">
    <h6>Recent products</h6>
    <SidebarProductCard v-for="product in products.slice(0, 4)"  :key="product._id" :product="product"/>
  </div>
</template>

<script>
import SidebarProductCard from "~/components/SidebarProductCard";

export default {
  name: "SidebarProducts",
  props: {
    products: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/sass/main.scss";

h6{
  font-weight: 600 !important;
}


.sidebar {
  width: 100%;
}
</style>
