<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="left-pic">
        <img :src="photos[0].image" alt="deal-pic" />
        <div class="deal-txt">
          <div>Special Deal</div>
          <div class="big-txt">{{ photos[0].title }}</div>
        </div>
      </div>
      <div class="right-pic">
        <img :src="photos[1].image" alt="deal-pic" />
        <div class="deal-txt">
          <div>Special Deal</div>
          <div class="big-txt">{{ photos[1].title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Deals",
  data() {
    return {
      view: {
        onTheScreen: false
      }
    };
  },
  computed: {
    photos() {
      return this.$store.getters.getProducts;
    }
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const element1 = document.querySelector(".left-pic");
      const element2 = document.querySelector(".right-pic");
      const position1 = element1.getBoundingClientRect();
      const position2 = element2.getBoundingClientRect();
      if (
        position1.top >= 0 &&
        position2.top >= 0 &&
        position1.bottom <= window.innerHeight &&
        position2.bottom <= window.innerHeight
      ) {
        this.view.onTheScreen = true;
        element1.classList.add("scrolled");
        element2.classList.add("scrolled");
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/sass/main"

*
  font-family: $mainFont
  margin: 0 auto

.left-pic, .right-pic
  width: 100%
  height: 400px

.left-pic img, .right-pic img
  width: 100%
  height: 100%
  object-fit: cover

.left-pic, .right-pic
  position: relative
  overflow: hidden
  margin: 0 auto

.left-pic
   left: -600px
   opacity: 0

.right-pic
   right: -600px
   opacity: 0

.left-pic.scrolled
  transform: translateX(600px)
  opacity: 1
  transition: all 1.5s ease

.right-pic.scrolled
  transform: translateX(-600px)
  opacity: 1
  transition: all 1.5s ease

.deal-txt
  position: absolute
  top: 40%
  left: 20%
  color: #fff
  text-align: center

.big-txt
  font-size: 38px

// zoom
.left-pic img:hover, .right-pic img:hover
  transform: scale(1.5)
  transition: transform .5s ease

@media only screen and (max-width: 800px)
  .left-pic, .right-pic
    width: 400px
    height: 400px

  .left-pic img, .right-pic img
    width: 100%
    height: 100%

  .deal-txt
    position: absolute
    top: 40%
    left: 17%
    color: #fff
    text-align: center

  .big-txt
    font-size: 28px


@media only screen and (max-width: 700px)
  .left-pic, .right-pic
    width: 400px
    height: 400px

  .left-pic img, .right-pic img
    width: 100%
    height: 100%

  .deal-txt
    position: absolute
    top: 40%
    left: 17%
    color: #fff
    text-align: center

  .big-txt
    font-size: 24px


@media only screen and (max-width: 990px)
  .left-pic, .right-pic
    width: 400px
    height: 400px

  .left-pic img, .right-pic img
    width: 100%
    height: 100%

  .deal-txt
    position: absolute
    top: 40%
    left: 17%
    color: #fff
    text-align: center

  .big-txt
    font-size: 32px


@media only screen and (max-width: 600px)
  .left-pic, .right-pic
    width: 400px
    height: 400px

  .left-pic img, .right-pic img
    width: 100%
    height: 100%

  .d-flex
    flex-direction: column

  .deal-txt
    position: absolute
    top: 40%
    left: 15%
    color: #fff
    text-align: center

  .big-txt
    font-size: 28px



@media only screen and (max-width: 400px)
  .left-pic, .right-pic
    width: 300px
    height: 300px

  .left-pic img, .right-pic img
    width: 100%
    height: 100%

  .deal-txt
    position: absolute
    top: 40%
    left: 18%
    color: #fff
    text-align: center

  .big-txt
    font-size: 26px

  .d-flex
    flex-direction: column

  @media only screen and (max-width: 350px)
    .left-pic, .right-pic
      width: 250px
      height: 250px

    .left-pic img, .right-pic img
      width: 100%
      height: 100%

    .deal-txt
      position: absolute
      top: 40%
      left: 18%
      color: #fff
      text-align: center

    .big-txt
      font-size: 26px

    .d-flex
      flex-direction: column
</style>
