<template>
  <div>
    <div class="container">
      <div class="mt-5">
        <slider :photos="sliderPhotos" />
      </div>
      <div class="pt-5">
        <h2 class="text-center mt-5 mb-5">popular products</h2>
      </div>

      <product-cards :products="IndexProducts" />
      <div class="d-flex justify-content-center mt-5 mb-5 font-weight-bold">
        <nuxt-link to="/products" class="nuxtLink">
          <div class="allProdsButton">All Products</div>
        </nuxt-link>
      </div>

      <div>
        <Deals />
      </div>

      <testimonial :testimonials="testimonials" />
    </div>
    <latest-news :news="latestNews" />
    <div class="container">
      <CookiesAcceptance />
    </div>
  </div>
</template>
<script>
import Slider from "../components/Slider.vue";
import LatestNews from "~/components/LatestNews.vue";
import RelatedProducts from "../components/RelatedProducts.vue";
import Deals from "@/components/Deals";
import CookiesAcceptance from "../components/CookiesAcceptance";

export default {
  components: { Slider, CookiesAcceptance },
  data() {
    return {
      testimonials: [
        {
          id: "1",
          name: "Paul Wilson",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, voluptates omnis. Adipisci, sit reprehenderit eius sapiente reiciendis ducimus laborum ipsa quo tempore, dolorum consectetur natus possimus facere autem? Praesentium, quos.",
          image:
            "https://images.unsplash.com/photo-1555943394-ab611ba0bba1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80"
        },
        {
          id: "2",
          name: "Andrew Watson",
          text:
            "Bla bla bla dolor sit amet consectetur, adipisicing elit. Quaerat, voluptates omnis. Adipisci, sit reprehenderit eius sapiente reiciendis ducimus laborum ipsa quo tempore, dolorum consectetur natus possimus facere autem? Praesentium, quos.",
          image:
            "https://images.unsplash.com/photo-1555943394-ab611ba0bba1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80"
        }
      ],
    };
  },
  async fetch({ store }) {
    await store.dispatch("getIndexProducts");
    await store.dispatch("getRecentPosts");
  },
  computed: {
    sliderPhotos() {
      return this.$store.getters.getSliderPhotos;
    },
    IndexProducts() {
      return this.$store.getters.getProducts;
    },
    latestNews() {
      return this.$store.getters.getLatestNews;
    }
  }
};
</script>

<style scoped>
h2 {
  font-weight: 900;
  color: #3c3c3c;
}

.allProdsButton {
  border-radius: 30px;
  padding: 10px 25px;
  background-color: #bdefd7;
  cursor: pointer;
  font-size: 13px;
  color: #3c3c3c;
}

.nuxtLink {
  text-decoration: none !important;
}
</style>
