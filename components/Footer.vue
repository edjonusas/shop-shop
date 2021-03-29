<template>
  <div class="footer">
    <div class="container footer-info">
      <div class="data">©{{ yearNow }} Shop . All Rights Reserved.</div>
      <div class="footer-nav">
        <nuxt-link to="/policies/gdpr-policy" class="link"
          >Privacy policy</nuxt-link
        >
        <nuxt-link to="/policies/cookies-policy" class="link"
          >Cookies policy</nuxt-link
        >
        <nuxt-link to="/policies/terms-conditions" class="link"
          >Terms and conditions</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    yearNow() {
      const dateObj = new Date();
      const year = dateObj.getUTCFullYear();
      return year;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/sass/main.scss";

.footer {
  padding: 50px 0 40px;
  color: #666666;
  background-color: #ffffff;
}

.footer-info {
  display: flex;
  justify-content: space-between;
}

.link {
  margin-left: 30px;
  color: #666666;
  text-transform: uppercase;
  text-decoration: none;
}

.link:hover {
  color: $mainColor;
}

@media only screen and (max-width: 990px) {
  .footer-info {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }

  .footer-nav {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .link {
    margin: 6px;
  }

  .data {
    margin-top: 30px;
  }
}
</style>