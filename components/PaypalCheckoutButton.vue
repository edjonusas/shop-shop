<template>
  <no-ssr>
    <paypal-checkout
      :env="paypalState"
      :amount="order.total"
      currency="EUR"
      :button-style="buttonStyle"
      :experience="experienceOptions"
      v-on:payment-authorized="paymentAuthorized"
      v-on:payment-completed="paymentCompleted"
      v-on:payment-cancelled="paymentCancelled"
      :client="paypalClient"
    >
    </paypal-checkout>
  </no-ssr>
</template>

<script>
export default {
  name: "paypal-checkout-button",
  props: ["order"],
  data: () => ({
    experienceOptions: {
      input_fields: {
        no_shipping: 1
      }
    },
    buttonStyle: {
      label: "checkout",
      size: "responsive",
      shape: "rect",
      color: "silver"
    }
  }),
  computed: {
    paypalClient() {
      return this.$store.getters.getPaypalClient;
    },
    paypalState() {
      return this.$store.getters.getPaypalState;
    }
  },
  methods: {
    paymentAuthorized() {
    },
    paymentCompleted(data) {
      let orderData = {
        paypal: data,
        user: this.order
      }
      return this.$store.dispatch('createOrder', orderData).then(res => {
        console.log("Pay pal res");
        console.log(res);
        if(res.success){
          this.$router.push('/profile')
        }
      })
    },
    paymentCancelled() {
      console.log('payment cenceled')
    }
  }
};
</script>

<style scoped></style>
