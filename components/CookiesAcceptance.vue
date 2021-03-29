<template>
  <div v-if="cookies" class="cookie_block" :class="{'hideCookie':display}">
    <p>Miini uses cookies to ensure you get the best experience on our website. By continuing to browse, you agree to
      our
      <nuxt-link to="policies/cookies-policy">cookie policy</nuxt-link>
      .
    </p>
    <fa icon="times" @click="displayNone"/>
  </div>
</template>
<script>
export default {
  name: "CookiesAcceptance",
  data() {
    return {
      display: false,
      cookies: false
    };
  },
  methods: {
    displayNone() {
      this.display = true
      localStorage.setItem('cookiesAccepted', JSON.stringify(true))

    }
  },
  mounted() {
    let getCookies = JSON.parse(localStorage.getItem("cookiesAccepted"))
    getCookies ? this.cookies = false : this.cookies = true
  }
}
</script>

<style scoped lang="scss">
@import "assets/sass/main.scss";

.cookie_block {
  width: 1111px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  font-size: 14px;
  background-color: white;
  color: #666;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  z-index: 99999;
}


p, a {
  font-family: $mainFont;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 26px;
  text-transform: none;
  margin: 0;
  color: #666;
}

a {
  text-decoration: underline;
}

.fa-times {
  cursor: pointer;
  font-family: $mainFont;
}

.hideCookie {
  display: none;
}

@media only screen and (max-width: 768px) {
  .cookie_block{
    width: 293px;
    font-size: 12px;
  }
}


</style>
