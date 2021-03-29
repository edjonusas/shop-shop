<template>
  <div class="block mt-5">
    <div class="center">
      <h5 class="mb-5">Log In</h5>
    </div>

    <div class="input">
      <h6>Email address</h6>
      <input type="email" v-model="user.email" />
      <h6>Password</h6>
      <input type="password" v-model="user.password" />
    </div>

    <div class="buttons">
      <div class="error" v-if="err">{{ message }}</div>
      <div class="center">
        <button @click="login">Log in</button>
        <nuxt-link to="/auth/register">
          <button>Register</button>
        </nuxt-link>
      </div>

      <div class="center">
        <nuxt-link to="/auth/lost-password">
          <h6>Lost your password?</h6>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAuth",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      err: false,
      message: ""
    };
  },
  methods: {
    login() {
      let mailRegex = /^\S+@\S+\.\S+$/;
      let isEmailLegit = mailRegex.test(this.user.email);

      if (isEmailLegit) {
        this.$store.dispatch("login", this.user).then(res => {
          if (res.success) {
            return this.$router.push("/");
          } else {
            this.message = res.message;
            this.err = true;
          }
        });
      } else {
        this.err = true;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import "assets/sass/main"

.block
  font-family: $mainFont
  display: block
  margin-left: auto
  margin-right: auto
  width: 700px

p
  margin-bottom: 2px

button
  height: 43px
  width: 80px
  margin-right: 10px
  margin-bottom: 20px
  background-color: black
  color: white
  font-weight: 500
  padding: 0
  border: none

input
  width: 700px
  height: 45px
  background-color: #f2f2f2
  padding: 0
  border: none
  padding-left: 20px

.buttons
  margin-top: 25px

h5
  font-weight: 700

h6
  font-weight: 400
  margin-top: 15px

.error
  color: red
  margin-bottom: 20px

@media (max-width: $BpPhone)
  .block
    width: 200px
    text-align: center

  input
    width: 200px

  .buttons
    display: flex
    flex-wrap: wrap

@media (max-width: $BpTablet) and (min-width: $BpPhone)
  .block
    width: 350px

  input
    width: 350px

  .center
    display: flex
    justify-content: center
</style>
