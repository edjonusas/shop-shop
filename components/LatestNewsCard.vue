<template>
  <div class="cardBlog card">
    <nuxt-link class="nuxt-link" :to="'/post/' + newsCard.slug">
      <div
        class="img"
        :style="{ backgroundImage: `url(${newsCard.image})` }"
      ></div>
      <div class="card-body">
        <h4>{{ newsCard.title }}</h4>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: "LatestNews",
  props: {
    newsCard: Object
  }
};
</script>

<style lang="sass" scoped>
@import "assets/sass/main"
.card
  width: 33%
  text-align: center
  margin: 20px
.cardBlog
  max-height: 460px
  margin-bottom: 30px
  margin-top: 30px
  flex-grow: 1
p
  max-height: 70px
  color: #8c8c8c
  overflow: hidden
h4
    font-weight: 500


.read
    color: #737373
a
  color: #000

.nuxt-link:hover
  text-decoration: none
  color: $mainColor

.img
  display: flex
  height: 300px
  background-size: cover
  background-repeat: no-repeat
  background-position: 50% 50%
  margin-bottom: 30px

@media (max-width: 900px)
  .card
    width: 33%
    text-align: center
    margin: 10px


@media (max-width: 600px)
  .cardBlog
    width: 100%
    margin: 0
    margin-bottom: 10px
</style>
