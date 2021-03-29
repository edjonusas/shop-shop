<template>
  <div class="block">
    <div
      id="nav"
      class="navbar d-flex"
      :class="{ scrolled: !view.atTopOfPage }"
    >
      <div class="logo">
        <nuxt-link to="/"><h1>miini</h1></nuxt-link>
      </div>
      <div class="links">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="">About</nuxt-link>
        <nuxt-link to="/posts">Blog</nuxt-link>
        <nuxt-link to="/contacts">Contacts</nuxt-link>
      </div>
      <div class="icons">
        <ul>
          <nuxt-link to="/wishlist"
            ><li>
              <fa icon="heart" /><span
                class="nav-counter"
                v-if="wishlistAmount > 0"
                ><div class="cartAmount">{{ wishlistAmount }}</div></span
              >
            </li></nuxt-link
          >
          <nuxt-link :to="logedIn()">
            <li class="opt-li"><fa icon="user" /></li
          ></nuxt-link>
          <nuxt-link to="/cart"
            ><li>
              <fa icon="shopping-cart" /><span
                class="nav-counter"
                v-if="cartAmount > 0"
                ><div class="cartAmount">{{ cartAmount }}</div></span
              >
            </li></nuxt-link
          >
          <nuxt-link v-if="loggedIn.loggedIn" to="/auth/logOut"
            ><li class="opt-li"><fa icon="door-open" /></li
          ></nuxt-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      view: {
        atTopOfPage: true,
      },
      counter: false,
    };
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  computed: {
    likes() {
      return this.$store.getters.getWishlistItems.length;
    },
    cartAmount() {
      return this.$store.getters.getCartTotalAmount;
    },
    wishlistAmount() {
      return this.$store.getters.getWishlistTotalAmount;
    },
    loggedIn() {
      return this.$store.getters.getIsLoggedIn;
    },
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset > 0) {
        if (this.view.atTopOfPage) this.view.atTopOfPage = false;
      } else {
        if (!this.view.atTopOfPage) this.view.atTopOfPage = true;
      }
    },
    logedIn() {
      if (this.loggedIn.loggedIn) {
        return "/profile";
      } else {
        return "/auth";
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../assets/sass/main"
*
  font-family: $mainFont
  margin: 0 auto
.navbar a:hover
  color: #55A37D
.navbar
  width: 100%
  heigth: 70px
  background-color: #fff
  z-index: 10
.logo a
  text-decoration: none
  color: black
.logo h1
  background-color: #fff
.links
  padding: 0
.icons ul
  padding: 0
.links a
  padding: 10px
  text-decoration: none
  color: black
.icons ul li
  list-style-type: none
  color: black
  display: inline
  padding: 10px
  position: relative
.d-flex
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: space-around
  align-items: center
  align-content: center
  width: 100%
.navbar.scrolled
  position: fixed
  top: -150px
  left: 0
  transform: translateY(149px)
  transition: all 2s ease
  border-bottom: 1px solid lightgrey
.nav-counter
  font-size: 55%
  font-weight: 700
  position: absolute
  i active
    background-color: red
    top: 7px
    left: 20px

.cartAmount
  display: flex
  justify-content: center
  align-items: center
  background-color: red
  width: 15px
  height: 15px
  border-radius: 50%
  color: white
  position: relative

@media only screen and (max-width: 600px)
  .links a
    padding: 2px
    font-size: 15px
    text-decoration: none
    color: black
  .icons
    margin-top: 10px
</style>
