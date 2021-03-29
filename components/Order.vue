<template>
  <div class="card">
    <div class="top_header">
      <span>Order placed : 24, May 2020</span>
      <span>Order reference: XX-ULF2X-L7HVK</span>
    </div>
    <div class="status" @click="trigger">
      <span>Order status: Shipped</span>
      <span>
        <fa icon="chevron-down" v-if="showState" />
        <fa icon="chevron-right" v-if="arrow_down" />
      </span>
    </div>
    <div class="main_content" v-if="showState">
      <div class="content">
        <div class="all_cards">
          <order-products
            :orderProducts="item"
            v-for="(item, index) in orderCard.products[0]"
            :key="index"
          ></order-products>
          <div class="d-flex">
            <div class="image_block"></div>
            <div class="total">
              <span>Order total: EUR {{ orderCard.totalAmount }}</span>
            </div>
          </div>
        </div>

        <div class="shipping_info">
          <div class="address">
            <span>Delivery to:</span>
            <span
              >{{ orderCard.shippingInfo.firstName }}
              {{ orderCard.shippingInfo.secondName }}</span
            >
            <div class="shipping ">
              <span>Company name:</span>
              <span>{{ orderCard.shippingInfo.company }}</span>
            </div>

            <span>{{ orderCard.shippingInfo.country }}</span>
            <p>
              {{ orderCard.shippingInfo.address }}
              {{ orderCard.shippingInfo.city }},
              {{ orderCard.shippingInfo.country }},
              {{ orderCard.shippingInfo.zip }}
            </p>
            <p>{{ orderCard.shippingInfo.notes }}</p>
          </div>
          <div class="shipping">
            <span>Delivery via:</span>
            <p>Regular post</p>
          </div>
          <div class="tracking">
            <span>Tracking number:</span>
            <span>1234567890</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderProducts from "./OrderProducts.vue";
export default {
  components: { OrderProducts },
  name: "Order",
  props: {
    orderCard: Object
  },
  data() {
    return {
      showState: true,
      arrow_down: false
    };
  },

  methods: {
    trigger() {
      this.showState = !this.showState;
      this.arrow_down = !this.arrow_down;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "assets/sass/main"
.content
  display: flex

.top_header
  background-color: #F5F5F5
  border-color: #eaeaea
  padding: 5px 20px
  border-width: 0 1px 1px 0
  line-height: 24px
  box-sizing: border-box
  display: flex
  justify-content: space-between


.status
  padding: 5px 20px
  color: black
  font-weight: 700
  display: flex
  justify-content: space-between
  cursor: pointer

.status span:last-child
  cursor: pointer


.chevron-down
  font-family: $mainFont
  font-weight: 700
  color: black


.main_content
  padding: 10px 0
  display: flex
  flex-direction: row

.all_cards
  width: 80%


.image_block
  width: 20%
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


.address span:nth-child(2)
  color: dodgerblue


.shipping_info
  padding: 10px 10px
  box-sizing: border-box
  border-left: 1.8px solid #eaeaea


.total
  border-top: 1.8px solid #eaeaea





@media screen and (max-width: 767px)
  .top_header
    display: flex
    flex-direction: column


  .all_cards, .product_info
    width: 100%


  .main_content
    padding: 0


  .content
    display: flex
    flex-direction: column


  .shipping_info
    padding: 10px 20px
    background-color: #F5F5F5
</style>
