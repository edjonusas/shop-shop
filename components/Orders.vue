<template>
  <div class="container">
    <div class="tinv-header">
      <h2 class="">My orders</h2>
    </div>

    <div class="card">
      <Order
        :orderCard="item"
        v-for="(item, index) in userOrders"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import Order from "@/components/Order";
export default {
  name: "Orders.vue",
  components: {
    Order
  },
  props: {
    userOrders: Array
  }
};
</script>

<style scoped lang="scss">
@import "assets/sass/main.scss";

.container {
  padding: 0 15px;
  color: #666;
  font-family: $mainFont;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 26px;
  font-size: 14px;
  box-sizing: border-box;
}

h2 {
  margin: 15px 0;
  color: #222;
  font-size: 28px;
  line-height: 1.2em;
  font-weight: 600;
  font-family: $mainFont;
}
</style>
