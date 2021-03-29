<template>
  <div class="block">
    <div class="spacer"></div>
    <div class="d-flex">
      <h2>Latest News</h2>
    </div>

    <div class="container">
      <div class="d-flex ">
        <latest-news-card
          :newsCard="item"
          v-for="(item, index) in news"
          :key="index"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <nuxt-link to="/posts" class="nuxtLink">
        <div class="postsButton">All posts</div>
      </nuxt-link>
    </div>
    <div class="spacer"></div>
  </div>
</template>
<script>
import LatestNewsCard from "./LatestNewsCard.vue";

export default {
  name: "LatestNews",
  props: {
    news: Array
  },
  components: {
    LatestNewsCard
  }
};
</script>
<style lang="sass" scoped>
@import "assets/sass/main"

.postsButton
  border-radius: 30px
  padding: 10px 25px
  background-color: #bdefd7
  cursor: pointer
  font-size: 13px
  color: #3c3c3c
  font-weight: 700
  text-align: center
  align-items: center
  width: 125px
  margin: 0 auto
.d-flex
  display: flex

  justify-content: center

  padding-left: 15px
  padding-right: 15px
a
  text-decoration: none
h2
  font-weight: 550
  color: #4d4d4d

.block
  background-color: #f2f2f2
  font-family: $mainFont
.spacer
  height: 70px

.nuxtLink
  text-decoration: none !important


@media (max-width: 600px)
  .d-flex
    display: flex
    box-sizing: border-box
    flex-direction: column
    justify-content: center
    padding-left: 15px
    padding-right: 15px

  .postsButton
    width: 125px
    margin: 0 auto
</style>
